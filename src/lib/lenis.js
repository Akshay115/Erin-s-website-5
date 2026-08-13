import { useEffect } from 'react';
import Lenis from 'lenis';
import { usePrefersReducedMotion } from './motion';

export function useLenis() {
  const reduced = usePrefersReducedMotion();
  useEffect(() => {
    if (reduced) return undefined;
    const lenis = new Lenis({
      duration: 1.15,
      smoothWheel: true,
      touchMultiplier: 1.1,
      lerp: 0.09,
    });
    let raf = 0;
    const loop = (time) => {
      lenis.raf(time);
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);
    return () => {
      cancelAnimationFrame(raf);
      lenis.destroy();
    };
  }, [reduced]);
}
