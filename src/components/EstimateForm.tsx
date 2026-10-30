import { useEffect, useRef, useState } from 'react';
import type { ChangeEvent, FormEvent } from 'react';
import { PHONE, SITE } from '../config/site';
import { SERVICES } from '../data/services';
import { Icon } from './Icon';

type Status = 'idle' | 'submitting' | 'demo-ok' | 'sent' | 'error';
type Errors = Partial<Record<'name' | 'phone' | 'email' | 'location' | 'description' | 'consent' | 'photos' | 'service', string>>;

const MAX_FILES = 4;
const MAX_FILE_MB = 5;
const MAX_TOTAL_MB = 8; // Netlify Forms request limit is ~8 MB
const ACCEPT = ['image/jpeg', 'image/png', 'image/webp', 'image/heic', 'image/heif'];

const validate = (v: Values, files: File[]): Errors => {
  const e: Errors = {};
  if (!v.service) e.service = 'Please choose a service (or “Not sure yet”).';
  if (v.name.trim().length < 2) e.name = 'Please enter your full name.';
  if (v.phone.replace(/\D/g, '').length < 10) e.phone = 'Please enter a 10-digit phone number.';
  if (v.email.trim() && !/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(v.email.trim())) e.email = 'That email address doesn’t look right.';
  if (v.contactMethod === 'email' && !v.email.trim()) e.email = 'Add your email so we can reach you that way.';
  if (v.location.trim().length < 3) e.location = 'Please enter the town or ZIP code where the work is.';
  if (v.description.trim().length < 10) e.description = 'Please add a few details about the project (at least a sentence).';
  if (!v.consent) e.consent = 'Please confirm that we may contact you about this request.';
  if (files.length > MAX_FILES) e.photos = `Please attach up to ${MAX_FILES} photos.`;
  else if (files.some((f) => !ACCEPT.includes(f.type))) e.photos = 'Photos must be JPG, PNG, WebP or HEIC images.';
  else if (files.some((f) => f.size > MAX_FILE_MB * 1024 * 1024)) e.photos = `Each photo must be under ${MAX_FILE_MB} MB.`;
  else if (files.reduce((n, f) => n + f.size, 0) > MAX_TOTAL_MB * 1024 * 1024) e.photos = `Photos must total under ${MAX_TOTAL_MB} MB.`;
  return e;
};

interface Values {
  name: string;
  phone: string;
  email: string;
  service: string;
  location: string;
  description: string;
  contactMethod: 'call' | 'text' | 'email';
  consent: boolean;
}

