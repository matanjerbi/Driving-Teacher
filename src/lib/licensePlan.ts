/**
 * לוגיקת "כמה שיעורים אני צריך?" – פונקציה טהורה, בלי DOM, כדי שתהיה ניתנת לבדיקה.
 */
import type { LicenseCode } from '../data/licenses';

export type CurrentLicense = 'none' | 'B-new' | 'B-old' | 'A2' | 'A1' | 'A1-old';

export const currentLicenseOptions: { value: CurrentLicense; label: string; hint?: string }[] = [
  { value: 'none', label: 'אין לי רישיון', hint: 'מתחיל מאפס' },
  { value: 'B-new', label: 'רישיון רכב (B)', hint: 'פחות מ-3 שנים' },
  { value: 'B-old', label: 'רישיון רכב (B)', hint: '3 שנים ומעלה' },
  { value: 'A2', label: 'אופנוע A2' },
  { value: 'A1', label: 'אופנוע A1', hint: 'פחות משנה' },
  { value: 'A1-old', label: 'אופנוע A1', hint: 'שנה ומעלה' },
];

export const currentLicenseLabel: Record<CurrentLicense, string> = {
  none: 'אין לי רישיון',
  'B-new': 'רישיון רכב פחות מ-3 שנים',
  'B-old': 'רישיון רכב 3 שנים ומעלה',
  A2: 'רישיון A2',
  A1: 'רישיון A1 (פחות משנה)',
  'A1-old': 'רישיון A1 (שנה ומעלה)',
};

export type StepTone = 'default' | 'ok' | 'highlight';

export interface RouteStep {
  label: string;
  value: string;
  sub: string;
  tone: StepTone;
}

export type Plan =
  | { kind: 'route'; age: string; minLessons: number | null; steps: RouteStep[]; tip: string }
  | { kind: 'blocked'; message: string };

const greenForm: RouteStep = {
  label: 'טופס ירוק',
  value: 'צריך',
  sub: 'הצהרת בריאות + בדיקת ראייה',
  tone: 'default',
};

const lessonsStep = (n: number, sub: string): RouteStep => ({
  label: 'שיעורים (מינימום בחוק)',
  value: `${n} שיעורים`,
  sub,
  tone: 'highlight',
});

export function getPlan(target: LicenseCode, current: CurrentLicense): Plan {
  switch (target) {
    case 'A2':
      return planA2(current);
    case 'A1':
      return planA1(current);
    case 'A':
      return planA(current);
  }
}

function planA2(current: CurrentLicense): Plan {
  if (current === 'A2' || current === 'A1' || current === 'A1-old') {
    return {
      kind: 'blocked',
      message: 'כבר יש לכם רישיון שמכסה קטנוע עד 125 סמ"ק – אין צורך ב-A2. אולי מתאים לכם לשדרג?',
    };
  }

  if (current === 'B-old') {
    return {
      kind: 'route',
      age: '16+',
      minLessons: null,
      steps: [
        greenForm,
        { label: 'תאוריה', value: 'פטור', sub: 'בזכות 3+ שנים ברישיון רכב', tone: 'ok' },
        { label: 'שיעורים (מינימום בחוק)', value: 'אין חובה', sub: 'רשמית לא חייבים בשיעורים', tone: 'ok' },
        { label: 'טסט', value: 'מבחן שליטה', sub: 'במגרש בלבד, בלי רכיבה בכביש', tone: 'default' },
      ],
      tip: 'אין חובה בשיעורים, אבל אי אפשר להגיע למבחן שליטה בלי לדעת לשלוט בכלי. בפועל עושים כמה שיעורים – כדי ללמוד איזון, בלימות ותמרון ולהגיע למבחן רגועים.',
    };
  }

  return {
    kind: 'route',
    age: '16+ (עד 17 באישור הורים)',
    minLessons: 15,
    steps: [
      greenForm,
      { label: 'תאוריה', value: 'צריך', sub: 'תאוריה לאופנוע, מגיל 15.5', tone: 'default' },
      lessonsStep(15, 'מגרש + כביש'),
      { label: 'טסט', value: 'מבחן מעשי', sub: 'מגרש וכביש', tone: 'default' },
    ],
    tip:
      current === 'B-new'
        ? 'יש לכם רישיון רכב פחות מ-3 שנים, ולכן עדיין לא חלה ההקלה. כשתעברו 3 שנים ברישיון רכב – לא תהיה חובת שיעורים ותאוריה ל-A2.'
        : '15 שיעורים זה המינימום בחוק. יש תלמידים שמוכנים אחרי 15, ויש שצריכים עוד קצת – נגיד לכם בכנות.',
  };
}

