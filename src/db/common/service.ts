import Database from "@tauri-apps/plugin-sql";
import { sqlite as $, SelectQuery } from "litdb";
import _ from "lodash";

import { pascalToSnake } from "@/lib/string-utils";
import { PartialExcept } from "@/types/types";

import { BaseEntityWithId } from "../entities/base-entity";
import { convertQuery } from "../utils";

export type EntityClass<T extends BaseEntityWithId> = {
   new (data: T): T;
   tableName: string;
};

export abstract class Service<T extends BaseEntityWithId> {
   protected db: Database | null = null;
   protected entityClass: EntityClass<T>;

   static readonly FIELDS_TO_IGNORE = [
      "createdAt",
      "updatedAt",
      "version",
      "id",
   ];

   constructor(entityClass: EntityClass<T>) {
      this.entityClass = entityClass;
   }

   setDb(db: Database) {
      this.db = db;
   }

   public async getById(id: number): Promise<T> {
      if (!this.db) {
         throw new Error("Database not initialized");
      }
      const query = convertQuery(
         $.from(this.entityClass)
            .where((entity) => $`${entity.id}=${id}`)
            .build()
      );

      const result = await this.db.select<T[]>(...query);
      return result[0];
   }

   public get(
      queryBuilder: (
         entity: SelectQuery<[new (data: T) => T]>,
         builder: typeof $
      ) => SelectQuery<[new (data: T) => T]>
   ): Promise<T[]> {
      if (!this.db) {
         throw new Error("Database not initialized");
      }
      const query = convertQuery(
         queryBuilder($.from(this.entityClass), $).build()
      );
      console.log("🚀 ~ Service<T ~ query:", query);

      return this.db.select<T[]>(...query);
   }

   public getAll(): Promise<T[]> {
      if (!this.db) {
         throw new Error("Database not initialized");
      }
      const query = convertQuery($.from(this.entityClass).build());

      return this.db.select<T[]>(...query);
   }

   public async add(entity: T): Promise<T> {
      if (!this.db) {
         throw new Error("Database not initialized");
      }

      const data = Object.entries(entity).filter(
         ([key]) => !Service.FIELDS_TO_IGNORE.includes(key)
      );

      const query = `
         INSERT INTO ${this.entityClass.tableName} (${data.map(([key]) => pascalToSnake(key)).join(", ")})
         VALUES (${data.map((_, index) => `$${index + 1}`).join(", ")})
         RETURNING *
      `;

      const result = await this.db.select<T[]>(
         query,
         data.map(([, value]) => value)
      );
      return result[0];
   }

   public async update(entity: PartialExcept<T, "id">): Promise<T> {
      if (!this.db) {
         throw new Error("Database not initialized");
      }

      if (!entity.id) {
         throw new Error("Entity must have an id to be updated");
      }

      const oldRecord = await this.getById(entity.id);
      if (!oldRecord) {
         throw new Error(
            `Entity with id ${entity.id} in table ${this.entityClass.tableName} not found`
         );
      }

      const isEqual = _.isEqual(
         _.omit(entity, ["createdAt", "updatedAt", "version"]),
         _.omit(oldRecord, ["createdAt", "updatedAt", "version"])
      );

      if (isEqual) {
         console.warn(
            `Entity with id ${entity.id} in table ${this.entityClass.tableName} is already up to date`
         );
         return oldRecord;
      }

      const data = Object.entries(entity).filter(
         ([key, value]) =>
            !Service.FIELDS_TO_IGNORE.includes(key) && value !== undefined
      );

      const query = `
         UPDATE ${this.entityClass.tableName}
         SET ${data.map(([key], index) => `${pascalToSnake(key)}=$${index + 1}`).join(", ")}
         WHERE id=$${data.length + 1} AND version=$${data.length + 2}
         RETURNING *
      `;

      const result = await this.db.select<T[]>(query, [
         ...data.map(([, value]) => value),
         entity.id,
         oldRecord.version,
      ]);
      if (!result || result.length === 0) {
         throw new Error(
            `Update failed due to concurrent modification: Entity with id ${entity.id} in table ${this.entityClass.tableName} was changed by another process`
         );
      }
      return result[0];
   }

   public abstract getByName(name: string): Promise<T[]>;
}
