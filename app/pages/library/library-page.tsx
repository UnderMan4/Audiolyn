import type { Route } from "./+types/library-page";

export function meta({}: Route.MetaArgs) {
   return [];
}

export default function LibraryPage() {
   return <div>Library</div>;
}
