import { useTranslation } from "react-i18next";
import { Fragment } from "react/jsx-runtime";

import { routesMap } from "@/app/routes";
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

   // Ensure that dashboard is displayed as its route is the root
   if (segments.length === 0) {
      segments.push("dashboard");
   }

   const { t } = useTranslation();

   return (
      <Breadcrumb>
         <BreadcrumbList>
            {segments.map((_, index) => {
               const path = segments.slice(0, index + 1).join("/");
               const elem = routesMap[path];
               if (!elem) {
                  return null;
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
