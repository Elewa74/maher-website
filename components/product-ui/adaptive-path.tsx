import { Brain, PencilLine, Sparkles, Trophy } from 'lucide-react';
import type { Locale } from '../../lib/i18n';
import { MaherCharacter } from '../common/maher-character';

const icons = [Brain, PencilLine, Sparkles, Trophy];
/** Illustrative state: the learner has understood and practised, and is now being supported. */
const CURRENT = 2;

export function AdaptivePath({ locale }: { locale: Locale }) {
  const steps = locale === 'ar' ? ['يفهم', 'يمارس', 'يحصل على الدعم', 'يتقدّم'] : ['Understand', 'Practise', 'Support', 'Progress'];
  return (
    <div className="adaptive-path" aria-label={locale === 'ar' ? 'دورة التعلّم التكيفية' : 'Adaptive learning cycle'}>
      <div className="adaptive-path__track" aria-hidden="true"><i /></div>
      {steps.map((step, index) => {
        const Icon = icons[index];
        const state = index < CURRENT ? 'is-done' : index === CURRENT ? 'is-current' : 'is-next';
        return (
          <div className={`adaptive-path__step ${state}`} key={step}>
            {index === CURRENT ? <MaherCharacter pose="happy" size="sm" className="adaptive-path__character" /> : null}
            <span className="adaptive-path__node"><Icon size={22} /></span>
            <b>{String(index + 1).padStart(2, '0')}</b>
            <strong>{step}</strong>
          </div>
        );
      })}
      {/* Support loops back into practice before the learner moves on. */}
      <svg className="adaptive-path__loop" viewBox="0 0 200 60" preserveAspectRatio="none" aria-hidden="true" focusable="false">
        <path d="M 196 4 C 196 52, 4 52, 4 10" fill="none" stroke="#B9AFDD" strokeWidth="2" strokeDasharray="5 5" vectorEffect="non-scaling-stroke" />
      </svg>
      <svg className="adaptive-path__loop-head" viewBox="0 0 12 12" aria-hidden="true" focusable="false">
        <path d="M 1 9 L 6 3 L 11 9" fill="none" stroke="#8775C4" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    </div>
  );
}
