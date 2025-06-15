import i18next from "i18next";
import LanguageDetector from "i18next-browser-languagedetector";
import { initReactI18next } from "react-i18next";

import en from "./locales/en";
import pl_PL from "./locales/pl_PL";

export const languages = {
   en,
   pl_PL,
} as const;
export type Language = keyof typeof languages;

type Resources = {
   [K in keyof typeof languages]: { translation: (typeof languages)[K] };
};
const resources: Resources = Object.fromEntries(
   Object.entries(languages).map(([key, value]) => [
      key,
      { translation: value },
   ])
) as Resources;

i18next
   .use(LanguageDetector)
   .use(initReactI18next)
   .init({
      resources,
      fallbackLng: "en",
      interpolation: {
         escapeValue: false,
      },
      debug: process.env.NODE_ENV === "development",
   });
