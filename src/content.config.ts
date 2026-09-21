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

export const collections = { courses };
