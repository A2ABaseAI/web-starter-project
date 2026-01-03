#!/usr/bin/env bash
# add-pages-to-vite.sh
# Add Landing + multiple pages, routing, dark/light theme, and optional Tailwind
# to an existing Vite + React + TypeScript project.
#
# Run INSIDE your Vite project folder.
#
set -euo pipefail

echo "Bun: $(bun -v)"

# --- 1) Ensure React Router ---
if ! bun pm ls react-router-dom >/dev/null 2>&1; then
  echo "📦 Installing react-router-dom..."
  bun add react-router-dom
fi

# --- 2) Tailwind (install if missing) ---
NEED_TW=0
if ! bun pm ls tailwindcss >/dev/null 2>&1; then
  NEED_TW=1
fi

if [ $NEED_TW -eq 1 ]; then
  echo "🎨 Installing TailwindCSS (with postcss + autoprefixer)"
  bun add -d tailwindcss postcss autoprefixer
  bunx tailwindcss init -p
  # Tailwind config
  cat > tailwind.config.js <<'EOF'
/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html","./src/**/*.{ts,tsx,js,jsx}"],
  darkMode: "class",
  theme: {
    extend: {
      container: {
        center: true,
        padding: "1rem",
        screens: { sm: "640px", md: "768px", lg: "1024px", xl: "1280px" }
      }
    }
  },
  plugins: []
}
EOF
  # index.css
  mkdir -p src
  cat > src/index.css <<'EOF'
@tailwind base;
@tailwind components;
@tailwind utilities;

:root { color-scheme: light dark; }
html, body, #root { height: 100%; }
body { @apply bg-white text-gray-900 dark:bg-gray-950 dark:text-gray-100 antialiased; }

.btn { @apply inline-flex items-center justify-center rounded-xl px-4 py-2 text-sm font-medium
        bg-gray-900 text-white hover:bg-gray-800 active:bg-black
        dark:bg-white dark:text-gray-900 dark:hover:bg-gray-200 transition; }

.btn-ghost { @apply inline-flex items-center rounded-xl px-3 py-2 text-sm
             hover:bg-gray-100 dark:hover:bg-gray-900 transition; }

.card { @apply rounded-2xl border border-gray-200 dark:border-gray-800 p-4 bg-white dark:bg-gray-900 shadow-sm; }
.link { @apply text-sky-600 hover:underline dark:text-sky-400; }
EOF

  # Add no-flash theme script to index.html if not present
  if ! grep -q "prefers-color-scheme" index.html 2>/dev/null; then
    cat > index.html <<'EOF'
<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <link rel="icon" href="/favicon.svg" />
    <meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover" />
    <meta name="color-scheme" content="light dark" />
    <meta name="theme-color" content="#0ea5e9" />
    <title>Agent UI</title>
    <script>
      (function() {
        const ls = localStorage.getItem('theme');
        const systemDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
        const wantDark = ls ? (ls === 'dark') : systemDark;
        if (wantDark) document.documentElement.classList.add('dark');
      })();
    </script>
  </head>
  <body>
    <div id="root"></div>
    <script type="module" src="/src/main.tsx"></script>
  </body>
</html>
EOF
  fi
else
  # Ensure CSS has our utility classes if Tailwind exists but CSS missing
  if [ ! -f src/index.css ]; then
    cat > src/index.css <<'EOF'
@tailwind base;
@tailwind components;
@tailwind utilities;

:root { color-scheme: light dark; }
html, body, #root { height: 100%; }
body { @apply bg-white text-gray-900 dark:bg-gray-950 dark:text-gray-100 antialiased; }
.btn { @apply inline-flex items-center justify-center rounded-xl px-4 py-2 text-sm font-medium bg-gray-900 text-white hover:bg-gray-800 active:bg-black dark:bg-white dark:text-gray-900 dark:hover:bg-gray-200 transition; }
.btn-ghost { @apply inline-flex items-center rounded-xl px-3 py-2 text-sm hover:bg-gray-100 dark:hover:bg-gray-900 transition; }
.card { @apply rounded-2xl border border-gray-200 dark:border-gray-800 p-4 bg-white dark:bg-gray-900 shadow-sm; }
.link { @apply text-sky-600 hover:underline dark:text-sky-400; }
EOF
  fi
