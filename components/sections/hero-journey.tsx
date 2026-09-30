import { ArrowLeft, ArrowRight } from 'lucide-react';
import type { HeroCopy } from '../../content/types';
import type { Locale } from '../../lib/i18n';
import { MaherCharacter } from '../common/maher-character';

/**
 * Hero illustration: a learning road with three stations (understand → practise → master),
 * the MAHER character on the current station and a "next step" card.
 *
 * The road is an interim inline SVG drawn in RTL orientation (start at the far side,
 * finishing next to the copy). LTR mirrors the art and the overlay positions via
 * logical properties. When the rendered road from IMG-17 arrives, swap <RoadArt /> for it.
 */
export function HeroJourney({ locale, copy }: { locale: Locale; copy: Pick<HeroCopy, 'journey' | 'nextStep'> }) {
  const Arrow = locale === 'ar' ? ArrowLeft : ArrowRight;
  return (
    <div className="hero-journey">
      <RoadArt />
      <span className="hero-journey__station hero-journey__station--1">{copy.journey[0]}</span>
      <span className="hero-journey__station hero-journey__station--2">{copy.journey[1]}</span>
      <span className="hero-journey__station hero-journey__station--3">{copy.journey[2]}</span>
      <MaherCharacter pose="three-quarter" className="hero-journey__character" eager />
      <div className="hero-journey__card">
        <div className="hero-journey__card-head">
          <strong>{copy.nextStep.label}</strong>
          <span aria-hidden="true"><Arrow size={15} /></span>
        </div>
        <p>{copy.nextStep.title}</p>
        <div className="hero-journey__bar" aria-hidden="true">
          {[0, 1, 2, 3, 4, 5].map((part) => <i key={part} className={part < 4 ? 'is-filled' : ''} />)}
        </div>
        <small>{copy.nextStep.progress}</small>
      </div>
    </div>
  );
}

/** Soft 3D-style road with three raised stations. Drawn for RTL; LTR mirrors it in CSS. */
function RoadArt() {
  const road = 'M -40 150 C 60 150 110 150 175 150 C 300 150 360 190 330 250 C 300 310 170 300 175 360 C 180 420 330 440 470 450 C 610 460 700 520 870 555';
  return (
    <svg className="hero-journey__art" viewBox="0 0 960 680" aria-hidden="true" focusable="false">
      <defs>
        <linearGradient id="hj-fade" x1="0" x2="1" y1="0" y2="0">
          <stop offset="0" stopColor="#fff" stopOpacity="0" />
          <stop offset=".12" stopColor="#fff" stopOpacity="1" />
        </linearGradient>
        <mask id="hj-mask"><rect width="960" height="680" fill="url(#hj-fade)" /></mask>
        <radialGradient id="hj-bulb" cx=".4" cy=".35" r=".7">
          <stop offset="0" stopColor="#ffffff" />
          <stop offset=".7" stopColor="#F1EEF9" />
          <stop offset="1" stopColor="#D8D1EE" />
        </radialGradient>
        <radialGradient id="hj-check" cx=".4" cy=".3" r=".75">
          <stop offset="0" stopColor="#ffffff" />
          <stop offset="1" stopColor="#E7E3F1" />
        </radialGradient>
        <filter id="hj-soft" x="-20%" y="-20%" width="140%" height="160%">
          <feDropShadow dx="0" dy="14" stdDeviation="14" floodColor="#5F48B1" floodOpacity=".18" />
        </filter>
      </defs>

      <g mask="url(#hj-mask)" filter="url(#hj-soft)">
        <path d={road} fill="none" stroke="#B9AFDD" strokeWidth="78" strokeLinecap="round" transform="translate(0 16)" />
        <path d={road} fill="none" stroke="#E6E1F7" strokeWidth="78" strokeLinecap="round" />
        <path d={road} fill="none" stroke="#F4F1FB" strokeWidth="54" strokeLinecap="round" />
        <path className="hero-journey__lane" d={road} fill="none" stroke="#fff" strokeWidth="3" strokeDasharray="14 14" strokeLinecap="round" />
      </g>

      <g className="hero-journey__chevrons" fill="none" stroke="#fff" strokeWidth="5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M 282 330 l -14 10 l 14 10 M 264 330 l -14 10 l 14 10" transform="rotate(-20 266 340)" />
        <path d="M 640 478 l 14 10 l -14 10 M 658 478 l 14 10 l -14 10" transform="rotate(18 656 488)" />
      </g>

      <Station cx={175} cy={150} top="#DDD6F0" ring="#EFECF8" />
      <Station cx={470} cy={450} top="#F08A24" ring="#F7C79A" large />
      <Station cx={870} cy={555} top="#0E9F8F" ring="#9ED8CF" />

      {/* light bulb on station 1 */}
      <g className="hero-journey__bulb">
        <g stroke="#B9AFDD" strokeWidth="4" strokeLinecap="round">
          <path d="M 175 40 v -16" /><path d="M 132 58 l -11 -11" /><path d="M 218 58 l 11 -11" />
        </g>
        <circle cx="175" cy="92" r="34" fill="url(#hj-bulb)" stroke="#E4DEF6" strokeWidth="2" />
        <rect x="160" y="120" width="30" height="20" rx="5" fill="#B9AFDD" />
        <rect x="163" y="138" width="24" height="8" rx="4" fill="#8775C4" />
      </g>

      {/* mastery check on station 3 */}
      <g className="hero-journey__check">
        <ellipse cx="870" cy="508" rx="46" ry="46" fill="url(#hj-check)" stroke="#E4DEF6" strokeWidth="2" />
        <path d="M 848 507 l 15 15 l 30 -32" fill="none" stroke="#0E9F8F" strokeWidth="11" strokeLinecap="round" strokeLinejoin="round" />
      </g>
    </svg>
  );
}

function Station({ cx, cy, top, ring, large = false }: { cx: number; cy: number; top: string; ring: string; large?: boolean }) {
  const rx = large ? 92 : 70;
  const ry = large ? 36 : 28;
  return (
    <g className="hero-journey__platform">
      <path d={`M ${cx - rx} ${cy} v 22 a ${rx} ${ry} 0 0 0 ${rx * 2} 0 v -22`} fill="#DDD6F0" />
      <ellipse cx={cx} cy={cy} rx={rx} ry={ry} fill="#F6F4FC" />
      <ellipse cx={cx} cy={cy - 2} rx={rx - 14} ry={ry - 6} fill={ring} />
      <ellipse cx={cx} cy={cy - 3} rx={rx - 22} ry={ry - 10} fill={top} />
    </g>
  );
}
