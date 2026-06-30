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
| 0001 | [Theming foundations: Tailwind v4 CDN, `prefers-color-scheme` default + `.light` / `.dark` author override](#0001--theming-foundations-tailwind-v4-cdn-prefers-color-scheme-default--light--dark-author-override) |
| 0002 | [Focus ring: 1px outline, 2px offset, `:focus-visible` only](#0002--focus-ring-1px-outline-2px-offset-focus-visible-only) |
| 0003 | [`compare.html` loader: Vite dev server — REMOVED](#0003--comparehtml-loader-vite-dev-server-for-primer-carbon-stays-on-its-cdn--removed) |
| 0004 | [Font: Departure Mono, used uniformly across every mirk component](#0004--font-departure-mono-used-uniformly-across-every-mirk-component) |
| 0005 | [Color values: no pure white, no pure black](#0005--color-values-no-pure-white-no-pure-black) |
| 0006 | [Documentation: concise, information-dense](#0006--documentation-concise-information-dense) |
| 0007 | [Form controls: shared line-height (1.5)](#0007--form-controls-shared-line-height-15) |
| 0008 | [`text-box-trim`: deferred until cross-browser](#0008--text-box-trim-deferred-until-cross-browser) |
| 0009 | [Text input: solid uniform border, rect and rounded variants](#0009--text-input-solid-uniform-border-rect-and-rounded-variants) |
| 0010 | [Per-panel CSS vars when bevel semantics don't translate](#0010--per-panel-css-vars-when-bevel-semantics-dont-translate) |
| 0011 | [Placeholder color: explicit hex, never opacity](#0011--placeholder-color-explicit-hex-never-opacity) |
| 0012 | [Stateful indicators: bevel on unselected, flat on selected](#0012--stateful-indicators-bevel-on-unselected-flat-on-selected) |
| 0013 | [Rect vs round axis: per-component mapping](#0013--rect-vs-round-axis-per-component-mapping) |
| 0014 | [DIY JavaScript: scoped exceptions](#0014--diy-javascript-scoped-exceptions) |
| 0015 | [Textarea: container pattern, vertical resize only](#0015--textarea-container-pattern-vertical-resize-only) |
| 0016 | [Radio: square-radio exception — REMOVED](#0016--radio-square-radio-exception-for-the-rect-variant--removed) |
| 0017 | [Toggle: transparent track, darker thumb via per-panel control vars](#0017--toggle-transparent-track-darker-thumb-via-per-panel-control-vars) |
| 0018 | [Segmented control: removed from scope](#0018--segmented-control-removed-from-scope) |
| 0019 | [Slider: beveled thumb, flat filled portion](#0019--slider-beveled-thumb-flat-filled-portion) |
| 0020 | [Date / time / datetime: confined picker indicator preserves typing](#0020--date--time--datetime-confined-picker-indicator-preserves-typing) |
| 0021 | [Date range: two date inputs plus JS cross-validation](#0021--date-range-two-date-inputs-plus-js-cross-validation) |
| 0022 | [File picker: ship all four variants on a 2×2 style × corner matrix](#0022--file-picker-ship-all-four-variants-on-a-22-style--corner-matrix) |
| 0023 | [Image input: file picker plus FileReader preview](#0023--image-input-file-picker-plus-filereader-preview) |
| 0024 | [Tags: input plus DOM chips plus JS add/remove](#0024--tags-input-plus-dom-chips-plus-js-addremove) |
| 0025 | [Sortable: drag handle dots, dedicated per-panel tokens, L-shape border](#0025--sortable-drag-handle-dots-dedicated-per-panel-tokens-l-shape-border) |
| 0026 | [Architecture (v2): semantic BEM classes in `@layer components`, hand-written `mirk.css`](#0026--architecture-v2-semantic-bem-classes-in-layer-components-hand-written-mirkcss) |
| 0027 | [Built-in brand variant: "Pixel Quiet" via `data-theme="pixel-quiet"`](#0027--built-in-brand-variant-pixel-quiet-via-data-themepixel-quiet) |
| 0028 | [Complete the small-size family: `--small` on checkbox, radio, toggle, slider, date, file, tags, sortable](#0028--complete-the-small-size-family---small-on-checkbox-radio-toggle-slider-date-file-tags-sortable) |
| 0029 | [Chip: elevated recovery treatment as the default; remove `--solid`](#0029--chip-elevated-recovery-treatment-as-the-default-remove---solid) |

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

## 0001 — Theming foundations: Tailwind v4 CDN, `prefers-color-scheme` default + `.light` / `.dark` author override

- **Date:** 2026-04-27, rewritten 2026-05-17

### Context
mirk drops into other developers' pages. Some hosts have light-loving users, some dark-loving, some let visitors choose. The kit has to do the right thing on day one regardless of which scenario applies. The kit's own showcase still has to render both themes simultaneously so a regression in either mode is immediately visible.

### Decision (mirk)
- **Tailwind:** v4 via the `@tailwindcss/browser` ESM build at `https://cdn.jsdelivr.net/npm/@tailwindcss/browser@4`. No build step. Consumers without Tailwind on their host can load `https://cdn.jsdelivr.net/npm/mirk-interface@1.0.0/mirk.css` instead (precompiled subset).
- **Token cascade — four tiers, in source order:**
  1. `:root { /* light token values */ }` — light is the default.
  2. `@media (prefers-color-scheme: dark) { :root { /* dark values */ } }` — OS preference flips `:root` to dark.
  3. `.light { /* light values */; background: var(--canvas); color: var(--fg); }` — author override; wins via specificity (`0,1,0` > `:root`'s `0,0,1`), beats the media query regardless of OS state.
  4. `.dark { /* dark values */; background: var(--canvas); color: var(--fg); }` — same as above for dark.
- **Consumer use:** no class anywhere = follow the visitor's OS preference (default behavior). `class="dark"` or `class="light"` on any wrapper (`<html>`, `<body>`, or a smaller subtree) forces that mode for everything inside.
- **Showcase use (`index.html`):** the page wraps each side in `<section class="light">` and `<section class="dark">` so both render side-by-side regardless of OS preference. The dual-render rule is showcase-only now — not the production convention.
- **Color tokens:** harvested palette already locked from the experiments. See the token block in `index.html` `<style>` for the full list (28 per-mode tokens including bevel-*, ctrl-*, toggle-*, sortable-*, slider-*).

### Why this over the alternatives
- **`prefers-color-scheme` default + class override:** respects the visitor's OS preference automatically (the right default for an embedded UI kit), while keeping a clean path for authors who want to enforce a specific mode for branding or product reasons. The old "class-only" rule meant the kit defaulted to its `:root` values forever unless the host added a class, which is the wrong default for the wider mirk audience.
- **`.light` / `.dark` over `.panel-light` / `.panel-dark` (the old showcase names):** shorter, matches the convention everyone already uses elsewhere, and the `panel-` prefix added zero clarity once the kit shipped beyond the experimental showcase.
- **Both-themes-shown stays for the showcase:** zero cognitive overhead during development; regression bugs in either mode are immediate. This belongs on the showcase page, not in the consumer's adoption path.
- **CDN over a build step:** the kit's premise is buildless copy-paste. mirk's own page embodies it.

### Tradeoffs
- A consumer who forgets the body has `background: var(--canvas)` applied via `:root` may be surprised if they wanted to keep their own background; documented in the intro.
- The cascade order matters — if a consumer puts `.light` / `.dark` in their own stylesheet *before* loading the kit's tokens, source order may flip the winner. Documented; in practice the drop-in pattern puts the kit's CSS first.

### Alternatives considered
- **Class-only (the prior locked rule).** Rejected on revision — requires the host to know about and add the class, defaulting to "no theme applied" until they do. Bad default for an embedded kit.
- **`prefers-color-scheme` only, no class.** Rejected — gives no override path; authors can't enforce a mode without per-page hacks.
- **Two separate files (`index.light.html`, `index.dark.html`).** Rejected as before: doubles file count, defeats side-by-side.

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

## 0003 — `compare.html` loader: Vite dev server for Primer; Carbon stays on its CDN — REMOVED

- **Date:** 2026-04-27, removed 2026-05-17

### Status
Removed. `compare.html`, `vite.config.js`, and the `vite` / `react` / `react-dom` / `@primer/react` / `@primer/primitives` devDependencies were deleted once v1 locked. The side-by-side comparison was design-time scaffolding for the original component build; the kit's 14 components are settled, so the tool no longer earns its build step. Primer and Carbon source remain cloned under `refs/` (gitignored) for v2 component research; we'll read them directly instead of rendering them. If v2 needs a live side-by-side view, we'll revisit the loader approach then.

### Why the removal
- The kit shipped v1 without further visual-comparison work being needed.
- Vite + React + Primer added 41 transitive packages and a `dev` script consumers had no reason to touch.
- Keeping a half-used build tool around invites confusion about whether the kit itself needs a build step (it doesn't — `index.html` stays buildless).
- The original buildless-attempts research (esm.sh CSS-module redirects, UMD peer-version mismatches) stays recorded in `HISTORY.md` so a future revisit doesn't redo that investigation.

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

In use: `--input-border`, `--placeholder-color`, `--ctrl-bg` / `--ctrl-hi` / `--ctrl-lo`, `--mark-fg`, `--sortable-dot` / `--sortable-shadow`, `--sortable-label` / `--sortable-placeholder`, `--slider-fill`. Each is defined once in `.panel-dark` and once in `.panel-light` with the value appropriate to that panel.

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

## 0012 — Stateful indicators: bevel on unselected, flat on selected

- **Date:** 2026-05-14 (rewritten same day; see `HISTORY.md` for the prior version)

### Decision
Indicators that visualize their own selection state read as **beveled in the unselected state (clickable affordance)** and **flat with a mark in the selected state (confirmed)**.

- **Unselected (clickable):**
  - **Checkbox (sharp-cornered square):** solid `--bevel-bg` + `2px` real CSS borders with directional colors — top + left `--bevel-tl` (highlight), right + bottom `--bevel-br` (shadow). Same construction the rect button and dropdown use, just at indicator scale. Real borders miter at 45° where adjacent colors meet, matching the button's corner geometry. "Press me to select."
  - **Radio (circle):** the round-button look — outer gradient frame `from-bevel-br to-bevel-tl` + inner pill `from-bevel-bg to-pill-inner-top`. Same vocabulary the round button uses for its pressable surface.
- **Selected (confirmed):**
  - **Checkbox:** solid `--bevel-bg` + `2px` real CSS borders, uniformly `--input-border` on all four sides (directional bevel colors swap to a flat hairline). Same border-width as the unselected state, so the inner content area doesn't shift between states. Center mark: CSS-drawn checkmark — a `w-[6px] h-[12px]` div with `border-right` + `border-bottom` at `2.5px`, rotated 45deg, translated `-1.5px` y / `0.5px` x for optical centering. Sharp pixel edges, longer rising stroke. Color `--mark-fg`.
  - **Radio:** flat `--bevel-bg` with a `2px` real CSS border in `--input-border` around the full circle — same width and color as the checkbox selected-state ring, so the two selected states share one frame vocabulary. Outer `25×25` stays fixed (border-box), so the radio's perceived outer edge doesn't shift between off and on. Center mark: `9px × 9px` solid circle in `--mark-fg` (sized against the 25px outer per the perceptual-bump rule in `0013`).

**Applies to:** checkbox, radio. Each ships as a single variant — checkbox is always sharp-cornered square, radio is always circle (see `0013` for why these two components break the rect/round axis).

**Does not apply to:** toggle thumb and slider thumb. Those are handles, always beveled regardless of state. State for toggle is track color plus thumb position (`0017`). State for slider is filled-portion width plus thumb position (`0019`).

### Why
- **Bevel reads as "press me" on first glance.** A raised bevel (light top-left, dark bottom-right) looks like an empty button waiting to be activated. That's the right affordance for an unselected indicator.
- **Flat with a sharp mark reads as "done" on first glance.** A clean box with a check or fill says "this one is on." Maximum legibility at the smallest target sizes.
- **Earlier attempt (flat off / bevel selected) failed the obviousness test.** The "I pressed it and it stayed in" metaphor was logically clean but visually heavy for selected checkboxes — too busy, the bevel competed with the check glyph. Inverting the pattern lets the selected state be the calm one and the unselected state carry the visual energy.

### Construction: real CSS borders, not inset box-shadow
An earlier version of the checkbox used `bg-gradient-to-t from-bevel-br to-bevel-tl` + `box-shadow inset 2px 2px 0 var(--bevel-tl), inset -2px -2px 0 var(--bevel-br)` to build the bevel. That collided with itself: the gradient's bottom anchor is `--bevel-br`, and the bottom inset shadow is also `--bevel-br`, so the bottom edge disappeared (especially visible in light mode where the bevel range is compressed). It also meant the four corners met as overlapping rectangles rather than the 45° diagonal that real CSS borders produce on the rect button.

Switching to a solid `--bevel-bg` background plus `2px` real CSS borders with per-side colors fixes both: every edge contrasts against the uniform fill, and adjacent border colors miter at 45° — the same corner geometry the button uses. Keeping the same `2px` width in the selected state (uniform `--input-border`) means content area is constant, no layout shift.

### Checkmark geometry
Unicode `✓` in Departure Mono is too small and slightly rounded at our indicator size. The CSS-drawn replacement gives:
- Sharp pixel-aligned edges (no font hinting variance).
- Explicit width-to-height ratio (~1:2) for the asymmetric proportions of a real check.
- Single color via `border-color`, no glyph metric drift.

### Tradeoff
The unselected state is visually heavier than a typical "empty box" checkbox. Acceptable: mirk's stance is "obvious," and an unselected indicator should still telegraph its interactivity. Multiple unselected checkboxes in a column may read busier than a clean column of flat outlines — to be reviewed at form scale.

### Source comparison
Primer and Carbon both use flat outlines for unselected and solid-fill + check for selected (the inverse of mirk's previous rule, and now the same direction as mirk's new selected state). The novelty here is making the **unselected** state visually rich — neither reference does this. The bet: clarity-at-a-glance beats convention.

---

## 0013 — Rect vs round axis: per-component mapping

- **Date:** 2026-05-14

### Decision
Every component ships in two variants on a sharp-vs-softened axis. What "round" means is component-specific.

| Component | Rect | Round / Rounded |
|---|---|---|
| Textarea | `rounded-none` | `rounded-[5px]` |
| Number | rect frame, sharp ▲▼ mini-buttons | rounded 5px frame, same internal buttons |
| Checkbox | sharp-cornered square indicator (single variant — see "Axis exceptions" below) | — |
| Radio | circular indicator with circular fill (single variant — see "Axis exceptions" below) | — |
| Toggle | rectangular track plus rectangular thumb | pill track plus circular thumb |
| Slider | rectangular thumb on rectangular track | circular thumb on pill track |
| Date / Time / Datetime / Date range | `rounded-none` frame | `rounded-[5px]` frame |
| File picker | rect bevel button — Compact or Button+Text style (see `0022`) | round-pill button — Compact or Button+Text style (see `0022`) |
| Image input | sharp preview frame + rect button | 5px-corner preview frame + round-pill button |
| Tags | sharp chips on a sharp wrapper | pill chips on a 15px-cornered wrapper |

### Naming
"Round" means fully-pill. "Rounded" means softened-but-still-square (5px). Each component picks the label that matches its shape. Consistent axis, different vocabulary per component.

### Axis exceptions: checkbox and radio
Checkbox is **always** a sharp-cornered square. Radio is **always** a circle. Neither ships a second variant.

**Why these two are exceptions.** Shape is part of the standard convention for these controls, and breaking it confuses users at the very moment the kit's "obvious" stance is supposed to pay off. A rounded checkbox reads as something other than a checkbox; a square radio reads as a tile or button. We tried both during the scaffold pass and pulled them on visual review.

The rect/round axis still exists for everything else — these two just don't sit on it.

### Sizing: round indicators get a perceptual bump
A circle inscribed in a `w×h` box looks smaller than a square of the same `w×h` because the circle's area is `π/4 ≈ 78%` of the square's, and the visual weight is closer to area than to bounding-box. Matching the bounding box makes the round variant feel undersized next to its rect sibling.

Rule: when a round indicator sits in the same visual family as a rect one, give the round one a bigger bounding box so they read at the same weight.

Current sizes:
- Checkbox rect, checkbox rounded, radio rect: `22×22px`.
- Radio round: `25×25px`.

Applies wherever shape changes inside a shared indicator family. If a future component pairs a square and a circle at the same nominal size, the circle gets the bump.

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

## 0016 — Radio: square-radio exception for the rect variant — REMOVED

- **Date:** 2026-05-14, removed 2026-05-15

### Status
Removed. Radio now ships as a circle only (no rect variant). The original "fill the rect column of the axis with a square radio" idea was abandoned because a square radio reads as a tile or button rather than a radio — the convention that radios are round is doing real work for users, and breaking it costs more in clarity than the axis-completeness gains. See `0013` "Axis exceptions" for the current rule, and `HISTORY.md` 2026-05-15 for the reasoning.

---

## 0017 — Toggle: transparent track, darker thumb via per-panel control vars

- **Date:** 2026-05-14 (revised same day; see `HISTORY.md`)

### Decision
The toggle is a **track** (container) plus a **thumb** (handle).

- **Track:** **transparent background** — the panel canvas shows through. 1px `--input-border` outline only. No fill change on state (track stays the same; thumb position encodes state).
- **Thumb:** mini bevel using a distinct per-panel color palette so the toggle doesn't share the bevel-button palette. Three new vars per panel:
  - `--ctrl-bg` — solid thumb base
  - `--ctrl-hi` — bevel highlight (top-left side)
  - `--ctrl-lo` — bevel shadow (bottom-right side)
  - Light panel: `#8C7660 / #A89078 / #6E5C49` (medium browns).
  - Dark panel: `#5F6582 / #7780A0 / #3F4459` (medium blue-grays).
- **Thumb structure:**
  - **Rect:** `bg-[var(--ctrl-bg)]` + 4-side bevel via colored borders (`border-t/l = --ctrl-hi`, `border-r/b = --ctrl-lo`).
  - **Round:** outer gradient `from-ctrl-lo to-ctrl-hi` ring + inner solid `--ctrl-bg` pill. Mini round-button construction, but in the control palette, not the bevel palette.
- **State:** native `<input type="checkbox">` with `role="switch"`, visually hidden via `sr-only`. Thumb position driven by `translateX` on `group-has-[:checked]:`.

### Why these changes
- **Transparent track.** The original `--bevel-bg` track fill looked "pasty" in light mode — a beige thumb on a beige track had insufficient contrast. Letting the panel canvas show through gives the toggle its visual rhythm from the thumb alone.
- **Dedicated control palette.** Reusing `--bevel-tl/br` made the toggle thumb look like a tiny version of a bevel button, which read as a button-press affordance rather than a toggle state. A darker brown / lighter blue-gray distinguishes "this is the toggle's prominent color" from "this is a button."
- **Thumb stays beveled in both states.** A handle that flattens when off stops reading as a handle. The `0012` "flat on selected" rule applies to indicators that ARE the state visualizer (checkbox, radio). The toggle's state visualizer is thumb position, not the thumb's surface, so the thumb keeps its bevel regardless of state.

### Apply
- `--ctrl-bg/hi/lo` are defined in both `.panel-dark` and `.panel-light` (per `0010`). Same names, different values per panel.
- The slider's filled portion reuses `--ctrl-bg` for visual consistency with the toggle thumb (`0019`).

---

## 0018 — Segmented control: removed from scope

- **Date:** 2026-05-14 (originally locked same day; removed same day after visual review — see `HISTORY.md`)

### Decision
**Removed from mirk's scope.** Visual review on 2026-05-14 flagged the segmented control as the weakest part of the kit, and a radio button group covers the same affordance with a more familiar pattern.

Removed from:
- `README.md` Component scope (Choice family)
- `PLAN.md` build order (item 07 deleted)
- `experiments/experiments.html` (sections removed in both panels)

### Why
- The component does one job: "pick one from a small horizontal set of options." Radio button groups do that job and we already ship two radio variants (`0016`).
- Visually it occupied a middle ground that didn't read as either "row of buttons" or "row of radios" — neither metaphor was clear at a glance, which violates the kit's stance.
- The locked construction (grouped radios with sibling-selector CSS, 3px constant border, end-cap radius on round) was workable but never visually settled.

### Revisit trigger
A real use case where neither radios nor a select handles the choice cleanly (e.g., a 2-3 option toggle inside a dense form row where radios would burn vertical space). No current need.

---

## 0019 — Slider: beveled thumb, flat filled portion

- **Date:** 2026-05-14 (filled-portion treatment revised same day; see `HISTORY.md`)

### Decision
Native `<input type="range">` is unstylable enough across browsers that mirk's bevel aesthetic can't be reached with CSS alone. We render the visual layer in CSS divs and let the native input drive state.

**Construction:**
- Wrapper `<div data-slider style="--value: 60%">` houses:
  - the native `<input type="range">` overlaid `opacity: 0` with `z-10` to capture pointer, drag, and keyboard;
  - a track div sized to the full width, `--canvas` fill (page background, so the unfilled portion reads as a slot cut into the page), 1px `--input-border` running uninterrupted around the entire track (both sides of the thumb);
  - a filled div sized to `width: var(--value)` with a **flat solid color** in `--slider-fill` (a per-panel token; see below);
  - a thumb div positioned at `left: var(--value)` with `-translate-x-1/2`.
- Rect thumb: `w-[21px] h-[24px]`, no rounded corners, `bg-[var(--toggle-bg)]` + `3px` bevel borders (top + left `--toggle-hi`, right + bottom `--toggle-lo`). Thicker borders than the standard `2px` bevel because the slider thumb is bigger than other beveled elements in the kit and the bevel needs the extra weight to read clearly at this size.
- Round thumb: `w-[24px] h-[24px]` circle (`rounded-full`), outer gradient `from-[var(--toggle-lo)] to-[var(--toggle-hi)]` + solid inner pill `bg-[var(--toggle-bg)]` inset 2px. Sized noticeably larger than the toggle Round thumb (`20×20`) so the slider's gradient ring carries weight on its own against the slim track.
- Wrapper: `relative h-[32px] w-full` to host the taller thumb plus a few pixels of padding for focus offset. Track sits centered inside.
- Both variants: thumb has no internal grip pattern. The thumb's own size + bevel/gradient is the affordance.

**JS (per `0014`):** wire `input` event on the range to mirror `.value` into `--value` on the wrapper.

### Why flat filled portion
Earlier version used a `from-bevel-br to-bevel-tl` gradient on the filled portion. Visual review found the gradient read as "this is interactive" — the same cue the beveled thumb already carries. Duplicating that cue on the filled length made the whole control feel too prominent. With a flat fill, the thumb carries "drag me" and the filled length just says "this much value." Different jobs, different visual weights.

### Why `--canvas` track and `--slider-fill` filled portion
Earlier rounds tried `--bevel-bg` as the track + `--ctrl-bg` as the fill (too dark/loud), then `--canvas` track + `--bevel-bg` fill (right direction, but the dark-mode fill at `#1D1F2F` sat too close to the dark page tone — the filled portion didn't read distinctly enough). Final layout: track is `--canvas` so the empty channel reads as a slot cut into the page; filled portion is `--slider-fill`, a new per-panel token that resolves to `--bevel-bg`'s value in light mode (`#e9d3bd`, no visible change) and a step lighter (`#232639`, same as `--bevel-hover-bg`) in dark mode. The asymmetry exists because dark mode's `--bevel-bg` and `--canvas` are close in lightness, so the fill needs an extra nudge to stay legible; light mode's `--bevel-bg` already contrasts plenty against `--canvas`. 1px `--input-border` continues to run uninterrupted around the whole track, reinforcing the slot read.

### Why the thumb uses the toggle palette but its own bigger/taller geometry
The thumb tokens are `--toggle-bg` / `--toggle-hi` / `--toggle-lo` (per `0017`) so the slider and the toggle thumb share one "handle" color family, visually distinct from the bevel-button palette. But the slider thumb's geometry is its own: `21 × 28` rect / `22 × 30` pill, both noticeably bigger and taller than the toggle thumb (`18 × 18` / `20 × 20`), and the Rect thumb uses `3px` bevel borders instead of `2px`. Reason: the slider thumb sits over a much thinner track than the toggle thumb sits inside, so the slider thumb has to carry the whole "this is a grippable handle" read on its own, without a surrounding frame the way the toggle thumb has its track. Earlier attempts that matched the toggle thumb's exact dimensions (`18 × 18` rect / `20 × 20` round) looked undersized and flat — the bevel and gradient didn't read distinctly enough at that scale against a slim track. The pill shape on the Round variant — taller than wide rather than circular — was selected after a side-by-side mockup comparison against grip-lined and dot-grid alternatives; the clean pill won on the kit's "obvious" stance (size + bevel carries the affordance without needing decorative grip marks).

### A11y
Native range handles arrow keys, value announcement, form submission. The `<input>` captures interaction at `opacity: 0`. The visual divs are decorative.

---

## 0020 — Date / time / datetime: confined picker indicator preserves typing

- **Date:** 2026-05-14 (revised same day; see `HISTORY.md`)

### Decision
Native UA chrome on `<input type="date">`, `time`, and `datetime-local` varies wildly across browsers. We suppress it and overlay a Departure Mono glyph on the right edge, same pattern the dropdown uses for its `›` chevron.

- `::-webkit-calendar-picker-indicator { opacity: 0 }` positioned absolutely **on the right edge only** (right: 0; top: 0; bottom: 0; width: 44px). Clicks on the right strip open the native picker. Clicks on the rest of the input focus a typing segment.
- `::-webkit-inner-spin-button { appearance: none }` and `::-webkit-clear-button { appearance: none }` to suppress Webkit's spinner and clear chrome.
- Glyph overlay is `pointer-events-none` and sits inside the same right-edge zone so it appears to be the picker button.

### Why a confined indicator (not full-input)
Earlier version positioned the indicator with `inset-0`, covering the whole input. Clicking anywhere opened the picker, which felt convenient but stole the typing affordance — users couldn't focus a specific segment (year/month/day) to type into it. Confining the indicator to the right edge restores both affordances: type on the left, click the glyph on the right.

### Glyphs (initial choices, tunable in experiments)
- Date: `□`.
- Time: `◌`.
- Datetime: `□`.

### Result
Closed-state visual matches text-input and dropdown across all browsers. Native picker opens via the right-edge zone. Native keyboard typing into segments works on the rest of the input.

---

## 0021 — Date range: two date inputs plus JS cross-validation

- **Date:** 2026-05-14

### Decision
"From" and "to" are two ordinary date inputs (per `0020`) separated by a `→` glyph. Minimal JS (per `0014`) keeps the constraint:
- `start.change` sets `end.min = start.value`.
- `end.change` sets `start.max = end.value`.

A single combined-popup picker would buy a marginally nicer UX at the cost of a calendar-rendering library. Not worth the bytes.

---

## 0022 — File picker: ship all four variants on a 2×2 style × corner matrix

- **Date:** 2026-05-15

### Decision
File picker ships as four named variants on two independent axes:

| Style \ Corner | Rect | Round |
|---|---|---|
| **Compact** — small chip-like button lives *inside* a shared container that also holds the filename text | sharp-cornered container + rect mini-button | `rounded-[15px]` container + pill mini-button (deviates from the kit's general 5px "softened" corner; same reason as Tags Round in `0024` — wrapper sits adjacent to pill geometry and needs a larger radius to unify visually) |
| **Button + Text** — full-size bevel button next to plain filename text, no shared container | rect bevel button + filename text | round-pill button + filename text |

All four sit in `experiments/experiments.html` and ship as documented siblings, not alternatives. Consumers pick whichever matches the surrounding form's density.

### Why ship all four instead of picking one
The two styles serve genuinely different contexts:
- **Compact** packs a complete affordance into a single frame — good for forms with many fields where every input wants the same outer rectangle for vertical rhythm.
- **Button + Text** treats the button as a peer to surrounding buttons, with the filename as freestanding metadata — better when the file picker sits in a row with other actions rather than a column of fields.

A locked single style would force the wrong fit in roughly half the contexts. The kit's existing rect/round axis (`0013`) already accepts that one decision per component isn't enough; the file picker just needs a second axis on top.

### Construction (shared across all four)
- Hidden `<input type="file">` inside a `<label>` that styles as the button surface — same label-as-button pattern as buttons (`0014` JS exception only covers reading `input.files[0].name` and writing the filename into the label).
- Bevel direction matches the kit's pressable rule (light top-left, dark bottom-right).
- Filename frame (Compact) or filename text (Button + Text) uses container styling: flat `--bevel-bg`, 1px `--input-border`, no bevel. Per `0009`'s container-vs-pressable distinction.

### Open: image input
`0023` (image input) currently uses Button + Text style for its upload button. Whether image input should also ship in all four variants is deferred — it's a different problem because image input also has a preview square, and the preview makes Compact-style "container holds button + filename" redundant (the preview already is the visual filename).

---

## 0023 — Image input: file picker plus FileReader preview

- **Date:** 2026-05-14

### Decision
Uses a hidden `<input type="file" accept="image/*">` inside a label-as-button (same construction pattern as the file picker, see `0022`). Adds a preview square above the button:

- Preview frame: container styling (flat, 1px `--input-border`), aspect-square at a thumbnail size.
- Empty state: muted "No image" placeholder text centered.
- On `input.change`: `FileReader.readAsDataURL(file)`, then set `<img>` `src` and swap visibility. This is the FileReader exception named in `0014`.

### Style
Image input adopts the **Button + Text** style from `0022` (full-size bevel button below the preview), in matching Rect or Round corner. Compact-style isn't useful here: the preview already plays the role Compact's filename frame plays in the plain file picker, so wrapping the button inside another container would just add an outer rectangle that duplicates the preview's frame.

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
- Round: gradient-frame pill chips, 15px corners on the wrapper. (Deviates from the kit's general 5px "softened" corner — the Tags wrapper sits at a larger padding scale and reads sharp at smaller radii against its pill chip contents.)

### Spec updates
- `README.md`'s no-DIY-JS bullet now references `0014`.
- `PLAN.md` deferred list loses tags; build order gains "19 — Tags".

---

## 0025 — Sortable: drag handle dots, dedicated per-panel tokens, L-shape border

- **Date:** 2026-05-15

### Decision
"Sortable" is a reorderable row: a small drag handle on the left, a wrapper container holding two stacked text inputs ("Link name" + "Link URL") on the right. The whole row reads as one draggable card.

**Construction:**
- Wrapper: `flex flex-row max-w-md bg-[var(--bevel-bg)] border-[1px] border-solid border-[var(--input-border)]`.
- Handle strip: `w-[28px] cursor-grab active:cursor-grabbing` with a single `1px --input-border` on its right edge — same hairline as the divider between the two stacked inputs, so the row reads as three flat sections inside one frame. The handle is intentionally not beveled: the dot grid itself carries the "grippable surface" cue, and a bevel around the strip would compete with the wrapper's own frame.
- Dot grid: `grid grid-cols-2 gap-[3px]`, 8 dots × 4px each (2 wide, 4 tall).
- Inputs stack: two stacked `<input>`s sharing the wrapper frame, separated by a 1px `--input-border` divider on the top input (the same hairline used on the handle's right edge).
- Mini uppercase labels above each input use `text-[var(--sortable-label)]` (no opacity — per `0011`'s explicit-color principle).
- Placeholders use `placeholder:text-[var(--sortable-placeholder)]`, not the kit's general `--placeholder-color`, because the Sortable's smaller framed inputs read better with a slightly lighter placeholder (one notch up the lightness scale from the standard input placeholder).

**Dot color tokens (per `0010`):**
- Light: `--sortable-dot: #e2c5a6;` `--sortable-shadow: #c7a47f;` — warm tans, dot one step above `--bevel-bg`, shadow one step below it.
- Dark: `--sortable-dot: #393f5b;` `--sortable-shadow: #111527;` — cool blues, dot a few shades above bg, shadow near-black.

**Label and placeholder tokens (per `0010`):**
- Light: `--sortable-label: #3c332a;` (high-contrast warm dark brown for the mini caps), `--sortable-placeholder: #99826c;` (one notch lighter than the kit's `--placeholder-color` so the smaller framed inputs read evenly).
- Dark: `--sortable-label: #edeef2;` (near off-white, slightly cooler than `--bevel-fg`), `--sortable-placeholder: #6f7695;` (one notch lighter than the standard `--placeholder-color`).

**Shadow as L-border (not diagonal drop-shadow):**
Each dot uses three stacked `box-shadow`s:
- `1px 0 0 0 var(--sortable-shadow)` — right column.
- `0 1px 0 0 var(--sortable-shadow)` — bottom row.
- `1px 1px 0 0 var(--sortable-shadow)` — bottom-right corner.

Result: the dot's 4×4 footprint expands to a 5×5 region with a 1px-thick L wrapping the right and bottom edges. Reads as a tactile sticker. The single-shadow diagonal drop variant (`1px 1px` alone) skipped the top-right and bottom-left corner pixels and read weaker.

### Why dedicated tokens, not reused bevel/ctrl vars
Tuning showed the sweet spot for both dot and shadow lives between the existing bevel and ctrl tokens — close to `--bevel-br` in dark mode, between `--bevel-hover-bg` and `--input-border` in light. Reusing any single existing token forced a compromise (too dim, too bright, or wrong saturation). Two new per-panel vars keep the dots tunable without disturbing other components.

### Why 8 dots @ 4px
Earlier rounds (6 dots and 2px dots) read sparse or too small — the handle didn't telegraph as a grippable surface. 2×4 at 4px gives a real texture inside the 28px strip without crowding.

### Scope
- Visual only. Reordering JS is out of scope; `cursor-grab` is the only affordance today. Wire drag/drop when a real consumer needs it.
- Single variant. No rect/round axis yet: the wrapping container is rectangular. Follow `0013`'s pattern if a rounded version becomes useful.

---

## 0026 — Architecture (v2): semantic BEM classes in `@layer components`, hand-written `mirk.css`

- **Date:** 2026-06-04

### Context
v1 shipped each component as a copy-paste block of Tailwind utility classes plus a `mirk.css` *compiled* from `mirk-input.css` against utilities scraped from `index.html`. That pipeline drifted (`mirk-input.css` held pre-resize toggle/slider colors while `index.html` moved on) and forced Tailwind on every consumer. v2 converts the *finalized, locked* styles into a maintainable form without changing how anything looks or behaves. See `mirk-ui-guide.md`.

### Decision
- **Components are semantic BEM classes** (`mirk-button`, `mirk-button--round`, `mirk-checkbox__box`) in `@layer components`. The block prefix is `mirk-`, `__part` only when structure requires it, `--variant` for shape/size (medium is the unmodified base).
- **`mirk.css` is hand-written and is the product.** It declares `@layer base, components;` at the top, so it renders standalone and merges into Tailwind's order when present. No build step; the npm "build" is a copy.
- **Utilities always win.** Because components sit in `@layer components`, `class="mirk-input w-full px-8"` overrides with zero `!important`. Tailwind is optional, never required.
- **Theming via `light-dark()` + `color-scheme`.** The 28 tokens collapse from four duplicated blocks to one value each; `.light` / `.dark` / `[data-theme]` flip `color-scheme` (and paint their own canvas). Every token is namespaced `--mirk-*`, including the per-instance slider `--mirk-value`.
- **`mirk.js` is delegated, not `init()`-based.** One `document` listener per interaction handles every current and future element, so injected / re-rendered / saved-and-reopened markup works with no setup. Initial state lives in the markup so `outerHTML` round-trips.
- **`index.html` is rebuilt on the classes** and is the proof + the docs. `mirk-input.css` is retired.

### Deviations from the guide (and why)
- **`--mirk-focus-offset` keeps its 2px light / 3px dark split** (the guide unified to 2px). It is the one non-color token, so `light-dark()` can't carry it; we preserve exact v1 behavior with a one-line override under the dark selectors.
- **`mirk-select` keeps `appearance: none` + a styled `__chevron`**, not `appearance: base-select` / `::picker(select)`. base-select would change the closed-control rendering and isn't cross-browser yet; the chevron approach renders identically everywhere today. base-select is a future enhancement.
- **Tailwind path is `@import "mirk-interface/mirk.css"`, not a JS `@plugin`.** Tailwind v4 plugins inject CSS-*in-JS* objects, not raw CSS, so a `@plugin` would either duplicate `mirk.css` in JS (the exact drift this rework removes) or land components in the wrong layer. The CSS import delivers the same ergonomics — utilities override mirk — with zero duplication.

### Verification
The conversion changed *form*, not *pixels*. Confirmed by a computed-style + geometry diff (width, height, padding, border widths/colors, background, gradients, radius, font, transforms) across all 27 demos in both the light and dark columns: **zero meaningful differences** between the v1 utility markup and the v2 semantic classes. Remaining computed-string differences are non-visual (inline-block→inline-flex blockification with identical box metrics; Tailwind's explicit `0%`/`100%` gradient stops vs the implicit defaults; `rounded-full`'s `3.35e7px` vs `9999px`, both fully round; and the color of zero-width borders).

---

## 0027 — Built-in brand variant: "Pixel Quiet" via `data-theme="pixel-quiet"`

- **Date:** 2026-06-15

### Context
"Pixel Quiet" began as a hypercms sidebar direction (`cms-sidebar/pixel-quiet/`, ported to `hypercms/src/theme/pixel-quiet.overrides.css`): the same warm cream + Departure Mono soul as mirk's default, with the bevel contrast turned way down — a calm, glanceable register. There it was scoped to the CMS shell and bundled with panel geometry. We promote the *palette half* into the kit as a first-class, opt-in brand variant.

### Decision
- **Ship Pixel Quiet built in**, as a single `[data-theme="pixel-quiet"]` token block in `mirk.css` (placed after `:root`, equal specificity, source order wins). This is the brand-theme escape hatch the guide already documents (§4), used for real rather than as a stub.
- **Authored with `light-dark()` like `:root`**, so palette and mode stay orthogonal: the variant follows the OS by default and still flips with `.dark` / `.light` / `[data-theme="dark"|"light"]`. `<body data-theme="pixel-quiet" class="dark">` is pixel-quiet, forced dark.
- **Only tokens, no component edits.** Soft near-equal bevel, warmer ink (`#2B241B`), terracotta destructive (`#C24A3A`), deeper navy-black dark. `--mirk-radius` / `--mirk-focus-offset` inherit unchanged; the unused `--mirk-ctrl-bg` is omitted.
- **Slider tokens filled in.** The CMS form had no slider, so the source lacked `--mirk-slider-*`. The nub reuses the toggle family (identical pairing in `:root`); `--mirk-slider-fill` is the one newly-chosen value (a soft warm / muted navy track), tuned by eye.
- **Showcase demonstrates it with a live switcher**, not a duplicated section: a `mirk-select--small` pinned top-right flips `data-theme` on `<html>`, re-theming both the dark and light columns (and the switcher itself) at once. Demo chrome, not part of the kit.

### Follow-up (not done here)
hypercms can later drop its duplicated token retune and just set `data-theme="pixel-quiet"` on the shell, keeping only its geometry, making the kit the single source of truth for the palette.

---

## 0028 — Complete the small-size family: `--small` on checkbox, radio, toggle, slider, date, file, tags, sortable

- **Date:** 2026-06-16

### Context
Only button, input, number, and select shipped size modifiers (`--small` / `--large`). The
remaining form controls were single-size. That left the size axis incomplete: you could not
build a dense form with small checkboxes, toggles, sliders, sortable rows, etc. to match small
inputs.

### Decision
- **Add `--small` to checkbox, radio, toggle, slider, date, file, tags, and sortable**, matching
  the established small scale (14px text + proportionally scaled geometry, ~0.8×). Pure additions in
  `@layer components`; no base rule changed, so it is backward compatible.
- **sortable `--small`** tightens the grip width (28→24px), row padding, and field/label type
  (18→14px field, 11→10px label) while keeping all 8 grip dots at their base 4px — per `0025`,
  smaller dots read as too sparse, so the texture stays put and only the surrounding geometry shrinks.
- **Small only, not large.** button/input/number/select also have `--large`, but the request
  was small, and dense UIs are the real driver. `--large` for these seven stays a future ask.
- **Composition holds.** `--small` combines with existing shape variants via higher-specificity
  combined selectors (`.mirk-toggle--round.mirk-toggle--small`, same for slider; tags round).
- **file `--small` composes with `--compact`** (`--compact --small` = densest) and works on the
  button+text layout too; the upload trigger takes `mirk-button--small` (composable, the kit way),
  matching how `--compact` already expects a small trigger.
- **Out of scope:** textarea and image (image already has `--compact`); a "small textarea" is
  marginal. Left as an optional follow-up.

### Verification
Browser-checked in both light and dark columns: computed metrics exact (checkbox box 18px, radio
ring 20px, toggle track 42px, slider height 24px, date/tags text 14px, file compact name 13px,
sortable field 14px / grip 24px), toggle thumbs and slider nubs seated within their tracks, 0
console errors. README per-component size notes updated from "no size modifiers".

The small variants are demonstrated **inline in each component's own section** as a `copy MD` /
`copy SM` stack (mirroring how button/input/select show their sizes), not in a separate gallery —
an initial standalone "Sizes • Small" gallery was folded into the per-section demos so each
component documents its own size axis in place.

---

## 0029 — Chip: elevated recovery treatment as the default; remove `--solid`

- **Date:** 2026-06-30

### Context
The `mirk-chip` is a collapsible data-recovery prompt (used in hyperclayjs's clobber-watch: a pill
that expands into a before/after of work about to be lost). It originally sat flush with the page in
flat surfaces. We had two candidate looks side by side, prototyped the elevated "reference"
treatment against the flat one, then folded in three refinements as a Phase-2 variant before
promoting the whole package to the chip's shipped default.

### Decision
- **The chip ships as an elevated object.** The expanded state is a raised panel (its own
  `--mirk-bg` surface, hairline outline, soft drop shadow); the collapsed state is a round pill with
  its own lighter lift. Both elevation tiers are themed light/dark via `@media (prefers-color-scheme)`
  plus `.light`/`.dark` overrides (the `light-dark()` function can't take a box-shadow, so this
  mirrors the established `--focus-offset` pattern).
- **The primary action is a real kit bevel button** (new `mirk-chip__action--primary` part). Its
  `--mirk-bevel-*` palette is derived from the chip's primary fill via `color-mix` (lighter
  top-left, darker bottom-right, brighter hover), so it embosses *in the primary color* on any theme
  rather than showing a flat one-sided border.
- **The primary fill is a bold accent in the default theme** (`--mirk-chip-primary-bg:
  light-dark(#1C170E, var(--mirk-fg))` — warm brown in light, fg ink in dark). Pixel Quiet resets it
  to its own fg, no brown.
- **The chip exposes 5 override hooks** (`--mirk-chip-surface`, `-edge`, `-primary-bg`, `-primary-fg`,
  `-alert`); four point at generic kit tokens, only `-primary-bg` carries a chip-specific value
  (reinforces `0010`, per-component vars defaulting to generic tokens).
- **`--mirk-button--solid` is removed from the kit.** It was a flat ink-fill variant added
  speculatively for a "strongest control" register; nothing ever used it, and it contradicts the
  kit's core affordance. `--quiet` stays (the dismiss uses it; a deliberately recessive tertiary,
  not a flat primary). The alert glyph also moved from an inline SVG `fill="var(...)"` attribute to
  a CSS rule (`.mirk-chip__warn { fill: var(--mirk-chip-alert) }`), keeping color in the stylesheet.

### Why this over the alternatives
The chip is not a page element, it is a **meta-layer addressed to the user on top of the page**, so
it must read as separate from the page. That separation is the job of the elevation: the floating
panel and the lifted pill say "this is above your content, deal with me." The boldness of the
styling is then tuned to the **stakes of the message**. This particular chip is an *alarm* (recover
your data or lose it), so it earns the loudest register the kit allows: a raised surface, a bold
accent fill on the primary action, an embossed call-to-action. A calmer notice would dial the same
vocabulary down (a quieter accent, a softer lift). The rule that keeps this from fracturing a
neutral kit: **every one of these opinions is expressed through kit tokens and kit button
vocabulary, never through one-off styling.** The primary's bold color is a token; the embossed CTA
is a real `mirk-button` bevel derived from that token, not a bespoke shape. So the chip is allowed
to be loud, but it is loud *in the kit's own language*, which is why it still belongs in a neutral
kit.

Removing `--solid` follows from the same logic in reverse: in mirk a button looks clickable
*because it is embossed* — the bevel is the affordance. A flat-filled button reads as a block, not a
control, so the kit has no "solid" register; the strongest action is a brighter bevel.

### Verification
Browser-checked (agent-browser, isolated local session) in both light and dark columns across all
three chip states. Nested `light-dark(#1C170E, var(--mirk-fg))` resolves correctly: default light
primary = rgb(28,23,14) = #1C170E; default dark = fg-derived rgb(246,247,249); Pixel Quiet light =
its own fg, not brown. Embossed primary shows a genuine bevel (light column tl=rgb(82,79,72),
br=rgb(19,16,10) derived from the brown; dark column br=rgb(167,168,169)), not a flat border.
Showcase reduced to 6 clean chips (3 states × dark/light columns), comparison scaffold removed, 0
console errors. After removing `--solid`: zero rendered usages anywhere, no visual change.

### Record-keeping note
The exact hex (`#1C170E`) and shadow values are tuning details that live in code, not here — per the
DECISIONS scope rule that excludes individual CSS values. What's recorded is the *principle*
(treatment matches the stakes; loudness expressed in kit vocabulary). Per-step history is in
`HISTORY.md` (2026-06-30); the full conversation shape is in
`plans/mirk-interface/chip-elevation-conversation-shape.md`.
