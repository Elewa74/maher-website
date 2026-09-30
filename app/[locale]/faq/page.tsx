import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { FaqAccordion } from '../../../components/sections/faq-accordion';
import { PageHero } from '../../../components/layout/page-hero';
import { Section } from '../../../components/layout/section';
import { MaherCharacter } from '../../../components/common/maher-character';
import { ClosingCta } from '../../../components/sections/closing-cta';
import { getContent } from '../../../content';
import { isLocale } from '../../../lib/i18n';
import { buildPageMetadata } from '../../../lib/seo';

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  return isLocale(locale) ? buildPageMetadata(locale, 'faq') : {};
}

export default async function FaqPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const copy = getContent(locale);
  const page = copy.pages.faq;
  return (
    <main id="main-content" className="faq-page">
      <PageHero eyebrow={page.eyebrow} title={page.title} description={page.description} visual={<MaherCharacter pose="thinking" className="faq-hero-character" eager />} />
      <Section className="site-section--white"><FaqAccordion items={copy.faqs} /></Section>
      <ClosingCta copy={copy.home.finalCta} />
    </main>
  );
}
