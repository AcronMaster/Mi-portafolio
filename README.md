# 🎮 My 3D Portfolio

[![Vite](https://img.shields.io/badge/Vite-%E2%89%A45.1.0-14b8a6?logo=vite&logoColor=white)](https://vitejs.dev/)
[![Three.js](https://img.shields.io/badge/Three.js-%E2%89%A40.154.0-222222?logo=three.js&logoColor=white)](https://threejs.org/)
[![License](https://img.shields.io/badge/License-Personal-blue)](#license)

A small personal portfolio website showcasing an **interactive 3D setup** built with **Three.js** and **Vite**.

---

## 🌟 Features

- **Interactive 3D Viewer**: Rotate, recolor, and reset the model.  
- **Responsive Design**: Modern UI with hero section, skills, and contact cards.  
- **Dark Mode Toggle**: Switch between light and dark themes.  
- **Clipboard Action**: Copy email to clipboard with one click.  

---

## 🎬 Blender Workflow Demo

Check out this GIF showing how the 3D model was created in Blender:

![Blender Demo](assets/blender-demo.gif)

---

## 📂 Project Structure

- `index.html` — main page.
- `styles.css` — project styles and layout.
- `script.js` — Three.js scene setup, GLTF loader and UI handlers.
- `models/Setup_Gamer_Project9.glb` — 3D model placeholder (binary GLB). Replace with the real model file.
- `assets/Untitled-removebg-preview.png` — image placeholder (replace with your avatar or logo).
 - `assets/Untitled-removebg-preview.png` — image placeholder (replace with your avatar or logo).
- `package.json` — scripts and dependencies (Vite, Three.js).
- `vite.config.js` — Vite configuration.


> ⚠️ Replace the placeholders with your real `.glb` model and avatar.

---

## ⚡ Prerequisites

- **Node.js** (v18+ recommended)  
- **npm** (comes with Node.js)

---

## 🚀 Run Locally

```bash
cd "c:\Users\cauic\OneDrive\Desktop\Mi portafolio\mi-portafolio"
npm install
npm run dev


Vite will start a dev server. Open the local URL shown in the terminal (or use `--host` to share on your LAN).

## Build for production

```powershell
npm run build
```

The static output will be generated in `dist/`, ready to be deployed to any static hosting provider.

 🌐 ## Deployment suggestions
- Netlify or Vercel: connect your Git repository and configure the build command `npm run build` with publish directory `dist`.
- GitHub Pages: build locally and publish contents of `dist/` to `gh-pages` branch, or use GitHub Actions / a deploy tool.
- Surge: `npm install -g surge` and run `surge dist/` to publish.

🔧 ## Notes about the 3D model and assets
- `models/Setup_Gamer_Project9.glb` and `assets/Untitled-removebg-preview.png` are placeholders. Replace them with the actual `.glb` and `.png` binary files to see the real model and avatar.
- `script.js` expects the model to be at `models/Setup_Gamer_Project9.glb`. If you rename the file, update the path in `script.js`.
- The project uses module imports (`import * as THREE from 'three'`) so running a dev server (Vite) or a production build is required — opening `index.html` via `file://` may not work.

## 🌐 Website Preview

Here’s how the portfolio page looks:

![Page Preview](assets/Captura de pantalla 2025-12-03 220306.png)

## Troubleshooting
- If the model doesn't load, check the browser console for network errors. Ensure the `.glb` file is present in `models/` and accessible.
- If clipboard copy fails, try running the site over `http://` (dev server) instead of `file://` as some browsers restrict the Clipboard API for local files.

📜## License & Credits
- This project is personal. Add a license file if you plan to publish under a specific license.
- Built with [Three.js](https://threejs.org/) and [Vite](https://vitejs.dev/).

---

## Quick Overview

- 🧭 Features: interactive 3D viewer, rotate/recolor/reset controls, responsive layout, dark mode.
- 🗂️ Files: `index.html`, `styles.css`, `script.js`, `models/Setup_Gamer_Project9.glb` (placeholder), `assets/Untitled-removebg-preview.png` (placeholder).
- ⚙️ Run: `npm install` then `npm run dev` (Vite dev server). Build with `npm run build` to produce `dist/` for deployment.
## Blender Workflow Demo

Here’s a small GIF showing how the 3D model was created in Blender:

![Blender Demo](assets/blender-demo.gif)
