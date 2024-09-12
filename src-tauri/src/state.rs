mod branch;
mod commits;
mod files;
mod tag;
use std::sync::Mutex;

use crate::{
    error::{AppError, AppResult},
    BranchInfo,
};

#[derive(Default)]
pub struct AppState {
    pub git2: Mutex<Option<git2::Repository>>,
}

impl AppState {
    pub fn open(&self, path: &str) -> AppResult<()> {
        let repo = git2::Repository::open(path)?;
        let _ = self.git2.lock().unwrap().insert(repo);
        Ok(())
    }
}
