# Portfolio

> **Visit** [My Portfolio](https://esmailga.github.io/site/) to view my expertise and works

This is the personal portfolio of **Esmail Alwahbani**, a software developer working across web and backend development, ERP systems, mobile apps and industrial control systems. It is a single-page site built with React, TypeScript and Vite, and GitHub Actions deploys it to GitHub Pages.

## Portfolio Landing page in dark mode

![landing](https://github.com/user-attachments/assets/792264b0-6468-4677-850f-9babf0628ed0)

## Features

- **Light and dark themes**: a toggle in the top bar switches themes, and the change animates smoothly. The site opens in light mode.
- **Downloadable CV**: the top bar has a button that downloads the résumé PDF.
- **Social sidebar**: WhatsApp, Gmail, LinkedIn and GitHub links sit next to a scroll-progress line. On mobile, the links hide themselves after you scroll down.
- **Tech stack marquee**: logos scroll in an infinite band that pauses on hover.
- **Scroll animations**: each section animates into view as you scroll, using [Motion](https://motion.dev/).
- **Project showcases**: each project appears inside a phone-frame mockup that links to the live site or repository.
- **Responsive layout**: designed for both mobile and desktop.

## Page sections

| Section | Contents |
| --- | --- |
| **Hero** | Name, title, profile photo and a short professional summary |
| **Tech marquee** | Django, Python, Flutter, ERPNext, React, Node.js, JavaScript, C++, PostgreSQL, HTML, MySQL, PHP, Git |
| **Expertise** | Web/Backend, Machine Learning and Mobile Core |
| **Projects** | Featured work (see below) |
| **Experience** | Work history |
| **Background** | Education, certifications and languages |

### Featured projects

| Project | Type | Year | Stack |
| --- | --- | --- | --- |
| [SaraBeauty](https://github.com/esmailga/beautySupplements) | Full-stack e-commerce site with an admin dashboard, order tracking and payment oversight | 2026 | React, Node.js, MySQL, PHP |
| [Samaform CMS](https://samaform.com) | Custom CMS and client portal for an architectural firm | 2025 | React, Node.js, PHP, PostgreSQL |
| [Flexibleea](https://github.com/esmailga/Flexibleea) | Cross-platform job recruitment app for freelancers | 2023 | Flutter, Dart, C++ |

## Tech stack

- [React 19](https://react.dev/) with [TypeScript](https://www.typescriptlang.org/)
- [Vite](https://vite.dev/) for development and builds
- [React Compiler](https://react.dev/learn/react-compiler) through `babel-plugin-react-compiler`
- [Tailwind CSS v4](https://tailwindcss.com/), set up with the `@tailwindcss/vite` plugin
- [Motion](https://motion.dev/) for animations
- [Lucide](https://lucide.dev/) for UI icons
- [vite-plugin-svgr](https://github.com/pd4d10/vite-plugin-svgr) to import SVG files as React components
- The Inter and JetBrains Mono fonts from Google Fonts

## Project structure

```
.
├── .github/workflows/deploy.yml   # Builds and deploys to GitHub Pages
├── index.html                     # HTML entry point
├── src/
│   ├── main.tsx                   # React entry point
│   ├── App.tsx                    # All page sections and content data
│   ├── index.css                  # Tailwind setup, theme colors, utilities
│   └── assets/                    # Profile photo, CV, project screenshots, icons
├── vite.config.ts                 # Vite plugins and the /site/ base path
├── tsconfig.json
└── package.json
```

## Getting started

### Prerequisites

- [Node.js](https://nodejs.org/) (LTS version)
- npm

### Install and run

```bash
git clone https://github.com/esmailga/site.git
cd site
npm install
npm run dev
```

The dev server runs at **http://localhost:5173/site/**. The `/site/` part is required because of the base path set in `vite.config.ts`.

### Available scripts

| Command | Description |
| --- | --- |
| `npm run dev` | Start the development server with hot reload |
| `npm run build` | Create a production build in `dist/` |
| `npm run preview` | Serve the production build locally |
| `npm run lint` | Type-check the project with `tsc --noEmit` |
| `npm run clean` | Remove the `dist/` folder |

## Customizing the content

All page content lives in [`src/App.tsx`](src/App.tsx) as plain arrays and objects, so most updates don't touch any layout code:

- **Projects**: edit the `projects` array (title, type, year, description, tech stack, screenshot and link). Put screenshots in `src/assets/`. WebP works well for them.
- **Tech marquee**: edit the `technologies` array. To add a logo, place its SVG in `src/assets/` and import it with the `?react` suffix, for example `import GoIcon from './assets/go.svg?react'`.
- **Social links**: edit the `socials` array inside `SocialsMenu`.
- **Expertise and experience**: edit the arrays inside the `#expertise` and `#experience` sections.
- **CV**: replace `src/assets/resume.pdf`.
- **Theme colors**: change the CSS variables in [`src/index.css`](src/index.css). `:root` holds the dark theme and `.light` holds the light theme.

## Deployment

Every push to `main` triggers the [deploy workflow](.github/workflows/deploy.yml). It installs dependencies with `npm ci`, runs `npm run build` and publishes the `dist/` folder to GitHub Pages. You can also start it by hand from the **Actions** tab.

If you fork this repository:

1. In **Settings → Pages**, set the source to **GitHub Actions**.
2. If your repository isn't named `site`, change `base` in `vite.config.ts` to `'/<your-repo-name>/'`.

## Contact

- **LinkedIn:** [esmail-alwahbani](https://www.linkedin.com/in/esmail-alwahbani)
- **GitHub:** [@esmailga](https://github.com/esmailga)
- **Email:** esmaeelf007@gmail.com
