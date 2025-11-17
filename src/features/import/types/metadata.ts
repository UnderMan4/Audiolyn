export namespace ImportMetadata {
   export type Audiobook = {
      filePath: string;
      technical: Technical;
      metadata: Metadata;
   };

   export type Metadata = {
      title: string;
      authors: Person[];
      narrators: Person[];
      language?: string;
      covers: Uint8Array[];
      description?: string;
      releaseDate?: Date;
      publisher?: string;
      isbn?: string;
      audibleAsin?: string;
      genres: string[];
      chapters?: Chapter[];
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

   export type Chapter = {
      title?: string;
      timeBaseNumerator: number;
      timeBaseDenominator: number;
      startTicks: number;
      endTicks: number;
      startSeconds: number;
      endSeconds: number;
   };

   export type Technical = {
      durationSeconds: number;
      bitrateKbps: number;
      sampleRateHz: number;
      channels: number;
      codec: string;
      codecLongName: string;
      fileSizeBytes: number;
   };
}
