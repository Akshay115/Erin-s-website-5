import React, { useEffect, useMemo, useState } from 'react';
import { Link, Navigate, useLocation, useParams, useSearchParams } from 'react-router-dom';
import { Frame, Eyebrow, ArrowLink, Button, WhatsAppLink } from '../components/Chrome';
import {
  ElementEmblem,
  LiveMoon,
  OfferingMark,
  Botanical,
  IconArrow,
  IconMail,
  IconPin,
  arts,
} from '../illustrations';
import {
  aboutChapters,
  articles,
  contact,
  credentials,
  elements,
  images,
  offerings,
  retreats,
  sharedSafety,
} from '../content';
import { moonName, moonPhase } from '../lib/moon';

function PageHero({ eyebrow, title, text, image }) {
  return (
    <section className="page-hero film" style={image ? { '--bg': `url(${image})` } : undefined}>
      <div className="hero-shade" />
      <div className="page-hero-copy">
        <Eyebrow light>{eyebrow}</Eyebrow>
        <h1 dangerouslySetInnerHTML={{ __html: title }} />
        {text && <p>{text}</p>}
      </div>
    </section>
  );
}

export function About() {
  return (
    <Frame title="Her story" description="Meet Airin Aquarius, holistic health coach, yoga teacher and embodiment guide based in Mandrem, Goa." element="earth">
      <section className="about-hero">
        <div className="about-col film" style={{ '--bg': `url(${images.coast})` }} />
        <div className="about-intro">
          <Eyebrow>The woman behind the work</Eyebrow>
          <h1>
            Airin
            <br />
            <em>Aquarius</em>
          </h1>
          <p>Health coach, teacher, ocean lover and lifelong student of the body’s quiet wisdom. A life led by the inner tide — from Maryland to Hawaii to Mandrem.</p>
        </div>
      </section>
      {aboutChapters.map((c) => (
        <section className="editorial section-pad about-chapter" key={c.id}>
          <div className="editorial-aside">
            <Botanical name={c.botanical} />
            <Eyebrow>{c.land}</Eyebrow>
            <span>{c.kicker}</span>
          </div>
          <div className="editorial-copy">
            <h2 className="reveal">{c.title}</h2>
            <p className="reveal">{c.body}</p>
          </div>
        </section>
      ))}
      <section className="quote-image film" style={{ '--bg': `url(${images.portrait})` }}>
        <blockquote>“I began to understand the belly not only as digestion, but as confidence, vitality and the center from which we meet life.”</blockquote>
      </section>
      <section className="editorial section-pad">
        <div className="editorial-aside">
          <Eyebrow>The living practice</Eyebrow>
          <span>Today · Mandrem</span>
        </div>
        <div className="editorial-copy">
          <h2>
            Experience became
            <br />
            <em>a way to serve.</em>
          </h2>
          <p>Airin brings nearly two decades of practice into private coaching, movement, meditation, women’s circles and retreats. Her personal story informs her empathy, but does not promise a universal cure.</p>
          <div className="credential-list">
            {credentials.map((x) => (
              <span key={x}>{x}</span>
            ))}
          </div>
          <ArrowLink to="/offerings">Explore ways to work together</ArrowLink>
        </div>
      </section>
    </Frame>
  );
}

