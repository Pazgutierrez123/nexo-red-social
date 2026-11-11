const base = { width: 18, height: 18, viewBox: '0 0 24 24', fill: 'none', stroke: 'currentColor', strokeWidth: 2, strokeLinecap: 'round', strokeLinejoin: 'round' }

const make = (paths) => function Icon({ size = 18, ...p }) {
  return <svg {...base} width={size} height={size} {...p}>{paths}</svg>
}

export const IconHeart = make(<path d="M20.8 4.6a5.5 5.5 0 0 0-7.8 0L12 5.7l-1-1.1a5.5 5.5 0 1 0-7.8 7.8L12 21.2l8.8-8.8a5.5 5.5 0 0 0 0-7.8z" />)
export const IconComment = make(<path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />)
export const IconShare = make(<><circle cx="18" cy="5" r="3" /><circle cx="6" cy="12" r="3" /><circle cx="18" cy="19" r="3" /><path d="m8.6 13.5 6.8 4M15.4 6.5l-6.8 4" /></>)
export const IconBookmark = make(<path d="m19 21-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z" />)
export const IconUsers = make(<><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" /><circle cx="9" cy="7" r="4" /><path d="M23 21v-2a4 4 0 0 0-3-3.9M16 3.1a4 4 0 0 1 0 7.8" /></>)
export const IconCompass = make(<><circle cx="12" cy="12" r="10" /><path d="m16.2 7.8-2.1 6.3-6.3 2.1 2.1-6.3z" /></>)
export const IconShield = make(<path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />)
export const IconCalendar = make(<><rect x="3" y="4" width="18" height="18" rx="2" /><path d="M16 2v4M8 2v4M3 10h18" /></>)
export const IconArrow = make(<path d="M5 12h14M13 6l6 6-6 6" />)
export const IconCheck = make(<path d="M20 6 9 17l-5-5" />)
export const IconLock = make(<><rect x="3" y="11" width="18" height="11" rx="2" /><path d="M7 11V7a5 5 0 0 1 10 0v4" /></>)
export const IconServer = make(<><rect x="2" y="3" width="20" height="8" rx="2" /><rect x="2" y="13" width="20" height="8" rx="2" /><path d="M6 7h.01M6 17h.01" /></>)
export const IconGraph = make(<><circle cx="5" cy="6" r="2.5" /><circle cx="19" cy="6" r="2.5" /><circle cx="12" cy="18" r="2.5" /><path d="M7.3 7 10.7 16M16.7 7l-3.4 9M7.5 6h9" /></>)
export const IconHash = make(<path d="M4 9h16M4 15h16M10 3 8 21M16 3l-2 18" />)
export const IconSearch = make(<><circle cx="11" cy="11" r="7" /><path d="m21 21-4.3-4.3" /></>)
export const IconReply = make(<><path d="M9 17 4 12l5-5" /><path d="M20 18v-2a4 4 0 0 0-4-4H4" /></>)
