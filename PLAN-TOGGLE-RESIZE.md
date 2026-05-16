# Plan: toggle resize + nub color exploration

Status: planning only, no edits applied yet.

## Goals

1. Make the toggle (both rect and round variants) **2px wider and 2px taller**.
2. Add **1px more breathing room** between the thumb and the surrounding border. Thumb dimensions stay the same.
3. Add a **temporary fixed-bar color picker** to the top of `experiments.html`, split dark/light, with 5 candidate nub palettes per panel. Pick the best ones, then bake those values into `.panel-dark` / `.panel-light` and remove the picker (same workflow as the recent `--mark-fg` tuner).

## 1. Geometry change

### Current vs. target dimensions

Both panels use identical geometry, so changes apply in 4 spots (rect+round × dark+light = 4 toggle blocks total, 2 markup spots each — track + thumb — for 8 line edits, but everything else is unchanged).

| Variant | Property | Current | Target | Delta |
|---|---|---|---|---|
| Rect | track size | `w-[44px] h-[24px]` | `w-[46px] h-[26px]` | +2 / +2 |
| Rect | thumb position | `top-[2px] left-[2px]` | `top-[3px] left-[3px]` | +1 / +1 |
| Rect | thumb size | `w-[18px] h-[18px]` | unchanged | — |
| Rect | translate on check | `translate-x-[20px]` | unchanged | — |
| Round | track size | `w-[48px] h-[26px]` | `w-[50px] h-[28px]` | +2 / +2 |
| Round | thumb position | `top-[2px] left-[2px]` | `top-[3px] left-[3px]` | +1 / +1 |
| Round | thumb size | `w-[20px] h-[20px]` | unchanged | — |
| Round | translate on check | `translate-x-[22px]` | unchanged | — |

### Why the translate value doesn't change

The translate must equal: `inner_track_width − thumb_width − 2 × gap`.

Rect: was `42 − 18 − 2×2 = 20`. New: `44 − 18 − 2×3 = 20`. Identical.

Round: was `46 − 20 − 2×2 = 22`. New: `48 − 20 − 2×3 = 22`. Identical.

Adding 2px of track width is exactly absorbed by 1px of extra gap on each side. Clean: no JS or per-variant translate math needed.

### Decision-record impact

`DECISIONS.md` 0017 doesn't currently pin specific dimensions (it speaks in terms of construction, not numbers). The resize is a tuning-level change, not a spec-level one. Probably no DECISIONS edit; new `HISTORY.md` entry should capture the numbers.

## 2. Nub color picker (temporary dev tool)

### UI

A fixed bar pinned to the top of the page, split 50/50 dark/light, sitting above both panels (same pattern as the now-removed `--mark-fg` tuner). Each half contains:

- 5 swatch buttons in a row, each rendered as a mini bevel thumb (`w-[20px] h-[20px]` block using the same construction the real toggle thumb uses, so the swatch literally previews what the toggle will look like with that palette).
- The currently-active swatch gets a focus ring.
- A monospace hex readout below the row showing the active triplet: `bg #XXXXXX · hi #XXXXXX · lo #XXXXXX`, with `select-all` for easy copy.

### Mechanism

- Each panel's swatch row stores the 5 candidate triplets in a `data-` attribute or inline JS array.
- Click a swatch → JS calls `panel.style.setProperty('--ctrl-bg', …)`, same for `hi` / `lo` on every matching panel element.
- Initial state: option 1 ("Current") active in each row.
- Same removal pattern as the mark-fg tuner: pull the bar + JS + the `mt-[…]` grid offset after final values are committed.

## 3. Proposed light-mode palettes

Current is the medium warm brown `#8C7660 / #A89078 / #6E5C49`. Five candidates, with Current first so you can A/B against it without reloading:

| # | Name | bg | hi | lo | Rationale |
|---|---|---|---|---|---|
| 1 | Current | `#8C7660` | `#A89078` | `#6E5C49` | medium warm brown — baseline |
| 2 | Espresso | `#3D2E22` | `#5B4A3B` | `#1F1610` | much darker brown, deeper bevel; reads as a defined object on cream |
| 3 | Cool slate | `#5A6478` | `#76819A` | `#3E4659` | breaks the warm scheme; thumb becomes a distinct cool note on cream |
| 4 | Bevel-match | `#e9d3bd` | `#f3ddc7` | `#c2ad95` | reuses `--bevel-bg/tl/br` from the light panel — thumb reads as a tiny bevel button. Note: this is the approach DECISIONS.md 0017 explicitly rejected, kept here as a control for the comparison |
| 5 | Charcoal | `#2A241D` | `#4A4136` | `#0E0A06` | near-black with brown undertone; maximum contrast on cream |

## 4. Proposed dark-mode palettes

Current is the medium blue-gray `#5F6582 / #7780A0 / #3F4459`. You said dark is "not bad" but worth a look. Same structure:

