import { describe, expect, it } from 'vitest';
import { renderToStaticMarkup } from 'react-dom/server';
import { createElement } from 'react';
import { HomeSections } from '../components/sections/home-sections';
import { siteContent } from '../content';
import { publicPaths } from '../lib/i18n';

function collectHrefs(value: unknown): string[] {
  if (Array.isArray(value)) return value.flatMap(collectHrefs);
  if (!value || typeof value !== 'object') return [];

  return Object.entries(value).flatMap(([key, child]) =>
    key === 'href' && typeof child === 'string' ? [child] : collectHrefs(child),
  );
}

function publicActions(locale: 'en' | 'ar') {
  const home = siteContent[locale].home;
  return [
    ...home.hero.actions,
    home.teachers.action,
    home.leaders.action,
    home.insights.action,
    ...home.finalCta.actions,
  ].filter((action): action is NonNullable<typeof action> => Boolean(action));
}

describe('public MAHER site contract', () => {
  it('removes access and authentication actions', () => {
    for (const locale of ['en', 'ar'] as const) {
      const destinations = [
        ...siteContent[locale].nav.map((item) => item.slug),
        ...publicActions(locale).flatMap((action) => [action.label, action.href]),
      ].join(' ');

      expect(destinations).not.toMatch(
        /log in|تسجيل الدخول|request access|اطلب الوصول|book a demo|احجز عرض|#request-access|\/login/i,
      );
      expect('login' in siteContent[locale].common).toBe(false);
      expect('requestAccess' in siteContent[locale].common).toBe(false);
    }
  });

  it('states the development-stage product status', () => {
    expect((siteContent.en.footer as { productStatus?: string }).productStatus).toBe(
      'This website presents MAHER’s target product experience during development. All names, data and results shown are illustrative.',
    );
    expect((siteContent.ar.footer as { productStatus?: string }).productStatus).toBe(
      'تعرض هذه الصفحة تصور تجربة منصة ماهر والخصائص المستهدفة أثناء مرحلة التطوير. جميع البيانات والأسماء والنتائج المعروضة أمثلة توضيحية.',
    );
  });

  it('keeps institutional capability claims future-oriented', () => {
    const copy = JSON.stringify(siteContent);

    expect(copy).not.toMatch(
      /currently integrated|certified compliant|live deployment|مطبق حالياً|معتمد رسمياً|يعمل حالياً/i,
    );
    expect(copy).not.toMatch(/SOAP|Kafka|database architecture/i);
  });

  it('keeps every public action on a valid route or the one approved home anchor', () => {
    for (const locale of ['en', 'ar'] as const) {
      const hrefs = collectHrefs(siteContent[locale]);
      const routeActions = hrefs.filter((href) => href.startsWith('/'));
      const anchorActions = hrefs.filter((href) => href.startsWith('#'));

      expect(routeActions.length).toBeGreaterThan(0);
      expect(routeActions.every((href) => publicPaths.includes(href))).toBe(true);
      expect(anchorActions).toEqual(['#adaptive-learning']);

      const html = renderToStaticMarkup(
        createElement(HomeSections, { locale, copy: siteContent[locale].home }),
      );
      expect((html.match(/id="adaptive-learning"/g) ?? [])).toHaveLength(1);
    }
  });
});
