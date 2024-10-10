use crate::utils;
use crate::AppResult;
use crate::RepoExt;
use git2::build::CheckoutBuilder;
use git2::Oid;

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
