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
| 0004 | [Font: Departure Mono, used uniformly across every mirk component](#0004--font-departure-mono-used-uniformly-across-every-mirk-component) |
| 0005 | [Color values: no pure white, no pure black](#0005--color-values-no-pure-white-no-pure-black) |
| 0006 | [Documentation: concise, information-dense](#0006--documentation-concise-information-dense) |
| 0007 | [Form controls: shared line-height (1.5)](#0007--form-controls-shared-line-height-15) |

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
- **Wrapped controls** (e.g. round dropdown's gradient pill wraps the `<select>`): put `has-[:focus-visible]:[outline:…]` on the wrapper and `focus:outline-none` on the inner control. Don't use `focus-within:` — it also triggers on mouse-click focus, which violates this rule.
- **`<select>` exception.** Chromium and Firefox apply `:focus-visible` to `<select>` on mouse click (the popup is keyboard-navigable, so they treat the click as entering keyboard-interaction mode). We accept this — it matches native `<select>` behavior across the web, and overriding it would either need a JS widget (banned by `README.md` "Locked technical choices") or fragile `:focus:not(:focus-visible)` hacks.

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

---

## 0004 — Font: Departure Mono, used uniformly across every mirk component

- **Date:** 2026-04-28

### Context
mirk needs one type face. Whatever we pick is going to set the tone for every component, every demo page, and every snippet a user copies — so it has to embody the design stance, not just be neutral background. We compared four candidates side-by-side on buttons + dropdowns in `experiments/experiments.html`: Geist Mono, Departure Mono, Geist Pixel, and IBM Plex Mono. Each was rendered against both dark (`#0B0C13`) and light (`#FFFFF8`) panels with five different component aesthetics so we could judge readability *and* tonal fit at the same time.

### Decision (mirk)
- **Font:** Departure Mono (SIL OFL, by Helena Zhang).
- **Usage:** every mirk component — buttons, inputs, dropdowns, labels, hints, errors, code samples — uses Departure Mono. No mixed font stacks, no "body in X, code in Y" split. One face, used everywhere.
- **Sizing:** larger than default body type (mirk's `text-[18px]`–`text-[20px]` standards in current experiments). The pixel face needs the size to read cleanly, and the size also reinforces the "obvious" stance.
- **Loading:** local `@font-face` from `mirk-ui-kit/fonts/DepartureMono-1.500/DepartureMono-Regular.woff2`. Buildless; no CDN dependency.

### Why this over the alternatives
mirk's design promise is to be **violently obvious** — a deliberate callback to 80s/90s UIs that were plain, blocky, and unambiguous about what was clickable. The whole point is that a button looks like a button, a dropdown looks like a dropdown, and you don't have to decode anything. A pixel face commits to that vocabulary on the first glance; a clean modern mono softens it.

We *love* the readability of Geist Mono and IBM Plex Mono. They're objectively easier to read at small sizes. But picking either one would mean optimizing for "polished and quiet" — exactly the aesthetic mirk is rejecting. mirk values **brevity**: less text, larger text, fewer choices, simpler presentation. A pixel font enforces that — you can't comfortably write 14px paragraph soup in Departure Mono, which keeps us honest about keeping things terse.

Departure Mono wins over Geist Pixel because it's still legible enough at our larger-than-default sizes to be used across every component, including dropdown options and form labels. Geist Pixel is chunkier and reads great in headlines but crowds out at body sizes.

### Tradeoffs / what we're giving up
- **Long-form readability.** Anything that turns into a paragraph of helper text or a wall of options will be harder to skim than it would be in Geist Mono. We accept this — long-form prose isn't mirk's job, and if a component is producing paragraphs of text we're probably designing it wrong.
- **Conventional polish.** A pixel face is opinionated; some users will find it too retro. That's the bet — mirk is not trying to be tasteful background furniture.
- **Per-component font overrides.** None. If a component genuinely can't work in Departure Mono, that's a signal to redesign the component, not to add a second font.

### Alternatives considered
- **Geist Mono.** Best readability of the four, neutral, modern. Rejected — too quiet for the "violently obvious" stance.
- **IBM Plex Mono.** Excellent humanist mono, well-suited for code/data UIs. Rejected for the same reason as Geist Mono — it whispers where mirk needs to shout.
- **Geist Pixel.** Pixel face that does commit to the retro stance. Rejected — too chunky at the body sizes mirk uses across dropdowns and labels; loses legibility before Departure Mono does.
- **Two-font split (e.g., pixel for headers, sans for body).** Rejected — every mixed-font system trains users to ignore the "important" face. One font, used everywhere, lets the size and shape of an element carry meaning instead of its typography.

### Open questions
- Do we want a fixed body size or a small scale (e.g., 16/18/20) for hierarchy? Likely fall out naturally as we build more components — revisit when 3–4 components are done and we can see what sizes show up most often.

---

## 0005 — Color values: no pure white, no pure black

- **Date:** 2026-04-28

### Context
mirk renders against many host pages, and pure `#ffffff` / `#000000` are visually harsh on screens — they create excessive contrast, irradiation effects (bright pixels appearing to bleed into adjacent dark ones), and eye fatigue. The "violently obvious" stance from `0004` is about clarity of *form*, not maximum contrast in *value*. We want loud shapes, not screaming pixels.

### Decision (mirk)
- **No `#ffffff` / `#fff` / `text-white` / `bg-white` / `border-white` anywhere in mirk.** When a near-white is needed, use an off-value. The current dark-panel default is `#F6F7F9`.
- **No `#000000` / `#000` / `text-black` / `bg-black` / `border-black` anywhere in mirk.** When a near-black is needed, use an off-value. The current light-panel default is `#0B0C13` (also the existing dark-panel background).
- **Scope:** every color in mirk components, demo pages, and snippets — backgrounds, text, borders, fills, gradients, focus rings.
- **Currently applied (`experiments/experiments.html`):**
  - dark panel: `bg #0B0C13`, `fg #F6F7F9`, focus outline `#bfbfbf`
  - light panel: `bg #F7F2EA`, `fg #0B0C13`
  - buttons: `bg-black` → `bg-[#0B0C13]`, `text-white` → `text-[#F6F7F9]`

### Why this over the alternatives
- **Perceptual comfort.** Off-white/off-black ranges read as "white" and "black" without the harshness; the eye accepts them as the same conceptual value while losing the glare.
- **Headroom for state changes.** Pure white as a default leaves nowhere to go for hover/active highlights; an off-white default gives us room to push *brighter* for emphasis instead of always dimming.
- **Aligns with hyperclay's existing palette.** `#0B0C13` is already in use across the platform; adopting it here keeps mirk visually coherent with the host project.

### Tradeoffs / what we're giving up
- **Maximum theoretical contrast.** WCAG-wise, `#0B0C13` on `#F6F7F9` is still ~17:1 — more than enough — but a future a11y review may want to re-validate every pair as we add components.
- **Slightly fussier color picking.** "Just use white" is no longer an option; every near-white needs a decided value. Mitigated by keeping a small set of canonical off-values (currently `#F6F7F9` / `#0B0C13` / `#F7F2EA`).

### Alternatives considered
- **Allow pure white/black, soften only when problems show up.** Rejected — irradiation is consistent and predictable enough to rule against up front; retrofitting later means hunting `text-white` / `bg-black` across every snippet.
- **Per-component overrides.** Rejected — every mixed-rule color system trains contributors to ignore the rule. One global ban is simpler.

---

## 0006 — Documentation: concise, information-dense

- **Date:** 2026-04-28

### Decision
Every md file in this repo prefers density over completeness. Bullets over paragraphs. One screen over many. Only the *why* that isn't derivable from the code. Lead with the rule, then one line of context.

### Why
- Re-read, not skimmed once. Tight entries stay legible after a year; verbose ones decay into noise.
- Eat the dog food: a UI kit that values brevity writes its docs the same way.

---

## 0007 — Form controls: shared line-height (1.5)

- **Date:** 2026-04-28

### Decision
Every form control (`button`, `input`, `select`, `textarea`, label, hint, error) carries `leading-normal` (1.5) explicitly. Same line-height + same padding = identical heights — controls line up vertically in rows and horizontally in stacks without per-component tuning.

### Why
- Mismatched line-height drifted heights by ~5px on identical padding (button at 44px, dropdown at 39px — caught mid-experiments).
- One default beats per-component thinking. Body text already inherits 1.5 from `<html>`, so prose and controls share a vertical rhythm.

### Tradeoff
Controls run 4–5px taller than typical compact UI kits. Fine — mirk's font is already large, pixel, and loud; compactness was never the goal.

### Apply
- `leading-normal` is explicit on every snippet. Don't lean on inherit — keeps snippets self-contained when pasted into a host with different defaults.
- Multi-line components (rich text, code editor, long markdown) may want a looser value (`leading-relaxed` 1.625) for paragraph readability — decide when building those.
