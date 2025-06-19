import * as SelectPrimitive from "@radix-ui/react-select";
import { CheckIcon, ChevronDownIcon, ChevronUpIcon } from "lucide-react";
import React from "react";

import { useId } from "@/hooks";
import { cn } from "@/lib/utils";

import { Label } from "./label";

export namespace Select {
   export type RootProps = React.ComponentProps<typeof SelectPrimitive.Root>;
   export type GroupProps = React.ComponentProps<typeof SelectPrimitive.Group>;
   export type ValueProps = React.ComponentProps<typeof SelectPrimitive.Value>;
   export type TriggerProps = React.ComponentProps<
      typeof SelectPrimitive.Trigger
   > & {
      size?: "sm" | "default";
      label?: string;
   };
   export type ContentProps = React.ComponentProps<
      typeof SelectPrimitive.Content
   > & {
      position?: "popper" | "static";
   };
   export type LabelProps = React.ComponentProps<typeof SelectPrimitive.Label>;
   export type ItemProps = React.ComponentProps<typeof SelectPrimitive.Item> & {
      description?: string;
   };
   export type SeparatorProps = React.ComponentProps<
      typeof SelectPrimitive.Separator
   >;
   export type ScrollUpButtonProps = React.ComponentProps<
      typeof SelectPrimitive.ScrollUpButton
   >;
   export type ScrollDownButtonProps = React.ComponentProps<
      typeof SelectPrimitive.ScrollDownButton
   >;
}

export const Select = ({ ...props }: Select.RootProps) => {
   return <SelectPrimitive.Root data-slot="select" {...props} />;
};

export const SelectGroup = (props: Select.GroupProps) => {
   return <SelectPrimitive.Group data-slot="select-group" {...props} />;
};

export const SelectValue = (props: Select.ValueProps) => {
   return <SelectPrimitive.Value data-slot="select-value" {...props} />;
};

export const SelectTrigger = ({
   className,
   size = "default",
   children,
   id,
   label,
   ...props
}: Select.TriggerProps) => {
   const generatedId = useId(id);
   return (
      <div className={cn("flex flex-col items-stretch gap-2", className)}>
         {label === undefined ? null : <Label className="pl-1">{label}</Label>}
         <SelectPrimitive.Trigger
            data-slot="select-trigger"
            data-size={size}
            className={cn(
               // Border & background
               "border-input rounded-md border bg-transparent",
               // Sizing & spacing
               "flex w-fit items-center justify-between gap-2 px-3 py-2 text-sm whitespace-nowrap",
               "data-[size=default]:h-9 data-[size=sm]:h-8",
               // Shadow & transition
               "shadow-xs transition-[color,box-shadow] outline-none",
               // Focus & invalid states
               "focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px]",
               "aria-invalid:border-destructive aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40",
               // Disabled state
               "disabled:cursor-not-allowed disabled:opacity-50",
               // Placeholder & icon coloring
               "data-[placeholder]:text-muted-foreground [&_svg:not([class*='text-'])]:text-muted-foreground",
               // Value styling
               "*:data-[slot=select-value]:line-clamp-1 *:data-[slot=select-value]:flex *:data-[slot=select-value]:items-center *:data-[slot=select-value]:gap-2",
               // Icon sizing
               "[&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
               // Dark mode
               "dark:bg-input/30 dark:hover:bg-input/50",
               "group/select-trigger",
               className
            )}
            id={generatedId}
            aria-label={label}
            {...props}
         >
            {children}
            <SelectPrimitive.Icon asChild>
               <ChevronDownIcon className="size-4 opacity-50 group-data-[state=open]/select-trigger:-rotate-180 transition-transform" />
            </SelectPrimitive.Icon>
         </SelectPrimitive.Trigger>
      </div>
   );
};

