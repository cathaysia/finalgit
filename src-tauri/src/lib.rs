#![allow(dead_code)]

mod blame;
mod branch;
mod cherry_pick;
mod commit;
mod config;
mod error;
mod rebase;
mod stage;
mod stash;
mod ty;
mod utils;

pub use error::*;
pub use ty::*;

use tauri_plugin_log::{Target, TargetKind};

#[cfg_attr(mobile, tauri::mobile_entry_point)]
pub fn run() {
    let max_log = std::env::var("RUST_LOG").unwrap_or("OFF".to_string());
    let log_level = match max_log.to_uppercase().as_str() {
        "TRACE" => log::LevelFilter::Trace,
        "DEBUG" => log::LevelFilter::Debug,
        "INFO" => log::LevelFilter::Info,
        "WARN" => log::LevelFilter::Warn,
        "ERROR" => log::LevelFilter::Error,
        _ => log::LevelFilter::Off,
    };

    tauri::Builder::default()
        .plugin(tauri_plugin_fs::init())
        .plugin(tauri_plugin_store::Builder::new().build())
        .plugin(
            tauri_plugin_log::Builder::new()
                .level(log_level)
                .targets([
                    Target::new(TargetKind::Stdout),
                    Target::new(TargetKind::Webview),
                ])
                .build(),
        )
        .plugin(tauri_plugin_shell::init())
        .plugin(tauri_plugin_dialog::init())
        .plugin(tauri_plugin_window_state::Builder::default().build())
        .plugin(tauri_plugin_clipboard_manager::init())
        .invoke_handler(tauri::generate_handler![
            branch::open_repo,
            branch::get_branch_info,
            branch::get_tag_info,
            branch::rename_branch,
            branch::remove_branch,
            branch::create_branch,
            branch::checkout_branch,
            branch::get_file_tree,
            branch::get_file_content,
            branch::get_current_status,
            commit::get_commits,
            utils::checkout_remote,
            stage::add_to_stage,
            stage::remove_from_stage,
            stage::restore_file,
            commit::create_commit,
            commit::create_patch,
            utils::get_head_modify_time,
            commit::get_history,
            config::get_config,
            config::set_config,
            config::get_configes,
            utils::assume_language,
            stash::stash_save,
            stash::stash_apply,
            stash::stash_remove,
            stash::stash_list,
            branch::get_repo_head,
            branch::branch_fetch,
            branch::branch_push,
            branch::branch_status,
            commit::commit_checkout,
            commit::checkout_file,
            blame::blame_of_file,
            commit::commit_info,
            commit::commit_reset_author,
            cherry_pick::cherrypick,
            commit::commit_amend,
            rebase::rebase_abort,
        ])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}

#[cfg(test)]
mod test {
    use super::*;

    #[test]
    fn generate_bindings() {
        let builder =
            tauri_specta::Builder::<tauri::Wry>::new().commands(tauri_specta::collect_commands![
                branch::open_repo,
                branch::get_branch_info,
                branch::get_tag_info,
                branch::rename_branch,
                branch::remove_branch,
                branch::create_branch,
                branch::checkout_branch,
                branch::get_file_tree,
                branch::get_file_content,
                branch::get_current_status,
                commit::get_commits,
                utils::checkout_remote,
                stage::add_to_stage,
                stage::remove_from_stage,
                stage::restore_file,
                commit::create_commit,
                commit::create_patch,
                utils::get_head_modify_time,
                commit::get_history,
                config::get_config,
                config::set_config,
                config::get_configes,
                utils::assume_language,
                stash::stash_save,
                stash::stash_apply,
                stash::stash_remove,
                stash::stash_list,
                branch::get_repo_head,
                branch::branch_fetch,
                branch::branch_push,
                branch::branch_status,
                commit::commit_checkout,
                commit::checkout_file,
                blame::blame_of_file,
                commit::commit_info,
                commit::commit_reset_author,
                cherry_pick::cherrypick,
                commit::commit_amend,
                rebase::rebase_abort,
            ]);

        builder
            .export(
                specta_typescript::Typescript::default(),
                "./bindings/index.ts",
            )
            .expect("Failed to export typescript bindings");
    }
}
