export interface HeroImage {
  src: string;
  alt: string;
}

/** פרטי העסק – מקור אמת יחיד לכל האתר */
export const site = {
  name: 'ניר הלאלי',
  tagline: 'לימוד נהיגה על אופנועים',
  city: 'פתח תקווה',
  address: 'ראש פינה 21, פתח תקווה',
  phone: {
    display: '054-4287793',
    tel: '0544287793',
    international: '972544287793',
  },
  description:
    'לימוד נהיגה על אופנועים וקטנועים בפתח תקווה – רישיון A2, A1 ו-A. יחס אישי והכנה אמיתית לטסט.',
  /**
   * תמונה ל-Hero – לשים קובץ ב-public/images ולכתוב כאן, למשל:
   * { src: '/images/hero.jpg', alt: 'ניר הלאלי על האופנוע במגרש' }
   * כל עוד null – מוצג במקומה ציטוט מביקורת.
   */
  heroImage: null as HeroImage | null,
} as const;

export const telHref = `tel:${site.phone.tel}`;

/** קישור וואטסאפ, עם הודעה מוכנה מראש (אופציונלי) */
export function waHref(message?: string): string {
  const base = `https://wa.me/${site.phone.international}`;
  return message ? `${base}?text=${encodeURIComponent(message)}` : base;
}

export const mapsHref = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(site.address)}`;
export const mapsEmbedSrc = `https://maps.google.com/maps?q=${encodeURIComponent(site.address)}&z=15&output=embed`;

export const nav = [
  { href: '/#licenses', label: 'רישיונות' },
  { href: '/guide/', label: 'כמה שיעורים צריך?' },
  { href: '/#process', label: 'איך זה עובד' },
  { href: '/#reviews', label: 'תלמידים ממליצים' },
  { href: '/#contact', label: 'צור קשר' },
] as const;
