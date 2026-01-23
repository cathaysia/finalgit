use crate::{branch::RepoExt, utils::UtilExt, AppError};
use git2::Sort;
use std::{fs, path::PathBuf};
use tauri_derive::export_ts;

use crate::AppResult;

pub trait RebaseExt {
    async fn rebase_abort(&self) -> AppResult<()>;
    async fn rebase_interactive_begin(&self) -> AppResult<()>;
    async fn rebase_continue(&self) -> AppResult<()>;
    async fn rebase_reorder(&self, source: &str, target: &str) -> AppResult<()>;
}

#[export_ts(scope = "rebase")]
impl RebaseExt for git2::Repository {
    async fn rebase_abort(&self) -> AppResult<()> {
        self.exec_git(["rebase", "--abort"])?;
        Ok(())
    }

    async fn rebase_interactive_begin(&self) -> AppResult<()> {
        let git_ver = self.git_get_version()?;
        let mut args = vec![
            "rebase",
            "--interactive",
            "--autostash",
            "--keep-empty",
            "--no-autosquash",
        ];
        if git_ver >= semver::Version::new(2, 22, 0) {
            args.push("--rebase-merges");
        }
        self.exec_git(args)?;
        Ok(())
    }

    async fn rebase_continue(&self) -> AppResult<()> {
        let _ = self.exec_git(["rebase", "--continue"])?;
        Ok(())
    }

    async fn rebase_reorder(&self, source: &str, target: &str) -> AppResult<()> {
        let head = self.head()?;
        if !head.is_branch() {
            return Err(AppError::InvalidOperation(
                "Cannot reorder commits on detached HEAD.".to_string(),
            ));
        }
        let branch_name = head.shorthand().ok_or(AppError::BadStatus)?.to_string();
        let branch = self.find_branch(&branch_name, git2::BranchType::Local)?;
        let upstream_oid = branch
            .upstream()
            .ok()
            .and_then(|upstream| upstream.get().target());
        let head_oid = head.target().ok_or(AppError::BadStatus)?;

        let mut revwalk = self.revwalk()?;
        revwalk.push(head_oid)?;
        if let Some(upstream_oid) = upstream_oid {
            revwalk.hide(upstream_oid)?;
        }
        revwalk.set_sorting(Sort::TOPOLOGICAL | Sort::REVERSE)?;

        let mut commits: Vec<String> = Vec::new();
        for oid in revwalk {
            let oid = oid?;
            let commit = self.find_commit(oid)?;
            if commit.parent_count() > 1 {
                return Err(AppError::InvalidOperation(
                    "Merge commits are not supported for reordering.".to_string(),
                ));
            }
            commits.push(oid.to_string());
        }

        if commits.is_empty() {
            return Ok(());
        }

        let from = commits.iter().position(|oid| oid == source);
        let to = commits.iter().position(|oid| oid == target);
        if from.is_none() || to.is_none() {
            return Err(AppError::InvalidOperation(
                "Selected commits are not in local history.".to_string(),
            ));
        }
        let from = from.unwrap();
        let to = to.unwrap();
        if from == to {
            return Ok(());
        }

        let mut reordered = commits;
        let source_oid = reordered.remove(from);
        let insert_at = if from < to { to - 1 } else { to };
        reordered.insert(insert_at, source_oid);

        let mut todo = String::new();
        for oid in reordered {
            todo.push_str("pick ");
            todo.push_str(&oid);
            todo.push('\n');
        }

        let temp_dir = std::env::temp_dir();
        let todo_path = temp_dir.join(format!("gitzip-rebase-{}.todo", head_oid));
        fs::write(&todo_path, todo)?;
        let editor_path = write_sequence_editor(&temp_dir, &todo_path)?;

        let output = run_git_rebase_with_editor(
            self,
            upstream_oid.as_ref().map(|oid| oid.to_string()),
            &editor_path,
        )?;
        let _ = fs::remove_file(&todo_path);
        let _ = fs::remove_file(&editor_path);
        if !output.status.success() {
            let err = std::str::from_utf8(&output.stderr)?;
            return Err(AppError::Spawn(err.to_string()));
        }

        Ok(())
    }
}

fn run_git_rebase_with_editor(
    repo: &git2::Repository,
    base: Option<String>,
    editor_path: &PathBuf,
) -> AppResult<std::process::Output> {
    let path = repo.path().to_str().unwrap();
    let path = path.replace("/.git/modules", "").replace("/.git", "");
    let path = std::path::Path::new(&path);
    let mut command = std::process::Command::new("git");
    command
        .stdin(std::process::Stdio::null())
        .stdout(std::process::Stdio::piped())
        .stderr(std::process::Stdio::piped())
        .env("LANG", "C")
        .env("GIT_TERMINAL_PROMPT", "0")
        .env("GIT_SEQUENCE_EDITOR", editor_path)
        .args([
            "rebase",
            "--interactive",
            "--autostash",
            "--keep-empty",
            "--no-autosquash",
        ])
        .current_dir(path);
    if let Some(base) = base {
        command.arg(base);
    } else {
        command.arg("--root");
    }

    #[cfg(target_os = "windows")]
    command.creation_flags(0x08000000);

    let output = command.spawn()?.wait_with_output()?;
    Ok(output)
}

fn write_sequence_editor(temp_dir: &PathBuf, todo_path: &PathBuf) -> AppResult<PathBuf> {
    #[cfg(target_os = "windows")]
    {
        let editor_path = temp_dir.join("gitzip-rebase-editor.cmd");
        let content = format!(
            "@echo off\r\ntype \"{}\" > \"%~1\"\r\n",
            todo_path.display()
        );
        fs::write(&editor_path, content)?;
        return Ok(editor_path);
    }
    #[cfg(not(target_os = "windows"))]
    {
        use std::os::unix::fs::PermissionsExt;
        let editor_path = temp_dir.join("gitzip-rebase-editor.sh");
        let content = format!("#!/bin/sh\ncat \"{}\" > \"$1\"\n", todo_path.display());
        fs::write(&editor_path, content)?;
        let mut perms = fs::metadata(&editor_path)?.permissions();
        perms.set_mode(0o755);
        fs::set_permissions(&editor_path, perms)?;
        return Ok(editor_path);
    }
}
