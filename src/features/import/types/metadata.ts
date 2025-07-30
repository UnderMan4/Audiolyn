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
   metadata: Record<string, string>;
   coverImages: CoverImage[];
   chapters?: Chapter[];
   duration: bigint; // Use bigint for u128
   bitrate?: number;
   sampleRate?: number;
   channels?: number;
   bitDepth?: number;
};

export type Metadata = {
   [key: string]: string | undefined;
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
};