function planA1(current: CurrentLicense): Plan {
  if (current === 'A1' || current === 'A1-old') {
    return { kind: 'blocked', message: 'כבר יש לכם A1 🙂 השלב הבא הוא A – אחרי שנה ברישיון A1.' };
  }

  if (current === 'A2') {
    return {
      kind: 'route',
      age: '18+',
      minLessons: 8,
      steps: [
        greenForm,
        { label: 'תאוריה', value: 'פטור', sub: 'כבר יש לכם רישיון אופנוע', tone: 'ok' },
        lessonsStep(8, 'שדרוג מ-A2'),
        { label: 'טסט', value: 'מבחן מעשי', sub: 'על אופנוע A1', tone: 'default' },
      ],
      tip: 'מעבר מקטנוע לאופנוע עם הילוכים וכוח רב יותר – 8 השיעורים מוקדשים להתרגל לכלי הכבד יותר.',
    };
  }

  const hasCarLicense = current === 'B-new' || current === 'B-old';
  return {
    kind: 'route',
    age: '18+ (תאוריה מגיל 17.5)',
    minLessons: 15,
    steps: [
      greenForm,
      hasCarLicense
        ? { label: 'תאוריה', value: 'לרוב פטור', sub: 'בעלי רישיון נהיגה – נבדוק את המקרה שלכם', tone: 'ok' }
        : { label: 'תאוריה', value: 'צריך', sub: 'תאוריה לאופנוע', tone: 'default' },
      lessonsStep(15, 'מגרש + כביש'),
      { label: 'טסט', value: 'מבחן מעשי', sub: 'מגרש וכביש', tone: 'default' },
    ],
    tip:
      current === 'B-old'
        ? 'שימו לב: ההקלה של "בלי שיעורים" לבעלי רישיון רכב ותיק חלה רק על A2. ל-A1 צריך 15 שיעורים.'
        : 'אפשר גם להתחיל ב-A2 ולשדרג אחר כך ל-A1 ב-8 שיעורים בלבד.',
  };
}

function planA(current: CurrentLicense): Plan {
  if (current === 'A1-old') {
    return {
      kind: 'route',
      age: '21+',
      minLessons: 8,
      steps: [
        greenForm,
        { label: 'תאוריה', value: 'פטור', sub: 'כבר יש לכם A1', tone: 'ok' },
        lessonsStep(8, 'על אופנוע כבד'),
        { label: 'טסט', value: 'מבחן מעשי', sub: 'על אופנוע A', tone: 'default' },
      ],
      tip: 'אופנוע ללא הגבלה מגיב אחרת – בשיעורים עובדים על שליטה בכוח, בלימות ותמרון באופנוע כבד.',
    };
  }

  if (current === 'A1') {
    return {
      kind: 'blocked',
      message: 'כדי להוציא A צריך להחזיק ברישיון A1 לפחות שנה, ולהיות בן 21. בינתיים – רוכבים וצוברים ניסיון 🙂',
    };
  }

  return {
    kind: 'blocked',
    message:
      'רישיון A מוציאים רק אחרי שנה לפחות ברישיון A1 ומגיל 21. המסלול שלכם מתחיל ב-A1 – בחרו A1 בשאלה הראשונה כדי לראות כמה שיעורים צריך.',
  };
}

export function planWhatsAppMessage(target: LicenseCode, current: CurrentLicense): string {
  return `היי ניר, אני רוצה רישיון ${target}. כרגע יש לי: ${currentLicenseLabel[current]}. אשמח לפרטים`;
}
