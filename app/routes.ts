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
         index("routes/dashboard.tsx"),
         ...prefix("library", [
            index("routes/library/library.tsx"),
            route("authors", "routes/library/authors.tsx"),
            route("genres", "routes/library/genres.tsx"),
            route("languages", "routes/library/languages.tsx"),
            route("series", "routes/library/series.tsx"),
         ]),
         route("settings", "routes/settings.tsx"),
      ]),
      route("wizard", "routes/wizard.tsx"),
   ]),
] satisfies RouteConfig;
