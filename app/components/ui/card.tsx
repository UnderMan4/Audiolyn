import { VariantProps, cva } from "class-variance-authority";
import { CircleCheckBig, OctagonX, TriangleAlert } from "lucide-react";
import React from "react";

import { cn } from "@/lib/utils";

export namespace Card {
   export type RootProps = React.ComponentProps<"div"> &
      VariantProps<typeof cardVariants> & {
         icon?: boolean;
      };
   export type HeaderProps = React.ComponentProps<"div">;
   export type TitleProps = React.ComponentProps<"div">;
   export type DescriptionProps = React.ComponentProps<"div">;
   export type ActionProps = React.ComponentProps<"div">;
   export type ContentProps = React.ComponentProps<"div">;
   export type FooterProps = React.ComponentProps<"div">;
}

export const cardVariants = cva(
   "flex flex-col gap-6 border shadow-sm group relative overflow-hidden",
   {
      variants: {
         variant: {
            default: "bg-card text-card-foreground",
            warn: "bg-card-warn text-card-foreground-warn border-card-border-warn",
            error: "bg-card-error text-card-foreground-error border-card-border-error",
            success:
               "bg-card-success text-card-foreground-success border-card-border-success",
         },
         type: {
            default: "rounded-xl py-6",
            inner: "rounded-md py-4",
         },
      },
      defaultVariants: {
         variant: "default",
         type: "default",
      },
   }
);

export const Card = ({
   className,
   variant,
   type = "default",
   children,
   icon = true,
   ...props
}: Card.RootProps) => {
   const iconCLassName = cn("absolute", {
      "-top-6 -right-6 size-28": type === "inner",
      "-top-8 -right-8 size-32": type === "default",
   });
   return (
      <div
         data-slot="card"
         data-variant={variant}
         data-type={type}
         className={cn(cardVariants({ variant, type }), className)}
         {...props}
      >
         {icon && variant === "warn" && (
            <TriangleAlert
               className={cn("text-card-icon-warn", iconCLassName)}
            />
         )}
         {icon && variant === "error" && (
            <OctagonX className={cn("text-card-icon-error", iconCLassName)} />
         )}
         {icon && variant === "success" && (
            <CircleCheckBig
               className={cn("text-card-icon-success", iconCLassName)}
            />
         )}
         {children}
      </div>
   );
};

export const CardHeader = ({ className, ...props }: Card.HeaderProps) => {
   return (
      <div
         data-slot="card-header"
         className={cn(
            "z-10 @container/card-header grid auto-rows-min grid-rows-[auto_auto] items-start gap-1.5 px-6 has-data-[slot=card-action]:grid-cols-[1fr_auto] [.border-b]:pb-6",
            "group-data-[type=inner]:px-4",
            className
         )}
         {...props}
      />
   );
};

export const CardTitle = ({ className, ...props }: Card.TitleProps) => {
   return (
      <div
         data-slot="card-title"
         className={cn(
            "z-10 leading-none font-semibold group-data-[type=inner]:text-sm",
            className
         )}
         {...props}
      />
   );
};

export const CardDescription = ({
   className,
   ...props
}: Card.DescriptionProps) => {
   return (
      <div
         data-slot="card-description"
         className={cn(
            "z-10 text-muted-foreground text-sm group-data-[type=inner]:text-xs",
            className
         )}
         {...props}
      />
   );
};

export const CardAction = ({ className, ...props }: Card.ActionProps) => {
   return (
      <div
         data-slot="card-action"
         className={cn(
            "z-10 col-start-2 row-span-2 row-start-1 self-start justify-self-end",
            className
         )}
         {...props}
      />
   );
};

export const CardContent = ({ className, ...props }: Card.ContentProps) => {
   return (
      <div
         data-slot="card-content"
         className={cn(
            "z-10 px-6 group-data-[type=inner]:px-4 group-data-[type=inner]:text-sm",
            className
         )}
         {...props}
      />
   );
};

export const CardFooter = ({ className, ...props }: Card.FooterProps) => {
   return (
      <div
         data-slot="card-footer"
         className={cn(
            "z-10 flex items-center px-6 [.border-t]:pt-6 group-data-[type=inner]:px-4",
            className
         )}
         {...props}
      />
   );
};
