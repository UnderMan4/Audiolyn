import * as LabelPrimitive from "@radix-ui/react-label";
import React from "react";

import { cn } from "@/lib/utils";

export namespace Label {
   export type Props = React.ComponentProps<typeof LabelPrimitive.Root>;
}

export const Label = ({ className, ...props }: Label.Props) => {
   return (
      <LabelPrimitive.Root
         data-slot="label"
         className={cn(
            "flex items-center gap-2 text-sm leading-none font-semibold select-none group-data-[disabled=true]:pointer-events-none group-data-[disabled=true]:opacity-50 peer-disabled:cursor-not-allowed peer-disabled:opacity-50",
            className
         )}
         {...props}
      />
   );
};
