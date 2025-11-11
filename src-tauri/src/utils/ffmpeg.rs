use std::path::{PathBuf};

#[cfg(target_os = "windows")]
const PLATFORM_FOLDER: &str = "windows";
#[cfg(target_os = "linux")]
const PLATFORM_FOLDER: &str = "linux";
#[cfg(target_os = "macos")]
const PLATFORM_FOLDER: &str = "macos";

pub fn get_ffmpeg_path() -> PathBuf {
    resolve_executable(if cfg!(target_os = "windows") { "ffmpeg.exe" } else { "ffmpeg" })
}

pub fn get_ffprobe_path() -> PathBuf {
    resolve_executable(if cfg!(target_os = "windows") { "ffprobe.exe" } else { "ffprobe" })
}

fn resolve_executable(binary_name: &str) -> PathBuf {
    // Get current working directory (root of your project in dev)
    let current_dir = std::env::current_dir().unwrap();

    // Point to src-tauri/bin/<os>/<binary>
    current_dir
        .join("src-tauri")
        .join("bin")
        .join(PLATFORM_FOLDER)
        .join(binary_name)
}
