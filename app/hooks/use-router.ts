import {
   Location,
   NavigateFunction,
   NavigateOptions as NavigateOptionsRaw,
   To,
   useLocation,
   useNavigate,
} from "react-router";

import { BetterLink } from "@/components/better-link";
import {
   SearchParamValue,
   objectToSearchParams,
   searchParamsToObject,
} from "@/lib/url-utils";

export namespace UseRouter {
   export type ReturnType<T extends {}> = Omit<Location, "state" | "search"> & {
      state: T | undefined;
      search: Record<string, SearchParamValue>;
      navigate: NavigateFunction<T>;
   };

   export type NavigateFunction<T extends {}> = (
      to: BetterLink.To,
      options?: NavigateOptions<T>
   ) => Promise<void> | void;

   export type NavigateOptions<T extends {}> = Omit<
      NavigateOptionsRaw,
      "state" | "search"
   > & {
      state?: T;
      search?: Record<string, SearchParamValue>;
   };
}

export const useRouter = <T extends object>(): UseRouter.ReturnType<T> => {
   const { state, search, ...rest } = useLocation();
   const navigateRaw = useNavigate();

   const navigate = (
      to: BetterLink.To,
      options?: UseRouter.NavigateOptions<T>
   ) => {
      if (typeof to === "string") return navigateRaw(to, options);

      const { search, ...newTo } = to;
      return navigateRaw(
         {
            search: objectToSearchParams(search),
            ...newTo,
         },
         options
      );
   };

   const searchParams = searchParamsToObject(search);

   return {
      state,
      navigate,
      search: searchParams,
      ...rest,
   };
};
