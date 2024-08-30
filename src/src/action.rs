use actix_web::{delete, web};
use actix_web::{get, post, Responder};
use itertools::Itertools;
use tracing::*;

use crate::common::Repo;
use crate::AppResult;

#[derive(Debug, Clone, serde::Serialize, serde::Deserialize)]
struct TagInfo {
    #[serde(flatten)]
    repo: Repo,
    files: Vec<String>,
}

#[post("/repo/action/add")]
pub async fn add_files(info: web::Json<TagInfo>) -> AppResult<String> {
    let mut cmd = tokio::process::Command::new("git")
        .current_dir(&info.repo.repo_path)
        .arg("add")
        .args(&info.files)
        .spawn()?;
    let _res = cmd.wait().await?;
    // TODO: hand error
    Ok(Default::default())
}

#[derive(Debug, Clone, serde::Serialize, serde::Deserialize)]
struct PushProps {
    #[serde(flatten)]
    repo: Repo,
    force: bool,
}

#[post("/repo/action/push")]
pub async fn push_commit(info: web::Json<PushProps>) -> AppResult<String> {
    let mut cmd = tokio::process::Command::new("git");
    let mut cmd = cmd.current_dir(&info.repo.repo_path).arg("push");
    if info.force {
        cmd.arg("-f");
    }

    let mut cmd = cmd.spawn()?;
    let _res = cmd.wait().await?;
    // TODO: hand error
    Ok(Default::default())
}

#[derive(Debug, Clone, serde::Serialize, serde::Deserialize)]
struct PullProps {
    #[serde(flatten)]
    repo: Repo,
}

#[post("/repo/action/pull")]
pub async fn pull_repo(info: web::Json<PullProps>) -> AppResult<String> {
    let mut cmd = tokio::process::Command::new("git");
    cmd.current_dir(&info.repo.repo_path)
        .arg("pull")
        .arg("--rebase");

    let mut cmd = cmd.spawn()?;
    let _res = cmd.wait().await?;
    // TODO: hand error
    Ok(Default::default())
}
