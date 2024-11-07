use std::{path::Path, process::Stdio};

use git2::build::CheckoutBuilder;
use itertools::Itertools;
use log::{debug, info};
use serde::{Deserialize, Serialize};
use specta::Type;
use tauri_derive::export_ts;

use crate::{
    commit::CommitExt, AppError, AppResult, BranchInfo, BranchType, FileStatus, FileTree, TagInfo,
};

#[derive(Debug, Default, Serialize, Deserialize, Type)]
pub struct PushStatus {
    pub unpush: u32,
    pub unpull: u32,
}

#[derive(Debug, Clone, PartialEq, Eq, serde::Serialize, serde::Deserialize, Type)]
pub struct HeadInfo {
    oid: String,
    is_detached: bool,
    is_rebasing: bool,
}

pub trait RepoExt {
    fn get_branch_info(&self) -> AppResult<Vec<BranchInfo>>;

    fn branch_rename(&self, info: BranchInfo, to: &str) -> AppResult<()>;

    fn branch_remove(&self, info: BranchInfo) -> AppResult<()>;

    fn branch_create(&self, name: &str, commit: &str) -> AppResult<()>;

    /// https://stackoverflow.com/a/46758861
    fn branch_checkout(&self, name: &str) -> AppResult<()>;
    fn get_current_status(&self) -> AppResult<Vec<FileStatus>>;
    async fn get_file_tree(&self, commit: &str) -> AppResult<Vec<FileTree>>;
    fn get_file_content(&self, commit: &str, path: &str) -> AppResult<String>;
    fn get_tag_info(&self) -> AppResult<Vec<TagInfo>>;

    fn exec_git<I, S>(&self, args: I) -> AppResult<std::process::Output>
    where
        I: IntoIterator<Item = S>,
        S: AsRef<std::ffi::OsStr>;
    fn branch_status(&self, branch: &str) -> AppResult<PushStatus>;
    fn branch_push(&self, force: bool) -> AppResult<()>;
    fn get_repo_head(&self) -> AppResult<HeadInfo>;

    fn branch_fetch(&self, branch: &str) -> AppResult<()>;
    fn open_repo(repo_path: &str) -> AppResult<()>;
    fn branch_checkout_remote(repo_path: &str, branch: &str) -> AppResult<()>;

    async fn pull_branch(&self, branch_info: BranchInfo, rebase: bool, ff: bool) -> AppResult<()>;
}

#[export_ts(scope = "branch")]
impl RepoExt for git2::Repository {
    fn open_repo(repo_path: &str) -> AppResult<()> {
        git2::Repository::open(repo_path)?;
        Ok(())
    }

    fn get_branch_info(&self) -> AppResult<Vec<BranchInfo>> {
        let mut branches = vec![];

        for (branch, kind) in self.branches(None)?.flatten() {
            let branch_name = branch.name()?.unwrap();
            if branch_name == "origin/HEAD" {
                continue;
            }
            let branch_head = branch.get().resolve()?.target().unwrap().to_string();
            let is_head = branch.is_head();
            let upstream = branch
                .upstream()
                .map(|item| {
                    item.name()
                        .ok()
                        .map(|item| item.map(|item| item.to_string()))
                })
                .ok()
                .flatten()
                .flatten();

            let branch = match kind {
                git2::BranchType::Local => BranchInfo {
                    remote: None,
                    name: branch_name.into(),
                    kind,
                    commit: branch_head,
                    is_head,
                    upstream,
                },
                git2::BranchType::Remote => {
                    let (remote, branch) = match branch_name.split_once('/') {
                        Some((remote, branch)) => (Some(remote), branch),
                        None => unreachable!(),
                    };
                    if branch == "HEAD" {
                        continue;
                    }
                    BranchInfo {
                        remote: remote.map(|item| item.into()),
                        name: branch.into(),
                        kind,
                        commit: branch_head,
                        is_head,
                        upstream,
                    }
                }
            };
            branches.push(branch)
        }

        branches.sort_by(|a, b| b.cmp(a));

        Ok(branches)
    }

