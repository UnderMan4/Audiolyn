import { sqlite as $ } from "litdb";

export const convertQuery = (query: {
   sql: string;
   params: Record<string, unknown>;
}) => {
   const sql = query.sql.replace(/\$_(\d+)/g, (_, n) => `$${n}`);
   const params = Object.keys(query.params)
      .sort((a, b) => a.localeCompare(b))
      .map((key) => query.params[key]);

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
