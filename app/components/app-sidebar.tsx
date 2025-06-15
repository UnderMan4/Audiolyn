import {
   BookOpen,
   Bot,
   Command,
   Frame,
   LayoutDashboard,
   LibraryBig,
   LifeBuoy,
   Map,
   PieChart,
   Send,
   Settings2,
   SquareTerminal,
} from "lucide-react";
import * as React from "react";

import { NavMain } from "@/components/nav-main";
import { NavProjects } from "@/components/nav-projects";
import { NavSecondary } from "@/components/nav-secondary";

import {
   Sidebar,
   SidebarContent,
   SidebarFooter,
   SidebarHeader,
   SidebarMenu,
   SidebarMenuButton,
   SidebarMenuItem,
} from "./ui";

const data = {
   navMain: [
      {
         title: "Playground",
         url: "#",
         icon: SquareTerminal,
         isActive: true,
         items: [
            {
               title: "History",
               url: "#",
            },
            {
               title: "Starred",
               url: "#",
            },
            {
               title: "Settings",
               url: "#",
            },
         ],
      },
      {
         title: "Models",
         url: "#",
         icon: Bot,
         items: [
            {
               title: "Genesis",
               url: "#",
            },
            {
               title: "Explorer",
               url: "#",
            },
            {
               title: "Quantum",
               url: "#",
            },
         ],
      },
      {
         title: "Documentation",
         url: "#",
         icon: BookOpen,
         items: [
            {
               title: "Introduction",
               url: "#",
            },
            {
               title: "Get Started",
               url: "#",
            },
            {
               title: "Tutorials",
               url: "#",
            },
            {
               title: "Changelog",
               url: "#",
            },
         ],
      },
      {
         title: "Settings",
         url: "#",
         icon: Settings2,
         items: [
            {
               title: "General",
               url: "#",
            },
            {
               title: "Team",
               url: "#",
            },
            {
               title: "Billing",
               url: "#",
            },
            {
               title: "Limits",
               url: "#",
            },
         ],
      },
   ],
   navSecondary: [
      {
         title: "Support",
         url: "#",
         icon: LifeBuoy,
      },
      {
         title: "Feedback",
         url: "#",
         icon: Send,
      },
   ],
   projects: [
      {
         name: "Design Engineering",
         url: "#",
         icon: Frame,
      },
      {
         name: "Sales & Marketing",
         url: "#",
         icon: PieChart,
      },
      {
         name: "Travel",
         url: "#",
         icon: Map,
      },
   ],
};

const navMain: NavMain.Item[] = [
   {
      icon: LayoutDashboard,
      title: "common.sidebar.dashboard",
      url: "dashboard",
   },
   {
      icon: LibraryBig,
      title: "common.sidebar.library",
      url: "library",
      items: [
         {
            title: "common.sidebar.authors",
            url: "library/authors",
         },
         {
            title: "common.sidebar.genres",
            url: "library/genres",
         },
         {
            title: "common.sidebar.series",
            url: "library/series",
         },
         {
            title: "common.sidebar.languages",
            url: "library/languages",
         },
      ],
   },
];

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
   return (
      <Sidebar variant="floating" {...props}>
         <SidebarHeader>
            <SidebarMenu>
               <SidebarMenuItem>
                  <SidebarMenuButton size="lg" asChild>
                     <a href="#">
                        <div className="bg-sidebar-primary text-sidebar-primary-foreground flex aspect-square size-8 items-center justify-center rounded-lg">
                           <Command className="size-4" />
                        </div>
                        <div className="grid flex-1 text-left text-sm leading-tight">
                           <span className="truncate font-medium">
                              Acme Inc
                           </span>
                           <span className="truncate text-xs">Enterprise</span>
                        </div>
                     </a>
                  </SidebarMenuButton>
               </SidebarMenuItem>
            </SidebarMenu>
         </SidebarHeader>
         <SidebarContent>
            <NavMain items={navMain} />
            <NavProjects projects={data.projects} />
            <NavSecondary items={data.navSecondary} className="mt-auto" />
         </SidebarContent>
         <SidebarFooter className="hidden">
            {/* <NavUser user={data.user} /> */}
         </SidebarFooter>
      </Sidebar>
   );
}
