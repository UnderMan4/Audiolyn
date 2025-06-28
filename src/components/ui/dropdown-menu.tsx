"use client";

import * as DropdownMenuPrimitive from "@radix-ui/react-dropdown-menu";
import { CheckIcon, ChevronRightIcon, CircleIcon } from "lucide-react";
import React from "react";
import { cn } from "src/lib/style-utils";

export namespace DropdownMenu {
   export type RootProps = React.ComponentProps<
      typeof DropdownMenuPrimitive.Root
   >;
   export type PortalProps = React.ComponentProps<
      typeof DropdownMenuPrimitive.Portal
   >;
   export type TriggerProps = React.ComponentProps<
      typeof DropdownMenuPrimitive.Trigger
   >;
   export type ContentProps = React.ComponentProps<
      typeof DropdownMenuPrimitive.Content
   > & {
      sideOffset?: number;
   };
   export type GroupProps = React.ComponentProps<
      typeof DropdownMenuPrimitive.Group
   >;
   export type ItemProps = React.ComponentProps<
      typeof DropdownMenuPrimitive.Item
   > & {
      inset?: boolean;
      variant?: "default" | "destructive";
   };
   export type CheckboxItemProps = React.ComponentProps<
      typeof DropdownMenuPrimitive.CheckboxItem
   >;
   export type RadioGroupProps = React.ComponentProps<
      typeof DropdownMenuPrimitive.RadioGroup
   >;
   export type RadioItemProps = React.ComponentProps<
      typeof DropdownMenuPrimitive.RadioItem
   >;
   export type LabelProps = React.ComponentProps<
      typeof DropdownMenuPrimitive.Label
   > & {
      inset?: boolean;
   };
   export type SeparatorProps = React.ComponentProps<
      typeof DropdownMenuPrimitive.Separator
   >;
   export type ShortcutProps = React.ComponentProps<"span">;
   export type SubProps = React.ComponentProps<
      typeof DropdownMenuPrimitive.Sub
   >;
   export type SubTriggerProps = React.ComponentProps<
      typeof DropdownMenuPrimitive.SubTrigger
   > & {
      inset?: boolean;
   };
   export type SubContentProps = React.ComponentProps<
      typeof DropdownMenuPrimitive.SubContent
   >;
}

export const DropdownMenu = ({ ...props }: DropdownMenu.RootProps) => {
   return <DropdownMenuPrimitive.Root data-slot="dropdown-menu" {...props} />;
};

export const DropdownMenuPortal = (props: DropdownMenu.PortalProps) => (
   <DropdownMenuPrimitive.Portal data-slot="dropdown-menu-portal" {...props} />
);

export const DropdownMenuTrigger = (props: DropdownMenu.TriggerProps) => (
   <DropdownMenuPrimitive.Trigger
      data-slot="dropdown-menu-trigger"
      {...props}
   />
);

export const DropdownMenuContent = ({
   className,
   sideOffset = 4,
   ...props
}: DropdownMenu.ContentProps) => (
   <DropdownMenuPrimitive.Portal>
      <DropdownMenuPrimitive.Content
         data-slot="dropdown-menu-content"
         sideOffset={sideOffset}
         className={cn(
            "bg-popover text-popover-foreground data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 z-50 max-h-(--radix-dropdown-menu-content-available-height) min-w-[8rem] origin-(--radix-dropdown-menu-content-transform-origin) overflow-x-hidden overflow-y-auto rounded-md border p-1 shadow-md",
            className
         )}
         {...props}
      />
   </DropdownMenuPrimitive.Portal>
);

export const DropdownMenuGroup = (props: DropdownMenu.GroupProps) => (
   <DropdownMenuPrimitive.Group data-slot="dropdown-menu-group" {...props} />
);

export const DropdownMenuItem = ({
   className,
   inset,
   variant = "default",
   ...props
}: DropdownMenu.ItemProps) => (
   <DropdownMenuPrimitive.Item
      data-slot="dropdown-menu-item"
      data-inset={inset}
      data-variant={variant}
      className={cn(
         "focus:bg-accent focus:text-accent-foreground data-[variant=destructive]:text-destructive data-[variant=destructive]:focus:bg-destructive/10 dark:data-[variant=destructive]:focus:bg-destructive/20 data-[variant=destructive]:focus:text-destructive data-[variant=destructive]:*:[svg]:!text-destructive [&_svg:not([class*='text-'])]:text-muted-foreground relative flex cursor-default items-center gap-2 rounded-sm px-2 py-1.5 text-sm outline-hidden select-none data-[disabled]:pointer-events-none data-[disabled]:opacity-50 data-[inset]:pl-8 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
         className
      )}
      {...props}
   />
);

