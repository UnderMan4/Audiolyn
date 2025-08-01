import { cn } from "src/lib/style-utils";

export const SidebarMenuItem = ({
   className,
   ...props
}: React.ComponentProps<"li">) => {
   return (
      <li
         data-slot="sidebar-menu-item"
         data-sidebar="menu-item"
         className={cn("group/menu-item relative", className)}
         {...props}
      />
   );
};
