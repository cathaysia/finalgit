use crate::ty::BranchType;
use serde::{Deserialize, Serialize};
use specta::Type;
use std::process::Stdio;

use log::info;

use crate::ext::RepoExt;
pub use crate::ext::*;
use crate::{utils, AppError};

use crate::{error::AppResult, BranchInfo, TagInfo};

#[tauri::command]
#[specta::specta]
pub fn get_branch_info(repo_path: &str) -> AppResult<Vec<BranchInfo>> {
    let repo = utils::open_repo(repo_path)?;
    repo.get_branches()
}

#[tauri::command]
#[specta::specta]
pub fn open_repo(repo_path: &str) -> AppResult<()> {
    let _ = utils::open_repo(repo_path)?;
    Ok(())
}

#[tauri::command]
#[specta::specta]
pub fn get_tag_info(repo_path: &str) -> AppResult<Vec<TagInfo>> {
    let repo = utils::open_repo(repo_path)?;
    repo.get_tags()
}

#[tauri::command]
#[specta::specta]
pub fn checkout_remote(repo_path: &str, branch: &str) -> AppResult<()> {
    info!("checkout remote {branch}");
    let _ = utils::open_repo(repo_path)?;
    let output = std::process::Command::new("git")
        .stdout(Stdio::null())
        .stderr(Stdio::piped())
        .env("GIT_TERMINAL_PROMPT", "0")
        .arg("checkout")
        .arg(branch)
        .arg("--force")
        .current_dir(repo_path)
        .spawn()?
        .wait_with_output()?;

    if output.status.code().unwrap() != 0 {
        let err = std::str::from_utf8(&output.stderr)?;
        return Err(AppError::Spawn(err.to_string()));
    }

    Ok(())
}

#[derive(Debug, Clone, PartialEq, Eq, serde::Serialize, serde::Deserialize, Type)]
pub struct HeadInfo {
    oid: String,
    is_detached: bool,
    is_rebasing: bool,
}

#[tauri::command]
#[specta::specta]
pub fn get_repo_head(repo_path: &str) -> AppResult<HeadInfo> {
    let repo = utils::open_repo(repo_path)?;
    let head = repo.head()?;
    let oid = head.target().unwrap().to_string();

    let is_rebasing = repo.open_rebase(None).is_ok();

    Ok(HeadInfo {
        oid,
        is_detached: repo.head_detached()?,
        is_rebasing,
    })
}

#[tauri::command]
#[specta::specta]
pub fn branch_fetch(repo_path: &str, branch: &str) -> AppResult<()> {
    let repo = utils::open_repo(repo_path)?;
    let local = repo.find_branch(branch, git2::BranchType::Local)?;
    let upstream = local.upstream()?.get().target().unwrap().to_string();
    let mut v = repo.find_remote(&upstream)?;
    v.fetch(&[branch], None, None)?;

    Ok(())
}

#[tauri::command]
#[specta::specta]
pub fn branch_push(repo_path: &str, force: bool) -> AppResult<()> {
    let repo = utils::open_repo(repo_path)?;
    if force {
        repo.exec_git(["push", "-f"])?;
    } else {
        repo.exec_git(["push"])?;
    }

    Ok(())
}

#[derive(Debug, Default, Serialize, Deserialize, Type)]
pub struct PushStatus {
    unpush: u32,
    unpull: u32,
}

#[tauri::command]
#[specta::specta]
pub fn branch_status(repo_path: &str, branch: &str) -> AppResult<PushStatus> {
    let repo = utils::open_repo(repo_path)?;
    let local = repo.find_branch(branch, git2::BranchType::Local)?;
    let Ok(upstream) = local.upstream() else {
        return Ok(Default::default());
    };
    let upstream = upstream.into_reference();
    // let upstream =
    let upstream = upstream.name().unwrap();
    let (_, upstream) = upstream.split_once('/').unwrap();
    let (_, upstream) = upstream.split_once('/').unwrap();

    let local = repo.get_commits(branch, BranchType::Local)?;
    let remote = repo.get_commits(upstream, BranchType::Remote)?;

    Ok(PushStatus {
        unpush: local.len().saturating_sub(remote.len()) as u32,
        unpull: remote.len().saturating_sub(local.len()) as u32,
    })
}
