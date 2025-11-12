import {
   FFprobeChapter,
   FFprobeFormat,
   FFprobeStream,
   FFprobeSuccessResult,
} from "./ffprobe";

export class AudiobookMetadataExtractor {
   // === Descriptive info ===
   title?: string;
   album?: string;
   artist?: string;
   author?: string;
   narrator?: string;
   genre?: string;
   year?: number;
   series?: string;
   seriesPart?: number;
   description?: string;

   // === Technical info ===
   codec?: string;
   codecLongName?: string;
   bitrate?: number;
   sampleRate?: number;
   channels?: number;
   channelLayout?: string;
   formatName?: string;
   formatLongName?: string;
   duration?: number;
   size?: number;

   // === Attached media and structure ===
   cover?: {
      mimeType: string;
      data: Buffer;
   };
   chapters?: {
      title?: string;
      startSeconds: number;
      endSeconds: number;
      startTicks: number;
      endTicks: number;
      timebase: { numerator: number; denominator: number };
   }[];

   constructor(data: FFprobeSuccessResult) {
      const format = data.format;
      const streams = data.streams;
      const chapters = data.chapters;

      const audioStream = streams.find((s) => s.codec_type === "audio");
      const tags = this.collectTags(format, streams);

      // --- Descriptive metadata ---
      this.title = this.firstDefined(tags.title, tags.album);
      this.album = tags.album;
      this.artist = tags.artist;
      this.author = this.firstDefined(
         tags.author,
         tags.album_artist,
         tags.artist
      );
      this.narrator = tags.narrator;
      this.genre = tags.genre;
      this.year = this.parseYear(tags.date);

      // --- Technical metadata ---
      this.codec = audioStream?.codec_name;
      this.codecLongName = audioStream?.codec_long_name;
      this.bitrate = this.parseNumber(format.bit_rate);
      this.sampleRate = this.parseNumber(audioStream?.sample_rate);
      this.channels = audioStream?.channels;
      this.channelLayout = audioStream?.channel_layout;
      this.formatName = format.format_name;
      this.formatLongName = format.format_long_name;
      this.duration = this.parseDuration(format);
      this.size = this.parseNumber(format.size);

      // --- Media structure ---
      this.chapters = this.extractChapters(chapters);
   }

   // --- Internal helpers ---

   private collectTags(
      format: FFprobeFormat,
      streams: FFprobeStream[]
   ): Record<string, string> {
      const normalize = (obj: Record<string, string> = {}) =>
         Object.fromEntries(
            Object.entries(obj).map(([k, v]) => [k.toLowerCase(), v])
         );

      const allTags = [
         normalize(format.tags ?? {}),
         ...streams.map((s) => normalize(s.tags ?? {})),
      ];

      return allTags.reduce((acc, cur) => ({ ...acc, ...cur }), {});
   }

   private extractChapters(
      chapters?: FFprobeChapter[]
   ): AudiobookMetadataExtractor["chapters"] {
      if (!chapters?.length) return undefined;
      return chapters.map((ch) => ({
         title: ch.tags?.title ?? undefined,
         startSeconds: Number(ch.start_time),
         endSeconds: Number(ch.end_time),
         startTicks: ch.start,
         endTicks: ch.end,
         timebase: {
            numerator: Number(ch.time_base.split("/")[0]),
            denominator: Number(ch.time_base.split("/")[1]),
         },
      }));
   }

   private parseDuration(format: FFprobeFormat): number | undefined {
      const duration = format.duration
         ? Number.parseFloat(format.duration)
         : undefined;
      return Number.isFinite(duration) ? duration : undefined;
   }

   private parseYear(date?: string): number | undefined {
      if (!date) return undefined;
      const year = new RegExp(/\d{4}/).exec(date)?.[0];
      return year ? Number.parseInt(year, 10) : undefined;
   }

   private parseNumber(value?: string): number | undefined {
      if (!value) return undefined;
      const num = Number.parseFloat(value);
      return Number.isFinite(num) ? num : undefined;
   }

   private firstDefined<T>(...values: (T | undefined)[]): T | undefined {
      return values.find((v) => v !== undefined);
   }
}
