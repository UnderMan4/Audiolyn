import { cn } from "src/lib/style-utils";

export const SidebarMenuSubItem = ({
   className,
   ...props
}: React.ComponentProps<"li">) => {
   return (
      <li
         data-slot="sidebar-menu-sub-item"
         data-sidebar="menu-sub-item"
         className={cn("group/menu-sub-item relative", className)}
         {...props}
      />
   );
};
