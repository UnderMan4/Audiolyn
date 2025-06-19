import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";

export const useMyForm = (
   schema: z.ZodRawShape,
   defaultValues?: Record<string, unknown>
) => {
   const s = z.object(schema);
   const form = useForm<z.infer<typeof s>>({
      defaultValues: defaultValues,
      resolver: zodResolver(s),
      mode: "onChange",
   });

   return form;
};
