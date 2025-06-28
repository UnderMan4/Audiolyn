import { useCallback, useMemo } from "react";

import { ChaptersIndicator } from "../components/chapters-indicator";

export const useChapters = (
   markers: ChaptersIndicator.Marker[],
   currentTimeSeconds: number,
   totalLengthSeconds: number
) => {
   const processedMarkers = useMemo<ChaptersIndicator.Marker[]>(() => {
      const sortedMarkers = [...markers];
      sortedMarkers.sort((a, b) => a.timeSeconds - b.timeSeconds);

      if (sortedMarkers[0].timeSeconds > 0) {
         sortedMarkers.unshift({ timeSeconds: 0 });
      }

      return sortedMarkers;
   }, [markers]);

   const activeChapter = useMemo<ChaptersIndicator.ActiveChapter>(() => {
      if (processedMarkers.length === 0)
         return { index: -1, progressPercent: 0 };

      const currentChapterIndex = processedMarkers.findLastIndex(
         (marker) => currentTimeSeconds >= marker.timeSeconds
      );
      if (currentChapterIndex === -1) {
         return {
            index: -1,
            progressPercent: currentTimeSeconds > 0 ? 100 : 0,
         };
      }

      const currentChapter = processedMarkers[currentChapterIndex];
      const nextChapter = processedMarkers[currentChapterIndex + 1] || {
         timeSeconds: totalLengthSeconds,
      };

      const chapterStart = currentChapter.timeSeconds;
      const chapterEnd = nextChapter.timeSeconds;
      const lengthSeconds = chapterEnd - chapterStart;

      let progressPercent = 0;
      if (currentTimeSeconds >= chapterEnd) {
         progressPercent = 100;
      } else if (currentTimeSeconds > chapterStart) {
         progressPercent =
            ((currentTimeSeconds - chapterStart) / lengthSeconds) * 100;
         if (progressPercent > 100) progressPercent = 100;
         if (progressPercent < 0) progressPercent = 0;
      }
      return {
         index: currentChapterIndex,
         progressPercent,
      };
   }, [processedMarkers, currentTimeSeconds, totalLengthSeconds]);

   const calculatedChapters = useMemo<ChaptersIndicator.Chapter[]>(
      () =>
         processedMarkers.map((marker, idx) => {
            const chapterStart = marker.timeSeconds;
            const chapterEnd =
               idx < processedMarkers.length - 1
                  ? processedMarkers[idx + 1].timeSeconds
                  : totalLengthSeconds;

            const lengthSeconds = chapterEnd - chapterStart;

            const widthPercent = (lengthSeconds / totalLengthSeconds) * 100;
            return {
               widthPercent,
               lengthSeconds,
               label: marker.label,
            };
         }),
      [processedMarkers, totalLengthSeconds]
   );

   const getChapterProgressWidth = useCallback(
      (chapterIdx: number) => {
         if (chapterIdx < activeChapter.index) {
            return 100;
         } else if (chapterIdx === activeChapter.index) {
            return activeChapter.progressPercent;
         } else {
            return 0;
         }
      },
      [activeChapter]
   );

   return {
      processedMarkers,
      chapters: calculatedChapters,
      getChapterProgressWidth,
   };
};
