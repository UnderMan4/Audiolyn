import { Table } from "litdb";

import { BaseEntityWithId, baseEntityColumns } from "./base-entity";

export class SeriesEntity extends BaseEntityWithId {
   constructor(data: Partial<SeriesEntity>) {
      super(data);
      Object.assign(this, data);
   }

   static readonly tableName = "series";

   name: string = "";
}

Table(SeriesEntity, {
   columns: {
      id: { type: "INTEGER", primaryKey: true, autoIncrement: true },
      name: { type: "TEXT", required: true },
      ...baseEntityColumns,
   },
   table: {
      alias: "series",
   },
});
