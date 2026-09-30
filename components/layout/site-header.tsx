'use client';

import { ArrowRight, Globe } from 'lucide-react';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';
import type { SiteContent } from '../../content';
import { localeHref, localizedPath, type Locale } from '../../lib/i18n';
import { Brand } from '../common/brand';
import { MobileNav } from './mobile-nav';
import { routePath, withBase } from '../../lib/base-path';

export function SiteHeader({ locale, copy }: { locale: Locale; copy: SiteContent }) {
  const pathname = routePath(usePathname());
  const [compact, setCompact] = useState(false);
  const otherLocale = locale === 'en' ? 'ar' : 'en';
  const cta = copy.home.finalCta.actions[0];

  useEffect(() => {
    const update = () => setCompact(window.scrollY > 24);
    update();
    window.addEventListener('scroll', update, { passive: true });
    return () => window.removeEventListener('scroll', update);
  }, []);

  return (
    <header className={`site-header ${compact ? 'is-compact' : ''}`}>
      <div className="site-header__inner">
        <Brand href={localeHref(locale)} />
        <nav className="desktop-nav" aria-label={locale === 'ar' ? 'التنقل الرئيسي' : 'Primary navigation'}>
          {copy.nav.map((item) => {
            const href = localeHref(locale, item.slug);
            const current = pathname === href;
            return <a href={withBase(href)} aria-current={current ? 'page' : undefined} key={item.slug}>{item.label}</a>;
          })}
        </nav>
        <div className="site-header__actions">
          <a className="language-link" href={withBase(localizedPath(otherLocale, pathname))} lang={otherLocale} hrefLang={otherLocale}>
            <Globe aria-hidden="true" size={16} strokeWidth={1.75} />
            <span>{copy.common.language}</span>
          </a>
          <a className="header-cta" href={withBase(cta.href)}>
            <span>{cta.label}</span>
            <ArrowRight aria-hidden="true" size={16} className="directional-icon" />
          </a>
          <MobileNav locale={locale} copy={copy} pathname={pathname} />
        </div>
      </div>
      <span className="site-header__progress" aria-hidden="true" />
    </header>
  );
}
