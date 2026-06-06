# Building a Tailwind-Compatible UI Library — the no-build way

A guide for a DaisyUI-style component library that uses semantic classes
(`clay-btn`, `clay-card`), stays fully overridable by Tailwind utilities, and
works without a build step. Running example name: **Clay**.

> Positioning: **DaisyUI ergonomics, platform-native internals, no build step required.**

---

## 0. The one decision everything hangs on

A "Tailwind-compatible" component library is really just one architectural
choice: **put your component classes in the `components` cascade layer.**

Tailwind v4 emits its CSS in this layer order:

```css
@layer theme, base, components, utilities;
```

`utilities` comes last, so anything in it wins. If your `.clay-btn` lives in
`components`, then `class="clay-btn px-6 rounded-none"` lets a user override
your padding and radius with **zero `!important` and zero specificity hacks**.
That's the entire trick. Get this right and the rest is detail; get it wrong
and you'll fight the cascade forever.

```css
@layer components {
  .clay-btn { /* your defaults */ }
}
```

This is also Tailwind's own recommendation: the `components` layer is meant for
"more complicated classes… that you'd still like to be able to override with
utility classes — `btn`, `card`, `badge`, that kind of thing."

**Don't use `@utility` for components.** `@utility` is for single-purpose
utilities; it lands in the `utilities` layer and *can't* be cleanly overridden.
Components belong in `@layer components`.

Because `@import "tailwindcss"` declares the layer order up front, a standalone
CSS file that uses `@layer components` slots into the right place **no matter
where it's imported** — and it still works as plain CSS in a browser with no
Tailwind at all.

---

## 1. Distribution: no-build first

Your library has exactly two real artifacts:

```
clay.css   ← the source of truth (hand-written, readable, no build)
clay.js    ← optional; only for things HTML genuinely can't do
```

Everything else (npm package, Tailwind plugin, CDN bundle) is a **thin wrapper
around these files.** Don't invert that. A `.btn` library does not need a
toolchain.

**Primary path — drop-in (CDN or copy-paste), zero install:**

```html
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/clay-ui/clay.css">
<script type="module" src="https://cdn.jsdelivr.net/npm/clay-ui/clay.js"></script>
```

This is the path that works inside a single-file HTML artifact, a Rails view, a
Flask template, or a static page. It's the one most of your users will use.

**Secondary path — Tailwind project, plain CSS import:**

```css
@import "tailwindcss";
@import "clay-ui/clay.css";
```

**Tertiary path — Tailwind `@plugin` (DaisyUI-style ergonomics):**

```css
@import "tailwindcss";
@plugin "clay-ui";
```

The plugin can be almost empty — it just injects the same CSS. Offer it for
familiarity, but never make it the *only* path. Tailwind v3 projects still use
`tailwind.config.js`; a plain CSS file sidesteps every version difference.

**"Build" step, if you publish to npm:** a copy command. That's it.

```json
{ "scripts": { "build": "mkdir -p dist && cp src/clay.css src/clay.js dist/" } }
```

---

## 2. Anatomy of a component (the elegant part)

Naive approach: declare colors for every variant × every state. That's a
combinatorial mess. Better: **a variant sets one private variable; every state
derives from it.** Write hover/active/focus *once* and get them for free across
all variants.

