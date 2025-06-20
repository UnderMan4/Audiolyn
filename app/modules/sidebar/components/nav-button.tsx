import { ComponentPropsWithoutRef } from "react";
import { useTranslation } from "react-i18next";
import { Link } from "react-router";

import { BetterLink } from "@/components/better-link";
import { DropdownMenuTrigger, SidebarMenuButton } from "@/components/ui";

import { MenuItem } from "../types";

export namespace NavButton {
   export type LinkProps = ComponentPropsWithoutRef<typeof Link>;
   export type ButtonProps = ComponentPropsWithoutRef<"button">;
   export type DropdownProps = ComponentPropsWithoutRef<
      typeof DropdownMenuTrigger
   >;

   export type Props = ComponentPropsWithoutRef<typeof SidebarMenuButton> & {
      item: MenuItem;
   };
}

export const NavButton = ({ item, ...props }: NavButton.Props) => {
   const { t } = useTranslation();

   if (item.type === "link") {
      return (
         <SidebarMenuButton
            asChild
            tooltip={t(item.label)}
            size="default"
            {...props}
         >
            <BetterLink to={item.to}>
               <item.icon />
               <span>{t(item.label)}</span>
            </BetterLink>
         </SidebarMenuButton>
      );
   }

   if (item.type === "button") {
      return (
         <SidebarMenuButton
            asChild
            tooltip={t(item.label)}
            size="default"
            {...props}
         >
            <button onClick={item.onClick}>
               <item.icon />
               <span>{t(item.label)}</span>
            </button>
         </SidebarMenuButton>
      );
   }

   if (item.type === "dropdown") {
      return (
         <SidebarMenuButton
            asChild
            tooltip={t(item.label)}
            size="default"
            className="cursor-pointer"
            {...props}
         >
            <DropdownMenuTrigger>
               <item.icon />
               <span>{t(item.label)}</span>
            </DropdownMenuTrigger>
         </SidebarMenuButton>
      );
   }
};
