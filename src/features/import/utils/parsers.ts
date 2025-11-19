import { parseName } from "humanparser";
import { numberifyText } from "numberify-text";

import { romanPattern, romanToNumber } from "@/lib/number-utils";
import { stringConcat } from "@/lib/string-utils";

import { ImportMetadata } from "../types/metadata";

const extractNumberFromMixed = (text: string): number | undefined => {
   // a) pure integer
   const direct = Number.parseInt(text, 10);
   if (Number.isFinite(direct)) return direct;

   // b) integer/total variants (e.g. "3/7", "Book 3/7")
   {
      const m = /(\d+)\s*\/\s*\d+/.exec(text);
      if (m?.[1]) {
         const n = Number.parseInt(m[1], 10);
         if (Number.isFinite(n)) return n;
      }
   }

   // c) decimal variants (e.g. "3.5")
   {
      const m = /(\d+\.\d+)/.exec(text);
      if (m?.[1]) {
         const n = Number.parseFloat(m[1]);
         if (Number.isFinite(n)) return n;
      }
   }

   // d) roman numerals
   {
      const m = romanPattern.exec(text);
      if (m?.[0]) return romanToNumber(m[0]);
   }

   // e) fallback: raw digits
   {
      const m = /\d+/.exec(text);
      if (m?.[0]) {
         const n = Number.parseInt(m[0], 10);
         if (Number.isFinite(n)) return n;
      }
   }

   return undefined;
};

/**
 * Parse a series index/part number from loosely-formatted text.
 *
 * This function attempts to extract a meaningful **numeric series number** from
 * very messy, real-world metadata found in audiobook files. It supports:
 *
 * **1) Direct numeric values**
 * - `"3"` → `3`
 * - `"12"` → `12`
 *
 * **2) Mixed strings containing numbers**
 * - `"Book 4"` → `4`
 * - `"Part 7 of 10"` → `7`
 *
 * **3) Fraction-like formats (the first part is returned)**
 * - `"3/7"` → `3`
 * - `"Volume 2/12"` → `2`
 *
 * **4) Decimal numbers**
 * - `"3.5"` → `3.5`
 * - `"Edition 2.75"` → `2.75`
 *
 * **5) Roman numerals (case-insensitive)**
 * - `"Part IV"` → `4`
 * - `"volume xii"` → `12`
 *
 * **6) Embedded digits anywhere in the string**
 * - `"Book No. 08 — Special Edition"` → `8`
 *
 * **7) Written number words**
 * Using `numberify-text` in English mode:
 * - `"part two"` → `2`
 * - `"Volume Fifteen"` → `15`
 *
 *
 * ---
 *
 * ### Return value
 * - A **number** representing the extracted/parsed series index.
 * - `undefined` if no meaningful number can be extracted.
 *
 * ---
 *
 * ### Examples
 *
 * ```ts
 * parseSeriesNumber("3");                     // → 3
 * parseSeriesNumber("Book 4");                // → 4
 * parseSeriesNumber("3/7");                   // → 3
 * parseSeriesNumber("Part IV");               // → 4
 * parseSeriesNumber("volume xii");            // → 12
 * parseSeriesNumber("Edition 2.75");          // → 2.75
 * parseSeriesNumber("Book No. 08");           // → 8
 * parseSeriesNumber("part two");              // → 2
 * parseSeriesNumber("the second volume");     // → 2
 * parseSeriesNumber("saga book seven");       // → 7
 * parseSeriesNumber(undefined);               // → undefined
 * parseSeriesNumber("no number here");        // → undefined
 * ```
 *
 * ---
 *
 * @param raw - The raw series metadata as read from tags or file names.
 *              Can be a number directly, or any string containing
 *              a number, Roman numeral, or written number.
 *
 * @returns The parsed numeric series part, or `undefined` if not found.
 */
export const parseSeriesNumber = (
   raw: string | number | undefined
): number | undefined => {
   if (typeof raw === "number") return raw;
   if (!raw) return undefined;

   const text = raw.trim();

   const numberified = numberifyText(text, "en");

   return extractNumberFromMixed(numberified);
};

export const parsePersonName = (name: string): ImportMetadata.Person => {
   const { firstName, lastName, middleName } = parseName(name);
   const givenName = stringConcat([firstName, middleName], " ");
   const familyName = lastName;
   const sortName = stringConcat([familyName, givenName], ", ");
   return { givenName, familyName, sortName };
};
