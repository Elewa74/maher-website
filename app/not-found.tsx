import { NotFoundContent } from '../components/sections/not-found-content';

// Fallback for addresses outside any locale during development. Static hosting serves 404.html,
// exported from the localized 404 (app/[locale]/[...missing]).
export default function NotFound() {
  return <NotFoundContent />;
}