    fn branch_rename(&self, info: BranchInfo, to: &str) -> AppResult<()> {
        debug!("rename_branch: {info:?} ==> {to:?}");
        let mut branch = self.find_branch(&info.name, info.kind)?;
        let _ = branch.rename(to, true)?;
        Ok(())
    }

    fn branch_remove(&self, info: BranchInfo) -> AppResult<()> {
        let mut branch = self.find_branch(&info.name, info.kind)?;
        branch.delete()?;

        Ok(())
    }

    fn branch_create(&self, name: &str, commit: &str) -> AppResult<()> {
        let commit = self.find_commit_by_prefix(commit)?;

        let _ = self.branch(name, &commit, true)?;

        Ok(())
    }

    /// https://stackoverflow.com/a/46758861
    fn branch_checkout(&self, name: &str) -> AppResult<()> {
        let branch = self.revparse_single(name)?;
        let mut opts = CheckoutBuilder::new();
        let opts = opts.safe().force();
        self.checkout_tree(&branch, Some(opts))?;
        self.set_head(&format!("refs/heads/{name}"))?;

        Ok(())
    }

    fn get_current_status(&self) -> AppResult<Vec<FileStatus>> {
        let status = self
            .statuses(None)?
            .into_iter()
            .filter_map(|item| {
                let path = item.path().unwrap();
                let status = item.status();

                if status.contains(git2::Status::IGNORED) {
                    return None;
                }

                Some(FileStatus {
                    path: path.into(),
                    status: status.bits(),
                })
            })
            .collect_vec();

        Ok(status)
    }

    async fn get_file_tree(&self, commit: &str) -> AppResult<Vec<FileTree>> {
        let id = git2::Oid::from_str(commit)?;

        let commit = self.find_commit(id)?;
        let tree = commit.tree()?;
        let mut files = vec![];
        for item in tree.into_iter() {
            if let Some(item) = walk_cb(self, item) {
                files.push(item);
            }
        }
        files.sort();
        Ok(files)
    }

    fn get_file_content(&self, commit: &str, path: &str) -> AppResult<String> {
        let commit = git2::Oid::from_str(commit)?;
        let commit = self.find_commit(commit)?;
        let tree = commit.tree()?;
        let entry = tree.get_path(Path::new(path))?;
        let entry = self.find_blob(entry.id())?;

        Ok(String::from_utf8(entry.content().to_vec())?)
    }

    fn get_tag_info(&self) -> AppResult<Vec<TagInfo>> {
        let mut taginfos = vec![];
        self.tag_foreach(|oid, name| {
            let name = std::str::from_utf8(name)
                .unwrap()
                .strip_prefix("refs/tags/")
                .unwrap()
                .to_string();
            let commit = oid.to_string();
            let mut ref_hash = commit.clone();

            if let Ok(tag) = self.find_tag(oid) {
                ref_hash = tag.target().unwrap().id().to_string();
            }
            taginfos.push(TagInfo {
                name,
                commit,
                ref_hash,
            });
            true
        })?;

        Ok(taginfos)
    }

    fn exec_git<I, S>(&self, args: I) -> AppResult<std::process::Output>
    where
        I: IntoIterator<Item = S>,
        S: AsRef<std::ffi::OsStr>,
    {
        let path = self.path().parent().unwrap();

        let output = std::process::Command::new("git")
            .stdout(Stdio::piped())
            .stderr(Stdio::piped())
            .env("LANG", "C")
            .env("GIT_TERMINAL_PROMPT", "0")
            .args(args)
            .current_dir(path)
            .spawn()?
            .wait_with_output()?;

        if output.status.code().unwrap() != 0 {
            let err = std::str::from_utf8(&output.stderr)?;
            return Err(AppError::Spawn(err.to_string()));
        }

        Ok(output)
    }

