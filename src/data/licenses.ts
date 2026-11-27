/**
 * דרגות רישיון לאופנוע.
 * הנתונים לפי תקנות משרד התחבורה כפי שפורסמו – לעדכן כאן בלבד אם משהו משתנה.
 */
export type LicenseCode = 'A2' | 'A1' | 'A';

export interface License {
  code: LicenseCode;
  title: string;
  blurb: string;
  /** מה מותר לרכוב – לשורת "מותר לרכוב" בטבלה */
  allows: string;
  specs: { label: string; value: string }[];
  /** שורות הטבלה בעמוד המדריך */
  table: {
    age: string;
    ageNote?: string;
    theory: string;
    theoryNote?: string;
    lessons: string;
    lessonsNote?: string;
  };
}

export const licenses: License[] = [
  {
    code: 'A2',
    title: 'קטנוע ואופנוע קל',
    blurb: 'הדרך הקלה להתחיל – לעיר, לעבודה ולסידורים, בלי להיתקע בפקקים.',
    allows: 'עד 125 סמ"ק ועד 14.6 כ"ס',
    specs: [
      { label: 'נפח מנוע', value: 'עד 125 סמ"ק' },
      { label: 'הספק', value: 'עד 14.6 כ"ס' },
      { label: 'גיל מינימלי', value: '16' },
      { label: 'שיעורים (מינימום)', value: '15' },
      { label: 'עם רישיון רכב 3+ שנים', value: 'ללא חובת שיעורים' },
    ],
    table: {
      age: '16',
      ageNote: 'תאוריה מגיל 15.5. עד גיל 17 – באישור הורים',
      theory: 'כן',
      theoryNote: 'פטור לבעלי רישיון רכב 3 שנים ומעלה',
      lessons: '15',
      lessonsNote: 'רישיון רכב 3+ שנים: אין מינימום, רק מבחן שליטה במגרש',
    },
  },
  {
    code: 'A1',
    title: 'אופנוע בינוני',
    blurb: 'לרכיבה גם מחוץ לעיר, בכבישים מהירים ובטיולים – אופנוע עם יותר כוח ויציבות.',
    allows: 'עד 47.46 כ"ס',
    specs: [
      { label: 'הספק', value: 'עד 47.46 כ"ס' },
      { label: 'גיל מינימלי', value: '18' },
      { label: 'שיעורים (מינימום)', value: '15' },
      { label: 'עם רישיון A2', value: '8 שיעורים' },
    ],
    table: {
      age: '18',
      ageNote: 'תאוריה מגיל 17.5',
      theory: 'כן',
      theoryNote: 'מי שכבר מחזיק רישיון נהיגה – לרוב פטור',
      lessons: '15',
      lessonsNote: 'מי שיש לו A2: 8 שיעורים',
    },
  },
  {
    code: 'A',
    title: 'אופנוע ללא הגבלה',
    blurb: 'הרישיון המלא – כל אופנוע, כל נפח וכל הספק. השלב הבא למי שכבר רוכב.',
    allows: 'כל אופנוע, ללא הגבלת נפח או הספק',
    specs: [
      { label: 'הספק', value: 'ללא הגבלה' },
      { label: 'גיל מינימלי', value: '21' },
      { label: 'תנאי', value: 'שנה ברישיון A1' },
      { label: 'שיעורים (מינימום)', value: '8' },
    ],
    table: {
      age: '21',
      ageNote: 'אחרי שנה לפחות ברישיון A1',
      theory: 'לא',
      theoryNote: 'מגיעים כבר עם A1',
      lessons: '8',
    },
  },
];

export const legalNote =
  'המידע מבוסס על תקנות משרד התחבורה כפי שפורסמו ונועד להכוונה בלבד. התקנות עשויות להשתנות – המידע המחייב הוא של משרד התחבורה.';
