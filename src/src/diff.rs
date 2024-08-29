use actix_web::{delete, web};
use actix_web::{get, post, Responder};
use itertools::Itertools;
use tracing::*;

use crate::common::Repo;
use crate::AppResult;

#[derive(Debug, Clone, serde::Serialize, serde::Deserialize)]
struct FileStatus {
    path: String,
    status: u32,
}

#[get("/repo/changes")]
pub async fn changes(info: web::Query<Repo>) -> AppResult<impl Responder> {
    let git = git2::Repository::open(&info.repo_path)?;
    let status = git
        .statuses(None)?
        .into_iter()
        .map(|item| FileStatus {
            path: item.path().unwrap().into(),
            status: item.status().bits(),
        })
        .collect_vec();

    Ok(web::Json(status))
}
