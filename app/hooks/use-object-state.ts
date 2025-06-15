import { useState } from "react";

/**
 * Setter function for useObjectState.
 * - If `replace` is true, replaces the state with a new object or updater.
 * - If `replace` is false or omitted, merges a partial object or updater result into the state.
 */
export type ObjectStateSetter<T extends Record<string, any>> = {
   (value: Partial<T> | ((prev: T) => Partial<T>), replace?: false): void;
   (value: T | ((prev: T) => T), replace: true): void;
};

/**
 * Return type for useObjectState hook.
 * Tuple: [state, setter]
 */
export type UseObjectStateReturn<T extends Record<string, any>> = [
   T,
   ObjectStateSetter<T>,
];

/**
 * React hook for managing object-like state with partial updates.
 *
 * @template T - The object type of the state.
 * @param {T} initialState - The initial state object.
 * @returns {UseObjectStateReturn<T>} Tuple with the current state and a setter function.
 *
 * The setter merges partial updates by default. Pass `replace = true` to replace the state.
 * The setter accepts a partial object or an updater function.
 */
export function useObjectState<T extends Record<string, any>>(
   initialState: T
): UseObjectStateReturn<T> {
   const [state, setState] = useState<T>(initialState);

   const setObjectState: ObjectStateSetter<T> = (
      value: any,
      replace: boolean = false
   ) => {
      setState((prev) => {
         if (replace) {
            if (typeof value === "function") {
               return (value as (prev: T) => T)(prev);
            }
            return value as T;
         }
         const next =
            typeof value === "function"
               ? (value as (prev: T) => Partial<T>)(prev)
               : (value as Partial<T>);
         return { ...prev, ...next };
      });
   };

   return [state, setObjectState];
}
