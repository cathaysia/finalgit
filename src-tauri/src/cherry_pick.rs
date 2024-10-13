use crate::AppResult;
use git2::{build::CheckoutBuilder, CherrypickOptions};
use tauri_derive::export_ts;

pub trait CherryPickExt {
    fn cherrypick(&self, commit: &str) -> AppResult<()>;
}

#[export_ts]
impl CherryPickExt for git2::Repository {
    /// Cherry-pick the given commit, producing changes in the index and working directory.
    fn cherrypick(&self, commit: &str) -> AppResult<()> {
        let commit = self.find_commit(commit.parse()?)?;

        let mut opts = CherrypickOptions::new();
        let mut ck = CheckoutBuilder::new();
        ck.safe();
        opts.checkout_builder(ck);

        self.cherrypick(&commit, Some(&mut opts))?;

        Ok(())
    }
}
