import { sqlite as $ } from "litdb";

import { BaseEntity, BaseEntityWithId } from "./common/base-entity";

export const convertQuery = (query: {
   sql: string;
   params: Record<string, unknown>;
}) => {
   const paramKeys = Object.keys(query.params).sort((a, b) =>
      a.localeCompare(b)
   );
   let sql = query.sql;
   const params: unknown[] = [];

   paramKeys.forEach((key, idx) => {
      // Replace all occurrences of $key with $N (N = idx + 1)
      sql = sql.replace(new RegExp(`\\$${key}\\b`, "g"), `$${idx + 1}`);
      params.push(query.params[key]);
   });

   return [sql, params] as const;
};

export const ops = {
   equals: (
      a: string | number | boolean | null,
      b: string | number | boolean | null
   ) => $`${a} = ${b}`,
   notEquals: (
      a: string | number | boolean | null,
      b: string | number | boolean | null
   ) => $`${a} != ${b}`,
   greaterThan: (a: string | number, b: string | number) => $`${a} > ${b}`,
   lessThan: (a: string | number, b: string | number) => $`${a} < ${b}`,
   greaterThanOrEqual: (a: string | number, b: string | number) =>
      $`${a} >= ${b}`,
   lessThanOrEqual: (a: string | number, b: string | number) => $`${a} <= ${b}`,
   like: (a: string, b: string) => $`${a} LIKE ${b}`,
   ilike: (a: string, b: string) => $`LOWER(${a}) LIKE LOWER(${b})`,
   notLike: (a: string, b: string) => $`${a} NOT LIKE ${b}`,
   in: (a: string, b: Array<string | number | boolean | null>) =>
      $`${a} IN (${b.map((_, i) => `$${i + 1}`).join(", ")})`,
   notIn: (a: string, b: Array<string | number | boolean | null>) =>
      $`${a} NOT IN (${b.map((_, i) => `$${i + 1}`).join(", ")})`,
   isNull: (a: string) => $`${a} IS NULL`,
   isNotNull: (a: string) => $`${a} IS NOT NULL`,
   between: (a: string | number, b: string | number, c: string | number) =>
      $`${a} BETWEEN ${b} AND ${c}`,
   notBetween: (a: string | number, b: string | number, c: string | number) =>
      $`${a} NOT BETWEEN ${b} AND ${c}`,
   exists: (subquery: string) => $`EXISTS (${subquery})`,
   notExists: (subquery: string) => $`NOT EXISTS (${subquery})`,
};

export const junctionQuery = <
   T extends BaseEntityWithId,
   U extends BaseEntity,
   V extends BaseEntityWithId,
>(
   definition: {
      left: new (data: T) => T;
      junction: new (data: U) => U;
      right: {
         new (data: V): V;
         tableName: string;
      };
      leftId: keyof U;
      rightId: keyof U;
   },
   id: number
) => {
   const { left, junction, right, leftId, rightId } = definition;
   const query = $.from(left)
      .join(junction, {
         on: (t, u) => $`${t.id} = ${u[leftId]}`,
      })
      .join(right, {
         on: (u, v) => $`${v.id} = ${u[rightId]}`,
      })
      .where((t) => $`${t.id}=${id}`)
      .select(`${right.tableName}.*`)
      .build();

   return convertQuery(query);
};
