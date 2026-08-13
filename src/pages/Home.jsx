import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Frame, Eyebrow, ArrowLink, Button, WhatsAppLink } from '../components/Chrome';
import {
  ArrivalScene,
  ElementEmblem,
  LiveMoon,
  OfferingMark,
  Botanical,
  IconArrow,
  IconPin,
  arts,
} from '../illustrations';
import { articles, bellyEssay, doors, elements, images, offerings, sharedSafety } from '../content';
import { moonPhase, moonName } from '../lib/moon';

export default function Home() {
  const [active, setActive] = useState('fire');
  const [phase] = useState(() => moonPhase());
  const [name] = useState(() => moonName());
  const fall = offerings.find((o) => o.slug === 'sacred-fall-reset');

  useEffect(() => {
    document.body.dataset.element = active;
    return () => {
      delete document.body.dataset.element;
    };
  }, [active]);

  return (
    <Frame element={active} title="Airin Aquarius — Health Coach & Yoga, Mandrem Goa">
      <section className="arrival" id="arrive">
        <ArrivalScene />
        <div className="arrival-photo" style={{ '--bg': `url(${images.coast})` }} />
        <div className="arrival-copy">
          <Eyebrow light>Mandrem, Goa · Online worldwide</Eyebrow>
          <h1>
            Creating a Sanctuary
            <br />
            <em>within</em>
          </h1>
          <p>Naturally heal the fire in the belly. Return to the magic and power that have always been you.</p>
          <div className="hero-actions">
            <Button href="#doors" tone="pale">
              Enter the work <IconArrow />
            </Button>
            <Link className="text-link" to="/about">
              Meet Airin
            </Link>
          </div>
        </div>
        <div className="hero-location">
          <IconPin /> Mandrem · 15.67°N
          <span>Online worldwide</span>
        </div>
        <a className="scroll-cue" href="#belly" aria-label="Continue">
          <span />
        </a>
      </section>

      <section className="belly section-pad" id="belly">
        <div className="belly-art reveal">
          <img src={arts.agni} alt="Ink drawing of a laterite coast with a gold sun on the horizon — the digestive fire." loading="lazy" width="720" height="960" />
          <span className="belly-caption">Agni — the digestive fire, the solar plexus.</span>
        </div>
        <div className="belly-copy">
          <Eyebrow>Inner Fire Alchemy</Eyebrow>
          <h2>
            {bellyEssay.lead.replace('The gut is the foundation of our health and energy.', 'The gut is the foundation')}
            <br />
            <em>of our health and energy.</em>
          </h2>
          {bellyEssay.body.map((p) => (
            <p key={p.slice(0, 24)} className="reveal">
              {p}
            </p>
          ))}
          <p className="fine-print">{sharedSafety}</p>
        </div>
      </section>

      <section className="elements-map section-pad" id="elements">
        <div className="section-title">
          <Eyebrow>The five elements</Eyebrow>
          <h2>
            A living map
            <br />
            back to <em>yourself.</em>
          </h2>
        </div>
        <div className="element-arc" role="list">
          {elements.map((el) => (
            <button
              key={el.id}
              type="button"
              role="listitem"
              className={`emblem-btn ${active === el.id ? 'active' : ''}`}
              onMouseEnter={() => setActive(el.id)}
              onFocus={() => setActive(el.id)}
              onClick={() => {
                setActive(el.id);
                document.getElementById('doors')?.scrollIntoView({ behavior: 'smooth' });
              }}
            >
              <ElementEmblem id={el.id} />
              <span>{el.name}</span>
              <small>{el.role}</small>
            </button>
          ))}
        </div>
        <p className="element-line reveal" key={active}>
          <b>{elements.find((e) => e.id === active)?.role}</b>
          {elements.find((e) => e.id === active)?.copy}
        </p>
      </section>

      <section className="doors section-pad" id="doors">
        <div className="section-title">
          <Eyebrow>Ways to begin</Eyebrow>
          <h2>
            Three doors.
            <br />
            <em>One return.</em>
          </h2>
        </div>
        <div className="door-grid">
          {doors.map((d) => (
            <Link className="door reveal" to={d.to} key={d.id}>
              <OfferingMark slug={d.id === 'private' ? 'mentoring' : d.id === 'circle' ? 'moon-circle' : 'inner-fire-immersion'} />
              <small>Enter</small>
              <h3>{d.title}</h3>
              <p>{d.line}</p>
              <span className="tide">Walk through</span>
            </Link>
          ))}
        </div>
      </section>

      {fall && (
        <section className="featured-fall" id="fall">
          <div className="fall-moon">
            <LiveMoon phase={phase} />
            <small>{name}</small>
          </div>
          <div className="fall-copy">
            <Eyebrow>Now open · Women only · November new moon</Eyebrow>
            <h2>
              Sacred
              <br />
              <em>Fall Reset</em>
            </h2>
            <p>Return to your fire — confident, sensual, and rooted in your body. A small circle of women, opening on the November new moon.</p>
            <Button to="/offerings/sacred-fall-reset" tone="pale">
              Read the invitation <IconArrow />
            </Button>
          </div>
        </section>
      )}

      <section className="portrait-strip">
        <div className="portrait-image film" style={{ '--bg': `url(${images.portrait})` }} />
        <div className="portrait-copy">
          <Eyebrow>The woman behind the work</Eyebrow>
          <blockquote>“The body is not a problem to solve. It is a place to return to.”</blockquote>
          <p>From the Hawaiian coast to study across Bali, Thailand and India, Airin’s path now has an address in Mandrem — and a practice that still begins in the belly.</p>
          <ArrowLink to="/about">Read her story</ArrowLink>
        </div>
      </section>

      <section className="place-strip section-pad">
        <Eyebrow>The place</Eyebrow>
        <h2>
          Casa Christavo,
          <br />
          <em>Junos Wado, Mandrem.</em>
        </h2>
        <p>Sessions from 07:00 IST. Monthly gatherings at Anahata. Private work online worldwide.</p>
        <ArrowLink to="/goa">Visit Goa</ArrowLink>
      </section>

      {articles[0] && (
        <section className="home-note section-pad">
          <Botanical name={articles[0].botanical} />
          <Eyebrow>A field note</Eyebrow>
          <h2>{articles[0].title}</h2>
          <p>{articles[0].intro}</p>
          <ArrowLink to={`/journal/${articles[0].slug}`}>Read the note</ArrowLink>
        </section>
      )}

      <section className="closing-note section-pad" id="begin">
        <p className="script-quote">When you create a sanctuary within, everything you are seeking finds you.</p>
        <div className="hero-actions center">
          <Button to="/contact" tone="dark">
            Begin a conversation <IconArrow />
          </Button>
          <WhatsAppLink>Write on WhatsApp</WhatsAppLink>
        </div>
      </section>
    </Frame>
  );
}
