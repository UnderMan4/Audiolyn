import * as React from "react";

import { Sidebar } from "@/components/ui/sidebar/sidebar";
import { SidebarContent } from "@/components/ui/sidebar/sidebar-content";
import { SidebarFooter } from "@/components/ui/sidebar/sidebar-footer";
import { SidebarSeparator } from "@/components/ui/sidebar/sidebar-separator";

import { useSidebarDefinitions } from "../hooks/use-sidebar-definitions";
import { NavFooter } from "./nav-footer";
import { NavMain } from "./nav-main";
import { NavSecondary } from "./nav-secondary";

export namespace AppSidebar {
   export type Props = React.ComponentProps<typeof Sidebar>;
}

export function AppSidebar({ ...props }: AppSidebar.Props) {
   const { mainItems, secondaryItems, footerItems } = useSidebarDefinitions();
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