export const DropdownMenuCheckboxItem = ({
   className,
   children,
   checked,
   ...props
}: DropdownMenu.CheckboxItemProps) => (
   <DropdownMenuPrimitive.CheckboxItem
      data-slot="dropdown-menu-checkbox-item"
      className={cn(
         "focus:bg-accent focus:text-accent-foreground relative flex cursor-default items-center gap-2 rounded-sm py-1.5 pr-2 pl-8 text-sm outline-hidden select-none data-[disabled]:pointer-events-none data-[disabled]:opacity-50 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
         className
      )}
      checked={checked}
      {...props}
   >
      <span className="pointer-events-none absolute left-2 flex size-3.5 items-center justify-center">
         <DropdownMenuPrimitive.ItemIndicator>
            <CheckIcon className="size-4" />
         </DropdownMenuPrimitive.ItemIndicator>
      </span>
      {children}
   </DropdownMenuPrimitive.CheckboxItem>
);

export const DropdownMenuRadioGroup = (props: DropdownMenu.RadioGroupProps) => (
   <DropdownMenuPrimitive.RadioGroup
      data-slot="dropdown-menu-radio-group"
      {...props}
   />
);

export const DropdownMenuRadioItem = ({
   className,
   children,
   ...props
}: DropdownMenu.RadioItemProps) => (
   <DropdownMenuPrimitive.RadioItem
      data-slot="dropdown-menu-radio-item"
      className={cn(
         "focus:bg-accent focus:text-accent-foreground relative flex cursor-default items-center gap-2 rounded-sm py-1.5 pr-2 pl-8 text-sm outline-hidden select-none data-[disabled]:pointer-events-none data-[disabled]:opacity-50 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
         className
      )}
      {...props}
   >
      <span className="pointer-events-none absolute left-2 flex size-3.5 items-center justify-center">
         <DropdownMenuPrimitive.ItemIndicator>
            <CircleIcon className="size-2 fill-current" />
         </DropdownMenuPrimitive.ItemIndicator>
      </span>
      {children}
   </DropdownMenuPrimitive.RadioItem>
);

export const DropdownMenuLabel = ({
   className,
   inset,
   ...props
}: DropdownMenu.LabelProps) => (
   <DropdownMenuPrimitive.Label
      data-slot="dropdown-menu-label"
      data-inset={inset}
      className={cn(
         "px-2 py-1.5 text-sm font-medium data-[inset]:pl-8",
         className
      )}
      {...props}
   />
);

export const DropdownMenuSeparator = ({
   className,
   ...props
}: DropdownMenu.SeparatorProps) => (
   <DropdownMenuPrimitive.Separator
      data-slot="dropdown-menu-separator"
      className={cn("bg-border -mx-1 my-1 h-px", className)}
      {...props}
   />
);

export const DropdownMenuShortcut = ({
   className,
   ...props
}: DropdownMenu.ShortcutProps) => (
   <span
      data-slot="dropdown-menu-shortcut"
      className={cn(
         "text-muted-foreground ml-auto text-xs tracking-widest",
         className
      )}
      {...props}
   />
);

export const DropdownMenuSub = (props: DropdownMenu.SubProps) => (
   <DropdownMenuPrimitive.Sub data-slot="dropdown-menu-sub" {...props} />
);

export const DropdownMenuSubTrigger = ({
   className,
   inset,
   children,
   ...props
}: DropdownMenu.SubTriggerProps) => (
   <DropdownMenuPrimitive.SubTrigger
      data-slot="dropdown-menu-sub-trigger"
      data-inset={inset}
      className={cn(
         "focus:bg-accent focus:text-accent-foreground data-[state=open]:bg-accent data-[state=open]:text-accent-foreground flex cursor-default items-center rounded-sm px-2 py-1.5 text-sm outline-hidden select-none data-[inset]:pl-8",
         className
      )}
      {...props}
   >
      {children}
      <ChevronRightIcon className="ml-auto size-4" />
   </DropdownMenuPrimitive.SubTrigger>
);

export const DropdownMenuSubContent = ({
   className,
   ...props
}: DropdownMenu.SubContentProps) => (
   <DropdownMenuPrimitive.SubContent
      data-slot="dropdown-menu-sub-content"
      className={cn(
         "bg-popover text-popover-foreground data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 z-50 min-w-[8rem] origin-(--radix-dropdown-menu-content-transform-origin) overflow-hidden rounded-md border p-1 shadow-lg",
         className
      )}
      {...props}
   />
);
