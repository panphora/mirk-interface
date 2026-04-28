# UNDECIDED

Active brainstorming. Anything currently being weighed lives here so it doesn't pollute `DECISIONS.md` (current accepted choices) or `HISTORY.md` (the immutable log).

When an item is resolved:

- The current choice goes into (or replaces an entry in) `DECISIONS.md`.
- A one-liner is appended to `HISTORY.md` with the *why*. Nothing is ever removed from `HISTORY.md` — even if the decision is later reversed, the original entry stays and a new entry is added.
- If implementation work falls out of it, a task lands in `PLAN.md`.
- The item is removed from this file.

## Entry format

One `## <topic>` heading per item, with bullets for:

- **Options being weighed** — the alternatives we're comparing.
- **Constraints** — what the answer must satisfy (rules from `README.md`, prior decisions in `HISTORY.md`).
- **Open questions** — what we still need to figure out before we can decide.
- **Currently leaning** — best guess right now, or "no preference yet".

---

## Loader for Primer in `compare.html`

Carbon's side is solved (`@carbon/web-components` per-component CDN bundles + `themes.css` for theme zones — works buildless). Primer is the open problem.

### What was tried (2026-04-27)

- **`esm.sh` + import map** (entry: `https://esm.sh/@primer/react@38?deps=react@18.3.1,react-dom@18.3.1`). Fails with `TypeError: Failed to fetch dynamically imported module`. Confirmed via direct `fetch()` that the resource returns 200, so it's not a network issue. Chained the failure to **CSS modules**: Primer ships modules like `TextInput.module.css.mjs` that esm.sh serves as `301` redirects to `text/css` URLs, which Chrome's module loader rejects. The `?bundle` and `?bundle-deps` flags on esm.sh did not change this — Primer's transitive CSS imports still hit the `text/css` redirect path.
- **`@primer/react` UMD bundle** (`https://cdn.jsdelivr.net/npm/@primer/react@38.21.0/dist/browser.umd.js`). Loaded React 18, ReactDOM 18, react-is 18, and styled-components 5 first, but Primer's UMD throws `TypeError: Cannot use 'in' operator to search for 'default' in undefined` from inside styled-components — likely a peer-version mismatch (Primer 38 may have moved off styled-components in source while the UMD bundle still expects it).
- **Sanity check**: `https://esm.sh/lodash@4` and `https://cdn.jsdelivr.net/npm/lit@3/+esm` both import cleanly, so Chrome can load external ES modules in this environment. The failure is specific to Primer.

### Options still on the table

- **Use `@primer/css`** — Primer's classic CSS-only package (live at `https://cdn.jsdelivr.net/npm/@primer/css/dist/primer.css`). Works in plain HTML, no React. Trade-off: this is GitHub.com's *legacy* CSS, predating modern Primer React. Visually it's not the same as the React component output we'd be comparing against.
- **Use Primer's hosted Storybook** as the comparison surface (iframe individual stories from `https://primer.style/react/storybook`). Renders the real components, but the integration is per-story-iframe and the styling chrome leaks into the comparison.
- **Accept a tiny build step for `compare.html` only** — Vite + esbuild can bundle Primer's CSS imports correctly. Defeats the buildless ethos for the dev tool, but `compare.html` is a dev tool — it doesn't ship to users.
- **Try newer/older Primer versions** — maybe the CSS-module migration is incomplete in some versions and a UMD bundle from an earlier version actually works.
- **Custom esm.sh worker / pre-bundled mirror** — host a pre-bundled Primer at our own CDN. Highest effort.

### Constraints (carry-over from earlier ADR thinking)

- We're judging components against their *real* peers — fake/CSS-only renderings of Primer somewhat defeat the purpose, but they may still be better than nothing.
- mirk's own pages stay buildless. `compare.html` is internal tooling and could justify a build step *if necessary*, but we'd want to be honest about it.
- Primer has no web-components offering; that path doesn't exist.

### Currently leaning

**No clear leader yet.** The options trade real behavior for buildlessness in different directions. Probably need to spike each before committing — `@primer/css` is the lowest-effort and gets us *something* immediately; a tiny Vite build for `compare.html` is the highest-fidelity option if we're willing to bend the buildless rule for an internal dev tool. **Recommend deciding before building component #02** so we have a real Primer reference for that comparison and onward.
