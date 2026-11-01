/**
 * CENTRAL SITE CONFIGURATION
 * Everything business-specific lives here so it can be updated in one place.
 * Leave a value empty until Zackary has confirmed it. Nothing here is invented.
 */
export const SITE = {
  name: 'Thomas Contracting & Scrap Removal',
  shortName: 'Thomas',
  tagline: 'Contracting • Scrap Removal',
  city: 'Lansing',
  region: 'NY',
  regionLong: 'New York',
  county: 'Tompkins County',

  /** Business phone, digits only. Drives every call button and link on the site. */
  phone: '6072806926',

  /** Public business email. Empty = not shown. */
  email: '',

  /**
   * How the estimate form behaves:
   *  - "demo":    validates, then clearly says nothing was sent (use until a backend is live)
   *  - "netlify": posts to Netlify Forms and only confirms when Netlify answers OK
   */
  formMode: 'netlify' as 'demo' | 'netlify',

  /** Shows small "Draft – Zackary to confirm" tags next to unverified copy. Set false at launch. */
  showReviewFlags: true,

  /** Web design credit shown in the footer. */
  builtBy: 'Dalal Technologies',
} as const;

const digits = SITE.phone.replace(/\D/g, '');

export const PHONE = {
  has: digits.length === 10 || (digits.length === 11 && digits.startsWith('1')),
  href: digits.length === 10 ? `tel:+1${digits}` : `tel:+${digits}`,
  display:
    digits.length >= 10
      ? `(${digits.slice(-10, -7)}) ${digits.slice(-7, -4)}-${digits.slice(-4)}`
      : '',
  smsHref: digits.length === 10 ? `sms:+1${digits}` : `sms:+${digits}`,
} as const;

export const LOCATION_LINE = `${SITE.city}, ${SITE.region} • Serving the Greater Ithaca Area`;
