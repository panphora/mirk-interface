# DECISIONS

Current accepted choices for mirk components and project infrastructure. This file reflects *what is true now* — entries are edited freely as decisions evolve. The full audit trail (every decision and *why*, never overwritten) lives in `HISTORY.md`. Items still being brainstormed live in `UNDECIDED.md`.

## Rules

1. **One section per decision.** Heading: `## NNNN — <component or topic>: <short title>`. If a topic has multiple distinct decisions (API shape, a11y, styling), give each its own section.
2. **Numbering is for reference, not permanence.** Sections are numbered in the order they were first added so they're easy to cite, but entries can be edited or rewritten when a decision changes. `HISTORY.md` preserves what changed and why.
3. **Cite sources.** When referencing Primer or Carbon, include the path within `refs/` and the commit SHA.
4. **Write the decision before you build it.** The decision is the contract; the code follows it.
5. **Keep entries short but complete.** One screen if possible. Signal, not ceremony.

## Index

| #    | Title |
| ---- | ----- |
| 0001 | [Theming foundations: Tailwind v4 CDN, class-based dark mode, both themes shown side-by-side](#0001--theming-foundations-tailwind-v4-cdn-class-based-dark-mode-both-themes-shown-side-by-side) |
| 0002 | [Focus ring: 1px outline, 2px offset, `:focus-visible` only](#0002--focus-ring-1px-outline-2px-offset-focus-visible-only) |
| 0003 | [`compare.html` loader: Vite dev server for Primer; Carbon stays on its CDN](#0003--comparehtml-loader-vite-dev-server-for-primer-carbon-stays-on-its-cdn) |

## Template

Copy this block to start a new decision section. Drop fields that aren't relevant.

````
## NNNN — <Component or topic>: <short decision title>

- **Date:** YYYY-MM-DD

### Context
What we're deciding on, and why it needs a decision. Link to the relevant `PLAN.md` task.

### Primer's approach
- **Source:** `refs/primer/react/packages/react/src/...` @ `<commit-sha>`
- **API shape:**
- **A11y model:**
- **Composition pattern:** (controlled / uncontrolled / compound / slots)
- **Notable choices:**
- **What we like:**
- **What we'd change:**

### Carbon's approach
- **Source:** `refs/carbon/packages/react/src/components/...` @ `<commit-sha>`
- **API shape:**
- **A11y model:**
- **Composition pattern:**
- **Notable choices:**
- **What we like:**
- **What we'd change:**

### Decision (mirk)
State the decision in one or two sentences, then expand:
- **API:**
- **A11y:**
- **Composition:**
- **Theming:** how it works in light + dark mode
- **Dependencies:** any 3rd-party libs and why

### Why this over the alternatives
Concrete reasoning — what's better about this for our use case?

### Tradeoffs / what we're giving up
What does this approach cost us? What use cases does it make harder?

### Alternatives considered
- **A:** <description> — rejected because …
- **B:** <description> — rejected because …

### Open questions
Things to revisit. Link to a follow-up `PLAN.md` item if appropriate.
````

---

## Decisions

## 0001 — Theming foundations: Tailwind v4 CDN, class-based dark mode, both themes shown side-by-side

- **Date:** 2026-04-27

### Context
Every mirk component must work in light and dark from day one. mirk is buildless, and the dev pages (`index.html`, `compare.html`) need to make parity issues impossible to miss while we're working on a component.

### Decision (mirk)
- **Tailwind:** v4 via the `@tailwindcss/browser` ESM build at `https://cdn.jsdelivr.net/npm/@tailwindcss/browser@4`. No build step.
- **Dark mode:** class-based, configured with `@custom-variant dark (&:where(.dark, .dark *))` inside a `<style type="text/tailwindcss">` block. Adding `class="dark"` to any wrapper switches everything inside it to dark.
- **Theme display in `index.html` and `compare.html`:** every component is rendered **twice, side-by-side** — once in a light wrapper, once in a wrapper with `class="dark"`. There is no toggle. Showing both at once means a regression in either mode is immediately visible.
- **Eventual end-user/demo behavior:** `prefers-color-scheme` is a *future* concern, deferred until we publish the demos. For now, mirk's own dev pages stay class-based.
- **Color tokens:** stock Tailwind v4 defaults for now. Harvest a palette once 3–4 components reveal what we actually use.

### Why this over the alternatives
- **Class-based over `prefers-color-scheme` (for the dev pages):** we have to drive both states from one page so we can compare them directly. A toggle works but is a tax — you forget to flip it, dark regressions go unnoticed for a sprint.
- **Both-themes-shown over toggled:** zero cognitive overhead during development. Eyes naturally check both renders.
- **CDN over a build step:** the project's whole premise is buildless copy-paste. mirk's own pages should embody it.
- **Stock colors over a palette:** picking colors before they're earned tends to overspecify; harvest is cheaper than reshuffle.

### Tradeoffs
- The dev pages render every component twice (bigger DOM, but we're not optimizing dev pages).
- Demo pages don't yet honor `prefers-color-scheme` — fine for a dev tool, would matter when hosted.

### Alternatives considered
- **Single render + manual toggle.** Rejected: parity bugs become invisible until someone flips it. The whole point of dark+light first-class is catching those at write-time.
- **Two separate files (`index.light.html`, `index.dark.html`).** Rejected: doubles file count, defeats side-by-side.
- **`prefers-color-scheme` only, no class.** Rejected: can't display both states simultaneously.

---

## 0002 — Focus ring: 1px outline, 2px offset, `:focus-visible` only

- **Date:** 2026-04-27

### Context
Every interactive element in mirk needs a visible focus indicator. We want a single convention so all components feel cohesive.

### Decision (mirk)
- `:focus-visible` shows a **1px outline** with a **2px offset** away from the element border. (3px is acceptable when an element's own border already crowds the ring; treat 2px as default.)
- Outline color is themeable. Until the palette is harvested, use Tailwind's default focus blue.
- Tailwind utility form: `focus-visible:outline focus-visible:outline-1 focus-visible:outline-offset-2`, with `focus-visible:outline-<color>` per element/theme.
- Native `:focus` (without `:focus-visible`) is *not* styled — keyboard users get the ring, mouse clicks don't trigger it.

### Why this over the alternatives
- **1px is intentional.** Heavier rings (2–3px) feel chunky against a small form-control vocabulary. Visibility comes from the offset and the contrast color, not the thickness.
- **2px offset** keeps the ring clear of the element's own border so it reads as a separate layer instead of stacking onto it.
- **`:focus-visible` over `:focus`** — only ring when the user is navigating via keyboard. Mouse clicks shouldn't outline.
- **`outline` over `box-shadow`** — outlines aren't clipped by `overflow: hidden` parents; box-shadows are.

### Tradeoffs
- 1px is on the thin side for users with low-vision needs. We're betting on color contrast carrying the load. Revisit if accessibility testing flags it.

### Alternatives considered
- **Box-shadow ring (`focus:ring-2`).** Rejected: clipping risk, and shadows look fuzzier than outlines at the same width.
- **Inset rings.** Rejected: visually crowds the element's content area; bad for small inputs.

---

## 0003 — `compare.html` loader: Vite dev server for Primer; Carbon stays on its CDN

- **Date:** 2026-04-27

### Context
`compare.html` renders mirk · Primer · Carbon side-by-side, light + dark, so we can judge each mirk component against best-in-class peers as we build. Carbon ships first-class web components on a public CDN — those work buildless. Primer ships React + CSS modules; getting them to load buildless in a browser failed across three independent paths.

### Decision (mirk)
- **`compare.html` requires a Vite dev server.** Run `npm run dev` to view it; Vite resolves the bare-specifier imports for `react`, `react-dom`, and `@primer/react` and pre-bundles Primer's CSS modules.
- **Carbon stays on `1.www.s81c.com` CDN scripts** inside `compare.html` — no need to install or import; works either via the dev server or any static server.
- **Scope is `compare.html` only.** `index.html` and the eventual mirk components stay 100% buildless (open in any browser, paste anywhere). Vite is a development convenience for *one* tool page, not part of mirk's authoring or distribution.
- **Stack:** Vite 6, React 18.3, `@primer/react` 38.x. `package.json` is at the repo root; `node_modules/` is gitignored.

### Why this over the alternatives
- **Buildless attempts failed.** `esm.sh` 301-redirects Primer's `*.module.css.mjs` files to `text/css` URLs that Chrome's module loader rejects. The UMD bundle throws inside `styled-components` (peer-version mismatch). `lodash` and `lit` import fine via the same path, so the issue is specific to Primer.
- **`@primer/css` would be lossy.** Primer's classic CSS package is the legacy GitHub.com style, not the modern Primer React design — it'd be a visual approximation, not a real reference.
- **Iframing Primer's Storybook leaks Storybook chrome** into the comparison, and inter-frame styling is fragile.
- **Vite gets us the real Primer**, costs us a one-line dev command, and keeps everything else buildless.

### Tradeoffs
- `compare.html` no longer "just opens in a browser" — you need `npm run dev`. Acceptable because it's an internal dev tool, not something we ship.
- Adds a `package.json` and `node_modules/` to the repo. Both are gitignored / small commitments and don't affect mirk consumers.
- If Primer drops support for React 18, we'll need to bump.

### Alternatives considered
- **A. Pure buildless via `esm.sh`.** Rejected — CSS-module redirects break Chrome's module loader. See `HISTORY.md` 2026-04-27 for the full investigation.
- **B. UMD bundle (`browser.umd.js` + React UMD + styled-components UMD).** Rejected — runtime error in styled-components, likely a peer-version mismatch in Primer's bundle.
- **C. `@primer/css` (legacy CSS-only).** Rejected — visually different from modern Primer React; not a fair comparison.
- **D. Iframe Primer Storybook stories.** Rejected — Storybook chrome contaminates the comparison; inter-frame coordination is fragile.
- **E. Pre-build a vendor bundle (`vendor/primer.bundle.js`) and serve `compare.html` via any static server.** Considered. Cleaner in some ways (the page itself stays static), but you still need a build step somewhere; might as well make it the dev server since live reload is useful. Revisit if we want to ship `compare.html` as a hosted demo.

### Open questions
- Do we eventually want a `vite build` config that produces a single hostable `dist/compare.html` for sharing? Not needed today.
