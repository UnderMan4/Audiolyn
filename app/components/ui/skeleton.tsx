import React from "react";

import { cn } from "@/lib/style-utils";

export namespace Skeleton {
   export type Props = React.ComponentProps<"div">;
}

export const Skeleton = ({ className, ...props }: Skeleton.Props) => {
   return (
      <div
         data-slot="skeleton"
         className={cn("bg-accent animate-pulse rounded-md", className)}
         {...props}
      />
   );
};
