import { BookOpenCheck, Eye, Layers3, UsersRound } from 'lucide-react';
import type { Locale } from '../../lib/i18n';
import { IllustrativeDataLabel } from '../common/illustrative-data-label';
import { teacherWorkflowDemo } from './demo-data';
import { ProductFrame } from './product-frame';

export function TeacherContentSelection({ locale }: { locale: Locale }) {
  const ar = locale === 'ar';
  const filters = ar
    ? [
        ['الصف', 'الصف الرابع'],
        ['مخرج التعلم', 'جمع وطرح أعداد متعددة الأرقام'],
        ['المهارة', 'الجمع مع إعادة التجميع'],
      ]
    : [
        ['Grade', teacherWorkflowDemo.content.grade],
        ['Learning outcome', teacherWorkflowDemo.content.outcome],
        ['Skill', teacherWorkflowDemo.content.skill],
      ];

  return (
    <ProductFrame label={ar ? 'معاينة اختيار محتوى المعلم' : 'Teacher content selection preview'} className="teacher-content-selection">
      <div className="preview-title-row">
        <div><small>{ar ? 'فصولي' : 'My Classes'}</small><strong>{ar ? 'الصف الرابع (أ)' : teacherWorkflowDemo.className}</strong></div>
        <IllustrativeDataLabel locale={locale}/>
      </div>
      <div className="content-browse-modes" aria-label={ar ? 'طرق استعراض المحتوى' : 'Content browsing modes'}>
        <span className="is-active"><Layers3 size={16}/>{ar ? 'حسب الموضوع' : 'By Topic'}</span>
        <span><BookOpenCheck size={16}/>{ar ? 'حسب ارتباط المنهج الإماراتي' : 'By UAE Curriculum Alignment'}</span>
      </div>
      <dl className="content-filter-grid">
        {filters.map(([label, value]) => <div key={label}><dt>{label}</dt><dd>{value}</dd></div>)}
      </dl>
      <div className="activity-preview-card">
        <span><Eye size={19}/></span>
        <div><small>{ar ? 'معاينة النشاط' : 'Preview activity'}</small><strong>{ar ? 'نماذج القيمة المكانية لإعادة التجميع' : teacherWorkflowDemo.content.activity}</strong></div>
      </div>
      <div className="assignment-targets"><span><UsersRound size={15}/>{ar ? 'إسناد إلى' : 'Assign to'}</span><b>{ar ? 'طالب' : 'Learner'}</b><b>{ar ? 'مجموعة' : 'Group'}</b><b>{ar ? 'فصل' : 'Class'}</b></div>
    </ProductFrame>
  );
}
