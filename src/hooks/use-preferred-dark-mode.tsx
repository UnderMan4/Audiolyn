import { getCurrentWindow } from "@tauri-apps/api/window";
import { useState } from "react";

import { useLayoutAsyncEffect } from "./use-async-effect";

export const usePreferredDarkMode = () => {
   const [isDark, setIsDark] = useState(false);

   useLayoutAsyncEffect(async () => {
      const window = getCurrentWindow();
      const darkMode = await window.theme();
      setIsDark(darkMode === "dark");

      const unlisten = await window.onThemeChanged((event) => {
         setIsDark(event.payload === "dark");
      });

      return unlisten;
   }, []);

   return isDark;
};
