// @ts-check
import { defineConfig } from 'astro/config';

export default defineConfig({
  // כתובת האתר הסופית (לקישורים קנוניים ול-sitemap) – לעדכן אחרי שיהיה דומיין
  // site: 'https://example.co.il',
  build: { format: 'directory' },
});
