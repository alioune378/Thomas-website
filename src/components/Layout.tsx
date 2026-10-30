import { useEffect, useState } from 'react';
import type { ReactNode } from 'react';
import { LOCATION_LINE, PHONE, SITE } from '../config/site';
import { SERVICES } from '../data/services';
import { Link, useRouter } from '../lib/router';
import { Icon } from './Icon';
import { CallButton, EstimateButton } from './ui';

const NAV = [
  { to: '/', label: 'Home' },
  { to: '/services', label: 'Services' },
  { to: '/about', label: 'About' },
  { to: '/service-areas', label: 'Service Areas' },
  { to: '/contact', label: 'Contact' },
];

function Header() {
  const { path } = useRouter();
  const [open, setOpen] = useState(false);

  useEffect(() => setOpen(false), [path]);
  useEffect(() => {
    document.body.classList.toggle('no-scroll', open);
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setOpen(false);
    window.addEventListener('keydown', onKey);
    return () => {
      document.body.classList.remove('no-scroll');
      window.removeEventListener('keydown', onKey);
    };
  }, [open]);

  const isActive = (to: string) => (to === '/' ? path === '/' : path === to || path.startsWith(to + '/'));

  return (
    <header className="header">
      <div className="container header__bar">
        <Link to="/" className="header__logo" aria-label={`${SITE.name} – home`}>
          <img src="/brand/horizontal-light.png" width="895" height="167" alt={`${SITE.name}, ${SITE.city}, ${SITE.region}`} />
        </Link>

        <nav className="nav" aria-label="Main">
          {NAV.map((n) => (
            <Link key={n.to} to={n.to} className="nav__link" aria-current={isActive(n.to) ? 'page' : undefined}>
              {n.label}
            </Link>
          ))}
        </nav>

        <div className="header__actions">
          {PHONE.has && (
            <a className="header__phone" href={PHONE.href}>
              <Icon name="phone" size={18} />
              {PHONE.display}
            </a>
          )}
          <EstimateButton label="Get a Free Estimate" className="btn--sm header__cta" />
        </div>

        <button
          type="button"
          className="menu-btn"
          aria-expanded={open}
          aria-controls="mobile-menu"
          onClick={() => setOpen((o) => !o)}
        >
          <Icon name={open ? 'close' : 'menu'} size={26} />
          <span className="sr-only">{open ? 'Close menu' : 'Open menu'}</span>
        </button>
      </div>

      <div id="mobile-menu" className={`mobile-menu${open ? ' is-open' : ''}`} hidden={!open}>
        <nav aria-label="Mobile">
          {NAV.map((n) => (
            <Link key={n.to} to={n.to} className="mobile-menu__link" aria-current={isActive(n.to) ? 'page' : undefined}>
              {n.label}
              <Icon name="arrow" size={20} />
            </Link>
          ))}
        </nav>
        <div className="mobile-menu__actions">
          <EstimateButton />
          <CallButton variant="dark" />
        </div>
      </div>
    </header>
  );
}

function Footer() {
  return (
    <footer className="footer">
      <div className="container footer__grid">
        <div className="footer__brand">
          <img src="/brand/horizontal-dark.png" width="754" height="227" alt={`${SITE.name}, ${SITE.city}, ${SITE.region}`} loading="lazy" />
          <p>{LOCATION_LINE}</p>
        </div>

        <nav aria-label="Footer – pages">
          <h2 className="footer__h">Explore</h2>
          <ul>
            {NAV.map((n) => (
              <li key={n.to}>
                <Link to={n.to}>{n.label}</Link>
              </li>
            ))}
            <li>
              <Link to="/estimate">Request an Estimate</Link>
            </li>
          </ul>
        </nav>

        <nav aria-label="Footer – services">
          <h2 className="footer__h">Services</h2>
          <ul>
            {SERVICES.map((s) => (
              <li key={s.slug}>
                <Link to={`/services/${s.slug}`}>{s.title}</Link>
              </li>
            ))}
          </ul>
        </nav>

        <div>
          <h2 className="footer__h">Contact</h2>
          <ul>
            <li>
              {PHONE.has ? (
                <a href={PHONE.href}>{PHONE.display}</a>
              ) : (
                <span className="footer__muted">Phone number coming soon</span>
              )}
            </li>
            {SITE.email && (
              <li>
                <a href={`mailto:${SITE.email}`}>{SITE.email}</a>
              </li>
            )}
            <li>
              {SITE.city}, {SITE.regionLong}
            </li>
          </ul>
          <EstimateButton className="btn--sm footer__cta" />
        </div>
      </div>

      <div className="container footer__legal">
        <p>
          © {new Date().getFullYear()} {SITE.name} · Website by {SITE.builtBy}
        </p>
        <p className="footer__demo">
          Design demo. Images are illustrative AI-generated pictures, not photos of actual Thomas projects.
        </p>
      </div>
    </footer>
  );
}

function StickyBar() {
  return (
    <div className="sticky-bar" role="region" aria-label="Quick contact">
      <CallButton variant="dark" label="Call Now" />
      <EstimateButton label="Free Estimate" />
    </div>
  );
}

/** Reveal-on-scroll (respects reduced motion via CSS; content is visible without JS). */
function useReveal(path: string) {
  useEffect(() => {
    const els = Array.from(document.querySelectorAll<HTMLElement>('[data-reveal]'));
    if (!('IntersectionObserver' in window)) {
      els.forEach((el) => el.classList.add('is-in'));
      return;
    }
    const io = new IntersectionObserver(
      (entries) =>
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add('is-in');
            io.unobserve(e.target);
          }
        }),
      { rootMargin: '0px 0px -8% 0px', threshold: 0.05 },
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, [path]);
}

export function Layout({ children }: { children: ReactNode }) {
  const { path } = useRouter();
  useReveal(path);
  return (
    <>
      <a className="skip-link" href="#main" onClick={(e) => { e.preventDefault(); document.getElementById('main')?.focus(); }}>
        Skip to content
      </a>
      <Header />
      <main id="main" tabIndex={-1}>
        {children}
      </main>
      <Footer />
      <StickyBar />
    </>
  );
}
