'use client';

import type { FaqItem } from '../../content/types';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '../ui/accordion';

export function FaqAccordion({ items }: { items: FaqItem[] }) {
  return (
    <Accordion className="faq-accordion">
      {items.map((item, index) => (
        <AccordionItem value={`faq-${index}`} className="faq-item" key={item.question}>
          <AccordionTrigger className="faq-trigger" headingLevel={2}><span>{String(index + 1).padStart(2, '0')}</span><strong>{item.question}</strong></AccordionTrigger>
          <AccordionContent className="faq-content"><p>{item.answer}</p></AccordionContent>
        </AccordionItem>
      ))}
    </Accordion>
  );
}
