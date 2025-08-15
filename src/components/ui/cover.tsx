import { VariantProps, cva } from "class-variance-authority";
import React, { useEffect, useMemo } from "react";

import { CoverImage } from "@/features/import/types/metadata";
import { detectImageMimeType } from "@/features/import/utils/cover-utils";
import { cn } from "@/lib/style-utils";

const coverVariants = cva(["relative overflow-hidden"], {
   variants: {
      size: {
         sm: "size-16 rounded",
         md: "size-24 rounded-lg",
         lg: "size-32 rounded-xl",
         xl: "size-40 rounded-2xl",
      },
   },
   defaultVariants: {
      size: "md",
   },
});

export namespace Cover {
   export type Props = Omit<React.ComponentProps<"div">, "src"> &
      VariantProps<typeof coverVariants> & {
         img: CoverImage;
         bookTitle?: string;
         bookAuthor?: string;
      };
}

export const Cover = ({
   img,
   size,
   className,
   bookAuthor,
   bookTitle,
   ...props
}: Cover.Props) => {
   const data = img?.data;
   const mimeType = img?.mimeType;

   const url = useMemo(() => {
      if (!data) return undefined;
      const blob = new Blob([data], {
         type: mimeType || detectImageMimeType(data),
      });
      return window.URL.createObjectURL(blob);
   }, [data, mimeType]);

   useEffect(() => {
      return () => {
         if (url) window.URL.revokeObjectURL(url);
      };
   }, [url]);

   if (!data) {
      return null;
   }

   return (
      <div className={cn(coverVariants({ size }), className)} {...props}>
         <img src={url} className="object-cover w-full h-full blur-xl" alt="" />
         <img
            src={url}
            className="object-contain w-full h-full absolute inset-0"
            alt={`${bookTitle} by ${bookAuthor} cover`}
         />
      </div>
   );
};
