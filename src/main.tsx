import { createRoot } from 'react-dom/client';
import { Layout } from './components/Layout';
import Home from './pages/Home';
import { About, Contact, Estimate, NotFound, ServiceAreas, ServiceDetail, Services } from './pages/Pages';
import { Router, useRouter } from './lib/router';
import { ALL_ROUTES, NOT_FOUND_META, usePageMeta } from './lib/seo';
import './styles/global.css';

function Routes() {
  const { path } = useRouter();
  const meta = ALL_ROUTES.find((r) => r.path === path) ?? NOT_FOUND_META;
  usePageMeta(meta);

  let page;
  if (path === '/') page = <Home />;
  else if (path === '/services') page = <Services />;
  else if (path.startsWith('/services/')) page = <ServiceDetail />;
  else if (path === '/about') page = <About />;
  else if (path === '/service-areas') page = <ServiceAreas />;
  else if (path === '/estimate') page = <Estimate />;
  else if (path === '/contact') page = <Contact />;
  else page = <NotFound />;
  return <Layout>{page}</Layout>;
}

const root = document.getElementById('root')!;
document.documentElement.classList.add('js');
// Client-rendered. Per-route <head> metadata is pre-rendered by scripts/build.mjs.
createRoot(root).render(
  <Router>
    <Routes />
  </Router>,
);
