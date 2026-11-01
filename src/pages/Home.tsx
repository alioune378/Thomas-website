import { EstimateForm } from '../components/EstimateForm';
import { Icon } from '../components/Icon';
import { Faqs, Gallery, HowItWorks, ServiceGrid, ValueProps } from '../components/sections';
import { CallButton, EstimateButton, SectionHead } from '../components/ui';
import { LOCATION_LINE } from '../config/site';
import { NEARBY_AREAS } from '../data/content';
import { Link } from '../lib/router';

export default function Home() {
  return (
    <>
      <section className="hero" aria-labelledby="hero-h">
        <picture className="hero__img">
          <source media="(max-width: 700px)" srcSet="/img/hero-mobile.webp" />
          <source media="(max-width: 1100px)" srcSet="/img/hero-900.webp" />
          <img
            src="/img/hero-1600.webp"
            width="1600"
            height="900"
            alt="Black work truck towing a dump trailer loaded with lumber and debris"
            fetchPriority="high"
            decoding="async"
          />
        </picture>
        <div className="hero__shade" aria-hidden="true" />
        <div className="container hero__content">
          <p className="hero__eyebrow">Contracting • Scrap Removal • Cleanup</p>
          <h1 id="hero-h" className="display display--xl">
            Your property. Cleaner.
            <span> Your project. Moving forward.</span>
          </h1>
          <p className="hero__sub">
            Contracting, scrap removal, and property cleanup services in Lansing and the greater Ithaca area.
            Straightforward communication, practical solutions, and a convenient way to request an estimate.
          </p>
          <div className="hero__cta">
            <EstimateButton label="Get a Free Estimate" />
            <CallButton variant="ghost" label="Call Thomas" />
          </div>
          <p className="hero__loc"><Icon name="pin" size={18} /> {LOCATION_LINE}</p>
        </div>
        <button type="button" className="hero__scroll" aria-label="Scroll to learn more" onClick={() => document.getElementById('value')?.scrollIntoView({ behavior: 'smooth' })}>
          <Icon name="chevron" size={26} />
        </button>
      </section>

      <ValueProps />

      <section className="section" aria-labelledby="svc-h">
        <div className="container">
          <SectionHead
            eyebrow="Services"
            title={<span id="svc-h">Cleanup and contracting help</span>}
            lead="Tell us what you’re dealing with. If it’s something Thomas can help with, you’ll know the next steps."
          />
          <ServiceGrid />
          <p className="section__more">
            <Link to="/services" className="link-arrow">See all services <Icon name="arrow" size={18} /></Link>
          </p>
        </div>
      </section>

      <HowItWorks dark />

      <section className="section section--split" aria-labelledby="split-h">
        <div className="container split">
          <div className="split__media" data-reveal>
            <img src="/img/job-work-truck.webp" width="1200" height="900" alt="Zackary’s black Chevrolet Silverado work truck in Lansing, NY" loading="lazy" decoding="async" />
          </div>
          <div className="split__text" data-reveal>
            <p className="eyebrow">Local work. Personal service.</p>
            <h2 id="split-h" className="display">A local business that’s easy to reach</h2>
            <p>
              Thomas Contracting &amp; Scrap Removal is based in Lansing, New York. Whether you’re planning a cleanup or
              looking for help with a contracting project, the goal is to make it easy to discuss your needs and request an
              estimate.
            </p>
            <div className="split__cta">
              <Link to="/about" className="btn btn--outline">About Thomas</Link>
              <Link to="/service-areas" className="link-arrow">Service areas <Icon name="arrow" size={18} /></Link>
            </div>
          </div>
        </div>
      </section>

      <Gallery />

      <section className="section section--paper" aria-labelledby="faq-h">
        <div className="container faq-wrap">
          <SectionHead eyebrow="FAQ" title={<span id="faq-h">Questions people ask</span>} />
          <div data-reveal><Faqs limit={5} /></div>
        </div>
      </section>

      <section className="section section--estimate" id="estimate" aria-labelledby="est-h">
        <div className="container estimate">
          <div className="estimate__intro" data-reveal>
            <p className="eyebrow eyebrow--light">Free estimate</p>
            <h2 id="est-h" className="display">Tell us about your project.</h2>
            <p className="lead">Share a few details and we’ll help you take the next step.</p>
            <ul className="ticks">
              <li><Icon name="check" size={20} /> Takes about a minute</li>
              <li><Icon name="check" size={20} /> Photos help, but are optional</li>
              <li><Icon name="check" size={20} /> Choose call, text or email</li>
            </ul>
            <p className="estimate__areas">Serving: {NEARBY_AREAS.slice(0, 5).join(' • ')} and more</p>
          </div>
          <div className="estimate__card" data-reveal>
            <EstimateForm />
          </div>
        </div>
      </section>
    </>
  );
}
