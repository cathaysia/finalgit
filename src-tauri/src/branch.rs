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
pub fn get_file_content(repo_path: &str, commit: &str, path: &str) -> AppResult<Vec<u8>> {
    utils::open_repo(repo_path)?.get_file_content(commit, path)
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
pub fn add_to_stage(repo_path: &str, files: Vec<&str>) -> AppResult<()> {
    utils::open_repo(repo_path)?.add_to_stage(&files)
}

#[tauri::command]
#[specta::specta]
pub fn remove_from_stage(repo_path: &str, files: Vec<&str>) -> AppResult<()> {
    utils::open_repo(repo_path)?.remove_from_stage(&files)
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