fi

# --- 3) Theme utilities (hooks + toggle) ---
mkdir -p src/hooks src/components src/pages src/layouts src/routes

cat > src/hooks/useTheme.ts <<'EOF'
import { useEffect, useState } from "react";
export type Theme = "light" | "dark";
export function useTheme(): [Theme, (t: Theme) => void, () => void] {
  const getInitial = (): Theme => {
    const ls = localStorage.getItem("theme");
    if (ls === "light" || ls === "dark") return ls;
    return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
  };
  const [theme, setTheme] = useState<Theme>(getInitial);
  useEffect(() => {
    const root = document.documentElement;
    if (theme === "dark") root.classList.add("dark"); else root.classList.remove("dark");
    localStorage.setItem("theme", theme);
  }, [theme]);
  useEffect(() => {
    const media = window.matchMedia("(prefers-color-scheme: dark)");
    const handler = () => {
      const ls = localStorage.getItem("theme");
      if (!ls) setTheme(media.matches ? "dark" : "light");
    };
    media.addEventListener?.("change", handler);
    return () => media.removeEventListener?.("change", handler);
  }, []);
  const toggle = () => setTheme(theme === "dark" ? "light" : "dark");
  return [theme, setTheme, toggle];
}
EOF

cat > src/components/ThemeToggle.tsx <<'EOF'
import { useTheme } from "../hooks/useTheme";
export default function ThemeToggle() {
  const [theme, , toggle] = useTheme();
  const isDark = theme === "dark";
  return (
    <button className="btn-ghost" aria-label={`Activate ${isDark ? "light" : "dark"} mode`} onClick={toggle}>
      <span className="sr-only">Toggle theme</span>{isDark ? "🌙" : "☀️"}
    </button>
  );
}
EOF

# --- 4) Layout with navbar + footer ---
cat > src/layouts/SiteLayout.tsx <<'EOF'
import { Link, NavLink, Outlet } from "react-router-dom";
import ThemeToggle from "../components/ThemeToggle";
import { useState } from "react";

export default function SiteLayout() {
  const [open, setOpen] = useState(false);
  const navItem = "px-3 py-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-900";
  return (
    <div className="min-h-dvh flex flex-col">
      <header className="sticky top-0 z-10 border-b border-gray-200 dark:border-gray-800 bg-white/70 dark:bg-gray-950/70 backdrop-blur">
        <nav className="container h-14 flex items-center gap-3">
          <Link to="/" className="font-semibold tracking-tight">Agent UI</Link>
          <button className="md:hidden ml-auto btn-ghost" onClick={() => setOpen(o => !o)} aria-label="Toggle menu">☰</button>
          <div className="hidden md:flex items-center gap-1 ml-auto">
            <NavLink className={navItem} to="/features">Features</NavLink>
            <NavLink className={navItem} to="/pricing">Pricing</NavLink>
            <NavLink className={navItem} to="/docs">Docs</NavLink>
            <NavLink className={navItem} to="/about">About</NavLink>
            <NavLink className={navItem} to="/contact">Contact</NavLink>
            <ThemeToggle />
          </div>
        </nav>
        {open && (
          <div className="md:hidden container pb-2 flex flex-col gap-1">
            <NavLink className={navItem} to="/features" onClick={() => setOpen(false)}>Features</NavLink>
            <NavLink className={navItem} to="/pricing" onClick={() => setOpen(false)}>Pricing</NavLink>
            <NavLink className={navItem} to="/docs" onClick={() => setOpen(false)}>Docs</NavLink>
            <NavLink className={navItem} to="/about" onClick={() => setOpen(false)}>About</NavLink>
            <NavLink className={navItem} to="/contact" onClick={() => setOpen(false)}>Contact</NavLink>
            <ThemeToggle />
          </div>
        )}
      </header>

      <main className="flex-1">
        <Outlet />
      </main>

      <footer className="border-t border-gray-200 dark:border-gray-800 py-6">
        <div className="container text-xs text-gray-500 dark:text-gray-400">
          © <span>{new Date().getFullYear()}</span> Agent UI — Mobile-first, Light/Dark
        </div>
      </footer>
    </div>
  );
}
EOF

