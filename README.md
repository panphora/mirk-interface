# mirk-ui-kit

A form-focused UI kit (**mirk**) built from scratch by studying the best ideas in two reference design systems and writing our own opinionated take.

## Getting started — read in this order

1. **`README.md`** (you are here) — what mirk is, the locked rules, repo layout.
2. **`HISTORY.md`** — append-only log of every decision and *why* it was made. The audit trail; never overwritten. Read this to understand the reasoning behind the rules below.
3. **`PLAN.md`** — current task state: what's done, what's next, open questions, deferred items.
4. **`UNDECIDED.md`** — items currently being brainstormed. Resolved items move out into `DECISIONS.md` + `HISTORY.md`.
5. **`DECISIONS.md`** — current accepted decisions per component/topic. Living doc; edited freely as choices evolve. **Only major UX choices** belong here (what a component is, how it behaves) — not individual CSS values, which iterate in `experiments/experiments.html` and live in the code. Format, rules, and scope at the top of the file.

## Writing style

Every md file in this repo: **concise, information-dense**. Bullets over paragraphs. Only the *why* that isn't derivable from code. Lead with the rule, then one line of context. See `DECISIONS.md` 0006.

## Reference systems

| Column | System  | Source                                          |
| ------ | ------- | ----------------------------------------------- |
| 1      | Primer  | https://primer.style — `primer/react`           |
| 2      | Carbon  | https://carbondesignsystem.com — `carbon-design-system/carbon` |
| 3      | mirk    | this repo                                       |

The showcase app renders all three side-by-side in a **3-column layout** so each component can be visually compared against its Primer and Carbon counterparts as we build it.

## Approach

- Build each component **from scratch, one at a time**.
- For each component: read Primer's source, read Carbon's source, then either prototype in **`experiments/experiments.html`** (the current working file — light + dark panels side-by-side with the locked palette) and decide as it settles, OR write the decision first when the contract should land before code. Record only **major UX choices** in `DECISIONS.md` (not individual CSS values), and graduate the locked version into `index.html`.
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
- **No DIY JavaScript by default.** Native HTML wherever it reaches a respectable result. Two scoped exceptions: third-party engines for primitives natives can't deliver at all (rich text via [overtype.dev](https://overtype.dev), code editor TBD), and small native-augmentation scripts named in `DECISIONS.md` 0014 (number stepper, slider visual bridge, date range cross-validation, file picker filename, image preview, tags add/remove). We never write full JS components.
- **No web components.** Same reason — we want copy-paste HTML, not custom-element registrations the user has to wire up.
- **No build step required to use a mirk component.** A user pastes the HTML into any project, includes Tailwind, and it works. A `<script>` tag is included alongside only when a plugin is unavoidable, with a clear CDN reference.

### Pages

mirk components all live in a single **`index.html`** at the repo root, with the Tailwind v4 CDN included. There aren't many of them and they fit comfortably in one file together. `index.html` is fully buildless — open it from `file://` or any static server.

A separate **`compare.html`** at the root is the side-by-side development view — mirk components rendered next to their Primer (`@primer/react`) and Carbon (`@carbon/web-components`) counterparts so we can judge each one against best-in-class peers as we build. **`compare.html` is the one exception to the buildless rule:** it's served by a tiny Vite dev server (`npm run dev`) so Vite can resolve Primer's React + CSS-module imports. Carbon stays on its own CDN scripts inside the same page. See `DECISIONS.md` 0003 for why and what we tried first.

### Rich text engine

[**overtype.dev**](https://overtype.dev) — the foundation of mirk's rich text component. It's a markdown editor that keeps its state in a `<textarea>`, which fits the serialization rule cleanly. Detailed reasoning recorded in `decisions/` when that component is built.

## Decision log — non-negotiable

Every meaningful decision is captured in two places:

- **`DECISIONS.md`** — current accepted decision for each component/topic. Edited freely as decisions evolve. Format, rules, and template live at the top of that file.
- **`HISTORY.md`** — append-only log of every decision and *why*, chronological. **Nothing is ever removed or rewritten.** Even when a decision in `DECISIONS.md` changes, the original `HISTORY.md` entry stays put and a new entry is added. This is the audit trail.

Why so strict:

- We need to remember **why** we did something months from now so we don't accidentally re-litigate or undo it for the wrong reasons.
- We need a paper trail of "we considered X and rejected it because Y" so we don't keep rediscovering the same dead ends.
- We need to see **how** a decision evolved if we changed our minds.

Items still being brainstormed live in **`UNDECIDED.md`**. When resolved, they're added to `DECISIONS.md`, logged in `HISTORY.md`, and removed from `UNDECIDED.md`.

## Experiments and artifacts

Two folders track exploratory work:

- **`experiments/experiments.html`** — **the current working file.** New components are prototyped here first (light + dark panels side-by-side with the locked palette and CSS vars) before graduating into `index.html`.
- **`experiments/`** — other active UI experiments. Sketches, alternate takes, things we're trying before committing to a direction.
- **`artifacts/`** — graduated experiments. When an experiment is worth keeping around so other files can reference it (a pattern, a study, a reference render), it moves here. Artifacts aren't necessarily final — they're just things we want to be able to point at.

## Repo layout

```
mirk-ui-kit/
├── README.md               # this file — affirmed project rules
├── HISTORY.md              # append-only log of every decision + why (portable lessons-learned)
├── PLAN.md                 # task tracker (not done / done)
├── UNDECIDED.md            # items currently being brainstormed
├── DECISIONS.md            # current accepted decisions per component/topic (living doc)
├── index.html              # all mirk components, Tailwind v4 via CDN — buildless
├── compare.html            # side-by-side: mirk vs Primer vs Carbon — needs `npm run dev`
├── package.json            # Vite + React + @primer/react — only for compare.html
├── vite.config.js          # minimal Vite config (opens compare.html)
├── experiments/            # active UI experiments
├── artifacts/              # graduated experiments, kept for reference
└── refs/                   # read-only upstream sources
    ├── primer/             # cloned: primer/react
    └── carbon/             # cloned: carbon-design-system/carbon
```