export function Approach() {
  const [active, setActive] = useState('fire');
  return (
    <Frame title="Inner Fire Alchemy" description="A whole-person practice shaped by five elements and grounded in daily life." element={active}>
      <PageHero eyebrow="The approach" title="The body is<br/><em>the beginning.</em>" text="Ancient attention. Modern life. A practice shaped by the body, the elements and the rhythms of nature." image={images.ritual} />
      <section className="manifesto section-pad">
        <Eyebrow>Inner Fire Alchemy</Eyebrow>
        <div className="manifesto-grid">
          <h2>
            Heal the fire
            <br />
            in the <em>belly.</em>
          </h2>
          <div>
            <p className="lead">The work begins by making space to notice what your body, habits and inner life are communicating.</p>
            <p>Depending on the offering, that may include health coaching, nourishment practices, yoga, barre, breathwork, meditation, guided reflection, energy awareness, seasonal ritual — and, when it is appropriate, educational support around cleansing and digestive fire.</p>
          </div>
        </div>
      </section>
      <section className="elements-map section-pad" id="map">
        <div className="element-arc">
          {elements.map((el) => (
            <button
              key={el.id}
              type="button"
              id={el.id}
              className={`emblem-btn ${active === el.id ? 'active' : ''}`}
              onMouseEnter={() => setActive(el.id)}
              onFocus={() => setActive(el.id)}
            >
              <ElementEmblem id={el.id} />
              <span>{el.name}</span>
              <small>{el.role}</small>
            </button>
          ))}
        </div>
        <p className="element-line">
          <b>{elements.find((e) => e.id === active)?.line}</b>
          {elements.find((e) => e.id === active)?.copy}
        </p>
      </section>
      <section className="scope section-pad">
        <div>
          <Eyebrow>Clear boundaries</Eyebrow>
          <h2>
            Coaching,
            <br />
            <em>not clinical care.</em>
          </h2>
        </div>
        <div>
          <p>{sharedSafety}</p>
          <p>Consult an appropriate clinician before dietary changes, fasting, herbs or demanding physical practice if you are pregnant, taking medication, managing a health condition or recovering from an eating disorder.</p>
          <ArrowLink to="/faq">Read FAQ & safety</ArrowLink>
        </div>
      </section>
    </Frame>
  );
}

const plantFor = {
  earth: 'tulsi',
  water: 'lotus',
  fire: 'hibiscus',
  air: 'frangipani',
  akasha: 'coconut',
};

function Card({ item }) {
  return (
    <Link className="offering-card reveal" to={`/offerings/${item.slug}`}>
      <div className="card-mark">
        <OfferingMark slug={item.slug} />
        <Botanical name={plantFor[item.element] || 'lotus'} className="card-botanical" />
        <span>{item.number}</span>
      </div>
      <div className="card-body">
        <small>
          {item.category} · {item.audience}
        </small>
        <h3>{item.title}</h3>
        <p>{item.intro}</p>
        <div>
          <span>{item.location}</span>
          <b>{item.price}</b>
        </div>
      </div>
    </Link>
  );
}

export function Offerings() {
  const [params, setParams] = useSearchParams();
  const door = params.get('door') || 'all';
  const filter = params.get('filter') || 'All';
  const shown = offerings.filter((o) => {
    if (door !== 'all' && o.door !== door) return false;
    if (filter === 'Women') return o.audience === 'Women only';
    if (filter === 'Goa') return o.location.toLowerCase().includes('goa') || o.location.includes('Anahata');
    if (filter === 'Online') return /online/i.test(o.location);
    return true;
  });
  const setDoor = (id) => {
    const next = new URLSearchParams(params);
    if (id === 'all') next.delete('door');
    else next.set('door', id);
    setParams(next);
  };
  const setFilter = (f) => {
    const next = new URLSearchParams(params);
    if (f === 'All') next.delete('filter');
    else next.set('filter', f);
    setParams(next);
  };
  return (
    <Frame title="Offerings" description="Private guidance, women’s circles and immersive experiences in Goa and online." element="earth">
      <PageHero eyebrow="Work with Airin" title="Many paths.<br/><em>One return.</em>" text="Private guidance, shared practice and immersive experiences, in Mandrem and online worldwide." image={images.path} />
      <section className="catalog section-pad">
        <div className="filterbar" role="group" aria-label="Filter offerings">
          {[
            ['all', 'All doors'],
            ['private', 'Private'],
            ['circle', 'Circles'],
            ['place', 'Place'],
          ].map(([id, label]) => (
            <button className={door === id ? 'active' : ''} aria-pressed={door === id} onClick={() => setDoor(id)} key={id}>
              {label}
            </button>
          ))}
          <span className="filter-gap" />
          {['All', 'Women', 'Goa', 'Online'].map((f) => (
            <button className={filter === f ? 'active' : ''} aria-pressed={filter === f} onClick={() => setFilter(f)} key={f}>
              {f}
            </button>
          ))}
        </div>
        <div className="river">
          {shown.map((o) => (
            <Card item={o} key={o.slug} />
          ))}
        </div>
        <p className="provisional">Prices, dates and availability marked proposed or to confirm are planning estimates, not payment terms. Airin confirms all details personally before payment.</p>
      </section>
    </Frame>
  );
}

