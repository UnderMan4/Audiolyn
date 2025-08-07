import { Table } from "litdb";

import { BaseEntity, baseEntityColumns } from "../../common/base-entity";
import { AudiobookEntity } from "../audiobook-entity";
import { TagEntity } from "../tag-entity";

export class AudiobookTagEntity extends BaseEntity {
   constructor(data: Partial<AudiobookTagEntity>) {
      super(data);
      Object.assign(this, data);
   }

   static readonly tableName = "audiobooks_tags";
   audiobookId: number = 0;
   tagId: number = 0;
}

Table(AudiobookTagEntity, {
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
      tagId: {
         type: "INTEGER",
         required: true,
         alias: "tag_id",
         references: {
            table: TagEntity,
            on: ["DELETE", "CASCADE"],
         },
      },
      ...baseEntityColumns,
   },
   table: {
      alias: "audiobooks_tags",
   },
});
