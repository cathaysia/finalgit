use std::path::PathBuf;

use crate::command_context::CommandContext;

pub struct App {
    pub repo_dir: PathBuf,
}

impl App {
    pub fn context(&self) -> CommandContext {
        let repo = git2::Repository::open(&self.repo_dir).unwrap();
        CommandContext { repo }
    }
}
