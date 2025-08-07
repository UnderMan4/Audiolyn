import { Table } from "litdb";

import { BaseEntityWithId, baseEntityColumns } from "../common/base-entity";

export class GenreEntity extends BaseEntityWithId {
   constructor(data: Partial<GenreEntity>) {
      super(data);
      Object.assign(this, data);
   }

   static readonly tableName = "genres";

   name: string = "";
}

Table(GenreEntity, {
   columns: {
      id: { type: "INTEGER", primaryKey: true, autoIncrement: true },
      name: { type: "TEXT", required: true },
      ...baseEntityColumns,
   },
   table: {
      alias: "genres",
   },
});
