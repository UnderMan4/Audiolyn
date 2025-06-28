import { cn } from "src/lib/style-utils";

export const SidebarGroupContent = ({
   className,
   ...props
}: React.ComponentProps<"div">) => {
   return (
      <div
         data-slot="sidebar-group-content"
         data-sidebar="group-content"
         className={cn("w-full text-sm", className)}
         {...props}
      />
   );
};
