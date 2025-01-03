use crate::branch::RepoExt;
use crate::AppError;
use crate::AppResult;
use crate::BranchType;
use crate::CommitInfo;
use git2::build::CheckoutBuilder;
use git2::Oid;
use git2::Sort;
use tauri_derive::export_ts;

pub trait CommitExt {
    async fn commit_checkout(&self, commit: &str) -> AppResult<()>;
    async fn checkout_file(&self, commit: &str, path: &str) -> AppResult<()>;
    async fn commit_info(&self, commit: &str) -> AppResult<CommitInfo>;
    async fn commit_reset_author(&self, _commit: &str) -> AppResult<()>;
    async fn commit_amend(&self, commit: &str) -> AppResult<()>;
    async fn commit_revert(&self, commit: &str) -> AppResult<()>;
    async fn commits_since(&self, commit: &str) -> AppResult<Vec<CommitInfo>>;
    async fn commit_create(&self, msg: &str) -> AppResult<()>;
    async fn commits_by_branch(&self, branch: &str, kind: BranchType)
        -> AppResult<Vec<CommitInfo>>;
    async fn patch_create(&self) -> AppResult<String>;
}

#[export_ts(scope = "commit")]
impl CommitExt for git2::Repository {
    async fn commit_checkout(&self, commit: &str) -> AppResult<()> {
        if !matches!(self.state(), git2::RepositoryState::Clean) {
            return Err(AppError::BadStatus);
        }

        let oid = Oid::from_str(commit)?;
        self.set_head_detached(oid)?;

        let mut opts = CheckoutBuilder::new();
        let opts = opts.safe().force();
        self.checkout_head(Some(opts))?;

        Ok(())
    }

    async fn checkout_file(&self, commit: &str, path: &str) -> AppResult<()> {
        self.exec_git(["checkout", commit, path])?;

        Ok(())
    }

    async fn commit_info(&self, commit: &str) -> AppResult<CommitInfo> {
        let commit = self.find_commit(Oid::from_str(commit)?)?;

        (&commit).try_into()
    }

    async fn commit_reset_author(&self, _commit: &str) -> AppResult<()> {
        self.exec_git(["commit", "--reset-author", "--amend", "--no-edit"])?;

        Ok(())
    }

    async fn commit_amend(&self, commit: &str) -> AppResult<()> {
        let head = self.head()?.target().unwrap().to_string();
        if commit == head {
            self.exec_git(["commit", "--amend", "--no-edit"])?;
        } else {
            return Err(AppError::NotImplement);
        }

        Ok(())
    }

    async fn commits_since(&self, commit: &str) -> AppResult<Vec<CommitInfo>> {
        let commit = self.find_commit_by_prefix(commit)?;
        let mut revwalk = self.revwalk()?;
        revwalk.push(commit.id())?;
        revwalk.set_sorting(Sort::TIME)?;

        let mut res = vec![];
        for item in revwalk {
            let item = item?;
            let commit = self.find_commit(item)?;

            res.push((&commit).try_into()?);
        }

        Ok(res)
    }

    async fn commit_create(&self, msg: &str) -> AppResult<()> {
        let _ = self.exec_git(["commit", "-m", msg])?;

        Ok(())
    }

    async fn commits_by_branch(
        &self,
        branch: &str,
        kind: BranchType,
    ) -> AppResult<Vec<CommitInfo>> {
        let branch = self.find_branch(branch, kind.into())?;
        let oid = branch.get().target().unwrap();

        let mut walker = self.revwalk()?;
        walker.push(oid)?;
        walker.set_sorting(git2::Sort::TIME)?;

        let mut commits = vec![];
        for id in walker {
            let id = id?;
            let commit = self.find_commit(id)?;
            commits.push((&commit).try_into()?);
        }

        Ok(commits)
    }

    async fn patch_create(&self) -> AppResult<String> {
        let output = self.exec_git(["diff", "HEAD"])?;

        let out = String::from_utf8(output.stdout)?;
        Ok(out)
    }

    async fn commit_revert(&self, commit: &str) -> AppResult<()> {
        let commit = self.find_commit(commit.parse()?)?;

        let mut builder = git2::build::CheckoutBuilder::new();
        builder.safe();
        let mut opts = git2::RevertOptions::new();
        opts.checkout_builder(builder);

        self.revert(&commit, Some(&mut opts))?;
        Ok(())
    }
}
