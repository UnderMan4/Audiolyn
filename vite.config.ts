import { reactRouter } from "@react-router/dev/vite";
import tailwindcss from "@tailwindcss/vite";
import path from "path";
import { defineConfig } from "vite";
import devtoolsJson from "vite-plugin-devtools-json";
import tsConfigPaths from "vite-tsconfig-paths";

const host = process.env.TAURI_DEV_HOST;

// https://vitejs.dev/config/
export default defineConfig({
   plugins: [tailwindcss(), reactRouter(), tsConfigPaths(), devtoolsJson()],

   resolve: {
      alias: {
         "@": path.resolve(__dirname, "./src"),
      },
   },

   // Vite options tailored for Tauri development and only applied in `tauri dev` or `tauri build`
   //
   // 1. prevent vite from obscuring rust errors
   clearScreen: false,
   // 2. tauri expects a fixed port, fail if that port is not available
   server: {
      port: 1420,
      strictPort: true,
      host: host ?? false,
      hmr: host
         ? {
              protocol: "ws",
              host,
              port: 1421,
           }
         : undefined,
      watch: {
         // 3. tell vite to ignore watching `src-tauri`
         ignored: ["**/src-tauri/**", "**/pl.underman.audiolyn.app/**"],
      },
   },
});
