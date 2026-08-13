const ink = '#2c241c';
const gold = '#d4a054';
const laterite = '#b4532a';
const teal = '#2f6f6a';
const hibiscus = '#e8b4a0';

function S({ children, className = '' }) {
  return (
    <svg className={`illust offering-mark ${className}`} viewBox="0 0 80 80" fill="none" aria-hidden="true">
      {children}
    </svg>
  );
}

export function MarkIntuitive() {
  return (
    <S>
      <circle cx="40" cy="38" r="16" stroke={ink} strokeWidth="1.2" />
      <path d="M40 22v32M24 38h32" stroke={gold} strokeWidth="1" />
      <circle cx="40" cy="38" r="3" fill={laterite} />
      <path d="M18 58h44" stroke={ink} strokeWidth="1.1" />
    </S>
  );
}

export function MarkMentoring() {
  return (
    <S>
      <rect x="22" y="18" width="28" height="36" rx="1.5" stroke={ink} strokeWidth="1.2" />
      <path d="M26 26h20M26 32h16M26 38h18" stroke={ink} strokeWidth="1" />
      <path d="M42 46c8 2 16 8 18 16" stroke={laterite} strokeWidth="1.2" />
      <circle cx="62" cy="64" r="3" fill={gold} />
    </S>
  );
}

export function MarkFall() {
  return (
    <S>
      <path d="M40 18c10 10 12 20 0 28-12-8-10-18 0-28Z" fill={laterite} fillOpacity=".35" stroke={ink} strokeWidth="1.1" />
      <path d="M28 36c8 4 14 12 12 22" stroke={ink} strokeWidth="1.1" />
      <circle cx="52" cy="22" r="6" stroke={gold} strokeWidth="1.1" />
    </S>
  );
}

export function MarkSpring() {
  return (
    <S>
      <path d="M40 62V28" stroke={ink} strokeWidth="1.2" />
      <path d="M40 30c-10-2-14-10-10-16 6 2 10 8 10 16 0-8 4-14 10-16 4 6 0 14-10 16Z" fill={hibiscus} fillOpacity=".45" stroke={ink} />
      <circle cx="40" cy="22" r="2.2" fill={gold} />
    </S>
  );
}

export function MarkSummer() {
  return (
    <S>
      <circle cx="40" cy="36" r="10" fill={gold} fillOpacity=".45" stroke={ink} />
      <path d="M40 16v6M40 50v6M18 36h6M56 36h6M24 20l4 4M52 52l4 4M24 52l4-4M52 20l4-4" stroke={laterite} strokeWidth="1.1" />
    </S>
  );
}

export function MarkWinter() {
  return (
    <S>
      <circle cx="40" cy="36" r="14" stroke={ink} strokeWidth="1.2" />
      <path d="M40 22v28M28 30l24 12M28 42l24-12" stroke={teal} strokeWidth="1" />
      <path d="M20 60h40" stroke={ink} strokeWidth="1" />
    </S>
  );
}

export function MarkKundalini() {
  return (
    <S>
      <path d="M40 66c-12-8-16-16-8-24 8-6 8-10 0-16-10-8-6-16 8-22 14 6 18 14 8 22-8 6-8 10 0 16 8 8 4 16-8 24Z" stroke={ink} strokeWidth="1.25" fill={laterite} fillOpacity=".2" />
      <circle cx="40" cy="16" r="3" fill={gold} />
    </S>
  );
}

export function MarkEnergy() {
  return (
    <S>
      <circle cx="40" cy="40" r="20" stroke={ink} strokeWidth="1" />
      <circle cx="40" cy="40" r="12" stroke={gold} strokeWidth="1" />
      <circle cx="40" cy="40" r="4" fill={gold} />
      <path d="M40 12v6M40 62v6M12 40h6M62 40h6" stroke={ink} strokeWidth=".9" />
    </S>
  );
}

export function MarkMoon() {
  return (
    <S>
      <circle cx="40" cy="38" r="16" stroke={gold} strokeWidth="1.15" />
      <path d="M46 26a14 14 0 1 0 0 24 12 12 0 0 1 0-24Z" fill={ink} fillOpacity=".85" />
    </S>
  );
}

export function MarkYoga() {
  return (
    <S>
      <circle cx="40" cy="18" r="5" stroke={ink} />
      <path d="M40 24v18M26 30l14 6 14-6M28 64 40 42 52 64" stroke={ink} strokeWidth="1.2" />
    </S>
  );
}

export function MarkCacao() {
  return (
    <S>
      <ellipse cx="40" cy="52" rx="16" ry="6" stroke={ink} />
      <path d="M24 52c2-14 6-22 16-24 10 2 14 10 16 24" stroke={ink} strokeWidth="1.2" />
      <path d="M34 24c2-8 6-12 6-16 4 6 4 12 2 16" stroke={laterite} strokeWidth="1.1" />
    </S>
  );
}

export function MarkFiveDay() {
  return (
    <S>
      {[0, 1, 2, 3, 4].map((i) => (
        <circle key={i} cx={16 + i * 12} cy="40" r="4.2" stroke={ink} fill={i === 2 ? gold : 'none'} />
      ))}
      <path d="M16 52h48" stroke={teal} strokeWidth="1" />
    </S>
  );
}

export function MarkEmbodied() {
  return (
    <S>
      <path d="M40 18c8 10 18 22 18 34 0 10-8 16-18 16S22 62 22 52c0-12 10-24 18-34Z" stroke={ink} fill={hibiscus} fillOpacity=".28" />
      <circle cx="40" cy="48" r="3" fill={gold} />
    </S>
  );
}

export function MarkImmersion() {
  return (
    <S>
      <path d="M14 50c10-18 18-28 26-32 8 4 16 14 26 32" stroke={ink} strokeWidth="1.2" />
      <path d="M22 50c6-10 12-16 18-18 6 2 12 8 18 18" stroke={teal} />
      <circle cx="40" cy="28" r="3" fill={gold} />
    </S>
  );
}

const marks = {
  'intuitive-session': MarkIntuitive,
  mentoring: MarkMentoring,
  'sacred-fall-reset': MarkFall,
  'spring-maiden': MarkSpring,
  'summer-wild-woman': MarkSummer,
  'winter-mystic': MarkWinter,
  'kundalini-tantra-yoga': MarkKundalini,
  'energy-healing': MarkEnergy,
  'moon-circle': MarkMoon,
  'yoga-meditation-barre': MarkYoga,
  'sip-cacao-meditate': MarkCacao,
  'five-day-reset': MarkFiveDay,
  'embodied-woman': MarkEmbodied,
  'inner-fire-immersion': MarkImmersion,
};

export function OfferingMark({ slug, className = '' }) {
  const Cmp = marks[slug] || MarkIntuitive;
  return <Cmp className={className} />;
}
