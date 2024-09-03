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
