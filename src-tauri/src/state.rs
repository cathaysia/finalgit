mod branch;
mod tag;
use std::sync::Mutex;
pub use tag::*;

use itertools::Itertools;
use tracing::*;

use crate::{
    branch::{BranchInfo, BranchKind},
    error::{AppError, AppResult},
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

        let branches = repo
            .branches(None)?
            .flatten()
            .filter_map(|(branch, kind)| {
                let refname = branch.name().unwrap().unwrap();
                let commit = branch
                    .get()
                    .resolve()
                    .unwrap()
                    .target()
                    .unwrap()
                    .to_string();
                let is_head = branch.is_head();
                trace!(%refname);
                match kind {
                    git2::BranchType::Local => Some(BranchInfo {
                        remote: None,
                        name: refname.into(),
                        kind: BranchKind::Local,
                        commit,
                        is_head,
                    }),
                    git2::BranchType::Remote => {
                        let (remote, branch) = match refname.split_once('/') {
                            Some((remote, branch)) => (Some(remote), branch),
                            None => unreachable!(),
                        };
                        if branch == "HEAD" {
                            return None;
                        }
                        Some(BranchInfo {
                            remote: remote.map(|item| item.into()),
                            name: branch.into(),
                            kind: kind.into(),
                            commit,
                            is_head,
                        })
                    }
                }
            })
            .collect_vec();

        Ok(branches)
    }
}
