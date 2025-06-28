import {
   SidebarGroup,
   SidebarGroupContent,
   SidebarMenu,
} from "src/components/ui";

import { MenuItem } from "../types";
import { NavItem } from "./nav-item";

export namespace NavMain {
   export type Props = React.ComponentPropsWithoutRef<typeof SidebarGroup> & {
      items: MenuItem[];
   };
}

export const NavMain = ({ items, ...props }: NavMain.Props) => {
   return (
      <SidebarGroup {...props}>
         <SidebarGroupContent>
            <SidebarMenu className="flex flex-col gap-2">
               {items.map((item) => (
                  <NavItem item={item} key={item.id} />
               ))}
            </SidebarMenu>
         </SidebarGroupContent>
      </SidebarGroup>
   );
};
