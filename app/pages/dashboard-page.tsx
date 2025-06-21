import type { Route } from "./+types/dashboard-page";

export function meta({}: Route.MetaArgs) {
   return [];
}

export default function DashboardPage() {
   return <div>Dashboard</div>;
}
