import type { Route } from "./+types/authors-page";

export function meta({}: Route.MetaArgs) {
   return [];
}

export default function AuthorsPage() {
   return <div>Authors</div>;
}
