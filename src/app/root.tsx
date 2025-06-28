import * as path from "@tauri-apps/api/path";
import { useEffect } from "react";
import {
   Links,
   Meta,
   Outlet,
   Scripts,
   ScrollRestoration,
   isRouteErrorResponse,
} from "react-router";

import { LIBRARY_DIRECTORY } from "../config/constants";
import { useAsyncEffect, usePreferredDarkMode } from "../hooks";
import "../i18n/i18n";
import {
   settingsStoreHandler,
   useSettingsStore,
} from "../stores/settings-store";
import type { Route } from "./+types/root";
import "./app.css";

export const links: Route.LinksFunction = () => [
   { rel: "preconnect", href: "https://fonts.googleapis.com" },
   {
      rel: "preconnect",
      href: "https://fonts.gstatic.com",
      crossOrigin: "anonymous",
   },
   {
      rel: "stylesheet",
      href: "https://fonts.googleapis.com/css2?family=Inter:ital,opsz,wght@0,14..32,100..900;1,14..32,100..900&display=swap",
   },
];

export function Layout({ children }: { children: React.ReactNode }) {
   const { libraryLocation, setLibraryLocation, theme } = useSettingsStore();
   useEffect(() => {
      settingsStoreHandler.start();
   }, []);

   useAsyncEffect(async () => {
      if (libraryLocation.trim() === "") {
         const homeDir = await path.homeDir();
         const libraryPath = await path.join(homeDir, LIBRARY_DIRECTORY);
         setLibraryLocation(libraryPath);
      }
   }, []);

   const isPreferredDarkMode = usePreferredDarkMode();
   return (
      <html lang="en">
         <head>
            <meta charSet="utf-8" />
            <meta
               name="viewport"
               content="width=device-width, initial-scale=1"
            />
            <Meta />
            <Links />
         </head>
         <body
            className={
               theme === "system"
                  ? isPreferredDarkMode
                     ? "dark"
                     : "light"
                  : theme
            }
         >
            {import.meta.env.DEV && <script src="http://localhost:8097" />}
            {children}
            <ScrollRestoration />
            <Scripts />
         </body>
      </html>
   );
}

export default function App() {
   return <Outlet />;
}

export function ErrorBoundary({ error }: Route.ErrorBoundaryProps) {
   let message = "Oops!";
   let details = "An unexpected error occurred.";
   let stack: string | undefined;

   if (isRouteErrorResponse(error)) {
      message = error.status === 404 ? "404" : "Error";
      details =
         error.status === 404
            ? "The requested page could not be found."
            : error.statusText || details;
   } else if (import.meta.env.DEV && error && error instanceof Error) {
      details = error.message;
      stack = error.stack;
   }

   return (
      <main className="pt-16 p-4 container mx-auto">
         <h1>{message}</h1>
         <p>{details}</p>
         {stack && (
            <pre className="w-full p-4 overflow-x-auto">
               <code>{stack}</code>
            </pre>
         )}
      </main>
   );
}
