// @ts-check
import { defineConfig } from 'astro/config';
import markdoc from '@astrojs/markdoc';

// https://astro.build/config
export default defineConfig({
  // Renders the `news` collection's Markdoc body (src/content/news/*.mdoc).
  // Static-only — no SSR adapter needed for this; that's only required once
  // the /keystatic admin route is added (see CLAUDE.md §3).
  integrations: [markdoc()],
});
