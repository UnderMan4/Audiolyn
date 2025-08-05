import { Table } from "litdb";

import { AudiobookEntity } from "./audiobook-entity";
import { BaseEntityWithId, baseEntityColumns } from "./base-entity";
import { FormatEntity } from "./format-entity";
import { LanguageEntity } from "./language-entity";

export class AudiobookVersionEntity extends BaseEntityWithId {
   constructor(data: Partial<AudiobookVersionEntity>) {
      super(data);
      Object.assign(this, data);
   }

   static readonly tableName = "audiobook_versions";

   audiobookId: number = 0;
   formatId: number = 0;
   langId: number = 0;
   duration: number = 0;
   size: number = 0;
   path: string = "";
   bitrate: number = 0;
   sampleRate: number = 0;
}

Table(AudiobookVersionEntity, {
   columns: {
      id: { type: "INTEGER", primaryKey: true, autoIncrement: true },
      audiobookId: {
         type: "INTEGER",
         required: true,
         alias: "audiobook_id",
         references: {
            table: AudiobookEntity,
            on: ["DELETE", "CASCADE"],
         },
      },
      formatId: {
         type: "INTEGER",
         required: true,
         alias: "format_id",
         references: {
            table: FormatEntity,
            on: ["DELETE", "RESTRICT"],
         },
      },
      langId: {
         type: "INTEGER",
         required: true,
         alias: "lang_id",
         references: {
            table: LanguageEntity,
            on: ["DELETE", "RESTRICT"],
         },
      },
      duration: { type: "INTEGER", required: true },
      size: { type: "INTEGER", required: true },
      path: { type: "TEXT", required: true },
      bitrate: { type: "INTEGER", required: true },
      sampleRate: { type: "INTEGER", required: true },
      ...baseEntityColumns,
   },
   table: {
      alias: "audiobook_versions",
   },
});
