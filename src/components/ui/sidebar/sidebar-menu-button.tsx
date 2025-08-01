import { Slot } from "@radix-ui/react-slot";
import { VariantProps, cva } from "class-variance-authority";
import { cn } from "src/lib/style-utils";

import { Tooltip, TooltipContent, TooltipTrigger } from "../tooltip";
import { useSidebarContext } from "./sidebar-provider";

export const sidebarMenuButtonVariants = cva(
   "peer/menu-button flex w-full items-center gap-2 overflow-hidden rounded-md p-2 text-left text-sm outline-hidden ring-sidebar-ring transition-[width,height,padding] hover:bg-sidebar-accent hover:text-sidebar-accent-foreground focus-visible:ring-2 active:bg-sidebar-accent active:text-sidebar-accent-foreground disabled:pointer-events-none disabled:opacity-50 group-has-data-[sidebar=menu-action]/menu-item:pr-8 aria-disabled:pointer-events-none aria-disabled:opacity-50 data-[active=true]:bg-sidebar-accent data-[active=true]:font-medium data-[active=true]:text-sidebar-accent-foreground data-[state=open]:hover:bg-sidebar-accent data-[state=open]:hover:text-sidebar-accent-foreground group-data-[collapsible=icon]:size-8! group-data-[collapsible=icon]:p-2! [&>span:last-child]:truncate [&>svg]:size-4 [&>svg]:shrink-0",
   {
      variants: {
         variant: {
            default:
               "hover:bg-sidebar-accent hover:text-sidebar-accent-foreground",
            outline:
               "bg-background shadow-[0_0_0_1px_hsl(var(--sidebar-border))] hover:bg-sidebar-accent hover:text-sidebar-accent-foreground hover:shadow-[0_0_0_1px_hsl(var(--sidebar-accent))]",
         },
         size: {
            default: "h-8 text-sm",
            sm: "h-7 text-xs",
            lg: "h-12 text-md group-data-[collapsible=icon]:p-0!",
         },
      },
      defaultVariants: {
         variant: "default",
         size: "default",
      },
   }
);

export const SidebarMenuButton = ({
   asChild = false,
   isActive = false,
   variant = "default",
   size = "default",
   tooltip,
   className,
   ...props
}: React.ComponentProps<"button"> & {
   asChild?: boolean;
   isActive?: boolean;
   tooltip?: string | React.ComponentProps<typeof TooltipContent>;
} & VariantProps<typeof sidebarMenuButtonVariants>) => {
   const Comp = asChild ? Slot : "button";
   const { isMobile, state } = useSidebarContext();

   const button = (
      <Comp
         data-slot="sidebar-menu-button"
         data-sidebar="menu-button"
         data-size={size}
         data-active={isActive}
         className={cn(sidebarMenuButtonVariants({ variant, size }), className)}
         {...props}
      />
   );

   if (!tooltip) {
      return button;
   }

   if (typeof tooltip === "string") {
      tooltip = {
         children: tooltip,
      };
   }

   return (
      <Tooltip>
         <TooltipTrigger asChild>{button}</TooltipTrigger>
         <TooltipContent
            side="right"
            align="center"
            hidden={state !== "collapsed" || isMobile}
            {...tooltip}
         />
      </Tooltip>
   );
};
