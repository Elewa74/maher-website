import { MaherCharacter } from '../common/maher-character';
import { ButtonLink } from '../common/button-link';

/** Bilingual "page not found" view. Arabic first, since Arabic is the primary language. */
export function NotFoundContent() {
  return (
    <main id="main-content" className="not-found">
      <MaherCharacter pose="curious" className="not-found__character" eager />
      <span className="not-found__code">404</span>
      <h1 lang="ar" dir="rtl">هذه الصفحة غير موجودة.</h1>
      <p lang="ar" dir="rtl">يمكنك العودة إلى موقع ماهر.</p>
      <p lang="en" dir="ltr" className="not-found__en">There is no learning path here.</p>
      <div className="not-found__actions">
        <ButtonLink href="/">الرئيسية</ButtonLink>
        <ButtonLink href="/en" variant="secondary">English home</ButtonLink>
      </div>
    </main>
  );
}
