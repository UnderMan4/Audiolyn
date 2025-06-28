import * as SliderPrimitive from "@radix-ui/react-slider";

import { cn } from "@/lib/style-utils";

export namespace AudiobookProgressBar {
   export type Props = {
      totalLengthSeconds: number;
      currentTimeSeconds: number;
      onSeek?: (timeSeconds: number) => void;
      className?: string;
   };
}

export const AudiobookProgressBar = ({
   currentTimeSeconds,
   totalLengthSeconds,
   onSeek,
   className,
}: AudiobookProgressBar.Props) => {
   return (
      <SliderPrimitive.Root
         data-slot="slider"
         defaultValue={[currentTimeSeconds]}
         value={[currentTimeSeconds]}
         max={totalLengthSeconds}
         onValueChange={(value) => onSeek?.(value[0])}
         className={cn(
            "group",

            // Layout & flex
            "relative flex w-full items-center select-none touch-none",
            // Disabled & orientation
            "data-[disabled]:opacity-50",
            "data-[orientation=vertical]:h-full",
            "data-[orientation=vertical]:min-h-44",
            "data-[orientation=vertical]:w-auto",
            "data-[orientation=vertical]:flex-col",
            className
         )}
      >
         <SliderPrimitive.Track
            data-slot="slider-track"
            className={cn(
               "bg-muted relative grow overflow-hidden rounded-full",
               "h-1.5 w-full"
            )}
         >
            <SliderPrimitive.Range
               data-slot="slider-range"
               className={cn("bg-primary absolute h-full rounded-full")}
            />
         </SliderPrimitive.Track>
         <SliderPrimitive.Thumb
            data-slot="slider-thumb"
            className={cn(
               // Shape & color
               "block size-4 shrink-0 rounded-full border border-primary opacity-0",
               "bg-background shadow-sm",
               // Focus & hover
               "ring-ring/50 transition-[color,box-shadow] hover:ring-4",
               "focus-visible:ring-4 focus-visible:outline-hidden",
               "group-hover:opacity-100"
            )}
         />
      </SliderPrimitive.Root>
   );
};
