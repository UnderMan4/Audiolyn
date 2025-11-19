import langs from "langs";

export const pascalToSnake = (str: string): string =>
   str
      .replace(/([A-Z])/g, "_$1")
      .replace(/^_/, "")
      .toLowerCase();

export const stringConcat = (
   strings: (string | undefined)[],
   delimiter: string = ""
): string => strings.filter((s) => s && s.trim().length > 0).join(delimiter);

export const normalizeToLanguageCode = (
   lang: string | undefined
): string | undefined => {
   if (!lang) return undefined;

   const cleaned = lang.trim();

   // 1) Name in English
   const byName = langs.where("name", cleaned);
   if (byName && typeof byName["1"] === "string") {
      return byName["1"];
   }

   // 2) Name in local language (e.g., "polski" → "pl")
   const byLocalName = langs.where("local", cleaned);
   if (byLocalName && typeof byLocalName["1"] === "string") {
      return byLocalName["1"];
   }

   const lower = cleaned.toLowerCase();

   // 3) ISO 639-1 (2-letter)
   const byIso1 = langs.where("1", lower);
   if (byIso1) {
      return byIso1["1"];
   }

   // 4) ISO 639-2/B & 639-2/T (3-letter)
   const byIso2 = langs.where("2", lower);
   if (byIso2) {
      return byIso2["1"];
   }

   // 5) ISO 639-3 (3-letter)
   const byIso3 = langs.where("3", lower);
   if (byIso3) {
      return byIso3["1"];
   }

   return undefined;
};
