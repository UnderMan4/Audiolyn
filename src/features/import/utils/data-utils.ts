import human from "humanparser";

import { AudiobookEntity } from "@/db/entities/audiobook-entity";
import { AuthorEntity } from "@/db/entities/author-entity";

import { AudiobookInfo } from "../types/metadata";

export const splitArtists = (artistsString: string | undefined): string[] => {
   if (!artistsString) return [];

   return (
      artistsString
         // Normalize separators: null char (\u0000), slash, semicolon, or comma

         // eslint-disable-next-line no-control-regex
         .split(/[\u0000/;]|,(?=(?:[^"]*"[^"]*")*[^"]*$)/g)
         // Split trims
         .map((s) => s.trim())
         // Remove empties
         .filter((s) => s.length > 0)
   );
};

export const convertAudiobookData = (data: AudiobookInfo) => {};
