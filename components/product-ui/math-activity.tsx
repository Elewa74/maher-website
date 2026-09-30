import { Check, Shapes } from 'lucide-react';
import type { Locale } from '../../lib/i18n';
import { IllustrativeDataLabel } from '../common/illustrative-data-label';
import { MaherCharacter } from '../common/maher-character';
import { ProductFrame } from './product-frame';

export function MathActivity({ locale }: { locale: Locale }) {
  const ar = locale === 'ar';
  return (
    <ProductFrame label={ar ? 'معاينة نشاط الكسور' : 'Fractions activity preview'} className="math-activity">
      <IllustrativeDataLabel locale={locale} />
      <div className="activity-title">
        <span><Shapes size={19} /></span>
        <div>
          <small>{ar ? 'الصف الرابع • الكسور' : 'Grade 4 • Fractions'}</small>
          <strong>{ar ? 'حل المسألة باستخدام نموذج شريطي' : 'Solve with a bar model'}</strong>
        </div>
      </div>
      <p className="activity-question">
        {ar ? 'هناك 6 أجزاء متساوية. 4 أجزاء مظللة. ما الكسر المظلل؟' : 'There are 6 equal parts. 4 parts are shaded. What fraction is shaded?'}
      </p>
      <span className="sr-only">{ar ? 'أربعة من ستة أجزاء مظللة' : 'Four of six parts shaded'}</span>
      <div className="fraction-bar" aria-hidden="true">
        {[0, 1, 2, 3, 4, 5].map((part) => <span className={part < 4 ? 'is-filled' : ''} key={part} />)}
      </div>
      <span className="sr-only">{ar ? 'خيارات الإجابة' : 'Answer choices'}</span>
      <div className="answer-row">
        {['1/6', '2/6', '4/6', '6/6'].map((answer) => <span className={answer === '4/6' ? 'is-selected' : ''} key={answer}>{answer}</span>)}
      </div>
      <div className="feedback feedback--character"><MaherCharacter pose="happy" size="sm" className="feedback__character" /><Check size={18} /> <span>{ar ? 'أحسنت — يمكنك الانتقال إلى الخطوة التالية.' : 'Great thinking — you’re ready for the next step.'}</span></div>
    </ProductFrame>
  );
}
