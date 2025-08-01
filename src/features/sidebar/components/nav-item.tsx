import { Collapsible } from "@/components/ui/collapsible";
import { DropdownMenu } from "@/components/ui/dropdown-menu";
import { SidebarMenuItem } from "@/components/ui/sidebar/sidebar-menu-item";

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
