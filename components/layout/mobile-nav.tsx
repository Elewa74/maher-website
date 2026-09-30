'use client';

import { Globe, Menu } from 'lucide-react';
import type { SiteContent } from '../../content';
import type { Locale } from '../../lib/i18n';
import { localizedPath } from '../../lib/i18n';
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '../ui/sheet';
import { Brand } from '../common/brand';
import { withBase } from '../../lib/base-path';

export function MobileNav({ locale, copy, pathname }: { locale: Locale; copy: SiteContent; pathname: string }) {
  const otherLocale = locale === 'en' ? 'ar' : 'en';
  const cta = copy.home.finalCta.actions[0];
  return (
    <Sheet>
      <SheetTrigger className="mobile-menu-trigger" aria-label={copy.common.menu}>
        <Menu size={20} strokeWidth={1.75} />
      </SheetTrigger>
      <SheetContent side={locale === 'ar' ? 'left' : 'right'} className="mobile-menu-panel" showCloseButton>
        <SheetHeader>
          <SheetTitle><Brand href={`/${locale}`} /></SheetTitle>
          <SheetDescription>{copy.brand.statement}</SheetDescription>
        </SheetHeader>
        <nav className="mobile-menu-links" aria-label={copy.common.menu}>
          {copy.nav.map((item) => {
            const href = `/${locale}${item.slug ? `/${item.slug}` : ''}`;
            return (
              <SheetClose
                key={item.slug}
                nativeButton={false}
                render={<a href={withBase(href)} aria-label={item.label} aria-current={pathname === href ? 'page' : undefined} />}
              >
                {item.label}
              </SheetClose>
            );
          })}
        </nav>
        <div className="mobile-menu-actions">
          <a className="mobile-menu-cta" href={withBase(cta.href)}>{cta.label}</a>
          <a className="mobile-menu-language" href={withBase(localizedPath(otherLocale, pathname))} lang={otherLocale} hrefLang={otherLocale}>
            <Globe aria-hidden="true" size={16} strokeWidth={1.75} />
            {copy.common.language}
          </a>
        </div>
      </SheetContent>
    </Sheet>
  );
}
