import CountryFlag from "react-country-flag";
import { useTranslation } from "react-i18next";

import { countryCodes, languages } from "@/intl/i18n";
import { Intl } from "@/intl/types";
import { cn } from "@/lib/utils";

import {
   Select,
   SelectContent,
   SelectItem,
   SelectTrigger,
   SelectValue,
} from "./ui";

export namespace LanguageSelect {
   export type Props = Omit<Select.TriggerProps, "label">;
}

export const LanguageSelect = ({
   className,
   ...props
}: LanguageSelect.Props) => {
   const { t, i18n } = useTranslation();

   return (
      <Select
         defaultValue={i18n.language}
         data-slot="language-select"
         onValueChange={(lang: Intl.Locale) => {
            i18n.changeLanguage(lang);
         }}
         value={i18n.language}
      >
         <SelectTrigger className={cn("", className)} {...props}>
            <SelectValue />
         </SelectTrigger>
         <SelectContent>
            {languages.map((lang) => (
               <SelectItem value={lang} key={lang}>
                  <CountryFlag svg countryCode={countryCodes[lang]} />
                  {t(`common.languages.${lang}`)}
               </SelectItem>
            ))}
         </SelectContent>
      </Select>
   );
};
