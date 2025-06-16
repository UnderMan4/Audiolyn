"use client";

import { ChevronRight, type LucideIcon } from "lucide-react";
import { useTranslation } from "react-i18next";
import { Link } from "react-router";

import {
   Collapsible,
   CollapsibleContent,
   CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { Intl } from "@/intl/types";

import {
   SidebarGroup,
   SidebarMenu,
   SidebarMenuAction,
   SidebarMenuButton,
   SidebarMenuItem,
   SidebarMenuSub,
   SidebarMenuSubButton,
   SidebarMenuSubItem,
} from "./ui";

export namespace NavMain {
   export type Item = {
      title: Intl.Key;
      url: string;
      icon: LucideIcon;
      isActive?: boolean;
      items?: {
         title: Intl.Key;
         url: string;
      }[];
   };

   export type Props = {
      items: Item[];
   };
}

export const NavMain = ({ items }: NavMain.Props) => {
   const { t } = useTranslation();

   return (
      <SidebarGroup>
         <SidebarMenu>
            {items.map((item) => (
               <Collapsible
                  key={item.title}
                  asChild
                  defaultOpen={item.isActive}
               >
                  <SidebarMenuItem>
                     <SidebarMenuButton asChild tooltip={t(item.title)}>
                        <Link to={item.url}>
                           <item.icon />
                           <span>{t(item.title)}</span>
                        </Link>
                     </SidebarMenuButton>
                     {item.items?.length ? (
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
                                 {item.items?.map((subItem) => (
                                    <SidebarMenuSubItem key={t(subItem.title)}>
                                       <SidebarMenuSubButton asChild>
                                          <Link to={subItem.url}>
                                             <span>{t(subItem.title)}</span>
                                          </Link>
                                       </SidebarMenuSubButton>
                                    </SidebarMenuSubItem>
                                 ))}
                              </SidebarMenuSub>
                           </CollapsibleContent>
                        </>
                     ) : null}
                  </SidebarMenuItem>
               </Collapsible>
            ))}
         </SidebarMenu>
      </SidebarGroup>
   );
};
