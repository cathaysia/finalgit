use std::sync::Mutex;

use tauri_derive::export_ts;

static REPO_PATH: std::sync::Mutex<std::option::Option<std::string::String>> =
    Mutex::new(Option::<String>::None);

pub fn set_repo_path(path: String) {
    REPO_PATH.lock().unwrap().replace(path);
}

trait StateExt {
    fn take_repo_path() -> Option<String>;
}

#[export_ts(scope = "state")]
impl StateExt for git2::Repository {
    fn take_repo_path() -> Option<String> {
        REPO_PATH.lock().unwrap().take()
    }
}
