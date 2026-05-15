# DECISIONS

Current accepted choices for mirk components and project infrastructure. This file reflects *what is true now* — entries are edited freely as decisions evolve. The full audit trail (every decision and *why*, never overwritten) lives in `HISTORY.md`. Items still being brainstormed live in `UNDECIDED.md`.

## Scope — what belongs here

Decisions capture **major UX choices**: what a component is, how it behaves, what makes it different from Primer/Carbon. Not individual CSS values (sizes, paddings, hex codes, exact border widths) — those iterate freely in `experiments/experiments.html` and live in the code itself. If a value is just a knob you'd tune by eye, it doesn't belong here.

## Rules

1. **One section per decision.** Heading: `## NNNN — <component or topic>: <short title>`. If a topic has multiple distinct decisions (API shape, a11y, styling), give each its own section.
2. **Numbering is for reference, not permanence.** Sections are numbered in the order they were first added so they're easy to cite, but entries can be edited or rewritten when a decision changes. `HISTORY.md` preserves what changed and why.
3. **Cite sources.** When referencing Primer or Carbon, include the path within `refs/` and the commit SHA.
4. **Either order — build first or decide first.** Some choices are clearer after prototyping in `experiments/experiments.html` (visual feel, asymmetric tuning); others need a contract before code (a11y model, semantics, API shape). Pick whichever fits the work.
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
| 0008 | [`text-box-trim`: deferred until cross-browser](#0008--text-box-trim-deferred-until-cross-browser) |
| 0009 | [Text input: solid uniform border, rect and rounded variants](#0009--text-input-solid-uniform-border-rect-and-rounded-variants) |
| 0010 | [Per-panel CSS vars when bevel semantics don't translate](#0010--per-panel-css-vars-when-bevel-semantics-dont-translate) |
| 0011 | [Placeholder color: explicit hex, never opacity](#0011--placeholder-color-explicit-hex-never-opacity) |
| 0012 | [Stateful indicators: flat off, pressed-in bevel selected](#0012--stateful-indicators-flat-off-pressed-in-bevel-selected) |
| 0013 | [Rect vs round axis: per-component mapping](#0013--rect-vs-round-axis-per-component-mapping) |
| 0014 | [DIY JavaScript: scoped exceptions](#0014--diy-javascript-scoped-exceptions) |
| 0015 | [Textarea: container pattern, vertical resize only](#0015--textarea-container-pattern-vertical-resize-only) |
| 0016 | [Radio: square-radio exception for the rect variant](#0016--radio-square-radio-exception-for-the-rect-variant) |
| 0017 | [Toggle: flat track plus always-beveled thumb](#0017--toggle-flat-track-plus-always-beveled-thumb) |
| 0018 | [Segmented control: grouped radios, shared internal borders](#0018--segmented-control-grouped-radios-shared-internal-borders) |
| 0019 | [Slider: bevel thumb plus bevel filled portion, JS visual bridge](#0019--slider-bevel-thumb-plus-bevel-filled-portion-js-visual-bridge) |
| 0020 | [Date / time / datetime: hide UA chrome, overlay glyph](#0020--date--time--datetime-hide-ua-chrome-overlay-glyph) |
| 0021 | [Date range: two date inputs plus JS cross-validation](#0021--date-range-two-date-inputs-plus-js-cross-validation) |
| 0022 | [File picker: hidden input plus label-as-button plus JS filename](#0022--file-picker-hidden-input-plus-label-as-button-plus-js-filename) |
| 0023 | [Image input: file picker plus FileReader preview](#0023--image-input-file-picker-plus-filereader-preview) |
| 0024 | [Tags: input plus DOM chips plus JS add/remove](#0024--tags-input-plus-dom-chips-plus-js-addremove) |

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

---

## 0008 — `text-box-trim`: deferred until cross-browser

- **Date:** 2026-04-28

### Decision
Don't use `text-box-trim: trim-both` + `text-box-edge: cap alphabetic` in mirk. Revisit ~1 year after Firefox ships (Chrome ≥133, Safari ≥17.4 only as of late 2025; Firefox unshipped).

### Why
- Adopting now means every snippet ships a property that does nothing in Firefox — silent visual drift between browsers, exactly the parity bug `0001` (both-themes-shown) exists to prevent.
- Tuned `py-` + `leading-normal` (per `0007`) gives the same vertical-centering result today and is portable everywhere.
- Once Firefox ships, every component will need re-tuning anyway (the property changes the box model). Doing it once on a stable baseline is cheaper than retrofitting twice.

### Revisit trigger
Firefox stable shipping `text-box-trim` + a ~1 year buffer for it to settle in install-base versions.

---

## 0009 — Text input: solid uniform border, rect and rounded variants

- **Date:** 2026-04-29

### Decision
Text inputs use a **solid uniform border** on all four sides. Two visual variants share identical internals — only the corner radius differs:
- **Rect** — `rounded-none`
- **Rounded** — `rounded-[5px]` (just enough to soften corners; far less than the round button/dropdown's pill shape)

Markup is native `<input type="text">`. Border color is the per-panel `--input-border` (see `0010`).

### Why
- **Container vs. pressable.** Bevels (different colors per side) telegraph "press me" — that's buttons. A text input *contains* content; a flat uniform frame reads "this holds something". Visual semantics matching real semantics.
- **Two variants is the natural axis.** Sharp/industrial vs. softened. Two covers the range without proliferating per-context styles.
- **Native `<input type="text">`.** Round-trips via `outerHTML` per the locked rule; gets a11y, keyboard handling, and form participation for free.

### Tradeoff
Lose the bevel depth cue. Carried instead by `--input-border` vs. `--bevel-bg` contrast and the typography density of input contents.

### Source comparison
- **Primer** — `refs/primer/packages/react/src/internal/components/TextInputWrapper.module.css` @ `619175c00dece144573fe5afbe4cd51e524a6c3d`. Uniform 1px border, ~6px radius, inset shadow. Took the uniform border; dropped the inset shadow (would compete with the bevel buttons next door).
- **Carbon** — `refs/carbon/packages/styles/scss/components/text-input/_text-input.scss` @ `6898a87e8c7ca8e76fb05cb7ecde63391e5ca90a`. Underline-only (`border-block-end: 1px solid`). Rejected: we want a frame, not a hint.

---

## 0010 — Per-panel CSS vars when bevel semantics don't translate

- **Date:** 2026-04-29

### Decision
When light and dark panels need values that move in **opposite directions** along the same axis (e.g., a border that should be darker-than-bg in light *and* lighter-than-bg in dark), introduce a **dedicated per-panel CSS var** rather than reusing an existing bevel var.

In use: `--input-border`, `--placeholder-color`. Each is defined once in `.panel-dark` and once in `.panel-light` with the value appropriate to that panel.

### Why
- `--bevel-tl` / `--bevel-br` have **parallel** semantics across panels (tl = highlight side, br = shadow side). Asymmetric needs don't fit either var.
- Reusing an existing var with mismatched semantics **aliases** unrelated colors (e.g., focus-color also being the placeholder color). Tuning one site silently changes the other.
- Keeping component HTML **identical** across panels (the dropdown pattern) requires the var resolve per-panel — which requires defining it per-panel.

### Apply
- Name vars semantically — what they *are* (`--input-border`), not what they currently alias.
- Setting a per-panel var to `var(--bevel-tl)` (or similar) is fine when the existing value happens to fit; switch to a literal hex when it doesn't.

---

## 0011 — Placeholder color: explicit hex, never opacity

- **Date:** 2026-04-29

### Decision
Placeholder text uses an **explicit color value** — never `opacity` to dim the input's fg.

### Why
An explicit hex is a color we **chose**. Opacity isn't a color — it dims whatever underlies the placeholder, so the rendered result shifts the moment the input sits on a different background. A "color" defined via opacity *fails* as an explicit choice — it stops being the value we wanted the moment the underlying surface changes.

Browser-default `::placeholder` colors also vary, so `placeholder:opacity-N` modifies an unpredictable starting point — compounding the problem.

### Apply
- `placeholder:text-[…]` set to a real hex (or a per-panel var per `0010`).
- Don't reach for `placeholder:opacity-N`.

---

## 0012 — Stateful indicators: flat off, pressed-in bevel selected

- **Date:** 2026-05-14

### Decision
Indicators that visualize their own selection state read as flat in the off state and pressed-in (depressed bevel) in the selected state.

- **Off:** 1px `--input-border` outline on `--bevel-bg`, the text-input container vocabulary from `0009`.
- **Selected:** pressed-in bevel (top and left = shadow `--bevel-br`, right and bottom = highlight `--bevel-tl`) plus a `from-bevel-br to-bevel-tl` gradient fill. Implemented with `inset` box-shadow so the indicator does not change size on selection.
- **Round variant:** the round-button gradient frame substitutes for the four-side bevel, same metaphor in the round vocabulary.

**Applies to:** checkbox, radio, segmented control segment.

**Does not apply to:** toggle thumb and slider thumb. Those are handles, always beveled regardless of state. State for toggle is track color plus thumb position. State for slider is filled-portion width plus thumb position.

### Why
Off=flat reuses the container vocabulary, so an unselected indicator reads as an empty slot. Selected=pressed-in reuses the rect button's active state, so a selected indicator reads as "I pressed this and it stayed in." Both are already in the kit, no new visual language required.

### Tradeoff
A selected checkbox looks similar to a depressed rect button at a glance. Acceptable: surrounding context (label position, group layout, size) disambiguates.

### Source comparison
Primer and Carbon both use a solid-fill background plus a contrasting check glyph for selected, no bevel. We deviate to telegraph "pressable" via the visual vocabulary already used elsewhere in mirk.

---

## 0013 — Rect vs round axis: per-component mapping

- **Date:** 2026-05-14

### Decision
Every component ships in two variants on a sharp-vs-softened axis. What "round" means is component-specific.

| Component | Rect | Round / Rounded |
|---|---|---|
| Textarea | `rounded-none` | `rounded-[5px]` |
| Number | rect frame, sharp ▲▼ mini-buttons | rounded 5px frame, same internal buttons |
| Checkbox | sharp-cornered square indicator | 5px-cornered square indicator |
| Radio | square indicator with square fill (see `0016`) | circular indicator with circular fill |
| Toggle | rectangular track plus rectangular thumb | pill track plus circular thumb |
| Segmented | sharp end caps, sharp internal seams | pill end caps (16px outer), sharp internal seams |
| Slider | rectangular thumb on rectangular track | circular thumb on pill track |
| Date / Time / Datetime / Date range | `rounded-none` frame | `rounded-[5px]` frame |
| File picker | rect bevel button + rect filename frame | round-pill button + rect filename frame |
| Image input | sharp preview frame + rect button | 5px-corner preview frame + round-pill button |
| Tags | sharp chips on a sharp wrapper | pill chips on a 5px-cornered wrapper |

### Naming
"Round" means fully-pill. "Rounded" means softened-but-still-square (5px). Each component picks the label that matches its shape. Consistent axis, different vocabulary per component.

---

## 0014 — DIY JavaScript: scoped exceptions

- **Date:** 2026-05-14

### Decision
The README's "No DIY JavaScript" rule stays as the default. We open a named-exception list for components where native HTML cannot reach a respectable result with CSS alone.

**Components allowed inline JS, only for the listed job:**

- **Number** — increment/decrement on custom bevel buttons. Calls `input.stepUp()` / `input.stepDown()`.
- **Slider** — mirror `<input type="range">` `.value` into a CSS custom property on the wrapper so the visual divs can size themselves.
- **Date range** — sync `min` and `max` between the two `<input type="date">` inputs so the end stays after the start.
- **File picker** — display the selected filename next to the button via `input.files[0].name` on `change`.
- **Image input** — render a thumbnail preview via `FileReader.readAsDataURL` on `change`.
- **Tags** — add a chip on Enter or comma, remove on Backspace or close-button click.

**Still banned:**
- Hand-rolled implementations of natively-available primitives (text input, select, checkbox, radio, textarea behavior).
- Web components, custom elements.
- Component init libraries the consumer must instantiate.

**Required properties of allowed JS:**
- `document.documentElement.outerHTML` round-trips the visible state. Chips are real DOM. CSS custom props live in inline `style`. Native input values are handled by the platform's save layer.
- Inline at the bottom of the snippet, no external file, no consumer init step.
- Idempotent, attaches via `data-*` selectors, safe to include twice.
- Tiny. If a component needs more than roughly 20 lines, the design is wrong.

### Why a named list, not a general allowance
A general "JS is fine when needed" rule is the slow path to a JS UI kit. Each name on the list is forced by a concrete native limitation: no CSS hook for the file `value`, no thumb-position CSS read for range, no native combined date range, no `::after` on replaced elements for icons. Future additions clear the same bar.

### Updates flowing from this
- `README.md` "Locked technical choices" keeps the no-DIY-JS default and links to this decision for exceptions.
- `HISTORY.md` 2026-04-26's "Tags and multi-select: deferred" entry stays untouched per the audit-trail rule. A new 2026-05-14 entry records the reversal for tags. Multi-select stays deferred.

---

## 0015 — Textarea: container pattern, vertical resize only

- **Date:** 2026-05-14

### Decision
`<textarea>` reuses every text-input choice from `0009`: 1px `--input-border`, `--bevel-bg` fill, `--placeholder-color` placeholder, `rounded-none` / `rounded-[5px]` variants, same padding rhythm, same focus-visible outline. The only addition: `resize: vertical`.

### Why vertical only
Disabling resize is overbearing on long content. Horizontal resize breaks surrounding layout. Vertical is the sane default and matches what nearly every UI kit does.

---

## 0016 — Radio: square-radio exception for the rect variant

- **Date:** 2026-05-14

### Decision
Convention is "radios are round." We make a single exception: the rect variant of radio is a **square indicator with a square inner fill**, not a circle.

### Why
The kit's organizing axis is rect vs round. A radio that ignored the axis to stay round-only would be a hole in the system. A square radio reads as "single-choice tile" and is visually distinct from a checkbox (square with ✓) and from the round radio (circle with a dot). The `0012` selection metaphor translates without modification.

### Visual differentiation between selected states
- Checkbox (rect or rounded): pressed-in bevel + `✓` glyph.
- Radio (rect): pressed-in bevel + small filled square.
- Radio (round): pressed-in gradient frame + small filled circle.

The user shouldn't have to think to tell them apart at a glance.

---

## 0017 — Toggle: flat track plus always-beveled thumb

- **Date:** 2026-05-14

### Decision
The toggle is a **track** (container) plus a **thumb** (handle).

- **Track:** flat container, 1px `--input-border`, bg `--bevel-bg` when off, bg `--accent` when on.
- **Thumb:** mini bevel. Rect variant uses a four-side bevel. Round variant uses the round-button gradient frame on a circle. Always beveled, regardless of state.
- **State:** native `<input type="checkbox">` with `role="switch"`, visually hidden via `sr-only`. Thumb position driven by `translateX` on `group-has-[:checked]:`.

### Why thumb stays beveled in both states
A handle that flattens when off stops reading as a handle. The `0012` "off=flat" rule applies to indicators that ARE the state visualizer (checkbox indicator, radio dot, selected segment). The toggle's state visualizer is track-color plus thumb-position, not the thumb's own surface.

---

## 0018 — Segmented control: grouped radios, shared internal borders

- **Date:** 2026-05-14

### Decision
Segmented controls are visually-styled `<input type="radio">` groups with sibling-selector CSS. No JS.

- Each segment is a `<label>` wrapping a visually-hidden `<input type="radio">` plus a styled `<span>`.
- Segments live in a horizontal flex container with `-ml-[1px]` on every segment after the first, so adjacent borders collapse to a single hairline.
- Unselected segment: flat (`0012` off).
- Selected segment: pressed-in bevel (`0012` selected).
- Rect: every segment sharp-cornered.
- Round: first gets `rounded-l-[16px]`, last gets `rounded-r-[16px]`, middles stay sharp.
- Border width is constant (3px) across both states. Only colors swap on selection, so segments don't shift size when clicked.

---

## 0019 — Slider: bevel thumb plus bevel filled portion, JS visual bridge

- **Date:** 2026-05-14

### Decision
Native `<input type="range">` is unstylable enough across browsers that mirk's bevel aesthetic can't be reached with CSS alone. We render the visual layer in CSS divs and let the native input drive state.

**Construction:**
- Wrapper `<div data-slider style="--value: 60%">` houses:
  - the native `<input type="range">` overlaid `opacity: 0` with `z-10` to capture pointer, drag, and keyboard;
  - a track div (container styling, `--bevel-bg` fill, 1px `--input-border`);
  - a filled div sized to `width: var(--value)` with the round-button gradient (`from-bevel-br to-bevel-tl`);
  - a thumb div positioned at `left: var(--value)` with `-translate-x-1/2`.
- Rect variant: thumb is a mini four-side bevel.
- Round variant: thumb is a circle with gradient frame plus inner pill (mini round button); track has `rounded-full`.

**JS (per `0014`):** wire `input` event on the range to mirror `.value` into `--value` on the wrapper.

### A11y
Native range handles arrow keys, value announcement, form submission. The `<input>` captures interaction at `opacity: 0`. The visual divs are decorative.

---

## 0020 — Date / time / datetime: hide UA chrome, overlay glyph

- **Date:** 2026-05-14

### Decision
Native UA chrome on `<input type="date">`, `time`, and `datetime-local` varies wildly across browsers. We suppress it and overlay a Departure Mono glyph on the right edge, same pattern the dropdown uses for its `›` chevron.

- `::-webkit-calendar-picker-indicator { opacity: 0 }` positioned absolutely over the input so click-anywhere still opens the native picker.
- `::-webkit-inner-spin-button { appearance: none }` and `::-webkit-clear-button { appearance: none }` to suppress Webkit's spinner and clear chrome.
- Glyph overlay is `pointer-events-none` on the right edge, sized close to the dropdown chevron.

### Glyphs (initial choices, tunable in experiments)
- Date: `□`.
- Time: `◌`.
- Datetime: `□`.

### Result
Closed-state visual matches text-input and dropdown across all browsers. Native picker still opens, native keyboard input still works.

---

## 0021 — Date range: two date inputs plus JS cross-validation

- **Date:** 2026-05-14

### Decision
"From" and "to" are two ordinary date inputs (per `0020`) separated by a `→` glyph. Minimal JS (per `0014`) keeps the constraint:
- `start.change` sets `end.min = start.value`.
- `end.change` sets `start.max = end.value`.

A single combined-popup picker would buy a marginally nicer UX at the cost of a calendar-rendering library. Not worth the bytes.

---

## 0022 — File picker: hidden input plus label-as-button plus JS filename

- **Date:** 2026-05-14

### Decision
- A `<label>` styled exactly like a bevel button (rect or round) wraps a visually-hidden `<input type="file">`. Click the button, OS picker opens.
- An adjacent `<div data-filename>` (container styling, flat frame) shows "No file chosen" until a file is picked, then the filename. JS (per `0014`) handles the swap.
- The hidden input is `sr-only`, not `display: none`, so it stays focusable. The label's focus-visible outline uses `has-[:focus-visible]` per the `0002` wrapped-controls rule.

### Variants
Rect: rect bevel button plus rect filename frame.
Round: round-pill button plus still-rect filename frame. The filename slot is a container regardless of which button pairs with it; container vocabulary stays consistent.

---

## 0023 — Image input: file picker plus FileReader preview

- **Date:** 2026-05-14

### Decision
Reuses `0022` for the button-plus-filename row. Adds a preview square above it:
- Preview frame: container styling (flat, 1px `--input-border`), aspect-square at a thumbnail size.
- Empty state: muted "No image" placeholder text centered.
- On `input.change`: `FileReader.readAsDataURL(file)`, then set `<img>` `src` and swap visibility. This is the FileReader exception named in `0014`.

---

## 0024 — Tags: input plus DOM chips plus JS add/remove

- **Date:** 2026-05-14

### Decision
Tags were deferred on 2026-04-26 because they need JS and were judged an advanced pattern. We're reversing the first per the scoped exceptions in `0014`. The "advanced pattern" concern is reframed too: tag inputs are common enough in modern forms that mirk would feel incomplete without one. Multi-select stays deferred.

**Construction:**
- Wrapper `<div data-tags>` styled as a container (flat 1px `--input-border` frame on `--bevel-bg`).
- Inside: zero or more chip `<span>` elements plus a trailing `<input type="text" data-tag-input>`.
- Each chip: a styled span containing the tag text, a `×` remove button, and an `<input type="hidden" name="tags[]" value="…">` for form submission.

**Round-trip:** chips are real DOM. Hidden inputs serialize on submit. Text input is empty by default. `outerHTML` captures it all.

**Behavior (per `0014`):**
- Enter or `,` in the text input: append a chip from the typed text, clear the input.
- Backspace in an empty input: remove the last chip.
- Click `×` on a chip: remove that chip.

**Variants:**
- Rect: hard-bordered chips, sharp corners on chip and wrapper.
- Round: gradient-frame pill chips, 5px corners on the wrapper.

### Spec updates
- `README.md`'s no-DIY-JS bullet now references `0014`.
- `PLAN.md` deferred list loses tags; build order gains "19 — Tags".
