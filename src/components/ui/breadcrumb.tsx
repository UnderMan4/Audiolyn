import { ChevronRight, MoreHorizontal } from "lucide-react";
import React from "react";
import { cn } from "src/lib/style-utils";

import { BetterLink } from "../better-link";

export namespace Breadcrumb {
   export type RootProps = React.ComponentProps<"nav">;
   export type ListProps = React.ComponentProps<"ol">;
   export type ItemProps = React.ComponentProps<"li">;
   export type LinkProps = Omit<BetterLink.Props, "to"> & {
      to?: BetterLink.To;
   };
   export type PageProps = React.ComponentProps<"span">;
   export type SeparatorProps = React.ComponentProps<"li">;
   export type EllipsisProps = React.ComponentProps<"span">;
}

export const Breadcrumb = ({ ...props }: Breadcrumb.RootProps) => {
   return <nav aria-label="breadcrumb" data-slot="breadcrumb" {...props} />;
};

export const BreadcrumbList = ({
   className,
   ...props
}: Breadcrumb.ListProps) => {
   return (
      <ol
         data-slot="breadcrumb-list"
         className={cn(
            "text-muted-foreground flex flex-wrap items-center gap-1.5 text-sm break-words sm:gap-2.5",
            className
         )}
         {...props}
      />
   );
};

export const BreadcrumbItem = ({
   className,
   ...props
}: Breadcrumb.ItemProps) => {
   return (
      <li
         data-slot="breadcrumb-item"
         className={cn("inline-flex items-center gap-1.5", className)}
         {...props}
      />
   );
};

export const BreadcrumbLink = ({
   className,
   to,
   ...props
}: Breadcrumb.LinkProps) => {
   if (!to) {
      return <span {...props} />;
   }

   return (
      <BetterLink
         data-slot="breadcrumb-link"
         to={to}
         className={cn(
            "transition-colors",
            { "hover:text-foreground": to },
            className
         )}
         {...props}
      />
   );
};

export const BreadcrumbPage = ({
   className,
   ...props
}: Breadcrumb.PageProps) => {
   return (
      <span
         data-slot="breadcrumb-page"
         role="link"
         aria-disabled="true"
         aria-current="page"
         className={cn("text-foreground font-normal font-bold", className)}
         {...props}
      />
   );
};

export const BreadcrumbSeparator = ({
   children,
   className,
   ...props
}: Breadcrumb.SeparatorProps) => {
   return (
      <li
         data-slot="breadcrumb-separator"
         role="presentation"
         aria-hidden="true"
         className={cn("[&>svg]:size-3.5", className)}
         {...props}
      >
         {children ?? <ChevronRight />}
      </li>
   );
};

export const BreadcrumbEllipsis = ({
   className,
   ...props
}: Breadcrumb.EllipsisProps) => {
   return (
      <span
         data-slot="breadcrumb-ellipsis"
         role="presentation"
         aria-hidden="true"
         className={cn("flex size-9 items-center justify-center", className)}
         {...props}
      >
         <MoreHorizontal className="size-4" />
         <span className="sr-only">More</span>
      </span>
   );
};