function ChapterExtra({ slug }) {
  const phase = useMemo(() => moonPhase(), []);
  const name = useMemo(() => moonName(), []);
  if (slug === 'sacred-fall-reset') {
    return (
      <div className="chapter-extra">
        <p className="extra-kicker">November new moon · Women only · Live on Zoom</p>
        <ul>
          <li>Weekly circle, tea education, Vedic-inspired teaching</li>
          <li>Chakra-aligned meditations and simple daily ritual</li>
          <li>Reset means attentive routine, not punishment</li>
        </ul>
      </div>
    );
  }
  if (slug === 'moon-circle') {
    return (
      <div className="chapter-extra moon-extra">
        <LiveMoon phase={phase} />
        <div>
          <p className="extra-kicker">{name} · 30–45 minutes</p>
          <p>
            <b>$35</b> single · <b>$300</b> for eight sessions.
          </p>
        </div>
      </div>
    );
  }
  if (slug === 'sip-cacao-meditate') {
    return (
      <div className="chapter-extra">
        <p className="extra-kicker">Anahata · the heart chakra · Mandrem</p>
        <p>Cacao is offered as a labeled serving. A cacao-free place in the circle is always held. Cacao contains caffeine and theobromine.</p>
      </div>
    );
  }
  if (slug === 'inner-fire-immersion') {
    return (
      <div className="chapter-extra map-extra">
        <p className="extra-kicker">Drawn after a conversation, not sold as a package</p>
        <ul className="place-marks">
          <li>Goa</li>
          <li>Hawaii</li>
          <li>Bali</li>
          <li>Thailand</li>
          <li>India</li>
        </ul>
      </div>
    );
  }
  return null;
}

export function Detail() {
  const { slug } = useParams();
  const o = offerings.find((x) => x.slug === slug);
  if (!o) return <NotFound />;
  return (
    <Frame title={o.title} description={o.intro} element={o.element}>
      <PageHero eyebrow={`${o.number} · ${o.category} · ${o.audience}`} title={o.title.replace(' & ', ' &<br/>')} text={o.intro} image={o.image} />
      <section className="detail section-pad">
        <aside>
          <OfferingMark slug={o.slug} />
          <span>{o.location}</span>
          <span>{o.duration}</span>
          <span>{o.price}</span>
          <span>{o.status}</span>
          <span>{o.audience}</span>
          <Button to={`/contact?offering=${o.slug}`} tone="dark">
            {o.cta} <IconArrow />
          </Button>
          <WhatsAppLink />
        </aside>
        <div>
          <Eyebrow>The experience</Eyebrow>
          <h2>
            Personal,
            <br />
            <em>specific, real.</em>
          </h2>
          <p className="lead">{o.story}</p>
          <ChapterExtra slug={o.slug} />
          <h3>What is woven in</h3>
          <ul className="include-list">
            {o.includes.map((x) => (
              <li key={x}>{x}</li>
            ))}
          </ul>
          <h3>Is it for you?</h3>
          <p>{o.forYou}</p>
          <h3>What this is not</h3>
          <p className="fine-print">
            {o.safety} {sharedSafety}
          </p>
          <ArrowLink to="/faq">Read the full FAQ & safety guide</ArrowLink>
        </div>
      </section>
    </Frame>
  );
}

const seasons = [
  { id: 'spring', title: 'The Maiden', slug: 'spring-maiden', note: 'Lighter rhythms. The courage to begin again.' },
  { id: 'summer', title: 'The Wild Woman', slug: 'summer-wild-woman', note: 'Expression, heat, the solar plexus.' },
  { id: 'autumn', title: 'The Wise Woman', slug: 'sacred-fall-reset', note: 'Letting go. Tea. A return to fire.', lit: true },
  { id: 'winter', title: 'The Mystic', slug: 'winter-mystic', note: 'Warmth, inwardness, permission to slow.' },
];

