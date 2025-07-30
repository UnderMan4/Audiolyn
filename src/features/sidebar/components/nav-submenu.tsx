import { ChevronRight } from "lucide-react";
import { useTranslation } from "react-i18next";
import { BetterLink } from "src/components/better-link";

import {
   CollapsibleContent,
   CollapsibleTrigger,
} from "@/components/ui/collapsible";
import {
   DropdownMenuContent,
   DropdownMenuItem,
} from "@/components/ui/dropdown-menu";
import { SidebarMenuAction } from "@/components/ui/sidebar/sidebar-menu-action";
import { SidebarMenuSub } from "@/components/ui/sidebar/sidebar-menu-sub";
import { SidebarMenuSubButton } from "@/components/ui/sidebar/sidebar-menu-sub-button";
import { SidebarMenuSubItem } from "@/components/ui/sidebar/sidebar-menu-sub-item";
import { useSidebarContext } from "@/components/ui/sidebar/sidebar-provider";

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
                                 <div>
                                    <span>{t(subItem.label)}</span>
                                    {subItem.description && (
                                       <span className="text-xs text-muted-foreground">
                                          {t(subItem.description)}
                                       </span>
                                    )}
                                 </div>
                              </BetterLink>
                           ) : (
                              <button
                                 onClick={subItem.onClick}
                                 className="text-left"
                              >
                                 {subItem.icon && <subItem.icon />}
                                 <div>
                                    <span className="text-left">
                                       {t(subItem.label)}
                                    </span>
                                    {subItem.description && (
                                       <span className="text-xs text-muted-foreground">
                                          {t(subItem.description)}
                                       </span>
                                    )}
                                 </div>
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
                        <div className="flex flex-col gap-1">
                           <span>{t(subItem.label)}</span>
                           {subItem.description && (
                              <span className="text-xs text-muted-foreground">
                                 {t(subItem.description)}
                              </span>
                           )}
                        </div>
                     </BetterLink>
                  ) : (
                     <button onClick={subItem.onClick} className="w-full">
                        {subItem.icon && <subItem.icon />}
                        <div className="flex flex-col gap-1">
                           <span className="text-left">{t(subItem.label)}</span>
                           {subItem.description && (
                              <span className="text-xs text-muted-foreground">
                                 {t(subItem.description)}
                              </span>
                           )}
                        </div>
                     </button>
                  )}
               </DropdownMenuItem>
            ))}
         </DropdownMenuContent>
      );
   }
};
