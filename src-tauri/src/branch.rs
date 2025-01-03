use std::{path::Path, process::Stdio};

use crate::{AppError, AppResult, BranchInfo, TagInfo};
use git2::build::CheckoutBuilder;
use log::{debug, info, trace};
use serde::{Deserialize, Serialize};
use specta::Type;
#[cfg(target_os = "windows")]
use std::os::windows::process::CommandExt;
use tauri_derive::export_ts;

#[derive(Debug, Default, Serialize, Deserialize, Type)]
pub struct PushStatus {
    pub unpush: u32,
    pub unpull: u32,
    pub has_conflict: bool,
}

#[derive(Debug, Clone, PartialEq, Eq, serde::Serialize, serde::Deserialize, Type)]
pub struct HeadInfo {
    oid: String,
    is_detached: bool,
    is_rebasing: bool,
}

pub trait RepoExt {
    fn exec_git<I, S>(&self, args: I) -> AppResult<std::process::Output>
    where
        I: IntoIterator<Item = S>,
        S: AsRef<std::ffi::OsStr>;

    fn repo_open(repo_path: &str) -> AppResult<()>;
    async fn repo_get_head(&self) -> AppResult<HeadInfo>;
    async fn repo_get_status(&self) -> AppResult<RepositoryState>;
    async fn tag_get_info(&self) -> AppResult<Vec<TagInfo>>;

    async fn branch_rename(&self, info: BranchInfo, to: &str) -> AppResult<()>;
    async fn branch_remove(&self, info: BranchInfo) -> AppResult<()>;
    async fn branch_create(&self, branch_name: &str, commit: &str) -> AppResult<()>;
    async fn branch_create_from(&self, branch_name: &str, branch: BranchInfo) -> AppResult<()>;
    /// https://stackoverflow.com/a/46758861
    async fn branch_checkout(&self, name: &str) -> AppResult<()>;
    async fn branch_fetch(&self, branch: &str) -> AppResult<()>;
    async fn branch_get_info(&self) -> AppResult<Vec<BranchInfo>>;
    async fn branch_get_status(&self, branch: &str) -> AppResult<PushStatus>;
    async fn branch_pull(&self, branch_info: BranchInfo, rebase: bool, ff: bool) -> AppResult<()>;
    async fn branch_push(&self, branch_info: BranchInfo, force: bool) -> AppResult<()>;
}

#[export_ts(scope = "branch")]
impl RepoExt for git2::Repository {
    fn exec_git<I, S>(&self, args: I) -> AppResult<std::process::Output>
    where
        I: IntoIterator<Item = S>,
        S: AsRef<std::ffi::OsStr>,
    {
        let path = self.path().to_str().unwrap();
        let path = path.replace("/.git/modules", "").replace("/.git", "");
        let path = Path::new(&path);
        trace!("run git command in {path:?}");

        let mut command = std::process::Command::new("git");
        command
            .stdin(Stdio::null())
            .stdout(Stdio::piped())
            .stderr(Stdio::piped())
            .env("LANG", "C")
            .env("GIT_TERMINAL_PROMPT", "0")
            .args(args)
            .current_dir(path);

        #[cfg(target_os = "windows")]
        command.creation_flags(0x08000000);

        let output = command.spawn()?.wait_with_output()?;
        trace!("output = {output:?}");

        if output.status.code().unwrap() != 0 {
            let err = std::str::from_utf8(&output.stderr)?;
            return Err(AppError::Spawn(err.to_string()));
        }

        Ok(output)
    }

    fn repo_open(repo_path: &str) -> AppResult<()> {
        git2::Repository::open(repo_path)?;
        Ok(())
    }

    async fn repo_get_head(&self) -> AppResult<HeadInfo> {
        let head = self.head()?;
        let oid = head.target().unwrap().to_string();

        let is_rebasing = self.open_rebase(None).is_ok();

        Ok(HeadInfo {
            oid,
            is_detached: self.head_detached()?,
            is_rebasing,
        })
    }

    async fn repo_get_status(&self) -> AppResult<RepositoryState> {
        Ok(self.state().into())
    }

