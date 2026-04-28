import { defineConfig } from 'vite';

// Minimal config. Vite dev serves the repo root as static files; navigate to
// /compare.html for the side-by-side view. index.html stays buildless and can
// be opened from file:// or any static server — Vite is only here to resolve
// Primer's React + CSS-module imports for compare.html.
export default defineConfig({
  server: {
    open: '/compare.html',
  },
});
