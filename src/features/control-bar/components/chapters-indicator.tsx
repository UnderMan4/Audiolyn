import * as ProgressPrimitive from "@radix-ui/react-progress";
import { cn } from "src/lib/style-utils";

import { useChapters } from "../hooks/use-chapters";

export namespace ChaptersIndicator {
   export type Props = {
      markers: Marker[];
      currentTimeSeconds: number;
      totalLengthSeconds: number;
      onChapterClick?: (section: Marker) => void;
   };

   export type Marker = {
      timeSeconds: number;
      label?: string;
   };

   export type Chapter = {
      widthPercent: number;
      lengthSeconds: number;
      label?: string;
   };

   export type ActiveChapter = {
      index: number;
      progressPercent: number;
   };
}

export const ChaptersIndicator = ({
   markers,
   currentTimeSeconds,
   totalLengthSeconds,
   onChapterClick,
}: ChaptersIndicator.Props) => {
   const { chapters, getChapterProgressWidth, processedMarkers } = useChapters(
      markers,
      currentTimeSeconds,
      totalLengthSeconds
   );

   return (
      <div className="w-full flex flex-nowrap gap-1 h-2.5">
         {chapters.map((chapter, idx) => (
            <button
               style={{ width: `${chapter.widthPercent}%` }}
               key={idx}
               className="h-full flex items-center"
               onClick={() => onChapterClick?.(processedMarkers[idx])}
            >
               <ProgressPrimitive.Root
                  className={cn(
                     "bg-primary/20 relative h-1.5 w-full overflow-hidden rounded-full hover:h-full transition-[height]"
                  )}
               >
                  <ProgressPrimitive.Indicator
                     className="bg-primary h-full flex-1 rounded-full"
                     style={{
                        width: `${getChapterProgressWidth(idx)}%`,
                     }}
                  />
               </ProgressPrimitive.Root>
            </button>
         ))}
      </div>
   );
};
