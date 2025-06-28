import { useEffect } from "react";
import { Button } from "src/components/ui";
import { useRouter } from "src/hooks";

import {
   openSelectDirectoryDialog,
   openSelectMultipleDirectoriesDialog,
   openSelectMultipleFilesDialog,
   openSelectSingleFileDialog,
} from "@/features/import/lib/dialog-utils";
import { readFileMetadata } from "@/features/import/lib/import-utils";

import type { Route } from "./+types/import-page";

export function meta({}: Route.MetaArgs) {
   return [];
}

export default function ImportPage() {
   const { search } = useRouter();

   useEffect(() => {}, [search.importMethod]);
   const handleFileButton =
      (openFn: () => Promise<string | string[] | null>) => async () => {
         const filePath = await openFn();
         if (filePath) {
            const fileArray = Array.isArray(filePath) ? filePath : [filePath];

            const fileMetadata = await Promise.all(
               fileArray.map(async (file) => {
                  const metadata = await readFileMetadata(file);
                  return { file, metadata }; // Replace null with actual metadata if needed
               })
            );
            console.log("Selected files:", fileMetadata);
         } else {
            console.log("No file selected");
         }
      };
   const handleDirectoryButton =
      (openFn: () => Promise<string | string[] | null>) => async () => {
         const dirPath = await openFn();
         if (dirPath) {
            console.log("Selected file:", dirPath);
         } else {
            console.log("No file selected");
         }
      };

   return (
      <div className="flex flex-col flex-wrap gap-4">
         <Button onClick={handleFileButton(openSelectSingleFileDialog)}>
            Import one file
         </Button>
         <Button onClick={handleFileButton(openSelectMultipleFilesDialog)}>
            Import multiple files as one audiobook
         </Button>
         <Button onClick={handleFileButton(openSelectMultipleFilesDialog)}>
            Import multiple files as multiple audiobooks
         </Button>
         <Button onClick={handleDirectoryButton(openSelectDirectoryDialog)}>
            Import folder as one audiobook
         </Button>
         <Button
            onClick={handleDirectoryButton(openSelectMultipleDirectoriesDialog)}
         >
            Import multiple folders as multiple audiobooks
         </Button>
      </div>
   );
}
