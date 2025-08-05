import { Table } from "litdb";

import { AudiobookEntity } from "./audiobook-entity";
import { BaseEntity, baseEntityColumns } from "./base-entity";
import { GenreEntity } from "./genre-entity";

export class AudiobookGenreEntity extends BaseEntity {
   constructor(data: Partial<AudiobookGenreEntity>) {
      super(data);
      Object.assign(this, data);
   }

   static readonly tableName = "audiobooks_genres";

   audiobookId: number = 0;
   genreId: number = 0;
}

Table(AudiobookGenreEntity, {
   columns: {
      audiobookId: {
         type: "INTEGER",
         required: true,
         alias: "audiobook_id",
         references: {
            table: AudiobookEntity,
            on: ["DELETE", "CASCADE"],
         },
      },
      genreId: {
         type: "INTEGER",
         required: true,
         alias: "genre_id",
         references: {
            table: GenreEntity,
            on: ["DELETE", "CASCADE"],
         },
      },
      ...baseEntityColumns,
   },
   table: {
      alias: "Audiobook_Genre",
   },
});
