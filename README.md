# Mi Portafolio — 3D Portfolio

[![Vite](https://img.shields.io/badge/Vite-%E2%89%A45.1.0-14b8a6?logo=vite&logoColor=white)](https://vitejs.dev/)
[![Three.js](https://img.shields.io/badge/Three.js-%E2%89%A40.154.0-222222?logo=three.js&logoColor=white)](https://threejs.org/)
[![License](https://img.shields.io/badge/License-Personal-blue)](#license)

This repository contains a small personal portfolio website showcasing a 3D model and interactive controls built with Three.js and Vite.

## Features
- Interactive 3D viewer using Three.js and GLTF/GLB model format.
- Rotate, recolor and reset controls for the model.
- Responsive, modern UI with a hero section, skills and contact cards.
- Dark mode toggle and copy-to-clipboard email action.

## Files and structure
- `index.html` — main page.
- `styles.css` — project styles and layout.
- `script.js` — Three.js scene setup, GLTF loader and UI handlers.
- `models/Setup_Gamer_Project9.glb` — 3D model placeholder (binary GLB). Replace with the real model file.
- `assets/Untitled-removebg-preview.png` — image placeholder (replace with your avatar or logo).
 - `assets/Untitled-removebg-preview.png` — image placeholder (replace with your avatar or logo).
- `package.json` — scripts and dependencies (Vite, Three.js).
- `vite.config.js` — Vite configuration.

## Prerequisites
- Node.js (recommended v18+)
- npm (comes with Node.js)

## Install and run (development)
Open a terminal in the project root and run:

```powershell
cd 'c:\Users\cauic\OneDrive\Desktop\Mi portafolio\mi-portafolio'
npm install
npm run dev
```

Vite will start a dev server. Open the local URL shown in the terminal (or use `--host` to share on your LAN).

## Build for production

```powershell
npm run build
```

The static output will be generated in `dist/`, ready to be deployed to any static hosting provider.

## Deployment suggestions
- Netlify or Vercel: connect your Git repository and configure the build command `npm run build` with publish directory `dist`.
- GitHub Pages: build locally and publish contents of `dist/` to `gh-pages` branch, or use GitHub Actions / a deploy tool.
- Surge: `npm install -g surge` and run `surge dist/` to publish.

## Notes about the 3D model and assets
- `models/Setup_Gamer_Project9.glb` and `assets/Untitled-removebg-preview.png` are placeholders. Replace them with the actual `.glb` and `.png` binary files to see the real model and avatar.
- `script.js` expects the model to be at `models/Setup_Gamer_Project9.glb`. If you rename the file, update the path in `script.js`.
- The project uses module imports (`import * as THREE from 'three'`) so running a dev server (Vite) or a production build is required — opening `index.html` via `file://` may not work.

## Troubleshooting
- If the model doesn't load, check the browser console for network errors. Ensure the `.glb` file is present in `models/` and accessible.
- If clipboard copy fails, try running the site over `http://` (dev server) instead of `file://` as some browsers restrict the Clipboard API for local files.

## License & Credits
- This project is personal. Add a license file if you plan to publish under a specific license.
- Built with [Three.js](https://threejs.org/) and [Vite](https://vitejs.dev/).

---

## Quick Overview

- 🧭 Features: interactive 3D viewer, rotate/recolor/reset controls, responsive layout, dark mode.
- 🗂️ Files: `index.html`, `styles.css`, `script.js`, `models/Setup_Gamer_Project9.glb` (placeholder), `assets/Untitled-removebg-preview.png` (placeholder).
- ⚙️ Run: `npm install` then `npm run dev` (Vite dev server). Build with `npm run build` to produce `dist/` for deployment.

If you want, I can add a demo GIF or set up a GitHub Actions workflow to auto-deploy to GitHub Pages or Netlify. Which would you prefer?