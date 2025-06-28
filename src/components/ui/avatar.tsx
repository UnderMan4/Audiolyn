import * as AvatarPrimitive from "@radix-ui/react-avatar";
import React from "react";
import { cn } from "src/lib/style-utils";

export namespace Avatar {
   export type RootProps = React.ComponentProps<typeof AvatarPrimitive.Root>;
   export type ImageProps = React.ComponentProps<typeof AvatarPrimitive.Image>;
   export type FallbackProps = React.ComponentProps<
      typeof AvatarPrimitive.Fallback
   >;
}

export const Avatar = ({ className, ...props }: Avatar.RootProps) => {
   return (
      <AvatarPrimitive.Root
         data-slot="avatar"
         className={cn(
            "relative flex size-8 shrink-0 overflow-hidden rounded-full",
            className
         )}
         {...props}
      />
   );
};

export const AvatarImage = ({ className, ...props }: Avatar.ImageProps) => {
   return (
      <AvatarPrimitive.Image
         data-slot="avatar-image"
         className={cn("aspect-square size-full", className)}
         {...props}
      />
   );
};
export const AvatarFallback = ({
   className,
   ...props
}: Avatar.FallbackProps) => {
   return (
      <AvatarPrimitive.Fallback
         data-slot="avatar-fallback"
         className={cn(
            "bg-muted flex size-full items-center justify-center rounded-full",
            className
         )}
         {...props}
      />
   );
};
