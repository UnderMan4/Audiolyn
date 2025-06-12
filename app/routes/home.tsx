import { AppSidebar } from "@/components/app-sidebar";

import type { Route } from "./+types/home";

export function meta({}: Route.MetaArgs) {
   return [
      { title: "New React Router App" },
      { name: "description", content: "Welcome to React Router!" },
   ];
}

export default function Home() {
   return (
      <div>
         <div className="grid auto-rows-min gap-4 md:grid-cols-3">
            <div className="bg-muted/50 aspect-video rounded-xl" />
            <div className="bg-muted/50 aspect-video rounded-xl" />
            <div className="bg-muted/50 aspect-video rounded-xl" />
         </div>
         <div className="bg-muted/50 h-[100vh] flex-1 rounded-xl md:min-h-min" />
      </div>
   );
}
