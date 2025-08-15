import { useEffect } from "react";

import { PageContent } from "@/components/layout/page-content";
import { Cover } from "@/components/ui/cover";
import { Spinner } from "@/components/ui/spinner";
import { readMetadata } from "@/features/import/api/backend";
import { AudiobookInfo } from "@/features/import/types/metadata";
import { convertAudiobookData } from "@/features/import/utils/data-utils";
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
      value?.map((v) => convertAudiobookData(v));
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
            value.map(({ metadata, coverImages }, index) => (
               <div
                  key={index}
                  className="flex flex-row p-4 border rounded gap-4"
               >
                  <Cover img={coverImages[0]} />
                  <div className="flex flex-col shrink-0 w-40">
                     <p>{metadata.title}</p>
                     <p className="text-sm text-gray-500">{metadata.artist}</p>
                  </div>
                  <div className="flex flex-col text-sm max-w-2xl">
                     {Object.entries(metadata)
                        .sort(([keyA], [keyB]) => keyA.localeCompare(keyB))
                        .map(([key, value]) => (
                           <p key={key}>
                              <span className="font-bold text-muted-foreground opacity-70">
                                 {key}:
                              </span>
                              <span className="ml-1">{value}</span>
                           </p>
                        ))}
                  </div>
               </div>
            ))
         ) : (
            <p>No metadata found.</p>
         )}
      </PageContent>
   );
}