    fn branch_status(&self, branch: &str) -> AppResult<PushStatus> {
        let local = self.find_branch(branch, git2::BranchType::Local)?;
        let Ok(upstream) = local.upstream() else {
            return Ok(Default::default());
        };
        let upstream = upstream.into_reference();
        // let upstream =
        let upstream = upstream.name().unwrap();
        let (_, upstream) = upstream.split_once('/').unwrap();
        let (_, upstream) = upstream.split_once('/').unwrap();

        let local = self.get_commits_by_branch(branch, BranchType::Local)?;
        let remote = self.get_commits_by_branch(upstream, BranchType::Remote)?;

        Ok(PushStatus {
            unpush: local.len().saturating_sub(remote.len()) as u32,
            unpull: remote.len().saturating_sub(local.len()) as u32,
        })
    }

    fn branch_push(&self, force: bool) -> AppResult<()> {
        if force {
            self.exec_git(["push", "-f"])?;
        } else {
            self.exec_git(["push"])?;
        }

        Ok(())
    }

    fn get_repo_head(&self) -> AppResult<HeadInfo> {
        let head = self.head()?;
        let oid = head.target().unwrap().to_string();

        let is_rebasing = self.open_rebase(None).is_ok();

        Ok(HeadInfo {
            oid,
            is_detached: self.head_detached()?,
            is_rebasing,
        })
    }

    fn branch_fetch(&self, branch: &str) -> AppResult<()> {
        let local = self.find_branch(branch, git2::BranchType::Local)?;
        let upstream = local.upstream()?.get().target().unwrap().to_string();
        let mut v = self.find_remote(&upstream)?;
        v.fetch(&[branch], None, None)?;

        Ok(())
    }

    fn branch_checkout_remote(repo_path: &str, branch: &str) -> AppResult<()> {
        info!("checkout remote {branch}");
        open_repo(repo_path)?;
        let output = std::process::Command::new("git")
            .stdout(Stdio::null())
            .stderr(Stdio::piped())
            .env("GIT_TERMINAL_PROMPT", "0")
            .arg("checkout")
            .arg(branch)
            .arg("--force")
            .current_dir(repo_path)
            .spawn()?
            .wait_with_output()?;

        if output.status.code().unwrap() != 0 {
            let err = std::str::from_utf8(&output.stderr)?;
            return Err(AppError::Spawn(err.to_string()));
        }

        Ok(())
    }

    async fn pull_branch(&self, info: BranchInfo, rebase: bool, ff: bool) -> AppResult<()> {
        if !info.is_local() {
            // NOT implement
            return Ok(());
        }

        let mut args = vec!["pull"];
        if rebase {
            args.push("--rebase");
        }
        if ff {
            args.push("--ff")
        }

        let _ = self.exec_git(args)?;
        Ok(())
    }
}

fn walk_cb(repo: &git2::Repository, item: git2::TreeEntry) -> Option<FileTree> {
    match item.kind() {
        None => todo!(),
        Some(kind) => {
            //
            match kind {
                git2::ObjectType::Tree => {
                    let tree = item.to_object(repo).unwrap();
                    let tree = tree.peel_to_tree().unwrap();
                    let mut files = vec![];
                    for item in tree.into_iter() {
                        if let Some(item) = walk_cb(repo, item) {
                            files.push(item);
                        }
                    }
                    files.sort();
                    Some(FileTree::Dir {
                        dir: item.name().unwrap().to_string(),
                        files,
                        mode: item.filemode(),
                    })
                }
                git2::ObjectType::Blob => Some(FileTree::File {
                    filename: item.name().unwrap().to_string(),
                    mode: item.filemode(),
                }),
                _ => {
                    debug!("unknown object: {kind:#?}");
                    None
                }
            }
        }
    }
}

#[cfg(test)]
mod test {
    use super::RepoExt;

    #[test]
    fn test_open_repo() {
        git2::Repository::open_repo("..").unwrap();
    }

    #[test]
    fn test_get_branch() {
        let repo = crate::utils::open_repo("..").unwrap();
        assert!(!repo.get_branch_info().unwrap().is_empty());
        assert!(!repo.get_tag_info().unwrap().is_empty());

        let head = repo.get_repo_head().unwrap();
        assert!(!repo.get_file_tree(&head.oid).unwrap().is_empty());
    }
}
