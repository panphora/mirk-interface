# mirk

A form-focused HTML/CSS UI kit. Fourteen components as **semantic BEM classes** in one hand-written CSS file, plus one tiny delegated script. No build step, no React, no web components, Tailwind optional. Published as `mirkui` on npm.

Live showcase: open `index.html` in any browser or static server.

## Use mirk on your page

1. Add the **two tags** below (once).
2. Copy any component snippet from the showcase, paste it where you need it.
3. Use the semantic classes: `class="mirk-button mirk-button--round"`.

The kit follows the visitor's OS theme by default; `class="dark"` / `class="light"` (or `data-theme="dark"` / `"light"`) on any wrapper forces a mode.

### Install paths

**Primary — drop-in, zero install, no Tailwind:**

```html
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/mirkui@2/mirk.css">
<script src="https://cdn.jsdelivr.net/npm/mirkui@2/mirk.js"></script>
```

`mirk.css` ships the font, the 28 theme tokens, and all fourteen components. It renders fully on its own. This is the path for a single-file HTML artifact, a Hyperclay app, a Rails view, a static page.

**Optional — Tailwind, to override mirk classes with utilities:**

```css
@import "tailwindcss";
@import "mirkui/mirk.css";
```

Now `class="mirk-input mirk-input--large w-full font-sans"` works: utilities win over the component layer (mirk lives in `@layer components`), with zero `!important`. Tailwind is never required.

## How it works (two hinges)

1. **Components live in `@layer components`.** Tailwind v4 emits `@layer theme, base, components, utilities`, so utilities always win. `mirk.css` declares its own `@layer base, components;` up front, so it is self-sufficient without Tailwind and still slots into Tailwind's order when present. Override any mirk class with a utility, no specificity hacks.
2. **`outerHTML` round-trips the visible state.** mirk targets malleable HTML (Hyperclay). Native elements hold their own state (`checked`, `value`), CSS-only state needs no JS (`:checked`, `:has()`, `:user-invalid`), and JS-built state lives in the DOM (tag chips are real elements, slider fill is an inline `--mirk-value`). A saved-and-reopened file is correct before any script runs.

See `mirk-ui-guide.md` for the full architecture.

## The class API

BEM with a `mirk-` block prefix. **Block** = component, **`__part`** = element, **`--variant`** = modifier (shape `--round` / `--rounded`, size `--small` / `--large`; medium is the base).

```
mirk-button(__label)  mirk-button--round  mirk-button--small  mirk-button--large
mirk-input  mirk-textarea  mirk-number(__input,__step)  mirk-select  mirk-date
mirk-checkbox(__box,__mark,__label)  mirk-radio(__ring,__fill,__dot,__label)
mirk-toggle(__track,__thumb,__label)  mirk-slider(__input,__track,__fill,__nub)
mirk-file(__input,__button,__name)  mirk-image(__input,__preview,__placeholder)
mirk-tags(__chip,__remove,__input)  mirk-sortable(__item)  mirk-sr-only

[data-theme="dark"] / [data-theme="light"]   (.dark / .light aliased)
:checked  :user-invalid                        (state via the platform)
```

**Class = appearance. `data-*` = behavior. Native attribute = native behavior.** Every token is namespaced `--mirk-*` so the kit never collides with a host page's custom properties.

## What ships in v2

**Components (14):** button, text input, textarea, number, dropdown, checkbox, radio, toggle, slider, date, file picker, image input, tags, sortable. Each in its supported variants (rect / round / rounded, sizes where applicable).

**`mirk.css`:** the product. Hand-written, no build. `@layer base, components`, 28 `light-dark()` tokens, the font, and every component class family.

**`mirk.js`:** one delegated runtime for the six components native CSS can't finish — number stepper, slider value bridge, file picker filename, image preview, tags add/remove, copy button. One `document` listener per interaction, no `init()`, idempotent, safe to include twice.

**Font:** Departure Mono (SIL OFL), served via jsDelivr.

## What's NOT in v2

Time, datetime, date range. Markdown, rich text, code editor. Multi-select. Planned later — see `PLAN.md`.

## Repo structure

```
mirk-ui-kit/
├── README.md               # this file
├── index.html              # the showcase + drop-in instructions (one self-contained page)
├── mirk.css                # THE PRODUCT — hand-written semantic classes + tokens + font
├── mirk.js                 # delegated runtime (idempotent, native-only)
├── mirk-ui-guide.md        # the v2 architecture + conversion guide
├── fonts/DepartureMono-1.500/   # the kit's font (SIL OFL)
├── icons/svg/              # 800 SVG icons (referenced by the icons showcase; not part of the kit package)
├── package.json            # npm publish config (name: mirkui, 2.0.0)
├── PLAN.md                 # task tracker
├── DECISIONS.md            # current accepted decisions per component/topic
├── HISTORY.md              # append-only log of every decision + why
├── UNDECIDED.md            # active brainstorming
├── experiments/            # active UI experiments
├── archive/                # graduated experiments
└── refs/                   # read-only upstream sources (Primer, Carbon)
```

## Reading order

1. **`README.md`** (you are here)
2. **`index.html`** — open it. The showcase IS the documentation.
3. **`mirk-ui-guide.md`** — the architecture and the v1→v2 conversion rationale.
4. **`HISTORY.md`** — append-only log of every decision and *why*. Read for design context.
5. **`DECISIONS.md`** — current accepted decisions per component/topic.

## Locked technical choices

mirk components are **semantic BEM classes in `@layer components`**, fully overridable by utilities. Native form elements + CSS by default. Hard rule: `document.documentElement.outerHTML` must round-trip a component's current state.

- **Default to native form elements** for a11y, keyboard handling, and serialization.
- **CSS-only state** via `:checked`, `:focus-visible`, `:has()`, `:placeholder-shown`, `:user-invalid`.
- **No DIY JavaScript by default.** Named exceptions in `DECISIONS.md` 0014 (number stepper, slider visual bridge, file picker filename, image preview, tags add/remove, copy button), all delegated from `document`.
- **No web components. No build step required.** A consumer drops in `mirk.css` + `mirk.js` and it works.

## Develop / publish

```
npm run build      # the "build" is a copy: mkdir -p dist && cp mirk.css mirk.js dist/
npm publish        # publishes mirkui (only the "files" listed in package.json)
```

`mirk.css` is hand-written, not generated — there is nothing to compile.

## Reference systems (used during design)

| System  | Source                                          |
| ------- | ----------------------------------------------- |
| Primer  | https://primer.style — `primer/react`           |
| Carbon  | https://carbondesignsystem.com — `carbon-design-system/carbon` |

Both repos are cloned under `refs/` (gitignored) and read while designing each component. They aren't part of the kit.