```css
@layer components {
  .clay-btn {
    /* the only knob a variant needs to turn */
    --_bg: var(--clay-surface);
    --_fg: var(--clay-fg);

    display: inline-flex;
    align-items: center;
    justify-content: center;
    gap: 0.5rem;
    min-height: var(--clay-control-h, 2.5rem);   /* also the min hit target */
    padding-inline: 1rem;
    border: 1px solid color-mix(in oklch, var(--_fg) 15%, transparent);
    border-radius: var(--clay-radius, 0.5rem);
    background: var(--_bg);
    color: var(--_fg);
    font: inherit;
    font-weight: 550;
    line-height: 1;
    cursor: pointer;
    user-select: none;
    transition: background-color 120ms ease, border-color 120ms ease, box-shadow 120ms ease;
  }

  /* Variants set ONE or TWO custom props — nothing else */
  .clay-btn-primary   { --_bg: var(--clay-primary);   --_fg: var(--clay-primary-content); }
  .clay-btn-secondary { --_bg: var(--clay-secondary); --_fg: var(--clay-secondary-content); }
  .clay-btn-ghost     { --_bg: transparent; --_fg: var(--clay-fg); border-color: transparent; }

  /* States derive from --_bg, so they apply to EVERY variant automatically.
     --clay-shade is `black` in light themes, `white` in dark themes,
     so "darken on hover" stays correct in both. */
  .clay-btn:hover  { background: color-mix(in oklch, var(--_bg), var(--clay-shade) 8%); }
  .clay-btn:active { background: color-mix(in oklch, var(--_bg), var(--clay-shade) 15%); }
  .clay-btn:focus-visible {
    outline: none;
    box-shadow: 0 0 0 2px var(--clay-surface), 0 0 0 4px var(--_bg);
  }
  .clay-btn:disabled { opacity: 0.5; cursor: not-allowed; }
}
```

Add a new variant later? One line. Hover, active, focus, and disabled all come
along for free.

**Respect the machine** (put these outside the component layer so they always apply):

```css
@media (prefers-reduced-motion: reduce) {
  .clay-btn { transition: none; }
}
@media (forced-colors: active) {
  .clay-btn { border: 1px solid ButtonText; }  /* Windows high-contrast */
}
```

A card, for completeness — same idea, all knobs are variables:

```css
@layer components {
  .clay-card {
    border: 1px solid var(--clay-border);
    border-radius: var(--clay-radius);
    background: var(--clay-surface);
    color: var(--clay-fg);
    padding: var(--clay-card-pad, 1rem);
  }
  .clay-card-title { font-weight: 650; line-height: 1.25; }
  .clay-card-body  { margin-top: 0.5rem; color: var(--clay-muted); }
}
```

---

## 3. Theming: one set of tokens, automatic dark mode

The old way duplicates every value across a light block and a dark block.
`light-dark()` collapses that into one declaration each — the browser picks the
right value based on `color-scheme`.

```css
@layer base {
  :root {
    color-scheme: light dark;            /* enables light-dark() + native form colors */

    --clay-bg:      light-dark(oklch(0.99 0 0), oklch(0.16 0 0));
    --clay-surface: light-dark(oklch(1 0 0),    oklch(0.21 0 0));
    --clay-fg:      light-dark(oklch(0.20 0 0), oklch(0.96 0 0));
    --clay-muted:   light-dark(oklch(0.48 0 0), oklch(0.72 0 0));
    --clay-border:  light-dark(oklch(0.90 0 0), oklch(0.32 0 0));
    --clay-shade:   light-dark(black, white);   /* hover/active darken direction */

    --clay-primary:         oklch(0.55 0.18 250);
    --clay-primary-content: oklch(0.98 0 0);
    --clay-secondary:         oklch(0.65 0.14 180);
    --clay-secondary-content: oklch(0.15 0 0);

    --clay-radius: 0.625rem;
    --clay-control-h: 2.5rem;
  }

  /* Switching theme = flipping color-scheme. No value is repeated. */
  [data-theme="light"] { color-scheme: light; }
  [data-theme="dark"]  { color-scheme: dark;  }
}
```

```html
<body data-theme="dark"> … </body>   <!-- or omit it and follow the OS -->
```

Fully custom themes (a brand palette, not just light/dark) still use an explicit
block — that's the right escape hatch:

```css
[data-theme="sunset"] {
  --clay-primary: oklch(0.62 0.19 35);
  --clay-surface: oklch(0.97 0.02 60);
}
```

**The Tailwind bridge.** Let users wire their Tailwind tokens into yours so the
two systems sit side by side instead of competing:

```css
@import "tailwindcss";
@import "clay-ui/clay.css";

@theme {
  --color-brand: oklch(0.58 0.2 260);   /* now `bg-brand`, `text-brand`, etc. exist */
}
:root {
  --clay-primary: var(--color-brand);    /* library token follows the app token */
}
```

