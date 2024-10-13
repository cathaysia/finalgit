use crate::AppError;
use crate::AppResult;
use crate::RepoExt;
use crate::Signature;
use git2::build::CheckoutBuilder;
use git2::Oid;
use specta::Type;
use tauri_derive::export_ts;

pub trait CommitExt {
    fn commit_checkout(&self, commit: &str) -> AppResult<()>;
    fn checkout_file(&self, commit: &str, path: &str) -> AppResult<()>;
    fn commit_info(&self, commit: &str) -> AppResult<Commit>;
    fn commit_reset_author(&self, _commit: &str) -> AppResult<()>;
    fn commit_amend(&self, commit: &str) -> AppResult<()>;
}

#[export_ts]
impl CommitExt for git2::Repository {
    fn commit_checkout(&self, commit: &str) -> AppResult<()> {
        let oid = Oid::from_str(commit)?;
        self.set_head_detached(oid)?;

        let mut opts = CheckoutBuilder::new();
        let opts = opts.safe().force();
        self.checkout_head(Some(opts))?;

        Ok(())
    }

    fn checkout_file(&self, commit: &str, path: &str) -> AppResult<()> {
        self.exec_git(["checkout", commit, path])?;

        Ok(())
    }

    fn commit_info(&self, commit: &str) -> AppResult<Commit> {
        let commit = self.find_commit(Oid::from_str(commit)?)?;

        (&commit).try_into()
    }

    fn commit_reset_author(&self, _commit: &str) -> AppResult<()> {
        self.exec_git(["commit", "--reset-author", "--amend", "--no-edit"])?;

        Ok(())
    }

    fn commit_amend(&self, commit: &str) -> AppResult<()> {
        let head = self.head()?.target().unwrap().to_string();
        if commit == head {
            self.exec_git(["commit", "--amend", "--no-edit"])?;
        } else {
            return Err(AppError::NotImplement);
        }

        Ok(())
    }
}

#[derive(Debug, Clone, serde::Serialize, serde::Deserialize, Type)]
pub struct Commit {
    id: String,
    author: Signature,
    commiter: Signature,
    message: String,
    summary: String,
    body: Option<String>,
    time: u32,
}

impl TryFrom<&git2::Commit<'_>> for Commit {
    type Error = AppError;
    fn try_from(value: &git2::Commit) -> Result<Self, Self::Error> {
        Ok(Self {
            id: value.id().to_string(),
            commiter: (&value.committer()).try_into()?,
            author: (&value.author()).try_into()?,
            message: value.message().unwrap().to_string(),
            summary: value.summary().unwrap().to_string(),
            body: value.body().map(|item| item.to_string()),
            time: value.time().seconds() as u32,
        })
    }
}
