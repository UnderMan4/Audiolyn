import { createTauriStore } from "@tauri-store/zustand";
import { create } from "zustand";

export namespace SettingsStore {
   export type Values = {
      importMethod: "copy" | "move" | "link";
      libraryLocation: string;
      flags: {
         isFirstRun: boolean;
      };
   };

   export type Functions = {
      setFlag: (flag: keyof Values["flags"], value: boolean) => void;
      setImportMethod: (method: Values["importMethod"]) => void;
      setLibraryLocation: (location: string) => void;
   };

   export type Store = Values & Functions;
}

export const useSettingsStore = create<SettingsStore.Store>((set) => ({
   importMethod: "copy",
   libraryLocation: "",
   flags: {
      isFirstRun: true,
   },

   setFlag: (flag, value) =>
      set((state) => ({
         flags: {
            ...state.flags,
            [flag]: value,
         },
      })),
   setImportMethod: (libraryMethod) =>
      set(() => ({ importMethod: libraryMethod })),
   setLibraryLocation: (libraryLocation) => set(() => ({ libraryLocation })),
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
