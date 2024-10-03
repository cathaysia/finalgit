use std::{collections::HashMap, path::Path, process::Stdio};

use git2::{build::CheckoutBuilder, Sort};
use itertools::Itertools;
use log::debug;

use crate::{AppError, AppResult, Author, BranchInfo, CommitInfo, FileStatus, FileTree, TagInfo};

pub trait RepoExt {
    fn get_branches(&self) -> AppResult<Vec<BranchInfo>>;

    fn rename_branch(&self, info: BranchInfo, to: &str) -> AppResult<()>;

    fn remove_branch(&self, info: BranchInfo) -> AppResult<()>;

    fn create_branch(&self, name: &str, commit: &str) -> AppResult<()>;

    /// https://stackoverflow.com/a/46758861
    fn checkout_branch(&self, name: &str) -> AppResult<()>;
    fn get_commits(&self, branch: &str, kind: git2::BranchType) -> AppResult<Vec<CommitInfo>>;
    fn get_current_status(&self) -> AppResult<Vec<FileStatus>>;
    fn get_file_tree(&self, commit: &str) -> AppResult<Vec<FileTree>>;
    fn get_file_content(&self, commit: &str, path: &str) -> AppResult<Vec<u8>>;
    fn get_tags(&self) -> AppResult<Vec<TagInfo>>;
    fn create_commit(&self, msg: &str) -> AppResult<()>;
    fn create_patch(&self) -> AppResult<String>;
    fn get_history(&self, commit: &str) -> AppResult<Vec<CommitInfo>>;
    fn get_config(&self, key: &str) -> AppResult<String>;
    fn set_config(&self, key: &str, value: &str) -> AppResult<()>;
    fn get_configes(&self) -> AppResult<HashMap<String, String>>;

    fn exec_git<I, S>(&self, args: I) -> AppResult<std::process::Output>
    where
        I: IntoIterator<Item = S>,
        S: AsRef<std::ffi::OsStr>;
}

impl RepoExt for git2::Repository {
    fn get_branches(&self) -> AppResult<Vec<BranchInfo>> {
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

        Ok(branches)
    }

    fn rename_branch(&self, info: BranchInfo, to: &str) -> AppResult<()> {
        debug!("rename_branch: {info:?} ==> {to:?}");
        let mut branch = self.find_branch(&info.name, info.kind)?;
        let _ = branch.rename(to, true)?;
        Ok(())
    }

    fn remove_branch(&self, info: BranchInfo) -> AppResult<()> {
        let mut branch = self.find_branch(&info.name, info.kind)?;
        branch.delete()?;

        Ok(())
    }

    fn create_branch(&self, name: &str, commit: &str) -> AppResult<()> {
        let commit = self.find_commit_by_prefix(commit)?;

        let _ = self.branch(name, &commit, true)?;

        Ok(())
    }

    /// https://stackoverflow.com/a/46758861
    fn checkout_branch(&self, name: &str) -> AppResult<()> {
        let branch = self.revparse_single(name)?;
        let mut opts = CheckoutBuilder::new();
        let opts = opts.safe().force();
        self.checkout_tree(&branch, Some(opts))?;
        self.set_head(&format!("refs/heads/{name}"))?;

        Ok(())
    }

    fn get_commits(&self, branch: &str, kind: git2::BranchType) -> AppResult<Vec<CommitInfo>> {
        let branch = self.find_branch(branch, kind)?;
        let oid = branch.get().target().unwrap();

        let mut walker = self.revwalk()?;
        walker.push(oid)?;
        walker.set_sorting(git2::Sort::TIME)?;

        let mut commits = vec![];
        for id in walker {
            let id = id?;
            let commit = self.find_commit(id)?;
            let author = Author {
                name: commit.author().name().unwrap().into(),
                email: commit.author().email().unwrap().into(),
            };
            let commiter = Author {
                name: commit.committer().name().unwrap().into(),
                email: commit.committer().email().unwrap().into(),
            };
            let info = commit.message().unwrap();
            let summary = commit.summary().unwrap();
            let hash = commit.id().to_string();
            let date = commit.time().seconds();
            commits.push(CommitInfo {
                hash,
                author,
                commiter,
                message: info.into(),
                summary: summary.into(),
                time: date as u32,
            });
        }

        Ok(commits)
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
    fn get_file_tree(&self, commit: &str) -> AppResult<Vec<FileTree>> {
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

    fn get_file_content(&self, commit: &str, path: &str) -> AppResult<Vec<u8>> {
        let commit = git2::Oid::from_str(commit)?;
        let commit = self.find_commit(commit)?;
        let tree = commit.tree()?;
        let entry = tree.get_path(Path::new(path))?;
        let entry = self.find_blob(entry.id())?;

        Ok(entry.content().to_vec())
    }

    fn get_tags(&self) -> AppResult<Vec<TagInfo>> {
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

    fn create_commit(&self, msg: &str) -> AppResult<()> {
        let _ = self.exec_git(["commit", "-m", msg])?;

        Ok(())
    }

    fn create_patch(&self) -> AppResult<String> {
        let output = self.exec_git(["diff", "HEAD"])?;

        let out = String::from_utf8(output.stdout)?;
        Ok(out)
    }

    fn get_history(&self, commit: &str) -> AppResult<Vec<CommitInfo>> {
        let commit = self.find_commit_by_prefix(commit)?;
        let mut revwalk = self.revwalk()?;
        revwalk.push(commit.id())?;
        revwalk.set_sorting(Sort::TIME)?;

        let mut res = vec![];
        for item in revwalk {
            let item = item?;
            let commit = self.find_commit(item)?;

            res.push(CommitInfo {
                hash: commit.id().to_string(),
                author: Author {
                    name: commit.author().name().unwrap().to_string(),
                    email: commit.author().email().unwrap().to_string(),
                },
                commiter: Author {
                    name: commit.committer().name().unwrap().to_string(),
                    email: commit.committer().email().unwrap().to_string(),
                },
                message: commit.message().unwrap().to_string(),
                summary: commit.summary().unwrap().to_string(),
                time: commit.time().seconds() as u32,
            });
        }

        Ok(res)
    }
    fn get_config(&self, key: &str) -> AppResult<String> {
        let output = self.exec_git(["config", "--get", key])?;
        let out = std::str::from_utf8(&output.stdout)?.trim();
        Ok(out.into())
    }
    fn set_config(&self, key: &str, value: &str) -> AppResult<()> {
        let _ = self.exec_git(["config", "--local", key, value])?;

        Ok(())
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

    fn get_configes(&self) -> AppResult<HashMap<String, String>> {
        let output = self.exec_git(["config", "-l"])?;
        let output = String::from_utf8(output.stdout)?;
        let mut res = HashMap::<String, String>::default();

        for line in output.lines() {
            let sp = line.split(':').collect_vec();
            if sp.len() != 2 {
                continue;
            }

            res.insert(sp[0].to_string(), sp[1].to_string());
        }

        Ok(res)
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
