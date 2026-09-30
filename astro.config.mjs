// @ts-check
import { defineConfig } from 'astro/config';
import markdoc from '@astrojs/markdoc';

// https://astro.build/config
export default defineConfig({
  // Needed to resolve absolute URLs (og:image, canonical) at build time.
  // On Netlify, `URL` is the site's primary address (the preview *.netlify.app now, the real domain after launch),
  // so og:image/canonical never point at the old WordPress site that doesn't host our assets.
  site: process.env.URL || 'https://tanzschule-amaro.de',
  // Renders the `news` collection's Markdoc body (src/content/news/*.mdoc).
  // Static-only — no SSR adapter needed for this; that's only required once
  // the /keystatic admin route is added (see CLAUDE.md §3).
  integrations: [markdoc()],
});
