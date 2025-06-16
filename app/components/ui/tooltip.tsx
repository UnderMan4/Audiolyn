import * as TooltipPrimitive from "@radix-ui/react-tooltip";
import React from "react";

import { cn } from "@/lib/utils";

export namespace Tooltip {
   export type ProviderProps = React.ComponentProps<
      typeof TooltipPrimitive.Provider
   >;
   export type RootProps = React.ComponentProps<typeof TooltipPrimitive.Root>;
   export type TriggerProps = React.ComponentProps<
      typeof TooltipPrimitive.Trigger
   >;
   export type ContentProps = React.ComponentProps<
      typeof TooltipPrimitive.Content
   > & { sideOffset?: number };
}

export const TooltipProvider = ({
   delayDuration = 0,
   ...props
}: Tooltip.ProviderProps) => (
   <TooltipPrimitive.Provider
      data-slot="tooltip-provider"
      delayDuration={delayDuration}
      {...props}
   />
);

export const Tooltip = ({ ...props }: Tooltip.RootProps) => (
   <TooltipProvider>
      <TooltipPrimitive.Root data-slot="tooltip" {...props} />
   </TooltipProvider>
);

export const TooltipTrigger = ({ ...props }: Tooltip.TriggerProps) => (
   <TooltipPrimitive.Trigger data-slot="tooltip-trigger" {...props} />
);

export const TooltipContent = ({
   className,
   sideOffset = 0,
   children,
   ...props
}: Tooltip.ContentProps) => (
   <TooltipPrimitive.Portal>
      <TooltipPrimitive.Content
         data-slot="tooltip-content"
         sideOffset={sideOffset}
         className={cn(
            "bg-primary text-primary-foreground animate-in fade-in-0 zoom-in-95 data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 z-50 w-fit origin-(--radix-tooltip-content-transform-origin) rounded-md px-3 py-1.5 text-xs text-balance",
            className
         )}
         {...props}
      >
         {children}
         <TooltipPrimitive.Arrow className="bg-primary fill-primary z-50 size-2.5 translate-y-[calc(-50%_-_2px)] rotate-45 rounded-[2px]" />
      </TooltipPrimitive.Content>
   </TooltipPrimitive.Portal>
);
