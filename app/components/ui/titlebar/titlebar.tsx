import { cn } from "@/lib/utils";

import { TitlebarButton } from "./titlebar-button";

export const Titlebar = () => {
   return (
      <div
         className={cn(
            "fixed inset-x-0 top-0 z-[99999] h-(--titlebar-height) flex items-center justify-between px-[2px] select-none"
         )}
         data-tauri-drag-region
      >
         <div>fsdfdf</div>
         <div className="flex items-center">
            <TitlebarButton action="minimize" />
            <TitlebarButton action="maximize" />
            <TitlebarButton action="close" />
         </div>
      </div>
   );
};