export function Seasons() {
  const { hash } = useLocation();
  const initial = hash.replace('#', '') || 'autumn';
  const [active, setActive] = useState(seasons.some((s) => s.id === initial) ? initial : 'autumn');
  const current = seasons.find((s) => s.id === active);
  const offering = offerings.find((o) => o.slug === current.slug);
  const rotation = { spring: 0, summer: 90, autumn: 180, winter: 270 }[active];
  return (
    <Frame title="Seasonal circles" description="Four women-only seasonal resets — Maiden, Wild Woman, Wise Woman, Mystic." element="earth">
      <section className="simple-hero">
        <Eyebrow>Women only · Live online</Eyebrow>
        <h1>
          A year,
          <br />
          <em>in four fires.</em>
        </h1>
      </section>
      <section className="wheel-section section-pad">
        <div className="wheel-wrap">
          <img src={arts.wheel} alt="Ink and wash seasonal wheel in four botanical quadrants." className="wheel-art" style={{ transform: `rotate(${rotation}deg)` }} loading="lazy" width="800" height="800" />
          <div className="wheel-segs">
            {seasons.map((s) => (
              <button key={s.id} type="button" className={`wheel-seg ${active === s.id ? 'active' : ''} ${s.lit ? 'lit' : ''}`} onClick={() => setActive(s.id)}>
                {s.title}
              </button>
            ))}
          </div>
        </div>
        <div className="wheel-copy">
          <Eyebrow>{active}</Eyebrow>
          <h2>
            {current.title}
            {current.lit ? <em> · now</em> : null}
          </h2>
          <p className="lead">{offering?.intro}</p>
          <p>{current.note} Reset means attentive routine, not punishment. Herbs require screening.</p>
          <Button to={`/offerings/${current.slug}`} tone="dark">
            Enter this season <IconArrow />
          </Button>
        </div>
      </section>
    </Frame>
  );
}

export function MoonPage() {
  const phase = useMemo(() => moonPhase(), []);
  const name = useMemo(() => moonName(), []);
  return (
    <Frame title="Sacred Moon Circle" description="Live guided meditations on Zoom around each new and full moon." element="akasha">
      <section className="moon-hero">
        <LiveMoon phase={phase} className="moon-large" />
        <div>
          <Eyebrow light>Women only · Live online</Eyebrow>
          <h1>
            The Meditation
            <br />
            <em>Circle.</em>
          </h1>
          <p>
            {name} tonight. Two evenings each month we gather to soften, listen and remember. No experience required — only your breath and a quiet corner.
          </p>
        </div>
      </section>
      <section className="section-pad moon-body">
        <div>
          <h3>New moon</h3>
          <p>Planting intentions in the dark fertile space of beginning.</p>
        </div>
        <div>
          <h3>Full moon</h3>
          <p>Release and illumination — let what is true come into focus.</p>
        </div>
        <ol className="how">
          <li>Write to be added to the circle list.</li>
          <li>Receive the Zoom link a few days before each moon.</li>
          <li>Arrive and be held — 30–45 minutes, live and intimate.</li>
        </ol>
        <p>
          <b>$35</b> single · <b>$300</b> for eight.
        </p>
        <Button to="/contact?offering=moon-circle" tone="dark">
          Join the circle <IconArrow />
        </Button>
        <WhatsAppLink />
      </section>
    </Frame>
  );
}

