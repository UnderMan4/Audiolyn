import { EventCallback, listen } from "@tauri-apps/api/event";

import { useAsyncEffect } from "./use-async-effect";

export type TauriEvent = "copying";
export type TauriEventPayloads = {
   copying: {
      taskId: string;
      filePath: string;
      progress: number;
      total: number;
   };
};

export const useTauriEventListener = <T extends TauriEvent>(
   eventName: T,
   callback: EventCallback<TauriEventPayloads[T]>
) => {
   useAsyncEffect(async () => {
      const unlisten = await listen<TauriEventPayloads[T]>(eventName, callback);
      return unlisten;
   }, [callback, eventName]);
};
