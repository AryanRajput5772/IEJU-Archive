# IEJU Archive — Academic Repository & Student Resources

> **Institute of Engineering · Jiwaji University**  
> Centralized digital academic archive engineered for Bachelor of Engineering (BE) students.

![IEJU Archive Preview](src/assets/images/hero_ieju_archive_1793718672897.jpg)

## 🌟 Overview

**IEJU Archive** is a modern, lightweight, glassmorphic academic repository built specifically for students at the Institute of Engineering, Jiwaji University. It provides frictionless, democratized access to past semester examination papers, unit-wise reference notes, prescribed textbooks, and official syllabi across all eight semesters.

The application is built using **pure Vanilla HTML, CSS (Tailwind CSS), and JavaScript (ES Modules)** without any heavy frameworks or bundler build steps, making it lightning-fast and instantly runnable using VS Code's **Live Server** (`Go Live` button).

---

## ✨ Key Features

- 📚 **Comprehensive Course Repositories**: Access 40 engineering subjects spanning all 8 semesters for **Computer Science Engineering (CSE)**, **Electronics / Electrical (EE)**, and **Chemical Engineering (CE)**.
- 📄 **Unit-Wise Notes & Question Papers**: Direct access to past semester question papers (PYQs), unit notes (Units 1–5), textbooks, and lecture playlists hosted on Google Drive.
- 👁️ **Instant Quick Preview Modal**: Preview PDFs, textbooks, and past papers inside an embedded Google Drive viewer without leaving the site.
- 🎨 **6 Glassmorphism Themes**: Switch dynamically between six curated visual atmospheres with persistent local storage:
  - 🌌 **Nebula Noir** _(Pitch Black Minimalist)_
  - 🧊 **Arctic Obsidian** _(Electric Cyan Refractions)_
  - 💎 **Midnight Sapphire** _(Deep Ocean Sapphire)_
  - 🌲 **Emerald Matrix** _(Cyber Obsidian Forest)_
  - 🔮 **Cosmic Amethyst** _(Deep Space Purple)_
  - ❄️ **Crystal Frost** _(Luxury Frosted Light Studio)_
- 🔍 **Quick Search Modal (`Cmd + K` / `Ctrl + K`)**: Instant search by subject code (e.g., `101`, `BEEE`), subject name, branch, or topic.
- 🔖 **Bookmarks Drawer**: Save frequently accessed subjects or syllabi locally in your browser for one-click access.
- 📊 **Official Syllabus Matrix**: Interactive grid table displaying official course structures for all 8 semesters.
- 💬 **Student Wall & Review Form**: Read testimonials from Jiwaji University engineering students and submit your own reviews.
- 📬 **Material Contribution Form**: Submit missing unit notes or past exam papers directly to the archive maintainers.

---

## 🛠️ Technology Stack

- **HTML5**: Semantic markup structured for accessibility and speed.
- **CSS3 / Tailwind CSS**: Glassmorphism primitives, custom CSS variables for theme switching, and responsive layouts.
- **JavaScript (ES Modules)**: Native browser ES module architecture (`src/main.js`, modular components in `src/components/`).
- **Icons**: Custom lightweight SVG icon utility renderer (`src/utils/icons.js`).
- **Zero Bundler Requirement**: Runs natively in any modern browser without Vite, Webpack, or Node server build steps.

---

## 🚀 How to Run the Project in VS Code

1. Download or clone this repository to your computer.
2. Open the project folder in **VS Code**.
3. Install the **Live Server** extension in VS Code if you haven't already.
4. Open `index.html`.
5. Click **Go Live** in the bottom-right status bar of VS Code (or right-click `index.html` -> **Open with Live Server**).
6. The website will automatically launch in your default web browser at `http://127.0.0.1:5500`!

---

## 📂 Project Directory Structure

```text
├── index.html                # Entry point (Tailwind CDN, fonts, main script)
├── README.md                 # Project documentation
├── package.json              # Project scripts & details
└── src/
    ├── main.js               # Central DOM state manager & app boot engine
    ├── index.css             # Base CSS variables, themes & glassmorphism classes
    ├── assets/               # Images and visual showcase media
    ├── components/           # Vanilla JS ES Module components
    │   ├── Navbar.js
    │   ├── Hero.js
    │   ├── BranchExplorer.js
    │   ├── SyllabusMatrix.js
    │   ├── TestimonialsSection.js
    │   ├── AboutSection.js
    │   ├── FAQSection.js
    │   ├── ContactSection.js
    │   ├── Footer.js
    │   ├── ArchivePreviewModal.js
    │   ├── SearchModal.js
    │   ├── BookmarksDrawer.js
    │   └── ThemeSwitcher.js
    ├── data/
    │   ├── archiveData.js    # Subject resources, syllabus, FAQs & testimonials data
    │   └── themes.js         # Color theme configurations & swatches
    └── utils/
        └── icons.js          # SVG icon utility functions
```

---

## 👤 Creator & Vision

Created with dedication by **Aryan Rajput** (2025) for students of the Institute of Engineering, Jiwaji University.

- 💼 **LinkedIn**: [https://www.linkedin.com/in/-aryan-rajput](https://www.linkedin.com/in/-aryan-rajput)
- 🐙 **GitHub**: [https://github.com/AryanRajput5772](https://github.com/AryanRajput5772)

---

_IEJU Archive is an open academic repository dedicated to fostering student success._
