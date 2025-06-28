import { cn } from "src/lib/style-utils";

import { Input } from "../input";

export const SidebarInput = ({
   className,
   ...props
}: React.ComponentProps<typeof Input>) => {
   return (
      <Input
         data-slot="sidebar-input"
         data-sidebar="input"
         className={cn("bg-background h-8 w-full shadow-none", className)}
         {...props}
      />
   );
};
