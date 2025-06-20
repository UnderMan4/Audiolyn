import { cn } from "@/lib/style-utils";

export const SidebarInset = ({
   className,
   children,
   ...props
}: React.ComponentProps<"main">) => {
   return (
      <main
         data-slot="sidebar-inset"
         className={cn(
            // Layout
            "relative flex w-full flex-1 flex-col h-full overflow-hidden min-h-0",
            // Background
            "bg-background",
            // Responsive/peer variant styles
            "md:peer-data-[variant=inset]:m-2",
            "md:peer-data-[variant=inset]:ml-0",
            "md:peer-data-[variant=inset]:rounded-xl",
            "md:peer-data-[variant=inset]:shadow-sm",
            "md:peer-data-[variant=inset]:peer-data-[state=collapsed]:ml-2",
            // Custom className
            className
         )}
         {...props}
      >
         {children}
      </main>
   );
};
