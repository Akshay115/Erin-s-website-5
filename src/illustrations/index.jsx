/* Illustration grammar: ink line + tea wash + a little lamp gold. One hand. */

const ink = '#2c241c';
const gold = '#d4a054';
const laterite = '#b4532a';
const teal = '#2f6f6a';
const cream = '#f4ece0';
const hibiscus = '#e8b4a0';

function Frame({ children, className = '', view = '0 0 80 80', ...rest }) {
  return (
    <svg className={`illust ${className}`} viewBox={view} fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" {...rest}>
      {children}
    </svg>
  );
}

export function Monogram({ className = '' }) {
  return (
    <Frame className={`monogram ${className}`} view="0 0 64 64">
      <path d="M8 50c10-2 16-10 24-22 8 12 14 20 24 22" stroke={ink} strokeWidth="1.4" strokeLinecap="round" />
      <path d="M18 50c7-14 11-24 14-36" stroke={ink} strokeWidth="1.6" strokeLinecap="round" />
      <path d="M46 50c-7-14-11-24-14-36" stroke={ink} strokeWidth="1.6" strokeLinecap="round" />
      <path d="M24 38h16" stroke={laterite} strokeWidth="1.1" strokeLinecap="round" />
      <circle cx="32" cy="14" r="3.2" fill={gold} />
      <path d="M32 9.2c1.4 1.6 1.4 3.2 0 4.8-1.4-1.6-1.4-3.2 0-4.8Z" fill={cream} stroke={ink} strokeWidth=".7" />
    </Frame>
  );
}

export function Wordmark({ light = false }) {
  return (
    <span className={`wordmark ${light ? 'light' : ''}`}>
      <Monogram />
      <span className="wordmark-type">
        <span className="wordmark-airin">Airin</span>
        <span className="wordmark-aq">Aquarius</span>
      </span>
    </span>
  );
}

export function EmblemEarth({ className = '' }) {
  return (
    <Frame className={className}>
      <ellipse cx="40" cy="58" rx="22" ry="6" fill={laterite} opacity=".18" />
      <path d="M14 56c8-18 16-28 26-34 10 6 18 16 26 34" stroke={ink} strokeWidth="1.3" strokeLinecap="round" />
      <path d="M28 56c4-10 8-18 12-22 4 4 8 12 12 22" stroke={laterite} strokeWidth="1.1" />
      <path d="M40 34v-10" stroke={ink} strokeWidth="1.1" />
      <path d="M40 28c-6-2-8-8-6-12 4 1 6 5 6 12 0-7 2-11 6-12 2 4 0 10-6 12Z" fill={gold} opacity=".35" stroke={ink} strokeWidth=".9" />
    </Frame>
  );
}

export function EmblemWater({ className = '' }) {
  return (
    <Frame className={className}>
      <path d="M10 42c8 6 14 6 22 0s14-6 22 0 14 6 20 0" stroke={teal} strokeWidth="1.4" strokeLinecap="round" />
      <path d="M14 50c7 5 13 5 20 0s13-5 20 0 12 5 16 0" stroke={ink} strokeWidth="1.15" strokeLinecap="round" />
      <path d="M22 58c6 4 11 4 17 0" stroke={teal} strokeWidth="1" opacity=".7" />
      <path d="M40 18c8 10 8 18 0 28-8-10-8-18 0-28Z" fill={teal} opacity=".16" stroke={ink} strokeWidth="1.1" />
    </Frame>
  );
}

export function EmblemFire({ className = '' }) {
  return (
    <Frame className={className}>
      <path d="M24 58h32" stroke={ink} strokeWidth="1.3" strokeLinecap="round" />
      <path d="M30 58v-6h20v6" stroke={ink} strokeWidth="1.2" />
      <ellipse cx="40" cy="50" rx="8" ry="3" fill={gold} opacity=".35" />
      <path d="M40 48c-7-2-10-12-4-20 2 6 6 6 6 0 4 8 8 16-2 20Z" fill={laterite} opacity=".55" stroke={ink} strokeWidth="1.15" />
      <path d="M40 46c-3-2-4-8-1-12 1 3 3 3 3 0 2 5 4 9-2 12Z" fill={gold} />
    </Frame>
  );
}

