import { Slot } from "@radix-ui/react-slot";
import { type VariantProps, cva } from "class-variance-authority";
import { JSX, ReactNode } from "react";

import { cn } from "@/lib/utils";

export namespace Typography {
   export type Props = VariantProps<typeof typographyVariants> & {
      className?: string;
      asChild?: boolean;
      children?: ReactNode;
   };
}

const typographyVariants = cva("", {
   variants: {
      variant: {
         h1: "text-3xl font-bold",
         h2: "text-2xl font-bold",
         h3: "text-xl font-bold",
         h4: "text-lg font-bold",
         p1: "",
         p2: "text-sm",
         title1: "font-bold",
         label: "text-sm font-bold select-none leading-none",
      },
   },
   defaultVariants: {
      variant: "p1",
   },
});

const tagMap: Record<
   NonNullable<VariantProps<typeof typographyVariants>["variant"]>,
   keyof JSX.IntrinsicElements
> = {
   h1: "h1",
   h2: "h2",
   h3: "h3",
   h4: "h4",
   p1: "p",
   p2: "p",
   title1: "p",
   label: "label",
};

export const Typography = ({
   children,
   variant = "p1",
   className,
   asChild,
}: Typography.Props) => {
   const Comp = asChild || !variant ? Slot : tagMap[variant];
   return (
      <Comp className={cn(typographyVariants({ variant }), className)}>
         {children}
      </Comp>
   );
};
