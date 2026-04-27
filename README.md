# mirk-ui-kit

A form-focused UI kit (**mirk**) built from scratch by studying the best ideas in two reference design systems and writing our own opinionated take.

## Getting started — read in this order

1. **`README.md`** (you are here) — what mirk is, the locked rules, repo layout.
2. **`HISTORY.md`** — concise one-liner log of every decision and *why* it was made. Read this to understand the reasoning behind the rules below.
3. **`PLAN.md`** — current task state: what's done, what's next, open questions, deferred items.
4. **`decisions/`** — verbose ADRs. Skim only when working in a specific component's area; don't read end-to-end.

## Reference systems

| Column | System  | Source                                          |
| ------ | ------- | ----------------------------------------------- |
| 1      | Primer  | https://primer.style — `primer/react`           |
| 2      | Carbon  | https://carbondesignsystem.com — `carbon-design-system/carbon` |
| 3      | mirk    | this repo                                       |

The showcase app renders all three side-by-side in a **3-column layout** so each component can be visually compared against its Primer and Carbon counterparts as we build it.

## Approach

- Build each component **from scratch, one at a time**.
- For each component: read Primer's source, read Carbon's source, decide on mirk's approach, write it down (see "Decision log" below), then implement.
- Both **light and dark mode** are first-class — every component must work in both from day one.
- Reference repos live in `refs/` and are **read-only** — never edit them.

## Component scope

Form components only, in five groups:

**Text** — single-line text · textarea · markdown · rich text (WYSIWYG, configurable toolbar) · code editor (syntax-highlighted, language-pickable)

**Numeric & boolean** — number / integer (min/max/step) · range / slider · toggle / boolean

**Choice** — select (single) · multi-select · radio · checkboxes · button group / segmented control · tags

**Date & time** — date · time · datetime · date range

**Media** — image · file picker

## Locked technical choices

### Authoring model — pure HTML + CSS, plugins where native isn't enough

mirk components are **copy-pasteable plain HTML/CSS/Tailwind snippets**. The default is native form elements + CSS. We do not write hand-rolled JS components, and we do not use web components.

The hard rule: **`document.documentElement.outerHTML` must round-trip a component's current state.** Native elements satisfy this for free; that's a major reason we're sticking to them.

Practical consequences:

- **Default to native form elements** (`<input>`, `<select>`, `<textarea>`, `<input type="date">`, `<input type="file">`, etc.) — they ship with accessibility, keyboard handling, and serialization for free.
- **Use CSS-only state** via `:checked`, `:focus`, `:focus-within`, `:has()`, `:placeholder-shown`, `:user-invalid`, etc. Example: a segmented control is just radio buttons + sibling-selector styling — no JS at all.
- **No DIY JavaScript.** If a component genuinely cannot be built with native HTML + CSS (rich text, code editor, anything similar), we use a curated third-party plugin (e.g. [overtype.dev](https://overtype.dev) for rich text) and **style** it. We do not write our own JS components.
- **No web components.** Same reason — we want copy-paste HTML, not custom-element registrations the user has to wire up.
- **No build step required to use a mirk component.** A user pastes the HTML into any project, includes Tailwind, and it works. A `<script>` tag is included alongside only when a plugin is unavoidable, with a clear CDN reference.

### Showcase app

Cols 1 and 2 (Primer, Carbon) render real React components from `@primer/react` and `@carbon/react`, so the showcase app is itself a React app. Col 3 (mirk) renders the actual HTML snippet — likely via `dangerouslySetInnerHTML` from a `.html` source file — so what you see in the showcase is byte-identical to what users copy-paste.

### Rich text engine

[**overtype.dev**](https://overtype.dev) — the foundation of mirk's rich text component. It's a markdown editor that keeps its state in a `<textarea>`, which fits the serialization rule cleanly. Detailed reasoning recorded in `decisions/` when that component is built.

## Decision log — non-negotiable

Every meaningful choice we make about a component gets its own file in `decisions/`. **This is the most important discipline in the project.**

Why so strict:

- We need to be able to **unwind** a decision cleanly later if it turns out to be wrong.
- We need to remember **why** we did something months from now so we don't accidentally re-litigate or undo it for the wrong reasons.
- We need a paper trail of "we considered X and rejected it because Y" so we don't keep rediscovering the same dead ends.

Format and conventions are in `decisions/README.md`. The template is `decisions/TEMPLATE.md`. Each file is numbered (`0001-...`, `0002-...`) and never renumbered — superseded decisions stay on disk and link forward.

Alongside the verbose ADRs, **`HISTORY.md`** is a concise one-liner log of every decision (project-level + component-level), chronological. It's the distilled "lessons-learned" index meant to be portable to a future UI-kit project. Add an entry there whenever a decision is locked.

## Repo layout

```
mirk-ui-kit/
├── README.md               # this file — affirmed project rules
├── PLAN.md                 # task tracker (not done / done)
├── HISTORY.md              # concise one-line log of every decision (portable lessons-learned)
├── decisions/              # one ADR-style file per decision
│   ├── README.md           # decision-log format and rules
│   ├── TEMPLATE.md         # copy this to start a new decision
│   └── NNNN-*.md           # accruing decisions
├── refs/                   # read-only upstream sources
│   ├── primer/             # cloned: primer/react
│   └── carbon/             # cloned: carbon-design-system/carbon
└── (mirk source + showcase app — added during setup)
```
