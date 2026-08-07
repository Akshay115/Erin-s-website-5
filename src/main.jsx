import React, { useEffect, useState } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter, Link, NavLink, Route, Routes, useLocation } from 'react-router-dom';
import { ArrowDown, ArrowRight, CalendarDays, Check, ChevronDown, Clock3, Mail, MapPin, Menu, Moon, MoveUpRight, Phone, Sparkles, X } from 'lucide-react';
import './styles.css';

const IMG = {
  coast: 'https://soul-flame-awakening.lovable.app/assets/hero-Do8EnKhm.jpg',
  portrait: 'https://soul-flame-awakening.lovable.app/assets/portrait-BY9sf10L.jpg',
  ritual: 'https://soul-flame-awakening.lovable.app/assets/ritual-DX4vQ_oO.jpg',
  moon: 'https://soul-flame-awakening.lovable.app/assets/moon-C70dy_yC.jpg',
  path: 'https://soul-flame-awakening.lovable.app/assets/offerings-pathway-BgQCgO2I.jpg',
};

const offerings = [
  { slug: 'mentoring', index: '01', title: 'One-to-One Mentoring', type: 'Private · Everyone', place: 'Online worldwide', price: '$1,800 / 12 weeks', text: 'A considered private container weaving holistic health coaching, intuitive insight, movement, breath, nourishment and sustainable daily practice.', image: IMG.portrait },
  { slug: 'intuitive-session', index: '02', title: 'Intuitive Health & Energy Session', type: 'Private · Everyone', place: 'Online worldwide', price: '$175 / 75 minutes', text: 'A focused session to listen closely to your present patterns and leave with a grounded, personal pathway forward.', image: IMG.ritual },
  { slug: 'seasonal-reset', index: '03', title: 'Seasonal Reset', type: 'Group · Women only', place: 'Live online', price: '$395 / 4 weeks', text: 'A seasonal rhythm of nourishment, gentle cleansing, movement, guided reflection and sisterhood.', image: IMG.path },
  { slug: 'moon-circle', index: '04', title: 'Sacred Moon Circle', type: 'Group · Women only', place: 'Live online', price: '$35 / gathering', text: 'A monthly new moon gathering for meditation, journaling, feminine wisdom, intention and meaningful connection.', image: IMG.moon },
  { slug: 'movement', index: '05', title: 'Yoga, Meditation & Barre', type: 'Private & group · Everyone', place: 'Goa & online', price: 'From $75', text: 'Tantric yoga, barre, breathwork and meditation practices that invite strength, ease and a more intimate relationship with the body.', image: IMG.coast },
  { slug: 'energy-healing', index: '06', title: 'Energy Healing', type: 'Private · Everyone', place: 'Goa & online', price: '$125 / 60 minutes', text: 'A quiet space for subtle-body awareness, guided breath, rest and energetic renewal.', image: IMG.ritual },
  { slug: 'five-day-reset', index: '07', title: 'Five-Day Elemental Reset', type: 'Self-guided · Everyone', place: 'Online', price: '$79', text: 'Five days, five elements and one simple daily ritual: a short return to rhythm, clarity and intentional living.', image: IMG.path },
  { slug: 'embodied-woman', index: '08', title: 'Embodied Woman', type: 'Group · Women only', place: 'Live online', price: '$995 / 10 weeks', text: 'A signature journey through feminine embodiment, confidence, movement, nourishment, mindset and deep self-connection.', image: IMG.portrait },
  { slug: 'cacao', index: '09', title: 'Sip Cacao & Meditate', type: 'Monthly · Everyone', place: 'Anahata, Goa', price: '$45', text: 'A heart-centered evening of ceremonial cacao, stillness and guided meditation at Anahata.', image: IMG.ritual },
  { slug: 'immersion', index: '10', title: 'Inner Fire Immersion', type: 'Bespoke · Everyone', place: 'Goa & selected destinations', price: 'Custom proposal', text: 'A private or small-group immersion shaped around movement, meditation, nourishing food, energy work and place.', image: IMG.coast },
];

