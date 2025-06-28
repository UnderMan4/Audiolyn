import React from "react";

import { SidebarGroup } from "@/components/ui/sidebar/sidebar-group";
import { SidebarGroupContent } from "@/components/ui/sidebar/sidebar-group-content";
import { SidebarMenu } from "@/components/ui/sidebar/sidebar-menu";

import { MenuItem } from "../types";
import { NavItem } from "./nav-item";

export namespace NavFooter {
   export type Props = React.ComponentPropsWithoutRef<typeof SidebarGroup> & {
      items: MenuItem[];
   };
}

export const NavFooter = ({ items, ...props }: NavFooter.Props) => {
   return (
      <SidebarGroup {...props}>
         <SidebarGroupContent>
            <SidebarMenu>
               {items.map((item) => (
                  <NavItem
                     key={item.id}
                     item={item}
                     buttonProps={{ size: "sm" }}
                  />
               ))}
            </SidebarMenu>
         </SidebarGroupContent>
      </SidebarGroup>
   );
};
