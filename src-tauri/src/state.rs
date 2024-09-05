mod branch;
mod files;
mod tag;
use std::sync::Mutex;

use crate::{
    error::{AppError, AppResult},
    BranchInfo,
};

#[derive(Default)]
pub struct AppState {
    pub git2: Mutex<Option<git2::Repository>>,
}

impl AppState {
    pub fn open(&self, path: &str) -> AppResult<()> {
        let repo = git2::Repository::open(path)?;
        let _ = self.git2.lock().unwrap().insert(repo);
        Ok(())
    }

    pub fn get_branches(&self) -> AppResult<Vec<BranchInfo>> {
        let repo = self.git2.lock().unwrap();
        let repo = repo.as_ref().ok_or(AppError::NoRepo)?;

        let mut branches = vec![];

        for (branch, kind) in repo.branches(None)?.flatten() {
            let branch_name = branch.name()?.unwrap();
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
}
