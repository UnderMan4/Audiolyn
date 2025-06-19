import * as LabelPrimitive from "@radix-ui/react-label";
import React from "react";

import { cn } from "@/lib/utils";

import { Typography } from "./typography";

export namespace Label {
   export type Props = React.ComponentProps<typeof LabelPrimitive.Root>;
}

export const Label = ({ className, ...props }: Label.Props) => {
   return (
      <Typography
         data-slot="label"
         className={cn(
            "flex items-center gap-2 group-data-[disabled=true]:pointer-events-none group-data-[disabled=true]:opacity-50 peer-disabled:cursor-not-allowed peer-disabled:opacity-50",
            className
         )}
         variant="label"
         {...props}
      />
   );
};
