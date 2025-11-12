use std::path::PathBuf;
use tauri::path::BaseDirectory;
use tauri::Manager;

pub enum Executable {
    Ffmpeg,
    Ffprobe,
}

impl Executable {
    fn filename(self) -> String {
        let executable = match self {
            Self::Ffmpeg => {
                if cfg!(target_os = "windows") {
                    "ffmpeg.exe"
                } else {
                    "ffmpeg"
                }
            }
            Self::Ffprobe => {
                if cfg!(target_os = "windows") {
                    "ffprobe.exe"
                } else {
                    "ffprobe"
                }
            }
        };

        if cfg!(target_os = "windows") {
            format!("tools\\{}", executable)
        } else {
            format!("tools/{}", executable)
        }
    }
}

pub fn get_executable_path(
    handle: tauri::AppHandle,
    executable: Executable,
) -> tauri::Result<PathBuf> {
    handle
        .path()
        .resolve(executable.filename(), BaseDirectory::Resource)
}
