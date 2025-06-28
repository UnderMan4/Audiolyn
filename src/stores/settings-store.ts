import { createTauriStore } from "@tauri-store/zustand";
import { create } from "zustand";

export namespace SettingsStore {
   export type Values = {
      importMethod: "copy" | "move" | "link";
      theme: "light" | "dark" | "system";
      libraryLocation: string;
      flags: {
         isFirstRun: boolean;
      };
   };

   export type Functions = {
      setFlag: (flag: keyof Values["flags"], value: boolean) => void;
      setImportMethod: (method: Values["importMethod"]) => void;
      setLibraryLocation: (location: string) => void;
      setTheme: (theme: Values["theme"]) => void;
   };

   export type Store = Values & Functions;
}

export const useSettingsStore = create<SettingsStore.Store>((set) => ({
   // Default values
   importMethod: "copy",
   libraryLocation: "",
   theme: "system",
   flags: {
      isFirstRun: true,
   },

   // Functions to update the store
   setFlag: (flag, value) =>
      set((state) => ({
         flags: {
            ...state.flags,
            [flag]: value,
         },
      })),
   setImportMethod: (importMethod) => set({ importMethod }),
   setLibraryLocation: (libraryLocation) => set({ libraryLocation }),
   setTheme: (theme) => set({ theme }),
}));

export const settingsStoreHandler = createTauriStore(
   "settings",
   useSettingsStore,
   {
      saveOnChange: true,
      saveStrategy: "debounce",
      saveInterval: 500,
      autoStart: true,
   }
);