export function EmblemAir({ className = '' }) {
  return (
    <Frame className={className}>
      <path d="M18 58c6-22 10-34 14-44" stroke={ink} strokeWidth="1.3" strokeLinecap="round" />
      <path d="M32 20c8 4 20 6 28 2-8 6-10 16-6 26-10-4-18-4-26 2 4-10 4-20 4-30Z" fill={gold} opacity=".2" stroke={ink} strokeWidth="1.1" />
      <path d="M34 28c8 2 16 2 22-2" stroke={laterite} strokeWidth=".9" />
      <path d="M14 48c10-2 20 2 30 0 8-1 16 2 22 0" stroke={teal} strokeWidth="1" opacity=".7" />
    </Frame>
  );
}

export function EmblemAkasha({ className = '' }) {
  return (
    <Frame className={className}>
      <circle cx="40" cy="38" r="16" stroke={ink} strokeWidth="1.15" />
      <circle cx="40" cy="38" r="10" stroke={gold} strokeWidth="1" />
      <circle cx="40" cy="38" r="3" fill={gold} />
      <path d="M40 16v6M40 54v6M18 38h6M56 38h6" stroke={ink} strokeWidth=".8" />
      <circle cx="20" cy="18" r="1.1" fill={ink} />
      <circle cx="62" cy="22" r="1" fill={gold} />
      <circle cx="16" cy="56" r=".8" fill={ink} />
    </Frame>
  );
}

const emblems = {
  earth: EmblemEarth,
  water: EmblemWater,
  fire: EmblemFire,
  air: EmblemAir,
  akasha: EmblemAkasha,
};

export function ElementEmblem({ id, className = '' }) {
  const Cmp = emblems[id] || EmblemFire;
  return <Cmp className={className} />;
}

