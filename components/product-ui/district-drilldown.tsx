import { BarChart3, ChevronRight, Download, SlidersHorizontal } from 'lucide-react';
import type { Locale } from '../../lib/i18n';
import { IllustrativeDataLabel } from '../common/illustrative-data-label';
import { districtDemo } from './demo-data';
import { ProductFrame } from './product-frame';

export function DistrictDrilldown({ locale }: { locale: Locale }) {
  const ar = locale === 'ar';
  const filters = ar ? ['الإمارة', 'المنطقة', 'المدرسة', 'الصف', 'المعلم', 'الطالب'] : districtDemo.filters;
  const schoolNames = ar ? ['المدرسة 01', 'المدرسة 02', 'المدرسة 03'] : districtDemo.schools.map((school) => school.name);

  return (
    <ProductFrame label={ar ? 'معاينة المنطقة والوزارة' : 'District and ministry drill-down preview'} className="district-drilldown">
      <div className="preview-title-row">
        <div><small>{ar ? 'المنطقة / الوزارة' : 'District / MOE'}</small><strong>{ar ? 'مقارنة المدارس وتقدم المنهج' : 'School comparison and curriculum progress'}</strong></div>
        <IllustrativeDataLabel locale={locale}/>
      </div>
      <div className="district-filter-row"><span><SlidersHorizontal size={15}/>{ar ? 'الفلاتر' : 'Filters'}</span>{filters.map((filter) => <b key={filter}>{filter}</b>)}</div>
      <div className="district-comparison-head"><span><BarChart3 size={15}/>{ar ? 'قارن المدارس' : 'Compare schools'}</span><span>{ar ? 'قارن الفترات' : 'Compare periods'}</span></div>
      <div className="district-school-bars">
        {districtDemo.schools.map((school, index) => <div key={school.name}><span>{schoolNames[index]}</span><i><b style={{ inlineSize: `${school.progress}%` }}/></i><em>{ar ? `${school.progress}%` : `${school.progress}%`}</em></div>)}
      </div>
      <div className="district-curriculum-card"><small>{ar ? 'تقدم المنهج' : 'Curriculum progress'}</small><strong>{ar ? '72% ضمن النطاق التوضيحي' : '72% across the illustrative scope'}</strong></div>
      <div className="scope-breadcrumb">
        <span className="sr-only">{ar ? 'انتقال تنظيمي توضيحي مصرح به' : 'Illustrative authorised organisational drill-down'}: </span>        <span>{ar ? 'المنطقة' : 'District'}</span><ChevronRight className="directional-icon" size={15}/><span>{ar ? 'المدرسة' : 'School'}</span><ChevronRight className="directional-icon" size={15}/><span>{ar ? 'الفصل' : 'Class'}</span><ChevronRight className="directional-icon" size={15}/><span>{ar ? 'الطالب المصرح به' : 'Authorised learner'}</span>
      </div>
      <div className="target-export-row"><span><Download size={15}/>{ar ? 'صيغ التصدير المستهدفة' : 'Target export formats'}</span>{districtDemo.exports.map((format) => <b key={format}>{format}</b>)}</div>
    </ProductFrame>
  );
}
