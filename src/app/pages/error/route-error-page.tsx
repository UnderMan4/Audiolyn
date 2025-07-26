import { ErrorResponse } from "react-router";

import { BetterLink } from "@/components/better-link";
import { Button } from "@/components/ui/button";

export namespace RouteErrorPage {
   export type Props = {
      error: ErrorResponse;
   };
}

export const RouteErrorPage = ({ error }: RouteErrorPage.Props) => {
   const status = error.status;
   return (
      <main>
         <h1>
            {status} - {status === 404 ? "Not Found" : "Error"}
         </h1>
         <p>
            {status === 404
               ? "The page you are looking for does not exist."
               : "An unexpected error occurred."}
         </p>
         <Button asChild size="default">
            <BetterLink to="/">Go to Dashboard</BetterLink>
         </Button>
      </main>
   );
};
