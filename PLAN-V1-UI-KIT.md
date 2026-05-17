# Plan: v1 UI kit (front page)

Status: planning only, no edits applied yet.

## Goal

Promote `experiments/experiments.html` to the v1 mirk UI kit. Rename it in place to `index.html`, archive the current 41-line skeleton, and make it a real kit: each component instance gets a copy button, the JS becomes one tiny shared script, the color tokens become one shared CSS block, and Tailwind is assumed present on the host page. Publish to npm as **`mirkui`** so consumers can grab the runtime and font from jsDelivr.

**Locked distribution choices (final):**

- npm package name: **`mirkui`**. (`mirk` is squatted with a 0.0.0 placeholder; `mirk-ui` is actively used by another author. `mirkui` is free.)
- Font hosting: **jsDelivr from the npm package**, URL pattern `https://cdn.jsdelivr.net/npm/mirkui@1.0.0/fonts/DepartureMono-1.500/DepartureMono-Regular.woff2`.
- Script hosting: same — `https://cdn.jsdelivr.net/npm/mirkui@1.0.0/mirk.js`.
- Tailwind: **Tailwind v4 recommended**. The intro tells consumers to load it (CDN one-liner is enough). We also ship a **precompiled `mirk.css`** as an opt-in alternative for consumers who don't want Tailwind on their page — the page calls this out as the secondary path with a one-line trade-off note (precompiled = locked Tailwind subset, can't tweak classes; Tailwind v4 = full ergonomics).

## What's actually in experiments.html (audit)

**Components, both panels (identical markup, only the wrapper class differs):**

| # | Component | Variants | JS? |
|---|---|---|---|
| 01 | Text Input | Rect, Rounded (3 sizes each) | no |
| 02 | Textarea | Rect, Rounded | no |
| 03 | Number | Rect, Rounded (3 sizes each) | yes (stepper) |
| 04 | Button | Rect, Round (3 sizes each) | no |
| 05 | Dropdown | Rect, Round (3 sizes each) | no |
| 06 | Checkbox | single | no |
| 07 | Radio | single | no |
| 08 | Toggle | Rect, Round | no |
| 09 | Slider | Rect, Round | yes (value → CSS var) |
| 10 | Date | Rect, Rounded | no |
| 11 | File picker | Rect Compact, Round Compact, Rect Button+Text, Round Button+Text | yes (filename) |
| 12 | Image input | Rect, Rounded | yes (FileReader preview) |
| 13 | Tags | Rect, Round | yes (add/remove) |
| 14 | Sortable | single (visual only) | no |

**Reference / specimen sections (not components, kept on the page as reference):**

- Sizes legend (SM/MD/LG type ramp)
- Glyph specimens (ASCII, arrows, geometric, box-drawing)
- App-icon candidates (stars, music, bullets, math, currency, quotes)
- Icons grid (80 SVG icons fetched from `icons/svg/`)

**Deferred to v2 (not in this release):**

- Time, Datetime, Date range
- Markdown, Rich text, Code editor
- Multi-select (already deferred in `PLAN.md`)

## Resolved decisions (this session)

1. **v1 scope:** ship the 14 components in experiments.html. Defer time/datetime/date range/markdown/rich text/code editor/multi-select to v2.
2. **Intro copy:** drafted below (Appendix A), to be refined when copied into the page.
3. **Distribution:** publish to npm as **`mirkui`**. Font and script both served via jsDelivr from the npm package (jsDelivr serves arbitrary files from published npm packages, including fonts, with correct MIME types and CORS).
4. **Token class naming — NEW (overrides `DECISIONS.md` 0001):**
   - Default: follow the visitor's OS preference via `prefers-color-scheme`.
   - Author override: `class="dark"` or `class="light"` on any wrapper enforces a mode.
   - Implementation: `:root` carries the light defaults, `@media (prefers-color-scheme: dark) :root` flips to dark, `.dark` and `.light` carry the same overrides with higher specificity so they win against the media query.
   - The v1 showcase page uses `.light` and `.dark` directly on each panel so both render side-by-side regardless of OS preference. The old `.panel-dark` / `.panel-light` class names go away.
   - `DECISIONS.md` 0001 needs a rewrite + a new `HISTORY.md` entry recording the reversal.
