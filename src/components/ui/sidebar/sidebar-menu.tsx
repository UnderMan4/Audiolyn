import { cn } from "src/lib/style-utils";

export const SidebarMenu = ({
   className,
   ...props
}: React.ComponentProps<"ul">) => {
   return (
      <ul
         data-slot="sidebar-menu"
         data-sidebar="menu"
         className={cn("flex w-full min-w-0 flex-col gap-1", className)}
         {...props}
      />
   );
};
