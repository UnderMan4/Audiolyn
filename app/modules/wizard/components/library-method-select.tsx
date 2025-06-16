import {
   Select,
   SelectContent,
   SelectTrigger,
   SelectValue,
} from "@/components/ui";

export namespace LibraryMethodSelect {
   export type Props = Select.RootProps;
}

export const LibraryMethodSelect = ({
   ...props
}: LibraryMethodSelect.Props) => {
   return (
      <Select {...props} data-slot="library-method-select">
         <SelectTrigger>
            <SelectValue />
         </SelectTrigger>
         <SelectContent></SelectContent>
      </Select>
   );
};
