export const detectImageMimeType = (bytes: Uint8Array) => {
   // Read first 4 bytes as hex
   const hex = Array.from(bytes.subarray(0, 4))
      .map((b) => b.toString(16).padStart(2, "0"))
      .join("")
      .toUpperCase();

   if (hex === "89504E47") {
      return "image/png" as const;
   } else if (hex.startsWith("FFD8FF")) {
      return "image/jpeg" as const;
   } else if (hex === "47494638") {
      // 'GIF8'
      return "image/gif" as const;
   } else if (hex.startsWith("424D")) {
      // 'BM'
      return "image/bmp" as const;
   } else if (hex === "49492A00" || hex === "4D4D002A") {
      // TIFF
      return "image/tiff" as const;
   } else if (hex === "00000100") {
      // ICO
      return "image/x-icon" as const;
   } else if (hex === "52494646") {
      // 'RIFF'
      // Check for "WEBP" at offset 8–11
      const header = Array.from(bytes.subarray(8, 12))
         .map((b) => b.toString(16).padStart(2, "0"))
         .join("")
         .toUpperCase();
      if (header === "57454250") {
         // 'WEBP'
         return "image/webp" as const;
      }
   }
   return undefined; // unknown type
};
