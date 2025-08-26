# Resume Ranker

AI-powered resume ranking web app. Upload resumes, paste a job description, and instantly get the top candidates with transparent, explainable scoring.

## Quick start

1) Install dependencies

```bash
npm install
```

2) Start the dev server (runs on port 8080)

```bash
npm run dev
```

3) Open the app

- Home (overview): http://localhost:8080/
- Resume Ranker tool: http://localhost:8080/hr

## How to use

1) Go to the tool page at `/hr`.
2) Upload one or more resumes (PDF or TXT).
3) Paste the job description for the role.
4) Click "Analyze Resumes" to generate ranked candidates and see domain-specific breakdowns.

## Scripts

- `npm run dev` – Start development server
- `npm run build` – Production build
- `npm run preview` – Preview production build
- `npm run lint` – Run ESLint

## Tech stack

- React + Vite + TypeScript
- Tailwind CSS (custom theme + utilities)
- shadcn/ui components
- Recharts

## Design system

- Global, fixed gradient background for seamless scrolling
- Dark glassmorphism for cards and controls
- Subtle motion: starfield and per-page cursor effects (custom ring on `/hr`)
- Accessible color contrasts and balanced typography

## Project structure

- `src/pages/Index.tsx` – Home (overview + instructions)
- `src/pages/HR.tsx` – Resume Ranker tool
- `src/components` – UI components (cards, tabs, uploader, rankings)
- `src/lib` – Analysis logic
- `src/index.css` – Theme tokens and utility classes

## Notes

- The app uses a fixed background overlay composed of gradient, vignette, starfield and subtle noise. Sections inherit this background to avoid seams.
- The tool page uses a custom cursor ring; the large spotlight is disabled there for clarity.
