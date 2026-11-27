export interface HeroImage {
  src: string;
  alt: string;
}

/** פרטי העסק – מקור אמת יחיד לכל האתר */
export const site = {
  name: 'ניר הלאלי',
  tagline: 'לימוד נהיגה על אופנועים',
  city: 'פתח תקווה',
  /** מיקום בית הספר (המגרש) – לא כתובת מגורים */
  location: {
    label: 'צמוד לקפלר אופנועים, פתח תקווה',
    lat: 32.106115,
    lng: 34.864424,
    googleMapsUrl: 'https://maps.app.goo.gl/DfgXiuqRD5MCB2JH6',
  },
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

const { lat, lng } = site.location;
export const mapsHref = site.location.googleMapsUrl;
export const wazeHref = `https://waze.com/ul?ll=${lat},${lng}&navigate=yes`;
export const mapsEmbedSrc = `https://maps.google.com/maps?q=${lat},${lng}&z=16&output=embed`;

export const nav = [
  { href: '/#licenses', label: 'רישיונות' },
  { href: '/guide/', label: 'כמה שיעורים צריך?' },
  { href: '/#process', label: 'איך זה עובד' },
  { href: '/#reviews', label: 'תלמידים ממליצים' },
  { href: '/#contact', label: 'צור קשר' },
] as const;