export function Retreats() {
  const main = retreats[0];
  return (
    <Frame title="Retreats" description="Retreats in Goa where movement, nourishment, nature and meaningful rest meet." element="water">
      <PageHero eyebrow="Immersive practice" title="Leave the noise.<br/><em>Keep what matters.</em>" text="Retreats in Mandrem where movement, nourishment, nature and meaningful rest meet." image={images.coast} />
      <section className="retreat-intro section-pad">
        <Eyebrow>Upcoming · Proposed</Eyebrow>
        <div>
          <h2>
            New Year,
            <br />
            <em>New Beginnings</em>
          </h2>
          <p className="lead">{main.date} · Goa</p>
          <p>{main.description}</p>
          <Button to="/contact?offering=goa-new-beginnings" tone="dark">
            Join the interest list <IconArrow />
          </Button>
        </div>
      </section>
      <section className="retreat-days">
        <div className="retreat-image film" style={{ '--bg': `url(${images.path})` }} />
        <div className="day-list">
          <Eyebrow light>A rhythm, not a schedule</Eyebrow>
          {main.rhythm.map((x, i) => (
            <div key={x}>
              <span>0{i + 1}</span>
              <p>{x}</p>
            </div>
          ))}
        </div>
      </section>
      <section className="scope section-pad">
        <div>
          <Eyebrow>Held with care</Eyebrow>
          <h2>
            Details,
            <br />
            <em>when they are real.</em>
          </h2>
        </div>
        <div>
          <p>
            {main.duration} · {main.price} · {main.audience}
          </p>
          <p>{main.safety}</p>
        </div>
      </section>
      <section className="monthly section-pad dark">
        <Eyebrow light>Monthly at Anahata</Eyebrow>
        <h2>
          Wellness & movement
          <br />
          <em>retreats.</em>
        </h2>
        <p>Intimate Goa weekends for conscious movement, nourishing food, reflection and reset. Next date and format to be confirmed.</p>
        <ArrowLink to="/contact?offering=anahata-monthly">Ask for the next date</ArrowLink>
      </section>
    </Frame>
  );
}

export function Goa() {
  const [dropped, setDropped] = useState(false);
  useEffect(() => {
    const t = setTimeout(() => setDropped(true), 200);
    return () => clearTimeout(t);
  }, []);
  const embed = `https://maps.google.com/maps?q=${contact.lat},${contact.lng}&z=16&output=embed`;
  return (
    <Frame title="Visit Mandrem" description="Find Airin Aquarius in Mandrem, North Goa — Casa Christavo, Junos Wado." element="earth">
      <section className="simple-hero">
        <Eyebrow>The place</Eyebrow>
        <h1>
          I am here.
          <br />
          <em>Come as you are.</em>
        </h1>
      </section>
      <section className="goa-grid section-pad">
        <div>
          <h2>{contact.listing}</h2>
          <p>{contact.place}</p>
          <p>
            Mandrem, North Goa · near Arambol
            <br />
            {contact.hours}
          </p>
          <p>Monthly gatherings at Anahata — cacao, yoga, weekend retreats. Private work also online worldwide.</p>
          <p className="fine-print">Nearest airport: GOI. North Goa coastal road toward Mandrem / Arambol.</p>
          <WhatsAppLink>WhatsApp first</WhatsAppLink>
          <p>
            <a href={`mailto:${contact.email}`}>{contact.email}</a>
          </p>
        </div>
        <div className={`goa-map ${dropped ? 'dropped' : ''}`}>
          <iframe title="Map of Airin Aquarius in Mandrem" src={embed} loading="lazy" referrerPolicy="no-referrer-when-downgrade" />
          <span className="seed-pin" />
        </div>
      </section>
    </Frame>
  );
}

export function Journal() {
  return (
    <Frame title="Field notes" description="Reflections on nourishment, movement, ritual and the seasons." element="air">
      <PageHero eyebrow="Field notes" title="Ideas for a<br/><em>more embodied life.</em>" text="Reflections on nourishment, movement, the nervous system, ritual and the seasons." image={images.moon} />
      <section className="notes section-pad">
        {articles.map((a, i) => (
          <Link className="note-card reveal" to={`/journal/${a.slug}`} key={a.slug}>
            <Botanical name={a.botanical} />
            <span>
              0{i + 1} · {a.category}
            </span>
            <h2>{a.title}</h2>
            <p>{a.intro}</p>
          </Link>
        ))}
      </section>
      <Newsletter />
    </Frame>
  );
}

export function Article() {
  const { slug } = useParams();
  const article = articles.find((a) => a.slug === slug);
  if (!article) return <NotFound />;
  return (
    <Frame title={article.title} description={article.intro} element="earth">
      <article className="article-page">
        <div className="article-image film" style={{ '--bg': `url(${article.image})` }} />
        <div className="article-copy">
          <Botanical name={article.botanical} />
          <Eyebrow>{article.category}</Eyebrow>
          <h1>{article.title}</h1>
          <p className="lead">{article.intro}</p>
          {article.paragraphs.map((p) => (
            <p key={p}>{p}</p>
          ))}
          <p className="fine-print">This educational note is not medical advice. Consult a qualified professional for personal health questions.</p>
          <ArrowLink to="/journal">Back to field notes</ArrowLink>
        </div>
      </article>
    </Frame>
  );
}