| # | Name | bg | hi | lo | Rationale |
|---|---|---|---|---|---|
| 1 | Current | `#5F6582` | `#7780A0` | `#3F4459` | medium blue-gray — baseline |
| 2 | Brighter slate | `#7A8099` | `#9CA3BD` | `#5A5F75` | same hue family, lifted brightness; more separation from the near-black canvas |
| 3 | Warm copper | `#9E7D63` | `#BB9881` | `#7E614B` | inverts the warm/cool relationship (currently dark is cool, light is warm); a warm thumb on a cool canvas |
| 4 | Neutral gray | `#8A8A8A` | `#A6A6A6` | `#6E6E6E` | true neutral, no hue cast; lets the surrounding palette breathe |
| 5 | Sage | `#6E8276` | `#8FA396` | `#506258` | cool green-gray, gentle hue shift away from the bevel-blue family |

## 5. Slider coupling — DECISION: decouple now

`DECISIONS.md` 0019 currently locks the slider's filled portion to `--ctrl-bg` ("for visual consistency with the toggle thumb"). We're decoupling that link before the picker iteration so the toggle exploration doesn't drag the slider along for the ride. Rationale: we're still learning what the right toggle palette is; the coupling was an early-stage convenience, not an earned invariant.

### Var-family changes

| Var | Current role | New role |
|---|---|---|
| `--ctrl-bg` | toggle thumb base + slider filled portion | **slider filled portion only** |
| `--ctrl-hi` | toggle thumb bevel highlight | **removed** (no remaining consumer) |
| `--ctrl-lo` | toggle thumb bevel shadow | **removed** (no remaining consumer) |
| `--toggle-bg` | — | **new** — toggle thumb base |
| `--toggle-hi` | — | **new** — toggle thumb bevel highlight |
| `--toggle-lo` | — | **new** — toggle thumb bevel shadow |

The slider keeps `--ctrl-bg` at its existing values (`#5F6582` dark, `#8C7660` light) — no slider change in this pass.

### Markup changes

Toggle thumb in `experiments.html` swaps `--ctrl-*` references for `--toggle-*`:

- **Rect thumb:** `bg-[var(--ctrl-bg)]` → `bg-[var(--toggle-bg)]`; borders `--ctrl-hi/lo` → `--toggle-hi/lo`.
- **Round thumb:** gradient `from-[var(--ctrl-lo)] to-[var(--ctrl-hi)]` → `from-[var(--toggle-lo)] to-[var(--toggle-hi)]`; inner solid `bg-[var(--ctrl-bg)]` → `bg-[var(--toggle-bg)]`.
- Slider markup unchanged.

### Decision-record impact

- `DECISIONS.md` 0010 — "in use" list adds `--toggle-bg/hi/lo`; drops `--ctrl-hi/lo` from the list (and keeps `--ctrl-bg`).
- `DECISIONS.md` 0017 — Decision section rewrites to reference `--toggle-*`. The reasoning ("dedicated control palette, not the bevel-button palette") still applies; only the var names change. Add a note acknowledging the var rename and pointing at the HISTORY entry for the rationale.
- `DECISIONS.md` 0019 — drop the "shared with the toggle thumb per `0017`" parenthetical from the slider's filled-portion description; `--ctrl-bg` remains correct for the slider, just no longer shared.

The picker bar will write to `--toggle-bg/hi/lo` (not `--ctrl-*`), so the slider stays put while you iterate.

## 6. What ships, what doesn't

- **Geometry change** — ships once you've eyeballed the new size and it reads right.
- **Var decoupling** (`--ctrl-*` split into slider-only `--ctrl-bg` and toggle-only `--toggle-bg/hi/lo`) — ships as part of the same pass, since the picker writes to the new toggle vars.
- **Picker bar + JS** — temporary; removed after final palettes are picked.
- **New `--toggle-*` values** — bake into `.panel-dark` / `.panel-light` after you pick. `DECISIONS.md` 0010, 0017, 0019 updated as described in section 5. New `HISTORY.md` bullet documenting (a) the decoupling, (b) the resize, (c) the retuned palettes.

## 7. Order of operations when we proceed

1. **Geometry change** — 8 markup edits in `experiments.html` (rect track / rect thumb position / round track / round thumb position, each in both panels).
2. **Var decoupling** — in the panel CSS blocks, remove `--ctrl-hi/lo`, add `--toggle-bg/hi/lo` initialized to the same values the toggle currently uses (so the toggle looks identical at the start). Swap the toggle markup to reference `--toggle-*`.
3. **Picker bar + JS** — fixed split bar at the top of `experiments.html`, mini bevel-thumb swatches (default UI). Picker writes to `--toggle-bg/hi/lo` on the matching panel.
4. **You iterate** — click swatches, find the winning triplet for each panel, paste both to me.
5. **Bake** — I swap the panel vars to the chosen values, remove the picker (bar + JS + grid offset).
6. **Docs** — update `DECISIONS.md` 0010 / 0017 / 0019; append a new bullet to `HISTORY.md` 2026-05-15 covering decouple + resize + retune.

## Decisions locked from open questions

1. **Slider coupling** — decouple now. Spec changes captured in section 5.
2. **Light-mode palette directions** — keep the 5 as proposed (Current, Espresso, Cool slate, Bevel-match, Charcoal).
3. **Dark-mode palette directions** — keep the 5 as proposed (Current, Brighter slate, Warm copper, Neutral gray, Sage).
4. **Swatch UI** — mini bevel thumb (preview-style), the default I described in section 2.
