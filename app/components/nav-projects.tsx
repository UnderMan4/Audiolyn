import {
   Folder,
   type LucideIcon,
   MoreHorizontal,
   Share,
   Trash2,
} from "lucide-react";
import { useTranslation } from "react-i18next";

import {
   DropdownMenu,
   DropdownMenuContent,
   DropdownMenuItem,
   DropdownMenuSeparator,
   DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import {
   SidebarGroup,
   SidebarGroupLabel,
   SidebarMenu,
   SidebarMenuAction,
   SidebarMenuButton,
   SidebarMenuItem,
   useSidebarContext,
} from "./ui";
import { Switch } from "./ui/switch";

export function NavProjects({
   projects,
}: {
   projects: {
      name: string;
      url: string;
      icon: LucideIcon;
   }[];
}) {
   const { isMobile } = useSidebarContext();
   const { i18n } = useTranslation();

   return (
      <SidebarGroup className="group-data-[collapsible=icon]:hidden">
         <SidebarGroupLabel>Projects</SidebarGroupLabel>
         <SidebarMenu>
            <Switch
               checked={i18n.language === "pl_PL"}
               onCheckedChange={(e) => {
                  i18n.changeLanguage(e ? "pl_PL" : "en");
               }}
            />
            {projects.map((item) => (
               <SidebarMenuItem key={item.name}>
                  <SidebarMenuButton asChild>
                     <a href={item.url}>
                        <item.icon />
                        <span>{item.name}</span>
                     </a>
                  </SidebarMenuButton>
                  <DropdownMenu>
                     <DropdownMenuTrigger asChild>
                        <SidebarMenuAction showOnHover>
                           <MoreHorizontal />
                           <span className="sr-only">More</span>
                        </SidebarMenuAction>
                     </DropdownMenuTrigger>
                     <DropdownMenuContent
                        className="w-48"
                        side={isMobile ? "bottom" : "right"}
                        align={isMobile ? "end" : "start"}
                     >
                        <DropdownMenuItem>
                           <Folder className="text-muted-foreground" />
                           <span>View Project</span>
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                           <Share className="text-muted-foreground" />
                           <span>Share Project</span>
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem>
                           <Trash2 className="text-muted-foreground" />
                           <span>Delete Project</span>
                        </DropdownMenuItem>
                     </DropdownMenuContent>
                  </DropdownMenu>
               </SidebarMenuItem>
            ))}
            <SidebarMenuItem>
               <SidebarMenuButton>
                  <MoreHorizontal />
                  <span>More</span>
               </SidebarMenuButton>
            </SidebarMenuItem>
         </SidebarMenu>
      </SidebarGroup>
   );
}
