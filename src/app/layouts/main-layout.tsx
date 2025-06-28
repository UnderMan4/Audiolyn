import { useEffect } from "react";
import { Outlet, useNavigate } from "react-router";
import {
   SidebarInset,
   SidebarProvider,
   SidebarTrigger,
} from "src/components/ui";
import {
   Breadcrumb,
   BreadcrumbItem,
   BreadcrumbLink,
   BreadcrumbList,
   BreadcrumbPage,
   BreadcrumbSeparator,
} from "src/components/ui/breadcrumb";
import { Separator } from "src/components/ui/separator";
import { useSettingsStore } from "src/stores/settings-store";

import { AppSidebar } from "@/features/sidebar";

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
                  <Breadcrumb>
                     <BreadcrumbList>
                        <BreadcrumbItem className="hidden md:block">
                           <BreadcrumbLink href="#">
                              Building Your Application
                           </BreadcrumbLink>
                        </BreadcrumbItem>
                        <BreadcrumbSeparator className="hidden md:block" />
                        <BreadcrumbItem>
                           <BreadcrumbPage>Data Fetching</BreadcrumbPage>
                        </BreadcrumbItem>
                     </BreadcrumbList>
                  </Breadcrumb>
               </div>
            </header>
            <Separator className="mb-2" />
            <div className="p-2 overflow-auto min-h-0">
               <Outlet />
            </div>
         </SidebarInset>
      </SidebarProvider>
   );
};
