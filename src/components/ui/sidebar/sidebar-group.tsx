import { cn } from "src/lib/style-utils";

export const SidebarGroup = ({
   className,
   ...props
}: React.ComponentProps<"div">) => {
   return (
      <div
         data-slot="sidebar-group"
         data-sidebar="group"
         className={cn("relative flex w-full min-w-0 flex-col p-2", className)}
         {...props}
      />
   );
};
