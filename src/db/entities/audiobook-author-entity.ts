import { Table } from "litdb";

import { AudiobookEntity } from "./audiobook-entity";
import { AuthorEntity } from "./author-entity";
import { BaseEntity, baseEntityColumns } from "./base-entity";

export class AudiobookAuthorEntity extends BaseEntity {
   constructor(data: Partial<AudiobookAuthorEntity>) {
      super(data);
      Object.assign(this, data);
   }

   static readonly tableName = "audiobooks_authors";

   audiobookId: number = 0;
   authorId: number = 0;
}

Table(AudiobookAuthorEntity, {
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
      authorId: {
         type: "INTEGER",
         required: true,
         alias: "author_id",
         references: {
            table: AuthorEntity,
            on: ["DELETE", "CASCADE"],
         },
      },
      ...baseEntityColumns,
   },
   table: {
      alias: "audiobooks_authors",
   },
});
