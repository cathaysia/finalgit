use crate::utils;
use crate::AppError;
use crate::AppResult;
use crate::RepoExt;
use crate::Signature;
use git2::build::CheckoutBuilder;
use git2::Oid;
use specta::Type;

#[tauri::command]
#[specta::specta]
pub fn commit_checkout(repo_path: &str, commit: &str) -> AppResult<()> {
    let repo = utils::open_repo(repo_path)?;
    let oid = Oid::from_str(commit)?;
    repo.set_head_detached(oid)?;

    let mut opts = CheckoutBuilder::new();
    let opts = opts.safe().force();
    repo.checkout_head(Some(opts))?;

    Ok(())
}

#[tauri::command]
#[specta::specta]
pub fn checkout_file(repo_path: &str, commit: &str, path: &str) -> AppResult<()> {
    let repo = utils::open_repo(repo_path)?;
    repo.exec_git(["checkout", commit, path])?;

    Ok(())
}

#[derive(Debug, Clone, serde::Serialize, serde::Deserialize, Type)]
pub struct Commit {
    id: String,
    author: Signature,
    commiter: Signature,
    message: String,
    summary: String,
    body: String,
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
            body: value.body().unwrap().to_string(),
            time: value.time().seconds() as u32,
        })
    }
}

#[tauri::command]
#[specta::specta]
pub fn commit_info(repo_path: &str, commit: &str) -> AppResult<Commit> {
    let repo = utils::open_repo(repo_path)?;
    let commit = repo.find_commit(Oid::from_str(commit)?)?;

    (&commit).try_into()
}
