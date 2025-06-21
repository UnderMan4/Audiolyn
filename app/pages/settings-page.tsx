import type { Route } from "./+types/settings-page";

export function meta({}: Route.MetaArgs) {
   return [];
}

export default function SettingsPage() {
   return <div>Settings</div>;
}
