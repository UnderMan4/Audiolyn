import { cn } from "src/lib/style-utils";

export const SidebarContent = ({
   className,
   ...props
}: React.ComponentProps<"div">) => {
   return (
      <div
         data-slot="sidebar-content"
         data-sidebar="content"
         className={cn(
            "flex min-h-0 flex-1 flex-col gap-2 overflow-auto group-data-[collapsible=icon]:overflow-hidden",
            className
         )}
         {...props}
      />
   );
};
