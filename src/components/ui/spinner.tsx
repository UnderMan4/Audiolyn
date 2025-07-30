import { VariantProps, cva } from "class-variance-authority";
import { LoaderCircle } from "lucide-react";

import { cn } from "@/lib/style-utils";

const spinnerVariants = cva(["animate-spin"], {
   variants: {
      size: {
         sm: "size-4",
         md: "size-7",
         lg: "size-10",
      },
   },
   defaultVariants: {
      size: "md",
   },
});

export namespace Spinner {
   export type Props = VariantProps<typeof spinnerVariants> & {
      className?: string;
   };
}

export const Spinner = ({ size, className }: Spinner.Props) => {
   return <LoaderCircle className={cn(spinnerVariants({ size, className }))} />;
};
