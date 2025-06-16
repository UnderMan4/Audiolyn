import { type LucideIcon } from "lucide-react";
import React from "react";

import {
   SidebarGroup,
   SidebarGroupContent,
   SidebarMenu,
   SidebarMenuButton,
   SidebarMenuItem,
} from "./ui";

export namespace NavSecondary {
   export type Item = {
      title: string;
      url: string;
      icon: LucideIcon;
   };
   export type Props = {
      items: Item[];
   } & React.ComponentPropsWithoutRef<typeof SidebarGroup>;
}

export const NavSecondary = ({ items, ...props }: NavSecondary.Props) => {
   return (
      <SidebarGroup {...props}>
         <SidebarGroupContent>
            <SidebarMenu>
               {items.map((item) => (
                  <SidebarMenuItem key={item.title}>
                     <SidebarMenuButton asChild size="sm">
                        <a href={item.url}>
                           <item.icon />
                           <span>{item.title}</span>
                        </a>
                     </SidebarMenuButton>
                  </SidebarMenuItem>
               ))}
            </SidebarMenu>
         </SidebarGroupContent>
      </SidebarGroup>
   );
};
