const SYNODIC = 29.530588853;
const KNOWN_NEW = Date.UTC(2000, 0, 6, 18, 14, 0);

export function moonAge(date = new Date()) {
  const days = (date.getTime() - KNOWN_NEW) / 86400000;
  return ((days % SYNODIC) + SYNODIC) % SYNODIC;
}

export function moonPhase(date = new Date()) {
  return moonAge(date) / SYNODIC;
}

export function moonName(date = new Date()) {
  const p = moonPhase(date);
  if (p < 0.03 || p > 0.97) return 'New moon';
  if (p < 0.22) return 'Waxing crescent';
  if (p < 0.28) return 'First quarter';
  if (p < 0.47) return 'Waxing gibbous';
  if (p < 0.53) return 'Full moon';
  if (p < 0.72) return 'Waning gibbous';
  if (p < 0.78) return 'Last quarter';
  return 'Waning crescent';
}

export function isNewMoon(date = new Date()) {
  const p = moonPhase(date);
  return p < 0.06 || p > 0.94;
}

export function isFullMoon(date = new Date()) {
  const p = moonPhase(date);
  return p > 0.44 && p < 0.56;
}
