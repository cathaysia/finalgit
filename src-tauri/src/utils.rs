use std::process::Stdio;
use std::str::FromStr;

use crate::branch::RepoExt;
use crate::AppError;
use crate::AppResult;
use filetime::FileTime;
use itertools::Itertools;
use tauri_derive::export_ts;

pub trait UtilExt {
    fn get_head_modify_time(repo_path: &str) -> AppResult<f64>;
    fn assume_language(file_name: &str) -> AppResult<Option<String>>;

    fn git_get_version(&self) -> AppResult<semver::Version>;
    fn gpg_get_secret_list() -> AppResult<Vec<String>>;
}

#[export_ts(scope = "utils")]
impl UtilExt for git2::Repository {
    fn get_head_modify_time(repo_path: &str) -> AppResult<f64> {
        let path = std::path::Path::new(repo_path).canonicalize()?;

        if !path.exists() || !path.is_dir() {
            return Err(crate::AppError::NoRepo);
        }

        let meta = path.metadata()?;
        let mtime = FileTime::from_last_modification_time(&meta);

        Ok(mtime.seconds() as f64)
    }

    fn assume_language(file_name: &str) -> AppResult<Option<String>> {
        for (pat, ty) in LANGUAGE_DEFINES {
            if glob_match::glob_match(pat, file_name) {
                return Ok(Some(ty.to_string()));
            }
        }
        Ok(None)
    }
    fn git_get_version(&self) -> AppResult<semver::Version> {
        let version = self.exec_git(["--version", "--no-build-options"])?;
        let version = String::from_utf8(version.stdout)?;
        let v = version.split(' ').collect_vec();
        if v.len() != 3 {
            return Err(AppError::BadStatus);
        }
        Ok(semver::Version::from_str(v[2].trim())?)
    }

    fn gpg_get_secret_list() -> AppResult<Vec<String>> {
        let mut res = vec![];
        let p = exec_proc(None, "gpg", ["--list-secret-keys", "--keyid-format=short"])?;
        let output = String::from_utf8(p.stdout)?;
        for item in output.lines() {
            if !item.contains("Key fingerprint") {
                continue;
            }
            if let Some((_, k)) = item.split_once("=") {
                let k = k.replace(" ", "");
                res.push(k);
            }
        }

        Ok(res)
    }
}

pub fn open_repo(repo_path: &str) -> AppResult<git2::Repository> {
    Ok(git2::Repository::open(repo_path)?)
}

static LANGUAGE_DEFINES: [(&str, &str); 18] = [
    ("*.tsx", "tsx"),
    ("*.html", "html"),
    ("*.js", "javascript"),
    ("*.jsx", "jsx"),
    ("*.md", "markdown"),
    ("*.json", "json"),
    ("*.py", "python"),
    ("*.ts", "typescript"),
    ("*.rs", "rust"),
    ("*.sql", "sql"),
    ("*.xml", "xml"),
    ("*.sass", "sass"),
    ("*.css", "css"),
    ("*.{c,h}", "c"),
    ("*.{cpp,hpp,cc,cxx}", "cpp"),
    ("*.{nix}", "nix"),
    ("*.svelte", "svelte"),
    ("*.vue", "vue"),
];

fn exec_proc<I, S>(path: Option<&str>, cmd: &str, args: I) -> AppResult<std::process::Output>
where
    I: IntoIterator<Item = S>,
    S: AsRef<std::ffi::OsStr>,
{
    let mut output = std::process::Command::new(cmd);
    output
        .stdout(Stdio::piped())
        .stderr(Stdio::piped())
        .env("LANG", "C")
        .env("GIT_TERMINAL_PROMPT", "0")
        .args(args);
    if let Some(path) = path {
        output.current_dir(path);
    }
    let output = output.spawn()?.wait_with_output()?;

    if output.status.code().unwrap() != 0 {
        let err = std::str::from_utf8(&output.stderr)?;
        return Err(AppError::Spawn(err.to_string()));
    }

    Ok(output)
}

#[cfg(test)]
mod test {
    use super::*;

    #[test]
    fn test_ft() {
        let v = [("README.md", "markdown")];

        for (path, ty) in v {
            let lang = assume_language(path).unwrap().unwrap();
            assert_eq!(lang, ty)
        }
    }
    #[test]
    fn test_version() {
        let repo = crate::utils::open_repo("../").unwrap();
        repo.git_get_version().unwrap();
    }

    #[test]
    fn test_gpg() {
        let repo = git2::Repository::gpg_get_secret_list().unwrap();
        println!("{repo:#?}")
    }
}
