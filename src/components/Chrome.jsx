import React, { useEffect, useRef, useState } from 'react';
import { Link, NavLink, useLocation, useNavigate } from 'react-router-dom';
import { contact, siteUrl } from '../content';
import {
  Wordmark,
  IconMenu,
  IconWave,
  IconArrow,
  IconWhatsApp,
  IconMail,
  IconPin,
  HorizonLine,
  Botanical,
  PalmSilhouette,
} from '../illustrations';
import {
  usePrefersReducedMotion,
  useFinePointer,
  useReveal,
  useScrollProgress,
  elementFromProgress,
  useLocalFlag,
  useMagnetic,
} from '../lib/motion';
import { setSoundOn, hushSound, setSoundBed } from '../lib/sound';
import { useLenis } from '../lib/lenis';

export function Meta({ title, description, type = 'website' }) {
  useEffect(() => {
    document.title = title.includes('Airin') ? title : `${title} | Airin Aquarius`;
    const set = (name, content, property = false) => {
      const sel = property ? `[property="${name}"]` : `[name="${name}"]`;
      let el = document.head.querySelector(sel);
      if (!el) {
        el = document.createElement('meta');
        el.setAttribute(property ? 'property' : 'name', name);
        document.head.appendChild(el);
      }
      el.content = content;
    };
    set('description', description);
    set('og:title', document.title, true);
    set('og:description', description, true);
    set('og:type', type, true);
    set('og:url', `${siteUrl}${window.location.pathname}`, true);
    set('og:image', `${siteUrl}/illustrations/horizon-dawn.jpg`, true);
    set('twitter:card', 'summary_large_image');
    let canonical = document.head.querySelector('link[rel="canonical"]');
    if (!canonical) {
      canonical = document.createElement('link');
      canonical.rel = 'canonical';
      document.head.appendChild(canonical);
    }
    canonical.href = `${siteUrl}${window.location.pathname}`;
  }, [title, description, type]);
  return null;
}

export function ScrollReset() {
  return null;
}

export function PaperCover() {
  const navigate = useNavigate();
  const location = useLocation();
  const reduced = usePrefersReducedMotion();
  const [phase, setPhase] = useState('idle');
  const lock = useRef(false);

  useEffect(() => {
    const onClick = (e) => {
      if (lock.current) {
        e.preventDefault();
        return;
      }
      const a = e.target.closest('a[href]');
      if (!a || a.target === '_blank' || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey || e.button !== 0) return;
      const raw = a.getAttribute('href');
      if (!raw || raw.startsWith('#') || raw.startsWith('mailto:') || raw.startsWith('tel:') || /^https?:/i.test(raw)) return;
      const url = new URL(raw, window.location.origin);
      if (url.origin !== window.location.origin) return;
      const next = `${url.pathname}${url.search}`;
      const cur = `${location.pathname}${location.search}`;
      if (next === cur) return;
      e.preventDefault();
      const go = () => {
        navigate(next);
        window.scrollTo(0, 0);
      };
      if (reduced) {
        go();
        return;
      }
      lock.current = true;
      document.body.classList.add('is-leaving');
      setPhase('leaving');
      window.setTimeout(() => {
        setPhase('covered');
        go();
        window.setTimeout(() => {
          document.body.classList.remove('is-leaving');
          setPhase('entering');
          window.setTimeout(() => {
            setPhase('idle');
            lock.current = false;
          }, 280);
        }, 80);
      }, 220);
    };
    document.addEventListener('click', onClick, true);
    return () => document.removeEventListener('click', onClick, true);
  }, [location.pathname, location.search, navigate, reduced]);

  return <div className={`paper-cover ${phase}`} aria-hidden="true" />;
}

export function SmoothScroll() {
  useLenis();
  return null;
}

export function EmberCursor() {
  const reduced = usePrefersReducedMotion();
  const fine = useFinePointer();
  const ring = useRef(null);
  const ember = useRef(null);
  useEffect(() => {
    if (reduced || !fine) return undefined;
    document.body.classList.add('has-ember');
    let x = window.innerWidth / 2;
    let y = window.innerHeight / 2;
    let tx = x;
    let ty = y;
    let raf = 0;
    const move = (e) => {
      tx = e.clientX;
      ty = e.clientY;
      const t = e.target;
      const hot = t.closest('a, button, summary, input, textarea, select, .door, .emblem-btn, .wheel-seg');
      document.body.classList.toggle('cursor-hot', Boolean(hot));
    };
    const loop = () => {
      x += (tx - x) * 0.18;
      y += (ty - y) * 0.18;
      if (ring.current) ring.current.style.transform = `translate(${tx - 14}px, ${ty - 14}px)`;
      if (ember.current) ember.current.style.transform = `translate(${x - 5}px, ${y - 5}px)`;
      raf = requestAnimationFrame(loop);
    };
    window.addEventListener('pointermove', move, { passive: true });
    raf = requestAnimationFrame(loop);
    return () => {
      document.body.classList.remove('has-ember', 'cursor-hot');
      window.removeEventListener('pointermove', move);
      cancelAnimationFrame(raf);
    };
  }, [reduced, fine]);
  if (reduced || !fine) return null;
  return (
    <>
      <div className="cursor-ring" ref={ring} />
      <div className="cursor-ember" ref={ember} />
    </>
  );
}