const elements = [
  { name: 'Earth', note: 'The body', text: 'Nourishment, steadiness, strength and the practices that bring us back to what is real.' },
  { name: 'Water', note: 'The feeling', text: 'Emotion, creativity, sensuality and the intelligence of learning to move rather than hold.' },
  { name: 'Fire', note: 'The calling', text: 'Passion, digestion, confidence and the inner energy that lets a life become fully lived.' },
  { name: 'Air', note: 'The breath', text: 'Movement, spaciousness and the subtle shift that begins with one conscious inhale.' },
  { name: 'Akasha', note: 'The sacred', text: 'Ritual, presence, intuition and a quiet connection to what cannot always be named.' },
];

function ScrollReset() {
  const { pathname } = useLocation();
  useEffect(() => { window.scrollTo(0, 0); }, [pathname]);
  return null;
}

function Header() {
  const [open, setOpen] = useState(false);
  const { pathname } = useLocation();
  useEffect(() => setOpen(false), [pathname]);
  return <header className="site-header">
    <Link className="brand" to="/" aria-label="Airin Aquarius home"><span>Airin</span><span>Aquarius</span></Link>
    <nav className={open ? 'nav open' : 'nav'} aria-label="Primary navigation">
      <NavLink to="/about">Her story</NavLink><NavLink to="/work">The work</NavLink><NavLink to="/offerings">Offerings</NavLink><NavLink to="/retreats">Retreats</NavLink><NavLink to="/journal">Field notes</NavLink>
      <Link className="nav-cta" to="/contact">Begin <ArrowRight size={15}/></Link>
    </nav>
    <button className="menu-btn" onClick={() => setOpen(!open)} aria-label={open ? 'Close menu' : 'Open menu'}>{open ? <X/> : <Menu/>}</button>
  </header>;
}

function Footer() {
  return <footer className="footer">
    <div className="footer-lead"><span className="eyebrow light">Goa · India · Worldwide</span><h2>Meet yourself<br/><em>where you are.</em></h2><Link className="circle-link" to="/contact"><ArrowRight/><span>Begin</span></Link></div>
    <div className="footer-grid">
      <div><Link className="brand footer-brand" to="/"><span>Airin</span><span>Aquarius</span></Link><p>Holistic health, movement and embodied practice from Goa.</p></div>
      <div><b>Explore</b><Link to="/about">Her story</Link><Link to="/offerings">Offerings</Link><Link to="/retreats">Retreats</Link><Link to="/journal">Field notes</Link></div>
      <div><b>Connect</b><a href="mailto:healthcoach.airin@gmail.com">Email</a><a href="https://wa.me/18086343262" target="_blank" rel="noreferrer">WhatsApp</a><a href="https://maps.app.goo.gl/8esgEWqfmnAfVz7S7" target="_blank" rel="noreferrer">Find in Goa</a></div>
      <div><b>Details</b><Link to="/faq">FAQ & safety</Link><Link to="/privacy">Privacy</Link><span>IST · UTC +5:30</span></div>
    </div>
    <div className="footer-bottom"><span>© 2026 Airin Aquarius</span><span>Creating a sanctuary within.</span></div>
  </footer>;
}

function Frame({ children }) { return <><ScrollReset/><Header/><main>{children}</main><Footer/></>; }
function Eyebrow({children, light=false}) { return <span className={light ? 'eyebrow light' : 'eyebrow'}>{children}</span>; }
function ArrowLink({to, children}) { return <Link className="arrow-link" to={to}>{children}<ArrowRight size={17}/></Link>; }

