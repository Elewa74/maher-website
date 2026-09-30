import type { ReactNode } from 'react';
import { Eyebrow } from '../common/eyebrow';
import { Reveal } from '../motion/reveal';

export function PageHero({ eyebrow, title, description, visual }: { eyebrow: string; title: string; description: string; visual?: ReactNode }) {
  return (
    <section className="page-hero"><div className="site-container page-hero__grid"><Reveal className="page-hero__copy"><Eyebrow>{eyebrow}</Eyebrow><h1>{title}</h1><p>{description}</p></Reveal>{visual ? <Reveal delay={0.12} className="page-hero__visual">{visual}</Reveal> : null}</div></section>
  );
}
