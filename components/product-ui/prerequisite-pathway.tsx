import { ArrowRight, CornerDownRight, RotateCcw } from 'lucide-react';
import type { Locale } from '../../lib/i18n';
import { IllustrativeDataLabel } from '../common/illustrative-data-label';
import { prerequisiteDemo } from './demo-data';
import { ProductFrame } from './product-frame';

export function PrerequisitePathway({ locale }: { locale: Locale }) {
  const ar = locale === 'ar';
  const steps = ar
    ? ['جمع الصف الثالث', 'فجوة في إعادة التجميع', 'متطلب القيمة المكانية من الصف الثاني', 'ممارسة مدعومة', 'العودة إلى جمع الصف الثالث', 'التحقق من الإتقان']
    : prerequisiteDemo.steps;

  return (
    <ProductFrame label={ar ? 'معاينة مسار المتطلب السابق' : 'Prerequisite pathway preview'} className="prerequisite-pathway">
      <div className="preview-title-row">
        <div><small>{ar ? 'مثال توضيحي' : 'Illustrative example'}</small><strong>{ar ? 'دعم الفجوة ثم العودة إلى هدف الصف' : 'Support the gap, then return to the grade-level goal'}</strong></div>
        <IllustrativeDataLabel locale={locale} />
      </div>
      <ol className="prerequisite-step-list">
        {steps.map((step, index) => (
          <li key={step} data-pathway-step={index + 1} className={index === 2 || index === 3 ? 'is-prerequisite' : index === 4 || index === 5 ? 'is-return' : ''}>
            <span>{index + 1}</span>
            <b>{step}</b>
            {index < steps.length - 1 ? <ArrowRight className="directional-icon" size={16} aria-hidden="true" /> : null}
          </li>
        ))}
      </ol>
      <div className="grade-state-note"><CornerDownRight size={18}/><span>{ar ? 'يظل الصف الرسمي للطالب: الصف الثالث' : 'Official registered grade remains Grade 3'}</span><RotateCcw size={16}/></div>
      <p className="mastery-evidence-note">{ar ? 'لا تعني نتيجة نشاط واحد إتقان المهارة. يعتمد القرار على أدلة ومحاولات ومستويات صعوبة متعددة.' : 'One activity result does not establish mastery. The decision uses multiple pieces of evidence, attempts and difficulty levels.'}</p>
    </ProductFrame>
  );
}