function Home() {
  return <Frame>
    <section className="hero" style={{'--bg': `url(${IMG.coast})`}}>
      <div className="hero-shade"/><div className="film-mark">A practice in five elements <span>01 / 05</span></div>
      <div className="hero-copy"><Eyebrow light>Holistic health · Movement · Ritual</Eyebrow><h1>A sanctuary<br/>begins <em>within.</em></h1><p>Come home to your body through nourishment, movement, breath and sacred daily practice.</p><div className="hero-actions"><Link className="button pale" to="/offerings">Explore the work <ArrowRight size={16}/></Link><Link className="text-link" to="/about">Meet Airin</Link></div></div>
      <div className="hero-location"><MapPin size={15}/> Goa, India<br/><span>Online worldwide</span></div><ArrowDown className="scroll-cue"/>
    </section>

    <section className="manifesto section-pad">
      <Eyebrow>Inner alchemy</Eyebrow>
      <div className="manifesto-grid"><h2>Less fixing.<br/>More <em>listening.</em></h2><div><p className="lead">Airin’s work is an invitation to reconnect with the intelligence already living inside you.</p><p>Ancient contemplative traditions meet modern holistic health education in a practice shaped by the body, the elements and the rhythms of nature. No rigid formula. A slower, more sustainable return to vitality and presence.</p><ArrowLink to="/work">Discover the approach</ArrowLink></div></div>
    </section>

    <section className="cinema-split">
      <div className="image-panel portrait-panel" style={{'--bg': `url(${IMG.portrait})`}}><div className="image-caption">Airin Aquarius<br/><span>Goa, 2026</span></div></div>
      <div className="story-panel"><Eyebrow light>Her story</Eyebrow><blockquote>“The body is not a problem to solve. It is a place to return to.”</blockquote><p>From the wild coast of Hawaii to years of study across Bali, Thailand and India, Airin’s path has always followed the meeting point between movement, nourishment and the unseen.</p><ArrowLink to="/about">Read her story</ArrowLink></div>
    </section>

    <section className="elements section-pad">
      <div className="section-title"><Eyebrow>The five elements</Eyebrow><h2>A living map<br/>back to <em>yourself.</em></h2></div>
      <div className="element-list">{elements.map((el, i) => <article className="element-row" key={el.name}><span>0{i+1}</span><h3>{el.name}</h3><b>{el.note}</b><p>{el.text}</p></article>)}</div>
    </section>

    <section className="featured section-pad dark">
      <div className="section-title row"><div><Eyebrow light>Ways to begin</Eyebrow><h2>Choose your<br/><em>path inward.</em></h2></div><ArrowLink to="/offerings">View every offering</ArrowLink></div>
      <div className="offering-grid">{offerings.slice(0,4).map(o => <OfferingCard key={o.slug} item={o}/>)}</div>
    </section>

    <section className="retreat-feature" style={{'--bg': `url(${IMG.path})`}}><div className="retreat-copy"><Eyebrow light>Goa · January 14–18, 2027</Eyebrow><h2>New year.<br/><em>New beginnings.</em></h2><p>A five-day pause for yoga, meditation, dance, nourishing food, bodywork and a more intentional beginning.</p><Link className="button pale" to="/retreats">Enter the retreat <ArrowRight size={16}/></Link></div></section>

    <section className="closing-note section-pad"><Moon/><p>What if wellness was not another task,<br/>but a way of being more fully alive?</p><ArrowLink to="/contact">Begin a conversation</ArrowLink></section>
  </Frame>;
}

function OfferingCard({item}) {
  return <Link className="offering-card" to={`/offerings/${item.slug}`}><div className="card-image" style={{'--bg': `url(${item.image})`}}><span>{item.index}</span><MoveUpRight/></div><div className="card-body"><small>{item.type}</small><h3>{item.title}</h3><p>{item.text}</p><div><span>{item.place}</span><b>{item.price}</b></div></div></Link>;
}

function PageHero({eyebrow, title, text, image=IMG.path, align='bottom'}) {
  return <section className={`page-hero ${align}`} style={{'--bg': `url(${image})`}}><div className="hero-shade"/><div className="page-hero-copy"><Eyebrow light>{eyebrow}</Eyebrow><h1 dangerouslySetInnerHTML={{__html:title}}/><p>{text}</p></div></section>;
}

