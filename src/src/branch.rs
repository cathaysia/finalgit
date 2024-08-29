use std::borrow::Borrow;
use std::hash::Hash;

use actix_web::{delete, web};
use actix_web::{get, post, Responder};
use itertools::Itertools;
use tracing::*;

use crate::common::Repo;
use crate::AppResult;

#[derive(Debug, Clone, serde::Serialize, serde::Deserialize)]
struct Branch {
    #[serde(flatten)]
    repo: Repo,
    name: String,
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

#[get("/repo/branch/")]
pub async fn get_branch_info(info: web::Query<Repo>) -> AppResult<impl Responder> {
    let repo_path = info.repo_path.as_str();
    trace!("open repo: {repo_path}");
    let repo = git2::Repository::open(repo_path)?;
    let branches = repo
        .branches(None)?
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

#[derive(Debug, Clone, serde::Serialize, serde::Deserialize)]
struct SetRemoteBranchParam {
    #[serde(flatten)]
    branch: Branch,
    remote: Option<String>,
}

#[post("/repo/branch/set")]
pub async fn set_remote_branch(info: web::Json<SetRemoteBranchParam>) -> AppResult<String> {
    let git = git2::Repository::open(&info.branch.repo.repo_path)?;
    let mut branch = git.find_branch(&info.branch.name, git2::BranchType::Local)?;
    branch.set_upstream(info.remote.as_deref())?;

    Ok(Default::default())
}

#[derive(Debug, Clone, serde::Serialize, serde::Deserialize)]
struct RenameBranchParam {
    branch: Branch,
    to: String,
}
#[post("/repo/branch/rename")]
pub async fn rename_branch(info: web::Json<RenameBranchParam>) -> AppResult<String> {
    let git = git2::Repository::open(&info.branch.repo.repo_path)?;
    let mut branch = git.find_branch(&info.branch.name, git2::BranchType::Local)?;
    let _ = branch.rename(&info.to, true)?;

    Ok(Default::default())
}

#[delete("/repo/branch")]
pub async fn remove_branch(info: web::Query<Branch>) -> AppResult<String> {
    let git = git2::Repository::open(&info.repo.repo_path)?;
    let mut branch = git.find_branch(&info.name, git2::BranchType::Local)?;
    branch.delete()?;

    Ok(Default::default())
}

#[derive(Debug, Clone, serde::Serialize, serde::Deserialize)]
struct Author {
    name: String,
    email: String,
}

#[derive(Debug, Clone, serde::Serialize, serde::Deserialize)]
struct CommitInfo {
    hash: String,
    author: Author,
    commiter: Author,
    message: String,
    summary: String,
    time: u64,
}

#[get("/repo/commits")]
pub async fn get_commits(info: web::Query<Branch>) -> AppResult<impl Responder> {
    let repo = git2::Repository::open(&info.repo.repo_path)?;
    let branch = repo.find_branch(&info.name, git2::BranchType::Local)?;
    let oid = branch.get().target().unwrap();

    let mut walker = repo.revwalk()?;
    walker.push(oid)?;
    walker.set_sorting(git2::Sort::TIME)?;

    let mut commits = vec![];
    for id in walker {
        let id = id?;
        let commit = repo.find_commit(id)?;
        let author = Author {
            name: commit.author().name().unwrap().into(),
            email: commit.author().email().unwrap().into(),
        };
        let commiter = Author {
            name: commit.committer().name().unwrap().into(),
            email: commit.committer().email().unwrap().into(),
        };
        let info = commit.message().unwrap();
        let summary = commit.summary().unwrap();
        let hash = commit.id().to_string();
        let date = commit.time().seconds();
        commits.push(CommitInfo {
            hash,
            author,
            commiter,
            message: info.into(),
            summary: summary.into(),
            time: date as u64,
        });
    }

    Ok(web::Json(commits))
}
