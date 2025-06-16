import i18next from "i18next";
import LanguageDetector from "i18next-browser-languagedetector";
import { initReactI18next } from "react-i18next";

import en_US from "./locales/en_US";
import pl_PL from "./locales/pl_PL";
import { Intl } from "./types";

export const countryCodes: Record<Intl.Locale, string> = {
   en_US: "GB",
   pl_PL: "PL",
};

export const translations = {
   en_US,
   pl_PL,
} as const;

export const languages: Intl.Locale[] = Object.keys(
   translations
) as Intl.Locale[];

type Resources = {
   [K in keyof typeof translations]: { translation: (typeof translations)[K] };
};
const resources: Resources = Object.fromEntries(
   Object.entries(translations).map(([key, value]) => [
      key,
      { translation: value },
   ])
) as Resources;

const languageDetector = new LanguageDetector(null, {
   convertDetectedLanguage: (lang: string) =>
      lang.replace("-", "_") as Intl.Locale,
});

await i18next
   .use(languageDetector)
   .use(initReactI18next)
   .init({
      resources,
      fallbackLng: "en_US",
      interpolation: {
         escapeValue: false,
      },
   });
