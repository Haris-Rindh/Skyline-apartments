# Skyline | Luxury Real Estate & Premium Residences

[![Framework](https://img.shields.io/badge/React-18.2-blue?logo=react&logoColor=white)](https://react.dev/)
[![Build Tool](https://img.shields.io/badge/Vite-5.0-646CFF?logo=vite&logoColor=white)](https://vitejs.dev/)
[![Styling](https://img.shields.io/badge/TailwindCSS-3.4-38B2AC?logo=tailwindcss&logoColor=white)](https://tailwindcss.com/)
[![Deployment](https://img.shields.io/badge/Deploy-Vercel-black?logo=vercel&logoColor=white)](https://vercel.com/)
[![Serverless](https://img.shields.io/badge/API-Serverless-orange?logo=node.js&logoColor=white)](#serverless-api-routes)
[![Accessibility](https://img.shields.io/badge/a11y-Compliant-success?logo=accessibe&logoColor=white)](#accessibility-features)

Skyline is an ultra-luxury real estate single-page application (SPA) designed to showcase premium waterfront properties, penthouses, and architectural masterpieces. Built on a sophisticated **Dark Navy & Gold** theme, this platform features live maps, serverless backend integrations, interactive booking calendars, and cinematic walkthroughs.

---

## 📸 Core Upgrades

- **🗺️ Live Leaflet Map Integration:** Replaced static coordinates with a real Leaflet interactive map (CartoDB Dark Matter style). Markers are plotted dynamically based on property latitude and longitude. Includes smooth panning, zoom controls, and custom HTML markers with hover tooltips.
- **📅 Interactive Tour Booking Calendar:** Built a custom date and time-slot scheduling calendar modal (`BookingModal`). Clients can pick a private tour date from the next 14 days and choose time slots, which submits the appointment directly.
- **⚡ Serverless API Backend (Vercel Functions):** Deployed serverless API routing endpoints under `/api` (`properties.js`, `journal.js`, `inquire.js`, `subscribe.js`) handling JSON requests, CORS headers, validation, and network delay simulations.
- **✉️ Resend Email Integration:** Configured form inquiries to dispatch beautiful HTML email notifications via the **Resend API**. If the Resend API key is missing (e.g. local environment), the serverless route prints details in the terminal and returns a successful mockup fallback response to prevent local crashes.
- **🔌 CMS-Ready Fetching Layer:** Created a dynamic client service class (`src/services/api.js`). On page load, it attempts to fetch from the serverless endpoints; if the endpoints are unavailable (e.g. static local builds), it automatically switches to serving mock arrays from `mockData.js` transparently.
- **♿ WCAG Accessibility Compliance:** Complete keyboard routing (using an accessible "Skip to content" anchor), associated `htmlFor`/`id` contact forms, screen reader dynamic announcements (`aria-live="polite"` status toasts), and contrast-compliant typography (`text-gray-300`).

---

## 🛠️ Project Structure

```text
├── api/                     # Vercel Serverless Functions
│   ├── properties.js        # GET: Returns properties listings
│   ├── journal.js           # GET: Returns journal articles
│   ├── inquire.js           # POST: Client inquiry & Resend email trigger
│   └── subscribe.js         # POST: Newsletter registry endpoint
├── public/
│   ├── favicon.svg          # Custom brand gold-diamond icon
│   └── ...
├── src/
│   ├── components/
│   │   ├── BookingModal.jsx     # Interactive Tour Booking Calendar
│   │   ├── InteractiveMap.jsx   # Real Leaflet interactive map integration
│   │   ├── Navbar.jsx           # Header CTA & keyboard bypass link
│   │   ├── PropertyModal.jsx    # Photo galleries & focus trap details
│   │   ├── ContactForm.jsx      # Associated inquiry forms with API calls
│   │   ├── Newsletter.jsx       # Email registry subscription card with API calls
│   │   └── ...                  # Helper UI components (AboutUs, Counter, etc.)
│   ├── data/
│   │   └── mockData.js          # Unified local properties data (includes LatLngs)
│   ├── services/
│   │   └── api.js               # Client service client with local fallbacks
│   ├── App.jsx              # Coordinator for layout, states & fetching
│   ├── index.css            # Centralized stylesheet & animations
│   ├── main.jsx             # React framework bootstrap entry
├── tailwind.config.js       # Design tokens & color system variables
├── vercel.json              # Clean URLs & route overrides configuration
└── package.json             # Core dependency packages
```

---

## 🚀 Getting Started

### Prerequisites

Ensure you have [Node.js](https://nodejs.org/) installed (version 16.x or higher).

### Local Installation & Development

1. **Clone the Repository & Install Dependencies:**
   ```bash
   git clone https://github.com/your-username/skyline-apartments.git
   cd skyline-apartments
   npm install
   ```

2. **Run Standard Development Server (No Backend API):**
   ```bash
   npm run dev
   ```
   *Note: Under standard `npm run dev`, API requests to `/api` will fail (404), and the client service will automatically fall back to serving mock data from `mockData.js`. Form submissions will execute client-side simulations.*

3. **Run with Local Serverless Functions (Recommended):**
   To test serverless routes locally, install the [Vercel CLI](https://vercel.com/cli) and start the local dev server:
   ```bash
   npm install -g vercel
   vercel dev
   ```
   Vercel CLI will launch a proxy server (typically at `http://localhost:3000`) that serves both your Vite frontend and your Node.js `/api` serverless routes.

---

## ☁️ Deploying to Vercel

This project is optimized for zero-config deployments on **Vercel** with full serverless functionality.

### 1. Configure Environment Variables
To enable live email delivery when a tour is booked or an inquiry is sent:
1. Log into your [Vercel Dashboard](https://vercel.com/dashboard).
2. Navigate to your project settings -> **Environment Variables**.
3. Add the following key:
   - **Key:** `RESEND_API_KEY`
   - **Value:** *[Your API Key from Resend]*
4. Click **Save**.

### 2. Connect Repo & Deploy
1. Click **Add New** -> **Project** on Vercel.
2. Import your repository. Vercel automatically detects Vite:
   - **Framework Preset:** `Vite`
   - **Build Command:** `npm run build`
   - **Output Directory:** `dist`
3. Click **Deploy**.

Vercel will build the frontend, spin up serverless containers for `/api` scripts, and apply the route rewrites defined in `vercel.json`. If no `RESEND_API_KEY` environment variable is detected, inquiry form dispatches will safely log details and execute simulation success alerts without breaking.