# mirk

A form-focused HTML/CSS UI kit. Fourteen components in plain Tailwind classes and one tiny shared script. No build step, no React, no web components. Published as `mirkui` on npm.

Live showcase: open `index.html` in any browser or static server.

## Use mirk on your page

1. Load **Tailwind v4** (CDN one-liner is fine).
2. Paste the **font + tokens** block (defines `@font-face` + the four-tier theme cascade).
3. Include **mirk.js** once at the bottom of your page.
4. Copy any component snippet from the showcase, paste it where you need it.

All copy-pasteable. The kit follows the visitor's OS theme by default; `class="dark"` or `class="light"` on any wrapper forces a mode.

### Install paths

**Recommended — Tailwind v4 + drop-in:**

```html
<script src="https://cdn.jsdelivr.net/npm/@tailwindcss/browser@4"></script>
<style>
  @font-face { font-family: 'Departure Mono'; src: url('https://cdn.jsdelivr.net/npm/mirkui@1.0.0/fonts/DepartureMono-1.500/DepartureMono-Regular.woff2') format('woff2'); }
  body { font-family: 'Departure Mono', ui-monospace, monospace; }
  /* paste the :root / @media / .light / .dark token block from index.html */
</style>
<script src="https://cdn.jsdelivr.net/npm/mirkui@1.0.0/mirk.js"></script>
```

**Alternative — precompiled CSS (no Tailwind required):**

```html
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/mirkui@1.0.0/mirk.css">
<script src="https://cdn.jsdelivr.net/npm/mirkui@1.0.0/mirk.js"></script>
```

Trade-off: `mirk.css` ships a frozen Tailwind subset (only the classes the kit uses). You can't tweak component classes freely with arbitrary Tailwind utilities — the recommended path keeps that flexibility.

## What ships in v1

**Components (14):** button, text input, textarea, number, dropdown, checkbox, radio, toggle, slider, date, file picker, image input, tags, sortable. Each in its supported variants (rect / round, sizes where applicable).

**Runtime (`mirk.js`):** number stepper, slider value bridge, file picker filename, image preview, tags add/remove, copy-button handler. Idempotent. Drop in once.

**Tokens (`mirk.css` or inline):** 28 per-mode CSS custom properties driving every color in the kit.

**Font:** Departure Mono (SIL OFL), served via jsDelivr.

## What's NOT in v1

Time, datetime, date range. Markdown, rich text, code editor. Multi-select. Planned for v2 — see `PLAN.md`.

## Repo structure

```
mirk-ui-kit/
├── README.md               # this file
├── index.html              # the v1 showcase + the kit's drop-in instructions (one self-contained page)
├── mirk.js                 # shared runtime (idempotent, native-only)
├── mirk.css                # precompiled CSS (alternative to Tailwind v4)
├── mirk-input.css          # source for mirk.css (run `npm run build:css` to regenerate)
├── fonts/DepartureMono-1.500/   # the kit's font (SIL OFL)
├── icons/svg/              # 800 SVG icons (referenced by the icons showcase; not part of the kit package)
├── package.json            # npm publish config (name: mirkui)
├── PLAN.md                 # task tracker (v1 done; v2 listed)
├── DECISIONS.md            # current accepted decisions per component/topic
├── HISTORY.md              # append-only log of every decision + why
├── UNDECIDED.md            # active brainstorming
├── PLAN-V1-UI-KIT.md       # the v1 implementation plan (kept for reference)
├── experiments/            # active UI experiments (now empty; experiments.html graduated to index.html)
├── archive/                # graduated experiments + the pre-v1 index.html skeleton
└── refs/                   # read-only upstream sources (Primer, Carbon)
```

## Reading order

1. **`README.md`** (you are here)
2. **`index.html`** — open it. The showcase IS the documentation.
3. **`HISTORY.md`** — append-only log of every decision and *why*. Read for design context.
4. **`DECISIONS.md`** — current accepted decisions per component/topic.
5. **`PLAN.md`** — what's done, what's next.

## Writing style

Every md file: **concise, information-dense**. Bullets over paragraphs. Only the *why* that isn't derivable from code. Lead with the rule, then one line of context. See `DECISIONS.md` 0006.

## Reference systems (used during design)

| System  | Source                                          |
| ------- | ----------------------------------------------- |
| Primer  | https://primer.style — `primer/react`           |
| Carbon  | https://carbondesignsystem.com — `carbon-design-system/carbon` |

Both repos are cloned under `refs/` (gitignored) and read while designing each component. They aren't part of the kit; the side-by-side `compare.html` dev tool that used to render mirk · Primer · Carbon together was removed once v1 locked.

## Locked technical choices

mirk components are **copy-pasteable plain HTML/CSS/Tailwind snippets**. Native form elements + CSS by default. Hard rule: `document.documentElement.outerHTML` must round-trip a component's current state.

- **Default to native form elements** for a11y, keyboard handling, and serialization.
- **CSS-only state** via `:checked`, `:focus`, `:focus-within`, `:has()`, `:placeholder-shown`, `:user-invalid`, etc.
- **No DIY JavaScript by default.** Named exceptions in `DECISIONS.md` 0014 (number stepper, slider visual bridge, file picker filename, image preview, tags add/remove, copy button).
- **No web components.**
- **No build step required to use a mirk component.** A consumer pastes the HTML into any project, includes mirk.js + tokens, and it works.

## Decision log — non-negotiable

- **`DECISIONS.md`** — current accepted decision per component/topic. Edited freely as decisions evolve.
- **`HISTORY.md`** — append-only log of every decision and *why*, chronological. **Nothing is ever removed or rewritten.** Even when a decision in `DECISIONS.md` changes, the original `HISTORY.md` entry stays and a new entry is added.
- **`UNDECIDED.md`** — active brainstorming. Resolved items move to `DECISIONS.md` + `HISTORY.md`.

## Develop / publish

```
npm install                # installs the Tailwind CLI used by build:css
npm run build:css          # regenerates mirk.css from index.html + mirk-input.css
npm publish                # publishes mirkui to npm (only the "files" listed in package.json)
```
