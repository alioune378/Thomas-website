import { FAQS, GALLERY, STEPS, VALUE_PROPS } from '../data/content';
import { SERVICES } from '../data/services';
import type { Service } from '../data/services';
import { SITE } from '../config/site';
import { Link } from '../lib/router';
import { Icon } from './Icon';
import { DraftTag, SectionHead } from './ui';

export function ValueProps() {
  return (
    <section className="section section--paper" id="value" aria-labelledby="value-h">
      <div className="container">
        <SectionHead
          eyebrow="Why reach out"
          title={<span id="value-h">Good work. Clear communication. No unnecessary hassle.</span>}
        />
        <ul className="grid grid--4 cards">
          {VALUE_PROPS.map((v, i) => (
            <li key={v.title} className="card card--value" data-reveal style={{ ['--d' as string]: `${i * 70}ms` }}>
              <span className="icon-badge"><Icon name={v.icon} size={26} /></span>
              <h3>{v.title}</h3>
              <p>{v.text}</p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

export function ServiceCard({ s, i = 0 }: { s: Service; i?: number }) {
  return (
    <li className="svc" data-reveal style={{ ['--d' as string]: `${(i % 3) * 70}ms` }}>
      <Link to={`/services/${s.slug}`} className="svc__media" tabIndex={-1} aria-hidden="true">
        <img src={s.image} alt="" width="800" height="500" loading="lazy" decoding="async" />
        <span className="icon-badge icon-badge--float"><Icon name={s.icon} size={24} /></span>
      </Link>
      <div className="svc__body">
        <h3>{s.title}</h3>
        <p>{s.short}</p>
        <div className="svc__actions">
          <Link to={`/services/${s.slug}`} className="link-arrow" aria-label={`Learn more about ${s.title}`}>
            Learn more <Icon name="arrow" size={18} />
          </Link>
          <Link to={`/estimate?service=${s.slug}`} className="btn btn--outline btn--sm">
            Request estimate
          </Link>
        </div>
      </div>
    </li>
  );
}

export function ServiceGrid({ limit }: { limit?: number }) {
  const list = limit ? SERVICES.slice(0, limit) : SERVICES;
  return (
    <ul className="grid grid--3 cards">
      {list.map((s, i) => <ServiceCard key={s.slug} s={s} i={i} />)}
    </ul>
  );
}

export function HowItWorks({ dark = false }: { dark?: boolean }) {
  return (
    <section className={`section ${dark ? 'section--dark' : 'section--paper'}`} aria-labelledby="how-h">
      <div className="container">
        <SectionHead eyebrow="How it works" title={<span id="how-h">Getting started is easy</span>} light={dark} />
        <ol className="steps">
          {STEPS.map((s, i) => (
            <li key={s.n} className="step" data-reveal style={{ ['--d' as string]: `${i * 90}ms` }}>
              <span className="step__n" aria-hidden="true">{s.n}</span>
              <h3>{s.title}</h3>
              <p>{s.text}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}

export function Faqs({ limit }: { limit?: number }) {
  const list = limit ? FAQS.slice(0, limit) : FAQS;
  return (
    <div className="faq">
      {list.map((f) => (
        <details key={f.q} className="faq__item">
          <summary>
            <span>{f.q}</span>
            <Icon name="chevron" size={22} className="faq__chev" />
          </summary>
          <div className="faq__a">
            <p>{f.a}</p>
            <DraftTag show={SITE.showReviewFlags && f.needsReview} />
          </div>
        </details>
      ))}
    </div>
  );
}

/** Real photos from Zackary's jobs. */
export function Gallery() {
  return (
    <section className="section section--dark" aria-labelledby="gal-h">
      <div className="container">
        <SectionHead
          eyebrow="On the job"
          title={<span id="gal-h">Local, hands-on and ready to haul</span>}
          lead="Zackary does the work himself, with his own truck and trailer. Here’s a look at recent pickups."
          light
        />
        <div className="gallery gallery--3">
          {GALLERY.map((g) => (
            <figure className="gallery__item" key={g.image} data-reveal>
              <img src={g.image} alt={g.alt} width={g.w} height={g.h} loading="lazy" decoding="async" />
              <figcaption>{g.caption}</figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}

export function Reviews() {
  return (
    <section className="section section--paper section--tight" aria-labelledby="rev-h">
      <div className="container">
        <div className="reviews" data-reveal>
          <div>
            <p className="eyebrow">Customer reviews</p>
            <h2 className="display display--sm" id="rev-h">Verified reviews coming soon</h2>
            <p>
              Placeholder: once Thomas has genuine customer reviews, they’ll be shown here exactly as written, with their
              source. Nothing is displayed until then.
            </p>
          </div>
          <span className="reviews__tag">Demo placeholder</span>
        </div>
      </div>
    </section>
  );
}
