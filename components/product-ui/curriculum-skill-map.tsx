import {
  ArrowRight,
  Banknote,
  ClipboardCheck,
  Gamepad2,
  GitBranch,
  GraduationCap,
  MapPin,
  Ruler,
  Sigma,
  Target,
} from 'lucide-react';
import type { Locale } from '../../lib/i18n';
import { IllustrativeDataLabel } from '../common/illustrative-data-label';
import { ProductFrame } from './product-frame';

const icons = [GraduationCap, Target, Sigma, GitBranch, Gamepad2, ClipboardCheck];

export function CurriculumSkillMap({ locale }: { locale: Locale }) {
  const ar = locale === 'ar';
  const nodes = ar
    ? [
        ['الصف', 'الصف الثالث'],
        ['مخرج التعلم', 'جمع أعداد متعددة الأرقام'],
        ['المهارة', 'الجمع مع إعادة التجميع'],
        ['المتطلب السابق', 'القيمة المكانية من الصف الثاني'],
        ['نشاط مرتبط', 'نماذج القيمة المكانية'],
        ['أدلة التقييم', 'محاولات متنوعة ومستويات صعوبة'],
      ]
    : [
        ['Grade', 'Grade 3'],
        ['Learning outcome', 'Add multi-digit numbers'],
        ['Skill', 'Addition with regrouping'],
        ['Prerequisite', 'Grade 2 place value'],
        ['Aligned activity', 'Place-value models'],
        ['Assessment evidence', 'Varied attempts and difficulty'],
      ];

  return (
    <ProductFrame label={ar ? 'خريطة مهارة مرتبطة بالمنهج الإماراتي' : 'UAE curriculum-aligned skill map'} className="curriculum-skill-map">
      <div className="preview-title-row">
        <div><small>{ar ? 'ارتباط المنهج الإماراتي' : 'UAE curriculum alignment'}</small><strong>{ar ? 'من مخرج الصف إلى النشاط وأدلة التقييم' : 'From grade outcome to activity and assessment evidence'}</strong></div>
        <IllustrativeDataLabel locale={locale} />
      </div>
      <ol className="curriculum-node-list">
        {nodes.map(([label, value], index) => {
          const Icon = icons[index];
          return (
            <li key={label} data-curriculum-node={index + 1}>
              <span><Icon size={17}/></span>
              <div><small>{label}</small><b>{value}</b></div>
              {index < nodes.length - 1 ? <ArrowRight className="directional-icon" size={16} aria-hidden="true"/> : null}
            </li>
          );
        })}
      </ol>
      <div className="uae-context-row">
        <span><Banknote size={16}/>{ar ? 'الدرهم الإماراتي AED' : 'AED examples'}</span>
        <span><Ruler size={16}/>{ar ? 'الوحدات المترية' : 'Metric units'}</span>
        <span><MapPin size={16}/>{ar ? 'سياق إماراتي مناسب' : 'UAE context'}</span>
      </div>
    </ProductFrame>
  );
}
