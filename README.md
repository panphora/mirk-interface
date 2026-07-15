# mirk

A form-focused HTML/CSS UI kit. Seventeen form components plus a content tier (note, hint, list, badge, table, page scaffold) as **semantic BEM classes** in one hand-written CSS file, plus one tiny delegated script. No build step, no React, no web components, Tailwind optional. Published as `mirk-interface` on npm.

Every component is built on native HTML elements with a pixel-bevel look set in Departure Mono. State lives where the platform already keeps it: in native attributes, in CSS state selectors, and in real DOM nodes. That means a component's visible state round-trips through `outerHTML`, so a saved-and-reopened file renders correctly before any script runs. mirk targets malleable HTML (Hyperclay), but nothing in it is Hyperclay-specific: it is plain CSS and one small delegated runtime that work on any page.

## Live showcase

Open `index.html` from the [GitHub repo](https://github.com/panphora/mirk-interface) in any browser or static server. The showcase IS the documentation: every component, every variant, with the exact markup you copy.

## Quick start

Two ways to load mirk. The drop-in path is primary and needs no build and no Tailwind. The Tailwind path is optional, for when you want utilities to override mirk classes.

### Primary: drop-in, zero install, no Tailwind

Add these two tags once, then paste any component snippet where you need it.

```html
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/mirk-interface@2/mirk.css">
<script src="https://cdn.jsdelivr.net/npm/mirk-interface@2/mirk.js"></script>
```

`mirk.css` ships the font, the 28 theme tokens, and all fifteen components, and it renders fully on its own. This is the path for a single-file HTML artifact, a Hyperclay app, a Rails view, a static page, anywhere you just want components without a toolchain.

Those URLs are served straight from npm by jsDelivr, no setup. The `@2` pin tracks the latest 2.x release, so you get patches and minor updates but never a breaking major. Pin exactly with `mirk-interface@2.0.0` to freeze a version, or drop the pin (`.../npm/mirk-interface/mirk.css`) to ride the newest major. The same files are on unpkg too: `https://unpkg.com/mirk-interface@2/mirk.css`. The font loads automatically, `mirk.css` references it by a relative path that resolves to `https://cdn.jsdelivr.net/npm/mirk-interface@2/fonts/...` on the CDN.

### Boot a full page

`mirk.css` also ships a one-class page scaffold. Put `mirk-page` on `<body>` and you get a centered reading column with mirk typography: headings sized for the pixel face (Departure Mono has one weight, so hierarchy comes from size), underlined links, bordered inline `code`, a recessed `<pre>`, a hairline `<hr>`, and flow spacing between blocks. Save this as an `.html` file and open it — that is the whole setup:

```html
<!doctype html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>my mirk page</title>
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/mirk-interface@2/mirk.css">
</head>
<body class="mirk-page">

  <p class="mirk-eyebrow">getting started</p>
  <h1>A mirk page</h1>
  <p>Plain HTML plus mirk classes. Paste any component below.</p>

  <button class="mirk-button"><span class="mirk-button__label">it works</span></button>

<script src="https://cdn.jsdelivr.net/npm/mirk-interface@2/mirk.js"></script>
</body>
</html>
```

A fuller template ships as [`starter.html`](starter.html) in the repo. Every scaffold rule rides `:where()` (zero specificity), so any utility class or plain rule of your own overrides it. See [Page scaffold](#page-scaffold) for the details.

### Optional: Tailwind, to override mirk with utilities

Import Tailwind first, then mirk.

```css
@import "tailwindcss";
@import "mirk-interface/mirk.css";
```

Now `class="mirk-input mirk-input--large w-full font-sans"` works: utilities win over the component layer because mirk lives in `@layer components`, with zero `!important`. Use this path when you already build with Tailwind and want to tweak mirk components with utility classes. Tailwind is never required.

## How it works

Two architectural hinges hold the kit together.

### 1. mirk lives in `@layer components`

Tailwind v4 emits `@layer theme, base, components, utilities`, so utilities always win over the component layer. To make mirk self-sufficient even without Tailwind, `mirk.css` declares its own `@layer base, components;` up front. That gives it a defined cascade order on a bare page, and still slots into Tailwind's order when Tailwind is present. The result: you can override any mirk class with a utility, no specificity hacks, no `!important`, whether or not Tailwind is on the page.

### 2. `outerHTML` round-trips the visible state

mirk is designed for malleable HTML (Hyperclay), where the page can save its own `outerHTML` back to a file and reopen it later. So mirk keeps state where serialization can capture it, in three buckets:

- **Native elements hold their own state.** A checkbox's `checked`, an input's `value`, a select's `selected` option all live in the DOM and persist in markup.
- **CSS-only state needs no JS.** Visuals derive from `:checked`, `:focus-visible`, `:has()`, and friends, so nothing has to be re-applied on load.
- **JS-built state lives in the DOM.** Tag chips are real elements with hidden inputs, the slider's fill reads an inline `--mirk-value` on the wrapper. Both serialize.

A saved-and-reopened file is therefore correct before any script runs. mirk.js only animates live interaction, it never bootstraps state.

## Theming

mirk follows the visitor's OS theme by default and lets you force a mode per subtree.

- **OS default:** colors use `light-dark()`, so the kit matches the visitor's system light/dark preference with no configuration.
- **Force a mode globally:** put `class="dark"` or `class="light"` (or `data-theme="dark"` / `data-theme="light"`) on a wrapper near the root.
- **Force a mode per subtree:** the same classes/attributes on any wrapper force that mode for just that subtree, so you can pin a panel to dark while the rest of the page follows the OS.
- **Tokens:** 28 namespaced `--mirk-*` custom properties drive every color, bevel edge, and focus ring. Override them on a wrapper to retheme, rather than editing component classes. The namespace means mirk never collides with a host page's own custom properties.
- **Default palette — Pixel Quiet:** with no theme attribute, `:root` paints **Pixel Quiet**, a calm, soft-bevel palette (warm cream / deep navy) with warmer ink and a terracotta destructive. It follows the OS light/dark like any mirk page.
- **Built-in secondary — Full Volume:** the original louder, higher-contrast pixel-bevel palette ships as an opt-in variant, `data-theme="full-volume"`. It follows the OS like the default and composes with the `.dark` / `.light` aliases, so `data-theme="full-volume" class="dark"` is Full Volume forced dark. Add your own brand theme the same way, an explicit `[data-theme="..."]` block of token overrides.

```html
<div class="dark">
  <button class="mirk-button"><span class="mirk-button__label">always dark</span></button>
</div>

<div data-theme="light">
  <button class="mirk-button"><span class="mirk-button__label">always light</span></button>
</div>
```

## Components

In order: button, text input, textarea, number, dropdown, checkbox, radio, toggle, slider, date, file picker, image input, tags, sortable, chip, field, progress — plus invalid states on every constrainable control. Then the content tier — the pieces around a form that make a whole page: note, hint, list, badge, table, page scaffold. Everything from field onward is pure CSS (none of it needs mirk.js).

A note on conventions used below:

- **Sizes:** `--small` / `--large` are mutually exclusive modifiers, medium is the base with no size class.
- **Shapes:** `--round` (a gradient pill frame) or `--rounded` (rounded corners) where supported, rect is the base with no shape class.
- **Needs mirk.js:** only the components that say so. The rest are pure CSS over native elements.

---

### Button

A pixel-bevel push button rendered from a native `<button>` wrapping a `<span>` label. Two shapes (rect default, round pill) each in three sizes.

```html
<!-- Rect, medium (default) -->
<button class="mirk-button"><span class="mirk-button__label">discover more</span></button>
```

```html
<!-- Rect, small -->
<button class="mirk-button mirk-button--small"><span class="mirk-button__label">discover more</span></button>
```

```html
<!-- Rect, large -->
<button class="mirk-button mirk-button--large"><span class="mirk-button__label">discover more</span></button>
```

```html
<!-- Round, medium (default) -->
<button class="mirk-button mirk-button--round"><span class="mirk-button__label">Play Game</span></button>
```

```html
<!-- Round, small -->
<button class="mirk-button mirk-button--round mirk-button--small"><span class="mirk-button__label">Play Game</span></button>
```

```html
<!-- Round, large -->
<button class="mirk-button mirk-button--round mirk-button--large"><span class="mirk-button__label">Play Game</span></button>
```

```html
<!-- Quiet — a borderless text button, for tertiary actions -->
<button class="mirk-button mirk-button--quiet"><span class="mirk-button__label">Dismiss</span></button>
```

**Class API:** block `mirk-button` / part `__label` / modifiers `--small`, `--large`, `--round`, `--quiet`.

The inner `__label` span is mandatory for both shapes: rect uses it to nudge the text on `:active`, and round renders it as the inner pill fill (the `--round` element is just the gradient frame, so without the label there is no visible face). Pair the round modifier with a size modifier, each pairing re-homes padding and radius onto the label. Honors the native `disabled` attribute and shows a focus ring on `:focus-visible`. Theme via the bevel/pill/canvas tokens, do not set a flat `border` or `border-radius` on `.mirk-button` directly or you flatten the bevel.

`--quiet` drops the bevel for a flatter read: a borderless text button (a transparent border keeps the hit area and baseline aligned with neighbouring bevel buttons) for tertiary actions. It composes with the size modifiers. Note the kit has no flat "solid" fill: a button reads as clickable *because* it is embossed, so the strongest action is a brighter bevel, not a flat block. (The [Chip](#chip)'s action stack follows this: an embossed primary, a bevel secondary, and a `--quiet` dismiss.)

---

### Text input

A single-line text field rendered directly on a bevelled, full-width native `<input>`. Two shapes (rect default, rounded) and three sizes.

```html
<!-- Rect, medium (default) -->
<input type="text" placeholder="you@domain.com" class="mirk-input">
```

```html
<!-- Rect, small -->
<input type="text" placeholder="you@domain.com" class="mirk-input mirk-input--small">
```

```html
<!-- Rect, large -->
<input type="text" placeholder="you@domain.com" class="mirk-input mirk-input--large">
```

```html
<!-- Rounded, medium -->
<input type="text" placeholder="you@domain.com" class="mirk-input mirk-input--rounded">
```

```html
<!-- Rounded, small -->
<input type="text" placeholder="you@domain.com" class="mirk-input mirk-input--small mirk-input--rounded">
```

```html
<!-- Rounded, large -->
<input type="text" placeholder="you@domain.com" class="mirk-input mirk-input--large mirk-input--rounded">
```

```html
<!-- With associated label -->
<label for="email" class="text-[16px] leading-normal">Email</label>
<input id="email" type="text" placeholder="you@domain.com" class="mirk-input">
```

**Class API:** block `mirk-input` (no parts) / modifiers `--small`, `--large`, `--rounded`.

The class is applied straight to the native `<input>`, so the whole component is one self-contained element and any native attribute works (`type`, `placeholder`, `value`, `name`, `id`, `required`, `disabled`). State round-trips via native attributes (set the `value` attribute to persist a typed value in markup). rect is the base (`border-radius: 0` is baked in), add `--rounded` only for rounded corners. `.mirk-input` is `width: 100%`, so constrain it with a sized or max-width parent. Pair with a `<label for>` for accessibility.

---

### Textarea

A multi-line text input styled directly on a native `<textarea>`, with a beveled surface and vertical resize. Two shapes (rect default, rounded), no size modifiers.

```html
<!-- Rect (default) -->
<label class="text-[18px] leading-normal">Message</label>
<textarea rows="4" placeholder="Write something…" class="mirk-textarea"></textarea>
```

```html
<!-- Rounded -->
<label class="text-[18px] leading-normal">Message</label>
<textarea rows="4" placeholder="Write something…" class="mirk-textarea mirk-textarea--rounded"></textarea>
```

**Class API:** block `mirk-textarea` (no parts) / modifier `--rounded`.

The class lives on the native `<textarea>`, no wrapper. Standard attributes apply (`rows`, `placeholder`, `value`, `disabled`), and typed content round-trips via `outerHTML`. The rect variant hardcodes `border-radius: 0`, so `--mirk-radius` only applies when you add `--rounded`. The showcase `<label>` is plain, add `for` / `id` yourself for explicit association.

---

### Number

A beveled numeric stepper that wraps a native number input with up/down buttons. Two shapes (rect default, rounded) and three sizes.

```html
<!-- Rect, medium (default) -->
<div class="mirk-number">
  <input type="number" value="5" min="0" max="999" step="1" class="mirk-number__input">
  <div class="mirk-number__steps">
    <button type="button" data-step="up" class="mirk-number__step">▲</button>
    <button type="button" data-step="down" class="mirk-number__step">▼</button>
  </div>
</div>
```

```html
<!-- Rect, small -->
<div class="mirk-number mirk-number--small">
  <input type="number" value="5" min="0" max="999" step="1" class="mirk-number__input">
  <div class="mirk-number__steps">
    <button type="button" data-step="up" class="mirk-number__step">▲</button>
    <button type="button" data-step="down" class="mirk-number__step">▼</button>
  </div>
</div>
```

```html
<!-- Rect, large -->
<div class="mirk-number mirk-number--large">
  <input type="number" value="5" min="0" max="999" step="1" class="mirk-number__input">
  <div class="mirk-number__steps">
    <button type="button" data-step="up" class="mirk-number__step">▲</button>
    <button type="button" data-step="down" class="mirk-number__step">▼</button>
  </div>
</div>
```

```html
<!-- Rounded, medium -->
<div class="mirk-number mirk-number--rounded">
  <input type="number" value="5" min="0" max="999" step="1" class="mirk-number__input">
  <div class="mirk-number__steps">
    <button type="button" data-step="up" class="mirk-number__step">▲</button>
    <button type="button" data-step="down" class="mirk-number__step">▼</button>
  </div>
</div>
```

```html
<!-- Rounded, small -->
<div class="mirk-number mirk-number--small mirk-number--rounded">
  <input type="number" value="5" min="0" max="999" step="1" class="mirk-number__input">
  <div class="mirk-number__steps">
    <button type="button" data-step="up" class="mirk-number__step">▲</button>
    <button type="button" data-step="down" class="mirk-number__step">▼</button>
  </div>
</div>
```

```html
<!-- Rounded, large -->
<div class="mirk-number mirk-number--large mirk-number--rounded">
  <input type="number" value="5" min="0" max="999" step="1" class="mirk-number__input">
  <div class="mirk-number__steps">
    <button type="button" data-step="up" class="mirk-number__step">▲</button>
    <button type="button" data-step="down" class="mirk-number__step">▼</button>
  </div>
</div>
```

**Class API:** block `mirk-number` / parts `__input`, `__steps`, `__step` / modifiers `--small`, `--large`, `--rounded`.

**Needs mirk.js.** A delegated `click` handler on `document` catches clicks on `.mirk-number__step`, finds the sibling `input[type=number]`, and calls `stepUp()` or `stepDown()` based on the button's `data-step` ("up" / "down"), then dispatches a bubbling `change`. Without mirk.js the step buttons do nothing, but typing in the field still works. `min`, `max`, and `step` constrain stepping, and the current number lives in the input's `value` attribute so state round-trips. The component hides the browser's default spinner and supplies its own bevel buttons. The chevrons are literal text glyphs (▲ / ▼).

---

### Dropdown (select)

A styled wrapper around a native `<select>` that keeps full native behavior while replacing the OS chevron with a mirk-themed one. Two shapes (rect default, round pill) in three sizes.

```html
<!-- Rect, medium (default) -->
<div class="mirk-select">
  <select class="mirk-select__field">
    <option value="">Select a country</option>
    <option value="us">United States</option>
    <option value="ca">Canada</option>
    <option value="mx">Mexico</option>
    <option value="uk">United Kingdom</option>
  </select>
  <span aria-hidden="true" class="mirk-select__chevron">›</span>
</div>
```

```html
<!-- Rect, small -->
<div class="mirk-select mirk-select--small">
  <select class="mirk-select__field">
    <option value="">Select a country</option>
    <option value="us">United States</option>
    <option value="ca">Canada</option>
    <option value="mx">Mexico</option>
    <option value="uk">United Kingdom</option>
  </select>
  <span aria-hidden="true" class="mirk-select__chevron">›</span>
</div>
```

```html
<!-- Rect, large -->
<div class="mirk-select mirk-select--large">
  <select class="mirk-select__field">
    <option value="">Select a country</option>
    <option value="us">United States</option>
    <option value="ca">Canada</option>
    <option value="mx">Mexico</option>
    <option value="uk">United Kingdom</option>
  </select>
  <span aria-hidden="true" class="mirk-select__chevron">›</span>
</div>
```

```html
<!-- Round, medium (default) -->
<div class="mirk-select mirk-select--round">
  <div class="mirk-select__frame">
    <select class="mirk-select__field">
      <option value="">Select a country</option>
      <option value="us">United States</option>
      <option value="ca">Canada</option>
      <option value="mx">Mexico</option>
      <option value="uk">United Kingdom</option>
    </select>
  </div>
  <span aria-hidden="true" class="mirk-select__chevron">›</span>
</div>
```

```html
<!-- Round, small -->
<div class="mirk-select mirk-select--round mirk-select--small">
  <div class="mirk-select__frame">
    <select class="mirk-select__field">
      <option value="">Select a country</option>
      <option value="us">United States</option>
      <option value="ca">Canada</option>
      <option value="mx">Mexico</option>
      <option value="uk">United Kingdom</option>
    </select>
  </div>
  <span aria-hidden="true" class="mirk-select__chevron">›</span>
</div>
```

```html
<!-- Round, large -->
<div class="mirk-select mirk-select--round mirk-select--large">
  <div class="mirk-select__frame">
    <select class="mirk-select__field">
      <option value="">Select a country</option>
      <option value="us">United States</option>
      <option value="ca">Canada</option>
      <option value="mx">Mexico</option>
      <option value="uk">United Kingdom</option>
    </select>
  </div>
  <span aria-hidden="true" class="mirk-select__chevron">›</span>
</div>
```

**Class API:** block `mirk-select` / parts `__field`, `__chevron`, `__frame` / modifiers `--small`, `--large`, `--round`.

Built on a real native `<select>`, so state round-trips via the `selected` attribute on an `<option>` (plus `value` / `disabled` / `multiple` / `name`). The field uses `appearance: none` to hide the native arrow, and the chevron span carries `aria-hidden="true"` with `pointer-events: none` so clicks fall through. Rect draws the bevel border on `__field`. Round requires the extra `__frame` wrapper around the select (it paints the gradient pill and projects the focus ring), so omit the frame for round and it will not render correctly. Always wrap select plus chevron in the `.mirk-select` block for chevron anchoring. Size modifiers go on the block, not on `__field`. For real forms, add `id` to the select and `for` to the label.

---

### Checkbox

A square checkbox built from a visually hidden native input plus a beveled box and a CSS-drawn checkmark. Single fixed shape; a medium base plus a `--small` size. Checked and unchecked are the only states.

```html
<!-- Unchecked -->
<label class="mirk-checkbox">
  <input type="checkbox" class="mirk-sr-only">
  <span class="mirk-checkbox__box"><span class="mirk-checkbox__mark"></span></span>
  <span class="mirk-checkbox__label">Subscribe to updates</span>
</label>
```

```html
<!-- Checked -->
<label class="mirk-checkbox">
  <input type="checkbox" class="mirk-sr-only" checked>
  <span class="mirk-checkbox__box"><span class="mirk-checkbox__mark"></span></span>
  <span class="mirk-checkbox__label">Send weekly digest</span>
</label>
```

**Class API:** block `mirk-checkbox` / parts `__box`, `__mark`, `__label` / no modifiers.

The native input is wrapped in a `<label>` so the whole row toggles via implicit association. State round-trips entirely through the native `checked` attribute: `.mirk-checkbox:has(:checked)` flips the border and reveals `__mark`, so persisting `outerHTML` preserves the state with no JS. The `__mark` is a pure-CSS check, so it must exist as an empty span even when unchecked. Base dimensions are 22px box / 18px label; `--small` gives 18px box / 14px label. No shape modifiers. Keep the input on `mirk-sr-only` (not `display:none` or `hidden`) so the `:has(:checked)` and `:has(:focus-visible)` selectors keep working.

---

### Radio

A beveled custom radio: a visually hidden native radio paired with a ring that swaps from a recessed fill to a centered dot when selected. Single round shape; a medium base plus a `--small` size.

```html
<!-- Round (default), single option -->
<label class="mirk-radio">
  <input type="radio" name="theme" class="mirk-sr-only" checked>
  <span class="mirk-radio__ring"><span class="mirk-radio__fill"></span><span class="mirk-radio__dot"></span></span>
  <span class="mirk-radio__label">Dawn</span>
</label>
```

```html
<!-- Round group (shared name) -->
<label class="mirk-radio">
  <input type="radio" name="theme" class="mirk-sr-only" checked>
  <span class="mirk-radio__ring"><span class="mirk-radio__fill"></span><span class="mirk-radio__dot"></span></span>
  <span class="mirk-radio__label">Dawn</span>
</label>
<label class="mirk-radio">
  <input type="radio" name="theme" class="mirk-sr-only">
  <span class="mirk-radio__ring"><span class="mirk-radio__fill"></span><span class="mirk-radio__dot"></span></span>
  <span class="mirk-radio__label">Dusk</span>
</label>
<label class="mirk-radio">
  <input type="radio" name="theme" class="mirk-sr-only">
  <span class="mirk-radio__ring"><span class="mirk-radio__fill"></span><span class="mirk-radio__dot"></span></span>
  <span class="mirk-radio__label">Auto</span>
</label>
```

**Class API:** block `mirk-radio` / parts `__ring`, `__fill`, `__dot`, `__label` / no modifiers.

Pure CSS, no mirk.js. A shared `name` drives single-selection within a group and `checked` marks the selected option. Selection state round-trips losslessly via the native `checked` attribute. `.mirk-radio:has(:checked)` flips the ring, hides `__fill`, and shows `__dot`, so all three spans must be present. The visually hidden input depends on the `mirk-sr-only` utility, without it the raw native radio shows alongside the custom ring.

---

### Toggle

A switch-style toggle built from a hidden native checkbox plus a beveled track and sliding thumb. Two shapes (rect default, round pill) and a `--small` size.

```html
<!-- Rect (default) -->
<label class="mirk-toggle">
  <input type="checkbox" role="switch" class="mirk-sr-only">
  <span class="mirk-toggle__track"><span class="mirk-toggle__thumb"></span></span>
  <span class="mirk-toggle__label">Wifi</span>
</label>
```

```html
<!-- Rect, checked -->
<label class="mirk-toggle">
  <input type="checkbox" role="switch" class="mirk-sr-only" checked>
  <span class="mirk-toggle__track"><span class="mirk-toggle__thumb"></span></span>
  <span class="mirk-toggle__label">Notifications</span>
</label>
```

```html
<!-- Round -->
<label class="mirk-toggle mirk-toggle--round">
  <input type="checkbox" role="switch" class="mirk-sr-only">
  <span class="mirk-toggle__track"><span class="mirk-toggle__thumb"></span></span>
  <span class="mirk-toggle__label">Wifi</span>
</label>
```

```html
<!-- Round, checked -->
<label class="mirk-toggle mirk-toggle--round">
  <input type="checkbox" role="switch" class="mirk-sr-only" checked>
  <span class="mirk-toggle__track"><span class="mirk-toggle__thumb"></span></span>
  <span class="mirk-toggle__label">Notifications</span>
</label>
```

**Class API:** block `mirk-toggle` / parts `__track`, `__thumb`, `__label` / modifier `--round`.

Pure CSS, no mirk.js. The native checkbox carries `role="switch"` and is the real control, hidden with `mirk-sr-only`. The label wrapper uses `:has(:checked)` to slide the thumb and `:has(:focus-visible)` for the focus outline, so all state round-trips through the `checked` attribute alone. The thumb span must be nested inside the track span, and the hidden input must keep `mirk-sr-only` or the raw checkbox is exposed.

---

### Slider

A range slider with a hidden native input overlaid on a styled track, fill, and beveled draggable nub. Two shapes (rect default, round pill) and a `--small` size.

```html
<!-- Rect (default) -->
<div class="mirk-slider" style="--mirk-value: 60%">
  <input type="range" min="0" max="100" value="60" class="mirk-slider__input">
  <div class="mirk-slider__track"><div class="mirk-slider__fill"></div></div>
  <div class="mirk-slider__nub"></div>
</div>
```

```html
<!-- Round -->
<div class="mirk-slider mirk-slider--round" style="--mirk-value: 60%">
  <input type="range" min="0" max="100" value="60" class="mirk-slider__input">
  <div class="mirk-slider__track"><div class="mirk-slider__fill"></div></div>
  <div class="mirk-slider__nub"></div>
</div>
```

**Class API:** block `mirk-slider` / parts `__input`, `__track`, `__fill`, `__nub` / modifier `--round`.

**Needs mirk.js.** A delegated `input` listener on `document` catches events from `.mirk-slider__input` and writes the value as a percentage into the wrapper's `--mirk-value` (e.g. "60%"), which both the fill width and the nub position read. The markup ships with an inline `--mirk-value` matching `value=`, so the slider renders correctly before JS runs, the handler only updates it live during dragging. State round-trips through two channels that must stay in sync: the input's `value=` attribute and the inline `style="--mirk-value: NN%"` on the wrapper, both as a 0-100 percentage. The hidden native input drives all interaction and keyboard accessibility, the `__nub` is decorative and `pointer-events: none`. This slider assumes a 0-100 range, change `min`/`max` away from 0/100 and the mirrored percentage no longer maps to the fill position.

---

### Date

A styled native date picker that wraps `input[type=date]`, overlays a decorative calendar icon, and hides the browser's default picker indicator. Two shapes (rect default, rounded).

```html
<!-- Rect (default) -->
<div class="mirk-date">
  <input type="date" class="mirk-date__field">
  <svg aria-hidden="true" xmlns="http://www.w3.org/2000/svg" class="mirk-date__icon" width="24" height="24" fill="currentColor" viewBox="0 0 24 24"><path d="M5 4h14v2H5zm0 16h14v2H5zM3 10h2v10H3zm0-4h2v2H3zm16 0h2v2h-2zm0 4h2v10h-2zM3 8h18v2H3zm12-6h2v2h-2zM7 2h2v2H7z"/></svg>
</div>
```

```html
<!-- Rounded -->
<div class="mirk-date mirk-date--rounded">
  <input type="date" class="mirk-date__field">
  <svg aria-hidden="true" xmlns="http://www.w3.org/2000/svg" class="mirk-date__icon" width="24" height="24" fill="currentColor" viewBox="0 0 24 24"><path d="M5 4h14v2H5zm0 16h14v2H5zM3 10h2v10H3zm0-4h2v2H3zm16 0h2v2h-2zm0 4h2v10h-2zM3 8h18v2H3zm12-6h2v2h-2zM7 2h2v2H7z"/></svg>
</div>
```

**Class API:** block `mirk-date` / parts `__field`, `__icon` / modifier `--rounded`.

The native `input[type=date]` provides the real calendar popup and value parsing, and the selected date lives in its `value` attribute, so `outerHTML` preserves it (set `value="2026-06-04"` to seed a default). The overlay icon is `aria-hidden="true"`. The `.mirk-date` wrapper is `position: relative` and must contain both the field and the icon so the absolute icon and the invisible WebKit picker indicator (a clickable strip on the right edge) line up. The icon-hiding and custom icon are WebKit/Chromium-specific, in Firefox the native indicator is not suppressed, so the decorative icon may sit alongside the browser's own. `--rounded` and `--small` are the available modifiers.

---

### File picker

A styled wrapper around a native file input that hides the real control and shows a beveled "Choose" button plus the selected filename. Two shapes (rect default, round) and two layouts (large "button + text" default, bordered `--compact`), four combinations. Each also takes a `--small` size (pair the trigger with `mirk-button--small`).

```html
<!-- Rect — Compact -->
<div class="mirk-file mirk-file--compact">
  <label class="mirk-button mirk-button--small">
    <input type="file" class="mirk-file__input">
    <span class="mirk-button__label">Choose</span>
  </label>
  <span class="mirk-file__name">No file chosen</span>
</div>
```

```html
<!-- Round — Compact -->
<div class="mirk-file mirk-file--compact mirk-file--round">
  <label class="mirk-button mirk-button--round mirk-button--small">
    <input type="file" class="mirk-file__input">
    <span class="mirk-button__label">Choose</span>
  </label>
  <span class="mirk-file__name">No file chosen</span>
</div>
```

```html
<!-- Rect — Button + Text (default) -->
<div class="mirk-file">
  <label class="mirk-button mirk-button--large">
    <input type="file" class="mirk-file__input">
    <span class="mirk-button__label">Choose…</span>
  </label>
  <span class="mirk-file__name">No file chosen</span>
</div>
```

```html
<!-- Round — Button + Text -->
<div class="mirk-file mirk-file--round">
  <label class="mirk-button mirk-button--round mirk-button--large">
    <input type="file" class="mirk-file__input">
    <span class="mirk-button__label">Choose…</span>
  </label>
  <span class="mirk-file__name">No file chosen</span>
</div>
```

**Class API:** block `mirk-file` / parts `__input`, `__name` / modifiers `--compact`, `--round`. The "Choose" trigger is a [`mirk-button`](#button): `--small` for `--compact`, `--large` for button+text, plus `--round` to match the shape.

**Needs mirk.js.** A delegated `change` listener on `document` watches `.mirk-file__input`, sets the sibling `.mirk-file__name` text to the chosen file's name (adding `data-filled`), or resets it to "No file chosen" otherwise. Without mirk.js the dialog still opens and the file is selected, but the name text never updates. The selected file itself does NOT round-trip via `outerHTML` (file inputs cannot have their value set programmatically), so a restored picker resets to empty. What persists is the displayed filename text plus its `data-filled` attribute (the CSS uses it to switch the name from placeholder to foreground color). The `mirk-button__label` span is required for the round variants because the gradient pill chrome is painted on the label.

---

### Image input

A square 120x120 image-upload control: a preview frame with a placeholder, plus a styled label that fires a hidden native file input. Two shapes (rect base, rounded), one fixed frame size.

```html
<!-- Rect (base) -->
<div class="mirk-image">
  <label class="text-[18px] leading-normal">Avatar</label>
  <div class="mirk-image__frame">
    <img class="mirk-image__preview" hidden alt="">
    <span class="mirk-image__placeholder">No image</span>
  </div>
  <label class="mirk-button mirk-button--large">
    <input type="file" accept="image/*" class="mirk-image__input">
    <span class="mirk-button__label">Upload image</span>
  </label>
</div>
```

```html
<!-- Rounded (--rounded) -->
<div class="mirk-image mirk-image--rounded">
  <label class="text-[18px] leading-normal">Avatar</label>
  <div class="mirk-image__frame">
    <img class="mirk-image__preview" hidden alt="">
    <span class="mirk-image__placeholder">No image</span>
  </div>
  <label class="mirk-button mirk-button--round mirk-button--large">
    <input type="file" accept="image/*" class="mirk-image__input">
    <span class="mirk-button__label">Upload image</span>
  </label>
</div>
```

**Class API:** block `mirk-image` / parts `__frame`, `__preview`, `__placeholder`, `__input` / modifier `--rounded`. The "Upload image" trigger is a [`mirk-button`](#button) (`--large`, plus `--round` for `--rounded`).

**Needs mirk.js.** A delegated `change` listener on `document` catches `.mirk-image__input`, reads the first file with `FileReader.readAsDataURL`, sets the data URL on `.mirk-image__preview`, removes its `hidden` attribute, and hides the placeholder. Without mirk.js the chrome still renders but no thumbnail appears. State does not fully round-trip: before selection, a captured `outerHTML` still shows the hidden img plus visible placeholder. If you serialize after an upload, the data URL in `src` and the toggled `hidden` attributes are captured, making the thumbnail self-contained. The native file input's selected File is never serializable. Keep the `__placeholder` span and the hidden `__preview` img present, the JS toggles them.

---

### Tags

A tag/token input where each entry renders as a removable chip alongside a free-text field. Two shapes: rectangular bevel-bordered chips (default) and a round variant whose chips become gradient pills via an extra inner wrapper. Plus a `--small` size.

```html
<!-- Rect (default) -->
<div class="mirk-tags">
  <span class="mirk-tags__chip">
    <span>design</span>
    <input type="hidden" name="tags[]" value="design">
    <button type="button" class="mirk-tags__remove">×</button>
  </span>
  <span class="mirk-tags__chip">
    <span>ascii</span>
    <input type="hidden" name="tags[]" value="ascii">
    <button type="button" class="mirk-tags__remove">×</button>
  </span>
  <input type="text" class="mirk-tags__input" placeholder="Add tag…">
</div>
```

```html
<!-- Round -->
<div class="mirk-tags mirk-tags--round">
  <span class="mirk-tags__chip">
    <span class="mirk-tags__chip-inner">
      <span>design</span>
      <input type="hidden" name="tags[]" value="design">
      <button type="button" class="mirk-tags__remove">×</button>
    </span>
  </span>
  <span class="mirk-tags__chip">
    <span class="mirk-tags__chip-inner">
      <span>ascii</span>
      <input type="hidden" name="tags[]" value="ascii">
      <button type="button" class="mirk-tags__remove">×</button>
    </span>
  </span>
  <input type="text" class="mirk-tags__input" placeholder="Add tag…">
</div>
```

**Class API:** block `mirk-tags` / parts `__chip`, `__chip-inner`, `__remove`, `__input` / modifier `--round`.

**Needs mirk.js.** A delegated `keydown` handler on `.mirk-tags__input` adds a chip on Enter or comma (building a `span.mirk-tags__chip` with a label span, a hidden `input[name="tags[]"]`, and a `.mirk-tags__remove` button, wrapped in a `.mirk-tags__chip-inner` when the container has `--round`), and removes the last chip on Backspace when the field is empty. A delegated `click` handler removes a chip when its × is clicked and refocuses the input on bare-container clicks. State round-trips fully via `outerHTML` because chips are real DOM elements: each carries a hidden `input[name="tags[]"]`, so the tag set is preserved on save and reload. The round variant requires the `__chip-inner` wrapper, the rect variant must NOT have it. mirk.js reads the container's `--round` class to decide whether new chips get the inner wrapper, so keep that modifier on the block. The × is a literal multiplication sign.

---

### Sortable

A draggable-looking list-item row: a dotted drag grip on the left and a stacked body of labeled fields on the right. Single shape, plus a `--small` size. Reordering must be wired to your own library, the kit only provides the grab-cursor cue.

```html
<!-- Default sortable item -->
<div class="mirk-sortable max-w-md">
  <div class="mirk-sortable__item">
    <div class="mirk-sortable__grip">
      <div class="mirk-sortable__dots">
        <span class="mirk-sortable__dot"></span>
        <span class="mirk-sortable__dot"></span>
        <span class="mirk-sortable__dot"></span>
        <span class="mirk-sortable__dot"></span>
        <span class="mirk-sortable__dot"></span>
        <span class="mirk-sortable__dot"></span>
        <span class="mirk-sortable__dot"></span>
        <span class="mirk-sortable__dot"></span>
      </div>
    </div>
    <div class="mirk-sortable__body">
      <div class="mirk-sortable__row">
        <label class="mirk-sortable__label">Link name</label>
        <input type="text" placeholder="Design review" class="mirk-sortable__field">
      </div>
      <div class="mirk-sortable__row">
        <label class="mirk-sortable__label">Link URL</label>
        <input type="url" placeholder="https://" class="mirk-sortable__field">
      </div>
    </div>
  </div>
</div>
```

**Class API:** block `mirk-sortable` / parts `__item`, `__grip`, `__dots`, `__dot`, `__body`, `__row`, `__label`, `__field` / modifier `--small`.

Reordering is NOT built in: the markup and CSS only render the look and the `cursor: grab` / `:active cursor: grabbing` cue on `.mirk-sortable__grip`. Wire a real reorder library (e.g. SortableJS) yourself, mirk.js does nothing for this component. The grip is a fixed 2-column grid of exactly 8 `__dot` spans, keep all 8 to preserve the pattern. `.mirk-sortable__row:not(:last-child)` draws the inter-row divider, so row order matters for borders. State that round-trips is just the native input values and attributes. Each `__item` is independent, repeat the item block inside `.mirk-sortable` for a multi-row list. `--small` tightens the grip, row padding, and field/label type (still all 8 dots) for a denser list.

---

### Chip

A collapsible recovery/notification: a round pill (with a soft lift) that expands into a raised panel with a header, an optional before/after field table, and a stacked set of actions. Three display states (collapsed, expanded, expanded + details), one shape. The pill and the panel are the kit's elevated surfaces, each a distinct face over the page with a drop shadow (the panel a larger drop, the pill a tighter one), so the prompt reads as raised, not as part of the page. The primary action is an embossed kit button in the chip's primary color (a warm brown in the Full Volume variant's light mode). Color reads from the kit's own tokens through 5 slim `--mirk-chip-*` hooks (`-surface`, `-edge`, `-primary-bg`, `-primary-fg`, `-alert`), so the chip matches the kit and follows the active palette + light/dark with no per-theme repaint; reskin it by overriding a hook, not a rule. Built for the "saved data was overwritten" prompt, but the copy and actions are yours to swap.

```html
<!-- Collapsed (the resting state) — the complete component; clicking the chip expands it -->
<div class="mirk-chip">
  <button type="button" class="mirk-chip__trigger mirk-button mirk-button--small mirk-button--round" data-mirk-chip="open" title="Click to expand">
    <span class="mirk-button__label"><svg class="mirk-chip__warn" width="15" height="15" viewBox="0 0 24 24" aria-hidden="true"><path d="M10 2h2v2h-2zM12 2h2v2h-2zM8 4h2v2h-2zM8 6h2v2h-2zM6 8h2v2h-2zM6 10h2v2h-2zM4 12h2v2h-2zM4 14h2v2h-2zM2 16h2v2h-2zM2 18h2v2h-2zM14 4h2v2h-2zM14 6h2v2h-2zM16 8h2v2h-2zM16 10h2v2h-2zM18 12h2v2h-2zM18 14h2v2h-2zM20 16h2v2h-2zM20 18h2v2h-2zM2 20h2v2h-2zM4 20h2v2h-2zM6 20h2v2h-2zM8 20h2v2h-2zM10 20h2v2h-2zM12 20h2v2h-2zM14 20h2v2h-2zM16 20h2v2h-2zM18 20h2v2h-2zM20 20h2v2h-2z"/><path d="M11 8h2v6h-2zM11 16h2v2h-2z"/></svg> Saved data overwritten</span>
  </button>
  <section class="mirk-chip__panel" role="dialog" aria-label="Data recovery">
    <div class="mirk-chip__head">
      <span class="mirk-chip__icon"><svg class="mirk-chip__warn" width="18" height="18" viewBox="0 0 24 24" aria-hidden="true"><path d="M10 2h2v2h-2zM12 2h2v2h-2zM8 4h2v2h-2zM8 6h2v2h-2zM6 8h2v2h-2zM6 10h2v2h-2zM4 12h2v2h-2zM4 14h2v2h-2zM2 16h2v2h-2zM2 18h2v2h-2zM14 4h2v2h-2zM14 6h2v2h-2zM16 8h2v2h-2zM16 10h2v2h-2zM18 12h2v2h-2zM18 14h2v2h-2zM20 16h2v2h-2zM20 18h2v2h-2zM2 20h2v2h-2zM4 20h2v2h-2zM6 20h2v2h-2zM8 20h2v2h-2zM10 20h2v2h-2zM12 20h2v2h-2zM14 20h2v2h-2zM16 20h2v2h-2zM18 20h2v2h-2zM20 20h2v2h-2z"/><path d="M11 8h2v6h-2zM11 16h2v2h-2z"/></svg></span>
      <div class="mirk-chip__headtext">
        <div class="mirk-chip__eyebrow">Data guard</div>
        <h3 class="mirk-chip__title">Saved data overwritten</h3>
      </div>
      <button type="button" class="mirk-chip__collapse" data-mirk-chip="collapse" aria-label="Collapse to chip"><svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M13 8h-2v2h2V8Zm-2 2H9v2h2v-2Zm4 0h-2v2h2v-2Zm-6 2H7v2h2v-2Zm8 0h-2v2h2v-2ZM7 14H5v2h2v-2Zm12 0h-2v2h2v-2Z"/></svg></button>
    </div>
    <div class="mirk-chip__meta">3 fields <button type="button" class="mirk-chip__changes-toggle" data-mirk-chip="changes">(view changes)</button></div>
    <div class="mirk-chip__preview">
      <div class="mirk-chip__row">
        <span class="mirk-chip__key">title</span>
        <span class="mirk-chip__old" title="Untitled draft copy that keeps going">Untitled draft copy that keeps going</span>
        <span class="mirk-chip__new" title="Q3 launch checklist — investor demo, pricing">Q3 launch checklist — investor demo, pricing</span>
      </div>
    </div>
    <div class="mirk-chip__actions">
      <button type="button" class="mirk-button mirk-button--small mirk-chip__action--primary"><span class="mirk-button__label">Restore my data</span></button>
      <button type="button" class="mirk-button mirk-button--small"><span class="mirk-button__label">Revert entire page</span></button>
      <button type="button" class="mirk-button mirk-button--small mirk-button--quiet"><span class="mirk-button__label">Dismiss</span></button>
    </div>
  </section>
</div>
```

For the two expanded states, start the same markup with the state baked into the classes: add `mirk-chip--open` on the block to open the panel, and `is-changes` on `.mirk-chip__panel` (with the toggle reading `(hide changes)`) to reveal the field table.

```html
<!-- Expanded -->            <div class="mirk-chip mirk-chip--open"> … </div>
<!-- Expanded + details -->  <section class="mirk-chip__panel is-changes"> … </section>
```

**Class API:** block `mirk-chip` / parts `__trigger`, `__warn`, `__panel`, `__head`, `__icon`, `__headtext`, `__eyebrow`, `__title`, `__collapse`, `__meta`, `__changes-toggle`, `__preview`, `__row`, `__key`, `__old`, `__new`, `__actions`, `__action--primary` / modifier `--open` (plus the panel's `is-changes` state). Every control is a [`mirk-button`](#button): the trigger is a [`mirk-button--round`](#button) pill, the primary action a `__action--primary` (a genuine kit bevel button whose `--mirk-bevel-*` palette is derived from `--mirk-chip-primary-bg` via `color-mix`, so it embosses in the primary color on any theme), the secondary a plain bevel button, the dismiss a [`mirk-button--quiet`](#button) text button.

**Needs mirk.js.** A single delegated `click` handler reads `data-mirk-chip` on the clicked control: `open` adds `mirk-chip--open` to the block, `collapse` removes it, and `changes` toggles `is-changes` on the panel and flips the toggle label between `(view changes)` and `(hide changes)`. Without mirk.js the component renders in whatever state its markup carries but the toggles do nothing. All three states round-trip through `outerHTML` because they live in classes (`mirk-chip--open`, `is-changes`), not in JS state. Every color is token-driven, so the chip renders correctly in both built-in palettes (Pixel Quiet, the default, and Full Volume), light and dark, with no edits. The warning glyph's color comes from `.mirk-chip__warn { fill: var(--mirk-chip-alert) }`, not an inline `fill`, because `var()` is not reliably honored in an SVG `fill=` presentation attribute. In a Hyperclay app, add `save-remove` to the `.mirk-chip` block so a transient recovery prompt never persists into the saved file. Long field values truncate with an ellipsis (give each a `title` for the full text).

### Field

Label + control + hint as one unit, so a form composes without utilities (and without needing the [page scaffold](#page-scaffold)'s rhythm). Any control drops in. Consecutive fields space themselves.

```html
<div class="mirk-field">
  <label class="mirk-field__label" for="f-email">Email</label>
  <input id="f-email" type="email" class="mirk-input" placeholder="you@domain.com">
  <p class="mirk-hint">We only use this to reply.</p>
</div>
<div class="mirk-field">
  <label class="mirk-field__label" for="f-msg">Message</label>
  <textarea id="f-msg" rows="3" class="mirk-textarea"></textarea>
</div>
```

**Class API:** block `mirk-field` / part `__label` / modifier `--small`.

One built-in behavior: an alert hint (`mirk-hint--alert`) placed inside a field stays hidden until a control in the field goes `:user-invalid` — a zero-JS native-validation message (see [Invalid states](#invalid-states)). To show an error unconditionally (say, a server-side failure), place the hint outside the field or override its `display`.

### Invalid states

Native constraint validation, styled. Add the platform's own attributes (`required`, `type="email"`, `min`, `pattern`, …) and the kit paints the control's border destructive once the field goes `:user-invalid` — which fires only after the user interacts, never on page load (that is the difference from `:invalid`). The focus ring stays the focus signal; the border is the error signal. Covered: text input, textarea, date, select, number (via its wrapper), checkbox, toggle, radio.

```html
<div class="mirk-field">
  <label class="mirk-field__label" for="f-req">Email (required)</label>
  <input id="f-req" type="email" required class="mirk-input" placeholder="you@domain.com">
  <p class="mirk-hint mirk-hint--alert">Enter a valid email address.</p>
</div>
```

No classes to add and no JS: the state lives in the platform's validity machinery, so it round-trips like everything else. Browsers without `:user-invalid` simply skip the paint; the form still validates.

### Progress

A native `<progress>` in the slider's clothes: the canvas channel, the slider-fill value bar. `--blocks` segments the fill into pixel blocks (the classic retro loading bar). Sizes and shapes compose.

```html
<progress class="mirk-progress" max="100" value="64">64%</progress>
```

```html
<!-- Pixel blocks -->
<progress class="mirk-progress mirk-progress--blocks" max="100" value="40">40%</progress>
```

```html
<!-- Round, small -->
<progress class="mirk-progress mirk-progress--round mirk-progress--small" max="100" value="80">80%</progress>
```

**Class API:** block `mirk-progress` (on `<progress>`) / modifiers `--blocks`, `--round`, `--small`. Give it a `value` — the indeterminate state is not styled.

### Note

An informational callout. Deliberately flat: in mirk, bevel means pressable, and a note is content, so it gets the kit's 1px content border over the recessed face, never a raised edge. The 4px left edge carries the status — neutral ink by default, destructive on `--alert`. The title is optional and uses the kit's eyebrow register, tinted to match the edge.

```html
<!-- Info (default) -->
<div class="mirk-note" role="note">
  <div class="mirk-note__title">Heads up</div>
  <div class="mirk-note__body">Your changes stay on this device until you sign in.</div>
</div>
```

```html
<!-- Alert -->
<div class="mirk-note mirk-note--alert" role="alert">
  <div class="mirk-note__title">Save failed</div>
  <div class="mirk-note__body">The server rejected the last save. Retry, or download a copy first.</div>
</div>
```

```html
<!-- Body only -->
<div class="mirk-note mirk-note--rounded" role="note">
  <div class="mirk-note__body">Exports include every version, not just the latest.</div>
</div>
```

**Class API:** block `mirk-note` / parts `__title` (optional), `__body` / modifiers `--alert`, `--rounded`.

Use `role="note"` for informational callouts and `role="alert"` for urgent ones (screen readers announce an alert immediately when it appears). An icon is composable — drop an inline SVG before `__title` — but is not part of the contract. There is no success/warning palette on purpose: the kit has one status color, `--mirk-destructive`, and the note's accent slots would take a new token, not a new rule, if that ever changes.

### Hint

Small print under a field: neutral help text, or validation text with `--alert`. The inline counterpart to the note.

```html
<label for="site-name">Site name</label>
<input id="site-name" type="text" class="mirk-input" placeholder="my-site">
<p class="mirk-hint">Lowercase letters and dashes only.</p>
```

```html
<p class="mirk-hint mirk-hint--alert">That name is already taken.</p>
```

**Class API:** block `mirk-hint` / modifier `--alert`.

### List

Content bullets in the pixel register. A `<ul>` gets a square pixel dot with the kit's 1px offset shadow (the sortable grip's dot, one step larger); a nested `<ul>` hollows it. An `<ol>` gets zero-padded counters ("01.", "02.") in the muted label ink. Bare `<li>` elements are styled by descent — no per-item class.

```html
<ul class="mirk-list">
  <li>Owns its own file</li>
  <li>Saves itself, no backend</li>
  <li>Runs anywhere
    <ul>
      <li>a browser tab</li>
      <li>a USB stick</li>
    </ul>
  </li>
</ul>
```

```html
<ol class="mirk-list">
  <li>Drop in the two tags</li>
  <li>Paste a component</li>
  <li>Ship the file</li>
</ol>
```

```html
<!-- Small -->
<ul class="mirk-list mirk-list--small">
  <li>Small register</li>
  <li>for dense panels</li>
</ul>
```

**Class API:** block `mirk-list` (on `<ul>` or `<ol>`) / modifier `--small`.

### Badge

A static tag label for content — versions, categories, statuses. The display counterpart to the [Tags](#tags) input, whose chips are interactive and removable; a badge is not pressable, so it is flat (1px border, no bevel). Modifiers compose.

```html
<span class="mirk-badge">beta</span>
<span class="mirk-badge mirk-badge--accent">docs</span>
<span class="mirk-badge mirk-badge--round">v2.3</span>
<span class="mirk-badge mirk-badge--alert">deprecated</span>
```

**Class API:** block `mirk-badge` / modifiers `--accent` (quiet filled), `--round` (pill), `--alert` (destructive).

### Table

A flat data surface: the content face in a 1px frame, header cells in the eyebrow register, hairline row dividers. Semantic `<table>` styled by descent — no per-cell classes. The header and stripe tints are `color-mix`ed toward the ink, so they stay visible in every palette. Wrap the table in an `overflow-x: auto` div when it can outgrow its column.

```html
<table class="mirk-table">
  <thead>
    <tr><th>Name</th><th>Status</th><th>Updated</th></tr>
  </thead>
  <tbody>
    <tr><td>kanban.html</td><td><span class="mirk-badge">live</span></td><td>2026-07-12</td></tr>
    <tr><td>writer.html</td><td><span class="mirk-badge mirk-badge--accent">draft</span></td><td>2026-07-10</td></tr>
  </tbody>
</table>
```

```html
<!-- Striped, small -->
<table class="mirk-table mirk-table--striped mirk-table--small">…</table>
```

**Class API:** block `mirk-table` (on `<table>`) / modifiers `--striped`, `--small`.

No row hover on purpose: in mirk, hover feedback means pressable, and a data table is content. If your rows are clickable, add your own hover via a utility or a one-line rule.

### Page scaffold

The quickstart shell (see [Boot a full page](#boot-a-full-page)). `mirk-page` on `<body>` — or any wrapper — gives a centered column plus typographic defaults: heading sizes for the single-weight pixel face, underline-offset links, bordered inline `code` and `kbd`, a recessed `<pre>`, a hairline `<hr>`, and flow spacing between direct children (headings open sections with more space above; an eyebrow hugs what follows it; a hint hugs what precedes it). `mirk-eyebrow` is the kit's signature section label — 11px uppercase, wide tracking, muted ink — as a shippable class, usable on `<p>`, `<label>`, or `<div>`.

```html
<body class="mirk-page">
  <p class="mirk-eyebrow">getting started</p>
  <h1>A mirk page</h1>
  <p>Headings, links, inline <code>code</code>, and flow spacing, from one class.</p>
</body>
```

**Class API:** block `mirk-page` / modifier `--wide` (960px column instead of 640px); block `mirk-eyebrow`.

Every typographic rule rides `:where()`, so it has zero specificity: any utility, component class, or plain consumer rule beats it. Flow spacing targets direct children only (`.mirk-page > * + *`), so margins never leak inside component internals. The scaffold is opt-in by design — linking `mirk.css` alone never restyles your page's bare elements.

## The class API

mirk uses BEM with a `mirk-` block prefix.

- **Block** = the component (`mirk-button`).
- **`__part`** = an element inside it (`mirk-button__label`).
- **`--modifier`** = a variant: shape (`--round` / `--rounded`), size (`--small` / `--large`), or layout (`--compact`). Medium and rect are the base, no class needed.

The kit's rule of thumb:

- **Class = appearance.** Visual variants are classes.
- **`data-*` = behavior.** The runtime reads attributes like `data-step="up"` to decide what to do.
- **Native attribute = native behavior.** `checked`, `value`, `min`, `max`, `disabled`, `selected` do exactly what the platform says, and they serialize for free.

Every theme token is namespaced `--mirk-*` (28 of them), so the kit never collides with a host page's own custom properties. Retheme by overriding tokens on a wrapper, not by editing component classes.

```
[data-theme="full-volume"]                   (opt-in secondary palette)
[data-theme="dark"] / [data-theme="light"]   (mode override, .dark / .light aliased)
:checked  :focus-visible  :has()             (state via the platform)
mirk-sr-only                                  (visually hidden, still focusable)
```

## What ships in v2

- **Form components (17):** button, text input, textarea, number, dropdown, checkbox, radio, toggle, slider, date, file picker, image input, tags, sortable, chip, field, progress. Each in its supported variants (rect / round / rounded, sizes where applicable). Plus `:user-invalid` styling on every constrainable control.
- **Content tier (2.3+):** note, hint, list, badge, table, and the `mirk-page` scaffold with `mirk-eyebrow`. Pure CSS, no runtime.
- **`mirk.css`:** the product. Hand-written, no build. Declares `@layer base, components`, 28 `light-dark()` tokens, the font, and every component class family.
- **`mirk.js`:** one delegated runtime for the components native CSS can't finish (number stepper, slider value bridge, file picker filename, image preview, tags add/remove, chip open/collapse/changes). One `document` listener per interaction, no `init()`, idempotent and safe to include twice. Listeners live on `document`.
- **Font:** Departure Mono (SIL OFL), shipped in the package and referenced by a relative URL in `mirk.css`, so it resolves correctly when loaded from jsDelivr.

## What's NOT in v2

- Time, datetime, datetime range, date range.
- Markdown, rich text, code editor.
- Multi-select.

## Develop / publish

```bash
npm run build      # the "build" is a copy: mkdir -p dist && cp mirk.css mirk.js dist/
npm publish        # publishes mirk-interface (only the "files" listed in package.json)
```

`mirk.css` is hand-written, not generated, there is nothing to compile. `npm publish` ships only the lean `files` list, not the whole repo.

## Repo structure

The npm package (`mirk-interface`) ships a lean subset: `mirk.css`, `mirk.js`, the Departure Mono font (woff2 plus its LICENSE), `README.md`, and `LICENSE`. Everything else, the showcase, the icons, the design docs, lives in the [GitHub repo](https://github.com/panphora/mirk-interface).

```
mirk-interface/
├── README.md               # this file (ships in the package)
├── LICENSE                 # MIT (ships in the package)
├── mirk.css                # THE PRODUCT — classes + tokens + font (ships)
├── mirk.js                 # delegated runtime, idempotent (ships)
├── fonts/DepartureMono-1.500/   # the kit's font, SIL OFL (woff2 + LICENSE ship)
├── index.html              # the showcase, a self-contained page (repo only)
├── starter.html            # copy-paste full-page template (repo only)
├── icons/svg/              # SVG icons used by the icons showcase (repo only)
├── package.json            # npm publish config (name: mirk-interface)
└── ...                     # design docs, experiments, references (repo only)
```

## License

MIT. The bundled Departure Mono font is licensed separately under the SIL Open Font License (OFL), see `fonts/DepartureMono-1.500/LICENSE`.
