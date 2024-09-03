#![allow(dead_code)]

mod branch;
mod error;
mod state;
mod tag;

pub use error::*;
pub use state::*;

#[cfg_attr(mobile, tauri::mobile_entry_point)]
pub fn run() {
    setup_log();

    tauri::Builder::default()
        .manage(AppState::default())
        .plugin(tauri_plugin_shell::init())
        .plugin(tauri_plugin_dialog::init())
        .invoke_handler(tauri::generate_handler![
            branch::open_repo,
            branch::get_branch_info,
            branch::is_opened,
            branch::get_tag_info
        ])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}

fn setup_log() {
    use tracing_subscriber::{fmt, layer::SubscriberExt, util::SubscriberInitExt, EnvFilter};

    tracing_subscriber::registry()
        .with(EnvFilter::from_default_env())
        .with(
            fmt::layer()
                .with_thread_names(true)
                .with_file(true)
                .with_line_number(true),
        )
        .init();
}