---

## 4. Behavior: reach for the platform first

DaisyUI ships **zero JavaScript** on purpose, and the platform has caught up
enough that most "components" need none either. Default to native; script only
the gaps.

| Component        | Use this — no JS                                  |
|------------------|---------------------------------------------------|
| Modal / dialog   | `<dialog>` (`.showModal()`, focus trap, Esc, `::backdrop`) |
| Dropdown / menu  | `popover` attribute + CSS anchor positioning      |
| Tooltip          | `popover="hint"` + anchor positioning             |
| Accordion        | `<details>` / `<summary>`                          |
| Tabs             | small JS (see §5) — this one genuinely needs it    |

**Dialog — native, accessible, ~no code:**

```html
<button class="clay-btn" onclick="this.nextElementSibling.showModal()">Open</button>
<dialog class="clay-dialog">
  <form method="dialog">
    <h2 class="clay-card-title">Confirm</h2>
    <button class="clay-btn clay-btn-primary">OK</button>
  </form>
</dialog>
```

The browser gives you focus trapping, Esc-to-close, top-layer stacking, and a
styleable `::backdrop`. Don't reimplement any of that.

**Dropdown — CSS-only with `popover` + anchor positioning:**

```html
<button class="clay-btn clay-btn-secondary" popovertarget="row-menu">Options ▾</button>
<menu id="row-menu" popover class="clay-menu">
  <li><button class="clay-menu-item">Edit</button></li>
  <li><button class="clay-menu-item">Duplicate</button></li>
</menu>
```

```css
@layer components {
  .clay-menu[popover] {
    position: absolute;          /* anchored, not centered */
    top: anchor(bottom);         /* the popovertarget invoker is the implicit anchor */
    left: anchor(left);
    margin-block-start: 0.25rem;
    position-try-fallbacks: flip-block, flip-inline;   /* flips near a viewport edge */
    border: 1px solid var(--clay-border);
    border-radius: var(--clay-radius);
    background: var(--clay-surface);
    padding: 0.25rem;
  }
}
```

No JS at all: the browser handles open/close, click-outside dismiss, Esc, and
focus. **Support caveat (mid-2026):** CSS anchor positioning is in all major
engines (Chrome/Edge 125+, Firefox 147+, Safari 26+) but ~76% globally, so add a
fallback. The graceful one is free — without anchor support the `popover` still
opens (it just renders centered in the top layer), which is acceptable. If you
need pixel-perfect placement everywhere, drop in the oddBird anchor-positioning
polyfill or a ~10-line JS positioner.

---

## 5. When you DO write JS: delegate, never `init()`

A per-element `init()` (with a `data-ready` guard) breaks the moment new markup
appears — an injected fragment, a re-rendered list, a Hyperclay file that gets
edited and re-saved. You'd have to remember to re-run `init()` every time, or
bolt on a `MutationObserver`.

**Event delegation removes the problem entirely.** One listener on `document`
handles every current *and* future element. No init call, no ready flags, no
lifecycle. Here's the whole tabs component:

```js
// clay.js — the only JS the library ships. Survives any DOM mutation.
document.addEventListener("click", (e) => {
  const tab = e.target.closest("[data-clay-tab]");
  if (!tab) return;
  const group = tab.closest("[data-clay-tabs]");

  group.querySelectorAll("[data-clay-tab]").forEach((t) => {
    const selected = t === tab;
    t.setAttribute("aria-selected", String(selected));
    t.tabIndex = selected ? 0 : -1;                       // roving tabindex
    document.getElementById(t.getAttribute("aria-controls")).hidden = !selected;
  });
});

// Arrow-key navigation — also delegated, also zero setup.
document.addEventListener("keydown", (e) => {
  if (e.key !== "ArrowLeft" && e.key !== "ArrowRight") return;
  const tab = e.target.closest("[data-clay-tab]");
  if (!tab) return;
  const tabs = [...tab.closest("[data-clay-tabs]").querySelectorAll("[data-clay-tab]")];
  const dir = e.key === "ArrowRight" ? 1 : -1;
  const next = tabs[(tabs.indexOf(tab) + dir + tabs.length) % tabs.length];
  next.focus();
  next.click();
});
```

