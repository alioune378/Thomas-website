import type { ReactNode } from 'react';
import { PHONE, SITE } from '../config/site';
import { Icon } from './Icon';
import { Link } from '../lib/router';

export function Eyebrow({ children, light = false }: { children: ReactNode; light?: boolean }) {
  return <p className={`eyebrow${light ? ' eyebrow--light' : ''}`}>{children}</p>;
}

export function SectionHead({
  eyebrow,
  title,
  lead,
  light = false,
  center = false,
  as: Tag = 'h2',
}: {
  eyebrow?: string;
  title: ReactNode;
  lead?: ReactNode;
  light?: boolean;
  center?: boolean;
  as?: 'h1' | 'h2';
}) {
  return (
    <div className={`section-head${center ? ' section-head--center' : ''}`} data-reveal>
      {eyebrow && <Eyebrow light={light}>{eyebrow}</Eyebrow>}
      <Tag className="display">{title}</Tag>
      {lead && <p className="lead">{lead}</p>}
    </div>
  );
}

/**
 * Call button. With a real number it is a normal tel: link. Without one it is an
 * honest, clearly labelled placeholder that sends people to the estimate form.
 */
export function CallButton({
  variant = 'ghost',
  label = `Call ${SITE.ownerName}`,
  className = '',
}: {
  variant?: 'ghost' | 'dark' | 'solid';
  label?: string;
  className?: string;
}) {
  const cls = `btn btn--${variant} ${className}`.trim();
  if (PHONE.has) {
    return (
      <a className={cls} href={PHONE.href}>
        <Icon name="phone" size={20} />
        <span>{label}</span>
      </a>
    );
  }
  return (
    <Link className={`${cls} btn--placeholder`} to="/contact" title="Phone number will be added once provided">
      <Icon name="phone" size={20} />
      <span className="btn__stack">
        <span>{label}</span>
        <small>Number added at launch</small>
      </span>
    </Link>
  );
}

export function EstimateButton({
  label = 'Get a Free Estimate',
  className = '',
  to = '/estimate',
}: {
  label?: string;
  className?: string;
  to?: string;
}) {
  return (
    <Link className={`btn btn--primary ${className}`.trim()} to={to}>
      <span>{label}</span>
      <Icon name="arrow" size={20} />
    </Link>
  );
}

export function DraftTag({ show }: { show: boolean }) {
  if (!show) return null;
  return <span className="draft-tag">Draft • Zackary to confirm</span>;
}
