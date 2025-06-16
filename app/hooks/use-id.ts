import React from "react";

export const useId = (id?: string): string => {
   const generatedId = React.useId();
   return id ?? generatedId;
};
