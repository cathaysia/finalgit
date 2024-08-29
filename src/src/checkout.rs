use std::str::FromStr;

use actix_web::{delete, web};
use actix_web::{get, post, Responder};
use itertools::Itertools;
use tracing::*;

use crate::common::Repo;
use crate::AppResult;

#[derive(Debug, Clone, serde::Serialize, serde::Deserialize)]
struct CheckParam {
    #[serde(flatten)]
    repo: Repo,
    commit: String,
    file: Vec<String>,
    force: bool,
}

#[get("/repo/checkout/")]
pub async fn checkout(params: web::Query<CheckParam>) -> AppResult<String> {
    let repo = git2::Repository::open(&params.repo.repo_path)?;
    let oid = git2::Oid::from_str(&params.commit)?;
    let commit = repo.find_commit(oid)?;
    let mut opts = git2::build::CheckoutBuilder::new();
    params.file.iter().for_each(|file| {
        opts.path(file);
    });
    if params.force {
        opts.force();
    }

    repo.checkout_head(Some(&mut opts))?;
    todo!()
}
