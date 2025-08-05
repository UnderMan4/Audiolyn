import { Table } from "litdb";

import { BaseEntityWithId, baseEntityColumns } from "./base-entity";

export class NarratorEntity extends BaseEntityWithId {
   constructor(data: Partial<NarratorEntity>) {
      super(data);
      Object.assign(this, data);
   }

   static readonly tableName = "narrators";

   name: string = "";
   surname: string = "";
   bio: string | undefined;
   image: string | undefined;
}

Table(NarratorEntity, {
   columns: {
      id: { type: "INTEGER", primaryKey: true, autoIncrement: true },
      name: { type: "TEXT", required: true },
      surname: { type: "TEXT", required: true },
      bio: { type: "TEXT", required: false },
      image: { type: "TEXT", required: false },
      ...baseEntityColumns,
   },
   table: {
      alias: "narrators",
   },
});
