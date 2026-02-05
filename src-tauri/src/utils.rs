use std::process::Stdio;

use pulldown_cmark::{html, Options, Parser};
use specta::Type;
use std::str::FromStr;
use tokio::io::AsyncReadExt;
use tokio::io::BufReader;
use tokio::process;

use crate::branch::RepoExt;
use crate::AppError;
use crate::AppResult;
use filetime::FileTime;
use itertools::Itertools;
use tauri::ipc;
use tauri_derive::export_ts;

#[derive(Debug, Default, Clone, serde::Serialize, serde::Deserialize, Type)]
#[serde(default)]
pub struct CloneArgs {
    pub url: String,
    pub target: String,
    pub depth: i32,
    pub mirror: bool,
    pub recursive: bool,
}

pub trait UtilExt {
    fn get_head_modify_time(repo_path: &str) -> AppResult<f64>;

    fn git_get_version(&self) -> AppResult<semver::Version>;
    fn gpg_get_secret_list() -> AppResult<Vec<String>>;
    fn markdown_to_html(markdown: &str, theme: Option<String>) -> AppResult<String>;

    async fn git_clone(args: CloneArgs, reader: ipc::Channel<&[u8]>) -> AppResult<()>;
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

    fn markdown_to_html(markdown: &str, theme: Option<String>) -> AppResult<String> {
        let mut options = Options::empty();
        options.insert(Options::ENABLE_TABLES);
        options.insert(Options::ENABLE_STRIKETHROUGH);
        options.insert(Options::ENABLE_TASKLISTS);
        options.insert(Options::ENABLE_FOOTNOTES);
        options.insert(Options::ENABLE_HEADING_ATTRIBUTES);
        options.insert(Options::ENABLE_SMART_PUNCTUATION);

        let parser = Parser::new_ext(markdown, options);
        let _ = theme;
        let mut out = String::new();
        html::push_html(&mut out, parser);
        Ok(out)
    }

    async fn git_clone(args: CloneArgs, chan: ipc::Channel<&[u8]>) -> AppResult<()> {
        let mut cmd = process::Command::new("git");
        cmd.arg("clone")
            .env("LANG", "C")
            .env("GIT_TERMINAL_PROMPT", "0")
            .arg("--progress")
            .arg(args.url)
            .arg(args.target)
            .stdin(Stdio::null())
            .stderr(Stdio::piped());

        if args.depth > 0 {
            cmd.arg("--depth").arg(args.depth.to_string());
        };
        if args.recursive {
            cmd.arg("--recursive");
        }
        if args.mirror {
            cmd.arg("--mirror");
        }

        let mut handle = cmd.spawn()?;

        let stderr = handle.stderr.take().unwrap();

        let mut reader = BufReader::new(stderr);
        let mut buffer = [0u8; 1024];

        loop {
            match reader.read(&mut buffer).await? {
                0 => break,
                n => {
                    chan.send(&buffer[0..n])?;
                }
            }
        }

        let _ = handle.wait_with_output().await?;

        Ok(())
    }
}

pub fn open_repo(repo_path: &str) -> AppResult<git2::Repository> {
    Ok(git2::Repository::open(repo_path)?)
}

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
