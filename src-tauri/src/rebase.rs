use crate::{branch::RepoExt, utils::UtilExt};
use tauri_derive::export_ts;

use crate::AppResult;

pub trait RebaseExt {
    async fn rebase_abort(&self) -> AppResult<()>;
    async fn rebase_interactive_begin(&self) -> AppResult<()>;
    async fn rebase_continue(&self) -> AppResult<()>;
}

#[export_ts(scope = "rebase")]
impl RebaseExt for git2::Repository {
    async fn rebase_abort(&self) -> AppResult<()> {
        self.exec_git(["rebase", "--abort"])?;
        Ok(())
    }

    async fn rebase_interactive_begin(&self) -> AppResult<()> {
        let git_ver = self.git_get_version()?;
        let mut args = vec![
            "rebase",
            "--interactive",
            "--autostash",
            "--keep-empty",
            "--no-autosquash",
        ];
        if git_ver >= semver::Version::new(2, 22, 0) {
            args.push("--rebase-merges");
        }
        self.exec_git(args)?;
        Ok(())
    }

    async fn rebase_continue(&self) -> AppResult<()> {
        let _ = self.exec_git(["rebase", "--continue"])?;
        Ok(())
    }
}
