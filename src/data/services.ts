import type { IconName } from '../components/Icon';

export interface Service {
  slug: string;
  title: string;
  short: string;
  intro: string;
  image: string;
  imageAlt: string;
  icon: IconName;
  /** Examples of requests people might make. Conditional wording, not a capability list. */
  examples: string[];
  /** Internal flag: service not yet confirmed by Zackary. Public copy stays conditional. */
  provisional: boolean;
}

export const SERVICES: Service[] = [
  {
    slug: 'scrap-metal-removal',
    title: 'Scrap Metal Removal',
    short: 'Old appliances, metal and scrap taking up space? Tell us what you have and we’ll talk through getting it hauled away.',
    intro:
      'If metal, old appliances or leftover scrap are piling up on your property, the first step is simply describing what you have. Share a few details and photos, and we’ll talk through the next steps.',
    image: '/img/svc-scrap-metal.webp',
    imageAlt: 'Illustrative image: appliances and scrap metal piled beside a driveway',
    icon: 'recycle',
    examples: ['Old appliances', 'Metal left over from a project', 'Scrap that has built up in a yard or garage'],
    provisional: true,
  },
  {
    slug: 'junk-debris-removal',
    title: 'Junk & Debris Removal',
    short: 'Clear out unwanted items and leftover debris so your space is usable again.',
    intro:
      'Whether it’s a one-time cleanup or a pile that’s been growing for a while, describe what needs to go and where it is. We’ll help you understand the next steps and request an estimate.',
    image: '/img/svc-junk-debris.webp',
    imageAlt: 'Illustrative image: a crew member loading debris into a dump trailer',
    icon: 'truck',
    examples: ['Old furniture and household items', 'Yard and property debris', 'Leftover materials after a project'],
    provisional: true,
  },
  {
    slug: 'construction-cleanup',
    title: 'Construction Cleanup',
    short: 'Leftover materials and job-site debris cleared so your project can keep moving.',
    intro:
      'Finishing a project often leaves a mess behind. If you need leftover materials and debris cleared so the next phase can start, tell us about the site and we’ll discuss the scope.',
    image: '/img/svc-construction-cleanup.webp',
    imageAlt: 'Illustrative image: dump trailer loaded with lumber and demolition debris',
    icon: 'broom',
    examples: ['Leftover lumber and building materials', 'Job-site debris', 'Cleanup between project phases'],
    provisional: true,
  },
  {
    slug: 'garage-property-cleanouts',
    title: 'Garage & Property Cleanouts',
    short: 'Take back the garage, shed or property with a practical, no-nonsense cleanout.',
    intro:
      'Garages, sheds and outbuildings fill up. If it’s time to clear things out, describe the space and what’s in it, and we’ll help you take the next step.',
    image: '/img/svc-cleanouts.webp',
    imageAlt: 'Illustrative image: a worker carrying items out of a garage',
    icon: 'garage',
    examples: ['Garage cleanouts', 'Sheds and outbuildings', 'Property cleanups'],
    provisional: true,
  },
  {
    slug: 'general-contracting',
    title: 'General Contracting',
    short: 'Have a project in mind? Describe it and we’ll discuss the scope and next steps.',
    intro:
      'From property cleanup to contracting needs, the goal is to help you move your project forward. Tell us what you’re planning and we’ll talk through whether and how we can help.',
    image: '/img/svc-general-contracting.webp',
    imageAlt: 'Illustrative image: black work truck parked at a property with a dump trailer',
    icon: 'hammer',
    examples: ['Projects you’d like to discuss', 'Questions about scope and next steps', 'Work that needs a local contractor’s input'],
    provisional: true,
  },
  {
    slug: 'light-demolition-cleanup',
    title: 'Light Demolition & Cleanup',
    short: 'Help with small teardown jobs and clearing out what’s left behind.',
    intro:
      'If part of a property needs to come down or come out, and the debris needs to go with it, tell us about the job. We’ll review the details and discuss what’s possible.',
    image: '/img/svc-light-demolition.webp',
    imageAlt: 'Illustrative image: partially demolished building with exposed framing',
    icon: 'hardhat',
    examples: ['Small teardown jobs', 'Removing and hauling the debris', 'Clearing a site after demolition'],
    provisional: true,
  },
];

export const getService = (slug: string) => SERVICES.find((s) => s.slug === slug);
