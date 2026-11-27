# ניר הלאלי – לימוד נהיגה על אופנועים

אתר לבית ספר לנהיגה על אופנועים בפתח תקווה (רישיון A2 · A1 · A), בנוי ב-[Astro](https://astro.build) ו-TypeScript.
האתר סטטי לחלוטין – יוצא HTML ו-CSS נקיים, עם מעט JavaScript רק איפה שצריך (אשף השיעורים ואנימציות הכניסה).

## עמודים

| נתיב | תיאור |
| --- | --- |
| `/` | דף הבית – דרגות רישיון, למה אצלנו, תהליך, ביקורות, שאלות נפוצות, יצירת קשר |
| `/guide/` | "כמה שיעורים אני צריך?" – אשף לפי הרישיון הרצוי והרישיון הקיים, טבלת דרגות והסבר על הטופס הירוק |

## הפעלה

```bash
npm install
npm run dev      # שרת פיתוח – http://localhost:4321
npm run build    # בנייה ל-dist/
npm run preview  # תצוגה של הבנייה
npm run check    # בדיקת טיפוסים
npm test         # בדיקות יחידה
```

## מבנה

```
src/
├── data/                 # כל התוכן – עורכים כאן, לא בקומפוננטות
│   ├── site.ts           # שם, טלפון, כתובת, תפריט, קישורי וואטסאפ
│   ├── licenses.ts       # דרגות הרישיון (מפרט, גיל, תאוריה, שיעורים)
│   └── content.ts        # למה אצלנו, שלבים, ביקורות, שאלות נפוצות, טופס ירוק
├── lib/
│   └── licensePlan.ts    # לוגיקת האשף – פונקציה טהורה עם בדיקות
├── layouts/
│   └── BaseLayout.astro  # <head>, כותרת, פוטר, כפתורי קשר
├── components/
│   ├── layout/           # Header, Footer, QuickContact, Icon
│   ├── home/             # הסקשנים של דף הבית
│   ├── guide/            # האשף, הטבלה, הטופס הירוק
│   ├── SectionHeader.astro
│   └── CtaBanner.astro
├── pages/
│   ├── index.astro
│   └── guide.astro
└── styles/
    └── global.css        # design tokens, טיפוגרפיה, כפתורים
tests/
└── licensePlan.test.ts
```

### עדכונים נפוצים

- **טלפון / כתובת** – `src/data/site.ts`
- **ביקורת חדשה** – להוסיף אובייקט ל-`reviews` ב-`src/data/content.ts`
- **שינוי בתקנות** (גיל, מספר שיעורים) – `src/data/licenses.ts` לטבלה ולכרטיסים, ו-`src/lib/licensePlan.ts` לאשף. אחרי שינוי באשף – לעדכן את הבדיקות ולהריץ `npm test`.

## פריסה

### Cloudflare Pages
- Build command: `npm run build`
- Output directory: `dist`

### GitHub Pages / כל שרת סטטי
להעלות את תוכן `dist/` אחרי `npm run build`.

> לפני פרסום: לעדכן את `site` ב-`astro.config.mjs` לכתובת הדומיין הסופית.
