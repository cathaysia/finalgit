use tauri::State;

use crate::{
    error::AppResult, state::AppState, BranchInfo, BranchType, CommitInfo, FileStatus, FileTree,
    TagInfo,
};

#[tauri::command]
#[specta::specta]
pub fn get_branch_info(state: State<'_, AppState>) -> AppResult<Vec<BranchInfo>> {
    state.get_branches()
}

#[tauri::command]
#[specta::specta]
pub fn open_repo(state: State<'_, AppState>, repo_path: &str) -> AppResult<()> {
    state.open(repo_path)
}

#[tauri::command]
#[specta::specta]
pub fn is_opened(state: State<'_, AppState>) -> AppResult<bool> {
    Ok(state.git2.lock().unwrap().is_some())
}

#[tauri::command]
#[specta::specta]
pub fn get_tag_info(state: State<'_, AppState>) -> AppResult<Vec<TagInfo>> {
    state.get_tags()
}

#[tauri::command]
#[specta::specta]
pub fn rename_branch(state: State<'_, AppState>, info: BranchInfo, to: &str) -> AppResult<()> {
    state.rename_branch(info, to)
}

#[tauri::command]
#[specta::specta]
pub fn remove_branch(state: State<'_, AppState>, info: BranchInfo) -> AppResult<()> {
    state.remove_branch(info)
}

#[tauri::command]
#[specta::specta]
pub fn create_branch(state: State<'_, AppState>, name: &str, commit: &str) -> AppResult<()> {
    state.create_branch(name, commit)
}

#[tauri::command]
#[specta::specta]
pub fn checkout_branch(state: State<'_, AppState>, branch: &str) -> AppResult<()> {
    state.checkout_branch(branch)
}

#[tauri::command]
#[specta::specta]
pub fn get_file_tree(state: State<'_, AppState>, commit: &str) -> AppResult<Vec<FileTree>> {
    state.get_file_tree(commit)
}

#[tauri::command]
#[specta::specta]
pub fn get_file_content(
    state: State<'_, AppState>,
    commit: &str,
    path: &str,
) -> AppResult<Vec<u8>> {
    state.get_file_content(commit, path)
}

#[tauri::command]
#[specta::specta]
pub fn get_current_status(state: State<'_, AppState>) -> AppResult<Vec<FileStatus>> {
    state.get_current_status()
}

#[tauri::command]
#[specta::specta]
pub fn get_commits(
    state: State<'_, AppState>,
    branch: &str,
    kind: BranchType,
) -> AppResult<Vec<CommitInfo>> {
    state.get_commits(branch, kind.into())
}
