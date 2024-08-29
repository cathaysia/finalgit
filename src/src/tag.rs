use actix_web::{delete, web};
use actix_web::{get, post, Responder};
use itertools::Itertools;
use tracing::*;

use crate::common::Repo;
use crate::AppResult;

#[derive(Debug, Clone, serde::Serialize, serde::Deserialize)]
struct TagInfo {
    name: String,
    commit: String,
}

#[get("/repo/tags")]
pub async fn get_tags(info: web::Query<Repo>) -> AppResult<impl Responder> {
    let git = git2::Repository::open(&info.repo_path)?;
    let mut taginfos = vec![];
    git.tag_foreach(|oid, name| {
        let name = std::str::from_utf8(name).unwrap().to_string();
        let commit = oid.to_string();
        taginfos.push(TagInfo { name, commit });
        true
    })?;

    Ok(web::Json(taginfos))
}

#[derive(Debug, Clone, serde::Serialize, serde::Deserialize)]
struct Tag {
    #[serde(flatten)]
    repo: Repo,
    name: String,
}
#[delete("/repo/tag")]
pub async fn remove_tag(info: web::Query<Tag>) -> AppResult<String> {
    let git = git2::Repository::open(&info.repo.repo_path)?;
    git.tag_delete(&info.name)?;

    Ok(Default::default())
}