5. **Copy granularity:** one copy button per size. Sections like "Text Input • Rect" get 3 copy buttons (SM, MD, LG); the size badge is no longer needed since each row is its own copyable snippet labeled by the button. For non-sized components (Toggle, Slider, Date, File, Image, Tags, Sortable), one copy button per variant. For Checkbox/Radio: one per group (the checked + unchecked / 3 radio options are a meaningful unit).
6. **Specimens:** keep glyph + app-icon + 80-icon-grid sections on the v1 page as reference (no copy button on each glyph). One self-contained page is the goal.
7. **Replace vs archive:** rename `experiments.html` → `index.html` in place. Archive the current 41-line `index.html` skeleton (move to `archive/` or delete after capturing what's worth keeping — there's a useful "component template" comment in it worth preserving in `HISTORY.md`).
8. **Sortable:** ship as-is, visual only. Snippet ships with an HTML comment near the handle: `<!-- Wire your own reorder library (e.g. SortableJS) — cursor-grab is the only built-in cue -->`.
9. **Sizes legend:** drop. Each per-size copy button is itself the size legend now.

## Token system design (resolved decision 4, in detail)

Cascade order in the CSS:

```css
/* 1. Defaults — light */
:root {
  --canvas: #F7F2EA;
  --bg: #F7F2EA;
  --fg: #15120e;
  /* ...all 22 tokens at their light values */
}

/* 2. OS dark mode flips :root to dark */
@media (prefers-color-scheme: dark) {
  :root {
    --canvas: #0B0C13;
    --bg: #1D1F2F;
    --fg: #F6F7F9;
    /* ...all 22 tokens at their dark values */
  }
}

/* 3. Author override: .light or .dark on ANY wrapper wins */
.light {
  --canvas: #F7F2EA;
  /* ...all 22 light values */
  background: var(--canvas);
  color: var(--fg);
}

.dark {
  --canvas: #0B0C13;
  /* ...all 22 dark values */
  background: var(--canvas);
  color: var(--fg);
}
```

Specificity note: `.dark` (0,1,0) beats `:root` (0,0,1) regardless of where the `:root` rule sits in a media query. So `<html class="dark">` enforces dark even on a system that prefers light. ✓

For the v1 showcase page: `<section class="light">…</section>` and `<section class="dark">…</section>` side-by-side, so both always render. ✓

For a consumer building a page that should "just follow the OS": don't put a class anywhere. ✓

For a consumer enforcing a mode: put `class="dark"` or `class="light"` on `<html>` (or any wrapper). ✓

`background` + `color` get applied on the `.dark` / `.light` rule itself so a consumer doesn't have to also paint the canvas — adding the class is enough.

## Page structure (v1 index.html)

```
<head>
  Tailwind v4 CDN
  <style>
    @font-face Departure Mono (CDN URL — see Appendix B)
    base body styling (font-family: 'Departure Mono', monospace; etc.)
    token cascade (the four blocks above)
  </style>

<body>
  <div class="grid grid-cols-2 min-h-screen">

    <section class="light p-10 space-y-14">
      [Intro section — Appendix A]
      [Drop-in section — font + tokens + script copy blocks]
      [14 component sections, each with per-size copy buttons]
      [Specimens — glyphs, app-icons, icons grid]
    </section>

    <section class="dark p-10 space-y-14">
      [Same content, identical markup]
    </section>

  </div>

  <script>mirk.js inlined for self-contained ops</script>
</body>
```

Both panels carry identical content. The author override classes do their work via specificity, so both render at all times.

## Copy button mechanics

Each copyable instance is wrapped:

```html
<div data-copy class="relative">
  [the component HTML]
  <button data-copy-btn class="absolute top-1 right-1 …">copy</button>
</div>
```

`mirk.js` adds a single click handler on `[data-copy-btn]` that grabs `closest('[data-copy]').innerHTML`, strips the button itself, normalizes whitespace, and writes to clipboard via `navigator.clipboard.writeText`. The button briefly flips to "copied" on success.

Button visual: small (`text-[10px]` or so), Departure Mono, quiet color, hovers to full opacity. Same in light + dark — uses `--bevel-fg` and friends so it adapts to the panel.

