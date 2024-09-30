use git2::{build::CheckoutBuilder, ObjectType, Oid};

use std::path::Path;

use crate::{utils, AppError, AppResult, FileStatus};

#[tauri::command]
#[specta::specta]
pub fn add_to_stage(repo_path: &str, files: Vec<FileStatus>) -> AppResult<()> {
    let repo = utils::open_repo(repo_path)?;

    let mut index = repo.index()?;
    for item in files {
        let s = git2::Status::from_bits(item.status).ok_or(AppError::BadStatus)?;
        if s.is_wt_deleted() || s.is_index_deleted() {
            index.remove_path(Path::new(&item.path))?;
        } else {
            index.add_path(Path::new(&item.path))?
        }
    }
    index.write()?;
    Ok(())
}

#[tauri::command]
#[specta::specta]
pub fn remove_from_stage(repo_path: &str, files: Vec<&str>) -> AppResult<()> {
    let repo = utils::open_repo(repo_path)?;
    let head = repo.head()?.target().ok_or(AppError::NoRepo)?;
    let obj = repo.find_object(head, Some(ObjectType::Commit))?;
    repo.reset_default(Some(&obj), files)?;
    Ok(())
}

#[tauri::command]
#[specta::specta]
pub fn restore_file(
    repo_path: &str,
    files: Vec<FileStatus>,
    commit: Option<&str>,
) -> AppResult<()> {
    let repo = utils::open_repo(repo_path)?;
    let tree = match commit {
        Some(hash) => {
            let id = Oid::from_str(hash)?;
            let commit = repo.find_commit(id)?;
            commit.tree()?.into_object()
        }
        None => {
            let head = repo.head()?.target().ok_or(AppError::NoRepo)?;
            let obj = repo.find_object(head, Some(ObjectType::Commit))?;

            let tree = obj.peel_to_tree()?.into_object();
            tree
        }
    };
    let mut opts = CheckoutBuilder::new();
    opts.safe().force();

    for item in files {
        opts.path(item.path);
    }

    repo.checkout_tree(&tree, Some(&mut opts))?;
    Ok(())
}
