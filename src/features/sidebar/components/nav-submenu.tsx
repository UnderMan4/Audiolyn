import { ChevronRight } from "lucide-react";
import { useTranslation } from "react-i18next";
import { Link } from "react-router";
import { BetterLink } from "src/components/better-link";
import {
   CollapsibleContent,
   CollapsibleTrigger,
   DropdownMenuContent,
   DropdownMenuItem,
   SidebarMenuAction,
   SidebarMenuSub,
   SidebarMenuSubButton,
   SidebarMenuSubItem,
   useSidebarContext,
} from "src/components/ui";

import { MenuItem } from "../types";

export namespace NavCollapsible {
   export type Props = {
      item: MenuItem;
   };
}

export const NavSubmenu = ({ item }: NavCollapsible.Props) => {
   const { t } = useTranslation();
   const { isMobile } = useSidebarContext();

   if (!item.items || item.items.length === 0) {
      return null;
   }

   if (item.type === "link" || item.type === "button") {
      return (
         <>
            <CollapsibleTrigger asChild>
               <SidebarMenuAction className="data-[state=open]:rotate-90">
                  <ChevronRight />
                  <span className="sr-only">
                     {t("common.sidebar.sr_chevron")}
                  </span>
               </SidebarMenuAction>
            </CollapsibleTrigger>
            <CollapsibleContent>
               <SidebarMenuSub>
                  {item.items.map((subItem) => (
                     <SidebarMenuSubItem key={t(subItem.label)}>
                        <SidebarMenuSubButton asChild>
                           {subItem.type === "link" ? (
                              <BetterLink to={subItem.to}>
                                 {subItem.icon && <subItem.icon />}
                                 <span>{t(subItem.label)}</span>
                              </BetterLink>
                           ) : (
                              <button onClick={subItem.onClick}>
                                 {subItem.icon && <subItem.icon />}
                                 <span>{t(subItem.label)}</span>
                              </button>
                           )}
                        </SidebarMenuSubButton>
                     </SidebarMenuSubItem>
                  ))}
               </SidebarMenuSub>
            </CollapsibleContent>
         </>
      );
   }

   if (item.type === "dropdown") {
      return (
         <DropdownMenuContent
            className="w-48"
            side={isMobile ? "bottom" : "right"}
            align={isMobile ? "start" : "end"}
         >
            {item.items.map((subItem) => (
               <DropdownMenuItem
                  key={subItem.id}
                  asChild
                  className="cursor-pointer"
               >
                  {subItem.type === "link" ? (
                     <BetterLink to={subItem.to}>
                        {subItem.icon && <subItem.icon />}
                        <span>{t(subItem.label)}</span>
                     </BetterLink>
                  ) : (
                     <button onClick={subItem.onClick} className="w-full">
                        {subItem.icon && <subItem.icon />}
                        <span>{t(subItem.label)}</span>
                     </button>
                  )}
               </DropdownMenuItem>
            ))}
         </DropdownMenuContent>
      );
   }
};
