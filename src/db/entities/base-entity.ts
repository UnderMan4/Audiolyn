import { ColumnsConfig } from "litdb";

export abstract class BaseEntity {
   constructor(data: Partial<BaseEntity>) {
      Object.assign(this, data);
   }
   createdAt: Date = new Date();
   updatedAt: Date = new Date();
   version: number = 1;

   static readonly tableName: string;
}

export const baseEntityColumns: ColumnsConfig<BaseEntity> = {
   createdAt: { type: "DATETIME", alias: "created_at" },
   updatedAt: { type: "DATETIME", alias: "updated_at" },
   version: { type: "INTEGER" },
};

export class BaseEntityWithId extends BaseEntity {
   constructor(data: Partial<BaseEntityWithId>) {
      super(data);
      Object.assign(this, data);
   }
   id: number = 0;
}
