use tauri::State;

use crate::{error::AppResult, state::AppState, TagInfo};

#[derive(Debug, Clone, serde::Serialize, serde::Deserialize)]
pub struct Repo {
    pub repo_path: String,
}

#[derive(Debug, Clone, Hash, PartialEq, Eq, serde::Serialize, serde::Deserialize)]
pub struct BranchInfo {
    pub remote: Option<String>,
    pub name: String,
    pub kind: BranchKind,
    pub commit: String,
    pub is_head: bool,
}

#[derive(
    Debug, Default, Copy, Clone, Hash, PartialEq, Eq, serde::Serialize, serde::Deserialize,
)]
pub enum BranchKind {
    #[default]
    Local,
    Remote,
}

impl From<git2::BranchType> for BranchKind {
    fn from(value: git2::BranchType) -> Self {
        match value {
            git2::BranchType::Local => Self::Local,
            git2::BranchType::Remote => Self::Remote,
        }
    }
}

impl From<BranchKind> for git2::BranchType {
    fn from(value: BranchKind) -> Self {
        match value {
            BranchKind::Remote => git2::BranchType::Remote,
            BranchKind::Local => git2::BranchType::Local,
        }
    }
}

#[tauri::command]
pub async fn get_branch_info(state: State<'_, AppState>) -> AppResult<Vec<BranchInfo>> {
    state.get_branches()
}

#[tauri::command]
pub async fn open_repo(state: State<'_, AppState>, repo_path: &str) -> AppResult<()> {
    state.open(repo_path)
}

#[tauri::command]
pub async fn is_opened(state: State<'_, AppState>) -> AppResult<bool> {
    Ok(state.git2.lock().unwrap().is_some())
}

#[tauri::command]
pub async fn get_tag_info(state: State<'_, AppState>) -> AppResult<Vec<TagInfo>> {
    state.get_tags()
}

#[tauri::command]
pub async fn rename_branch(
    state: State<'_, AppState>,
    info: BranchInfo,
    to: &str,
) -> AppResult<()> {
    state.rename_branch(info, to)
}

#[tauri::command]
pub async fn remove_branch(state: State<'_, AppState>, info: BranchInfo) -> AppResult<()> {
    state.remove_branch(info)
}

#[tauri::command]
pub async fn create_branch(state: State<'_, AppState>, name: &str, commit: &str) -> AppResult<()> {
    state.create_branch(name, commit)
}

#[tauri::command]
pub async fn checkout_branch(state: State<'_, AppState>, branch: &str) -> AppResult<()> {
    state.checkout_branch(branch)
}
