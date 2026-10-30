export type IconName =
  | 'recycle' | 'truck' | 'broom' | 'garage' | 'hammer' | 'hardhat'
  | 'phone' | 'menu' | 'close' | 'arrow' | 'check' | 'pin' | 'clipboard'
  | 'calendar' | 'camera' | 'chevron' | 'mail' | 'user' | 'sms';

const PATHS: Record<IconName, string> = {
  recycle: 'M7 19H4.8a1.8 1.8 0 0 1-1.5-2.7L5 13.5M7 19l-2-2m2 2 2-2M10.2 5.3l1.1-1.9a1.8 1.8 0 0 1 3.1 0L16 6.2m0 0-3-.3m3 .3.7-2.9M20 14l-1.7 2.9M20 14l-3 .7m3-.7 1.3 2.7a1.8 1.8 0 0 1-1.6 2.6H14M14 19l2 2m-2-2 2-2',
  truck: 'M3 6h11v10H3zM14 9h4l3 3v4h-7zM7 19.5a1.8 1.8 0 1 0 0-3.6 1.8 1.8 0 0 0 0 3.6ZM17.5 19.5a1.8 1.8 0 1 0 0-3.6 1.8 1.8 0 0 0 0 3.6Z',
  broom: 'M14.5 3.5 20 9m-5.5-5.5-5 5L12 11l5.5-5.5M8.5 8.5 4 13c-1 1-1 2.6 0 3.6l3.4 3.4c1 1 2.600 1 3.600 0l4.500-4.500M6 15l3 3M9 12l3 3',
  garage: 'M3 21V9l9-6 9 6v12M7 21v-7h10v7M7 17h10M7 19h10',
  hammer: 'M4 20 12.500 11.500M10 6.500l4-3 6.500 6.500-3 4-2-1.500-5.500-5.500z',
  hardhat: 'M3 18h18v2H3zM5 18v-2.500a7 7 0 0 1 14 0V18M12 6v5.500M9.500 7.500V11M14.500 7.500V11',
  phone: 'M5 4h4l2 5-2.500 1.500a11 11 0 0 0 5 5L15 13l5 2v4a2 2 0 0 1-2 2A16 16 0 0 1 3 6a2 2 0 0 1 2-2Z',
  menu: 'M4 7h16M4 12h16M4 17h16',
  close: 'M6 6l12 12M18 6 6 18',
  arrow: 'M5 12h14M13 6l6 6-6 6',
  check: 'M5 12.500l4.500 4.500L19 7.500',
  pin: 'M12 21s-7-6.100-7-11.500A7 7 0 0 1 19 9.500C19 14.900 12 21 12 21ZM12 12a2.500 2.500 0 1 0 0-5 2.500 2.500 0 0 0 0 5Z',
  clipboard: 'M9 4h6l1 2h2a1 1 0 0 1 1 1v13a1 1 0 0 1-1 1H6a1 1 0 0 1-1-1V7a1 1 0 0 1 1-1h2ZM9 4a1 1 0 0 0 0 2h6a1 1 0 0 0 0-2M8.500 12h7M8.500 16h5',
  calendar: 'M4 7a1 1 0 0 1 1-1h14a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1ZM4 11h16M8 3v4M16 3v4',
  camera: 'M4 8h3l1.500-2h7L17 8h3a1 1 0 0 1 1 1v9a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V9a1 1 0 0 1 1-1ZM12 17a3.500 3.500 0 1 0 0-7 3.500 3.500 0 0 0 0 7Z',
  chevron: 'M6 9l6 6 6-6',
  mail: 'M4 6h16a1 1 0 0 1 1 1v10a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V7a1 1 0 0 1 1-1Zm0 1 8 6 8-6',
  user: 'M12 12a4 4 0 1 0 0-8 4 4 0 0 0 0 8ZM4 20a8 8 0 0 1 16 0',
  sms: 'M4 5h16a1 1 0 0 1 1 1v10a1 1 0 0 1-1 1H9l-5 4V6a1 1 0 0 1 1-1ZM8 10h8M8 13h5',
};

export function Icon({ name, size = 24, className = '' }: { name: IconName; size?: number; className?: string }) {
  return (
    <svg
      className={className}
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      focusable="false"
    >
      <path d={PATHS[name]} />
    </svg>
  );
}
