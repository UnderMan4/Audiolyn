export const pascalToSnake = (str: string): string =>
   str
      .replace(/([A-Z])/g, "_$1")
      .replace(/^_/, "")
      .toLowerCase();

export const stringConcat = (
   strings: (string | undefined)[],
   delimiter: string = ""
): string => strings.filter((s) => s && s.trim().length > 0).join(delimiter);
