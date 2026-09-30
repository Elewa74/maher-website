import { ArrowUpRight, BookOpen, Check } from 'lucide-react';
import type { Locale } from '../../lib/i18n';
import { IllustrativeDataLabel } from '../common/illustrative-data-label';
import { MaherCharacter } from '../common/maher-character';
import { learnerDemo } from './demo-data';
import { ProductFrame } from './product-frame';

export function LearnerJourney({ locale }: { locale: Locale }) {
  const ar = locale === 'ar';
  const labels = ar
    ? {
        frame: 'معاينة رحلة المتعلم',
        greeting: 'صباح الخير يا أحمد',
        subtitle: 'رحلتك في التعلّم',
        progress: 'اكتمل 72%',
        next: 'خطوتك التالية',
        start: 'ابدأ الدرس',
      }
    : {
        frame: 'Learner journey preview',
        greeting: `Good morning, ${learnerDemo.name}`,
        subtitle: 'Your learning journey',
        progress: '72% complete',
        next: 'Recommended next',
        start: 'Start lesson',
      };

  return (
    <ProductFrame label={labels.frame} className="learner-journey">
      <IllustrativeDataLabel locale={locale} />
      <div className="mockup-heading">
        <div className="avatar avatar--character"><MaherCharacter pose="front" size="sm" eager /></div>
        <div>
          <strong>{labels.greeting}</strong>
          <span>{labels.subtitle}</span>
        </div>
        <div className="progress-ring" aria-label={ar ? 'اكتمل 72%' : '72% complete'}>
          <b>{ar ? '72%' : `${learnerDemo.progress}%`}</b>
        </div>
      </div>
      <div className="journey-track" aria-label={labels.subtitle}>
        {learnerDemo.journey.map((item, index) => (
          <div className={`journey-node ${index === 2 ? 'is-current' : ''}`} key={item}>
            <span>{index < 2 ? <Check size={14} /> : index + 1}</span>
            <small>{ar ? ['الكسور', 'الكسور المتكافئة', 'مقارنة الكسور'][index] : item}</small>
          </div>
        ))}
      </div>
      <div className="lesson-card">
        <div className="lesson-icon"><BookOpen size={21} /></div>
        <div>
          <span>{labels.next}</span>
          <strong>{ar ? 'قارن الكسور باستخدام النماذج الشريطية' : learnerDemo.recommendedLesson}</strong>
        </div>
        {/* Illustrative control inside a static preview: shown, not focusable. */}
        <span className="lesson-card__action" aria-hidden="true" title={labels.start}>
          <ArrowUpRight className="directional-icon" size={19} aria-hidden="true" />
        </span>
      </div>
    </ProductFrame>
  );
}
