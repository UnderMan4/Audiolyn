import { OpenDialog } from "@/hooks/use-open-dialog";

export const AUDIO_FILES_FILTER = {
   name: "common.openDialog.filters.audioFiles",
   extensions: ["mp3", "m4a", "m4b", "flac", "ogg", "wav", "opus"],
} satisfies OpenDialog.Filter;
