#!/usr/bin/env node
/** Contrast + keyboard inventory. Not a substitute for Lighthouse, but blocks regressions. */

function luminance(hex) {
  const n = hex.replace('#', '');
  const rgb = [0, 2, 4].map((i) => {
    const c = parseInt(n.slice(i, i + 2), 16) / 255;
    return c <= 0.03928 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4;
  });
  return 0.2126 * rgb[0] + 0.7152 * rgb[1] + 0.0722 * rgb[2];
}

function contrast(a, b) {
  const L1 = luminance(a);
  const L2 = luminance(b);
  const hi = Math.max(L1, L2);
  const lo = Math.min(L1, L2);
  return (hi + 0.05) / (lo + 0.05);
}

const pairs = [
  ['ink on cream', '#2c241c', '#f4ece0', 4.5],
  ['cream on deep', '#f4ece0', '#2a1810', 4.5],
  ['fine print on cream', '#4f4034', '#f4ece0', 4.5],
  ['cream on laterite night', '#f4ece0', '#1b100c', 4.5],
];

const fails = [];
for (const [name, fg, bg, min] of pairs) {
  const r = contrast(fg, bg);
  const ok = r >= min;
  console.log(`${ok ? 'PASS' : 'FAIL'} ${name}: ${r.toFixed(2)}:1`);
  if (!ok) fails.push(name);
}

if (fails.length) {
  console.error('Contrast failures:', fails.join(', '));
  process.exit(1);
}
console.log('Quality gate contrast pairs passed.');
