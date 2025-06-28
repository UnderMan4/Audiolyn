import { open } from "@tauri-apps/plugin-dialog";
import { File, Folder } from "lucide-react";
import React from "react";
import { useId } from "src/hooks";
import { cn } from "src/lib/style-utils";

import { Button } from "./button";
import { Label } from "./label";

export namespace FileSelectNS {
   export type Props = React.ComponentProps<"input"> & {
      label?: string;
      options?: Parameters<typeof open>[0];
   };
}

export const FileSelect = ({
   className,
   options,
   label,
   id,
   ...props
}: FileSelectNS.Props) => {
   const generatedId = useId(id);
   const inputRef = React.useRef<HTMLInputElement>(null);

   const handleButtonClick = async () => {
      const file = await open(options);
      console.log("🚀 ~ handleButtonClick ~ file:", file);

      if (file && inputRef.current) {
         inputRef.current.value = file;
         if (typeof props.onChange === "function") {
            const event = new Event("change", {
               bubbles: true,
               cancelable: true,
            });
            Object.defineProperty(event, "target", {
               writable: false,
               value: inputRef.current,
            });
            props.onChange(
               event as unknown as React.ChangeEvent<HTMLInputElement>
            );
         } else {
            inputRef.current.dispatchEvent(
               new Event("change", {
                  bubbles: true,
                  cancelable: true,
               })
            );
         }
      }
   };
   return (
      <div className="flex flex-col gap-2 items-stretch">
         {label && (
            <Label htmlFor={generatedId} className="pl-1">
               {label}
            </Label>
         )}
         <div className="flex items-center gap-3">
            <input
               ref={inputRef}
               id={generatedId}
               type="text"
               data-slot="input"
               className={cn(
                  "file:text-foreground placeholder:text-muted-foreground selection:bg-primary selection:text-primary-foreground dark:bg-input/30 border-input flex h-9 w-full min-w-0 rounded-md border bg-transparent px-3 py-1 text-base shadow-xs transition-[color,box-shadow] outline-none file:inline-flex file:h-7 file:border-0 file:bg-transparent file:text-sm file:font-medium disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",
                  "focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px]",
                  "aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive",
                  className
               )}
               {...props}
            />
            <Button size="icon" onClick={handleButtonClick}>
               {options?.directory ? <Folder /> : <File />}
            </Button>
         </div>
      </div>
   );
};
