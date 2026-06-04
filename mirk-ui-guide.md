# Building mirk UI: a semantic-class form kit, the no-build way

This is both the architecture guide and the **conversion plan** for mirk UI. v1
shipped fourteen form components as copy-paste Tailwind utility snippets. v2
distills those finalized styles into **semantic BEM classes** (`mirk-button`,
`mirk-button--round`) living in the `components` cascade layer, fully overridable
by utilities, working with or without Tailwind, no build step.

> Positioning: **DaisyUI ergonomics, native form internals, malleable-HTML safe, no build step required.**

The visuals are locked. This document specifies the **class structure**, not new
design. Per-component pixel values get lifted verbatim from the current showcase
(`index.html`) during the conversion.

---

## 0. The two decisions everything else falls out of

mirk hangs on two architectural choices. Get both right and the rest is detail.

### A. Components live in the `components` cascade layer

Tailwind v4 emits its CSS in this layer order:

```css
@layer theme, base, components, utilities;
```

`utilities` comes last, so it always wins. Put `.mirk-button` in `components`
and `class="mirk-button px-8 rounded-none"` overrides your padding and radius
with **zero `!important` and zero specificity hacks**. That is the whole trick
that makes mirk Tailwind-compatible.

```css
@layer components {
  .mirk-button { /* defaults */ }
}
```

mirk goes one step further than a Tailwind plugin: `mirk.css` declares its own
layer order at the top, so it is **self-sufficient without Tailwind**. Plain CSS
in `@layer components` renders in any browser, and unlayered consumer rules still
beat it (unlayered styles win over layered ones). Tailwind present or absent, the
override story holds.

```css
/* mirk.css, line 1: works standalone, and merges into Tailwind's order when present */
@layer base, components;
```

**Never use `@utility` or raw utilities for the component itself.** Those land in
`utilities` and can't be cleanly overridden. The component is a class in
`@layer components`. Utilities are for the consumer's overrides.

### B. `outerHTML` must round-trip the current state

mirk targets malleable HTML (Hyperclay): a file edits its own DOM and saves
itself back. The hard rule:

> `document.documentElement.outerHTML` reproduces every component's current
> visible state.

Everything downstream follows from this:

- **Native elements** hold their own state (`checked`, `value`, `selected`) in
  serializable attributes.
- **CSS-only state** (`:checked`, `:focus-within`, `:has()`, `:user-invalid`,
  `:placeholder-shown`) needs no JS to persist.
- **JS-built state lives in the DOM**: tag chips are real elements, slider fill
  is an inline `--mirk-value` custom property, never a variable held in memory.
- **No consumer `init()` step.** A saved-and-reopened file is correct before any
  script runs.

The two hinges don't fight. A semantic class is just a token in the markup, so
`<button class="mirk-button">` round-trips for free. Styling-by-class and
state-by-serialization are orthogonal.

---

## 1. Distribution: no-build, Tailwind optional

mirk has two real artifacts:

```
mirk.css   ← source of truth, hand-written, readable, no build
mirk.js    ← one delegated runtime for the six components native CSS can't finish
```

**Primary path: drop-in, zero install, no Tailwind.**

```html
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/mirk-interface@2/mirk.css">
<script src="https://cdn.jsdelivr.net/npm/mirk-interface@2/mirk.js"></script>
```

This renders fully on its own. It is the path for a single-file HTML artifact, a
Hyperclay app, a Rails view, a static page. Most users live here.

**Optional path: add Tailwind to override mirk classes with utilities.**

```css
@import "tailwindcss";
@import "mirk-interface/mirk.css";
```

Now `class="mirk-input mirk-input--large w-full font-sans"` works, utilities win
over the component layer.

**Optional path: Tailwind `@plugin` (DaisyUI-style ergonomics).**

```css
@import "tailwindcss";
@plugin "mirk-interface";
```

The plugin just injects the same CSS. Offer it for familiarity, never make it the
only path.

**The "build", if you publish to npm:** a copy. `mirk.css` is hand-written, not
generated, so there is nothing to compile.

```json
{ "scripts": { "build": "mkdir -p dist && cp mirk.css mirk.js dist/" } }
```

