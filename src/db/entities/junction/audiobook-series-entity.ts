import { Table } from "litdb";

import { BaseEntity, baseEntityColumns } from "../../common/base-entity";
import { AudiobookEntity } from "../audiobook-entity";
import { SeriesEntity } from "../series-entity";

export class AudiobookSeriesEntity extends BaseEntity {
   constructor(data: Partial<AudiobookSeriesEntity>) {
      super(data);
      Object.assign(this, data);
   }

   static readonly tableName = "audiobooks_series";

   audiobookId: number = 0;
   seriesId: number = 0;
   numberInSeries: number | undefined;
}

Table(AudiobookSeriesEntity, {
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
      seriesId: {
         type: "INTEGER",
         required: true,
         alias: "series_id",
         references: {
            table: SeriesEntity,
            on: ["DELETE", "CASCADE"],
         },
      },
      numberInSeries: {
         type: "REAL",
         required: false,
         alias: "number_in_series",
      },
      ...baseEntityColumns,
   },
   table: {
      alias: "audiobooks_series",
   },
});
