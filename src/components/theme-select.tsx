import { Monitor, Moon, Sun } from "lucide-react";
import { useTranslation } from "react-i18next";
import { cn } from "src/lib/style-utils";
import { SettingsStore, useSettingsStore } from "src/stores/settings-store";

import {
   Select,
   SelectContent,
   SelectItem,
   SelectTrigger,
   SelectValue,
} from "./ui";

export namespace ThemeSelect {
   export type Props = Omit<Select.TriggerProps, "label"> & {
      label?: boolean;
   };
}

export const ThemeSelect = ({
   className,
   label,
   ...props
}: ThemeSelect.Props) => {
   const { t } = useTranslation();
   const { theme, setTheme } = useSettingsStore();

   return (
      <Select
         data-slot="language-select"
         onValueChange={(theme: SettingsStore.Values["theme"]) => {
            setTheme(theme);
         }}
         value={theme}
      >
         <SelectTrigger
            className={cn("", className)}
            label={label ? t(`settings.theme.label`) : undefined}
            {...props}
         >
            <SelectValue />
         </SelectTrigger>
         <SelectContent>
            <SelectItem value="light">
               <Sun />
               {t(`settings.theme.light`)}
            </SelectItem>
            <SelectItem value="dark">
               <Moon />
               {t(`settings.theme.dark`)}
            </SelectItem>
            <SelectItem value="system">
               <Monitor />
               {t(`settings.theme.system`)}
            </SelectItem>
         </SelectContent>
      </Select>
   );
};
