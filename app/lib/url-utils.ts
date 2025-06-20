import { format, parse } from "date-fns";

export type SearchParamValue =
   | string
   | number
   | boolean
   | Date
   | null
   | undefined;

export const objectToSearchParams = (
   obj?: Record<string, SearchParamValue>
): string => {
   if (!obj || Object.keys(obj).length === 0) return "";

   const searchParams = new URLSearchParams();

   for (const [key, value] of Object.entries(obj)) {
      if (value !== null && value !== undefined) {
         if (value instanceof Date) {
            searchParams.append(key, format(value, "yyyy-MM-dd"));
         } else {
            searchParams.append(key, String(value));
         }
      }
   }
   if (searchParams.size === 0) return "";

   return `?${searchParams.toString()}`;
};

export const searchParamsToObject = (
   search?: string
): Record<string, SearchParamValue> => {
   if (!search || search === "?") return {};

   const searchParams = new URLSearchParams(search);
   const obj: Record<string, SearchParamValue> = {};

   for (const [key, value] of searchParams.entries()) {
      let parsed: SearchParamValue = value;
      if (value === "null") {
         parsed = null;
      } else if (value === "true") {
         parsed = true;
      } else if (value === "false") {
         parsed = false;
      } else if (!isNaN(Number(value)) && value.trim() !== "") {
         parsed = Number(value);
      } else if (/^\d{4}-\d{2}-\d{2}$/.test(value)) {
         parsed = parse(value, "yyyy-MM-dd", new Date());
      }
      obj[key] = parsed;
   }

   return obj;
};
