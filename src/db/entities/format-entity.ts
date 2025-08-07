import { Table } from "litdb";

import { BaseEntityWithId, baseEntityColumns } from "../common/base-entity";

export class FormatEntity extends BaseEntityWithId {
   constructor(data: Partial<FormatEntity>) {
      super(data);
      Object.assign(this, data);
   }

   static readonly tableName = "formats";

   name: string = "";
}

Table(FormatEntity, {
   columns: {
      id: { type: "INTEGER", primaryKey: true, autoIncrement: true },
      name: { type: "TEXT", required: true },
      ...baseEntityColumns,
   },
   table: {
      alias: "formats",
   },
});
