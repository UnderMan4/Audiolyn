import { invoke } from "@tauri-apps/api/core";

import { FFprobeProbeResult } from "../types/ffprobe";

export const readMetadata = async (
   path: string[] | string,
   taskId: string = "none"
): Promise<FFprobeProbeResult[]> => {
   const filePaths = Array.isArray(path) ? path : [path];
   const promises = filePaths.map((filePath) =>
      invoke<string>("read_metadata", {
         filePath,
         taskId,
      })
   );

   const results = await Promise.all(promises);
   const parsedResults = results.map((result) => JSON.parse(result));
   return parsedResults;
};
