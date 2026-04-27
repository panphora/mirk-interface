# PLAN

Task tracker. Project rules and scope live in `README.md`. Component reasoning lives in `decisions/`.

## Not done

### Setup
- [ ] Choose showcase app build tool (likely Vite + React) and record in `decisions/0001-showcase-stack.md` — affirmed constraints: React for cols 1+2, raw HTML render in col 3, Tailwind available in col 3 only (or scoped) so it doesn't bleed into Primer/Carbon
- [ ] Decide how mirk snippets are stored and rendered: each component lives as `mirk/<component>/index.html` (+ optional `index.css`). Plugin-backed components also include the plugin's own `<script src="…">` reference inside the snippet. Showcase imports the raw HTML string. Record in `decisions/0002-mirk-snippet-format.md`
- [ ] Theming: confirm Tailwind class-based dark mode (`darkMode: 'class'`) on a root toggle; record in `decisions/0003-theming.md`
- [ ] Scaffold showcase app with 3-column layout (Primer | Carbon | mirk) and dark/light toggle that drives all three columns
- [ ] Install `@primer/react` and `@carbon/react` as showcase dependencies
- [ ] Create `refs/` and clone Primer + Carbon (shallow); record commit SHAs in `refs/SOURCES.md`

### Components — build order (simple → complex)

For each item: read Primer source, read Carbon source, write `decisions/NNNN-<component>.md`, build mirk version as plain HTML/CSS (+ a styled third-party plugin only where native isn't an option), verify `outerHTML` round-trips state, add to 3-col showcase, verify dark + light.

- [ ] 01 — Single-line text input
- [ ] 02 — Textarea
- [ ] 03 — Number / integer (min/max/step)
- [ ] 04 — Checkbox + checkbox group
- [ ] 05 — Radio + radio group
- [ ] 06 — Toggle / boolean (styled `<input type="checkbox">`)
- [ ] 07 — Button group / segmented control (styled radios, CSS-only)
- [ ] 08 — Select / dropdown (single) — see "Open questions" below
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
- [ ] Focus-ring + a11y conventions doc
- [ ] Token reference doc (color, spacing, typography, motion, radii, elevation)

### Open questions (decide when we get to that component)
- **Select / dropdown styling**: native `appearance: none` + OS popup (works everywhere) vs `appearance: base-select` (full styling of open dropdown, Chromium-only as of early 2026 — would be progressive enhancement). Decide in `decisions/NN-select-styling.md`.
- **Image input**: pure HTML can offer `<input type="file" accept="image/*">` only — preview-after-pick requires JS. Options: ship without preview, or treat preview as a tiny inline-script exception. Decide in `decisions/NN-image-input.md`.
- **Markdown**: textarea-only (no preview/syntax highlighting) vs reuse overtype.dev (which is itself a markdown editor) for both Markdown and Rich text components.

## Done

_(empty)_
