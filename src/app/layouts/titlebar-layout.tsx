import { Outlet } from "react-router";

import { Titlebar } from "@/components/ui/titlebar/titlebar";

export default function TitlebarLayout() {
   return (
      <>
         <Titlebar />
         <div className="h-svh pt-(--titlebar-height)">
            <Outlet />
         </div>
      </>
   );
}
