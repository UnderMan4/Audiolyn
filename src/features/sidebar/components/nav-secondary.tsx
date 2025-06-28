import {
   SidebarGroup,
   SidebarGroupContent,
   SidebarMenu,
} from "src/components/ui";

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
