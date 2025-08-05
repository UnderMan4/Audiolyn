import { Table } from "litdb";

import { BaseEntityWithId, baseEntityColumns } from "./base-entity";

export class AudiobookEntity extends BaseEntityWithId {
   constructor(data: Partial<AudiobookEntity>) {
      super(data);
      Object.assign(this, data);
   }

   static readonly tableName = "audiobooks";

   title: string = "";
   cover: string | undefined;
   description: string | undefined;
   releaseDate: Date | undefined;
   publisher: string | undefined;
   isbn: string | undefined;
}

Table(AudiobookEntity, {
   columns: {
      id: { type: "INTEGER", primaryKey: true, autoIncrement: true },
      title: { type: "TEXT", required: true },
      cover: { type: "TEXT", required: false },
      description: { type: "TEXT", required: false },
      releaseDate: { type: "DATETIME", required: false, alias: "release_date" },
      publisher: { type: "TEXT", required: false },
      isbn: { type: "TEXT", required: false },
      ...baseEntityColumns,
   },
   table: {
      alias: "audiobooks",
   },
});
