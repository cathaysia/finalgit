use serde::{Deserialize, Serialize};
use specta::Type;
use tauri_derive::export_ts;

use crate::AppResult;

pub trait HeadExt {
    async fn head_get_status(&self) -> AppResult<RepositoryState>;
}

#[export_ts(scope = "head")]
impl HeadExt for git2::Repository {
    async fn head_get_status(&self) -> AppResult<RepositoryState> {
        Ok(self.state().into())
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