    async fn tag_get_info(&self) -> AppResult<Vec<TagInfo>> {
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
                oid: commit,
                ref_hash,
            });
            true
        })?;

        Ok(taginfos)
    }

    async fn branch_rename(&self, info: BranchInfo, to: &str) -> AppResult<()> {
        debug!("rename_branch: {info:?} ==> {to:?}");
        let mut branch = self.find_branch(&info.name, info.kind)?;
        let _ = branch.rename(to, true)?;
        Ok(())
    }

    async fn branch_remove(&self, info: BranchInfo) -> AppResult<()> {
        let mut branch = self.find_branch(&info.name, info.kind)?;
        branch.delete()?;

        Ok(())
    }

    async fn branch_create(&self, branch_name: &str, commit: &str) -> AppResult<()> {
        let commit = self.find_commit_by_prefix(commit)?;

        let _ = self.branch(branch_name, &commit, false)?;

        Ok(())
    }

    async fn branch_create_from(&self, name: &str, branch: BranchInfo) -> AppResult<()> {
        info!("checkout remote {branch:?}");
        let Some(remote) = branch.remote else {
            return Err(AppError::BadStatus);
        };
        let branch = self
            .find_branch(&format!("{}/{}", remote, branch.name), branch.kind)
            .unwrap();
        let oid = branch.get().target().unwrap();
        let commit = self.find_commit(oid).unwrap();

        self.branch(name, &commit, false)?;

        Ok(())
    }

    /// https://stackoverflow.com/a/46758861
    async fn branch_checkout(&self, name: &str) -> AppResult<()> {
        if !matches!(self.state(), git2::RepositoryState::Clean) {
            return Err(AppError::BadStatus);
        }
        let branch = self.revparse_single(name)?;
        let mut opts = CheckoutBuilder::new();
        let opts = opts.safe().force();
        self.checkout_tree(&branch, Some(opts))?;
        self.set_head(&format!("refs/heads/{name}"))?;

        Ok(())
    }

    async fn branch_fetch(&self, branch: &str) -> AppResult<()> {
        let local = self.find_branch(branch, git2::BranchType::Local)?;
        let upstream = local.upstream()?.get().target().unwrap().to_string();
        let mut v = self.find_remote(&upstream)?;
        v.fetch(&[branch], None, None)?;

        Ok(())
    }

    async fn branch_get_info(&self) -> AppResult<Vec<BranchInfo>> {
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
                    oid: branch_head,
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
                        oid: branch_head,
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

    async fn branch_get_status(&self, branch: &str) -> AppResult<PushStatus> {
        if self.is_bare() {
            return Err(AppError::BareRepo);
        }

        let local = self.find_branch(branch, git2::BranchType::Local)?;
        let Ok(upstream) = local.upstream() else {
            return Ok(Default::default());
        };
        let upstream = upstream.into_reference();

        let upstream = upstream.name().unwrap();
        let (_, upstream) = upstream.split_once('/').unwrap();
        let (_, upstream) = upstream.split_once('/').unwrap();

        let local_oid = {
            let branch = self.find_branch(branch, git2::BranchType::Local)?;
            branch.get().target().unwrap()
        };
        let remote_oid = {
            let branch = self.find_branch(upstream, git2::BranchType::Remote)?;
            branch.get().target().unwrap()
        };

        let (local, remote) = self.graph_ahead_behind(local_oid, remote_oid)?;

        Ok(PushStatus {
            unpush: local as u32,
            unpull: remote as u32,
            has_conflict: self.graph_descendant_of(local_oid, remote_oid)?
                || self.graph_descendant_of(remote_oid, local_oid)?,
        })
    }

    async fn branch_pull(&self, info: BranchInfo, rebase: bool, ff: bool) -> AppResult<()> {
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

    async fn branch_push(&self, info: BranchInfo, force: bool) -> AppResult<()> {
        if !info.is_local() {
            // NOT implement
            return Ok(());
        }

        // TODO: check need force?
        let mut args = vec!["push"];
        if force {
            args.push("--force");
        }

        trace!("run git with {args:?}");

        let ret = self.exec_git(args)?;
        let err = String::from_utf8(ret.stderr)?;
        if err.is_empty() {
            return Err(AppError::Spawn(err));
        }
        Ok(())
    }
}

#[derive(Debug, Serialize, Deserialize, Type)]
pub enum RepositoryState {
    Clean,
    Merge,
    Revert,
    RevertSequence,
    CherryPick,
    CherryPickSequence,
    Bisect,
    Rebase,
    RebaseInteractive,
    RebaseMerge,
    ApplyMailbox,
    ApplyMailboxOrRebase,
}

impl From<git2::RepositoryState> for RepositoryState {
    fn from(value: git2::RepositoryState) -> Self {
        match value {
            git2::RepositoryState::Clean => Self::Clean,
            git2::RepositoryState::Merge => Self::Merge,
            git2::RepositoryState::Revert => Self::Revert,
            git2::RepositoryState::RevertSequence => Self::RevertSequence,
            git2::RepositoryState::CherryPick => Self::CherryPick,
            git2::RepositoryState::CherryPickSequence => Self::CherryPickSequence,
            git2::RepositoryState::Bisect => Self::Bisect,
            git2::RepositoryState::Rebase => Self::Rebase,
            git2::RepositoryState::RebaseInteractive => Self::RebaseInteractive,
            git2::RepositoryState::RebaseMerge => Self::RebaseMerge,
            git2::RepositoryState::ApplyMailbox => Self::ApplyMailbox,
            git2::RepositoryState::ApplyMailboxOrRebase => Self::ApplyMailboxOrRebase,
        }
    }
}

#[cfg(test)]
mod test {
    use super::RepoExt;

    #[test]
    fn test_open_repo() {
        git2::Repository::repo_open("..").unwrap();
    }

    // #[test]
    // fn test_open_repo1() {
    //     let repo = git2::Repository::open("..").unwrap();
    //     let v = repo.branch_status("dev").unwrap();
    //     println!("{v:#?}");
    // }
    //
    // #[tokio::test]
    // async fn test_open_repo1() {
    //     let repo = git2::Repository::open("/path/to/edgevpn").unwrap();
    //     let info = repo.branch_get_info().await.unwrap();
    //     let branch = info
    //         .into_iter()
    //         .find(|item| item.name == "bump/libp2p0.26.0")
    //         .unwrap();
    //     println!("{branch:#?}");
    //     repo.branch_create_from("newc", branch).await.unwrap();
    // }

    // #[test]
    // fn test_get_branch() {
    //     let repo = crate::utils::open_repo("..").unwrap();
    //     assert!(!repo.get_branch_info().unwrap().is_empty());
    //     assert!(!repo.get_tag_info().unwrap().is_empty());
    //
    //     let head = repo.get_repo_head().unwrap();
    //     assert!(!repo.get_file_tree(&head.oid).unwrap().is_empty());
    // }
}
