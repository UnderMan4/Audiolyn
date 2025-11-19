export namespace ImportMetadata {
   export type Audiobook = {
      filePath: string;
      technical: Technical;
      metadata: Metadata;
   };

   export type Metadata = {
      title: string;
      authors?: Person[];
      narrators?: Person[];
      language?: string;
      covers?: Uint8Array[];
      description?: string;
      releaseDate?: Date;
      publisher?: string;
      isbn?: string;
      audibleAsin?: string;
      genres?: string[];
      chapters?: Chapter[];
      series?: Series;
   };

   export type Person = {
      givenName: string;
      familyName: string;
      sortName: string;
   };

   export type Series = {
      title: string;
      order: number;
      subtitle?: string;
   };

   /**
    * A single chapter entry extracted from FFprobe.
    */
   export type Chapter = {
      /**
       * Chapter title, if present.
       * May be missing when the source file does not contain
       * chapter name metadata.
       */
      title?: string;

      /**
       * The numerator of the chapter's time base (e.g. 1 in 1/1000).
       * Defines how many "time units" represent one second together with
       * the denominator. FFprobe provides this as a rational number string.
       */
      timeBaseNumerator: number;

      /**
       * The denominator of the chapter's time base (e.g. 1000 in 1/1000).
       * Combined with the numerator, this determines how to convert ticks
       * (integer timestamps) into real-world seconds.
       */
      timeBaseDenominator: number;

      /**
       * Start position of the chapter in "ticks". These are integer units
       * that must be converted using the time base to calculate seconds.
       */
      startTicks: number;

      /**
       * End position of the chapter in "ticks". Same unit as startTicks.
       */
      endTicks: number;

      /**
       * Start position of the chapter in whole seconds, derived from
       * FFprobe's `start_time` field (already converted by FFmpeg).
       * Rounded down to the nearest integer for safe boundary alignment.
       */
      startSeconds: number;

      /**
       * End position of the chapter in whole seconds, derived from
       * FFprobe's `end_time` field (already converted by FFmpeg).
       * Rounded up to ensure the entire chapter is included.
       */
      endSeconds: number;
   };

   export type Technical = {
      /**
       * Duration of the audiobook in seconds.
       * FFprobe always provides this for valid audio files.
       */
      durationSeconds: number;

      /**
       * Start offset of the audio timeline in seconds.
       * May be missing ("N/A") or undefined in some files.
       * Must be treated as 0 if unavailable.
       */
      startTimeSeconds: number | null;

      /**
       * Bitrate of the audiobook in kilobits per second.
       * May be missing at the stream level or format level.
       * Must fallback gracefully.
       */
      bitrateKbps: number | null;

      /**
       * Sample rate in Hertz.
       * Normally present, but can be undefined or "0".
       */
      sampleRateHz: number | null;

      /**
       * Number of audio channels (mono = 1, stereo = 2).
       * Always present unless the file is severely corrupted.
       */
      channels: number;

      /**
       * Short codec name (e.g. "aac", "mp3").
       * Always present for valid audio streams.
       */
      codec: string;

      /**
       * Long, human-readable codec name.
       * Always present if codec_name is present.
       */
      codecLongName: string;

      /**
       * File size in bytes. Always available for real files.
       */
      fileSizeBytes: number;
   };
}