function About() {
  return <Frame><PageHero eyebrow="The woman behind the work" title="A life led by<br/><em>the inner tide.</em>" text="Health coach, teacher, ocean lover and lifelong student of the body’s quiet wisdom." image={IMG.portrait}/>
    <section className="editorial section-pad"><div className="editorial-aside"><Eyebrow>Chapter one</Eyebrow><span>Maryland → Hawaii → Goa</span></div><div className="editorial-copy"><p className="dropcap">Airin’s story began far from Goa. Raised in Maryland and working as a model from the age of fifteen, she arrived in Hawaii at twenty-two and found another way to live.</p><p>Island life became her teacher. Surfing, sailing, growing close to the land and helping create an organic Indian café changed her relationship with food, community and the natural world. She even sailed from Hawaii to Fiji, learning to trust rhythm, weather and the intelligence of attention.</p><p>Yoga became a path home through early wounds and into a more peaceful relationship with herself. That path led onward: Tantric Yoga studies in Bali, time with traditional healers in Bali and Thailand, massage training in Hawaii, holistic health coaching education and further study in gut health.</p></div></section>
    <section className="quote-image" style={{'--bg': `url(${IMG.coast})`}}><blockquote>“I began to understand the belly not only as digestion, but as confidence, vitality and the center from which we meet life.”</blockquote></section>
    <section className="editorial section-pad"><div className="editorial-aside"><Eyebrow>Chapter two</Eyebrow><span>The lived practice</span></div><div className="editorial-copy"><h2>Experience became<br/><em>a way to serve.</em></h2><p>After navigating her own period of low energy, digestive discomfort, skin concerns and anxiety, Airin began a deeper inquiry into nourishment, cleansing and sustainable ritual. Her personal experience informs her empathy, but her work does not offer a universal cure or replace medical care.</p><p>Today, from Goa, she brings nearly two decades of practice into private coaching, movement, meditation, women’s circles and retreats. Her approach honors both evidence-informed wellness education and the contemplative traditions that shaped her.</p><div className="credential-list"><span><Check/> Certified Holistic Health Coach</span><span><Check/> Tantric Yoga Teacher</span><span><Check/> Meditation & Embodiment Guide</span><span><Check/> Further study in gut health</span><span><Check/> Training in energy and chakra healing</span><span><Check/> Massage training in Hawaii</span></div><ArrowLink to="/offerings">Explore ways to work together</ArrowLink></div></section>
  </Frame>;
}

function Work() {
  return <Frame><PageHero eyebrow="The approach" title="The body is<br/><em>the beginning.</em>" text="A whole-person practice shaped by five elements and grounded in daily life." image={IMG.ritual}/>
    <section className="manifesto section-pad"><Eyebrow>Inner Fire Alchemy</Eyebrow><div className="manifesto-grid"><h2>Ancient attention.<br/><em>Modern life.</em></h2><div><p className="lead">The work begins by making space to notice what your body, habits and inner life are communicating.</p><p>Depending on the offering, that may include health coaching, nourishment practices, yoga, barre, breathwork, meditation, guided reflection, energy awareness and seasonal ritual. The intention is not perfection. It is a more honest and sustainable relationship with yourself.</p></div></div></section>
    <section className="work-elements">{elements.map((e,i)=><article key={e.name}><span>0{i+1} / 05</span><div><Eyebrow>{e.note}</Eyebrow><h2>{e.name}</h2><p>{e.text}</p></div></article>)}</section>
    <section className="scope section-pad"><div><Eyebrow>Clear boundaries</Eyebrow><h2>Coaching,<br/><em>not clinical care.</em></h2></div><div><p>Airin offers wellness education, coaching, movement and contemplative practices. She does not diagnose disease, prescribe medication or replace a licensed medical professional.</p><p>Anyone who is pregnant, managing a health condition, taking medication, recovering from an eating disorder or considering fasting or dietary changes should consult an appropriate clinician first.</p><ArrowLink to="/faq">Read FAQ & safety</ArrowLink></div></section>
  </Frame>;
}