function Newsletter() {
  const [sent, setSent] = useState(false);
  return (
    <section className="newsletter section-pad">
      <Eyebrow>The seasonal letter</Eyebrow>
      <h2>
        A quieter note,
        <br />
        <em>now and then.</em>
      </h2>
      <p>Field notes, practices and first invitations to circles and retreats.</p>
      {sent ? (
        <p className="form-success">Your request is ready to send. Check your email app.</p>
      ) : (
        <form action={`https://formsubmit.co/${contact.email}`} method="POST" onSubmit={() => setSent(true)}>
          <input type="hidden" name="_subject" value="Join the Airin Aquarius seasonal letter" />
          <input type="hidden" name="_captcha" value="false" />
          <input type="email" name="email" placeholder="Your email address" aria-label="Your email address" required />
          <button type="submit" aria-label="Join newsletter">
            <IconArrow />
          </button>
        </form>
      )}
      <small>By subscribing, you agree to receive occasional notes. Unsubscribe at any time.</small>
    </section>
  );
}

export function FAQ() {
  const questions = [
    ['Is Airin’s work open to everyone?', 'Yes. Private coaching, movement, energy sessions, retreats and immersions welcome everyone. Sacred Moon Circle, all Seasonal Resets and Embodied Woman are women-only containers.'],
    ['Where are sessions held?', 'Airin is based in Mandrem, Goa, at Casa Christavo, Junos Wado. Selected sessions and events are held in person and at Anahata; private work, circles and programs are also available online worldwide.'],
    ['Are dates and prices final?', 'The current guide uses proposed 2026–27 dates and USD pricing. Airin confirms exact timing, inclusions and payment terms personally before payment.'],
    ['Is this medical care?', sharedSafety],
    ['Who should seek medical guidance first?', 'Anyone pregnant, taking medication, managing a health condition, recovering from an eating disorder or considering fasting, cleansing, herbs or significant dietary changes should consult an appropriate clinician first.'],
    ['What time zone is used?', 'All live times use India Standard Time, IST (UTC+5:30). Booking confirmations should also display your local time.'],
    ['How do I book?', 'WhatsApp is the most direct path. You may also use the inquiry form or email. You do not need to know the exact offering.'],
  ];
  return (
    <Frame title="FAQ & safety" element="earth">
      <section className="simple-hero">
        <Eyebrow>Clarity & care</Eyebrow>
        <h1>
          Frequently asked
          <br />
          <em>questions.</em>
        </h1>
      </section>
      <section className="faq section-pad">
        {questions.map(([q, a], i) => (
          <details key={q}>
            <summary>
              <span>0{i + 1}</span>
              {q}
            </summary>
            <p>{a}</p>
          </details>
        ))}
      </section>
    </Frame>
  );
}