# --- 5) Pages ---
cat > src/pages/Home.tsx <<'EOF'
import { Link } from "react-router-dom";

export default function Home() {
  return (
    <div className="container py-10">
      <section className="text-center sm:text-left space-y-4">
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight">
          Build modern, mobile-first agent frontends
        </h1>
        <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto sm:mx-0">
          Vite + React + TypeScript + Tailwind. System-aware dark mode with a toggle.
          Ready-to-extend pages, routing, and components for your agent UI.
        </p>
        <div className="flex flex-col sm:flex-row gap-2 justify-center sm:justify-start">
          <Link to="/docs" className="btn">Get Started</Link>
          <Link to="/features" className="btn-ghost">See Features</Link>
        </div>
      </section>

      <section className="mt-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {[
          { t: "Blazing Dev", d: "Vite + HMR for instant feedback."},
          { t: "Accessible UI", d: "Semantic HTML, keyboard-friendly patterns."},
          { t: "Dark/Light", d: "System-aware theme with persistent toggle."},
          { t: "Routing", d: "React Router v6 with lazy-loaded pages."},
          { t: "State & Data", d: "Zustand + React Query for client state + data fetching."},
          { t: "Animations", d: "Framer Motion hooks for tasteful movement."},
        ].map((f) => (
          <article key={f.t} className="card">
            <h3 className="font-semibold mb-1">{f.t}</h3>
            <p className="text-sm text-gray-600 dark:text-gray-400">{f.d}</p>
          </article>
        ))}
      </section>
    </div>
  );
}
EOF

cat > src/pages/Features.tsx <<'EOF'
export default function Features() {
  return (
    <div className="container py-10 space-y-6">
      <h1 className="text-2xl md:text-3xl font-bold">Features</h1>
      <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {[
          "Mobile-first components",
          "Dark/Light theming",
          "React Router w/ lazy routes",
          "Tailwind utility-first styling",
          "Zustand state mgmt",
          "React Query data layer",
          "Framer Motion animations",
          "Accessible navbar + footer",
          "SEO-ready document titles"
        ].map((x) => <li key={x} className="card">{x}</li>)}
      </ul>
    </div>
  );
}
EOF

cat > src/pages/Pricing.tsx <<'EOF'
export default function Pricing() {
  return (
    <div className="container py-10 space-y-6">
      <h1 className="text-2xl md:text-3xl font-bold">Pricing</h1>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {[
          { name: "Hobby", price: "$0", features: ["Community", "Basic usage"] },
          { name: "Pro", price: "$19", features: ["Priority", "Unlimited projects"] },
          { name: "Enterprise", price: "Contact us", features: ["SLA", "SAML SSO"] }
        ].map((p) => (
          <div key={p.name} className="card">
            <div className="text-lg font-semibold">{p.name}</div>
            <div className="text-3xl font-bold my-2">{p.price}</div>
            <ul className="list-disc pl-5 text-sm text-gray-600 dark:text-gray-400">
              {p.features.map(f => <li key={f}>{f}</li>)}
            </ul>
            <button className="btn mt-4">Choose {p.name}</button>
          </div>
        ))}
      </div>
    </div>
  );
}
EOF

cat > src/pages/Docs.tsx <<'EOF'
export default function Docs() {
  return (
    <div className="container py-10 space-y-4">
      <h1 className="text-2xl md:text-3xl font-bold">Docs</h1>
      <p className="text-gray-600 dark:text-gray-400">
        This is a placeholder. Link your agent's README, MDX docs, or external docs here.
      </p>
      <div className="card">
        <h2 className="font-semibold mb-2">Quick Start</h2>
        <ol className="list-decimal pl-5 text-sm text-gray-600 dark:text-gray-400 space-y-1">
          <li>Install dependencies.</li>
          <li>Set environment variables.</li>
          <li>Run the dev server and connect your agent.</li>
        </ol>
      </div>
    </div>
  );
}
EOF

