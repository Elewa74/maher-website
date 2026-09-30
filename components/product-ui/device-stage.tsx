import { Check, Smartphone, Tablet } from 'lucide-react';
import type { Locale } from '../../lib/i18n';
import { IllustrativeDataLabel } from '../common/illustrative-data-label';

export function DeviceStage({ locale }: { locale: Locale }) {
  const ar = locale === 'ar';
  return (
    <div className="device-stage" aria-label={ar ? 'ماهر عبر أجهزة مختلفة' : 'MAHER across devices'}>
      <IllustrativeDataLabel locale={locale} />
      <div className="device device--desktop"><div className="device__bar"><i/><i/><i/></div><div className="device__screen"><strong>{ar ? 'رحلتي' : 'My journey'}</strong><div className="mini-journey"><span><Check size={13}/></span><i/><span>2</span><i/><span>3</span></div><div className="mini-card" /></div></div>
      <div className="device device--tablet"><div className="device__screen"><Tablet size={18}/><strong>{ar ? 'لنتمرّن' : "Let's practise"}</strong><div className="mini-fractions"><i/><i/><i/><i/></div></div></div>
      <div className="device device--phone"><div className="device__screen"><Smartphone size={16}/><strong>{ar ? 'تقدّمك' : 'Your progress'}</strong><b>{ar ? '72%' : '72%'}</b></div></div>
    </div>
  );
}
