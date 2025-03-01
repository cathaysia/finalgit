#![allow(dead_code)]

mod bisect;
mod blame;
mod branch;
mod cherry_pick;
mod commit;
mod config;
mod error;
mod file;
mod rebase;
mod remote;
mod stage;
mod stash;
mod state;
mod statistics;
mod ty;
mod utils;

use std::process::exit;

use clap::Parser;
pub use error::*;
use tauri::Manager;
pub use ty::*;

use tauri_derive::tauri_commands;
use tauri_plugin_log::{Target, TargetKind};

#[derive(Parser)]
struct Args {
    dir: Option<String>,
}

#[cfg_attr(mobile, tauri::mobile_entry_point)]
pub fn run() {
    let args = Args::parse();
    let max_log = std::env::var("RUST_LOG").unwrap_or("OFF".to_string());
    let log_level = match max_log.to_uppercase().as_str() {
        "TRACE" => log::LevelFilter::Trace,
        "DEBUG" => log::LevelFilter::Debug,
        "INFO" => log::LevelFilter::Info,
        "WARN" => log::LevelFilter::Warn,
        "ERROR" => log::LevelFilter::Error,
        _ => log::LevelFilter::Off,
    };
    if let Some(dir) = args.dir {
        let Ok(pat) = std::path::Path::new(&dir).canonicalize() else {
            eprintln!("path doesn't exist");
            exit(-1);
        };
        let dir = pat.to_str().unwrap().to_string();
        if utils::open_repo(&dir).is_err() {
            eprintln!("path doesn't contain a git repository");
            exit(-1);
        };
        state::set_repo_path(dir);
    }

    tauri::Builder::default()
        .plugin(tauri_plugin_decorum::init())
        .plugin(tauri_plugin_fs::init())
        .plugin(tauri_plugin_os::init())
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
        .plugin(tauri_plugin_clipboard_manager::init())
        .invoke_handler(tauri_commands!())
        .setup(|app| {
            let window = app.get_webview_window("main").unwrap();
            #[cfg(target_os = "linux")]
            {
                let _ = window;
            }
            #[cfg(any(target_os = "macos", target_os = "windows"))]
            {
                use tauri_plugin_decorum::WebviewWindowExt;
                window.create_overlay_titlebar().unwrap();

                #[cfg(target_os = "macos")]
                window.set_traffic_lights_inset(22.0, 16.0).unwrap();
            }

            Ok(())
        })
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}

#[cfg(test)]
mod test {

    use tauri_derive::specta_commands;

    use super::*;

    #[test]
    fn generate_bindings() {
        let builder = tauri_specta::Builder::<tauri::Wry>::new().commands(specta_commands!());

        builder
            .export(
                specta_typescript::Typescript::default(),
                "./bindings/index.ts",
            )
            .expect("Failed to export typescript bindings");
    }
}
