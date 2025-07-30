import {
   type RouteConfig,
   index,
   layout,
   prefix,
   route,
} from "@react-router/dev/routes";

import { Intl } from "@/i18n/types";

const libraryRoutes = prefix("library", [
   index("pages/library/library-page.tsx"),
   route("authors", "pages/library/authors-page.tsx"),
   route("genres", "pages/library/genres-page.tsx"),
   route("languages", "pages/library/languages-page.tsx"),
   route("series", "pages/library/series-page.tsx"),
]);

const importRoutes = prefix("import", [
   route("files", "pages/import/import-files-page.tsx"),
   route("folders", "pages/import/import-folders-page.tsx"),
]);

export default [
   layout("layouts/titlebar-layout.tsx", [
      layout("layouts/main-layout.tsx", [
         index("pages/dashboard-page.tsx"),
         route("settings", "pages/settings-page.tsx"),
         ...libraryRoutes,
         ...importRoutes,
      ]),
      route("wizard", "pages/wizard-page.tsx"),
   ]),
] satisfies RouteConfig;

export type RouteDefinition = {
   label: Intl.Key;
   path?: string;
};

export const routesMap: Record<string, RouteDefinition> = {
   dashboard: {
      label: "common.breadcrumbs.dashboard.index",
      path: "/dashboard",
   },
   library: {
      label: "common.breadcrumbs.library.index",
      path: "/library",
   },
   "library/authors": {
      label: "common.breadcrumbs.library.authors",
      path: "/library/authors",
   },
   "library/genres": {
      label: "common.breadcrumbs.library.genres",
      path: "/library/genres",
   },
   "library/languages": {
      label: "common.breadcrumbs.library.languages",
      path: "/library/languages",
   },
   "library/series": {
      label: "common.breadcrumbs.library.series",
      path: "/library/series",
   },
   import: {
      label: "common.breadcrumbs.import.index",
   },
   "import/files": {
      label: "common.breadcrumbs.import.files",
      path: "/import/files",
   },
   "import/folders": {
      label: "common.breadcrumbs.import.folders",
      path: "/import/folders",
   },
   settings: {
      label: "common.breadcrumbs.settings.index",
      path: "/settings",
   },
};
