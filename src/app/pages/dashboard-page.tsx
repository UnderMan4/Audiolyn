import { invoke } from "@tauri-apps/api/core";
import { useState } from "react";

import { BetterLink } from "@/components/better-link";
import { PageContent } from "@/components/layout/page-content";
import { Button } from "@/components/ui/button";
import { Spinner } from "@/components/ui/spinner";
import { useDatabase } from "@/db/database-store";
import { GenreEntity } from "@/db/entities/genre-entity";
import { AudiobookProgressBar } from "@/features/control-bar/components/audiobook-progress-bar";
import { ChaptersIndicator } from "@/features/control-bar/components/chapters-indicator";

export default function DashboardPage() {
   const [progress, setProgress] = useState(45);

   const { services } = useDatabase();
   return (
      <PageContent className="flex flex-col gap-4">
         <AudiobookProgressBar
            currentTimeSeconds={progress}
            totalLengthSeconds={123}
            onSeek={setProgress}
         />
         <ChaptersIndicator
            markers={[
               // { timeSeconds: 0, label: "Introduction" },
               { timeSeconds: 30, label: "Chapter 1" },
               { timeSeconds: 60, label: "Chapter 2" },
               { timeSeconds: 110, label: "Chapter 3" },
            ]}
            currentTimeSeconds={progress}
            totalLengthSeconds={123}
            onChapterClick={(section) => {
               console.log("Clicked chapter:", section);
               setProgress(section.timeSeconds);
            }}
         />
         <div className="flex gap-4">
            <Button
               onClick={async () => {
                  const metadata = await invoke("read_metadata", {
                     filePath: "C:/Users/filip/Desktop/audiobook.m4b",
                     taskId: "aa",
                  });

                  console.log(metadata);
               }}
            >
               Multithreading
            </Button>
            <Button
               onClick={async () => {
                  const genres = await services.genreService.getAll();
                  console.table(genres);
               }}
            >
               Get genres
            </Button>
            <Button
               onClick={async () => {
                  const genres =
                     await services.genreService.getByName("Fiction");
                  console.table(genres);
               }}
            >
               Get genres like
            </Button>
            <Button
               onClick={async () => {
                  const result = await services.genreService.add(
                     new GenreEntity({
                        name: "New Genre",
                     })
                  );
                  console.log("🚀 ~ result:", result);
               }}
            >
               Insert
            </Button>
            <Button
               onClick={async () => {
                  const result = (
                     await services.genreService.getByName("New Genre")
                  )[0];
                  console.log("🚀 ~ result:", result);
                  if (result) {
                     const updated = await services.genreService.update({
                        name: result.name + "+",
                        id: result.id,
                     });
                     console.log("🚀 ~ updated:", updated);
                  }
               }}
            >
               Update
            </Button>

            <BetterLink to="/non-existent">Link does not exist</BetterLink>
         </div>
         <div className="flex gap-4">
            <Spinner size="sm" />
            <Spinner size="md" />
            <Spinner size="lg" />
         </div>
      </PageContent>
   );
}
