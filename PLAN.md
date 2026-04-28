# PLAN

Task tracker. Project rules and scope live in `README.md`. Decision reasoning lives in `DECISIONS.md` and `HISTORY.md`.

## Not done

### Setup
_(empty — all setup tasks done)_

### Components — build order (simple → complex)

For each item: read Primer source, read Carbon source, add a `## NNNN — <component>` section to `DECISIONS.md` (with cited SHAs from `refs/SOURCES.md`), build the mirk version as plain HTML/CSS (+ a styled third-party plugin only where native isn't an option), verify `outerHTML` round-trips state, add to `index.html` (and `compare.html` once it exists), verify dark + light look correct.

- [ ] 00 — Button (variants: primary, default/secondary, tertiary/outline, ghost/invisible, danger, link)
- [ ] 01 — Single-line text input
- [ ] 02 — Textarea
- [ ] 03 — Number / integer (min/max/step)
- [ ] 04 — Checkbox + checkbox group
- [ ] 05 — Radio + radio group
- [ ] 06 — Toggle / boolean (styled `<input type="checkbox">`)
- [ ] 07 — Button group / segmented control (styled radios, CSS-only)
- [ ] 08 — Select / dropdown (single) — approach already locked in `HISTORY.md` 2026-04-27
- [ ] 09 — Range / slider
- [ ] 10 — Date
- [ ] 11 — Time
- [ ] 12 — Datetime
- [ ] 13 — Date range (two date inputs)
- [ ] 14 — File picker
- [ ] 15 — Image input — see "Open questions" below
- [ ] 16 — Markdown — see "Open questions" below
- [ ] 17 — Rich text / WYSIWYG (atop overtype.dev, styled)
- [ ] 18 — Code editor (styled third-party plugin; choice TBD — likely CodeMirror or Prism + textarea)

### Deferred (revisit later)
- [ ] Tags (input-style) — needs JS, postponed
- [ ] Multi-select — needs JS, postponed

### Cross-cutting (revisit after a few components are built)
- [ ] Form composition primitives — label, hint text, error text, required marker (all CSS-only patterns)
- [ ] Validation: lean on native HTML constraints + `:user-invalid` styling
- [ ] A11y conventions doc (focus ring is locked in `DECISIONS.md` 0002; remaining items: keyboard, ARIA, screen reader)
- [ ] Token reference doc (color, spacing, typography, motion, radii, elevation) — populated as the palette is harvested

### Open questions (decide when we get to that component)
- **Image input**: pure HTML can offer `<input type="file" accept="image/*">` only — preview-after-pick requires JS. Options: ship without preview, or treat preview as a tiny inline-script exception. Decide when building component 15.
- **Markdown**: textarea-only (no preview/syntax highlighting) vs reuse overtype.dev (which is itself a markdown editor) for both Markdown and Rich text components. Decide when building component 16.

## Done

- [x] Decision tracking restructured: top-level `DECISIONS.md` + `UNDECIDED.md`, `HISTORY.md` is append-only audit trail (2026-04-27)
- [x] `README.md` documents `experiments/`, `artifacts/`, `index.html`, `compare.html` (2026-04-27)
- [x] `DECISIONS.md` 0001 — Theming foundations (Tailwind v4 CDN, class-based dark mode, both themes shown side-by-side) (2026-04-27)
- [x] `DECISIONS.md` 0002 — Focus ring convention (1px outline, 2px offset, `:focus-visible` only) (2026-04-27)
- [x] Clone Primer + Carbon (shallow) into `refs/`; SHAs recorded in `refs/SOURCES.md` (2026-04-27)
- [x] Single-select dropdown approach picked: native `<select>` with `appearance: base-select` (2026-04-27, see `HISTORY.md`)
- [x] `index.html` skeleton — Tailwind v4 CDN, dark `@custom-variant`, side-by-side light/dark layout (2026-04-27)
- [x] `compare.html` standing up — Carbon (12 components, both themes via WC CDN); Primer (8 components, both themes via Vite-resolved imports). `DECISIONS.md` 0003 (2026-04-27)