export function ElementThread() {
  const progress = useScrollProgress();
  const el = elementFromProgress(progress);
  const { pathname } = useLocation();
  const jump = (id) => {
    if (pathname !== '/') {
      window.location.href = `/#${id}`;
      return;
    }
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  };
  return (
    <nav className={`thread thread-${el}`} aria-label="Page chapters" style={{ '--p': `${Math.max(8, progress * 100)}%` }}>
      <button type="button" onClick={() => jump('arrive')} aria-label="Go to arrival, air">
        <span>Air</span>
      </button>
      <button type="button" onClick={() => jump('belly')} aria-label="Go to the belly essay, earth">
        <span>Earth</span>
      </button>
      <button type="button" onClick={() => jump('elements')} aria-label="Go to the five elements, fire">
        <span>Fire</span>
      </button>
      <button type="button" onClick={() => jump('doors')} aria-label="Go to the three doors, water">
        <span>Water</span>
      </button>
      <button type="button" onClick={() => jump('begin')} aria-label="Go to begin, akasha">
        <span>Sky</span>
      </button>
      <i />
    </nav>
  );
}

export function Atmosphere({ element = 'air' }) {
  const reduced = usePrefersReducedMotion();
  const wrap = useRef(null);
  useEffect(() => {
    if (reduced) return undefined;
    const el = wrap.current;
    if (!el) return undefined;
    const onMove = (e) => {
      const x = (e.clientX / window.innerWidth - 0.5) * 12;
      el.style.setProperty('--px', `${x}px`);
    };
    window.addEventListener('pointermove', onMove, { passive: true });
    return () => window.removeEventListener('pointermove', onMove);
  }, [reduced]);
  useEffect(() => {
    setSoundBed(element);
  }, [element]);
  return (
    <div className={`atmosphere atm-${element}`} ref={wrap} aria-hidden="true">
      <PalmSilhouette className="atm-palm left" />
      <PalmSilhouette className="atm-palm right" />
      <span className="petal p1" />
      <span className="petal p2" />
      <span className="petal p3" />
      <span className="lamp-shimmer" />
      <span className="star s1" />
      <span className="star s2" />
      <span className="star s3" />
      <span className="star s4" />
    </div>
  );
}

function SoundToggle() {
  const [on, setOn] = useLocalFlag('airin-sound', false);
  useEffect(() => {
    setSoundOn(on);
    const hide = () => {
      if (document.hidden) hushSound();
      else if (on) setSoundOn(true);
    };
    document.addEventListener('visibilitychange', hide);
    return () => document.removeEventListener('visibilitychange', hide);
  }, [on]);
  return (
    <button
      type="button"
      className={`sound-toggle ${on ? 'on' : ''}`}
      onClick={() => setOn(!on)}
      aria-pressed={on}
      aria-label={on ? 'Mute ambient sound' : 'Play ambient sound'}
    >
      <IconWave />
    </button>
  );
}

export function Header() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { pathname } = useLocation();
  useEffect(() => setOpen(false), [pathname]);
  useEffect(() => {
    const on = () => setScrolled(window.scrollY > 40);
    on();
    window.addEventListener('scroll', on, { passive: true });
    return () => window.removeEventListener('scroll', on);
  }, []);
  useEffect(() => {
    document.body.classList.toggle('menu-open', open);
    return () => document.body.classList.remove('menu-open');
  }, [open]);
  useEffect(() => {
    if (!open) return undefined;
    const onKey = (e) => {
      if (e.key === 'Escape') setOpen(false);
    };
    window.addEventListener('keydown', onKey);
    document.querySelector('.nav a')?.focus();
    return () => window.removeEventListener('keydown', onKey);
  }, [open]);
  const lightLanding = pathname === '/' || pathname === '/about';
  const overDark = !lightLanding && !scrolled && !open;
  return (
    <header className={`site-header ${scrolled ? 'scrolled' : ''} ${open ? 'open' : ''} ${overDark ? 'over-dark' : ''}`}>
      <Link className="brand" to="/" aria-label="Airin Aquarius home">
        <Wordmark light={overDark} />
      </Link>
      <div className="header-end">
        <nav className={open ? 'nav open' : 'nav'} aria-label="Primary navigation">
          <Botanical name="frangipani" className="menu-plant" />
          <NavLink to="/about">Her story</NavLink>
          <NavLink to="/approach">The work</NavLink>
          <NavLink to="/offerings">Offerings</NavLink>
          <NavLink to="/goa">Goa</NavLink>
          <MagneticLink className="nav-cta" to="/contact">
            Begin <IconArrow />
          </MagneticLink>
        </nav>
        <div className="header-tools">
          <SoundToggle />
          <button
            className="menu-btn"
            aria-label={open ? 'Close menu' : 'Open menu'}
            aria-expanded={open}
            onClick={() => setOpen(!open)}
          >
            <IconMenu open={open} />
          </button>
        </div>
      </div>
    </header>
  );
}

