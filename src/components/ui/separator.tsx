import * as SeparatorPrimitive from "@radix-ui/react-separator";
import React from "react";
import { cn } from "src/lib/style-utils";

export namespace Separator {
   export type Props = React.ComponentProps<typeof SeparatorPrimitive.Root>;
}

export const Separator = ({
   className,
   orientation = "horizontal",
   decorative = true,
   ...props
}: Separator.Props) => {
   return (
      <SeparatorPrimitive.Root
         data-slot="separator"
         decorative={decorative}
         orientation={orientation}
         className={cn(
            "bg-border shrink-0 data-[orientation=horizontal]:h-px data-[orientation=horizontal]:w-full data-[orientation=vertical]:h-full data-[orientation=vertical]:w-px",
            className
         )}
         {...props}
      />
   );
};
