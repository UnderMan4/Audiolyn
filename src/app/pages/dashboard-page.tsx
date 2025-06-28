import { useState } from "react";

import {
   AudiobookProgressBar,
   ChaptersIndicator,
} from "@/features/control-bar/components";

export default function DashboardPage() {
   const [progress, setProgress] = useState(45);
   return (
      <div className="flex flex-col gap-4">
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
      </div>
   );
}
