export const convertQuery = (query: {
   sql: string;
   params: Record<string, unknown>;
}) => {
   const sql = query.sql.replace(/=\$_(\d+)/g, (_, n) => `=$${n}`);
   const params = Object.keys(query.params)
      .sort((a, b) => a.localeCompare(b))
      .map((key) => query.params[key]);

   return [sql, params] as const;
};
