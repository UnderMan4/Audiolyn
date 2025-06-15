import { LayoutDashboard } from "lucide-react";

import { NavMain } from "@/components/nav-main";

export const sidebarMain: NavMain.Item[] = [
   {
      icon: LayoutDashboard,
      title: "Dashboard",
      url: "/",
      isActive: true,
   },
];
