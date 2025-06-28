import * as DialogPrimitive from "@radix-ui/react-dialog";
import { XIcon } from "lucide-react";
import React from "react";
import { cn } from "src/lib/style-utils";

export namespace Dialog {
   export type RootProps = React.ComponentProps<typeof DialogPrimitive.Root>;
   export type TriggerProps = React.ComponentProps<
      typeof DialogPrimitive.Trigger
   >;
   export type PortalProps = React.ComponentProps<
      typeof DialogPrimitive.Portal
   >;
   export type CloseProps = React.ComponentProps<typeof DialogPrimitive.Close>;
   export type OverlayProps = React.ComponentProps<
      typeof DialogPrimitive.Overlay
   >;
   export type ContentProps = React.ComponentProps<
      typeof DialogPrimitive.Content
   > & {
      showCloseButton?: boolean;
   };
   export type HeaderProps = React.ComponentProps<"div">;
   export type FooterProps = React.ComponentProps<"div">;
   export type TitleProps = React.ComponentProps<typeof DialogPrimitive.Title>;
   export type DescriptionProps = React.ComponentProps<
      typeof DialogPrimitive.Description
   >;
}

export const Dialog = ({ ...props }: Dialog.RootProps) => {
   return <DialogPrimitive.Root data-slot="dialog" {...props} />;
};

export const DialogTrigger = ({ ...props }: Dialog.TriggerProps) => (
   <DialogPrimitive.Trigger data-slot="dialog-trigger" {...props} />
);

export const DialogPortal = ({ ...props }: Dialog.PortalProps) => (
   <DialogPrimitive.Portal data-slot="dialog-portal" {...props} />
);

export const DialogClose = ({ ...props }: Dialog.CloseProps) => (
   <DialogPrimitive.Close data-slot="dialog-close" {...props} />
);

export const DialogOverlay = ({ className, ...props }: Dialog.OverlayProps) => (
   <DialogPrimitive.Overlay
      data-slot="dialog-overlay"
      className={cn(
         "data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 fixed inset-0 z-50 bg-black/50",
         className
      )}
      {...props}
   />
);

export const DialogContent = ({
   className,
   children,
   showCloseButton = true,
   ...props
}: Dialog.ContentProps) => (
   <DialogPortal>
      <DialogOverlay />
      <DialogPrimitive.Content
         data-slot="dialog-content"
         className={cn(
            "bg-background data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 fixed top-[50%] left-[50%] z-50 grid w-full max-w-[calc(100%-2rem)] translate-x-[-50%] translate-y-[-50%] gap-4 rounded-lg border p-6 shadow-lg duration-200 sm:max-w-lg",
            className
         )}
         {...props}
      >
         {children}
         {showCloseButton && (
            <DialogPrimitive.Close
               data-slot="dialog-close"
               className="ring-offset-background focus:ring-ring data-[state=open]:bg-accent data-[state=open]:text-muted-foreground absolute top-4 right-4 rounded-xs opacity-70 transition-opacity hover:opacity-100 focus:ring-2 focus:ring-offset-2 focus:outline-hidden disabled:pointer-events-none [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg]:not([class*='size-']):size-4"
            >
               <XIcon />
               <span className="sr-only">Close</span>
            </DialogPrimitive.Close>
         )}
      </DialogPrimitive.Content>
   </DialogPortal>
);

export const DialogHeader = ({ className, ...props }: Dialog.HeaderProps) => (
   <div
      data-slot="dialog-header"
      className={cn("flex flex-col gap-2 text-center sm:text-left", className)}
      {...props}
   />
);

export const DialogFooter = ({ className, ...props }: Dialog.FooterProps) => (
   <div
      data-slot="dialog-footer"
      className={cn(
         "flex flex-col-reverse gap-2 sm:flex-row sm:justify-end",
         className
      )}
      {...props}
   />
);

export const DialogTitle = ({ className, ...props }: Dialog.TitleProps) => (
   <DialogPrimitive.Title
      data-slot="dialog-title"
      className={cn("text-lg leading-none font-semibold", className)}
      {...props}
   />
);

export const DialogDescription = ({
   className,
   ...props
}: Dialog.DescriptionProps) => (
   <DialogPrimitive.Description
      data-slot="dialog-description"
      className={cn("text-muted-foreground text-sm", className)}
      {...props}
   />
);
