export const pascalToSnake = (str: string): string =>
   str
      .replace(/([A-Z])/g, "_$1")
      .replace(/^_/, "")
      .toLowerCase();
