import {
   File,
   Files,
   Folder,
   Hash,
   Import,
   Languages,
   LayoutDashboard,
   LibraryBig,
   LifeBuoy,
   Send,
   Settings2,
   Tag,
   User,
} from "lucide-react";
import { useMemo } from "react";
import { useTranslation } from "react-i18next";

import { AUDIO_FILES_FILTER } from "@/config/filter-definitions";
import { useOpenDialog } from "@/hooks/use-open-dialog";
import { useRouter } from "@/hooks/use-router";

import { SidebarDefinitions } from "../types";

export const useSidebarDefinitions = () => {
   const { t } = useTranslation();
   const filesDialog = useOpenDialog({
      directory: false,
      multiple: true,
      filters: [AUDIO_FILES_FILTER],
      title: "common.openDialog.titles.importFiles",
   });

   const foldersDialog = useOpenDialog({
      directory: true,
      multiple: true,
      title: "common.openDialog.titles.importFolders",
   });
   const { navigate } = useRouter();

   return useMemo<SidebarDefinitions>(
      () => ({
         mainItems: [
            {
               id: "dashboard",
               icon: LayoutDashboard,
               label: t("common.sidebar.dashboard"),
               type: "link",
               to: "/",
            },
            {
               id: "library",
               icon: LibraryBig,
               label: t("common.sidebar.library"),
               type: "link",
               to: "library",
               items: [
                  {
                     id: "authors",
                     label: t("common.sidebar.authors"),
                     type: "link",
                     to: "library/authors",
                     icon: User,
                  },
                  {
                     id: "genres",
                     label: t("common.sidebar.genres"),
                     type: "link",
                     to: "library/genres",
                     icon: Tag,
                  },
                  {
                     id: "series",
                     label: t("common.sidebar.series"),
                     type: "link",
                     to: "library/series",
                     icon: Hash,
                  },
                  {
                     id: "languages",
                     label: t("common.sidebar.languages"),
                     type: "link",
                     to: "library/languages",
                     icon: Languages,
                  },
               ],
            },
         ],
         secondaryItems: [
            {
               id: "import",
               label: "Import",
               icon: Import,
               type: "dropdown",
               //TODO: Add translations for these labels
               items: [
                  {
                     id: "import-files-single",
                     label: "Import files",
                     description: "Single audiobook",
                     type: "button",
                     icon: File,
                     onClick: async () => {
                        const files = await filesDialog.open();
                        if (files) {
                           navigate({
                              pathname: "/import/files",
                              search: {
                                 singleAudiobook: true,
                                 data: files,
                              },
                           });
                        }
                     },
                  },
                  {
                     id: "import-files-multiple",
                     label: "Import files",
                     description: "Multiple audiobooks",
                     type: "button",
                     icon: Files,
                     onClick: async () => {
                        const files = await filesDialog.open();
                        if (files) {
                           navigate({
                              pathname: "/import/files",
                              search: {
                                 singleAudiobook: false,
                                 data: files,
                              },
                           });
                        }
                     },
                  },
                  {
                     id: "import-folders",
                     label: "Import Folders",
                     description: "Each folder as audiobook",
                     icon: Folder,
                     type: "button",
                     onClick: async () => {
                        const folders = await foldersDialog.open();
                        if (folders) {
                           navigate({
                              pathname: "/import/folders",
                              search: { data: folders },
                           });
                        }
                     },
                  },
               ],
            },
            {
               id: "settings",
               label: "Settings",
               icon: Settings2,
               type: "link",
               to: "settings",
            },
         ],
         footerItems: [
            {
               id: "support",
               label: "Support",
               icon: LifeBuoy,
               type: "link",
               to: "#",
            },
            {
               id: "feedback",
               label: "Feedback",
               icon: Send,
               type: "button",
               onClick: () => console.log("Feedback button clicked"),
            },
         ],
      }),
      [filesDialog, foldersDialog, navigate, t]
   );
};
