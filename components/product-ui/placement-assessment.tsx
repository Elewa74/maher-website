import { CheckCircle2, Compass, Sparkles } from 'lucide-react';
import type { Locale } from '../../lib/i18n';
import { IllustrativeDataLabel } from '../common/illustrative-data-label';
import { ProductFrame } from './product-frame';

export function PlacementAssessment({ locale }: { locale: Locale }) {
  const ar = locale === 'ar';
  const skills = ar ? ['القيمة المكانية', 'الجمع', 'الأنماط'] : ['Place value', 'Addition', 'Patterns'];
  return (
    <ProductFrame label={ar ? 'معاينة تقييم تحديد نقطة البداية' : 'Placement assessment preview'} className="placement-assessment">
      <div className="preview-title-row">
        <div><small>{ar ? 'تقييم قصير' : 'Short placement assessment'}</small><strong>{ar ? 'تحديد نقطة بداية مناسبة' : 'Find an appropriate starting point'}</strong></div>
        <IllustrativeDataLabel locale={locale} />
      </div>
      <div className="registered-grade-card">
        <span><Compass size={20} /></span>
        <div><small>{ar ? 'الصف المسجل' : 'Registered grade'}</small><strong>{ar ? 'الصف الثالث' : 'Grade 3'}</strong></div>
        <em>{ar ? 'لا يتغير' : 'Remains unchanged'}</em>
      </div>
      <span className="sr-only">{ar ? 'تقدم توضيحي في التقييم' : 'Illustrative assessment progress'}</span>
      <div className="placement-progress" aria-hidden="true"><i /><i /><i className="is-pending" /></div>
      <ul className="placement-skill-list">
        {skills.map((skill, index) => <li key={skill}><span>{index < 2 ? <CheckCircle2 size={16} /> : <Sparkles size={16} />}</span><b>{skill}</b><small>{index < 2 ? (ar ? 'تم جمع دليل' : 'Evidence collected') : (ar ? 'التالي' : 'Next')}</small></li>)}
      </ul>
    </ProductFrame>
  );
}
