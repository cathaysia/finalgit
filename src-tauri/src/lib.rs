#![allow(dead_code)]

mod branch;
mod error;
mod state;
mod tag;
mod ty;

pub use error::*;
pub use state::*;
pub use ty::*;

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
            branch::get_tag_info,
            branch::rename_branch,
            branch::remove_branch,
            branch::create_branch,
            branch::checkout_branch,
            branch::get_file_tree,
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

#[cfg(test)]
mod test {
    use super::*;

    #[test]
    fn generate_bindings() {
        let builder =
            tauri_specta::Builder::<tauri::Wry>::new().commands(tauri_specta::collect_commands![
                branch::open_repo,
                branch::get_branch_info,
                branch::is_opened,
                branch::get_tag_info,
                branch::rename_branch,
                branch::remove_branch,
                branch::create_branch,
                branch::checkout_branch,
                branch::get_file_tree,
            ]);

        builder
            .export(
                specta_typescript::Typescript::default(),
                "./bindings/index.ts",
            )
            .expect("Failed to export typescript bindings");
    }
}
