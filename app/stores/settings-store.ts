import { createTauriStore } from "@tauri-store/zustand";
import { create } from "zustand";

export namespace SettingsStore {
   export type Values = {
      libraryMethod: "copy" | "move" | "symlink";
      libraryLocation: string;
      flags: {
         isFirstRun: boolean;
      };
   };

   export type Functions = {
      setFlag: (flag: keyof Values["flags"], value: boolean) => void;
      setLibraryMethod: (method: Values["libraryMethod"]) => void;
      setLibraryLocation: (location: string) => void;
   };

   export type Store = Values & Functions;
}

export const useSettingsStore = create<SettingsStore.Store>((set) => ({
   libraryMethod: "copy",
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
   setLibraryMethod: (libraryMethod) => set(() => ({ libraryMethod })),
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
