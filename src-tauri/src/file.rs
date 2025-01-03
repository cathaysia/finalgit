use itertools::Itertools;
use std::path::Path;
use tauri_derive::export_ts;

use log::debug;

use crate::{AppResult, FileStatus, FileTree};

pub trait FileExt {
    async fn file_get_tree(&self, commit: &str) -> AppResult<Vec<FileTree>>;
    async fn file_get_content(&self, commit: &str, path: &str) -> AppResult<String>;
    async fn file_get_status(&self) -> AppResult<Vec<FileStatus>>;
}

#[export_ts(scope = "file")]
impl FileExt for git2::Repository {
    async fn file_get_tree(&self, commit: &str) -> AppResult<Vec<FileTree>> {
        let id = git2::Oid::from_str(commit)?;

        let commit = self.find_commit(id)?;
        let tree = commit.tree()?;
        let mut files = vec![];
        for item in tree.into_iter() {
            if let Some(item) = walk_cb(self, item) {
                files.push(item);
            }
        }
        files.sort();
        Ok(files)
    }

    async fn file_get_content(&self, commit: &str, path: &str) -> AppResult<String> {
        let commit = git2::Oid::from_str(commit)?;
        let commit = self.find_commit(commit)?;
        let tree = commit.tree()?;
        let entry = tree.get_path(Path::new(path))?;
        let entry = self.find_blob(entry.id())?;

        Ok(String::from_utf8(entry.content().to_vec())?)
    }

    async fn file_get_status(&self) -> AppResult<Vec<FileStatus>> {
        let status = self
            .statuses(None)?
            .into_iter()
            .filter_map(|item| {
                let path = item.path().unwrap();
                let status = item.status();

                if status.contains(git2::Status::IGNORED) {
                    return None;
                }

                Some(FileStatus {
                    path: path.into(),
                    status: status.bits(),
                })
            })
            .collect_vec();

        Ok(status)
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
                        mode: item.filemode(),
                    })
                }
                git2::ObjectType::Blob => Some(FileTree::File {
                    filename: item.name().unwrap().to_string(),
                    mode: item.filemode(),
                }),
                _ => {
                    debug!("unknown object: {kind:#?}");
                    None
                }
            }
        }
    }
}
