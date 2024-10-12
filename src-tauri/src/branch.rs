use serde::{Deserialize, Serialize};
use specta::Type;
use std::collections::HashMap;
use std::process::Stdio;

use log::info;

use crate::ext::RepoExt;
use crate::{utils, AppError};

use crate::{error::AppResult, BranchInfo, BranchType, CommitInfo, FileStatus, FileTree, TagInfo};

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
pub fn rename_branch(repo_path: &str, info: BranchInfo, to: &str) -> AppResult<()> {
    utils::open_repo(repo_path)?.rename_branch(info, to)
}

#[tauri::command]
#[specta::specta]
pub fn remove_branch(repo_path: &str, info: BranchInfo) -> AppResult<()> {
    utils::open_repo(repo_path)?.remove_branch(info)
}

#[tauri::command]
#[specta::specta]
pub fn create_branch(repo_path: &str, name: &str, commit: &str) -> AppResult<()> {
    utils::open_repo(repo_path)?.create_branch(name, commit)
}

#[tauri::command]
#[specta::specta]
pub fn checkout_branch(repo_path: &str, branch: &str) -> AppResult<()> {
    utils::open_repo(repo_path)?.checkout_branch(branch)
}

#[tauri::command]
#[specta::specta]
pub fn get_file_tree(repo_path: &str, commit: &str) -> AppResult<Vec<FileTree>> {
    utils::open_repo(repo_path)?.get_file_tree(commit)
}

#[tauri::command]
#[specta::specta]
pub fn get_file_content(repo_path: &str, commit: &str, path: &str) -> AppResult<String> {
    let content = utils::open_repo(repo_path)?.get_file_content(commit, path)?;
    Ok(String::from_utf8(content)?)
}

#[tauri::command]
#[specta::specta]
pub fn get_current_status(repo_path: &str) -> AppResult<Vec<FileStatus>> {
    utils::open_repo(repo_path)?.get_current_status()
}

#[tauri::command]
#[specta::specta]
pub fn get_commits(repo_path: &str, branch: &str, kind: BranchType) -> AppResult<Vec<CommitInfo>> {
    utils::open_repo(repo_path)?.get_commits(branch, kind.into())
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

#[tauri::command]
#[specta::specta]
pub fn create_commit(repo_path: &str, msg: String) -> AppResult<()> {
    utils::open_repo(repo_path)?.create_commit(&msg)
}

#[tauri::command]
#[specta::specta]
pub fn create_patch(repo_path: &str) -> AppResult<String> {
    utils::open_repo(repo_path)?.create_patch()
}

#[tauri::command]
#[specta::specta]
pub fn get_history(repo_path: &str, commit: &str) -> AppResult<Vec<CommitInfo>> {
    utils::open_repo(repo_path)?.get_history(commit)
}

#[tauri::command]
#[specta::specta]
pub fn get_config(repo_path: &str, key: &str) -> AppResult<String> {
    utils::open_repo(repo_path)?.get_config(key)
}

#[tauri::command]
#[specta::specta]
pub fn set_config(repo_path: &str, key: &str, value: &str) -> AppResult<()> {
    utils::open_repo(repo_path)?.set_config(key, value)
}

#[tauri::command]
#[specta::specta]
pub fn get_configes(repo_path: &str) -> AppResult<HashMap<String, String>> {
    utils::open_repo(repo_path)?.get_configes()
}

#[derive(Debug, Clone, PartialEq, Eq, serde::Serialize, serde::Deserialize, Type)]
pub struct HeadInfo {
    oid: String,
    is_detached: bool,
}

#[tauri::command]
#[specta::specta]
pub fn get_repo_head(repo_path: &str) -> AppResult<HeadInfo> {
    let repo = utils::open_repo(repo_path)?;
    let head = repo.head()?;
    let oid = head.target().unwrap().to_string();
    Ok(HeadInfo {
        oid,
        is_detached: repo.head_detached()?,
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

    let local = repo.get_commits(branch, git2::BranchType::Local)?;
    let remote = repo.get_commits(upstream, git2::BranchType::Remote)?;

    Ok(PushStatus {
        unpush: local.len().saturating_sub(remote.len()) as u32,
        unpull: remote.len().saturating_sub(local.len()) as u32,
    })
}
