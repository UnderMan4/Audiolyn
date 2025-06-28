import { open } from "@tauri-apps/plugin-dialog";

//TODO: Add translation support for filter names
const filters = [
   {
      name: "Audio files",
      extensions: ["mp3", "m4a", "m4b", "flac", "ogg", "wav", "opus"],
   },
];

export const openSelectSingleFileDialog = async () =>
   await open({
      multiple: false,
      directory: false,
      filters,
   });

export const openSelectMultipleFilesDialog = async () =>
   await open({
      multiple: true,
      directory: false,
      filters,
   });

export const openSelectDirectoryDialog = async () =>
   await open({
      multiple: false,
      directory: true,
   });

export const openSelectMultipleDirectoriesDialog = async () =>
   await open({
      multiple: true,
      directory: true,
   });
