# experiments.html — plan

A single, buildless `experiments.html` at `mirk-ui-kit/experiments/experiments.html` showcasing button + dropdown designs, each rendered in **4 font variations**, on a page split vertically into a dark and a light canvas.

Stays consistent with project rules: Tailwind v4 via CDN, no JS components, native form elements where possible.

## Page layout

The page is split into two equal columns by background:

- **Left half — dark canvas.** Background `#0B0C13` (the same color used on hyperclay.com — `bg-[#0B0C13]` in `home.edge`). Foreground text in light tones.
- **Right half — light canvas.** Background `#FFFFF8` (warm cream you specified). Foreground text in dark tones.

Both halves render the same components in the same order — so for each component you see its dark and light treatment on one screen, no scrolling between modes.

Implementation: a single full-bleed grid (`grid grid-cols-2 min-h-screen`) with a dark `<section>` and a `class="dark"` wrapper not needed — the dark column just wears its own colors directly. (We're not using Tailwind dark-mode utilities here because the split is spatial, not theme-toggled.) If you'd prefer to drive it through `class="dark"` so utilities like `dark:bg-…` work in both columns, say so and I'll wire it that way instead.

## Fonts (4 variations per component)

The 4 fonts come from `mirk-ui-kit/fonts/`. Loaded via local `@font-face` declarations referencing `../fonts/...` (relative path works from the `experiments/` folder). One variation per font:

| # | Family declared as | File |
| - | ------------------ | ---- |
| 1 | `Geist`            | `fonts/geist-font-1.8.0/fonts/Geist/webfonts/Geist-Regular.woff2` (+ `-Medium`, `-SemiBold` for button weight) |
| 2 | `Geist Mono`       | `fonts/geist-font-1.8.0/fonts/GeistMono/webfonts/GeistMono-Regular.woff2` |
| 3 | `Departure Mono`   | `fonts/DepartureMono-1.500/DepartureMono-Regular.woff2` |
| 4 | `Geist Pixel`      | `fonts/geist-font-1.8.0/fonts/GeistPixel/webfonts/...` |

That gives a clean spread: a clean sans (Geist), a programmer's mono (Geist Mono), a retro/lo-fi pixel-mono (Departure Mono), and a chunky pixel face (Geist Pixel).

If you'd rather swap one of those for **Google Sans Code** or **Maple Mono NL** (also in the folder), say which one to drop and I'll re-pick.

For each component, I'll lay out the 4 variations as a vertical stack labeled with the font name, repeated on both halves.

## Buttons (two designs × 4 fonts = 8 buttons per side)

### A. Hyperclay retro button — extracted from `hyperclay/server-pages/components/button.edge`

Faithful conversion of the Edge component to plain HTML. Drops the `@let`/`@if` shell; keeps every Tailwind class verbatim plus the active-press translate behavior on the inner `<span>`.

- `<button>` form. (The `<a>` form is the same markup with a different tag — not interesting for font comparison.)
- **`font-fixedsys` becomes a per-variation override.** Each of the 4 button instances drops `font-fixedsys` and applies its own `style="font-family: ..."` — so we can see how the retro-bevel chrome reads against modern sans, mono, and pixel faces.
- Default size only (`text-[20px] p-[4px_17px_7px]`).

### B. The "Play Game" gradient button — verbatim from your message

```html
<button class="relative cursor-pointer opacity-90 hover:opacity-100 transition-opacity p-[2px] bg-black rounded-[16px] bg-gradient-to-t from-[#8122b0] to-[#dc98fd] active:scale-95">
  <span class="w-full h-full flex items-center gap-2 px-8 py-3 bg-[#B931FC] text-white rounded-[14px] bg-gradient-to-t from-[#a62ce2] to-[#c045fc]">Play Game</span>
</button>
```

Pasted exactly as you provided.

## Dropdowns (three designs × 4 fonts = 12 dropdowns per side)

All three experiment folders share a `Dropdown.tsx` that wraps a native `<select>` — perfect for a clean HTML extraction. Each adds its own visual flavor; that's the part worth comparing.

### 1. "Custom UI Kit Design" — brutalist offset-shadow

- 2px solid border, square corners, no chevron icon (Lucide `ChevronDown` 24px).
- Focus state: `box-shadow: 4px 4px 0 0 var(--foreground)` — hard offset shadow.
- Label is plain bold text.

### 2. "Custom UI Kit Design 2" — same shape, quieter focus

- Same 2px border + square corners.
- Focus state: `outline: 1px solid var(--foreground); outline-offset: 1px` — closer to mirk's locked focus convention (DECISIONS 0002).
- Label is plain bold text.

### 3. "Custom UI Kit Design 8bit" — terminal/pixel aesthetic

- VT323 / Press Start 2P fonts (loaded via Google Fonts).
- ▼ ASCII chevron instead of an icon.
- Label: uppercase `> COUNTRY`.
- Hint: `// you can pick…`. Error: `! REQUIRED`.

For each, I'll use the **Country** dropdown showcase from each experiment's `App.tsx` (US/CA/MX/UK/DE/JP options) so we're comparing apples-to-apples.

## File structure

Single `experiments/experiments.html`:

- Tailwind v4 via `@tailwindcss/browser` CDN (matches `index.html` / `compare.html`).
- `<style>` block with local `@font-face` rules pointing at `../fonts/...` for Geist, Geist Mono, Departure Mono, Geist Pixel.
- Top-level grid: `grid grid-cols-2 min-h-screen`. Left `<section>` has `bg-[#0B0C13] text-white`; right has `bg-[#FFFFF8] text-[#0B0C13]`.
- Inside each side, sections in this order: **Buttons → Hyperclay retro (×4 fonts)**, **Buttons → Play Game gradient (×4 fonts)**, **Dropdowns → Brutalist (×4 fonts)**, **Dropdowns → Quiet focus (×4 fonts)**, **Dropdowns → 8bit (×4 fonts)**.
- Each variation labeled inline with the font name.

Pure HTML, no build step, opens from `file://`. Local `@font-face` paths resolve relative to `experiments.html`.

## What I'm not doing

- Not using Radix `select.tsx` from those experiment folders — those are React/portal-rendered popovers, hostile to copy-paste HTML and against the locked rules. The `Dropdown.tsx` wrappers are native `<select>` already.
- Not adding inputs yet — you mentioned "buttons and inputs and dropdowns" but the explicit ask was buttons + dropdowns. I'll wait for a separate ask on inputs.
- Not editing `PLAN.md` / `DECISIONS.md` / `HISTORY.md`. This is exploratory; if anything graduates we can capture it then.

## Open questions before I build

1. **Font picks confirmed?** I'm proposing Geist / Geist Mono / Departure Mono / Geist Pixel. Want me to swap one for **Google Sans Code** or **Maple Mono NL** (both are in the folder)?
2. **Page split mechanics**: spatial only (left section uses dark colors directly) or driven through `class="dark"` so Tailwind `dark:` utilities work in the dark column? Spatial is simpler; `dark:` is more in the spirit of DECISIONS 0001. I lean spatial for this exploration.
3. **Section labels**: terse ("Hyperclay button", "Brutalist dropdown") or longer with inline provenance? I'll go terse unless you say otherwise.
4. **Inputs**: you mentioned them but the explicit ask was buttons + dropdowns — I'll wait for a follow-up before adding them.
