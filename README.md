# Skyline | Luxury Real Estate & Premium Residences

[![Framework](https://img.shields.io/badge/React-18.2-blue?logo=react&logoColor=white)](https://react.dev/)
[![Build Tool](https://img.shields.io/badge/Vite-5.0-646CFF?logo=vite&logoColor=white)](https://vitejs.dev/)
[![Styling](https://img.shields.io/badge/TailwindCSS-3.4-38B2AC?logo=tailwindcss&logoColor=white)](https://tailwindcss.com/)
[![Deployment](https://img.shields.io/badge/Deploy-Vercel-black?logo=vercel&logoColor=white)](https://vercel.com/)
[![Accessibility](https://img.shields.io/badge/a11y-Compliant-success?logo=accessibe&logoColor=white)](#accessibility-features)

Skyline is an ultra-luxury real estate single-page application (SPA) designed to showcase premium waterfront properties, penthouses, and architectural masterpieces. Built on a sophisticated **Dark Navy & Gold** theme, this platform features interactive maps, smart search filters, high-fidelity gallery overlays, and cinematic walkthroughs.

---

## 📸 Core Features

- **🏠 Interactive Map & Collections:** View property coordinates on a dark-themed interactive map with visual marker pulses, property tooltips, and click-to-preview drawers.
- **🔍 Advanced Search Filtering:** Real-time search query matching (against addresses, descriptions, and type) and select filters for property types (Condos, Penthouses, Villas, Lofts) and bedroom minimums.
- **✨ Luxury Shimmer Skeletons:** Premium gold-navy loading skeleton animations (`LuxuryImage`) to optimize visual loading state transitions on CDN assets.
- **🎥 Walkthrough Video Modal:** Fully interactive Cinematic Walkthrough player modal equipped with keyboard focus trap locks, Escape key dismissal listeners, and background scroll locking.
- **♿ WCAG Accessibility Compliance:** Complete keyboard routing (using an accessible "Skip to content" anchor), associated `htmlFor`/`id` contact forms, screen reader dynamic announcements (`aria-live="polite"` status toasts), and contrast-compliant typography (`text-gray-300`).
- **📱 Responsive Luxury Layout:** Fluid layout transitions (optimized for Mobile, Tablet, and Desktop screens) separated by elegant gold rotated-diamond borders.
- **⚡ SEO & Preconnect Speed:** Structured description headers, Open Graph previews, Twitter Cards, and preconnected domain links for high-speed image delivery.

---

## 🛠️ Project Architecture

The codebase has been refactored into a highly modular, maintainable, and clean folder structure:

```text
├── public/
│   ├── favicon.svg          # Custom brand gold-diamond icon
│   └── ...                  # Static assets
├── src/
│   ├── components/
│   │   ├── AboutUs.jsx          # Brand introduction & statistics
│   │   ├── AgentProfile.jsx     # Broker contact & bio profile
│   │   ├── CinematicTours.jsx   # Walkthrough trigger panel
│   │   ├── ContactForm.jsx      # Accessible inquiry forms
│   │   ├── Counter.jsx          # Quadratic metric counters
│   │   ├── Features.jsx         # Amenities icon grid
│   │   ├── FeaturedListings.jsx # Property gallery sliders
│   │   ├── Footer.jsx           # Clean sub-menu and social links
│   │   ├── GoldDivider.jsx      # Elegant luxury dividers
│   │   ├── Hero.jsx             # Splash backdrop & filters
│   │   ├── InteractiveMap.jsx   # Interactive map coordinates
│   │   ├── Locations.jsx        # Slide-hover neighborhood cards
│   │   ├── LuxuryImage.jsx      # Image lazy-loading with skeletons
│   │   ├── Navbar.jsx           # Header CTA & keyboard bypass link
│   │   ├── Newsletter.jsx       # Email registry subscription card
│   │   ├── PropertyModal.jsx    # Photo galleries & focus trap details
│   │   └── VideoModal.jsx       # Full-screen drone video tour
│   ├── data/
│   │   └── mockData.js          # Unified local properties data
│   ├── App.jsx              # Coordinator for global layout & filtering
│   ├── index.css            # Centralized stylesheet & animations
│   ├── main.jsx             # React framework bootstrap entry
│   └── ...
├── tailwind.config.js       # Design tokens & color system variables
├── vercel.json              # Clean URLs & route overrides configuration
└── package.json             # Core dependency packages
```

---

## 🚀 Getting Started

### Prerequisites

Ensure you have [Node.js](https://nodejs.org/) installed (version 16.x or higher is recommended).

### Local Installation

1. **Clone the Repository:**
   ```bash
   git clone https://github.com/your-username/skyline-apartments.git
   cd skyline-apartments
   ```

2. **Install Dependencies:**
   ```bash
   npm install
   ```

3. **Run Development Server:**
   ```bash
   npm run dev
   ```
   Open your browser and navigate to `http://localhost:5173` to view the platform locally.

4. **Verify Production Build:**
   ```bash
   npm run build
   ```
   Compiles assets into the `dist/` directory, optimized and ready for deployment.

---

## 🎨 Color Palette & Typography

* **Backgrounds:** Navy Blue (`#0F172A`), Deep Navy (`#0B1120`), Darkest Navy (`#050914`)
* **Accents:** Gold (`#D4AF37`)
* **Body Typography:** Inter (Clean, accessible Sans-serif)
* **Heading Typography:** Cormorant Garamond (Elegant Serif)

---

## ☁️ Deploying to Vercel

This project is fully configured for zero-config deployments on **Vercel**.

### Option 1: Deploy with Vercel CLI

1. Install Vercel CLI globally:
   ```bash
   npm install -g vercel
   ```
2. Log in and deploy from the root project directory:
   ```bash
   vercel
   ```
3. Follow the interactive prompts. Vercel automatically detects the Vite configuration and builds the project out of the `/dist` output directory.

### Option 2: Deploy via GitHub / GitLab

1. Push your code repository to GitHub.
2. Log into the [Vercel Dashboard](https://vercel.com/dashboard) and click **Add New** -> **Project**.
3. Import your repository.
4. Vercel will automatically apply the default settings for Vite:
   - **Framework Preset:** `Vite`
   - **Build Command:** `npm run build`
   - **Output Directory:** `dist`
5. Click **Deploy**.

The custom `vercel.json` file handles routing rewrites, ensuring subpaths and browser refreshes operate seamlessly on Vercel's Edge network.