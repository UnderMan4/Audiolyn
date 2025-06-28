import { LucideIcon } from "lucide-react";
import { BetterLink } from "src/components/better-link";

import { Intl } from "@/i18n/types";
import { ToDiscoUnion } from "@/types/types";

export type MenuItem = {
   id: string;
   label: Intl.Key;
   icon: LucideIcon;
   items?: SubMenuItem[];
   defaultOpen?: boolean;
} & ToDiscoUnion<{
   button: { onClick: () => void };
   link: { to: BetterLink.To };
   dropdown: { items: SubMenuItem[] };
}>;

export type SubMenuItem = {
   id: string;
   label: Intl.Key;
   icon?: LucideIcon;
} & ToDiscoUnion<{
   button: { onClick: () => void };
   link: { to: BetterLink.To };
}>;
