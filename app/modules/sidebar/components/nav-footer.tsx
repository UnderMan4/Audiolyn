import React from "react";

import {
   SidebarGroup,
   SidebarGroupContent,
   SidebarMenu,
} from "@/components/ui";

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
