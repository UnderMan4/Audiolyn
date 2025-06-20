import * as React from "react";

import {
   Sidebar,
   SidebarContent,
   SidebarFooter,
   SidebarSeparator,
} from "@/components/ui";

import { footerItems, mainItems, secondaryItems } from "../sidebar-definitions";
import { NavFooter } from "./nav-footer";
import { NavMain } from "./nav-main";
import { NavSecondary } from "./nav-secondary";

export namespace AppSidebar {
   export type Props = React.ComponentProps<typeof Sidebar>;
}

export function AppSidebar({ ...props }: AppSidebar.Props) {
   return (
      <Sidebar variant="floating" {...props}>
         <SidebarContent>
            <NavMain items={mainItems} />
            <NavSecondary items={secondaryItems} className="mt-auto" />
         </SidebarContent>
         <SidebarSeparator />
         <SidebarFooter>
            <NavFooter items={footerItems} />
         </SidebarFooter>
      </Sidebar>
   );
}
