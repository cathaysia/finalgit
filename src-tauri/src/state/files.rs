use tracing::*;

use crate::{AppError, AppResult, AppState, FileTree};

impl AppState {
    pub fn get_file_tree(&self, commit: &str) -> AppResult<Vec<FileTree>> {
        let repo = self.git2.lock().unwrap();
        let repo = repo.as_ref().ok_or(AppError::NoRepo)?;

        let id = git2::Oid::from_str(commit)?;

        let commit = repo.find_commit(id)?;
        let tree = commit.tree()?;
        let mut files = vec![];
        for item in tree.into_iter() {
            if let Some(item) = walk_cb(repo, item) {
                files.push(item);
            }
        }
        files.sort();
        Ok(files)
    }
}

fn walk_cb(repo: &git2::Repository, item: git2::TreeEntry) -> Option<FileTree> {
    match item.kind() {
        None => todo!(),
        Some(kind) => {
            //
            match kind {
                git2::ObjectType::Tree => {
                    let tree = item.to_object(repo).unwrap();
                    let tree = tree.peel_to_tree().unwrap();
                    let mut files = vec![];
                    for item in tree.into_iter() {
                        if let Some(item) = walk_cb(repo, item) {
                            files.push(item);
                        }
                    }
                    files.sort();
                    Some(FileTree::Dir {
                        dir: item.name().unwrap().to_string(),
                        files,
                    })
                }
                git2::ObjectType::Blob => Some(FileTree::File(item.name().unwrap().to_string())),
                _ => {
                    debug!("unknown object: {kind:#?}");
                    None
                }
            }
        }
    }
}