export function EstimateForm({ initialService = '' }: { initialService?: string }) {
  const [v, setV] = useState<Values>({
    name: '', phone: '', email: '', service: initialService, location: '', description: '',
    contactMethod: 'call', consent: false,
  });
  const [files, setFiles] = useState<File[]>([]);
  const [errors, setErrors] = useState<Errors>({});
  const [status, setStatus] = useState<Status>('idle');
  const [serverError, setServerError] = useState('');
  const startedAt = useRef(Date.now());
  const honeypot = useRef<HTMLInputElement>(null);
  const summary = useRef<HTMLDivElement>(null);
  const done = useRef<HTMLDivElement>(null);

  useEffect(() => setV((p) => ({ ...p, service: initialService || p.service })), [initialService]);
  useEffect(() => {
    if (status === 'demo-ok' || status === 'sent') done.current?.focus();
  }, [status]);

  const set =
    <K extends keyof Values>(k: K) =>
    (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
      const val = (e.target instanceof HTMLInputElement && e.target.type === 'checkbox' ? e.target.checked : e.target.value) as Values[K];
      setV((p) => ({ ...p, [k]: val }));
      if (errors[k as keyof Errors]) setErrors((p) => ({ ...p, [k]: undefined }));
    };

  const onFiles = (e: ChangeEvent<HTMLInputElement>) => {
    const next = [...files, ...Array.from(e.target.files ?? [])];
    setFiles(next);
    setErrors((p) => ({ ...p, photos: validate(v, next).photos }));
    e.target.value = '';
  };

  const onSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setServerError('');
    const errs = validate(v, files);
    setErrors(errs);
    if (Object.keys(errs).length) {
      requestAnimationFrame(() => summary.current?.focus());
      return;
    }
    // Spam protection: honeypot + too-fast submission are silently dropped.
    if (honeypot.current?.value || Date.now() - startedAt.current < 2500) {
      setStatus('demo-ok');
      return;
    }

    setStatus('submitting');

    if (SITE.formMode === 'demo') {
      await new Promise((r) => setTimeout(r, 900));
      setStatus('demo-ok'); // honest: nothing is sent in demo mode
      return;
    }

    try {
      const body = new FormData();
      body.append('form-name', 'estimate');
      body.append('name', v.name.trim());
      body.append('phone', v.phone.trim());
      body.append('email', v.email.trim());
      body.append('service', v.service);
      body.append('location', v.location.trim());
      body.append('description', v.description.trim());
      body.append('contactMethod', v.contactMethod);
      body.append('consent', 'yes');
      files.forEach((f) => body.append('photos', f));
      const res = await fetch('/', { method: 'POST', body });
      if (!res.ok) throw new Error(`Status ${res.status}`);
      setStatus('sent'); // only after the backend confirms
    } catch {
      setStatus('error');
      setServerError(
        PHONE.has
          ? `We couldn’t send your request. Please try again or call ${PHONE.display}.`
          : 'We couldn’t send your request. Please try again in a moment.',
      );
    }
  };

  if (status === 'demo-ok' || status === 'sent') {
    return (
      <div className="form-done" ref={done} tabIndex={-1} role="status">
        <span className="form-done__icon"><Icon name="check" size={30} /></span>
        {status === 'sent' ? (
          <>
            <h3 className="display">Request received.</h3>
            <p>Thanks, {v.name.split(' ')[0]}. We’ll review your details and get back to you using your preferred contact method.</p>
          </>
        ) : (
          <>
            <h3 className="display">Form check passed</h3>
            <p className="form-done__demo">
              <strong>Demo mode:</strong> this preview does not send requests anywhere, so nothing was delivered. When the live
              form is switched on, requests will be sent securely and you’ll see a confirmation here only after they arrive.
            </p>
          </>
        )}
        <button type="button" className="btn btn--ghost-light btn--sm" onClick={() => { setStatus('idle'); setFiles([]); setV({ ...v, name: '', phone: '', email: '', location: '', description: '', consent: false }); startedAt.current = Date.now(); }}>
          Start another request
        </button>
      </div>
    );
  }

  const err = (k: keyof Errors) => (errors[k] ? <p className="field__error" id={`err-${k}`}>{errors[k]}</p> : null);
  const aria = (k: keyof Errors) => ({ 'aria-invalid': errors[k] ? true : undefined, 'aria-describedby': errors[k] ? `err-${k}` : undefined } as const);
  const errList = Object.entries(errors).filter(([, m]) => m);

  return (
    <form className="form" onSubmit={onSubmit} noValidate aria-describedby={SITE.formMode === 'demo' ? 'demo-note' : undefined}>
      {SITE.formMode === 'demo' && (
        <p className="form__demo" id="demo-note">
          <strong>Demo form.</strong> It checks your answers but doesn’t send anything yet.
        </p>
      )}

      {errList.length > 0 && (
        <div className="form__summary" ref={summary} tabIndex={-1} role="alert">
          <strong>Please fix {errList.length === 1 ? 'one thing' : `${errList.length} things`} below:</strong>
          <ul>{errList.map(([k, m]) => <li key={k}><a href={`#f-${k}`}>{m}</a></li>)}</ul>
        </div>
      )}
      {status === 'error' && <div className="form__summary" role="alert">{serverError}</div>}

      {/* Honeypot: hidden from people, tempting to bots */}
      <div className="hp" aria-hidden="true">
        <label>Leave this field empty<input ref={honeypot} type="text" name="bot-field" tabIndex={-1} autoComplete="off" /></label>
      </div>

      <div className="field-row">
        <div className="field">
          <label htmlFor="f-name">Full name <span className="req">required</span></label>
          <input id="f-name" name="name" autoComplete="name" value={v.name} onChange={set('name')} {...aria('name')} />
          {err('name')}
        </div>
        <div className="field">
          <label htmlFor="f-phone">Phone number <span className="req">required</span></label>
          <input id="f-phone" name="phone" type="tel" inputMode="tel" autoComplete="tel" value={v.phone} onChange={set('phone')} {...aria('phone')} />
          {err('phone')}
        </div>
      </div>

      <div className="field-row">
        <div className="field">
          <label htmlFor="f-email">Email address <span className="opt">optional</span></label>
          <input id="f-email" name="email" type="email" inputMode="email" autoComplete="email" value={v.email} onChange={set('email')} {...aria('email')} />
          {err('email')}
        </div>
        <div className="field">
          <label htmlFor="f-service">Service needed <span className="req">required</span></label>
          <select id="f-service" name="service" value={v.service} onChange={set('service')} {...aria('service')}>
            <option value="">Choose a service…</option>
            {SERVICES.map((s) => <option key={s.slug} value={s.slug}>{s.title}</option>)}
            <option value="not-sure">Not sure yet / something else</option>
          </select>
          {err('service')}
        </div>
      </div>

      <div className="field">
        <label htmlFor="f-location">Project location / ZIP code <span className="req">required</span></label>
        <input id="f-location" name="location" autoComplete="postal-code" placeholder="Town or ZIP code" value={v.location} onChange={set('location')} {...aria('location')} />
        {err('location')}
      </div>

      <div className="field">
        <label htmlFor="f-description">Brief project description <span className="req">required</span></label>
        <textarea id="f-description" name="description" rows={4} placeholder="What needs to be done, roughly how much, and any timing you have in mind." value={v.description} onChange={set('description')} {...aria('description')} />
        {err('description')}
      </div>

      <div className="field">
        <label htmlFor="f-photos">Upload photos <span className="opt">optional</span></label>
        <label className="upload" htmlFor="f-photos">
          <Icon name="camera" size={22} />
          <span>Add photos of the job (up to {MAX_FILES}, {MAX_FILE_MB} MB each)</span>
        </label>
        <input id="f-photos" className="sr-only-input" name="photos" type="file" accept="image/*" multiple onChange={onFiles} {...aria('photos')} />
        {files.length > 0 && (
          <ul className="files">
            {files.map((f, i) => (
              <li key={f.name + i}>
                <span>{f.name}</span>
                <button type="button" onClick={() => setFiles(files.filter((_, j) => j !== i))} aria-label={`Remove ${f.name}`}>
                  <Icon name="close" size={16} />
                </button>
              </li>
            ))}
          </ul>
        )}
        {err('photos')}
      </div>

      <fieldset className="field choice">
        <legend>Preferred contact method</legend>
        <div className="choice__row">
          {([['call', 'Call'], ['text', 'Text'], ['email', 'Email']] as const).map(([val, label]) => (
            <label key={val} className="choice__opt">
              <input type="radio" name="contactMethod" value={val} checked={v.contactMethod === val} onChange={set('contactMethod')} />
              <span>{label}</span>
            </label>
          ))}
        </div>
      </fieldset>

      <div className="field">
        <label className="consent" htmlFor="f-consent">
          <input id="f-consent" name="consent" type="checkbox" checked={v.consent} onChange={set('consent')} {...aria('consent')} />
          <span>I agree that {SITE.name} may contact me about this request by the method I selected. Message and data rates may apply.</span>
        </label>
        {err('consent')}
      </div>

      <button className="btn btn--primary btn--block" type="submit" disabled={status === 'submitting'}>
        {status === 'submitting' ? (<><span className="spinner" aria-hidden="true" /> Sending…</>) : (<>Send my estimate request <Icon name="arrow" size={20} /></>)}
      </button>
    </form>
  );
}