export function Botanical({ name = 'lotus', className = '' }) {
  const common = { className, view: '0 0 80 80' };
  if (name === 'hibiscus') {
    return (
      <Frame {...common}>
        <path d="M40 70c0-10 2-22 2-32" stroke={ink} strokeWidth="1.15" />
        <circle cx="40" cy="36" r="5" fill={gold} />
        {[0, 60, 120, 180, 240, 300].map((a) => (
          <path key={a} d="M40 20c6 6 7 12 0 16-7-4-6-10 0-16Z" fill={hibiscus} fillOpacity=".5" stroke={ink} strokeWidth=".85" transform={`rotate(${a} 40 36)`} />
        ))}
        <path d="M42 52c8 4 14 10 16 18" stroke={teal} strokeWidth=".8" />
      </Frame>
    );
  }
  if (name === 'frangipani') {
    return (
      <Frame {...common}>
        <circle cx="40" cy="40" r="4.5" fill={gold} />
        {[0, 72, 144, 216, 288].map((a) => (
          <path key={a} d="M40 18c5 4 8 12 5 18-4 2-8 2-10 0-3-6 0-14 5-18Z" fill={cream} stroke={ink} strokeWidth=".9" transform={`rotate(${a} 40 40)`} />
        ))}
      </Frame>
    );
  }
  if (name === 'coconut') {
    return (
      <Frame {...common}>
        <path d="M34 74c3-22 6-40 8-56" stroke={ink} strokeWidth="1.35" />
        <path d="M42 20c16 4 28 6 34 2" stroke={ink} strokeWidth="1.05" />
        <path d="M42 22c18 10 26 22 22 36" stroke={ink} strokeWidth="1" />
        <path d="M42 24c8 14 10 26 4 40" stroke={teal} strokeWidth=".9" />
        <path d="M42 22c-16 6-26 4-32-2" stroke={ink} strokeWidth="1" />
        <path d="M42 24c-14 12-18 24-12 38" stroke={gold} strokeWidth=".8" />
      </Frame>
    );
  }
  if (name === 'tulsi') {
    return (
      <Frame {...common}>
        <path d="M40 72V16" stroke={ink} strokeWidth="1.15" />
        {[22, 34, 46, 58].map((y, i) => (
          <g key={y}>
            <path d={`M40 ${y}c-10-1-14-7-11-13 6 1 10 6 11 13`} fill={teal} fillOpacity=".22" stroke={ink} strokeWidth=".85" />
            <path d={`M40 ${y}c10-1 14-7 11-13-6 1-10 6-11 13`} fill={teal} fillOpacity=".22" stroke={ink} strokeWidth=".85" />
          </g>
        ))}
        <circle cx="40" cy="16" r="2" fill={gold} />
      </Frame>
    );
  }
  if (name === 'banana') {
    return (
      <Frame {...common}>
        <path d="M18 70c14-18 24-36 28-54" stroke={ink} strokeWidth="1.3" />
        <path d="M46 16c16 12 24 30 16 50-14-6-22-18-26-36" fill={teal} fillOpacity=".18" stroke={ink} strokeWidth="1.05" />
        <path d="M44 28c8 8 12 18 10 30" stroke={gold} strokeWidth=".75" />
      </Frame>
    );
  }
  if (name === 'areca') {
    return (
      <Frame {...common}>
        <path d="M40 74V28" stroke={ink} strokeWidth="1.2" />
        {[0, 1, 2, 3, 4].map((i) => (
          <path key={i} d={`M40 30c${-18 + i * 2} ${8 + i * 4} ${-16 + i} ${18 + i * 5} ${-8 + i} ${28 + i * 3}`} stroke={ink} strokeWidth=".85" />
        ))}
        {[0, 1, 2, 3, 4].map((i) => (
          <path key={`r${i}`} d={`M40 30c${18 - i * 2} ${8 + i * 4} ${16 - i} ${18 + i * 5} ${8 - i} ${28 + i * 3}`} stroke={teal} strokeWidth=".8" />
        ))}
      </Frame>
    );
  }
  return (
    <Frame {...common}>
      <circle cx="40" cy="50" r="3.5" fill={gold} />
      <path d="M40 18c9 9 12 18 0 28-12-10-9-19 0-28Z" fill={cream} stroke={ink} strokeWidth="1" />
      <path d="M22 36c10 2 16 9 18 18-11-2-17-9-18-18Z" fill={hibiscus} fillOpacity=".35" stroke={ink} strokeWidth=".9" />
      <path d="M58 36c-10 2-16 9-18 18 11-2 17-9 18-18Z" fill={hibiscus} fillOpacity=".35" stroke={ink} strokeWidth=".9" />
      <path d="M28 58c8 6 16 8 24 0" stroke={ink} strokeWidth=".8" />
    </Frame>
  );
}

export function BodyLandscape({ className = '' }) {
  return (
    <svg className={`body-landscape ${className}`} viewBox="0 0 320 420" fill="none" aria-hidden="true">
      <path d="M40 360c30-40 50-90 62-150 8-40 18-70 40-96 16-18 38-28 58-24 22 4 38 22 48 48 14 38 22 90 34 140 8 34 22 62 48 82" stroke={ink} strokeWidth="1.4" />
      <path d="M86 360c24-50 40-110 52-168" stroke={laterite} strokeWidth="1" />
      <path d="M20 372c80 8 140 4 180-6 50-12 80-8 110 6" stroke={teal} strokeWidth="1.2" />
      <path d="M30 388c90 6 150 2 200-8" stroke={teal} strokeWidth=".8" opacity=".7" />
      <circle className="belly-sun" cx="168" cy="188" r="22" fill={gold} />
      <circle cx="168" cy="188" r="22" stroke={ink} strokeWidth="1" />
      <path d="M168 158c10 8 12 18 0 28-12-10-10-20 0-28Z" fill={cream} stroke={ink} strokeWidth=".7" />
      <path d="M70 250c20-30 40-40 70-36" stroke={ink} strokeWidth=".8" opacity=".6" />
    </svg>
  );
}

export { OfferingMark } from './offerings';

