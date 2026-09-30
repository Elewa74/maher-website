import { BookOpenCheck, ClipboardList, Route } from 'lucide-react';
import type { Locale } from '../../lib/i18n';
import { IllustrativeDataLabel } from '../common/illustrative-data-label';
import { studentChoicesDemo } from './demo-data';
import { ProductFrame } from './product-frame';

const icons = [ClipboardList, Route, BookOpenCheck];

export function StudentLearningChoices({ locale }: { locale: Locale }) {
  const ar = locale === 'ar';
  const copy = ar
    ? [
        ['المهام المسندة', 'أنشطة وواجبات أرسلها المعلم'],
        ['مساري التكيفي', 'خطوة شخصية مبنية على أدلة الفهم'],
        ['الاستكشاف حسب الموضوع', 'مهارات المنهج حسب الصف والمجال'],
      ]
    : [
        ['Assigned Work', 'Activities and homework sent by the teacher'],
        ['My Adaptive Path', 'A personal next step based on learning evidence'],
        ['Explore by Topic', 'Curriculum skills by grade and domain'],
      ];

  return (
    <ProductFrame label={ar ? 'معاينة اختيارات تعلم الطالب' : 'Student learning choices preview'} className="student-learning-choices">
      <IllustrativeDataLabel locale={locale} />
      <div className="student-choice-header">
        <div><small>{ar ? 'مرحبًا بعودتك' : 'Welcome back'}</small><strong>{ar ? 'ماذا تريد أن تتعلم اليوم؟' : 'What would you like to learn today?'}</strong></div>
        <span>{ar ? 'الصف الثالث' : 'Grade 3'}</span>
      </div>
      <ul className="student-choice-list">
        {studentChoicesDemo.map((choice, index) => {
          const Icon = icons[index];
          return (
            <li key={choice.id} data-student-choice={choice.id}>
              <span><Icon size={21} /></span>
              <div><strong>{copy[index][0]}</strong><small>{copy[index][1]}</small></div>
            </li>
          );
        })}
      </ul>
      <p className="saved-state-note">{ar ? 'يكمل الطالب العائد من آخر حالة تعلم محفوظة.' : 'Returning learners continue from their last saved learning state.'}</p>
    </ProductFrame>
  );
}
