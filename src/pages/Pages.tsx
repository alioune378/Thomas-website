import { EstimateForm } from '../components/EstimateForm';
import { Icon } from '../components/Icon';
import { Faqs, HowItWorks, ServiceGrid } from '../components/sections';
import { CallButton, EstimateButton, SectionHead } from '../components/ui';
import { MAPS_URL, PHONE, SITE } from '../config/site';
import { NEARBY_AREAS } from '../data/content';
import { SERVICES, getService } from '../data/services';
import { Link, useRouter } from '../lib/router';

function PageHero({ eyebrow, title, lead, image }: { eyebrow: string; title: string; lead?: string; image?: string }) {
  return (
    <section className="page-hero">
      {image && <img className="page-hero__img" src={image} alt="" width="1600" height="900" decoding="async" fetchPriority="high" />}
      <div className="page-hero__shade" aria-hidden="true" />
      <div className="container page-hero__content">
        <p className="eyebrow eyebrow--light">{eyebrow}</p>
        <h1 className="display display--lg">{title}</h1>
        {lead && <p className="hero__sub">{lead}</p>}
      </div>
    </section>
  );
}

function CtaBand({ title = 'Ready to get started?' }: { title?: string }) {
  return (
    <section className="cta-band">
      <div className="container cta-band__inner" data-reveal>
        <h2 className="display display--sm">{title}</h2>
        <div className="cta-band__btns">
          <EstimateButton />
          <CallButton variant="dark" />
        </div>
      </div>
    </section>
  );
}

export function Services() {
  return (
    <>
      <PageHero
        eyebrow="Services"
        title="What we can help with"
        lead="Contracting, scrap removal and cleanup in Lansing and the greater Ithaca area. Not sure which one fits? Describe the job and we’ll point you in the right direction."
        image="/img/hero-900.webp"
      />
      <section className="section">
        <div className="container">
          <ServiceGrid />
        </div>
      </section>
      <HowItWorks />
      <CtaBand />
    </>
  );
}

