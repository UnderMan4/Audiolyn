import { cn } from "src/lib/style-utils";

export const SidebarFooter = ({
   className,
   ...props
}: React.ComponentProps<"div">) => {
   return (
      <div
         data-slot="sidebar-footer"
         data-sidebar="footer"
         className={cn("flex flex-col gap-2 p-2", className)}
         {...props}
      />
   );
};
