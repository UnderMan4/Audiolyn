import { getCurrentWindow } from "@tauri-apps/api/window";
import { Minus, Square, X } from "lucide-react";

import { cn } from "@/lib/utils";

import { Button } from "../button";

export namespace TitlebarButton {
   export type Action = "minimize" | "maximize" | "close";

   export type Props = {
      action: Action;
   };
}

export const TitlebarButton = ({ action }: TitlebarButton.Props) => {
   const { children, className, ...buttonProps } = actionsMap[action];
   return (
      <Button
         size="xs"
         className={cn("rounded-[6px] cursor-auto", className)}
         {...buttonProps}
      >
         <div className={cn("px-2")}>{children}</div>
      </Button>
   );
};

const actionsMap: Record<TitlebarButton.Action, Button.Props> = {
   minimize: {
      children: <Minus />,
      onClick: () => {
         getCurrentWindow().minimize();
      },
      variant: "ghost",
   },
   maximize: {
      children: <Square />,
      onClick: () => {
         getCurrentWindow().toggleMaximize();
      },
      variant: "ghost",
   },
   close: {
      children: <X />,
      onClick: () => {
         getCurrentWindow().close();
      },
      variant: "ghost",
      className: "hover:text-white hover:bg-red-500!",
   },
};
