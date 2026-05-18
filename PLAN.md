# PLAN

Task tracker. Project rules and scope live in `README.md`. Decision reasoning lives in `DECISIONS.md` and `HISTORY.md`.

## v1 — shipped

Fourteen components in the kit, all rendered on `index.html` side-by-side in light + dark with per-instance copy buttons. Runtime in `mirk.js`. Precompiled CSS in `mirk.css`. Departure Mono served from jsDelivr. Published as `mirkui` on npm (or pending publish — see `PLAN-V1-UI-KIT.md` phase 14).

- [x] 00 — Button (rect + round, 3 sizes each)
- [x] 01 — Single-line text input (rect + rounded, 3 sizes each)
- [x] 02 — Textarea (rect + rounded)
- [x] 03 — Number / integer (rect + rounded, 3 sizes each)
- [x] 04 — Checkbox
- [x] 05 — Radio
- [x] 06 — Toggle (rect + round)
- [x] 08 — Select / dropdown (rect + round, 3 sizes each)
- [x] 09 — Range / slider (rect + round)
- [x] 10 — Date (rect + rounded)
- [x] 14 — File picker (4 variants: rect/round × compact/button+text)
- [x] 15 — Image input (rect + rounded)
- [x] 19 — Tags (rect + round)
- [x] 20 — Sortable (visual only; consumer wires the reorder library)

## v2 — not done

### Components — build order (simple → complex)

For each item: read Primer source, read Carbon source, add a `## NNNN — <component>` section to `DECISIONS.md` (with cited SHAs from `refs/SOURCES.md`), build the mirk version as plain HTML/CSS (+ a styled third-party plugin only where native isn't an option), verify `outerHTML` round-trips state, add to `index.html`, verify dark + light look correct.

- [ ] 11 — Time
- [ ] 12 — Datetime
- [ ] 13 — Date range (two date inputs)
- [ ] 16 — Markdown — see "Open questions" below
- [ ] 17 — Rich text / WYSIWYG (atop overtype.dev, styled)
- [ ] 18 — Code editor (styled third-party plugin; choice TBD — likely CodeMirror or Prism + textarea)

### Deferred (revisit later)
- [ ] Multi-select — needs JS, postponed

### Cross-cutting (revisit after a few v2 components are built)
- [ ] Form composition primitives — label, hint text, error text, required marker (all CSS-only patterns)
- [ ] Validation: lean on native HTML constraints + `:user-invalid` styling
- [ ] A11y conventions doc (focus ring is locked in `DECISIONS.md` 0002; remaining items: keyboard, ARIA, screen reader)
- [ ] Token reference doc (color, spacing, typography, motion, radii, elevation)

### Open questions (decide when we get to that component)
- **Markdown**: textarea-only (no preview/syntax highlighting) vs reuse overtype.dev (which is itself a markdown editor) for both Markdown and Rich text components. Decide when building component 16.

## Done

- [x] Decision tracking restructured: top-level `DECISIONS.md` + `UNDECIDED.md`, `HISTORY.md` is append-only audit trail (2026-04-27)
- [x] `README.md` documents `experiments/`, `artifacts/`, `index.html` (2026-04-27)
- [x] `DECISIONS.md` 0001 — Theming foundations (Tailwind v4 CDN, class-based dark mode, both themes shown side-by-side) (2026-04-27); rewritten 2026-05-17 to `prefers-color-scheme` default + `.light`/`.dark` author override
- [x] `DECISIONS.md` 0002 — Focus ring convention (1px outline, 2px offset, `:focus-visible` only) (2026-04-27)
- [x] Clone Primer + Carbon (shallow) into `refs/`; SHAs recorded in `refs/SOURCES.md` (2026-04-27)
- [x] Single-select dropdown approach picked: native `<select>` with `appearance: base-select` (2026-04-27, see `HISTORY.md`)
- [x] `index.html` skeleton — Tailwind v4 CDN, dark `@custom-variant`, side-by-side light/dark layout (2026-04-27)
- [x] `compare.html` dev tool stood up (Carbon via WC CDN, Primer via Vite-resolved imports) (2026-04-27), then removed once v1 locked (2026-05-17)
- [x] v1 promotion: `experiments.html` → `index.html` at repo root, copy buttons on every instance, `mirk.js` extracted, `mirk.css` precompiled, package restructured for npm publish as `mirkui` (2026-05-17, see `PLAN-V1-UI-KIT.md` and `HISTORY.md`)
