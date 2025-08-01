import { useTranslation } from "react-i18next";
import { cn } from "src/lib/style-utils";
import { SettingsStore, useSettingsStore } from "src/stores/settings-store";

import {
   Select,
   SelectContent,
   SelectItem,
   SelectTrigger,
   SelectValue,
} from "@/components/ui/select";

export namespace LibraryMethodSelect {
   export type Props = Select.RootProps & {
      className?: string;
   };
}

export const LibraryMethodSelect = ({
   className,
   ...props
}: LibraryMethodSelect.Props) => {
   const { t } = useTranslation();
   const { importMethod, setImportMethod } = useSettingsStore();
   return (
      <Select
         data-slot="library-method-select"
         value={importMethod}
         onValueChange={(method: SettingsStore.Values["importMethod"]) =>
            setImportMethod(method)
         }
         {...props}
      >
         <SelectTrigger
            className={cn("w-full", className)}
            label={t("settings.importMethod.label")}
         >
            <SelectValue />
         </SelectTrigger>
         <SelectContent>
            {["copy", "move", "link"].map((method) => (
               <SelectItem
                  key={method}
                  value={method}
                  description={t(`settings.importMethod.${method}.description`)}
               >
                  {t(`settings.importMethod.${method}.title`)}
               </SelectItem>
            ))}
         </SelectContent>
      </Select>
   );
};