export function LiveMoon({ phase = 0.2, className = '' }) {
  const r = 28;
  const sweep = Math.cos(phase * Math.PI * 2);
  const offset = sweep * r;
  const uid = `moon-${Math.round(phase * 1000)}`;
  return (
    <Frame className={`live-moon ${className}`} view="0 0 80 80">
      <circle cx="40" cy="40" r={r} fill="#1c1610" stroke={gold} strokeWidth="1" />
      <clipPath id={uid}>
        <circle cx="40" cy="40" r={r} />
      </clipPath>
      <g clipPath={`url(#${uid})`}>
        <circle cx="40" cy="40" r={r} fill="#f4ece0" />
        <ellipse cx={40 + offset} cy="40" rx={r} ry={r} fill="#1c1610" />
      </g>
      <circle cx="22" cy="16" r="1" fill={gold} />
      <circle cx="64" cy="20" r=".8" fill={ink} />
    </Frame>
  );
}

export function ArrivalScene({ className = '' }) {
  return (
    <svg className={`arrival-scene ${className}`} viewBox="0 0 1200 800" preserveAspectRatio="xMidYMax meet" fill="none" aria-hidden="true">
      <path className="draw draw-slow" d="M0 540c90-14 170-50 280-42 100 7 150 42 250 34 120-10 170-60 300-50 110 8 160 48 250 36 70-8 90-16 120-8" stroke={ink} strokeWidth="1.3" />
      <path className="draw" d="M0 575c140 14 240-6 360 6 150 16 210-12 350-4 160 10 230 22 490 2" stroke={teal} strokeWidth="1.15" />
      <path className="draw" d="M0 620c220 12 420 6 620 14 230 8 360-8 580-4" stroke={teal} strokeWidth=".85" opacity=".65" />
      <g className="draw-palm left-palm">
        <path d="M168 800c8-150 14-280 18-390" stroke={ink} strokeWidth="1.8" />
        <path d="M186 412c38-8 78-30 96-62" stroke={ink} strokeWidth="1.15" />
        <path d="M186 418c48 2 92-8 122-28" stroke={ink} strokeWidth="1.1" />
        <path d="M186 424c36 16 70 38 86 70" stroke={ink} strokeWidth="1.1" />
        <path d="M186 416c-40-10-82-34-100-66" stroke={ink} strokeWidth="1.1" />
        <path d="M186 422c-46 4-88-4-116-22" stroke={ink} strokeWidth="1.05" />
        <path d="M186 412c8-36 6-70-8-96" stroke={ink} strokeWidth="1.05" />
      </g>
      <g className="draw-palm right-palm">
        <path d="M1044 800c-8-140-12-270-16-380" stroke={ink} strokeWidth="1.8" />
        <path d="M1028 424c-40-10-80-32-98-64" stroke={ink} strokeWidth="1.15" />
        <path d="M1028 430c-50 0-94-10-124-30" stroke={ink} strokeWidth="1.1" />
        <path d="M1028 436c-34 16-68 40-82 72" stroke={ink} strokeWidth="1.1" />
        <path d="M1028 428c40-8 82-30 102-62" stroke={ink} strokeWidth="1.1" />
        <path d="M1028 422c-6-36-4-70 10-96" stroke={ink} strokeWidth="1.05" />
      </g>
      <circle className="arrival-sun" cx="600" cy="488" r="16" fill={gold} />
    </svg>
  );
}

export function HorizonLine({ className = '' }) {
  return (
    <svg className={`horizon-line ${className}`} viewBox="0 0 1200 160" preserveAspectRatio="none" aria-hidden="true">
      <path d="M0 110c140-30 220-70 360-60 150 12 200 70 360 55 140-12 200-70 320-50 70 12 110 30 160 18" stroke={gold} strokeWidth="1.2" fill="none" />
      <path d="M80 160c8-50 12-80 16-110" stroke={ink} strokeWidth="1.2" />
      <path d="M96 56c30 8 54 10 70 4-14 22-16 44-6 66-28-6-48-6-70 8 10-26 10-50 6-78Z" fill={teal} opacity=".2" stroke={ink} />
      <path d="M1120 160c-6-40-10-70-12-100" stroke={ink} strokeWidth="1.1" />
      <path d="M1108 64c-28 8-48 8-64 2 12 20 12 40 4 58 24-4 44-2 62 10-8-24-8-46-2-70Z" fill={gold} opacity=".15" stroke={ink} />
    </svg>
  );
}

