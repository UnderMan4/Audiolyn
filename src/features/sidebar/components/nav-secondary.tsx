import { SidebarGroup } from "@/components/ui/sidebar/sidebar-group";
import { SidebarGroupContent } from "@/components/ui/sidebar/sidebar-group-content";
import { SidebarMenu } from "@/components/ui/sidebar/sidebar-menu";

import { MenuItem } from "../types";
import { NavItem } from "./nav-item";

export namespace NavSecondary {
   export type Props = React.ComponentPropsWithoutRef<typeof SidebarGroup> & {
      items: MenuItem[];
   };
}

export const NavSecondary = ({ items, ...props }: NavSecondary.Props) => {
   return (
      <SidebarGroup {...props}>
         <SidebarGroupContent>
            <SidebarMenu>
               {items.map((item) => (
                  <NavItem item={item} key={item.id} />
               ))}
            </SidebarMenu>
         </SidebarGroupContent>
      </SidebarGroup>
   );
};
