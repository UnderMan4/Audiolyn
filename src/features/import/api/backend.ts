import { invoke } from "@tauri-apps/api/core";

import { AudiobookInfo } from "../types/metadata";

export const readMetadata = async (
   path: string[] | string,
   taskId: string = "none"
) => {
   const filePaths = Array.isArray(path) ? path : [path];
   const promises = filePaths.map((filePath) =>
      invoke<AudiobookInfo>("read_metadata", {
         filePath,
         taskId,
      })
   );

   const results = await Promise.all(promises);

   return results;
   return results.map((result) => ({
      ...result,
      coverImages: result.coverImages.map((img) => ({
         ...img,
         data: new Uint8Array(img.data),
      })),
   }));
};
