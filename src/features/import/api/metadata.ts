import { invoke } from "@tauri-apps/api/core";

import { Metadata } from "../types/metadata";

export const readMetadata = async (
   path: string[] | string,
   taskId: string = "none"
) => {
   const filePaths = Array.isArray(path) ? path : [path];
   const promises = filePaths.map((filePath) =>
      invoke<Metadata>("read_metadata", {
         filePath,
         taskId,
      })
   );

   return Promise.all(promises);
};
