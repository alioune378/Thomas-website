export interface Faq {
  q: string;
  a: string;
  /** True when the answer depends on business details Zackary still has to confirm. */
  needsReview: boolean;
}

export const FAQS: Faq[] = [
  {
    q: 'How do I request an estimate?',
    a: 'Use the estimate form on this site. Tell us what you need, where the property is, and add photos if you have them. Once a business phone number is published here, you’ll be able to call as well.',
    needsReview: false,
  },
  {
    q: 'What types of materials can you remove?',
    a: 'It depends on the material and the job. Describe what you have (and send photos if you can) and we’ll let you know whether it’s something we can help with.',
    needsReview: true,
  },
  {
    q: 'Do I need to be home during the work?',
    a: 'That usually depends on the job and how we’ll access the property. We’ll talk it through with you when we discuss scheduling.',
    needsReview: true,
  },
  {
    q: 'Do you offer residential and commercial services?',
    a: 'Let us know in your request whether the property is a home or a business, and we’ll tell you whether we can help.',
    needsReview: true,
  },
  {
    q: 'What areas do you cover?',
    a: 'Thomas is based in Lansing, NY and serves Ithaca, Dryden, Trumansburg, Freeville, Groton and other Tompkins County communities. If you’re not sure whether you’re in range, send a request and ask.',
    needsReview: false,
  },
  {
    q: 'How is pricing determined?',
    a: 'Pricing depends on the details of the job, so the best way to get a number is to describe the work. After reviewing your request, we’ll discuss the scope and an estimate with you.',
    needsReview: true,
  },
  {
    q: 'How far in advance should I schedule?',
    a: 'Availability changes, so it’s best to reach out as early as you can. Tell us about your timeline in your request and we’ll let you know what’s realistic.',
    needsReview: true,
  },
];

export const VALUE_PROPS = [
  {
    icon: 'clipboard' as const,
    title: 'Straightforward Estimates',
    text: 'Tell us what you need done, and we’ll help you understand the next steps.',
  },
  {
    icon: 'calendar' as const,
    title: 'Convenient Scheduling',
    text: 'Request a service appointment or estimate at a time that works for you.',
  },
  {
    icon: 'hammer' as const,
    title: 'Practical, Professional Service',
    text: 'From property cleanup to contracting needs, get help moving your project forward.',
  },
  {
    icon: 'pin' as const,
    title: 'Local Service',
    text: 'Based in Lansing and focused on customers throughout the surrounding area.',
  },
];

export const STEPS = [
  { n: '01', title: 'Tell Us What You Need', text: 'Call or submit a quick request describing your project.' },
  { n: '02', title: 'Discuss the Details', text: 'We’ll review your request and determine the appropriate next steps.' },
  { n: '03', title: 'Plan the Work', text: 'Once the scope and estimate are agreed upon, we can discuss scheduling.' },
];

/** Geographic candidates only. NOT verified service commitments until Zackary confirms. */
export const NEARBY_AREAS = ['Ithaca', 'Dryden', 'Trumansburg', 'Freeville', 'Groton', 'Other Tompkins County communities'];

/** "On the job" gallery: real photos supplied by Zackary. Add more as they come in. */
export const GALLERY = [
  { image: '/img/job-scrap-trailer.webp', alt: 'Old commercial freezer loaded on a utility trailer for scrap removal', caption: 'Appliance scrap pickup', w: 1200, h: 900 },
  { image: '/img/job-work-truck.webp', alt: 'Zackary’s black Chevrolet Silverado work truck', caption: 'Ready to haul', w: 1200, h: 900 },
  { image: '/img/zackary-owner.webp', alt: 'Zackary, owner of Thomas Contracting & Scrap Removal', caption: 'Zackary, owner', w: 900, h: 1200 },
];
