import { invoke } from "@tauri-apps/api/core";
import { sqlite as $ } from "litdb";
import { useState } from "react";

import { BetterLink } from "@/components/better-link";
import { PageContent } from "@/components/layout/page-content";
import { Button } from "@/components/ui/button";
import { Spinner } from "@/components/ui/spinner";
import { useDatabase } from "@/db/database-store";
import { Genre } from "@/db/schema";
import { convertQuery } from "@/db/utils";
import { AudiobookProgressBar } from "@/features/control-bar/components/audiobook-progress-bar";
import { ChaptersIndicator } from "@/features/control-bar/components/chapters-indicator";

export default function DashboardPage() {
   const [progress, setProgress] = useState(45);
   const { db } = useDatabase();
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
               onClick={() => {
                  const aa = 1;
                  const query = convertQuery(
                     $.from(Genre)
                        .where((genre) => $`${genre.id}=${aa}`)
                        .build()
                  );
                  console.log(query);
               }}
            >
               AAA
            </Button>
            <Button
               onClick={async () => {
                  const query = convertQuery($.from(Genre).build());
                  console.log(query);

                  const data = await db?.select(...query);
                  console.table(data);
               }}
            >
               tests
            </Button>
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
