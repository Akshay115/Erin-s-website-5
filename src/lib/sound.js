const FILES = {
  sea: '/sound/sea.ogg',
  palm: '/sound/palm.ogg',
  lamp: '/sound/lamp.ogg',
  insects: '/sound/insects.ogg',
};

const BED_FOR = {
  air: 'sea',
  earth: 'palm',
  fire: 'lamp',
  water: 'sea',
  akasha: 'insects',
};

const nodes = {};
let ready = false;
let failed = false;
let enabled = false;
let current = null;

function allReady() {
  return Promise.all(
    Object.entries(FILES).map(
      ([id, src]) =>
        new Promise((resolve, reject) => {
          const a = new Audio();
          a.preload = 'auto';
          a.loop = true;
          a.src = src;
          a.volume = 0;
          const ok = () => {
            nodes[id] = a;
            resolve();
          };
          a.addEventListener('canplaythrough', ok, { once: true });
          a.addEventListener('error', () => reject(new Error(src)), { once: true });
          a.load();
        }),
    ),
  );
}

export async function prepareSound() {
  if (failed) return false;
  if (ready) return true;
  try {
    await allReady();
    ready = true;
    return true;
  } catch {
    failed = true;
    Object.values(nodes).forEach((a) => {
      a.pause();
    });
    return false;
  }
}

function fade(audio, to, ms = 500) {
  if (!audio) return;
  const from = audio.volume;
  const start = performance.now();
  const tick = (now) => {
    const t = Math.min(1, (now - start) / ms);
    audio.volume = from + (to - from) * t;
    if (t < 1) requestAnimationFrame(tick);
    else if (to === 0) audio.pause();
  };
  if (to > 0 && audio.paused) {
    audio.play().catch(() => {});
  }
  requestAnimationFrame(tick);
}

export async function setSoundOn(on) {
  enabled = on;
  if (!on) {
    Object.values(nodes).forEach((a) => fade(a, 0, 280));
    return;
  }
  const ok = await prepareSound();
  if (!ok) return;
  setSoundBed(current || 'air');
}

export function setSoundBed(element) {
  current = element;
  if (!enabled || !ready || failed) return;
  const want = BED_FOR[element] || 'sea';
  Object.entries(nodes).forEach(([id, a]) => {
    fade(a, id === want ? 0.28 : 0, 600);
  });
}

export function hushSound() {
  Object.values(nodes).forEach((a) => fade(a, 0, 180));
}
