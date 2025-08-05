import Database from "@tauri-apps/plugin-sql";
import { create } from "zustand";

import { GenreService } from "./services/genre-service";

export namespace DatabaseStore {
   export type Values = {
      db: Database | null;
      services: {
         genreService: GenreService;
      };
   };
   export type Functions = {
      loadDb: () => Promise<void>;
   };

   export type Store = Values & Functions;
}

export const useDatabase = create<DatabaseStore.Store>((set, get) => ({
   // Values
   db: null,
   services: {
      genreService: new GenreService(),
   },

   // Functions
   loadDb: async () => {
      const db = await Database.load("sqlite:db.db");
      await db.execute("PRAGMA foreign_keys = ON;");
      set({ db });
      const { services } = get();
      Object.values(services).forEach((service) => service.setDb(db));
      console.log("Database loaded and services initialized");
   },
}));
