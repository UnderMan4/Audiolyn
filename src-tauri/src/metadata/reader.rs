use crate::utils::executables::{get_executable_path, Executable};
use serde_json::{json, Value};
use std::process::Command;

pub fn get_metadata(handle: tauri::AppHandle, path: String) -> Result<String, String> {
    // Run ffprobe with full metadata + error support

    let ffprobe_path = get_executable_path(handle.clone(), Executable::Ffprobe)
        .map_err(|e| format!("Failed to get ffprobe path: {e}"))?;

    println!("ffprobe path: {ffprobe_path:?}");

    let output = Command::new(ffprobe_path)
        .args([
            "-loglevel",
            "error",
            "-print_format",
            "json=compact=0",
            "-show_error",
            "-show_format",
            "-show_streams",
            "-show_chapters",
            &path,
        ])
        .output()
        .map_err(|e| format!("Failed to execute ffprobe: {e}"))?;

    let stdout = String::from_utf8_lossy(&output.stdout).to_string();
    let stderr = String::from_utf8_lossy(&output.stderr).trim().to_string();

    // If ffprobe wrote valid JSON to stdout → return it
    if !stdout.trim().is_empty() {
        // Validate JSON syntax to be safe
        if serde_json::from_str::<Value>(&stdout).is_ok() {
            return Ok(stdout);
        }
    }

    // Otherwise, construct a proper JSON error manually
    let error_json = json!({
        "error": {
            "message": if !stderr.is_empty() {
                stderr
            } else {
                "ffprobe returned no output".to_string()
            },
            "exit_code": output.status.code().unwrap_or(-1)
        }
    });

    Ok(error_json.to_string())
}
