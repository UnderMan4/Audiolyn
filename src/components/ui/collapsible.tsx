import * as CollapsiblePrimitive from "@radix-ui/react-collapsible";
import React from "react";

export namespace Collapsible {
   export type RootProps = React.ComponentProps<
      typeof CollapsiblePrimitive.Root
   >;
   export type TriggerProps = React.ComponentProps<
      typeof CollapsiblePrimitive.CollapsibleTrigger
   >;
   export type ContentProps = React.ComponentProps<
      typeof CollapsiblePrimitive.CollapsibleContent
   >;
}

export const Collapsible = ({ ...props }: Collapsible.RootProps) => {
   return <CollapsiblePrimitive.Root data-slot="collapsible" {...props} />;
};

export const CollapsibleTrigger = ({ ...props }: Collapsible.TriggerProps) => {
   return (
      <CollapsiblePrimitive.CollapsibleTrigger
         data-slot="collapsible-trigger"
         {...props}
      />
   );
};

export const CollapsibleContent = ({ ...props }: Collapsible.ContentProps) => {
   return (
      <CollapsiblePrimitive.CollapsibleContent
         data-slot="collapsible-content"
         {...props}
      />
   );
};
