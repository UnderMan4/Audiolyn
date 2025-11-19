export const getFirstNonNull = <T>(
   ...values: (T | null | undefined)[]
): T | undefined => {
   for (const value of values) {
      if (value) {
         return value;
      }
   }
   return undefined;
};
