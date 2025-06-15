import { load } from "@tauri-apps/plugin-store";
import { ReactNode, createContext, useContext, useRef } from "react";

import { useAsyncEffect, useObjectState } from "@/hooks";

export type TauriStoreValue = {
   settings: {
      language: string;
      theme?: string;
   };
   user?: {
      name: string;
      email?: string;
   };
   [key: string]: any; // Allow dynamic keys for universal sync
};

const TauriStoreContext = createContext<
   | {
        state: TauriStoreValue;
        setState: ReturnType<typeof useObjectState<TauriStoreValue>>[1];
        purge: () => Promise<void>;
     }
   | undefined
>(undefined);

export const INITIAL_TAURI_STORE_STATE: TauriStoreValue = {
   settings: {
      language: "en",
   },
};

export const TauriStoreProvider = ({ children }: { children: ReactNode }) => {
   const [state, setState] = useObjectState<TauriStoreValue>(
      INITIAL_TAURI_STORE_STATE
   );
   const storeRef = useRef<any>(null);

   // Load all keys/values from Tauri store on mount
   useAsyncEffect(async () => {
      try {
         const store = await load("store.json", { createNew: true });
         storeRef.current = store;
         const entriesArr = await store.entries();
         if (Array.isArray(entriesArr)) {
            const entriesObj = Object.fromEntries(entriesArr);
            // Always ensure required keys exist
            setState(entriesObj);
         }
      } catch (error) {
         console.error("Failed to load Tauri store:", error);
      }
   }, []);

   // Sync all context changes to Tauri store
   useAsyncEffect(async () => {
      if (!storeRef.current) return;
      const keys = Object.keys(state);
      for (const key of keys) {
         await storeRef.current.set(key, state[key]);
      }
      // Remove keys from store that are no longer in state
      const storeKeys = await storeRef.current.keys();
      for (const key of storeKeys) {
         if (!keys.includes(key)) {
            await storeRef.current.delete(key);
         }
      }
      await storeRef.current.save();
   }, [state]);

   // Purge function to clear all store data and reset state
   const purge = async () => {
      if (!storeRef.current) return;
      const storeKeys = await storeRef.current.keys();
      for (const key of storeKeys) {
         await storeRef.current.delete(key);
      }
      await storeRef.current.save();
      setState(INITIAL_TAURI_STORE_STATE);
   };

   return (
      <TauriStoreContext.Provider value={{ state, setState, purge }}>
         {children}
      </TauriStoreContext.Provider>
   );
};

export const useTauriStore = () => {
   const context = useContext(TauriStoreContext);
   if (!context) {
      throw new Error("useStore must be used within a StoreProvider");
   }
   return context;
};
