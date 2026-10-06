# SOJIB — 3D Personal Portfolio

A premium, immersive portfolio for **Habibul Hasan Sojib** (SOJIB) — frontend developer,
CST diploma student and SaaS builder from Bangladesh.

Dark, editorial and technical: one signature 3D scene, one controlled accent colour, and
content that only says what is actually true.

---

## Stack

| Layer      | Tech                                                        |
| ---------- | ----------------------------------------------------------- |
| Framework  | React 19 + TypeScript + Vite                                |
| Styling    | Tailwind CSS v4 (theme tokens in `src/index.css`)            |
| 3D         | Three.js + React Three Fiber + drei                          |
| Motion     | Framer Motion, Lenis (smooth scroll)                         |
| Routing    | React Router (home + `/projects/:slug` case studies)         |

## Getting started

```bash
npm install
npm run dev        # http://localhost:5173
npm run build      # type-check + production build to dist/
npm run preview    # serve the production build
```

## Structure

```
src/
├─ components/
│  ├─ layout/      Navbar, Footer, Loader, Cursor, SmoothScroll
│  ├─ sections/    Hero, About, Skills, Projects, WhatIBuild, HowIBuild, Journey, Contact
│  ├─ project/     FeaturedProject, ProjectIndex, InterfacePreview
│  ├─ three/       HeroScene, Workspace, FloatingCards, textures (canvas-painted)
│  └─ ui/          Button, Reveal, Tilt, Magnetic, SectionHead
├─ data/           profile, projects, skills, journey, content  ← all copy lives here
├─ hooks/          useMediaQuery, useActiveSection, usePageMeta
├─ lib/            utils, pointer, scroll (Lenis bridge)
└─ pages/          Home, ProjectDetail (lazy), NotFound
```

Every piece of text lives in `src/data/`, so the site can be re-written without touching
components.

## Before you ship

Two contact details are honest placeholders. Replace them in **`src/data/profile.ts`**:

```ts
contact: {
  email: 'your.email@example.com',        // ← your address
  github: 'https://github.com/sojib215',
  linkedin: 'https://www.linkedin.com/',  // ← your profile URL
  placeholder: ['email', 'linkedin'],     // ← remove each entry once replaced
}
```

While a field is listed in `placeholder`, the UI marks it with a dashed underline and a
tooltip instead of pretending the link is real. Also update the canonical URLs and
`og:image` domain in `index.html` once the site has a live address.

## Notes on the build

- **3D is the differentiator, not the whole site.** One hero scene: a floating developer
  workspace (monitor + code window + desk) with floating interface panels, a reflective
  floor, contact shadows and slow pointer parallax. Everything below is typography.
- **The scene is composed in code** — no downloaded models or HDRIs. Textures (code
  window, dashboard cards, chips, keyboard) are painted on a 2D canvas at runtime, so
  there are no image requests and nothing to optimise.
- **Graceful degradation:** no WebGL → a DOM-built version of the same composition;
  `prefers-reduced-motion` → no 3D, no cursor, no smooth scroll, no intro; phone → fewer
  objects, matte floor, lower DPR.
- **Performance:** `three` and React Three Fiber are lazy-loaded behind `React.lazy`, the
  render loop stops when the hero leaves the viewport or the tab is hidden, and the scene
  auto-scales to the viewport so nothing is cropped.
- **Accessibility:** semantic landmarks and heading order, skip link, visible focus
  rings, keyboard-operable skill nodes and project cards, `aria-label`s on icon links.
- **Honesty:** no fake metrics, clients, awards or years of experience anywhere. Project
  previews are labelled as stylised interface studies rather than screenshots, and
  projects without public links say “not public yet”.

## Deployment

SPA rewrites are already configured for Vercel (`vercel.json`), Netlify and Cloudflare
Pages (`public/_redirects`). For GitHub Pages, add a `404.html` copy of `index.html` if
you keep client-side routing.
