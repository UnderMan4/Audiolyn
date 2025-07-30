import {
   OpenDialogOptions,
   OpenDialogReturn,
   open,
} from "@tauri-apps/plugin-dialog";
import { useCallback, useRef, useState } from "react";
import { useTranslation } from "react-i18next";

import { Intl } from "@/i18n/types";

export namespace OpenDialog {
   export type DialogOptions = Omit<OpenDialogOptions, "filters" | "title"> & {
      filters?: OpenDialog.Filter[];
      title?: Intl.Key;
   };

   export type HookOptions<T extends DialogOptions> = {
      onClose?: () => void;
      onSubmit?: (files: OpenDialogReturn<T>) => void;
   };
   export type Filter = {
      name: Intl.Key;
      extensions: string[];
   };
}

export const useOpenDialog = <T extends OpenDialog.DialogOptions>(
   dialogOptions: T,
   { onClose, onSubmit }: OpenDialog.HookOptions<T> = {}
) => {
   const [isDialogOpen, setIsDialogOpen] = useState<boolean>(false);
   const [wasClosedByUser, setWasClosedByUser] = useState(false);
   const isDialogOpenRef = useRef(false);
   const { t } = useTranslation();

   const openDialog = useCallback(async (): Promise<OpenDialogReturn<T>> => {
      if (isDialogOpenRef.current) {
         return null;
      }
      isDialogOpenRef.current = true;
      setIsDialogOpen(true);
      try {
         const result = await open({
            ...dialogOptions,
            title: dialogOptions.title ? t(dialogOptions.title) : undefined,
            filters: dialogOptions.filters?.map(({ extensions, name }) => ({
               extensions,
               name: t(name),
            })),
         });
         console.log("🚀 ~ openDialog ~ result:", result);

         const closedByUser = result == null;
         setWasClosedByUser(closedByUser);
         if (closedByUser) onClose?.();
         else onSubmit?.(result);

         return result;
      } catch (error) {
         console.error("Error opening dialog:", error);
         return null;
      } finally {
         isDialogOpenRef.current = false;
         setIsDialogOpen(false);
      }
   }, [dialogOptions, t, onClose, onSubmit]);

   return { open: openDialog, isDialogOpen, wasClosedByUser } as const;
};