export function BowlDrop({ className = '' }) {
  return (
    <Frame className={className} view="0 0 48 48">
      <ellipse cx="24" cy="34" rx="14" ry="5" stroke={ink} strokeWidth="1.2" />
      <path d="M10 34c2-8 6-14 14-16 8 2 12 8 14 16" stroke={ink} strokeWidth="1.2" />
      <path d="M24 8c3 6 3 10 0 14-3-4-3-8 0-14Z" fill={gold} stroke={ink} strokeWidth=".8" />
    </Frame>
  );
}

export function IconArrow({ className = '' }) {
  return (
    <svg className={className} width="18" height="18" viewBox="0 0 18 18" fill="none" aria-hidden="true">
      <path d="M3 9h11M10 5l4 4-4 4" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export function IconMenu({ open }) {
  return (
    <svg width="28" height="28" viewBox="0 0 28 28" fill="none" aria-hidden="true">
      {open ? (
        <>
          <path d="M7 7l14 14M21 7 7 21" stroke="currentColor" strokeWidth="1.3" />
        </>
      ) : (
        <>
          <path d="M5 9h18M5 14h18M5 19h12" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" />
        </>
      )}
    </svg>
  );
}

export function IconWave() {
  return (
    <svg width="22" height="22" viewBox="0 0 22 22" fill="none" aria-hidden="true">
      <path d="M2 12c3 3 5 3 8 0s5-3 8 0 3 3 4 0" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" />
    </svg>
  );
}

export function IconWhatsApp() {
  return (
    <svg width="18" height="18" viewBox="0 0 18 18" fill="none" aria-hidden="true">
      <path d="M3 15 4.2 11A6.5 6.5 0 1 1 7 14.6L3 15Z" stroke="currentColor" strokeWidth="1.2" />
      <path d="M7 8.2c.2 1.4 1.6 2.8 3 3" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
    </svg>
  );
}

export function IconPin() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
      <path d="M8 14s5-4.2 5-7.2A5 5 0 0 0 3 6.8C3 9.8 8 14 8 14Z" stroke="currentColor" strokeWidth="1.2" />
      <circle cx="8" cy="6.6" r="1.4" fill="currentColor" />
    </svg>
  );
}

export function IconMail() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
      <rect x="1.5" y="3.5" width="13" height="9" rx="1" stroke="currentColor" strokeWidth="1.2" />
      <path d="m2 4.5 6 4.2 6-4.2" stroke="currentColor" strokeWidth="1.2" />
    </svg>
  );
}

export function PalmSilhouette({ className = '' }) {
  return (
    <svg className={className} viewBox="0 0 200 280" fill="none" aria-hidden="true">
      <path d="M102 278c3-72 6-140 8-196" stroke="#2c241c" strokeWidth="1.8" />
      <path d="M110 84c36-8 74-30 92-62" stroke="#2c241c" strokeWidth="1.15" />
      <path d="M110 90c46 2 88-8 116-28" stroke="#2c241c" strokeWidth="1.1" />
      <path d="M110 96c34 16 66 40 80 72" stroke="#2c241c" strokeWidth="1.1" />
      <path d="M110 88c-38-10-78-34-96-66" stroke="#2c241c" strokeWidth="1.1" />
      <path d="M110 94c-44 4-84-4-110-22" stroke="#2c241c" strokeWidth="1.05" />
      <path d="M110 84c8-34 6-66-8-92" stroke="#2c241c" strokeWidth="1.05" />
    </svg>
  );
}

export const arts = {
  horizon: '/illustrations/horizon-dawn.jpg',
  wheel: '/illustrations/seasonal-wheel.jpg',
  agni: '/illustrations/agni-horizon.jpg',
  hibiscus: '/illustrations/botanicals/wash-03.jpg',
  frangipani: '/illustrations/botanicals/wash-04.jpg',
  tulsi: '/illustrations/botanicals/wash-01.jpg',
  lotus: '/illustrations/botanicals/wash-02.jpg',
  coconut: '/illustrations/botanicals/coconut.jpg',
  banana: '/illustrations/botanicals/banana.jpg',
  areca: '/illustrations/botanicals/areca.jpg',
};
