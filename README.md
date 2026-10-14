# Anastasija — AI & Automation Portfolio

A personal portfolio for an AI & Automation Developer, built with **Next.js 16 (App Router)**, **TypeScript**, **Tailwind CSS v4** and **Lucide** icons. Every page is generated statically, so it runs on Vercel's free tier without a backend.

## Quick start

```bash
npm install
npm run dev        # http://localhost:3000
```

| Command         | What it does                         |
| --------------- | ------------------------------------ |
| `npm run dev`   | Development server with hot reload   |
| `npm run lint`  | ESLint (Next.js + TypeScript rules)  |
| `npx tsc --noEmit` | Type check                        |
| `npm run build` | Production build                     |
| `npm run start` | Serve the production build locally   |

Requires Node.js 20.9 or newer.

## Where to edit content

You never need to touch components to change content. Everything lives in `src/data/`:

| File | Contents |
| --- | --- |
| `src/data/site.ts` | Name, education, hero text, About text, email/LinkedIn/GitHub/CV links, navigation, contact copy, `showPlaceholderNotes` switch |
| `src/data/projects.ts` | All projects and case studies (typed), status labels |
| `src/data/skills.ts` | Skills & tools categories (plain text) |
| `src/data/gallery.ts` | Images for the "AI Creative Design & Visuals" gallery |

### Placeholders: `todo("…")`

Anything that still needs your input is wrapped in `todo("…")`. While `site.showPlaceholderNotes` is `true`, these appear as yellow dashed notes on the page so you can see what's missing. Set it to `false` before publishing and every unfinished note is hidden. Nothing marked `todo` is ever shown as a real fact.

Empty links in `site.contact` (`linkedin`, `github`, `cv`) are hidden automatically.

### Adding a project

1. Copy an entry in `src/data/projects.ts` and give it a unique `slug`.
2. Pick a `tone` for the placeholder tint, or add a `coverImage` screenshot.
3. Set each feature's `status` to `implemented`, `prototype` or `planned`.

The card, case-study page (`/projects/<slug>`), sitemap entry and Open Graph image are created automatically.

### Adding screenshots

Drop image files into `public/projects/<slug>/` — that's all. They appear automatically on the project page (click opens full size), and the card uses `cover.png` (or the first image) as its picture.

- Name files in the order you want them: `01-dashboard.png`, `02-results.png` … The caption comes from the name ("02-results.png" → "Results").
- Folders: `ai-website-builder`, `ai-data-assistant`, `ai-nutrition-meal-planner`, `telegram-life-assistant`, `n8n-workflow-automations`.
- Only add real screenshots of your work. For designs or concepts, list them in the project's `screenshots` array with `kind: "mockup"` so they are labelled as such.

### Adding links

In `src/data/projects.ts`, add any of these to a project:

```ts
githubUrl: "https://github.com/you/repo",          // "Source code" button
demoUrl: "https://your-demo.vercel.app",            // "Live demo" button
links: [{ label: "Figma design", url: "https://…" }], // any other links
```

### Adding images to the creative gallery

Put your images in `public/gallery/` and add one entry per image to `galleryItems` in `src/data/gallery.ts` (title, category, AI tools used, optional description, and the image's pixel `width`/`height`). Categories: `advertising`, `interior`, `concepts`, `digital-art`. The filters, counts and larger view update automatically, and the first image also becomes the project card's cover. Only add your own work.

### Documenting n8n workflows

Add objects to `automations` on the n8n project (the expected shape is in the comment above it). Each one is rendered with Trigger → Connected systems → Processing steps → Output → Business value.

### CV

Put your PDF at `public/cv/anastasija-cv.pdf` and set `contact.cv: "/cv/anastasija-cv.pdf"`.

## Deploying to Vercel

1. Push the project to a GitHub repository:
   ```bash
   git add -A && git commit -m "Portfolio" && git branch -M main
   git remote add origin https://github.com/<you>/<repo>.git && git push -u origin main
   ```
2. On [vercel.com/new](https://vercel.com/new), import the repository. Vercel detects Next.js; keep the default build settings.
3. *(Optional)* Under **Settings → Environment Variables**, set `NEXT_PUBLIC_SITE_URL` to your final domain (e.g. `https://anastasija.dev`). If you skip this, Vercel's production URL is used for canonical links, Open Graph tags and the sitemap.
4. Deploy. Every push to `main` redeploys, and pull requests get preview URLs.
5. *(Optional)* Add a custom domain under **Settings → Domains**, then update `NEXT_PUBLIC_SITE_URL` and redeploy.

You can also deploy from the terminal with `npx vercel` (preview) and `npx vercel --prod`.

## Project structure

```
src/
  app/
    layout.tsx               fonts, global metadata, nav, footer
    page.tsx                 home page (sections in order)
    projects/[slug]/         case-study template + per-project OG image
    opengraph-image.tsx      generated social preview image
    not-found.tsx, error.tsx, loading.tsx, sitemap.ts, robots.ts, icon.svg
  components/
    layout/                  Nav (sticky, mobile menu), Footer
    home/                    Hero, About, Skills, Contact, CopyEmail
    projects/                ProjectsSection, ProjectCard, ProjectCover
    gallery/                 Gallery (filters + lightbox)
    case-study/              ReadingProgress, CaseStudyToc, FlowDiagram, Screenshots
    ui/                      Buttons, badges, placeholder-aware text, brand icons
  data/                      all content (see above)
  lib/                       todo() helpers, cn()
public/
  projects/<slug>/           project screenshots
  gallery/                   creative gallery images
  cv/                        your CV PDF
```

## Accessibility and performance

- Semantic landmarks, a skip link, visible focus styles, `aria-pressed` filters, a mobile menu that closes with Esc, and a native `<dialog>` lightbox.
- Animation is minimal (hover transitions and a short CSS fade-in) and respects `prefers-reduced-motion`. Fonts are self-hosted via `next/font`. Images go through `next/image` (AVIF/WebP).
- Every route is prerendered as static HTML.
