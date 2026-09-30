import { AlertCircle, BookOpenCheck, ChevronRight, ClipboardCheck, GraduationCap, UsersRound } from 'lucide-react';
import type { Locale } from '../../lib/i18n';
import { IllustrativeDataLabel } from '../common/illustrative-data-label';
import { schoolDemo } from './demo-data';
import { ProductFrame } from './product-frame';

const metricIcons = [UsersRound, GraduationCap, BookOpenCheck, ClipboardCheck];

export function SchoolOverview({ locale }: { locale: Locale }) {
  const ar = locale === 'ar';
  const labels = ar ? ['استخدام المنصة', 'تقدم الفصول', 'تقدم الطلاب', 'إكمال التكليفات'] : schoolDemo.metrics.map((metric) => metric.label);
  const outcomeLabels = ar ? ['الأعداد والعمليات', 'القياس'] : schoolDemo.outcomeProgress.map((item) => item.label);

  return (
    <ProductFrame label={ar ? 'معاينة قيادة المدرسة' : 'School leadership overview preview'} className="school-overview">
      <div className="preview-title-row">
        <div><small>{ar ? 'قيادة المدرسة' : 'School Leadership'}</small><strong>{ar ? 'نظرة المدرسة 01' : 'School 01 overview'}</strong></div>
        <IllustrativeDataLabel locale={locale}/>
      </div>
      <div className="school-metric-grid">
        {schoolDemo.metrics.map((metric, index) => {
          const Icon = metricIcons[index];
          return <div key={metric.label}><span><Icon size={16}/></span><b>{ar ? `${metric.percent}%` : metric.value}</b><small>{labels[index]}</small></div>;
        })}
      </div>
      <div className="school-outcome-panel">
        <div><small>{ar ? 'تقدم مخرجات التعلم' : 'Learning outcome progress'}</small><strong>{ar ? 'الصف الرابع' : 'Grade 4'}</strong></div>
        {schoolDemo.outcomeProgress.map((outcome, index) => <div className="outcome-progress-row" key={outcome.label}><span>{outcomeLabels[index]}</span><i><b style={{ inlineSize: `${outcome.value}%` }}/></i><em>{ar ? `${outcome.value}%` : `${outcome.value}%`}</em></div>)}
      </div>
      <div className="school-attention-row"><AlertCircle size={17}/><div><small>{ar ? 'مؤشرات المتابعة' : 'Attention indicators'}</small><strong>{ar ? '4 فصول تحتاج إلى مراجعة' : '4 classes require review'}</strong></div></div>
      <div className="scope-breadcrumb">
        <span className="sr-only">{ar ? 'انتقال توضيحي مصرح به' : 'Illustrative authorised drill-down'}: </span>        <span>{ar ? 'المدرسة' : 'School'}</span><ChevronRight className="directional-icon" size={15}/><span>{ar ? 'الفصل' : 'Class'}</span><ChevronRight className="directional-icon" size={15}/><span>{ar ? 'الطالب المصرح به' : 'Authorised learner'}</span>
      </div>
    </ProductFrame>
  );
}
