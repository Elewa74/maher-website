import { AlertCircle, ArrowRight, BrainCircuit, Gauge, Target } from 'lucide-react';
import type { Locale } from '../../lib/i18n';
import { IllustrativeDataLabel } from '../common/illustrative-data-label';
import { teacherWorkflowDemo } from './demo-data';
import { ProductFrame } from './product-frame';

export function StudentAttemptDetails({ locale }: { locale: Locale }) {
  const ar = locale === 'ar';
  const dimensions = ar
    ? [['المهارة', 'الجمع مع إعادة التجميع'], ['مخرج التعلم', 'جمع أعداد متعددة الأرقام'], ['مستوى الصعوبة', 'متدرج'], ['المستوى المعرفي', 'تطبيق']]
    : [['Skill', 'Addition with regrouping'], ['Learning Outcome', 'Add multi-digit numbers'], ['Difficulty Level', 'Progressive'], ['Cognitive Level', 'Apply']];
  const attention = ar
    ? {
        reason: 'أخطاء متكررة في إعادة التجميع عبر مستويين من الصعوبة',
        evidence: 'محاولتان واستجابات باستخدام نموذج القيمة المكانية',
        affectedSkill: 'متطلب القيمة المكانية من الصف الثاني',
        suggestedAction: 'إسناد ممارسة مدعومة للقيمة المكانية ثم مراجعة جمع الصف الرابع',
      }
    : teacherWorkflowDemo.attention;

  return (
    <ProductFrame label={ar ? 'معاينة تفاصيل محاولات الطالب' : 'Student attempt details preview'} className="student-attempt-details">
      <div className="preview-title-row">
        <div><small>{ar ? 'الطلاب الذين يحتاجون إلى متابعة' : 'Students Requiring Attention'}</small><strong>{ar ? 'الطالب 02' : teacherWorkflowDemo.attention.learner}</strong></div>
        <IllustrativeDataLabel locale={locale}/>
      </div>
      <dl className="evidence-dimensions">
        {dimensions.map(([label, value], index) => <div key={label}><dt>{index === 0 ? <Target size={14}/> : index === 1 ? <ArrowRight size={14}/> : index === 2 ? <Gauge size={14}/> : <BrainCircuit size={14}/>} {label}</dt><dd>{value}</dd></div>)}
      </dl>
      <ol className="attempt-list">
        {teacherWorkflowDemo.attempts.map((attempt, index) => <li key={attempt.attempt} data-attempt={attempt.attempt}><span>{ar ? `المحاولة ${['1', '2', '3'][index]}` : `Attempt ${attempt.attempt}`}</span><b>{ar ? ['دليل جزئي', 'تكررت فجوة إعادة التجميع', 'اقتراح المتطلب السابق'][index] : attempt.result}</b><small>{ar ? ['تأسيسي', 'أساسي', 'مدعوم'][index] : attempt.difficulty}</small></li>)}
      </ol>
      <div className="attention-evidence-card">
        <AlertCircle size={19}/>
        <dl>
          <div><dt>{ar ? 'السبب' : 'Reason'}</dt><dd>{attention.reason}</dd></div>
          <div><dt>{ar ? 'الأدلة' : 'Evidence'}</dt><dd>{attention.evidence}</dd></div>
          <div><dt>{ar ? 'المتطلب السابق المتأثر' : 'Affected prerequisite'}</dt><dd>{attention.affectedSkill}</dd></div>
          <div><dt>{ar ? 'الإجراء المقترح' : 'Suggested action'}</dt><dd>{attention.suggestedAction}</dd></div>
        </dl>
      </div>
    </ProductFrame>
  );
}
