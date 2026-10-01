# Project rules

> Fill in the TODO items once. Every AI agent reads this file before it starts a task.

## Stack
- Astro (static pages). TODO: Tailwind or plain CSS? (state one and forbid the other)
- Package manager: TODO (pnpm / npm). Do not add dependencies without an explicit task.

## Structure
- Pages: `src/pages`. Reusable blocks: `src/components` (one component = one file). Layouts: `src/layouts`.
- Styles: TODO (e.g. `src/styles/tokens.css`, `global.css`).
- Images: `src/assets`, rendered through `astro:assets` with width and height set.

## Naming and code style
- CSS classes: BEM, lowercase (`block`, `block__element`, `block--modifier`).
- Section markup: `<section class="name section"><div class="container">...`.
- Colors, spacing, radii and font sizes come from the tokens in DESIGN.md only. No magic values.
- Comments in code are written in English.

## Quality
- Semantic HTML, one `h1` per page, visible keyboard focus, alt text on images, `prefers-reduced-motion` respected.
- `build` must finish without errors.

## Never
- Do not touch `netlify.toml`, `.env*`, CI files or anything outside this project directory.
- Do not commit, push, merge or deploy. Do not run destructive commands.