> Why hand-written, not compiled. The old pipeline ran
> `tailwindcss -i mirk-input.css -o mirk.css` against utilities scraped from
> `index.html`. That source already drifted: `mirk-input.css` still holds the
> pre-resize toggle and slider colors while `index.html` moved on. A hand-written
> `mirk.css` is the single source of truth and that whole drift class disappears.

---

## 2. Anatomy of a component

The elegant part: **write the states once on the base class, let every size and
shape inherit them.** mirk's "variants" are shape (rect, round, rounded) and size
(small, medium, large), and they share one bevel state machine.

Here is the rect button, lifted from the showcase, as a semantic class. Medium is
the base, small and large are modifiers.

```css
@layer components {
  .mirk-button {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    gap: 0.5rem;
    font: inherit;
    line-height: 1.5;
    cursor: pointer;
    user-select: none;
    color: var(--mirk-bevel-fg);
    background: var(--mirk-bevel-bg);

    /* The raised bevel: highlight on top+left, shadow on right+bottom.
       border-color shorthand is Top Right Bottom Left. */
    border: 2px solid;
    border-color: var(--mirk-bevel-tl) var(--mirk-bevel-br) var(--mirk-bevel-br) var(--mirk-bevel-tl);

    padding: 4px 14px 5px;                 /* medium */
    transition: background-color 120ms ease;
  }

  /* The label is its own <span>: it carries the press-nudge on rect, and becomes
     the inner gradient fill on round (see below). Every button wraps one. */
  .mirk-button__label { white-space: nowrap; user-select: none; }

  /* States, written ONCE, shared by every size and shape. */
  .mirk-button:hover { background: var(--mirk-bevel-hover-bg); }
  .mirk-button:active {
    border-color: var(--mirk-bevel-br) var(--mirk-bevel-tl) var(--mirk-bevel-tl) var(--mirk-bevel-br); /* invert: pressed in */
  }
  .mirk-button:active .mirk-button__label { translate: 1.5px 1.5px; }   /* label sinks with the press */
  .mirk-button:focus-visible {
    outline: 1px solid var(--mirk-focus-color);
    outline-offset: var(--mirk-focus-offset);
  }
  .mirk-button:disabled { opacity: 0.5; cursor: not-allowed; }

  /* Sizes set padding and font only. */
  .mirk-button--small { padding: 3px 12px; font-size: 14px; }
  .mirk-button--large { padding: 4px 17px 7px; font-size: 18px; border-width: 3px; }
}
```

Every button wraps one label span:

```html
<button class="mirk-button"><span class="mirk-button__label">discover more</span></button>
```

Add a future color variant (primary, danger) later? It sets one private var and
the states already derive from the tokens. The hook is reserved, the work is not
done now:

```css
/* v2.x, not yet: variants flip a private bg, states already handle the rest */
.mirk-button--primary { --_bg: var(--mirk-accent); background: var(--_bg); }
```

### Name the structure, don't flatten it

mirk is deliberately a multi-part library. Custom controls hide the native input
with a visually-hidden class, draw the visual as styled `<span>` parts, and
surface state with `:has()`. The conversion does not flatten that. It gives each
existing element a BEM class and lifts its utilities into one `@layer components`
rule, the DOM stays identical so it keeps round-tripping.

The checkbox is the canonical shape. State is read once on the block with
`:has(:checked)`, so the box flattens and the mark appears with no per-element
bookkeeping:

```html
<label class="mirk-checkbox">
  <input type="checkbox" class="mirk-sr-only">
  <span class="mirk-checkbox__box"><span class="mirk-checkbox__mark"></span></span>
  <span class="mirk-checkbox__label">Subscribe to updates</span>
</label>
```

