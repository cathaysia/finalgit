use std::path::{Path, PathBuf};
use std::str::FromStr;

use actix_web::{delete, web};
use actix_web::{get, post, Responder};
use itertools::Itertools;
use tracing::*;

use crate::common::Repo;
use crate::AppResult;

#[derive(Debug, Clone, serde::Serialize, serde::Deserialize)]
struct TreeParam {
    #[serde(flatten)]
    repo: Repo,
    commit: Option<String>,
}

#[derive(Debug, Clone, serde::Serialize, serde::Deserialize)]
enum FileTree {
    File(String),
    Dir { dir: String, files: Vec<FileTree> },
}

#[get("/repo/tree")]
pub async fn get_tree(params: web::Query<TreeParam>) -> AppResult<impl Responder> {
    let repo = git2::Repository::open(&params.repo.repo_path)?;
    let id = match &params.commit {
        Some(commit) => git2::Oid::from_str(commit)?,
        None => {
            let header = repo.head()?;
            header.target().unwrap()
        }
    };
    let commit = repo.find_commit(id)?;
    let tree = commit.tree()?;
    let mut files = vec![];
    for item in tree.into_iter() {
        files.push(walk_cb(&repo, Path::new(""), item));
    }
    Ok(web::Json(files))
}

fn walk_cb(repo: &git2::Repository, base: &Path, item: git2::TreeEntry) -> FileTree {
    let path = base.join(item.name().unwrap());

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
                        files.push(walk_cb(repo, &path, item));
                    }
                    FileTree::Dir {
                        dir: path.to_str().unwrap().to_string(),
                        files,
                    }
                }
                git2::ObjectType::Blob => FileTree::File(path.to_str().unwrap().to_string()),
                _ => todo!(),
            }
        }
    }
}
