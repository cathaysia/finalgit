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
    Dir { dir: String, files: Box<FileTree> },
}

#[get("/repo/tree/")]
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
        let file_name = item.name().unwrap();
        files.push(file_name.to_string());
    }
    Ok(web::Json(files))
}
