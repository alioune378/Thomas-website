import { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react';
import type { AnchorHTMLAttributes, MouseEvent, ReactNode } from 'react';

/** Tiny History-API router (no dependencies). */

interface Loc {
  path: string;
  search: string;
}

interface RouterValue extends Loc {
  navigate: (to: string) => void;
}

declare const __HASH__: boolean;
const HASH = typeof __HASH__ !== 'undefined' && __HASH__;

const normalize = (p: string) => p.replace(/\/+$/, '') || '/';

/** Hash mode (used for the single-file preview): "#services", "#svc-<slug>", "#estimate-<slug>". */
const toHash = (to: string) => {
  const [p, q = ''] = to.split('?');
  const svc = new URLSearchParams(q).get('service');
  if (p === '/') return 'home';
  if (p.startsWith('/services/')) return 'svc-' + p.split('/')[2];
  if (p === '/estimate' && svc) return 'estimate-' + svc;
  return p.replace(/^\//, '');
};
const fromHash = (h: string): Loc => {
  const k = h.replace(/^#/, '');
  if (!k || k === 'home') return { path: '/', search: '' };
  if (k.startsWith('svc-')) return { path: '/services/' + k.slice(4), search: '' };
  if (k.startsWith('estimate-')) return { path: '/estimate', search: '?service=' + k.slice(9) };
  return { path: normalize('/' + k), search: '' };
};
const read = (): Loc => (HASH ? fromHash(window.location.hash) : { path: normalize(window.location.pathname), search: window.location.search });

const Ctx = createContext<RouterValue>({ path: '/', search: '', navigate: () => undefined });

export function Router({ children }: { children: ReactNode }) {
  const [loc, setLoc] = useState<Loc>(read);

  useEffect(() => {
    const onPop = () => {
      setLoc(read());
      if (HASH) {
        window.scrollTo(0, 0);
        requestAnimationFrame(() => document.getElementById('main')?.focus({ preventScroll: true }));
      }
    };
    window.addEventListener(HASH ? 'hashchange' : 'popstate', onPop);
    return () => window.removeEventListener(HASH ? 'hashchange' : 'popstate', onPop);
  }, []);

  const navigate = useCallback((to: string) => {
    if (HASH) {
      window.location.hash = toHash(to);
      return;
    }
    const url = new URL(to, window.location.origin);
    window.history.pushState({}, '', url.pathname + url.search + url.hash);
    setLoc({ path: normalize(url.pathname), search: url.search });
    if (url.hash) {
      requestAnimationFrame(() => document.getElementById(url.hash.slice(1))?.scrollIntoView());
    } else {
      window.scrollTo(0, 0);
      // Move focus to the new page for keyboard / screen-reader users.
      requestAnimationFrame(() => document.getElementById('main')?.focus({ preventScroll: true }));
    }
  }, []);

  const value = useMemo(() => ({ ...loc, navigate }), [loc, navigate]);
  return <Ctx.Provider value={value}>{children}</Ctx.Provider>;
}

export const useRouter = () => useContext(Ctx);

interface LinkProps extends AnchorHTMLAttributes<HTMLAnchorElement> {
  to: string;
}

export function Link({ to, onClick, children, ...rest }: LinkProps) {
  const { navigate } = useRouter();
  const handle = (e: MouseEvent<HTMLAnchorElement>) => {
    onClick?.(e);
    if (HASH) return; // native hash navigation; the hashchange listener updates the route
    if (e.defaultPrevented || e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
    if (rest.target && rest.target !== '_self') return;
    e.preventDefault();
    navigate(to);
  };
  return (
    <a href={HASH ? '#' + toHash(to) : to} onClick={handle} {...rest}>
      {children}
    </a>
  );
}
