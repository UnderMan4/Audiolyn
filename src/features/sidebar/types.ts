import { LucideIcon } from "lucide-react";
import { BetterLink } from "src/components/better-link";

import { ToDiscoUnion } from "@/types/types";

export type MenuItem = {
   id: string;
   label: string;
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
   label: string;
   icon?: LucideIcon;
} & ToDiscoUnion<{
   button: { onClick: () => void };
   link: { to: BetterLink.To };
}>;
