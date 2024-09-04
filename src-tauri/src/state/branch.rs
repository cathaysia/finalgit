use crate::{branch::BranchInfo, AppError, AppResult, AppState};

impl AppState {
    pub fn rename_branch(&self, info: BranchInfo, to: &str) -> AppResult<()> {
        let repo = self.git2.lock().unwrap();
        let repo = repo.as_ref().ok_or(AppError::NoRepo)?;

        let mut branch = repo.find_branch(&info.name, info.kind.into())?;
        let _ = branch.rename(to, true)?;
        Ok(())
    }

    pub fn remove_branch(&self, info: BranchInfo) -> AppResult<()> {
        let repo = self.git2.lock().unwrap();
        let repo = repo.as_ref().ok_or(AppError::NoRepo)?;

        let mut branch = repo.find_branch(&info.name, info.kind.into())?;
        branch.delete()?;

        Ok(())
    }

    pub fn create_branch(&self, name: &str, commit: &str) -> AppResult<()> {
        let repo = self.git2.lock().unwrap();
        let repo = repo.as_ref().ok_or(AppError::NoRepo)?;
        let commit = repo.find_commit_by_prefix(commit)?;

        let _ = repo.branch(name, &commit, true)?;

        Ok(())
    }

    /// https://stackoverflow.com/a/46758861
    pub fn checkout_branch(&self, name: &str) -> AppResult<()> {
        let repo = self.git2.lock().unwrap();
        let repo = repo.as_ref().ok_or(AppError::NoRepo)?;

        let branch = repo.revparse_single(name)?;
        repo.checkout_tree(&branch, None)?;
        repo.set_head(&format!("refs/heads/{name}"))?;

        Ok(())
    }
}
