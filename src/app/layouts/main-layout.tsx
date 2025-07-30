import { useEffect } from "react";
import { Outlet, useNavigate } from "react-router";
import { Separator } from "src/components/ui/separator";
import { useSettingsStore } from "src/stores/settings-store";

import { SidebarInset } from "@/components/ui/sidebar/sidebar-inset";
import { SidebarProvider } from "@/components/ui/sidebar/sidebar-provider";
import { SidebarTrigger } from "@/components/ui/sidebar/sidebar-trigger";
import { Breadcrumbs } from "@/features/header/components/breadcrumbs";
import { AppSidebar } from "@/features/sidebar/components/app-sidebar";

export default () => {
   const navigate = useNavigate();
   const { flags } = useSettingsStore();
   useEffect(() => {
      if (flags.isFirstRun) {
         navigate("/wizard");
      }
   }, [flags.isFirstRun, navigate]);

   return (
      <SidebarProvider className="h-full overflow-hidden">
         <AppSidebar />
         <SidebarInset className="overflow-hidden min-h-0">
            <header className="flex h-16 shrink-0 items-center gap-2">
               <div className="flex items-center gap-2 px-4">
                  <SidebarTrigger className="-ml-1" />
                  <Separator
                     orientation="vertical"
                     className="mr-2 data-[orientation=vertical]:h-4"
                  />
                  <Breadcrumbs />
               </div>
            </header>
            <Separator className="mb-2" />
            {/* <div className="p-2 overflow-auto min-h-0"> */}
            <Outlet />
            {/* </div> */}
         </SidebarInset>
      </SidebarProvider>
   );
};
