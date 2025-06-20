import {
   type RouteConfig,
   index,
   layout,
   prefix,
   route,
} from "@react-router/dev/routes";

export default [
   layout("layouts/titlebar-layout.tsx", [
      layout("layouts/main-layout.tsx", [
         index("pages/dashboard-page.tsx"),
         ...prefix("library", [
            index("pages/library/library-page.tsx"),
            route("authors", "pages/library/authors-page.tsx"),
            route("genres", "pages/library/genres-page.tsx"),
            route("languages", "pages/library/languages-page.tsx"),
            route("series", "pages/library/series-page.tsx"),
         ]),
         route("settings", "pages/settings-page.tsx"),
      ]),
      route("wizard", "pages/wizard-page.tsx"),
   ]),
] satisfies RouteConfig;
