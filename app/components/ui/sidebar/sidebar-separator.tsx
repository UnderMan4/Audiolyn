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
         className={cn(
            "bg-sidebar-foreground/20 mx-2 w-[calc(100%-calc(var(--spacing)*4))]!",
            className
         )}
         {...props}
      />
   );
};
