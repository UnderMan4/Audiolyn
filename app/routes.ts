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
         index("routes/home.tsx"),
         route("dashboard", "routes/dashboard.tsx"),
         ...prefix("library", [
            index("routes/library.tsx"),
            route("authors", "routes/authors.tsx"),
            route("genres", "routes/genres.tsx"),
            route("languages", "routes/languages.tsx"),
            route("series", "routes/series.tsx"),
         ]),
      ]),
   ]),
] satisfies RouteConfig;
