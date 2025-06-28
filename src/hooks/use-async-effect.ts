/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useLayoutEffect, useRef } from "react";

/**
 * useAsyncEffect allows you to use an async function in place of a normal useEffect effect.
 * The async function can return a cleanup function (sync or async).
 *
 * @param effect - The async effect function to run
 * @param deps - Dependency array
 */
export function useAsyncEffect(
   effect: () => Promise<void | (() => void | Promise<void>)>,
   deps?: React.DependencyList
) {
   const cleanupRef = useRef<null | (() => void | Promise<void>)>(null);

   useEffect(() => {
      let isActive = true;

      (async () => {
         if (cleanupRef.current) {
            await cleanupRef.current();
         }
         const cleanup = await effect();
         if (isActive) {
            cleanupRef.current = cleanup ?? null;
         }
      })();

      return () => {
         isActive = false;
         if (cleanupRef.current) {
            cleanupRef.current();
            cleanupRef.current = null;
         }
      };
   }, deps);
}

/**
 * useLayoutAsyncEffect allows you to use an async function in place of a normal useLayoutEffect effect.
 * The async function can return a cleanup function (sync or async).
 *
 * @param effect - The async effect function to run
 * @param deps - Dependency array
 */
export function useLayoutAsyncEffect(
   effect: () => Promise<void | (() => void | Promise<void>)>,
   deps?: React.DependencyList
) {
   const cleanupRef = useRef<null | (() => void | Promise<void>)>(null);

   useLayoutEffect(() => {
      let isActive = true;

      (async () => {
         if (cleanupRef.current) {
            await cleanupRef.current();
         }
         const cleanup = await effect();
         if (isActive) {
            cleanupRef.current = cleanup ?? null;
         }
      })();

      return () => {
         isActive = false;
         if (cleanupRef.current) {
            cleanupRef.current();
            cleanupRef.current = null;
         }
      };
   }, deps);
}
