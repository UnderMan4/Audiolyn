import { AnyObject, ObjectPath, getValueAtPath } from "@/lib/object-path";

import { ToDiscoUnion } from "../types/types";

/* ------------------ FIRST OF TRANSFORMED ------------------ */

export type FirstOfTransformed<
   Source extends AnyObject,
   TargetValue,
   Keys extends readonly ObjectPath<Source>[],
> = {
   fields: Keys;
   fn: (value: unknown) => TargetValue;
};

/* ------------------ FIELD MAP ------------------ */

export type FieldMap<
   Source extends AnyObject,
   Target extends AnyObject,
   K extends keyof Target,
   Keys extends readonly ObjectPath<Source>[] = readonly ObjectPath<Source>[],
> = ToDiscoUnion<{
   from: { field: ObjectPath<Source> };
   firstOf: { fields: readonly ObjectPath<Source>[] };
   transform: { fn: (source: Source) => Target[K] };
   firstOfTransformed: FirstOfTransformed<Source, Target[K], Keys>;
   static: { value: Target[K] };
}>;

/* ------------------ MAP SCHEMA ------------------ */

export type MapSchema<Source extends AnyObject, Target extends AnyObject> = {
   [K in keyof Target]: FieldMap<Source, Target, K>;
};

/* ------------------ RUNTIME MAPPER ------------------ */

export const mapWithSchema = <
   Source extends AnyObject,
   Target extends AnyObject,
>(
   src: Source,
   schema: MapSchema<Source, Target>
): Target => {
   const keys = Object.keys(schema) as (keyof Target)[];

   const result = keys.reduce((acc, key) => {
      const rule = schema[key];

      switch (rule.type) {
         case "from": {
            acc[key] = getValueAtPath(src, rule.field) as Target[typeof key];
            break;
         }

         case "firstOf": {
            const value = rule.fields
               .map((path) => getValueAtPath(src, path))
               .find((v) => v !== undefined && v !== null);

            acc[key] = value as Target[typeof key];
            break;
         }

         case "transform": {
            acc[key] = rule.fn(src);
            break;
         }

         case "firstOfTransformed": {
            const value = rule.fields
               .map((path) => getValueAtPath(src, path))
               .find((v) => v !== undefined && v !== null);

            acc[key] = rule.fn(value);
            break;
         }

         case "static": {
            acc[key] = rule.value;
            break;
         }
      }

      return acc;
   }, {} as Target);

   return result;
};
