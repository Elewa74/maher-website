import type { HomeContent } from '../../content/types';
import { ButtonLink } from '../common/button-link';
import { Eyebrow } from '../common/eyebrow';
import { MaherCharacter } from '../common/maher-character';
import { Section } from '../layout/section';
import { Reveal } from '../motion/reveal';

/**
 * Closing call to action shared by the home page and every internal page.
 * `currentPath` drops the action that would link to the page the visitor is already on.
 */
export function ClosingCta({ copy, currentPath }: { copy: HomeContent['finalCta']; currentPath?: string }) {
  const actions = copy.actions.filter((action) => action.href !== currentPath);
  return (
    <Section className="final-cta-section">
      <Reveal className="final-cta-card">
        <MaherCharacter pose="happy" className="final-cta-character" />
        <div><Eyebrow>{copy.eyebrow}</Eyebrow><h2>{copy.title}</h2><p>{copy.description}</p></div>
        <div className="final-cta-actions">
          {actions.map((action, index) => <ButtonLink href={action.href} variant={index === 0 ? 'primary' : 'secondary'} key={action.label}>{action.label}</ButtonLink>)}
        </div>
      </Reveal>
    </Section>
  );
}