export function Contact() {
  const params = new URLSearchParams(window.location.search);
  const initial = offerings.find((o) => o.slug === params.get('offering'))?.title || '';
  const [sent, setSent] = useState(false);
  return (
    <Frame title="Begin a conversation" element="fire">
      <section className="contact-hero">
        <div className="contact-copy">
          <Eyebrow light>Begin here</Eyebrow>
          <h1>
            Tell us what
            <br />
            <em>is calling you.</em>
          </h1>
          <p>You do not need to know the exact offering. Share where you are and Airin will recommend a thoughtful next step.</p>
          <div className="contact-lines">
            <a href={`mailto:${contact.email}`}>
              <IconMail />
              {contact.email}
            </a>
            <WhatsAppLink>+1 808 634 3262 · WhatsApp preferred</WhatsAppLink>
            <a href={contact.maps} target="_blank" rel="noreferrer">
              <IconPin />
              Mandrem, Goa
            </a>
          </div>
        </div>
        <div className="contact-form-wrap">
          {sent ? (
            <div className="sent">
              <h2>Your letter is on its way.</h2>
              <p>Thank you. Airin usually responds personally within 2–4 days.</p>
              <WhatsAppLink />
            </div>
          ) : (
            <form className="contact-form" action={`https://formsubmit.co/${contact.email}`} method="POST" onSubmit={() => setSent(true)}>
              <input type="hidden" name="_subject" value="New Airin Aquarius website inquiry" />
              <input type="hidden" name="_captcha" value="false" />
              <input type="hidden" name="_template" value="table" />
              <label>
                Your name
                <input name="name" required />
              </label>
              <label>
                Email address
                <input type="email" name="email" required />
              </label>
              <label>
                What are you drawn to?
                <select name="offering" defaultValue={initial} required>
                  <option value="" disabled>
                    Choose an offering
                  </option>
                  {offerings.map((o) => (
                    <option key={o.slug}>{o.title}</option>
                  ))}
                  <option>I’m not sure yet</option>
                </select>
              </label>
              <label>
                Tell Airin a little about where you are
                <textarea name="message" rows="5" required />
              </label>
              <label className="consent">
                <input type="checkbox" name="wellness_consent" value="accepted" required />
                <span>I understand this inquiry is not medical care and consent to Airin receiving these details.</span>
              </label>
              <button className="button dark" type="submit">
                Send my inquiry <IconArrow />
              </button>
              <small>Do not include medical records or urgent health details.</small>
            </form>
          )}
        </div>
      </section>
    </Frame>
  );
}

export function Legal({ terms = false }) {
  return (
    <Frame title={terms ? 'Terms & policies' : 'Privacy & wellness notice'} element="earth">
      <section className="simple-hero">
        <Eyebrow>{terms ? 'Clear expectations' : 'Careful practice'}</Eyebrow>
        <h1>
          {terms ? (
            <>
              Terms &<br />
              <em>policies.</em>
            </>
          ) : (
            <>
              Privacy &<br />
              <em>wellness notice.</em>
            </>
          )}
        </h1>
      </section>
      <section className="legal section-pad">
        <h2>{terms ? 'Booking and payment' : 'Your information'}</h2>
        <p>
          {terms
            ? 'All dates, prices and inclusions are confirmed before payment. A place is not reserved until Airin confirms it in writing. Any deposit, payment plan, cancellation and refund terms will be provided with the specific offering guide before payment.'
            : 'Information you send by email, WhatsApp or the inquiry form is used to respond, recommend an offering and administer services you choose. Do not submit medical records or highly sensitive health information through a general inquiry form.'}
        </p>
        <h2>{terms ? 'Cancellations and retreats' : 'Wellness scope'}</h2>
        <p>
          {terms
            ? 'Private sessions require at least 24 hours notice to reschedule. Retreat and group-program terms vary by venue and will be disclosed before enrollment. Travel insurance is recommended for residential retreats.'
            : sharedSafety}
        </p>
        <h2>{terms ? 'Consent and boundaries' : 'Third parties'}</h2>
        <p>
          {terms
            ? 'You may pause or decline any movement, breath, touch, meditation, dietary or group-sharing practice. Any in-person touch requires explicit consent. Airin may refer a participant to a licensed professional when a need falls outside her scope.'
            : 'Booking, payments, video calls and email may use third-party providers. Their privacy policies apply. The site currently uses FormSubmit for inquiry delivery and does not sell personal information.'}
        </p>
        <h2>Contact</h2>
        <p>
          Questions can be sent to <a href={`mailto:${contact.email}`}>{contact.email}</a>.
        </p>
      </section>
    </Frame>
  );
}

export function NotFound() {
  return (
    <Frame title="Path not found">
      <section className="simple-hero">
        <Eyebrow>404</Eyebrow>
        <h1>
          This path returns
          <br />
          <em>to the sea.</em>
        </h1>
        <ArrowLink to="/">Return home</ArrowLink>
      </section>
    </Frame>
  );
}

export function WorkRedirect() {
  return <Navigate to="/approach" replace />;
}

export function FallRedirect() {
  return <Navigate to="/offerings/sacred-fall-reset" replace />;
}
