import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { getContent } from '../../content';
import { directionFor, isLocale, locales } from '../../lib/i18n';
import { SiteFooter } from '../../components/layout/site-footer';
import { SiteHeader } from '../../components/layout/site-header';
import { MotionEnhancer } from '../../components/motion/motion-enhancer';
import { buildPageMetadata, siteOrigin } from '../../lib/seo';
import '../globals.css';
import { withBase } from '../../lib/base-path';

const motionBoot = `(function(){try{var d=document.documentElement;if(!window.matchMedia||matchMedia('(prefers-reduced-motion: reduce)').matches)return;d.classList.add('motion-ready');var h=window.innerHeight*0.92;document.querySelectorAll('.reveal').forEach(function(e){if(e.getBoundingClientRect().top<h)e.classList.add('in-view')});setTimeout(function(){if(!window.__maherMotion)d.classList.remove('motion-ready')},6000)}catch(e){}})();`;

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  if (!isLocale(locale)) return {};
  return {
    metadataBase: new URL(siteOrigin),
    icons: {
      icon: [
        { url: withBase('/favicon.ico'), sizes: 'any' },
        { url: withBase('/favicon-32.png'), type: 'image/png', sizes: '32x32' },
        { url: withBase('/icon-192.png'), type: 'image/png', sizes: '192x192' },
      ],
      apple: withBase('/apple-touch-icon.png'),
    },
    other: { 'theme-color': '#0c1445' },
    ...buildPageMetadata(locale, 'home'),
  };
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const copy = getContent(locale);

  return (
    <html lang={locale} dir={directionFor(locale)} suppressHydrationWarning>
      <body>
        <a className="skip-link" href="#main-content">
          {locale === 'ar' ? 'انتقل إلى المحتوى' : 'Skip to content'}
        </a>
        <SiteHeader locale={locale} copy={copy} />
        {children}
        <SiteFooter locale={locale} copy={copy} />
        <MotionEnhancer />
        {/* Arms the motion layer at first paint; if the app never hydrates, content is restored after 6s. */}
        <script dangerouslySetInnerHTML={{ __html: motionBoot }} />
      </body>
    </html>
  );
}