## Single shared `mirk.js`

Extract the existing 150 lines into `mirk.js`:

```
mirk.js (no external deps, idempotent, attaches via data-* selectors)
├── number stepper        ([data-number])
├── slider value bridge   ([data-slider])
├── file picker filename  ([data-file-picker])
├── image preview         ([data-image-picker])
├── tags add/remove       ([data-tags])
└── copy button           ([data-copy-btn])  ← new
```

Drop from `mirk.js`: the icon-grid loader (`fetch('icons/svg/…')`). That's demo glue, not component runtime, and depends on local SVGs that won't exist for consumers. Move it to an inline `<script>` at the bottom of `index.html`, after the `mirk.js` include.

Consumers include `mirk.js` once at the bottom of their page. Each component snippet works after that without any per-instance init.

## Implementation phases

1. **Restructure for npm publish.**
   - Rename package to **`mirkui`** in `package.json`.
   - Move `vite`, `@primer/*`, `react*` to `devDependencies` (they're only for compare.html).
   - Drop `"private": true`. Add `"version": "1.0.0"`, `"description"`, `"keywords"`, `"author"`, `"license": "MIT"` (or whatever you want), `"repository"`, `"homepage"`.
   - Add a `"files"` array so only `mirk.js`, `mirk.css` (precompiled Tailwind subset), `fonts/DepartureMono-1.500/*.woff2`, `README.md`, and `LICENSE` ship. Keep the Departure Mono LICENSE file alongside so SIL OFL attribution travels with the package.
   - The directory itself stays `mirk-ui-kit/` on disk; only the npm package name changes.
2. **Extract `mirk.js`.** Pull the 150 lines out of experiments.html into a top-level `mirk.js`. Add the copy-button handler. Replace the inline script in experiments.html with `<script src="mirk.js">`, verify everything still works.
3. **Rewrite the token block.** Replace `.panel-dark` / `.panel-light` with the new four-tier cascade (`:root` defaults, `@media` dark, `.dark` override, `.light` override). Update both panels' wrapper class from `.panel-light` / `.panel-dark` to `.light` / `.dark`.
4. **Add the intro section** (Appendix A copy) at the top of both panels.
5. **Add the "drop-in" section** with three copy blocks: font/tokens CSS, `<script>` tag, and a one-liner "needs Tailwind v4" note.
6. **Add per-size copy buttons** to every component instance. Drop the SM/MD/LG size badges (each copy button is itself labeled with the size).
7. **Add the Sortable HTML comment** about wiring a reorder library.
8. **Rename `experiments.html` → `index.html`.** Archive (or delete) the current 41-line skeleton; capture the "component template" comment in `HISTORY.md` if useful.
9. **Generate `mirk.css`** — the precompiled Tailwind subset. One-time build that runs Tailwind over the v1 `index.html` and outputs just the classes mirk actually uses, plus the font-face and tokens. Ships in the npm package as an alternative path for consumers who don't want Tailwind on their host page. Recommended path stays Tailwind v4 CDN (full ergonomics, smaller paste); `mirk.css` is the no-Tailwind fallback.
10. **Update `README.md`** to describe the v1 kit (drop the "experiments.html is the working file" language; add the two install paths: Tailwind v4 + drop-in snippet vs `mirk.css` only).
11. **Append `HISTORY.md` entries** for: token-naming reversal (resolved decision 4), v1 promotion, jsDelivr distribution, npm name pick.
12. **Update `DECISIONS.md` 0001** to reflect the new auto-plus-override token model. Drop the side-by-side-rendering rule (no longer the production convention — only used on the showcase page itself, where it falls out of explicit `.light`/`.dark` wrappers anyway).
13. **Update `PLAN.md`** to mark the 14 components as shipped and v2 components as the next batch.
14. **Publish v1.0.0 to npm as `mirkui`.** Verify the jsDelivr URLs resolve for both `mirk.js` and the .woff2.

## Open questions remaining

All distribution decisions are locked. Remaining items are small and can be resolved during implementation:

- License pick for the `mirkui` package (MIT? ISC? Apache 2.0?). Departure Mono is SIL OFL regardless and ships with its own LICENSE file.
- Author / repository URLs in package.json — confirm "David Miranda" + a GitHub URL.
- Final visual placement of the copy button (top-right of each instance? small chip below it?). I'll prototype both during phase 6 and pick.

---

## Appendix A — Intro copy draft

(This goes in both the `.light` panel and the `.dark` panel — identical markup, the wrapper class makes each render in its own palette.)

```
# mirk
A form-focused HTML/CSS kit.

mirk is fourteen form components in plain HTML, plain Tailwind classes,
and one tiny shared script. No build step. No React. No web components.
Native form elements wherever possible — so accessibility, keyboard
handling, and form participation come for free. Paste a snippet into any
page that has Tailwind v4 loaded, and it works.

mirk is violently obvious. Bevel borders that look pressable. Sharp
pixel typography. No invisible focus states, no soft pastels, no
guessing what is clickable. It is a deliberate callback to the UIs of
the 80s and 90s, when buttons looked like buttons.

Every component is shown in light and dark on this page — side by side,
no toggle. mirk follows your visitor's OS theme by default. Add
class="dark" or class="light" to any wrapper to force a mode.

## To use mirk

1. Make sure Tailwind v4 is loaded on your page.
2. Paste the font, tokens, and script below into your <head> (once).
3. Click "copy" on any component, paste it where you need it.

## Drop in once

[copy block 1 — Font + tokens CSS, ~30 lines]

[copy block 2 — Script tag, one line]

[copy block 3 — Tailwind CDN reminder, one line]

## Components

[the 14 sections, each instance with its own copy button]

## Reference

[glyph specimens, app-icon candidates, 80-icon grid — no copy buttons]

## What is not in mirk yet

Time, datetime, date range. Markdown, rich text, code editor.
Multi-select. They are planned. They are not here.
```

The actual rendered intro will use HTML headings + Tailwind classes (not raw markdown). The copy is the substance to formalize when implementing.

## Appendix B — Distribution URLs (locked)

After `mirkui@1.0.0` is published to npm:

```
Font:    https://cdn.jsdelivr.net/npm/mirkui@1.0.0/fonts/DepartureMono-1.500/DepartureMono-Regular.woff2
Script:  https://cdn.jsdelivr.net/npm/mirkui@1.0.0/mirk.js
CSS:     https://cdn.jsdelivr.net/npm/mirkui@1.0.0/mirk.css      ← precompiled Tailwind subset, no-Tailwind path
Tokens:  inlined in the snippet (defined in the page, ~30 lines) — not a separate file
```

Why these are right:

- jsDelivr serves arbitrary files from any published npm package with correct MIME types (`font/woff2`, `application/javascript`, `text/css`) and `access-control-allow-origin: *`. Verified pattern; many design systems ship this way.
- Pinning a version (`@1.0.0`) gives consumers reproducible builds. `@latest` is available too, but the snippets paste the pinned version.
- Departure Mono's SIL OFL allows redistribution inside our npm package, with attribution in the bundled LICENSE.

## Appendix C — Two install paths (for the intro section)

The intro block on the page surfaces both, recommends the first:

**Recommended: Tailwind v4 + drop-in**

```html
<!-- in <head> -->
<script src="https://cdn.jsdelivr.net/npm/@tailwindcss/browser@4"></script>
<style>
  @font-face { font-family: 'Departure Mono'; src: url('https://cdn.jsdelivr.net/npm/mirkui@1.0.0/fonts/DepartureMono-1.500/DepartureMono-Regular.woff2') format('woff2'); }
  /* tokens (~30 lines) */
</style>

<!-- before </body> -->
<script src="https://cdn.jsdelivr.net/npm/mirkui@1.0.0/mirk.js"></script>
```

Why recommended: full Tailwind ergonomics for the consumer's own styling, smallest snippet to paste, classes inside components can be tweaked freely.

**Alternative: precompiled CSS (no Tailwind required)**

```html
<!-- in <head> -->
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/mirkui@1.0.0/mirk.css">

<!-- before </body> -->
<script src="https://cdn.jsdelivr.net/npm/mirkui@1.0.0/mirk.js"></script>
```

Why this exists: some hosts can't or don't want to load Tailwind. Trade-off: locked to the kit's exact class subset; if you tweak the HTML to use a Tailwind class we didn't bundle, nothing happens.
