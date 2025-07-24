import { useTranslation } from "react-i18next";
import { Fragment } from "react/jsx-runtime";

import { Routes, routesMap } from "@/app/routes";
import { BetterLink } from "@/components/better-link";
import {
   Breadcrumb,
   BreadcrumbItem,
   BreadcrumbLink,
   BreadcrumbList,
   BreadcrumbPage,
   BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { useRouter } from "@/hooks/use-router";

export const Breadcrumbs = () => {
   const { pathname } = useRouter();

   const segments = pathname.split("/").filter(Boolean);

   const { t } = useTranslation();

   return (
      <Breadcrumb>
         <BreadcrumbList>
            {segments.map((segment, index) => {
               const path = segments.slice(0, index + 1).join("/") as Routes;
               console.log("🚀 ~ {segments.map ~ path:", path);
               const elem = routesMap[path];
               console.log("🚀 ~ {segments.map ~ elem:", elem);
               if (!elem) {
                  return null; // Skip if no route definition found
               }

               if (index === segments.length - 1) {
                  return (
                     <Fragment key={path}>
                        <BreadcrumbItem className="hidden md:block">
                           <BreadcrumbPage>{t(elem.label)}</BreadcrumbPage>
                        </BreadcrumbItem>
                     </Fragment>
                  );
               }

               return (
                  <Fragment key={path}>
                     <BreadcrumbItem className="hidden md:block">
                        <BreadcrumbLink to={elem.path}>
                           {t(elem.label)}
                        </BreadcrumbLink>
                     </BreadcrumbItem>
                     <BreadcrumbSeparator className="hidden md:block" />
                  </Fragment>
               );
            })}
         </BreadcrumbList>
      </Breadcrumb>
   );
};