export function Footer() {
  return (
    <footer className="footer">
      <HorizonLine />
      <div className="footer-lead">
        <span className="eyebrow light">Goa · India · Worldwide</span>
        <h2>
          Meet yourself
          <br />
          <em>where you are.</em>
        </h2>
        <Link className="circle-link" to="/contact">
          <IconArrow />
          <span>Begin</span>
        </Link>
      </div>
      <div className="footer-grid">
        <div>
          <Link className="brand footer-brand" to="/">
            <Wordmark light />
          </Link>
          <p>Holistic health, movement and embodied practice from Mandrem, Goa.</p>
        </div>
        <div>
          <b>Explore</b>
          <Link to="/about">Her story</Link>
          <Link to="/approach">The work</Link>
          <Link to="/offerings">Offerings</Link>
          <Link to="/seasons">Seasons</Link>
          <Link to="/retreats">Retreats</Link>
          <Link to="/journal">Wisdom</Link>
        </div>
        <div>
          <b>Connect</b>
          <a href={`mailto:${contact.email}`}>
            <IconMail /> Email
          </a>
          <a href={contact.whatsappHref} target="_blank" rel="noreferrer">
            <IconWhatsApp /> WhatsApp
          </a>
          <a href={contact.instagram} target="_blank" rel="noreferrer">
            {contact.instagramHandle}
          </a>
          <a href={contact.maps} target="_blank" rel="noreferrer">
            <IconPin /> Find in Goa
          </a>
        </div>
        <div>
          <b>Details</b>
          <Link to="/faq">FAQ & safety</Link>
          <Link to="/privacy">Privacy</Link>
          <Link to="/terms">Terms</Link>
          <span>IST · UTC +5:30</span>
        </div>
      </div>
      <div className="footer-bottom">
        <span>© 2026 Airin Aquarius</span>
        <span>Creating a sanctuary within.</span>
      </div>
    </footer>
  );
}

export function Frame({
  children,
  title = 'Creating a Sanctuary Within',
  description = 'Health coaching, yoga, gut restoration and sacred practice with Airin Aquarius in Mandrem, Goa, and online worldwide.',
  element = 'air',
}) {
  const { pathname } = useLocation();
  const reveal = useReveal([pathname]);
  const [phase, setPhase] = useState('in');
  useEffect(() => {
    setPhase('in');
    const t = setTimeout(() => setPhase('settled'), 480);
    return () => clearTimeout(t);
  }, [pathname]);
  return (
    <>
      <ScrollReset />
      <Meta title={title} description={description} />
      <a className="skip-link" href="#main">
        Skip to content
      </a>
      <Header />
      <Atmosphere element={element} />
      <ElementThread />
      <main id="main" ref={reveal} className={`page-shell phase-${phase}`} data-element={element} tabIndex={-1}>
        {children}
      </main>
      <Footer />
    </>
  );
}

export function Eyebrow({ children, light = false }) {
  return <span className={light ? 'eyebrow light' : 'eyebrow'}>{children}</span>;
}

export function ArrowLink({ to, children }) {
  return (
    <Link className="arrow-link" to={to}>
      {children}
      <IconArrow />
    </Link>
  );
}

function MagneticLink({ to, href, className = '', children, ...rest }) {
  const ref = useMagnetic(8);
  if (href) {
    return (
      <a ref={ref} className={className} href={href} {...rest}>
        {children}
      </a>
    );
  }
  return (
    <Link ref={ref} className={className} to={to} {...rest}>
      {children}
    </Link>
  );
}

export function Button({ to, href, children, tone = 'pale', className = '', ...rest }) {
  return (
    <MagneticLink className={`button ${tone} ${className}`} to={to} href={href} {...rest}>
      {children}
    </MagneticLink>
  );
}

export function WhatsAppLink({ children = 'Continue on WhatsApp', className = '' }) {
  return (
    <a className={`whatsapp-link ${className}`} href={contact.whatsappHref} target="_blank" rel="noreferrer">
      <IconWhatsApp /> {children}
    </a>
  );
}