export function ServiceDetail() {
  const { path } = useRouter();
  const slug = path.split('/')[2] ?? '';
  const s = getService(slug);
  if (!s) return <NotFound />;
  const others = SERVICES.filter((o) => o.slug !== s.slug).slice(0, 3);

  return (
    <>
      <PageHero eyebrow="Service" title={s.title} lead={s.short} image={s.image} />
      <section className="section">
        <div className="container detail">
          <div className="detail__main" data-reveal>
            <h2 className="display display--sm">What this is about</h2>
            <p className="lead lead--dark">{s.intro}</p>
            <h3 className="detail__h">Examples of what people might ask about</h3>
            <ul className="ticks ticks--dark">
              {s.examples.map((e) => (
                <li key={e}><Icon name="check" size={20} /> {e}</li>
              ))}
            </ul>
            <p className="note note--inline">
              Not sure whether your job fits? Send a request with a short description and photos, and we’ll let you know.
            </p>
            <p>
              Based in Lansing, NY. See the <Link to="/service-areas" className="text-link">service areas</Link> page or learn{' '}
              <Link to="/about" className="text-link">about {SITE.ownerName}</Link>.
            </p>
          </div>
          <aside className="detail__aside" data-reveal aria-label="Request an estimate">
            <h2 className="display display--sm">Request an estimate</h2>
            <p>Describe the job. We’ll review it and discuss the next steps.</p>
            <EstimateButton to={`/estimate?service=${s.slug}`} className="btn--block" />
            <CallButton variant="dark" className="btn--block" />
          </aside>
        </div>
      </section>
      <section className="section section--paper">
        <div className="container">
          <SectionHead eyebrow="More services" title="Other ways we can help" />
          <ul className="grid grid--3 cards">
            {others.map((o) => (
              <li key={o.slug} className="card card--link" data-reveal>
                <span className="icon-badge"><Icon name={o.icon} size={26} /></span>
                <h3><Link to={`/services/${o.slug}`}>{o.title}</Link></h3>
                <p>{o.short}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>
      <CtaBand title={`Need help with ${s.title.toLowerCase()}?`} />
    </>
  );
}

export function About() {
  return (
    <>
      <PageHero eyebrow="About" title="Local work. Personal service." image="/img/job-work-truck.webp" />
      <section className="section">
        <div className="container about">
          <div className="about__text" data-reveal>
            <h2 className="display display--sm">Thomas Contracting &amp; Scrap Removal</h2>
            <p className="lead lead--dark">
              Thomas Contracting &amp; Scrap Removal is based in Lansing, New York. Whether you’re planning a cleanup or
              looking for help with a contracting project, the goal is to make it easy to discuss your needs and request an
              estimate.
            </p>
            <p>
              Working with a local business means you can describe your project, ask your questions and talk it through
              directly, without going through a call center or a long form.
            </p>
            <p>
              Zachary runs the business and does the work himself, with his own truck and trailer. When you call or send
              a request, you’re talking to the person who will show up to do the job.
            </p>
          </div>
          <div className="about__side" data-reveal>
            <div className="about__logo">
              <img src="/brand/stacked.png" width="770" height="368" alt={`${SITE.name} logo`} loading="lazy" />
            </div>
            <figure className="owner">
              <img src="/img/zachary-owner.webp" width="900" height="1200" alt="Zachary, owner of Thomas Contracting & Scrap Removal" loading="lazy" decoding="async" />
              <figcaption><strong>Zachary</strong> Owner, Thomas Contracting &amp; Scrap Removal</figcaption>
            </figure>
          </div>
        </div>
      </section>
      <HowItWorks />
      <CtaBand />
    </>
  );
}

export function ServiceAreas() {
  return (
    <>
      <PageHero
        eyebrow="Service areas"
        title="Based in Lansing, NY"
        lead="Serving the greater Ithaca area. Not sure whether we cover your address? Send a request and ask."
        image="/img/hero-900.webp"
      />
      <section className="section">
        <div className="container areas">
          <div className="areas__primary" data-reveal>
            <Icon name="pin" size={34} />
            <h2 className="display display--sm">Lansing, New York</h2>
            <p>Our home base in Tompkins County. If your property is in or near Lansing, we’d like to hear about your project.</p>
            <EstimateButton label="Request an estimate in Lansing" />
          </div>
          <div className="areas__nearby" data-reveal>
            <h2 className="display display--sm">Nearby communities</h2>
            <p>We serve these communities around Lansing. Not on the list? Send a request and ask.</p>
            <ul className="chips">
              {NEARBY_AREAS.map((a) => (
                <li key={a} className="chip">{a}</li>
              ))}
            </ul>
          </div>
        </div>
      </section>
      <section className="section section--paper">
        <div className="container faq-wrap">
          <SectionHead eyebrow="FAQ" title="Questions people ask" />
          <Faqs />
        </div>
      </section>
      <CtaBand title="Ask about your location" />
    </>
  );
}

export function Estimate() {
  const { search } = useRouter();
  const service = new URLSearchParams(search).get('service') ?? '';
  const valid = SERVICES.some((s) => s.slug === service) ? service : '';
  return (
    <>
      <section className="section section--estimate section--page-top">
        <div className="container estimate">
          <div className="estimate__intro">
            <p className="eyebrow eyebrow--light">Free estimate</p>
            <h1 className="display display--lg">Tell us about your project.</h1>
            <p className="lead">Share a few details and we’ll help you take the next step.</p>
            <ul className="ticks">
              <li><Icon name="check" size={20} /> Takes about a minute</li>
              <li><Icon name="check" size={20} /> Photos help, but are optional</li>
              <li><Icon name="check" size={20} /> Choose call, text or email</li>
            </ul>
            {PHONE.has && <p className="estimate__call">Prefer to talk? <a href={PHONE.href}>{PHONE.display}</a></p>}
          </div>
          <div className="estimate__card">
            <EstimateForm initialService={valid} />
          </div>
        </div>
      </section>
      <HowItWorks />
    </>
  );
}

export function Contact() {
  return (
    <>
      <PageHero eyebrow="Contact" title="Get in touch" lead="The quickest way to start is an estimate request. Tell us what you need and we’ll follow up." />
      <section className="section">
        <div className="container contact">
          <div className="contact__card" data-reveal>
            <img src="/brand/stacked.png" width="770" height="368" alt={`${SITE.name} logo`} loading="lazy" />
            <ul className="contact__list">
              <li>
                <Icon name="phone" size={22} />
                <div>
                  <strong>Phone</strong>
                  {PHONE.has ? <a href={PHONE.href}>{PHONE.display}</a> : <span className="muted">Number will be added once provided</span>}
                </div>
              </li>
              {SITE.email && (
                <li>
                  <Icon name="mail" size={22} />
                  <div><strong>Email</strong><a href={`mailto:${SITE.email}`}>{SITE.email}</a></div>
                </li>
              )}
              <li>
                <Icon name="pin" size={22} />
                <div><strong>Address</strong><a href={MAPS_URL} target="_blank" rel="noopener">{SITE.street}<br />{SITE.city}, {SITE.region} {SITE.postal}</a></div>
              </li>
            </ul>
            <div className="contact__btns">
              <CallButton variant="dark" />
            </div>
          </div>
          <div className="contact__form" data-reveal>
            <h2 className="display display--sm">Request an estimate</h2>
            <EstimateForm />
          </div>
        </div>
      </section>
    </>
  );
}

export function NotFound() {
  return (
    <section className="section section--page-top">
      <div className="container notfound">
        <p className="eyebrow">404</p>
        <h1 className="display display--lg">That page wasn’t found.</h1>
        <p className="lead lead--dark">It may have moved. Head back home or request an estimate.</p>
        <div className="cta-band__btns">
          <Link to="/" className="btn btn--outline">Back to home</Link>
          <EstimateButton />
        </div>
      </div>
    </section>
  );
}
