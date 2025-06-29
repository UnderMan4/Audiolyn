import { cn } from "src/lib/style-utils";

export const SidebarHeader = ({
   className,
   ...props
}: React.ComponentProps<"div">) => {
   return (
      <div
         data-slot="sidebar-header"
         data-sidebar="header"
         className={cn("flex flex-col gap-2 p-2", className)}
         {...props}
      />
   );
};
