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

import { MenuItem } from "./types";

export const mainItems: MenuItem[] = [
   {
      id: "dashboard",
      icon: LayoutDashboard,
      label: "common.sidebar.dashboard",
      type: "link",
      to: {
         pathname: "/",
         search: {
            string: "string",
            number: 123,
            boolean: true,
            date: new Date(),
         },
      },
   },
   {
      id: "library",
      icon: LibraryBig,
      label: "common.sidebar.library",
      type: "link",
      to: "library",
      items: [
         {
            id: "authors",
            label: "common.sidebar.authors",
            type: "link",
            to: "library/authors",
            icon: User,
         },
         {
            id: "genres",
            label: "common.sidebar.genres",
            type: "link",
            to: "library/genres",
            icon: Tag,
         },
         {
            id: "series",
            label: "common.sidebar.series",
            type: "link",
            to: "library/series",
            icon: Hash,
         },
         {
            id: "languages",
            label: "common.sidebar.languages",
            type: "link",
            to: "library/languages",
            icon: Languages,
         },
      ],
   },
];

export const secondaryItems: MenuItem[] = [
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
            type: "link",
            icon: File,
            to: {
               pathname: "/import/files",
               search: { singleAudiobook: true },
            },
         },
         {
            id: "import-files-multiple",
            label: "Import files",
            description: "Multiple audiobooks",
            type: "link",
            icon: Files,
            to: {
               pathname: "/import/files",
               search: { singleAudiobook: false },
            },
         },
         {
            id: "import-folders",
            label: "Import Folders",
            description: "Each folder as audiobook",
            icon: Folder,
            type: "link",
            to: "/import/folders",
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
];

export const footerItems: MenuItem[] = [
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
];
