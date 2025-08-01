import * as React from "react";
import {
   Sheet,
   SheetContent,
   SheetDescription,
   SheetHeader,
   SheetTitle,
} from "src/components/ui/sheet";
import { cn } from "src/lib/style-utils";

import { useSidebarContext } from "./sidebar-provider";

export const SIDEBAR_COOKIE_NAME = "sidebar_state";
export const SIDEBAR_COOKIE_MAX_AGE = 60 * 60 * 24 * 7; // 7 days
export const SIDEBAR_WIDTH = "16rem";
export const SIDEBAR_WIDTH_MOBILE = "18rem";
export const SIDEBAR_WIDTH_ICON = "3rem";
export const SIDEBAR_KEYBOARD_SHORTCUT = "b";

export const Sidebar = ({
   side = "left",
   variant = "sidebar",
   collapsible = "offcanvas",
   className,
   children,
   ...props
}: React.ComponentProps<"div"> & {
   side?: "left" | "right";
   variant?: "sidebar" | "floating" | "inset";
   collapsible?: "offcanvas" | "icon" | "none";
}) => {
   const { isMobile, state, openMobile, setOpenMobile } = useSidebarContext();

   if (collapsible === "none") {
      return (
         <div
            data-slot="sidebar"
            className={cn(
               "bg-sidebar text-sidebar-foreground flex h-full w-(--sidebar-width) flex-col sidebar",
               className
            )}
            {...props}
         >
            {children}
         </div>
      );
   }

   if (isMobile) {
      return (
         <Sheet open={openMobile} onOpenChange={setOpenMobile} {...props}>
            <SheetContent
               data-sidebar="sidebar"
               data-slot="sidebar"
               data-mobile="true"
               className="bg-sidebar text-sidebar-foreground w-(--sidebar-width) p-0 [&>button]:hidden sidebar mt-(--titlebar-height) "
               style={
                  {
                     "--sidebar-width": SIDEBAR_WIDTH_MOBILE,
                  } as React.CSSProperties
               }
               side={side}
            >
               <SheetHeader className="sr-only">
                  <SheetTitle>Sidebar</SheetTitle>
                  <SheetDescription>
                     Displays the mobile sidebar.
                  </SheetDescription>
               </SheetHeader>
               <div className="flex h-full w-full flex-col">{children}</div>
            </SheetContent>
         </Sheet>
      );
   }

   return (
      <div
         className="group peer text-sidebar-foreground hidden md:block"
         data-state={state}
         data-collapsible={state === "collapsed" ? collapsible : ""}
         data-variant={variant}
         data-side={side}
         data-slot="sidebar"
      >
         {/* This is what handles the sidebar gap on desktop */}
         <div
            data-slot="sidebar-gap"
            className={cn(
               "relative w-(--sidebar-width) bg-transparent transition-[width] duration-200 ease-linear",
               "group-data-[collapsible=offcanvas]:w-0",
               "group-data-[side=right]:rotate-180",
               variant === "floating" || variant === "inset"
                  ? "group-data-[collapsible=icon]:w-[calc(var(--sidebar-width-icon)+(--spacing(4)))]"
                  : "group-data-[collapsible=icon]:w-(--sidebar-width-icon)"
            )}
         />
         <div
            data-slot="sidebar-container"
            className={cn(
               "fixed inset-y-0 z-10 hidden w-(--sidebar-width) transition-[left,right,width] duration-200 ease-linear md:flex mt-(--titlebar-height) sidebar",
               side === "left"
                  ? "left-0 group-data-[collapsible=offcanvas]:left-[calc(var(--sidebar-width)*-1)]"
                  : "right-0 group-data-[collapsible=offcanvas]:right-[calc(var(--sidebar-width)*-1)]",
               // Adjust the padding for floating and inset variants.
               variant === "floating" || variant === "inset"
                  ? "p-2 pr-[4px] group-data-[collapsible=icon]:w-[calc(var(--sidebar-width-icon)+(--spacing(4))+2px)]"
                  : "group-data-[collapsible=icon]:w-(--sidebar-width-icon) group-data-[side=left]:border-r group-data-[side=right]:border-l",
               className
            )}
            {...props}
         >
            <div
               data-sidebar="sidebar"
               data-slot="sidebar-inner"
               className="bg-sidebar group-data-[variant=floating]:border-sidebar-border flex h-full w-full flex-col group-data-[variant=floating]:rounded-lg group-data-[variant=floating]:border group-data-[variant=floating]:shadow-sm"
            >
               {children}
            </div>
         </div>
      </div>
   );
};
