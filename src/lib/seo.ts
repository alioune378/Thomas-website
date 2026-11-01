import { useEffect } from 'react';

/**
 * Per-route SEO metadata. Shared by the runtime (`usePageMeta`) and by
 * scripts/build.mjs, which pre-renders the <head> of every route so crawlers and
 * link previews see unique titles/descriptions without running JavaScript.
 */
export interface RouteMeta {
  path: string;
  title: string;
  description: string;
}

import { SERVICES } from '../data/services';

const BRAND = 'Thomas Contracting & Scrap Removal';

export const STATIC_ROUTES: RouteMeta[] = [
  {
    path: '/',
    title: `${BRAND} | Lansing, NY`,
    description:
      'Contracting, scrap removal and property cleanup in Lansing, NY and the greater Ithaca area. Request a free estimate online.',
  },
  {
    path: '/services',
    title: `Services | ${BRAND}`,
    description:
      'Scrap metal removal, junk and debris removal, construction cleanup, cleanouts and contracting help in Lansing, NY. Request an estimate.',
  },
  {
    path: '/about',
    title: `About | ${BRAND}`,
    description:
      'Thomas Contracting & Scrap Removal is based in Lansing, New York. Local work, personal service, and an easy way to request an estimate.',
  },
  {
    path: '/service-areas',
    title: `Service Areas | ${BRAND}`,
    description:
      'Based in Lansing, NY, serving the greater Ithaca and Tompkins County area. See nearby communities and ask whether we can help at your property.',
  },
  {
    path: '/estimate',
    title: `Request a Free Estimate | ${BRAND}`,
    description:
      'Tell us about your project. Share a few details and photos and we’ll help you take the next step. Lansing, NY.',
  },
  {
    path: '/contact',
    title: `Contact | ${BRAND}`,
    description: 'Contact Thomas Contracting & Scrap Removal in Lansing, NY. Request an estimate or get in touch.',
  },
];

export const SERVICE_ROUTES: RouteMeta[] = SERVICES.map((s) => ({
  path: `/services/${s.slug}`,
  title: `${s.title} in Lansing, NY | ${BRAND}`,
  description: `${s.short} Request an estimate from Thomas Contracting in Lansing, NY.`,
}));

export const NOT_FOUND_META: RouteMeta = {
  path: '/404',
  title: `Page not found | ${BRAND}`,
  description: 'That page could not be found.',
};

export const ALL_ROUTES = [...STATIC_ROUTES, ...SERVICE_ROUTES];

const setMeta = (selector: string, attr: string, value: string) => {
  const el = document.head.querySelector(selector);
  if (el) el.setAttribute(attr, value);
};

export function usePageMeta(meta: RouteMeta) {
  useEffect(() => {
    document.title = meta.title;
    setMeta('meta[name="description"]', 'content', meta.description);
    setMeta('meta[property="og:title"]', 'content', meta.title);
    setMeta('meta[property="og:description"]', 'content', meta.description);
    setMeta('meta[name="twitter:title"]', 'content', meta.title);
    setMeta('meta[name="twitter:description"]', 'content', meta.description);
    const canonical = document.head.querySelector('link[rel="canonical"]');
    if (canonical) {
      // Canonical is only emitted at build time when the final domain is known.
      const base = canonical.getAttribute('href')?.replace(/^(https?:\/\/[^/]+).*$/, '$1');
      if (base) canonical.setAttribute('href', base + (meta.path === '/' ? '/' : meta.path));
    }
  }, [meta]);
}
