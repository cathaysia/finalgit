#![allow(dead_code)]

mod branch;
mod error;
mod ext;
mod ty;
mod utils;

pub use error::*;
pub use ext::*;
pub use ty::*;

use tauri_plugin_log::{Target, TargetKind};

#[cfg_attr(mobile, tauri::mobile_entry_point)]
pub fn run() {
    let max_log = std::env::var("DDS_LOG").unwrap_or("OFF".to_string());
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
                .targets([Target::new(TargetKind::Stdout)])
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
            branch::get_commits,
            branch::checkout_remote,
            branch::add_files,
            branch::remove_files,
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
                branch::get_commits,
                branch::checkout_remote,
                branch::add_files,
                branch::remove_files,
            ]);

        builder
            .export(
                specta_typescript::Typescript::default(),
                "./bindings/index.ts",
            )
            .expect("Failed to export typescript bindings");
    }
}
