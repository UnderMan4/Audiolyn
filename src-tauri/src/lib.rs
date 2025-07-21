use tauri::ipc::Response;
use tauri_plugin_sql::{Migration, MigrationKind};
mod metadata;
mod utils;

use crate::metadata::reader;
// Learn more about Tauri commands at https://tauri.app/develop/calling-rust/
#[tauri::command]
fn greet(name: &str) -> String {
    format!("Hello, {}! You've been greeted from Rust!", name)
}

#[tauri::command]
async fn read_metadata(file_path: String) -> Response {
    let metadata = reader::get_metadata(&file_path);

    match metadata {
        Ok(info) => Response::new(serde_json::to_string(&info).unwrap()),
        Err(e) => Response::new(format!("Error: {}", e)),
    }
}

#[cfg_attr(mobile, tauri::mobile_entry_point)]
pub fn run() {
    let migrations = vec![Migration {
        version: 1,
        sql: include_str!("../migrations/v1.sql"),
        kind: MigrationKind::Up,
        description: "Creating tables and setting up foreign keys",
    }];

    tauri::Builder::default()
        .plugin(
            tauri_plugin_sql::Builder::default()
                .add_migrations("sqlite:db.db", migrations)
                .build(),
        )
        .plugin(tauri_plugin_window_state::Builder::new().build())
        .plugin(tauri_plugin_os::init())
        .plugin(tauri_plugin_fs::init())
        .plugin(tauri_plugin_dialog::init())
        .plugin(tauri_plugin_store::Builder::new().build())
        .plugin(tauri_plugin_zustand::init())
        .plugin(tauri_plugin_opener::init())
        .invoke_handler(tauri::generate_handler![greet])
        .invoke_handler(tauri::generate_handler![read_metadata])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