```css
@layer components {
  .mirk-checkbox { display: inline-flex; align-items: center; gap: 0.75rem; cursor: pointer; }
  .mirk-checkbox__box {
    width: 22px; height: 22px;
    background: var(--mirk-bevel-bg);
    border: 2px solid;
    border-color: var(--mirk-bevel-tl) var(--mirk-bevel-br) var(--mirk-bevel-br) var(--mirk-bevel-tl);  /* raised */
  }
  .mirk-checkbox__mark { opacity: 0; /* rotated border-corner check, geometry from the showcase */ }

  /* State, read ONCE on the block, not toggled element by element. */
  .mirk-checkbox:has(:checked) .mirk-checkbox__box { border-color: var(--mirk-input-border); }  /* flat when on */
  .mirk-checkbox:has(:checked) .mirk-checkbox__mark { opacity: 1; }
  .mirk-checkbox:has(:focus-visible) .mirk-checkbox__box {
    outline: 1px solid var(--mirk-focus-color); outline-offset: var(--mirk-focus-offset);
  }
}
```

The round register stacks two gradients exactly as v1 did, with `__label` (or
`__thumb`) as the inner fill. The round button keeps its span: the `<button>` is
the gradient frame, the `.mirk-button__label` is the inner pill.

```css
@layer components {
  .mirk-button--round {
    border: none;                  /* drop the base bevel; the frame is the gradient */
    padding: 2px;
    border-radius: 12px;
    background: linear-gradient(to top, var(--mirk-bevel-br), var(--mirk-bevel-tl));      /* the frame */
  }
  .mirk-button--round:active { background: linear-gradient(to bottom, var(--mirk-bevel-br), var(--mirk-bevel-tl)); }
  .mirk-button--round .mirk-button__label {
    display: flex; padding: 2px 14px;
    border-radius: 10px;
    color: var(--mirk-bevel-fg);
    background: linear-gradient(to top, var(--mirk-bevel-bg), var(--mirk-pill-inner-top));  /* the fill */
  }
}
```

The `__part` is the rule, not the exception: checkbox box and mark, radio ring and
dot, toggle track and thumb, slider track, fill and nub, number input and steppers,
tag chips, file name. Only the bare inputs (text, textarea, date) and the
`<select>` are a single styled element. §7 lists every family.

**Respect the machine** (outside the component layer, so it always applies):

```css
@media (prefers-reduced-motion: reduce) {
  .mirk-button, .mirk-toggle, .mirk-slider { transition: none; }
}
@media (forced-colors: active) {
  .mirk-button { border: 1px solid ButtonText; }
}
```

---

## 3. The bevel design language

mirk has a face, and the tokens encode it. This is what a generic kit does not have.

- **Departure Mono**, a pixel font (SIL OFL), uniform across every component. It
  sets the retro-console register the bevels live in.
- **The raised bevel.** Every solid control gets a light edge on top and left
  (`--mirk-bevel-tl`) and a dark edge on right and bottom (`--mirk-bevel-br`), so it reads
  as physically raised. Press it and the edges invert. The same highlight/shadow
  idea recurs as paired tokens on the other controls: `--mirk-toggle-hi` / `--mirk-toggle-lo`,
  `--mirk-slider-nub-hi` / `--mirk-slider-nub-lo`.
- **The round register** swaps hard bevels for a gradient pill (`--mirk-pill-inner-top`
  over `--mirk-bevel-bg`, framed by a `--mirk-bevel-br` to `--mirk-bevel-tl` gradient). Same
  light-from-above logic, softer geometry.
- **No pure black, no pure white** (decision 0005). Even the darkest and lightest
  tokens are tinted, which is what keeps the palette feeling like warm paper and
  cool slate rather than a default UI.

A component is "on brand" when it speaks in these tokens. A class that hardcodes a
hex has left the design system.

---

## 4. Theming: 28 tokens, one block, single-attribute override

v1 duplicated all 28 tokens across four blocks (`:root`, `@media dark`, `.light`,
`.dark`), about 112 declarations kept in sync by hand. `light-dark()` collapses
that to one value per token. The browser picks the side from `color-scheme`.

