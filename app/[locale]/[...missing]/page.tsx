import { notFound } from 'next/navigation';

// Any unknown address inside a language renders the localized 404 (app/[locale]/not-found.tsx).
export default function MissingPage() {
  notFound();
}
