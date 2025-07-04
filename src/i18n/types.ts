import { translations } from "./i18n";

type DotNestedKeysLevel<T, L extends number> = [L] extends [0]
   ? never
   : {
        [K in keyof T & (string | number)]: T[K] extends Record<string, unknown>
           ? T[K] extends () => unknown
              ? never
              : DotNestedKeysLevel<T[K], Prev[L]> extends never
                ? K // Only include if the next level has no keys (leaf)
                : `${K & string}.${DotNestedKeysLevel<T[K], Prev[L]>}`
           : K;
     }[keyof T & (string | number)];

type Prev = [never, 0, 1, 2, 3, 4, 5];

export type DotNestedKeys<T> = DotNestedKeysLevel<T, 5>;

export namespace Intl {
   export type Locale = keyof typeof translations;
   export type Language = (typeof translations)["en_US"];
   export type Key = DotNestedKeys<Language>;
}
