import { cn } from "@/lib/utils";

import { Separator } from "../separator";

export const SidebarSeparator = ({
   className,
   ...props
}: React.ComponentProps<typeof Separator>) => {
   return (
      <Separator
         data-slot="sidebar-separator"
         data-sidebar="separator"
         className={cn("bg-sidebar-border mx-2 w-auto", className)}
         {...props}
      />
   );
};
