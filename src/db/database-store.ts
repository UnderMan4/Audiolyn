import Database from "@tauri-apps/plugin-sql";
import { create } from "zustand";

import { AudiobookService } from "./services/audiobook-service";
import { AudiobookVersionService } from "./services/audiobook-version-service";
import { AuthorService } from "./services/author-service";
import { FormatService } from "./services/format-service";
import { GenreService } from "./services/genre-service";
import { LanguageService } from "./services/language-service";
import { NarratorService } from "./services/narrator-service";
import { SeriesService } from "./services/series-service";
import { TagService } from "./services/tag-service";

export namespace DatabaseStore {
   export type Values = {
      db: Database | null;
      services: {
         audiobookService: AudiobookService;
         audiobookVersionService: AudiobookVersionService;
         authorService: AuthorService;
         formatService: FormatService;
         genreService: GenreService;
         languageService: LanguageService;
         narratorService: NarratorService;
         seriesService: SeriesService;
         tagService: TagService;
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
      audiobookService: new AudiobookService(),
      audiobookVersionService: new AudiobookVersionService(),
      authorService: new AuthorService(),
      formatService: new FormatService(),
      genreService: new GenreService(),
      languageService: new LanguageService(),
      narratorService: new NarratorService(),
      seriesService: new SeriesService(),
      tagService: new TagService(),
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
