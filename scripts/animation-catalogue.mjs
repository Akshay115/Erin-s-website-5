#!/usr/bin/env node
import { readFileSync, existsSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const read = (p) => readFileSync(join(root, p), 'utf8');
const css = read('src/styles.css');
const chrome = read('src/components/Chrome.jsx');
const motion = read('src/lib/motion.js');
const sound = read('src/lib/sound.js');
const home = read('src/pages/Home.jsx');
const site = read('src/pages/Site.jsx');
const ill = read('src/illustrations/index.jsx');
const marks = read('src/illustrations/offerings.jsx');
const main = read('src/main.jsx');
const blob = [css, chrome, motion, sound, home, site, ill, marks, main].join('\n');

const checks = [
  ['1 Ember cursor', /cursor-ember/],
  ['2 Tide / paper cover', /paper-cover/],
  ['3 Elemental thread', /className=\{`thread/],
  ['4 Palms sway', /atm-palm/],
  ['5 Arrival drawings', /arrival-scene|className="draw"/],
  ['6 Belly-sun fill', /belly-sun/],
  ['7 Five-element map', /emblem-btn/],
  ['8 Offering river', /className="river"/],
  ['9 Seasonal wheel', /wheel-art/],
  ['10 Live moon', /LiveMoon/],
  ['11 Bowl-ripple buttons', /@keyframes ripple/],
  ['12 Tide-line underlines', /arrow-link:hover/],
  ['13 Form gold fill', /contact-form input:focus/],
  ['14 Map seed-drop', /seed-pin/],
  ['15 Menu plants', /menu-plant/],
  ['16 Footer stars', /atm-akasha \.star/],
  ['17 Optional sound off by default', /useLocalFlag\('airin-sound', false\)/],
  ['18 Reduced-motion collapse', /prefers-reduced-motion: reduce/],
  ['Magnetic CTAs', /useMagnetic\(8\)/],
  ['Lenis', /useLenis|from 'lenis'/],
  ['Home field note', /home-note/],
  ['14 offering marks', /MarkImmersion/],
  ['Sound files wired', /\/sound\/sea\.ogg/],
];

let failed = 0;
for (const [name, re] of checks) {
  const ok = re.test(blob);
  console.log(`${ok ? 'PASS' : 'FAIL'} ${name}`);
  if (!ok) failed += 1;
}

const assets = [
  'public/sound/sea.ogg',
  'public/sound/palm.ogg',
  'public/sound/lamp.ogg',
  'public/sound/insects.ogg',
  'public/illustrations/agni-horizon.jpg',
  'public/illustrations/botanicals/coconut.jpg',
  'public/illustrations/botanicals/banana.jpg',
  'public/illustrations/botanicals/areca.jpg',
];
for (const a of assets) {
  const ok = existsSync(join(root, a));
  console.log(`${ok ? 'PASS' : 'FAIL'} asset ${a}`);
  if (!ok) failed += 1;
}

const extras = [
  'intuitive-session',
  'mentoring',
  'sacred-fall-reset',
  'spring-maiden',
  'summer-wild-woman',
  'winter-mystic',
  'kundalini-tantra-yoga',
  'energy-healing',
  'moon-circle',
  'yoga-meditation-barre',
  'sip-cacao-meditate',
  'five-day-reset',
  'embodied-woman',
  'inner-fire-immersion',
];
for (const slug of extras) {
  const ok = site.includes(`'${slug}'`);
  console.log(`${ok ? 'PASS' : 'FAIL'} chapter extra ${slug}`);
  if (!ok) failed += 1;
}

if (failed) {
  console.error(`Catalogue failed: ${failed} checks`);
  process.exit(1);
}
console.log('Animation and completion catalogue passed.');
