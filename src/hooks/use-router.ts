import qs from "qs";
import { useCallback, useMemo } from "react";
import {
   Location,
   NavigateOptions as NavigateOptionsRaw,
   useLocation,
   useNavigate,
} from "react-router";
import { BetterLink } from "src/components/better-link";

export namespace UseRouter {
   export type ReturnType<T extends object> = Omit<
      Location,
      "state" | "search"
   > & {
      search: T;
      navigate: NavigateFunction<T>;
   };

   export type NavigateFunction<T extends object> = (
      to: BetterLink.To,
      options?: NavigateOptions<T>
   ) => Promise<void> | void;

   export type NavigateOptions<T extends object> = Omit<
      NavigateOptionsRaw,
      "state" | "search"
   > & {
      search?: T;
   };
}

export const useRouter = <T extends object>(): UseRouter.ReturnType<T> => {
   const { search, ...rest } = useLocation();
   const navigateRaw = useNavigate();
   const navigate = useCallback(
      (to: BetterLink.To, options?: UseRouter.NavigateOptions<T>) => {
         if (typeof to === "string") return navigateRaw(to, options);

         const { search, ...newTo } = to;
         return navigateRaw(
            {
               search: qs.stringify(search),
               ...newTo,
            },
            options
         );
      },
      [navigateRaw]
   );

   const searchParams = useMemo(
      () =>
         qs.parse(search, {
            ignoreQueryPrefix: true,
            decoder: (str, defaultDecoder, charset, type) => {
               if (type === "key") {
                  return defaultDecoder(str, charset);
               }
               const value = defaultDecoder(str, charset);

               if (value === "true") return true;
               if (value === "false") return false;
               if (value === "null") return null;
               if (value === "undefined") return undefined;
               if (/^\d+$/.test(value)) return parseInt(value, 10);
               if (/^\d+\.\d+$/.test(value)) return parseFloat(value);
               if (/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}.\d{3}Z$/.test(value))
                  return new Date(value);

               return value;
            },
         }),
      [search]
   );

   return {
      navigate,
      search: searchParams as T,
      ...rest,
   };
};
