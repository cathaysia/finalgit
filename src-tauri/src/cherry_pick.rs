use crate::AppResult;
use git2::{build::CheckoutBuilder, CherrypickOptions};

use crate::utils;

/// Cherry-pick the given commit, producing changes in the index and working directory.
#[tauri::command]
#[specta::specta]
pub fn cherrypick(repo_path: &str, commit: &str) -> AppResult<()> {
    let repo = utils::open_repo(repo_path)?;

    let commit = repo.find_commit(commit.parse()?)?;

    let mut opts = CherrypickOptions::new();
    let mut ck = CheckoutBuilder::new();
    ck.safe();
    opts.checkout_builder(ck);

    repo.cherrypick(&commit, Some(&mut opts))?;

    Ok(())
}
