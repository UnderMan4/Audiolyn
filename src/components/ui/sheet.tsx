import * as SheetPrimitive from "@radix-ui/react-dialog";
import { XIcon } from "lucide-react";
import React from "react";
import { cn } from "src/lib/style-utils";

export namespace Sheet {
   export type RootProps = React.ComponentProps<typeof SheetPrimitive.Root>;
   export type TriggerProps = React.ComponentProps<
      typeof SheetPrimitive.Trigger
   >;
   export type CloseProps = React.ComponentProps<typeof SheetPrimitive.Close>;
   export type PortalProps = React.ComponentProps<typeof SheetPrimitive.Portal>;
   export type OverlayProps = React.ComponentProps<
      typeof SheetPrimitive.Overlay
   >;
   export type ContentProps = React.ComponentProps<
      typeof SheetPrimitive.Content
   > & {
      side?: "top" | "right" | "bottom" | "left";
   };
   export type HeaderProps = React.ComponentProps<"div">;
   export type FooterProps = React.ComponentProps<"div">;
   export type TitleProps = React.ComponentProps<typeof SheetPrimitive.Title>;
   export type DescriptionProps = React.ComponentProps<
      typeof SheetPrimitive.Description
   >;
}

export const Sheet = (props: Sheet.RootProps) => (
   <SheetPrimitive.Root data-slot="sheet" {...props} />
);

export const SheetTrigger = (props: Sheet.TriggerProps) => (
   <SheetPrimitive.Trigger data-slot="sheet-trigger" {...props} />
);

export const SheetClose = (props: Sheet.CloseProps) => (
   <SheetPrimitive.Close data-slot="sheet-close" {...props} />
);

export const SheetPortal = (props: Sheet.PortalProps) => (
   <SheetPrimitive.Portal data-slot="sheet-portal" {...props} />
);

export const SheetOverlay = ({ className, ...props }: Sheet.OverlayProps) => (
   <SheetPrimitive.Overlay
      data-slot="sheet-overlay"
      className={cn(
         "data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 fixed inset-0 top-(--titlebar-height) z-50 bg-black/50",
         className
      )}
      {...props}
   />
);

export const SheetContent = ({
   className,
   children,
   side = "right",
   ...props
}: Sheet.ContentProps) => (
   <SheetPortal>
      <SheetOverlay />
      <SheetPrimitive.Content
         data-slot="sheet-content"
         className={cn(
            "bg-background data-[state=open]:animate-in data-[state=closed]:animate-out fixed z-50 flex flex-col gap-4 shadow-lg transition ease-in-out data-[state=closed]:duration-300 data-[state=open]:duration-500",
            side === "right" &&
               "data-[state=closed]:slide-out-to-right data-[state=open]:slide-in-from-right inset-y-0 right-0 h-full w-3/4 border-l sm:max-w-sm",
            side === "left" &&
               "data-[state=closed]:slide-out-to-left data-[state=open]:slide-in-from-left inset-y-0 left-0 h-full w-3/4 border-r sm:max-w-sm",
            side === "top" &&
               "data-[state=closed]:slide-out-to-top data-[state=open]:slide-in-from-top inset-x-0 top-0 h-auto border-b",
            side === "bottom" &&
               "data-[state=closed]:slide-out-to-bottom data-[state=open]:slide-in-from-bottom inset-x-0 bottom-0 h-auto border-t",
            className
         )}
         {...props}
      >
         {children}
         <SheetPrimitive.Close className="ring-offset-background focus:ring-ring data-[state=open]:bg-secondary absolute top-4 right-4 rounded-xs opacity-70 transition-opacity hover:opacity-100 focus:ring-2 focus:ring-offset-2 focus:outline-hidden disabled:pointer-events-none">
            <XIcon className="size-4" />
            <span className="sr-only">Close</span>
         </SheetPrimitive.Close>
      </SheetPrimitive.Content>
   </SheetPortal>
);

export const SheetHeader = ({ className, ...props }: Sheet.HeaderProps) => (
   <div
      data-slot="sheet-header"
      className={cn("flex flex-col gap-1.5 p-4", className)}
      {...props}
   />
);

export const SheetFooter = ({ className, ...props }: Sheet.FooterProps) => (
   <div
      data-slot="sheet-footer"
      className={cn("mt-auto flex flex-col gap-2 p-4", className)}
      {...props}
   />
);

export const SheetTitle = ({ className, ...props }: Sheet.TitleProps) => (
   <SheetPrimitive.Title
      data-slot="sheet-title"
      className={cn("text-foreground font-semibold", className)}
      {...props}
   />
);

export const SheetDescription = ({
   className,
   ...props
}: Sheet.DescriptionProps) => (
   <SheetPrimitive.Description
      data-slot="sheet-description"
      className={cn("text-muted-foreground text-sm", className)}
      {...props}
   />
);