function Offerings() {
  const [filter,setFilter] = useState('All');
  const shown = offerings.filter(o => filter==='All' || (filter==='Women' ? o.type.includes('Women') : filter==='Goa' ? o.place.includes('Goa') || o.place.includes('Anahata') : o.place.includes('Online')));
  return <Frame><PageHero eyebrow="Work with Airin" title="Many paths.<br/><em>One return.</em>" text="Private guidance, shared practice and immersive experiences, in Goa and online worldwide." image={IMG.path}/>
    <section className="catalog section-pad"><div className="filterbar" aria-label="Filter offerings">{['All','Women','Goa','Online'].map(f=><button className={filter===f?'active':''} onClick={()=>setFilter(f)} key={f}>{f}</button>)}</div><div className="offering-grid catalog-grid">{shown.map(o=><OfferingCard item={o} key={o.slug}/>)}</div><p className="provisional">Dates and pricing shown are the proposed 2026–27 program guide and will be confirmed personally before payment.</p></section>
  </Frame>;
}

function OfferingDetail() {
  const { pathname } = useLocation(); const slug = pathname.split('/').pop(); const o = offerings.find(x=>x.slug===slug) || offerings[0];
  const isWomen = o.type.includes('Women');
  return <Frame><PageHero eyebrow={`${o.index} · ${o.type}`} title={`${o.title.replace(' & ',' &<br/>')}`} text={o.text} image={o.image}/>
    <section className="detail section-pad"><aside><span>{o.place}</span><span>{o.price}</span><span>{isWomen?'A women-only container':'Open to everyone'}</span><Link className="button dark-button" to="/contact">Request your place <ArrowRight size={16}/></Link></aside><div><Eyebrow>The experience</Eyebrow><h2>A practice made<br/><em>personal and real.</em></h2><p className="lead">This experience brings Airin’s elemental approach into a clear, supportive format, with space to listen, practice and integrate.</p><p>Each offering is adapted to its setting and participants. You can expect thoughtful preparation, grounded guidance and practices that translate beyond the session into everyday life.</p><h3>What may be included</h3><ul className="include-list"><li>Guided movement, meditation or breathwork</li><li>Personal reflection and practical integration</li><li>Nourishment and lifestyle education where relevant</li><li>Elemental and seasonal practices</li><li>A clear next step after the experience</li></ul><p className="fine-print">Exact dates, inclusions and payment terms are confirmed during inquiry. Health coaching and contemplative practices are educational and do not replace medical care.</p></div></section>
  </Frame>;
}

function Retreats() {
  return <Frame><PageHero eyebrow="Immersive practice" title="Leave the noise.<br/><em>Keep what matters.</em>" text="Retreats in Goa where movement, nourishment, nature and meaningful rest meet." image={IMG.coast}/>
    <section className="retreat-intro section-pad"><Eyebrow>Upcoming · Proposed dates</Eyebrow><div><h2>New Year,<br/><em>New Beginnings</em></h2><p className="lead">January 14–18, 2027 · Goa</p><p>A five-day restorative experience with yoga, meditation, dance, conscious movement, sound, massage, nourishing food, nature and transformational workshops.</p></div></section>
    <section className="retreat-days"><div className="retreat-image" style={{'--bg':`url(${IMG.path})`}}/><div className="day-list"><Eyebrow light>A rhythm, not a schedule</Eyebrow>{['Dawn practice','Seasonal breakfast','Workshop or bodywork','Rest, water, nature','Sunset movement','Shared evening ritual'].map((x,i)=><div key={x}><span>0{i+1}</span><p>{x}</p></div>)}</div></section>
    <section className="retreat-details section-pad"><div><Eyebrow>The details</Eyebrow><h2>Five days<br/><em>held with care.</em></h2></div><div className="facts"><span><MapPin/> Goa, India</span><span><CalendarDays/> January 14–18, 2027</span><span><Clock3/> Five days / four nights</span><span><Sparkles/> Open to everyone</span><span>From $1,650 USD</span><span>Deposit & payment plan available</span></div><div><p>Final venue, room categories, transfers and complete inclusions will be confirmed before deposits are accepted.</p><Link className="button dark-button" to="/contact">Join the retreat list <ArrowRight size={16}/></Link></div></section>
    <section className="monthly section-pad dark"><Eyebrow light>Monthly at Anahata</Eyebrow><h2>Wellness, detox<br/>& movement <em>retreats.</em></h2><p>Intimate Goa weekends for conscious movement, nourishing food, reflection and reset. Proposed from $295 USD.</p><ArrowLink to="/contact">Ask for the next date</ArrowLink></section>
  </Frame>;
}

