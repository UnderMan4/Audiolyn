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

export const convertAudiobookData = (data: AudiobookInfo) => {
   const { metadata } = data;
   const title = metadata.title || metadata.album || "";
   const description = metadata.description || metadata.comment;
   const releaseDate = metadata.date
      ? new Date(metadata.date)
      : metadata.creation_time
        ? new Date(metadata.creation_time)
        : undefined;
   const publisher = metadata.publisher;
   const isbn = metadata.isbn;
   const audibleAsin = metadata.audibleAsin;

   const audiobook = new AudiobookEntity({
      title,
      description,
      releaseDate,
      publisher,
      isbn,
      audibleAsin,
   });

   const authors = splitArtists(
      metadata.artist ||
         metadata.AUTHOR ||
         metadata.album_artist ||
         metadata.composer
   ).map((a) => {
      const author = human.parseName(a);
      const name = [author.firstName, author.middleName]
         .filter(Boolean)
         .join(" ");
      const surname = author.lastName;
      return new AuthorEntity({
         name: name || "",
         surname: surname || "",
      });
   });

   return {
      audiobook,
      authors,
   };
};
