use crate::ext::RepoExt;

use crate::AppResult;

pub trait StashExt {
    fn stash(&self) -> AppResult<()>;
    fn stash_pop(&self) -> AppResult<()>;
}

impl StashExt for git2::Repository {
    fn stash(&self) -> AppResult<()> {
        let _ = self.exec_git(["stash"])?;
        Ok(())
    }

    fn stash_pop(&self) -> AppResult<()> {
        let _ = self.exec_git(["stash", "pop"])?;
        Ok(())
    }
}
