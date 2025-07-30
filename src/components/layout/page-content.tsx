import { VariantProps, cva } from "class-variance-authority";

import { cn } from "@/lib/style-utils";

export const pageContentVariants = cva(["p-2 overflow-auto"], {
   variants: {
      variant: {
         scrollable: "min-h-0",
         centeredCol:
            "flex items-center justify-center h-full w-full flex-col gap-4",
         centeredRow:
            "flex items-center justify-center h-full w-full flex-row gap-4",
      },
   },
   defaultVariants: {
      variant: "scrollable",
   },
});

export namespace PageContent {
   export type Props = React.ComponentProps<"div"> &
      VariantProps<typeof pageContentVariants>;
}

export const PageContent = ({
   className,
   variant,
   ...props
}: PageContent.Props) => {
   return (
      <div
         className={cn(pageContentVariants({ variant }), className)}
         {...props}
      />
   );
};
