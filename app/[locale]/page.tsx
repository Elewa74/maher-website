import { notFound } from 'next/navigation';
import { getContent } from '../../content';
import { isLocale } from '../../lib/i18n';
import { HomeSections } from '../../components/sections/home-sections';

export default async function HomePage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  return (
    <main id="main-content">
      <HomeSections locale={locale} copy={getContent(locale).home} />
    </main>
  );
}
