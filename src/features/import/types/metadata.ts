export type Chapter = {
   id: number;
   title: string | null;
   startTime: number;
};

export type CoverImage = {
   data: Uint8Array;
   mimeType?: string;
   pictureType?: string;
   extension?: string;
};

export type AudiobookInfo = {
   title: string | null;
   subtitle: string | null;
   authors: string[];
   narrators: string[];
   publisher: string | null;
   seriesName: string | null;
   seriesIndex: number | null;
   language: string | null;
   releaseDate: string | null;

   asin: string | null;
   audibleProductId: string | null;
   isbn: string | null;
   customIds: Record<string, string>;

   duration: bigint | null;
   bitrate: number | null;
   sampleRate: number | null;
   channels: number | null;
   bitDepth: number | null;

   chapters: Chapter[] | null;
   coverImages: CoverImage[];

   rawTags: Record<string, string>;

   file: FileInfo;
};

export type FileInfo = {
   name: string;
   extension: string;
   size: number;
   path: string;
};
