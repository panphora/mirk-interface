# mirk v2 conversion — execution record

Implements `mirk-ui-guide.md`: convert v1's copy-paste Tailwind snippets into
semantic BEM classes (`mirk-button`, `mirk-button--round`) in `@layer components`,
hand-written `mirk.css`, no build. Behavior + pixels must match v1 exactly.

## Key fidelity findings (probed from live baseline)
- Tailwind v4 gradients interpolate `in oklab` — all mirk gradients must too.
- Rect button has NO transition (instant hover). Round button: `opacity .15s cubic-bezier(.4,0,.2,1)`.
- Toggle thumb: `transition-property: transform, translate, scale, rotate; .15s; cubic-bezier(.4,0,.2,1)`,
  moves via the `translate` property (rect 22px, round 21px).
- `rounded-full` → use `9999px`. Chevron `translate:0 -50%; rotate:90deg`.
- `light-dark()` resolves per-subtree from `color-scheme` (verified) → `.dark`/`.light` columns work.

## Decisions (aligned with guide + "keep identical")
1. Tokens namespaced `--mirk-*`, one `light-dark()` block. EXCEPTION: `--mirk-focus-offset`
   is non-color; keep 2px light / 3px dark (guide unified to 2px, but we preserve exact behavior).
2. `.light`/`.dark`/`[data-theme]` also set `background`+`color` (as v1 did) so the two-column
   showcase and any consumer `class="dark"` wrapper paints its canvas.
3. `mirk-select` keeps `appearance:none` + a `__chevron` part (NOT base-select/::picker) to
   render identically today and cross-browser. base-select is a future enhancement.
4. index.html keeps Tailwind CDN for page layout/chrome; only the 14 components become
   semantic classes. The "drop in once" install section is updated to the new 2-file method
   (intended doc change; not a component).
5. Extra structural parts beyond the guide's summary table where the markup needs them:
   `mirk-number__steps`, `mirk-select__field/__frame/__chevron`, `mirk-date__field/__icon`,
   `mirk-file__button-label`, `mirk-image__frame/__button/__button-label`,
   `mirk-tags__chip-inner`, `mirk-sortable__grip/__dots/__dot/__body/__row/__label/__field`.
   Round toggle/slider inner fills become `::after` (decorative, hold no state → round-trip safe).
6. package.json → 2.0.0, drop tailwind build (copy-only), add `plugin.js`. Retire `mirk-input.css`.

## Verify
Baseline screenshot saved /tmp/mirk-baseline.png. After build, screenshot again and compare
component regions (computed-style spot checks + visual). Commit/push at intervals.