```css
@layer base {
  :root {
    color-scheme: light dark;            /* default: follow the OS, and theme native controls too */

    --mirk-canvas:        light-dark(#F7F2EA, #0B0C13);
    --mirk-bg:            light-dark(#F7F2EA, #1D1F2F);
    --mirk-fg:            light-dark(#15120e, #F6F7F9);
    --mirk-accent:        light-dark(#efefe5, #232639);
    --mirk-destructive:   light-dark(#d4183d, #ff5566);
    --mirk-focus-color:   light-dark(#BBA288, #5A607F);
    --mirk-bevel-bg:      light-dark(#e9d3bd, #1D1F2F);
    --mirk-bevel-fg:      light-dark(#15120e, #F6F7F9);
    --mirk-bevel-tl:      light-dark(#f3ddc7, #474C65);
    --mirk-bevel-br:      light-dark(#c2ad95, #131725);
    --mirk-bevel-hover-bg: light-dark(#dfc9b3, #232639);
    --mirk-pill-inner-top: light-dark(#efdac7, #232639);
    --mirk-input-border:  light-dark(#957E65, #6E738E);
    --mirk-placeholder-color: light-dark(#7F7366, #545973);
    --mirk-ctrl-bg:       light-dark(#8C7660, #5F6582);
    --mirk-toggle-bg:     light-dark(#DFC9AF, #656D95);
    --mirk-toggle-hi:     light-dark(#E9D6C3, #7F87AD);
    --mirk-toggle-lo:     light-dark(#C7A88A, #505677);
    --mirk-mark-fg:       light-dark(#3F3225, #E1E3EA);
    --mirk-sortable-dot:  light-dark(#e2c5a6, #393f5b);
    --mirk-sortable-shadow:    light-dark(#c7a47f, #111527);
    --mirk-sortable-label:     light-dark(#231e18, #edeef2);
    --mirk-sortable-placeholder: light-dark(#99826c, #6f7695);
    --mirk-slider-fill:   light-dark(#e9d3bd, #232639);
    --mirk-slider-nub-bg: light-dark(#DFC9AF, #656D95);
    --mirk-slider-nub-hi: light-dark(#E9D6C3, #7F87AD);
    --mirk-slider-nub-lo: light-dark(#C7A88A, #505677);

    --mirk-focus-offset: 2px;                 /* non-color token, unified across themes (was 2px / 3px) */
    --mirk-radius: 5px;                        /* the "rounded" corner */

    background: var(--mirk-canvas);
    color: var(--mirk-fg);
  }

  /* Force a mode on any subtree with ONE attribute. Class aliases for hosts that
     prefer class-based theming (and Tailwind's dark-variant convention). */
  [data-theme="light"], .light { color-scheme: light; }
  [data-theme="dark"],  .dark  { color-scheme: dark;  }
}
```

```html
<body>                         <!-- follows the visitor's OS -->
<body data-theme="dark">       <!-- forces dark -->
<aside class="light">          <!-- forces light on just this subtree -->
```

Three properties of this approach:

1. **Right default for a drop-in kit.** No attribute means follow the OS. The dev
   opts into a forced mode, they are never stuck in one by accident.
2. **`color-scheme` themes native controls too.** Scrollbars, the date picker,
   the base `<select>` popup all flip with the tokens. A free win for a form kit.
3. **One source per value.** No more four-way drift like `mirk-input.css` suffered.

`light-dark()` covers color values, which is 27 of the 28 tokens. The one
non-color token, `--mirk-focus-offset`, was `2px` light and `3px` dark, unified to
`2px` here. If the 1px difference matters, keep a one-line override under
`[data-theme="dark"]`.

**Custom brand themes** stay an explicit block, the correct escape hatch:

```css
[data-theme="sunset"] {
  color-scheme: light;
  --mirk-accent: #f0a868;
  --mirk-bevel-bg: #f7e3cf;
}
```

**The Tailwind bridge** (optional), wire a Tailwind token into mirk's:

```css
@theme { --color-brand: #5b8def; }   /* now bg-brand, text-brand exist */
:root { --mirk-accent: var(--color-brand); }
```

---

## 5. Behavior: reach for the platform first

mirk is form-focused, so the platform covers most of it. Default to native, script
only the six documented gaps.