```html
<div class="clay-tabs" data-clay-tabs role="tablist">
  <button class="clay-tab" data-clay-tab role="tab" aria-controls="p1" aria-selected="true">One</button>
  <button class="clay-tab" data-clay-tab role="tab" aria-controls="p2" aria-selected="false" tabindex="-1">Two</button>
</div>
<div id="p1" role="tabpanel">…</div>
<div id="p2" role="tabpanel" hidden>…</div>
```

**Progressive enhancement contract:** every component must look right and be
usable as plain HTML *before* `clay.js` loads. JS only enhances. The markup
above shows the first tab's panel even with scripting disabled.

---

## 6. Naming & the API contract

- **Prefix everything (`clay-`).** A small library has no business owning the
  generic `.btn`/`.card` namespace — DaisyUI can, because it's an ecosystem; you
  can't. The prefix prevents collisions with the host app's own CSS.
- **Class = appearance. Data attribute = behavior.** Never overload one for the
  other. `class="clay-tab"` styles it; `data-clay-tab` is the JS hook. You can
  restyle without touching JS, and rename JS hooks without touching CSS.
- **Native attributes for native behavior.** Dropdowns/dialogs use `popover`,
  `popovertarget`, and `<dialog>` — that's *less* custom surface than inventing
  `data-clay-dropdown-trigger`, and it's accessible by default.

```
clay-btn  clay-btn-primary  clay-btn-secondary  clay-btn-ghost
clay-input  clay-card  clay-card-title  clay-card-body
clay-menu  clay-menu-item  clay-dialog  clay-tabs  clay-tab

data-clay-tabs   data-clay-tab        (JS hooks only)
popover / popovertarget / <dialog>    (behavior via the platform)
```

---

## 7. Accessibility checklist (non-negotiables)

- `:focus-visible` ring on **every** interactive class.
- Minimum hit target via `--clay-control-h` (≥ 2.5rem / 40px).
- `prefers-reduced-motion: reduce` removes transitions.
- `forced-colors: active` keeps borders visible in high-contrast mode.
- Lean on native elements (`<button>`, `<dialog>`, `<details>`) so you inherit
  keyboard and ARIA behavior instead of reinventing it.
- Pick token colors that clear WCAG contrast in both light and dark.

---

## 8. Publishing to npm (optional appendix)

Only if you want the install ergonomics. The files do the work.

```json
{
  "name": "clay-ui",
  "type": "module",
  "exports": {
    ".": "./clay.js",
    "./clay.css": "./clay.css",
    "./plugin": "./plugin.js"
  },
  "style": "./clay.css"
}
```

Per-component JS imports (`clay-ui/tabs`) are an over-optimization here: the
whole behavior layer is a few KB of delegated listeners. Ship one file.

---

## The principles, compressed

1. **Components live in `@layer components`** so utilities always win — no
   `!important`, ever. This is what makes it Tailwind-compatible.
2. **The CSS file is the product.** npm and the Tailwind plugin are thin
   wrappers; no build step is required to use it.
3. **Progressive enhancement:** a component must look right as plain HTML before
   any JS loads.
4. **Variants set one private var; states derive from it.** Write hover/focus/
   disabled once, get them for every variant.
5. **Theme with semantic tokens + `light-dark()`.** Switch by flipping
   `color-scheme`, not by duplicating every value.
6. **Reach for the platform first:** `<dialog>`, `popover`, `<details>`, anchor
   positioning. Script only the gaps.
7. **When you must script, delegate.** One document listener, no `init()` —
   survives DOM that's injected, edited, and re-saved.
8. **Class = appearance. Data attribute = behavior.** Never blur the line.
9. **Respect the machine:** reduced-motion, forced-colors, focus-visible, real
   hit targets.
10. **Copy-paste HTML is the primary API.** Everything else is an optimization.
