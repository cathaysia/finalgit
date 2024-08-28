use actix_web::{get, post, Responder};
use actix_web::{web, Result as WebResult};
use itertools::Itertools;
use tracing::*;

use crate::app::App;
use crate::command_context::RefName;

#[derive(Debug, Clone, serde::Serialize, serde::Deserialize)]
struct BranchIn {
    repo_path: String,
}

#[derive(Debug, Clone, Hash, PartialEq, Eq, serde::Serialize, serde::Deserialize)]
struct BranchInfo {
    remote: Option<String>,
    name: String,
    kind: BranchKind,
}

#[derive(Debug, Clone, Hash, PartialEq, Eq, serde::Serialize, serde::Deserialize)]
enum BranchKind {
    Remote,
    Local,
}

impl From<git2::BranchType> for BranchKind {
    fn from(value: git2::BranchType) -> Self {
        match value {
            git2::BranchType::Local => Self::Local,
            git2::BranchType::Remote => Self::Remote,
        }
    }
}

#[post("/repo/branch/")]
pub async fn branches(info: web::Json<BranchIn>) -> WebResult<impl Responder> {
    let repo_path = info.repo_path.as_str();
    trace!("open repo: {repo_path}");
    let repo = git2::Repository::open(repo_path).unwrap();
    let branches = repo
        .branches(None)
        .unwrap()
        .flatten()
        .map(|(branch, kind)| {
            let refname = branch.name().unwrap().unwrap();
            trace!(%refname);
            let (remote, branch) = match refname.split_once('/') {
                None => (None, refname),
                Some((remote, branch)) => (Some(remote), branch),
            };
            BranchInfo {
                remote: remote.map(|item| item.into()),
                name: branch.into(),
                kind: kind.into(),
            }
        })
        .collect_vec();
    trace!("get remote branches: {branches:?}");
    Ok(web::Json(branches))
}