const notes = [
  {title:'The quiet intelligence of seasonal living', tag:'Seasonal practice', image:IMG.path},
  {title:'Five small rituals for returning to your body', tag:'Embodiment', image:IMG.portrait},
  {title:'A gentler conversation with the belly', tag:'Nourishment', image:IMG.ritual},
];
function Journal(){return <Frame><PageHero eyebrow="Field notes" title="Ideas for a<br/><em>more embodied life.</em>" text="Reflections on nourishment, movement, the nervous system, ritual and the seasons." image={IMG.moon}/><section className="notes section-pad">{notes.map((n,i)=><article key={n.title}><div style={{'--bg':`url(${n.image})`}}/><span>0{i+1} · {n.tag}</span><h2>{n.title}</h2><p>Coming soon. Join the seasonal letter to receive new field notes and upcoming dates.</p></article>)}</section><Newsletter/></Frame>}

function Newsletter(){return <section className="newsletter section-pad"><Eyebrow>The seasonal letter</Eyebrow><h2>A quieter note,<br/><em>now and then.</em></h2><p>Field notes, practices and first invitations to circles and retreats.</p><form onSubmit={e=>e.preventDefault()}><label><span className="sr-only">Email address</span><input type="email" placeholder="Your email address" required/></label><button type="submit" aria-label="Join newsletter"><ArrowRight/></button></form><small>Newsletter connection will be activated before launch.</small></section>}

function FAQ(){const qs=[['Is Airin’s work open to everyone?','Yes. Private coaching, movement, energy sessions, retreats and immersions welcome everyone. Sacred Moon Circle, Seasonal Resets and Embodied Woman are women-only containers.'],['Where are sessions held?','Airin is based in Goa, India. Selected sessions and events are held in person; private work, circles and programs are also available online worldwide.'],['Are dates and prices final?','The current guide uses proposed 2026–27 dates and USD pricing. Airin confirms exact timing, inclusions and payment terms personally before any payment.'],['Is this medical care?','No. Airin offers wellness coaching, education, movement and contemplative practice. This work does not diagnose, treat or replace care from a qualified medical professional.'],['Who should seek medical guidance first?','Anyone pregnant, taking medication, managing a health condition, recovering from an eating disorder or considering fasting, cleansing, herbs or significant dietary changes should consult an appropriate clinician first.'],['What time zone is used?','All published live times use India Standard Time, IST (UTC+5:30). Booking confirmations should also display your local time.'],['How do I book?','Begin with the inquiry form or WhatsApp. Airin will recommend a direct session, a complimentary discovery call or an application depending on the offering.']]; return <Frame><section className="simple-hero"><Eyebrow>Clarity & care</Eyebrow><h1>Frequently asked<br/><em>questions.</em></h1></section><section className="faq section-pad">{qs.map(([q,a],i)=><details key={q}><summary><span>0{i+1}</span>{q}<ChevronDown/></summary><p>{a}</p></details>)}</section></Frame>}

