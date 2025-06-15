import { useTranslation } from "react-i18next";

import { Switch } from "@/components/ui/switch";

import type { Route } from "./+types/home";

export function meta({}: Route.MetaArgs) {
   return [
      { title: "New React Router App" },
      { name: "description", content: "Welcome to React Router!" },
   ];
}

export default function Home() {
   const { t, i18n } = useTranslation();
   return (
      <div>
         {t("common.test")}
         <Switch
            checked={i18n.language === "pl_PL"}
            onCheckedChange={(e) => {
               i18n.changeLanguage(e ? "pl_PL" : "en");
            }}
         />
         <div className="grid auto-rows-min gap-4 md:grid-cols-3">
            <div className="bg-muted/50 aspect-video rounded-xl" />
            <div className="bg-muted/50 aspect-video rounded-xl" />
            <div className="bg-muted/50 aspect-video rounded-xl" />
         </div>
         <div className="bg-muted/50 h-[100vh] flex-1 rounded-xl" />
      </div>
   );
}
