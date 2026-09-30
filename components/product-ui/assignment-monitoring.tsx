import { CircleDot, Clock3, Wifi, WifiOff } from 'lucide-react';
import type { Locale } from '../../lib/i18n';
import { IllustrativeDataLabel } from '../common/illustrative-data-label';
import { teacherWorkflowDemo } from './demo-data';
import { ProductFrame } from './product-frame';

export function AssignmentMonitoring({ locale }: { locale: Locale }) {
  const ar = locale === 'ar';
  const statuses = ar ? ['لم يبدأ', 'قيد التنفيذ', 'مكتمل'] : teacherWorkflowDemo.assignments.map((item) => item.status);
  const learners = ar ? ['الطالب 01', 'الطالب 02', 'الطالب 03'] : teacherWorkflowDemo.assignments.map((item) => item.learner);

  return (
    <ProductFrame label={ar ? 'معاينة متابعة التكليف' : 'Assignment monitoring preview'} className="assignment-monitoring">
      <div className="preview-title-row">
        <div><small>{ar ? 'متابعة التكليف' : 'Assignment monitoring'}</small><strong>{ar ? 'الجمع مع إعادة التجميع' : 'Addition with regrouping'}</strong></div>
        <IllustrativeDataLabel locale={locale}/>
      </div>
      <table className="assignment-table" aria-label={ar ? 'حالات تكليف توضيحية' : 'Illustrative assignment states'}>
        <thead>
          <tr className="assignment-table__head">
            <th scope="col">{ar ? 'الطالب' : 'Learner'}</th>
            <th scope="col">{ar ? 'الحالة' : 'Status'}</th>
            <th scope="col">{ar ? 'المحاولات' : 'Attempts'}</th>
            <th scope="col">{ar ? 'آخر دخول' : 'Last active'}</th>
            <th scope="col">{ar ? 'الحضور' : 'Presence'}</th>
            <th scope="col">{ar ? 'وقت الاستخدام' : 'Time used'}</th>
          </tr>
        </thead>
        <tbody>
          {teacherWorkflowDemo.assignments.map((item, index) => (
            <tr className="assignment-table__row" key={item.learner}>
              <th scope="row" data-label={ar ? 'الطالب' : 'Learner'}>{learners[index]}</th>
              <td data-label={ar ? 'الحالة' : 'Status'} data-assignment-status={item.status}><i/><em>{statuses[index]}</em></td>
              <td data-label={ar ? 'المحاولات' : 'Attempts'}>{ar ? ['0', '2', '3'][index] : item.attempts}</td>
              <td data-label={ar ? 'آخر دخول' : 'Last active'}><Clock3 size={14}/>{ar ? ['أمس', '10:42', '09:15'][index] : item.lastActive}</td>
              <td data-label={ar ? 'الحضور' : 'Presence'}>{item.presence === 'Online' ? <Wifi size={14}/> : <WifiOff size={14}/>} {ar ? (item.presence === 'Online' ? 'متصل' : 'غير متصل') : item.presence}</td>
              <td data-label={ar ? 'وقت الاستخدام' : 'Time used'}><CircleDot size={13}/>{ar ? ['0 دقيقة', '18 دقيقة', '24 دقيقة'][index] : item.timeUsed}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </ProductFrame>
  );
}
