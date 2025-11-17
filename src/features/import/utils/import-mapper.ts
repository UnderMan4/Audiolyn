import { parseName } from "humanparser";
import ISO6391 from "iso-639-1";

import { FFprobeSuccessResult } from "@/features/import/types/ffprobe";
import { ImportMetadata } from "@/features/import/types/metadata";
import { MapSchema } from "@/lib/object-mapper";
import { stringConcat } from "@/lib/string-utils";

import { splitMultiValueTag } from "./data-utils";

const mapPersonName = (name: string): ImportMetadata.Person => {
   const { firstName, lastName, middleName } = parseName(name);
   const givenName = stringConcat([firstName, middleName], " ");
   const familyName = lastName;
   const sortName = stringConcat([familyName, givenName], ", ");
   return { givenName, familyName, sortName };
};

export const mapAudiobookToImport = (raw: FFprobeSuccessResult) => {
   const metadataSchema: MapSchema<
      FFprobeSuccessResult,
      ImportMetadata.Metadata
   > = {
      title: {
         type: "firstOf",
         fields: [
            "format.tags.title",
            "format.tags.TITLE",
            "format.tags.©nam",
            "format.tags.audible_title",
            "format.tags.album",
            "format.tags.ALBUM",
         ],
      },
      authors: {
         type: "firstOfTransformed",
         fields: [
            "format.tags.author",
            "format.tags.audible_author",
            "format.tags.©ART",
            "format.tags.artist",
            "format.tags.ARTIST",
            "format.tags.album_artist",
         ],
         fn: (value) => {
            if (typeof value !== "string") return [];
            return splitMultiValueTag(value).map(mapPersonName);
         },
      },
      narrators: {
         type: "firstOfTransformed",
         fields: ["format.tags.narrator", "format.tags.audible_narrator"],
         fn: (value) => {
            if (typeof value !== "string") return [];
            return splitMultiValueTag(value).map(mapPersonName);
         },
      },
      language: {
         type: "firstOfTransformed",
         fields: [
            "format.tags.language",
            "format.tags.LANGUAGE",
            "format.tags.©lan",
            "format.tags.lang",
            "format.tags.LANG",
            "format.tags.languages",
         ],
         fn: (value) => {
            if (!value || typeof value !== "string") return undefined;
            const code = ISO6391.getCode(value);

            const languageCode = code
               ? code
               : ISO6391.getName(value)
                 ? value
                 : undefined;

            return languageCode;
         },
      },
      covers: {
         type: "static",
         value: [],
      },
      genres: {
         type: "firstOfTransformed",
         fields: [
            "format.tags.GENRE",
            "format.tags.genre",
            "format.tags.©gen",
            "format.tags.audible_genre",
         ],
         fn: (value) => {
            if (typeof value !== "string") return [];
            return splitMultiValueTag(value);
         },
      },
      audibleAsin: {
         type: "firstOf",
         fields: [
            "format.tags.audible_asin",
            "format.tags.ASIN",
            "format.tags.asin",
         ],
      },
   };
};
