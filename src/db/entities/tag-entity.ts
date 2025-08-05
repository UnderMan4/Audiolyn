import { Table } from "litdb";

import { BaseEntityWithId, baseEntityColumns } from "./base-entity";

export class TagEntity extends BaseEntityWithId {
   constructor(data: Partial<TagEntity>) {
      super(data);
      Object.assign(this, data);
   }

   static readonly tableName = "tags";

   name: string = "";
}

Table(TagEntity, {
   columns: {
      id: { type: "INTEGER", primaryKey: true, autoIncrement: true },
      name: { type: "TEXT", required: true },
      ...baseEntityColumns,
   },
   table: {
      alias: "tags",
   },
});
