import { Table } from "litdb";

import { BaseEntityWithId, baseEntityColumns } from "../common/base-entity";

export class LanguageEntity extends BaseEntityWithId {
   constructor(data: Partial<LanguageEntity>) {
      super(data);
      Object.assign(this, data);
   }

   static readonly tableName = "languages";

   code: string = "";
}

Table(LanguageEntity, {
   columns: {
      id: { type: "INTEGER", primaryKey: true, autoIncrement: true },
      code: { type: "TEXT", required: true },
      ...baseEntityColumns,
   },
   table: {
      alias: "languages",
   },
});
