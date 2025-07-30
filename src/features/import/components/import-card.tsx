import { LucideIcon } from "lucide-react";

import { BetterLink } from "@/components/better-link";
import { cn } from "@/lib/style-utils";

export namespace ImportCard {
   export type Props = BetterLink.Props & {
      icon: LucideIcon;
      label: string;
   };
}

export const ImportCard = ({
   icon: Icon,
   label,
   className,
   ...props
}: ImportCard.Props) => {
   return (
      <BetterLink
         className={cn(
            "flex items-center flex-col gap-4 flex-1",
            "max-w-3xs",
            "p-4 rounded-2xl",
            "bg-muted",
            className
         )}
         {...props}
      >
         <Icon size={64} className="text-muted-foreground" />
         <div className="flex items-center justify-center gap-2 grow">
            <span className="text-center font-bold text-lg">{label}</span>
         </div>
      </BetterLink>
   );
};