function Contact(){function sendInquiry(event){event.preventDefault();const data=new FormData(event.currentTarget);const subject=encodeURIComponent(`Website inquiry · ${data.get('offering')}`);const body=encodeURIComponent(`Name: ${data.get('name')}\nEmail: ${data.get('email')}\nOffering: ${data.get('offering')}\n\n${data.get('message')}`);window.location.href=`mailto:healthcoach.airin@gmail.com?subject=${subject}&body=${body}`;}return <Frame><section className="contact-hero"><div className="contact-copy"><Eyebrow>Begin here</Eyebrow><h1>Tell us what<br/><em>is calling you.</em></h1><p>You do not need to know the exact offering. Share where you are and Airin will recommend a thoughtful next step.</p><div className="contact-lines"><a href="mailto:healthcoach.airin@gmail.com"><Mail/>healthcoach.airin@gmail.com</a><a href="https://wa.me/18086343262" target="_blank" rel="noreferrer"><Phone/>+1 808 634 3262 · WhatsApp preferred</a><a href="https://maps.app.goo.gl/8esgEWqfmnAfVz7S7" target="_blank" rel="noreferrer"><MapPin/>Goa, India</a></div></div><div className="contact-form-wrap"><form className="contact-form" onSubmit={sendInquiry}><label>Your name<input name="name" required/></label><label>Email address<input type="email" name="email" required/></label><label>What are you drawn to?<select name="offering" defaultValue="" required><option value="" disabled>Choose an offering</option>{offerings.map(o=><option key={o.slug}>{o.title}</option>)}<option>I’m not sure yet</option></select></label><label>Tell Airin a little about where you are<textarea name="message" rows="5" required/></label><label className="consent"><input type="checkbox" required/><span>I understand this inquiry is not medical care and consent to Airin receiving these details.</span></label><button className="button dark-button" type="submit">Open email inquiry <ArrowRight/></button><small>This opens your email app with the inquiry addressed to Airin. She usually responds personally within 2–4 days.</small></form></div></section></Frame>}

function Privacy(){return <Frame><section className="simple-hero"><Eyebrow>Last updated · August 2026</Eyebrow><h1>Privacy &<br/><em>wellness notice.</em></h1></section><section className="legal section-pad"><h2>Your information</h2><p>Information you send by email, WhatsApp or an inquiry form is used only to respond, recommend an appropriate offering and administer services you choose. Do not submit medical records or highly sensitive health information through the general inquiry form.</p><h2>Wellness scope</h2><p>Airin Aquarius provides non-clinical coaching, education, movement, meditation and contemplative experiences. These services do not diagnose, prevent, treat or cure disease and are not a substitute for medical or mental-health care.</p><h2>Third parties</h2><p>Booking, payments, video calls and email may use third-party providers. Their own privacy policies apply. Final provider details and legally reviewed terms will be published before transactions are enabled.</p><h2>Contact</h2><p>Questions or privacy requests can be sent to <a href="mailto:healthcoach.airin@gmail.com">healthcoach.airin@gmail.com</a>.</p></section></Frame>}

function NotFound(){return <Frame><section className="simple-hero"><Eyebrow>404</Eyebrow><h1>This path returns<br/><em>to the sea.</em></h1><ArrowLink to="/">Return home</ArrowLink></section></Frame>}

function App(){return <BrowserRouter><Routes><Route path="/" element={<Home/>}/><Route path="/about" element={<About/>}/><Route path="/work" element={<Work/>}/><Route path="/offerings" element={<Offerings/>}/><Route path="/offerings/:slug" element={<OfferingDetail/>}/><Route path="/retreats" element={<Retreats/>}/><Route path="/journal" element={<Journal/>}/><Route path="/faq" element={<FAQ/>}/><Route path="/contact" element={<Contact/>}/><Route path="/privacy" element={<Privacy/>}/><Route path="*" element={<NotFound/>}/></Routes></BrowserRouter>}

createRoot(document.getElementById('root')).render(<App/>);