| Component            | Native primitive, no JS                                            |
|----------------------|--------------------------------------------------------------------|
| Text, number, date   | `<input>` with the right `type`                                    |
| Textarea             | `<textarea>` (resize vertical only, decision 0015)                 |
| Select / dropdown    | `<select>` + `appearance: base-select`, style the `::picker(select)` |
| Checkbox, radio      | hidden `<input>` + styled `<span>` parts, state via `:has(:checked)` |
| Toggle               | hidden `<input type=checkbox role=switch>` + track and thumb spans   |
| Validation           | native constraints + `:user-invalid` styling                       |

`appearance: base-select` is the new customizable select, in Chromium now and
landing elsewhere. The graceful fallback is free: without it the `<select>` still
works, it just shows the OS popup instead of the styled `::picker`. Same posture
the field takes on any progressive feature, enhance where supported, never break.

---

## 6. When you DO write JS: delegate, never `init()`

The six components that native CSS can't finish (decision 0014) each need a few
lines. They share one rule that serves malleable HTML directly: **the markup
carries the initial state, delegation carries the transitions.**

A per-element `init()` breaks the moment new markup appears, an injected fragment,
a re-rendered list, a Hyperclay file edited and re-saved. You would have to re-run
it every time. **Event delegation removes the problem.** One listener on
`document` handles every current and future element, no init, no ready flags, no
`MutationObserver`.

```js
// mirk.js — one listener per interaction, survives any DOM mutation.

// Number stepper: custom bevel buttons drive the native input.
document.addEventListener("click", (e) => {
  const step = e.target.closest(".mirk-number__step");
  if (!step) return;
  const input = step.closest(".mirk-number").querySelector("input[type=number]");
  step.dataset.step === "up" ? input.stepUp() : input.stepDown();
  input.dispatchEvent(new Event("change", { bubbles: true }));
});

// Slider: mirror the value into --mirk-value on the WRAPPER, which the fill (width)
// and nub (left) both read. The snippet ships an inline style="--mirk-value:60%"
// matching value="60", so the fill is correct BEFORE this runs (round-trip);
// this only handles dragging.
document.addEventListener("input", (e) => {
  const input = e.target.closest(".mirk-slider__input");
  if (!input) return;
  input.closest(".mirk-slider").style.setProperty("--mirk-value", `${input.value}%`);
});

// Tags: Enter or comma adds a real chip element, × or Backspace removes one.
document.addEventListener("keydown", (e) => {
  const input = e.target.closest(".mirk-tags__input");
  if (!input) return;
  if (e.key === "Enter" || e.key === ",") {
    const v = input.value.trim();
    if (!v) return;
    e.preventDefault();
    input.before(makeChip(v));            // chip is DOM, so outerHTML keeps it
    input.value = "";
  } else if (e.key === "Backspace" && !input.value) {
    const chips = input.closest(".mirk-tags").querySelectorAll(".mirk-tags__chip");
    chips[chips.length - 1]?.remove();
  }
});
```

Required properties of any mirk JS (decision 0014):

- `outerHTML` round-trips the visible state. Chips are real DOM, custom props
  live in inline `style`, native values are the platform's job.
- Delegated from `document`, keyed by class or `data-*`, idempotent, safe to
  include twice.
- Tiny. Past roughly 20 lines for a component, the design is wrong.

**Progressive enhancement contract:** every component looks right and is usable as
plain HTML before `mirk.js` loads. JS only enhances. The slider shows its fill,
the tags show their starting chips, the file input works, all from markup alone.

---

## 7. The class API and the conversion checklist

BEM with a `mirk-` block prefix.

- **Block** = component: `mirk-button`, `mirk-tags`.
- **Element** = `__part`, only when structure requires it: `mirk-tags__chip`.
- **Modifier** = `--variant`: shape `--round` (pill) or `--rounded` (soft corners),
  size `--small` / `--large` (medium is the unmodified base).

`--round` and `--rounded` are different on purpose: `--round` is the gradient pill
register, `--rounded` is a rectangular control with a `--mirk-radius` corner. Shape
defaults follow decision 0013.

The fourteen, with structure and where to lift values:

| Component   | Block            | Parts (`__`)                          | Modifiers                         | Structure        | Values from (`index.html`) |
|-------------|------------------|----------------------------------------|-----------------------------------|------------------|----------------------------|
| Button      | `mirk-button`    | `__label`                               | `--round`, `--small`, `--large`   | block + label             | Button • Rect / Round       |
| Text input  | `mirk-input`     | none                                    | `--rounded`, `--small`, `--large` | single                    | Text Input • Rect / Rounded |
| Textarea    | `mirk-textarea`  | none                                    | `--rounded`                       | single                    | Textarea                    |
| Number      | `mirk-number`    | `__input`, `__step`                     | `--rounded`, `--small`, `--large` | wrapper + parts           | Number                      |
| Dropdown    | `mirk-select`    | none (`::picker(select)`)               | `--round`, `--small`, `--large`   | single + pseudo           | Dropdown • Rect / Round     |
| Checkbox    | `mirk-checkbox`  | `__box`, `__mark`, `__label`            | none                              | label + spans, `:has()`   | Checkbox                    |
| Radio       | `mirk-radio`     | `__ring`, `__fill`, `__dot`, `__label`  | none                              | label + spans, `:has()`   | Radio                       |
| Toggle      | `mirk-toggle`    | `__track`, `__thumb`, `__label`         | `--round`                         | label + spans, `:has()`   | Toggle • Rect / Round       |
| Slider      | `mirk-slider`    | `__input`, `__track`, `__fill`, `__nub` | `--round`                         | wrapper + parts, `--mirk-value`| Slider • Rect / Round       |
| Date        | `mirk-date`      | none (`::-webkit-calendar-picker-indicator`) | `--rounded`                  | single + pseudo           | Date                        |
| File picker | `mirk-file`      | `__input`, `__button`, `__name`         | `--round`, compact / button+text  | wrapper + parts           | File (4 variants)           |
| Image input | `mirk-image`     | `__input`, `__preview`, `__placeholder` | `--rounded`                       | wrapper + parts           | Image                       |
| Tags        | `mirk-tags`      | `__chip`, `__remove`, `__input`         | `--round`                         | wrapper + parts           | Tags • Rect / Round         |
| Sortable    | `mirk-sortable`  | `__item`                                | none                              | wrapper + parts           | Sortable                    |

Conversion tasks, in order:

