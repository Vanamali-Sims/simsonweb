# Vanamali Sims — portfolio v2

Personal site for a data, AI and full-stack engineer. Built so a recruiter
gets name, role, proof, projects and contact in one screen, and can tailor
the page to the role they hire for.

## What's in it

- **Bento hero**: the whole résumé above the fold, with one green contact tile.
- **Recruiter lenses**: "Hiring for" Data Eng / Data Science / AI Eng /
  Full-stack swaps the role line, pitch, proof numbers, project order and
  highlighted stack. The lens is kept in the URL, so
  `/?for=ai-eng` is a ready-made tailored link.
- **⌘K command palette**: jump anywhere, switch lens, copy email, get the CV.
  Doubles as the menu on phones.
- **Case studies** at `/work/<slug>`: problem, approach, result and what
  didn't work, for every project.
- **Cover art drawn in code**: each project has an SVG illustration rendered
  on the server, themed through CSS variables (light and dark).

## Design system: Signal

Black, white and one green (`--signal`) used only for things that are live or
clickable. Bricolage Grotesque for display (self-hosted), Geist sans and mono
for text and labels. Tokens live at the top of `src/app/globals.css`.

## Performance rules

- Animate `transform` and `opacity` only; hover effects only on hover-capable
  devices; everything respects `prefers-reduced-motion`.
- No animation libraries, no tracking, no background media.
- Project art is server-rendered SVG, so its drawing code never ships to the
  browser.

## Editing content

| What | Where |
| --- | --- |
| Name, lenses, proof numbers, experience, stack, about | `src/data/site.ts` |
| Projects and case studies | `src/data/projects.ts` |
| Project cover art | `src/components/ProjectArt.tsx` |
| CV | `public/Vanamali_Sims_Resume.pdf`, built from `cv/Vanamali_Sims_Resume.tex` with `pdflatex` |

Only use numbers that are evidenced in a repo, the CV or a client report.
If a project has no number, leave `metric: null`.

## Run it

```bash
npm install
npm run dev      # http://localhost:3000
npm run build    # production build
npm run lint
```

Set `NEXT_PUBLIC_SITE_URL` to the production domain so social previews use
absolute URLs (Vercel previews fall back to their own URL).

## Git workflow

- `main` is production.
- `development` is the integration branch.
- Work happens on `feat/*`, `fix/*` and `chore/*` branches off `development`,
  merged back with `--no-ff`; `development` is merged into `main` to release.
- Commit messages follow Conventional Commits.
