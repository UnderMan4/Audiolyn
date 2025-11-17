// prettier-ignore
type DecrementDepth<N extends number> = [
   -1,0,1,2,3,4,5,6,7,8,9,10,11,
   12,13,14,15,16,17,18,19,20,21,
   22,23,24,25,26,27,28,29,30,31,
   32,33,34,35,36,37,38,39,40,41,
   42,43,44,45,46,47,48,49,50,51
][N];

/* ------------------ PUBLIC TYPES ------------------ */

export type AnyObject = Record<string, unknown>;

/**
 * All valid nested dot-paths inside an object.
 * Example: "a", "a.b", "a.b.c"
 */
export type ObjectPath<T, Depth extends number = 200> = Depth extends 0
   ? never
   : T extends AnyObject
     ? {
          [K in keyof T & string]:
             | K
             | (NonNullable<T[K]> extends AnyObject
                  ? `${K}.${ObjectPath<
                       NonNullable<T[K]>,
                       DecrementDepth<Depth>
                    >}`
                  : never);
       }[keyof T & string]
     : never;

/** Converts "a.b.c" → ["a","b","c"] */
export type PathSegments<P extends string> = P extends `${infer A}.${infer B}`
   ? [A, ...PathSegments<B>]
   : [P];

/**
 * Resolves the type found at a nested path inside an object.
 * Example: ValueAtPath<{a:{b:number}}, ["a","b"]> → number
 */
export type ValueAtPath<
   Obj,
   Segments extends readonly string[],
> = Segments extends [
   infer Head extends keyof Obj & string,
   ...infer Tail extends string[],
]
   ? Tail extends []
      ? Obj[Head]
      : Obj[Head] extends AnyObject
        ? ValueAtPath<Obj[Head], Tail>
        : never
   : never;

export type ValuesAtPaths<Obj, Keys extends readonly ObjectPath<Obj>[]> = {
   [P in Keys[number]]: ValueAtPath<Obj, PathSegments<P>>;
}[Keys[number]];

/* ------------------ RUNTIME UTIL ------------------ */

/**
 * Safely retrieves a nested value at a dot-path.
 */
export const getValueAtPath = <T extends AnyObject, P extends ObjectPath<T>>(
   obj: T,
   path: P
): ValueAtPath<T, PathSegments<P>> | undefined => {
   const parts = path.split(".") as PathSegments<P>;
   let current: unknown = obj;

   for (const p of parts) {
      if (
         current === null ||
         current === undefined ||
         typeof current !== "object" ||
         !(p in current)
      )
         return undefined;

      current = (current as Record<string, unknown>)[p];
   }

   return current as ValueAtPath<T, PathSegments<P>>;
};
