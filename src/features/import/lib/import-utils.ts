import { readFile } from "@tauri-apps/plugin-fs";
import { parseWebStream } from "music-metadata";

export const readFileMetadata = async (filePath: string) => {
   console.time("readFile_" + filePath);
   const file = await readFile(filePath);
   console.timeEnd("readFile_" + filePath);
   console.time("parseWebStream_" + filePath);
   const stream = new ReadableStream<Uint8Array>({
      start(controller) {
         controller.enqueue(file);
         controller.close();
      },
   });
   console.timeEnd("parseWebStream_" + filePath);
   console.time("parseMetadata_" + filePath);
   const metadata = await parseWebStream(stream, {
      path: filePath,
   });
   console.timeEnd("parseMetadata_" + filePath);

   return metadata;
};
