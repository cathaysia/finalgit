use git2::{build::CheckoutBuilder, ObjectType, Oid};
use tauri_derive::export_ts;

use std::path::Path;

use crate::{AppError, AppResult, FileStatus};

pub trait StageExt {
    fn add_to_stage(&self, files: Vec<FileStatus>) -> AppResult<()>;
    fn remove_from_stage(&self, files: Vec<&str>) -> AppResult<()>;
    fn restore_file(&self, files: Vec<FileStatus>, commit: Option<&str>) -> AppResult<()>;
}

#[export_ts(scope = "stage")]
impl StageExt for git2::Repository {
    fn add_to_stage(&self, files: Vec<FileStatus>) -> AppResult<()> {
        let mut index = self.index()?;
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

    fn remove_from_stage(&self, files: Vec<&str>) -> AppResult<()> {
        let head = self.head()?.target().ok_or(AppError::NoRepo)?;
        let obj = self.find_object(head, Some(ObjectType::Commit))?;
        self.reset_default(Some(&obj), files)?;
        Ok(())
    }

    fn restore_file(&self, files: Vec<FileStatus>, commit: Option<&str>) -> AppResult<()> {
        let tree = match commit {
            Some(hash) => {
                let id = Oid::from_str(hash)?;
                let commit = self.find_commit(id)?;
                commit.tree()?.into_object()
            }
            None => {
                let head = self.head()?.target().ok_or(AppError::NoRepo)?;
                let obj = self.find_object(head, Some(ObjectType::Commit))?;

                let tree = obj.peel_to_tree()?.into_object();
                tree
            }
        };
        let mut opts = CheckoutBuilder::new();
        opts.safe().force();

        for item in files {
            opts.path(item.path);
        }

        self.checkout_tree(&tree, Some(&mut opts))?;
        Ok(())
    }
}