- [ ] Write `mirk.css`: `@layer base, components;`, the `light-dark()` token block, the font.
- [ ] Convert each component above to its `@layer components` class family, values lifted from the showcase.
- [ ] For each element in the existing markup, set its BEM class and move its utilities into one component rule. Keep the DOM identical, do not flatten spans.
- [ ] Ship a visually-hidden helper (`mirk-sr-only`) in `mirk.css`; the hidden checkbox/radio/toggle inputs rely on it and Tailwind is optional now.
- [ ] Rewrite `mirk.js` as the delegated listeners in §6, move initial state into the markup.
- [ ] Rebuild `index.html` to render components via the new classes (it becomes the proof and the docs).
- [ ] Namespace every token `--mirk-*` in `mirk.css` (and the slider's `--mirk-value`). Decided yes.
- [ ] `package.json`: drop the Tailwind build, set `mirk.css` as the product, bump to `2.0.0` (the class API is breaking).
- [ ] Update `README.md` install paths (Tailwind now optional) and `DECISIONS.md` (new entry for the semantic-class architecture).
- [ ] Retire `mirk-input.css` (no longer a source).

---

## 8. Naming and the API contract

- **Class = appearance. `data-*` = behavior. Native attribute = native behavior.**
  Never overload one for another. `class="mirk-toggle"` styles it, `:checked`
  carries its state, no `data-toggle` needed. Restyle without touching JS, rehook
  JS without touching CSS.
- **Prefix everything `mirk-`.** A small kit has no claim on the generic `.button`
  or `.input` namespace, the prefix prevents collisions with the host app's CSS.
- **Lean on native attributes for native behavior.** `<select>`, `:checked`,
  `type=date` are less custom surface than inventing `data-mirk-*` hooks, and they
  are accessible by default.

**Namespaced tokens.** Every theme token is prefixed `--mirk-*` (for example
`--mirk-bg`, `--mirk-accent`, `--mirk-bevel-tl`) so the kit never collides with a
host page's own custom properties when it drops in. A consumer overriding one sets
the namespaced name under their own `:root` or a `[data-theme]` block. The
per-instance slider state var is namespaced the same way (`--mirk-value`); the
private variant hook stays `--_bg` by the underscore-means-local convention.

```
mirk-button(__label)  mirk-button--round  mirk-button--small  mirk-button--large
mirk-input  mirk-textarea  mirk-number(__input,__step)  mirk-select  mirk-date
mirk-checkbox(__box,__mark,__label)  mirk-radio(__ring,__fill,__dot,__label)
mirk-toggle(__track,__thumb,__label)  mirk-slider(__input,__track,__fill,__nub)
mirk-file(__input,__button,__name)  mirk-image(__input,__preview,__placeholder)
mirk-tags(__chip,__remove,__input)  mirk-sortable(__item)  mirk-sr-only

[data-theme="dark"] / [data-theme="light"]   (theme override, .dark / .light aliased)
:checked  :user-invalid  appearance:base-select   (state and behavior via the platform)
```

---

## 9. Accessibility checklist (non-negotiable)

- `:focus-visible` ring on every interactive class: 1px outline, `--mirk-focus-offset`
  away, keyboard only (decision 0002). Never style bare `:focus`.
- Wrapped controls (the round select's gradient pill around the `<select>`) put
  `:has(:focus-visible)` on the wrapper and `outline: none` on the inner control.
  Not `:focus-within`, which also fires on mouse click.
- Minimum hit target, controls clear 2.5rem / 40px.
- `prefers-reduced-motion: reduce` removes transitions and the press-nudge.
- `forced-colors: active` keeps borders visible in Windows high-contrast.
- Native elements (`<button>`, `<select>`, `<input>`, `<textarea>`) inherit
  keyboard and ARIA behavior, do not reinvent it.
- Token colors clear WCAG contrast in both light and dark.
- The `<select>` shows a `:focus-visible` ring on mouse click in Chromium and
  Firefox, accepted as native behavior (decision 0002).

---

## 10. Publishing `mirk-interface` (appendix)

```json
{
  "name": "mirk-interface",
  "version": "2.0.0",
  "type": "module",
  "main": "mirk.js",
  "style": "mirk.css",
  "exports": {
    ".": "./mirk.js",
    "./mirk.css": "./mirk.css",
    "./plugin": "./plugin.js"
  },
  "files": ["mirk.js", "mirk.css", "fonts/DepartureMono-1.500/DepartureMono-Regular.woff2", "fonts/DepartureMono-1.500/LICENSE", "README.md", "LICENSE"]
}
```

v2 is a breaking change, the entire class API is new, so it is a major bump.
Per-component JS imports are over-optimization, the whole runtime is a few KB of
delegated listeners. Ship one file.

---

## The principles, compressed

1. **Two hinges.** Components in `@layer components` so utilities always win, and
   `outerHTML` round-trips state so the file is correct before any script.
2. **The CSS file is the product.** Hand-written `mirk.css`, no build, Tailwind
   optional. npm and the plugin are thin wrappers.
3. **Progressive enhancement.** Every component looks right and works as plain
   HTML before `mirk.js` loads.
4. **Write states once on the base class.** Hover, active, focus, disabled derive
   from tokens and apply to every size and shape.
5. **Name the structure, don't flatten it.** Each existing span becomes a BEM
   `__part`, its utilities move into one component rule, the DOM stays identical.
   Read state once on the block with `:has()`.
6. **Theme with `light-dark()` and `color-scheme`.** One value per token, follow
   the OS by default, force a mode with one `data-theme` attribute.
7. **Reach for the platform first.** `<select>`, `:checked`, `:user-invalid`,
   `<input type=date>`. Script only the six documented gaps.
8. **When you must script, delegate.** One `document` listener, no `init()`,
   initial state in the markup, transitions in the handler.
9. **Class = appearance. `data-*` = behavior. Native attribute = native behavior.**
   Never blur the line. Prefix everything, classes and tokens.
10. **Respect the machine.** Reduced-motion, forced-colors, focus-visible, real
    hit targets, no pure black or white.
