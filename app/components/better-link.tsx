import { useMemo } from "react";
import { Link } from "react-router";
import type { To } from "react-router";

import { SearchParamValue, objectToSearchParams } from "@/lib/url-utils";

export namespace BetterLink {
   export type Props = Omit<
      React.ComponentPropsWithoutRef<typeof Link>,
      "to"
   > & {
      to: To;
   };
   export type To =
      | string
      | {
           pathname: string;
           search?: Record<string, SearchParamValue>;
           hash?: string;
        };
}

export const BetterLink = ({ to, ...props }: BetterLink.Props) => {
   const parsedTo = useMemo<To>(() => {
      if (typeof to === "string") {
         return to;
      }
      const search = objectToSearchParams(to.search || {});
      return {
         pathname: to.pathname,
         search: search,
         hash: to.hash,
      };
   }, [to]);
   return <Link to={parsedTo} {...props} />;
};
