import { useEffect } from "react";

import { PageContent } from "@/components/layout/page-content";
import { Cover } from "@/components/ui/cover";
import { Spinner } from "@/components/ui/spinner";
import { readMetadata } from "@/features/import/api/backend";
import { AudiobookInfo } from "@/features/import/types/metadata";
import { useAsyncStatus } from "@/hooks/use-async-status";
import { useRouter } from "@/hooks/use-router";

export namespace ImportFilesPage {
   export type SearchParams = {
      singleAudiobook: boolean;
      data: string[];
   };
}

export default function ImportFilesPage() {
   const { search } = useRouter<ImportFilesPage.SearchParams>();

   const { loading, error, value, run } = useAsyncStatus<AudiobookInfo[]>();

   useEffect(() => {
      if (search.data && search.data.length > 0) {
         run(readMetadata(search.data));
      }
   }, [search.data, run]);

   useEffect(() => {
      console.log("🚀 ~ ImportFilesPage ~ value:", value);
      console.log("🚀 ~ ImportFilesPage ~ search:", search);
      // value?.map((v) => convertAudiobookData(v));
   }, [value, search]);

   if (loading) {
      return (
         <div className="flex items-center justify-center h-full">
            <Spinner size="lg" />
         </div>
      );
   }

   if (error) {
      return (
         <div className="flex items-center justify-center h-full">
            <p className="text-red-500">
               Error loading metadata: {error.message}
            </p>
         </div>
      );
   }

   return (
      <PageContent className="flex flex-col gap-4">
         {value && value.length > 0 ? (
            value.map((metadata) => (
               <div
                  key={metadata.file.path}
                  className="flex flex-row p-4 border rounded gap-4"
               >
                  <Cover img={metadata.coverImages[0]} />
                  <div>
                     <p className="text-lg font-semibold text-foreground">
                        {metadata.title}
                     </p>
                     <p className="text-sm text-accent-foreground">
                        {metadata.authors.join(", ")}
                     </p>
                  </div>
               </div>
            ))
         ) : (
            <p>No metadata found.</p>
         )}
      </PageContent>
   );
}
