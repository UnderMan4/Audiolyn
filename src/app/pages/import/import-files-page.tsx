import { useEffect } from "react";

import { Button } from "@/components/ui/button";
import { readMetadata } from "@/features/import/api/metadata";
import {
   openSelectDirectoryDialog,
   openSelectMultipleDirectoriesDialog,
   openSelectMultipleFilesDialog,
   openSelectSingleFileDialog,
} from "@/features/import/lib/dialog-utils";
import { useRouter } from "@/hooks/use-router";

export default function ImportFilesPage() {
   const { search } = useRouter();

   useEffect(() => {}, [search.importMethod]);
   const handleFileButton =
      (openFn: () => Promise<string | string[] | null>) => async () => {
         const filePath = await openFn();
         if (filePath) {
            const fileMetadata = await readMetadata(filePath);
            console.table(fileMetadata);
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
