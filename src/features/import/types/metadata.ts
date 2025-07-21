export type Welcome = {
   readonly metadata: Metadata;
   readonly coverImages: CoverImage[];
   readonly chapters: Chapter[];
   readonly duration: number;
   readonly bitrate: number;
   readonly sampleRate: number;
   readonly channels: number;
   readonly bitDepth: null;
};

export type Chapter = {
   readonly id: number;
   readonly title: string;
   readonly startTime: number;
};

export type CoverImage = {
   readonly data: number[];
   readonly mimeType: string;
   readonly pictureType: string;
   readonly extension: string;
};

export type Metadata = {
   readonly creationTime: Date;
   readonly title: string;
   readonly compatibleBrands: string;
   readonly artist: string;
   readonly composer: string;
   readonly majorBrand: string;
   readonly track: string;
   readonly album: string;
   readonly genre: string;
   readonly minorVersion: string;
};
