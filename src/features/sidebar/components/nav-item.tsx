import { Collapsible, DropdownMenu, SidebarMenuItem } from "src/components/ui";

import { MenuItem } from "../types";
import { NavButton } from "./nav-button";
import { NavSubmenu } from "./nav-submenu";

export namespace NavItem {
   export type Props = {
      item: MenuItem;
      buttonProps?: Omit<
         React.ComponentPropsWithoutRef<typeof NavButton>,
         "item"
      >;
   };
}

export const NavItem = ({ item, buttonProps }: NavItem.Props) => {
   if (item.type === "link" || item.type === "button") {
      return (
         <Collapsible asChild defaultOpen={item.defaultOpen}>
            <SidebarMenuItem>
               <NavButton item={item} {...buttonProps} />
               <NavSubmenu item={item} />
            </SidebarMenuItem>
         </Collapsible>
      );
   }

   if (item.type === "dropdown") {
      return (
         <SidebarMenuItem>
            <DropdownMenu>
               <NavButton item={item} {...buttonProps} />
               <NavSubmenu item={item} />
            </DropdownMenu>
         </SidebarMenuItem>
      );
   }
};
