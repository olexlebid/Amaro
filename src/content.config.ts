// Content Layer config. `courses` is edited by me via Claude (see CLAUDE.md
// §6.2), not registered in Keystatic — owners only get `schedule`/`gallery`/
// `team`. One JSON file per course under src/content/courses/, id = filename
// = slug.
import { defineCollection, z } from "astro:content";
import { glob } from "astro/loaders";

const courses = defineCollection({
  loader: glob({ pattern: "**/*.json", base: "./src/content/courses" }),
  schema: ({ image }) =>
    z.object({
      title: z.string(),
      order: z.number(),
      image: image(),
      imageAlt: z.string(),
      ageTags: z.array(z.string()),
      description: z.string(),
      href: z.string().default("#"),
    }),
});

// `news` (blog) — one Markdoc file per article, id = filename = slug, body
// written in Markdoc (see astro.config.mjs's `markdoc()` integration).
// Currently edited by me via Claude (CLAUDE.md §6.2), not registered in
// Keystatic. Deliberately Markdoc rather than JSON (like `courses` above) or
// plain MDX: Keystatic's rich-text field (`fields.document()`) serializes to
// Markdoc too, so once the owners get a blog admin UI it can point at this
// same folder and open these exact files with no format migration.
// `metaTitle`/`metaDescription`/`author`/`featured` are all optional — omit
// the key entirely when unused (a blank `key:` parses to `null` in YAML,
// which `.optional()` rejects; it wants the key missing, not empty).
const news = defineCollection({
  loader: glob({ pattern: "**/*.mdoc", base: "./src/content/news" }),
  schema: ({ image }) =>
    z.object({
      title: z.string(),
      date: z.coerce.date(),
      category: z.enum(["Neuigkeiten", "Erfolge", "Tipps", "Events"]),
      excerpt: z.string(),
      cover: image(),
      coverAlt: z.string(),
      metaTitle: z.string().optional(),
      metaDescription: z.string().optional(),
      author: z.string().optional(),
      featured: z.boolean().default(false),
    }),
});

export const collections = { courses, news };
