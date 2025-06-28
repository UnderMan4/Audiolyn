import { PanelLeftIcon } from "lucide-react";
import { cn } from "src/lib/style-utils";

import { Button } from "../button";
import { useSidebarContext } from "./sidebar-provider";

export const SidebarTrigger = ({
   className,
   onClick,
   ...props
}: React.ComponentProps<typeof Button>) => {
   const { toggleSidebar } = useSidebarContext();

   return (
      <Button
         data-sidebar="trigger"
         data-slot="sidebar-trigger"
         variant="ghost"
         size="icon"
         className={cn("size-7", className)}
         onClick={(event) => {
            onClick?.(event);
            toggleSidebar();
         }}
         {...props}
      >
         <PanelLeftIcon />
         <span className="sr-only">Toggle Sidebar</span>
      </Button>
   );
};
