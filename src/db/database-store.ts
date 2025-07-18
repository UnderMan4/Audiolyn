import Database from "@tauri-apps/plugin-sql";
import { create } from "zustand";

export namespace DatabaseStore {
   export type Values = {
      db: Database | null;
   };
   export type Functions = {
      loadDb: () => Promise<void>;
   };

   export type Store = Values & Functions;
}

export const useDatabase = create<DatabaseStore.Store>((set) => ({
   db: null,
   loadDb: async () => {
      const db = await Database.load("sqlite:db.db");
      await db.execute("PRAGMA foreign_keys = ON;");
      set({ db });
   },
}));