cat > src/pages/About.tsx <<'EOF'
export default function About() {
  return (
    <div className="container py-10 space-y-4">
      <h1 className="text-2xl md:text-3xl font-bold">About</h1>
      <p className="text-gray-600 dark:text-gray-400">
        A lightweight, modern scaffold for agent-driven web apps. Built with developer experience in mind.
      </p>
    </div>
  );
}
EOF

cat > src/pages/Contact.tsx <<'EOF'
export default function Contact() {
  return (
    <div className="container py-10 space-y-4">
      <h1 className="text-2xl md:text-3xl font-bold">Contact</h1>
      <form className="card space-y-3 max-w-xl">
        <label className="block">
          <span className="text-sm">Email</span>
          <input className="mt-1 w-full rounded-xl border border-gray-300 dark:border-gray-700 bg-transparent px-3 py-2 outline-none" placeholder="you@example.com" />
        </label>
        <label className="block">
          <span className="text-sm">Message</span>
          <textarea className="mt-1 w-full rounded-xl border border-gray-300 dark:border-gray-700 bg-transparent px-3 py-2 outline-none" rows={4} />
        </label>
        <button type="button" className="btn">Send</button>
      </form>
    </div>
  );
}
EOF

cat > src/pages/NotFound.tsx <<'EOF'
import { Link } from "react-router-dom";
export default function NotFound() {
  return (
    <div className="container py-24 text-center space-y-3">
      <h1 className="text-5xl font-bold">404</h1>
      <p className="text-gray-600 dark:text-gray-400">The page you're looking for doesn't exist.</p>
      <Link to="/" className="btn">Go home</Link>
    </div>
  );
}
EOF

# --- 6) SEO helper ---
cat > src/components/Seo.tsx <<'EOF'
import { useEffect } from "react";
type Props = { title?: string; description?: string };
export default function Seo({ title, description }: Props) {
  useEffect(() => {
    if (title) document.title = title;
    if (description) {
      let meta = document.querySelector('meta[name="description"]');
      if (!meta) {
        meta = document.createElement("meta");
        meta.setAttribute("name", "description");
        document.head.appendChild(meta);
      }
      meta.setAttribute("content", description);
    }
  }, [title, description]);
  return null;
}
EOF

# --- 7) Routes (lazy) ---
cat > src/routes/AppRoutes.tsx <<'EOF'
import { lazy, Suspense } from "react";
import { Route, Routes } from "react-router-dom";
import SiteLayout from "../layouts/SiteLayout";

const Home = lazy(() => import("../pages/Home"));
const Features = lazy(() => import("../pages/Features"));
const Pricing = lazy(() => import("../pages/Pricing"));
const Docs = lazy(() => import("../pages/Docs"));
const About = lazy(() => import("../pages/About"));
const Contact = lazy(() => import("../pages/Contact"));
const NotFound = lazy(() => import("../pages/NotFound"));

export default function AppRoutes() {
  return (
    <Suspense fallback={<div className="container py-10">Loading…</div>}>
      <Routes>
        <Route element={<SiteLayout />}>
          <Route index element={<Home />} />
          <Route path="features" element={<Features />} />
          <Route path="pricing" element={<Pricing />} />
          <Route path="docs" element={<Docs />} />
          <Route path="about" element={<About />} />
          <Route path="contact" element={<Contact />} />
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </Suspense>
  );
}
EOF

# --- 8) App + Main wiring ---
cat > src/App.tsx <<'EOF'
import AppRoutes from "./routes/AppRoutes";
import Seo from "./components/Seo";
export default function App() {
  return (
    <>
      <Seo title="Agent UI" description="Modern, mobile-first multi-page scaffold for agent apps." />
      <AppRoutes />
    </>
  );
}
EOF

# Ensure main.tsx imports BrowserRouter & index.css
cat > src/main.tsx <<'EOF'
import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App";
import "./index.css";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>
);
EOF

echo "✅ Pages and routing added."
echo "👉 Restart your dev server: bun run dev"

