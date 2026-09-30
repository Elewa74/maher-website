import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { InternalStoriesPage } from '../../../components/sections/feature-story';
import { getContent } from '../../../content';
import { isLocale } from '../../../lib/i18n';
import { buildPageMetadata } from '../../../lib/seo';

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  return isLocale(locale) ? buildPageMetadata(locale, 'platform') : {};
}

export default async function PlatformPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  return <InternalStoriesPage locale={locale} slug="platform" page={getContent(locale).pages.platform} />;
}
