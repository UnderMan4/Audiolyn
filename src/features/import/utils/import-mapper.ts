import { FFprobeSuccessResult } from "@/features/import/types/ffprobe";
import { ImportMetadata } from "@/features/import/types/metadata";
import { getFirstNonNull } from "@/lib/array-utils";
import { MapSchema, mapWithSchema } from "@/lib/object-mapper";
import { getValuesAtPaths } from "@/lib/object-path";
import { normalizeToLanguageCode } from "@/lib/string-utils";

import { splitMultiValueTag } from "./data-utils";
import { fieldMappings } from "./map-fields";
import { parsePersonName, parseSeriesNumber } from "./parsers";

export const mapAudiobookToImport = (raw: FFprobeSuccessResult) => {
   const metadata = mapWithSchema(raw, metadataSchema);
   const technical = mapWithSchema(raw, technicalSchema);

   return {
      metadata,
      technical,
   };
};

const metadataSchema: MapSchema<FFprobeSuccessResult, ImportMetadata.Metadata> =
   {
      title: {
         type: "firstOf",
         fields: fieldMappings.title,
      },
      authors: {
         type: "firstOfTransformed",
         fields: fieldMappings.authors,
         fn: (value) => {
            if (typeof value !== "string") return undefined;
            return splitMultiValueTag(value).map(parsePersonName);
         },
      },
      narrators: {
         type: "firstOfTransformed",
         fields: fieldMappings.narrators,
         fn: (value) => {
            if (typeof value !== "string") return undefined;
            return splitMultiValueTag(value).map(parsePersonName);
         },
      },
      language: {
         type: "transform",
         fn: (value) => {
            const audioStreams = value.streams.filter(
               (s) => s.codec_type === "audio"
            );

            const primaryAudio = audioStreams[0];
            const secondaryAudio = audioStreams[1];

            const lang = getFirstNonNull(
               // 1. Stream-level (most accurate)
               primaryAudio?.language,
               primaryAudio?.tags?.language,
               primaryAudio?.tags?.["©lan"],
               primaryAudio?.tags?.LANGUAGE,
               primaryAudio?.tags?.lang,
               primaryAudio?.tags?.LANG,

               // 2. Secondary audio stream (rare fallback)
               secondaryAudio?.language,
               secondaryAudio?.tags?.language,
               secondaryAudio?.tags?.["©lan"],
               secondaryAudio?.tags?.LANGUAGE,
               secondaryAudio?.tags?.lang,
               secondaryAudio?.tags?.LANG,

               // 3. Format-level (least reliable)
               value.format.tags?.language,
               value.format.tags?.LANGUAGE,
               value.format.tags?.["©lan"],
               value.format.tags?.lang,
               value.format.tags?.LANG
            );

            return normalizeToLanguageCode(lang);
         },
      },
      covers: {
         type: "static",
         value: undefined, // Handled separately
      },
      genres: {
         type: "firstOfTransformed",
         fields: fieldMappings.genres,
         fn: (value) => {
            if (typeof value !== "string") return undefined;
            return splitMultiValueTag(value);
         },
      },
      audibleAsin: {
         type: "firstOf",
         fields: fieldMappings.audibleAsin,
      },
      isbn: {
         type: "firstOf",
         fields: fieldMappings.isbn,
      },
      description: {
         type: "firstOf",
         fields: fieldMappings.description,
      },
      releaseDate: {
         type: "firstOfTransformed",
         fields: fieldMappings.releaseDate,
         fn: (value) => {
            if (typeof value !== "string") return undefined;
            return new Date(value);
         },
      },
      publisher: {
         type: "firstOf",
         fields: fieldMappings.publisher,
      },
      chapters: {
         type: "transform",
         fn: (value) => {
            const chapters = value.chapters;
            if (Array.isArray(chapters)) {
               return chapters.map((ch) => ({
                  title: getFirstNonNull(
                     ch.tags?.title,
                     ch.tags?.TITLE,
                     ch.tags?.["©nam"],
                     ch.tags?.chapter_title,
                     ch.tags?.CHAPTER_TITLE,
                     ch.tags?.name,
                     ch.tags?.NAME
                  ),
                  timeBaseNumerator: ch.time_base
                     ? Number.parseInt(ch.time_base.split("/")[0], 10)
                     : 1,
                  timeBaseDenominator: ch.time_base
                     ? Number.parseInt(ch.time_base.split("/")[1], 10)
                     : 1,
                  startTicks: ch.start,
                  endTicks: ch.end,
                  startSeconds: ch.start_time
                     ? Math.floor(Number.parseFloat(ch.start_time))
                     : 0,
                  endSeconds: ch.end_time
                     ? Math.ceil(Number.parseFloat(ch.end_time))
                     : 0,
               }));
            }
         },
      },
      series: {
         type: "transform",
         fn: (value) => {
            const seriesTitle = getFirstNonNull<string>(
               ...getValuesAtPaths(value, fieldMappings.seriesTitle)
            );
            const seriesOrder = parseSeriesNumber(
               getFirstNonNull<string>(
                  ...getValuesAtPaths(value, fieldMappings.seriesOrder)
               )
            );
            const seriesSubtitle = getFirstNonNull<string>(
               ...getValuesAtPaths(value, fieldMappings.seriesSubtitle)
            );

            if (seriesTitle && seriesOrder != undefined) {
               return {
                  title: seriesTitle,
                  order: seriesOrder,
                  subtitle: seriesSubtitle,
               };
            }
         },
      },
   };

const technicalSchema: MapSchema<
   FFprobeSuccessResult,
   ImportMetadata.Technical
> = {
   bitrateKbps: {
      type: "transform",
      fn: (value) => {
         const raw = value.format.bit_rate;
         if (!raw) return null;

         const parsed = Number.parseInt(raw, 10);
         return Number.isFinite(parsed) ? Math.round(parsed / 1000) : null;
      },
   },
   fileSizeBytes: {
      type: "from",
      field: "format.size",
   },
   durationSeconds: {
      type: "from",
      field: "format.duration",
   },
   startTimeSeconds: {
      type: "transform",
      fn: (value) => {
         const raw = value.format.start_time;
         if (!raw || raw === "N/A") return null;

         const parsed = Number(raw);
         return Number.isFinite(parsed) ? parsed : null;
      },
   },
   sampleRateHz: {
      type: "transform",
      fn: (value) => {
         const audioStream = value.streams.find(
            (s) => s.codec_type === "audio"
         );

         const raw = audioStream?.sample_rate;
         if (raw == null) return null;

         const parsed =
            typeof raw === "number" ? raw : Number.parseInt(raw, 10);

         return Number.isFinite(parsed) && parsed > 0 ? parsed : null;
      },
   },
   channels: {
      type: "transform",
      fn: (value) => {
         const audioStream = value.streams.find(
            (s) => s.codec_type === "audio"
         );

         const raw = audioStream?.channels;
         if (raw == null) return 0;

         return typeof raw === "number" ? raw : Number.parseInt(raw, 10) || 0;
      },
   },
   codec: {
      type: "transform",
      fn: (value) => {
         const audioStream = value.streams.find(
            (s) => s.codec_type === "audio"
         );
         return audioStream?.codec_name ?? "";
      },
   },
   codecLongName: {
      type: "transform",
      fn: (value) => {
         const audioStream = value.streams.find(
            (s) => s.codec_type === "audio"
         );
         return audioStream?.codec_long_name ?? "";
      },
   },
};
