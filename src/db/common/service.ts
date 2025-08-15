import Database from "@tauri-apps/plugin-sql";
import { sqlite as $, SelectQuery } from "litdb";
import _ from "lodash";

import { pascalToSnake } from "@/lib/string-utils";
import { PartialExcept } from "@/types/types";

import { convertQuery } from "../utils";
import { BaseEntityWithId } from "./base-entity";
import { Page, PaginationOptions } from "./pagination";

export type EntityClass<T extends BaseEntityWithId> = {
   new (data: T): T;
   tableName: string;
};

export type GetOptions = {
   pagination?: PaginationOptions;
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

   protected checkDb(): asserts this is { db: Database } {
      if (!this.db) {
         throw new Error("Database not initialized");
      }
   }

   public setDb(db: Database) {
      this.db = db;
   }

   public async getById(id: number): Promise<T> {
      this.checkDb();

      const query = convertQuery(
         $.from(this.entityClass)
            .where((entity) => $`${entity.id}=${id}`)
            .build()
      );

      const result = await this.db.select<T[]>(...query);
      return result[0];
   }

   public async get(
      queryBuilder: (
         builder: SelectQuery<[new (data: T) => T]>,
         _$: typeof $
      ) => SelectQuery<[new (data: T) => T]>
   ): Promise<T[]>;
   public async get(
      queryBuilder: (
         builder: SelectQuery<[new (data: T) => T]>,
         _$: typeof $
      ) => SelectQuery<[new (data: T) => T]>,
      pagination: PaginationOptions
   ): Promise<Page<T>>;
   public async get(
      queryBuilder: (
         builder: SelectQuery<[new (data: T) => T]>,
         _$: typeof $
      ) => SelectQuery<[new (data: T) => T]>,
      pagination?: PaginationOptions
   ): Promise<T[] | Page<T>> {
      this.checkDb();

      if (pagination) {
         const pageSize = pagination.pageSize || 10;
         const pageNumber = pagination.pageNumber || 1;
         const offset = (pageNumber - 1) * pageSize;

         const query = convertQuery(
            queryBuilder($.from(this.entityClass), $)
               .limit(pageSize, offset)
               .build()
         );

         const items = await this.db.select<T[]>(...query);

         const totalCountQuery = convertQuery(
            queryBuilder($.from(this.entityClass), $).rowCount()
         );
         const totalCountResult = await this.db.select<
            { "COUNT(*)": number }[]
         >(...totalCountQuery);

         const totalCount = totalCountResult[0]?.["COUNT(*)"] || 0;

         const totalPages = Math.ceil(totalCount / pageSize);
         if (pageNumber < 1 || pageNumber > totalPages) {
            throw new Error(
               `Page number ${pageNumber} is out of range. Total pages: ${totalPages}`
            );
         }

         return {
            items,
            totalCount,
            pageSize,
            pageNumber,
            totalPages,
            hasNextPage: offset + pageSize < totalCount,
            hasPreviousPage: offset > 0,
            getNextPage: async () =>
               this.get(queryBuilder, {
                  pageSize,
                  pageNumber: pageNumber + 1,
               }),
            getPreviousPage: async () =>
               this.get(queryBuilder, {
                  pageSize,
                  pageNumber: Math.max(pageNumber - 1, 1),
               }),
         };
      }

      const query = convertQuery(
         queryBuilder($.from(this.entityClass), $).build()
      );

      return this.db.select<T[]>(...query);
   }

   public async getOne(
      queryBuilder: (
         builder: SelectQuery<[new (data: T) => T]>,
         _$: typeof $
      ) => SelectQuery<[new (data: T) => T]>
   ): Promise<T | null> {
      this.checkDb();

      const query = convertQuery(
         queryBuilder($.from(this.entityClass), $).build()
      );

      const result = await this.db.select<T[]>(...query);
      return result[0] || null;
   }

   public async getAll(pagination: PaginationOptions): Promise<Page<T>>;
   public async getAll(): Promise<T[]>;
   public async getAll(pagination?: PaginationOptions): Promise<T[] | Page<T>> {
      this.checkDb();

      if (pagination) {
         const pageSize = pagination.pageSize || 10;
         const pageNumber = pagination.pageNumber || 1;
         const offset = (pageNumber - 1) * pageSize;

         const query = convertQuery(
            $.from(this.entityClass).limit(pageSize, offset).build()
         );

         const items = await this.db.select<T[]>(...query);

         const totalCountQuery = convertQuery(
            $.from(this.entityClass).rowCount()
         );
         const totalCountResult = await this.db.select<
            { "COUNT(*)": number }[]
         >(...totalCountQuery);

         const totalCount = totalCountResult[0]?.["COUNT(*)"] || 0;

         const totalPages = Math.ceil(totalCount / pageSize);

         if (pageNumber < 1 || pageNumber > totalPages) {
            throw new Error(
               `Page number ${pageNumber} is out of range. Total pages: ${totalPages}`
            );
         }

         return {
            items,
            totalCount,
            pageSize,
            pageNumber,
            totalPages,
            hasNextPage: offset + pageSize < totalCount,
            hasPreviousPage: offset > 0,
            getNextPage: async () =>
               this.getAll({
                  pageSize,
                  pageNumber: pageNumber + 1,
               }),
            getPreviousPage: async () =>
               this.getAll({
                  pageSize,
                  pageNumber: Math.max(pageNumber - 1, 1),
               }),
         };
      }

      const query = convertQuery($.from(this.entityClass).build());

      return this.db.select<T[]>(...query);
   }

   public async add(entity: T): Promise<T> {
      this.checkDb();

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
      this.checkDb();

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

   public abstract addOrGetIfExists(entity: Partial<T>): Promise<T>;
}
