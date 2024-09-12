use crate::ext::RepoExt;
use crate::utils;

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
