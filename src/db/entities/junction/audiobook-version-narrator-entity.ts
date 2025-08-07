import { Table } from "litdb";

import { BaseEntity, baseEntityColumns } from "../../common/base-entity";
import { AudiobookVersionEntity } from "../audiobook-version-entity";
import { NarratorEntity } from "../narrator-entity";

export class AudiobookVersionNarratorEntity extends BaseEntity {
   constructor(data: Partial<AudiobookVersionNarratorEntity>) {
      super(data);
      Object.assign(this, data);
   }

   static readonly tableName = "audiobook_versions_narrators";

   audiobookVersionId: number = 0;
   narratorId: number = 0;
}

Table(AudiobookVersionNarratorEntity, {
   columns: {
      audiobookVersionId: {
         type: "INTEGER",
         required: true,
         alias: "audiobook_version_id",
         references: {
            table: AudiobookVersionEntity,
            on: ["DELETE", "CASCADE"],
         },
      },
      narratorId: {
         type: "INTEGER",
         required: true,
         alias: "narrator_id",
         references: {
            table: NarratorEntity,
            on: ["DELETE", "CASCADE"],
         },
      },
      ...baseEntityColumns,
   },
   table: {
      alias: "audiobook_versions_narrators",
   },
});
