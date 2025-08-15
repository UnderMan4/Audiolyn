export type Chapter = {
   id: number;
   title?: string;
   startTime: number;
};

export type CoverImage = {
   data: Uint8Array;
   mimeType?: string;
   pictureType?: string;
   extension?: string;
};

export type AudiobookInfo = {
   metadata: Metadata;
   coverImages: CoverImage[];
   chapters?: Chapter[];
   duration: bigint;
   bitrate?: number;
   sampleRate?: number;
   channels?: number;
   bitDepth?: number;
   fileInfo?: FileInfo;
};

export type FileInfo = {
   name: string;
   extension: string;
   size: number;
   path: string;
};

export type Metadata = {
   encoder?: string;
   artist?: string;
   album?: string;
   date?: string;
   title?: string;
   track?: string;
   minor_version?: string;
   composer?: string;
   compatible_brands?: string;
   comment?: string;
   description?: string;
   genre?: string;
   major_brand?: string;
   media_type?: string;
   album_artist?: string;
   copyright?: string;
   creation_time?: string;
   asin?: string;
   narratedBy?: string;
   product_id?: string;
   AUTHOR?: string;
   RATING?: string;
   iTunSMPB?: string;
   SUBTITLE?: string;
   NARRATEDBY?: string;
   grouping?: string;
} & {
   [key: string]: string | undefined; // Allow additional keys
};
