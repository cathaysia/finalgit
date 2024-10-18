use crate::branch::RepoExt;
use tauri_derive::export_ts;

use crate::AppResult;

pub trait RebaseExt {
    fn rebase_abort(&self) -> AppResult<()>;
}

#[export_ts]
impl RebaseExt for git2::Repository {
    fn rebase_abort(&self) -> AppResult<()> {
        self.exec_git(["rebase", "--abort"])?;
        Ok(())
    }
}
