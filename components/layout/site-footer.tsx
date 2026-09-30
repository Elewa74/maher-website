import { Globe } from 'lucide-react';
import type { SiteContent } from '../../content';
import { localeHref, type Locale } from '../../lib/i18n';
import { Brand } from '../common/brand';
import { withBase } from '../../lib/base-path';

export function SiteFooter({ locale, copy }: { locale: Locale; copy: SiteContent }) {
  const otherLocale = locale === 'en' ? 'ar' : 'en';
  return (
    <footer className="site-footer">
      <div className="site-container site-footer__main">
        <div className="site-footer__brand">
          <Brand href={localeHref(locale)} tone="dark" />
          <p>{copy.brand.statement}</p>
          <a className="site-footer__language" href={withBase(localeHref(otherLocale))} lang={otherLocale} hrefLang={otherLocale}>
            <Globe aria-hidden="true" size={15} strokeWidth={1.75} />
            {copy.common.language}
          </a>
        </div>
        <nav aria-label={locale === 'ar' ? 'روابط التذييل' : 'Footer navigation'}>
          {copy.nav.slice(1).map((item) => <a key={item.slug} href={withBase(localeHref(locale, item.slug))}>{item.label}</a>)}
        </nav>
      </div>
      <div className="site-container site-footer__status">{copy.footer.productStatus}</div>
      <div className="site-container site-footer__base"><span>{copy.footer.note}</span><span>© 2026 MAHER. {copy.footer.rights}</span></div>
    </footer>
  );
}