export const SelectContent = ({
   className,
   children,
   position = "popper",
   ...props
}: Select.ContentProps) => {
   return (
      <SelectPrimitive.Portal>
         <SelectPrimitive.Content
            data-slot="select-content"
            className={cn(
               // Animation & state
               "data-[state=open]:animate-in data-[state=closed]:animate-out",
               "data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0",
               "data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95",
               // Slide-in by side
               "data-[side=bottom]:slide-in-from-top-2",
               "data-[side=left]:slide-in-from-right-2",
               "data-[side=right]:slide-in-from-left-2",
               "data-[side=top]:slide-in-from-bottom-2",
               // Positioning & layout
               "relative z-50",
               "max-h-(--radix-select-content-available-height)",
               "min-w-[8rem] max-w-[max(var(--radix-select-trigger-width),min(var(--radix-select-content-available-width),24rem))]",
               "origin-(--radix-select-content-transform-origin)",
               "overflow-x-hidden overflow-y-auto",
               "rounded-md border shadow-md",
               // Colors
               "bg-popover text-popover-foreground",
               // Popper-specific translation
               position === "popper" &&
                  "data-[side=bottom]:translate-y-1 data-[side=left]:-translate-x-1 data-[side=right]:translate-x-1 data-[side=top]:-translate-y-1",
               className
            )}
            position={position}
            {...props}
         >
            <SelectScrollUpButton />
            <SelectPrimitive.Viewport
               className={cn(
                  "p-1",
                  position === "popper" &&
                     "h-[var(--radix-select-trigger-height)] w-full min-w-[var(--radix-select-trigger-width)] scroll-my-1"
               )}
            >
               {children}
            </SelectPrimitive.Viewport>
            <SelectScrollDownButton />
         </SelectPrimitive.Content>
      </SelectPrimitive.Portal>
   );
};

export const SelectLabel = ({ className, ...props }: Select.LabelProps) => {
   return (
      <SelectPrimitive.Label
         data-slot="select-label"
         className={cn("text-muted-foreground px-2 py-1.5 text-xs", className)}
         {...props}
      />
   );
};

export const SelectItem = ({
   className,
   children,
   description,
   ...props
}: Select.ItemProps) => {
   return (
      <SelectPrimitive.Item
         data-slot="select-item"
         className={cn(
            // State & focus
            "focus:bg-accent focus:text-accent-foreground",
            // Icon coloring
            "[&_svg:not([class*='text-'])]:text-muted-foreground",
            // Layout & spacing
            "relative flex flex-col w-full cursor-default justify-center gap-1 rounded-sm py-1.5 pr-8 pl-2 text-sm select-none",
            // Disabled state
            "data-[disabled]:pointer-events-none data-[disabled]:opacity-50",
            // Icon sizing & pointer events
            "[&_svg]:pointer-events-none [&_svg]:shrink-0",
            "[&_svg:not([class*='size-'])]:size-4",
            // Description layout
            "*:[span]:last:flex *:[span]:last:items-center *:[span]:last:gap-2",
            // Outline
            "outline-hidden",
            className
         )}
         {...props}
      >
         <span className="absolute right-2 flex size-3.5 items-center justify-center">
            <SelectPrimitive.ItemIndicator>
               <CheckIcon className="size-4" />
            </SelectPrimitive.ItemIndicator>
         </span>
         <SelectPrimitive.ItemText>{children}</SelectPrimitive.ItemText>
         {description ? (
            <span className="text-muted-foreground text-xs">{description}</span>
         ) : null}
      </SelectPrimitive.Item>
   );
};

export const SelectSeparator = ({
   className,
   ...props
}: Select.SeparatorProps) => {
   return (
      <SelectPrimitive.Separator
         data-slot="select-separator"
         className={cn(
            "bg-border pointer-events-none -mx-1 my-1 h-px",
            className
         )}
         {...props}
      />
   );
};

export const SelectScrollUpButton = ({
   className,
   ...props
}: Select.ScrollUpButtonProps) => {
   return (
      <SelectPrimitive.ScrollUpButton
         data-slot="select-scroll-up-button"
         className={cn(
            "flex cursor-default items-center justify-center py-1",
            className
         )}
         {...props}
      >
         <ChevronUpIcon className="size-4" />
      </SelectPrimitive.ScrollUpButton>
   );
};

export const SelectScrollDownButton = ({
   className,
   ...props
}: Select.ScrollDownButtonProps) => {
   return (
      <SelectPrimitive.ScrollDownButton
         data-slot="select-scroll-down-button"
         className={cn(
            "flex cursor-default items-center justify-center py-1",
            className
         )}
         {...props}
      >
         <ChevronDownIcon className="size-4" />
      </SelectPrimitive.ScrollDownButton>
   );
};
