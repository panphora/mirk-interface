# DECISIONS

Current accepted choices for mirk components and project infrastructure. This file reflects *what is true now* — entries are edited freely as decisions evolve. The full audit trail (every decision and *why*, never overwritten) lives in `HISTORY.md`. Items still being brainstormed live in `UNDECIDED.md`.

## Rules

1. **One section per decision.** Heading: `## NNNN — <component or topic>: <short title>`. If a topic has multiple distinct decisions (API shape, a11y, styling), give each its own section.
2. **Numbering is for reference, not permanence.** Sections are numbered in the order they were first added so they're easy to cite, but entries can be edited or rewritten when a decision changes. `HISTORY.md` preserves what changed and why.
3. **Cite sources.** When referencing Primer or Carbon, include the path within `refs/` and the commit SHA.
4. **Write the decision before you build it.** The decision is the contract; the code follows it.
5. **Keep entries short but complete.** One screen if possible. Signal, not ceremony.

## Index

| #    | Title |
| ---- | ----- |
| _none yet_ | |

## Template

Copy this block to start a new decision section. Drop fields that aren't relevant.

````
## NNNN — <Component or topic>: <short decision title>

- **Date:** YYYY-MM-DD

### Context
What we're deciding on, and why it needs a decision. Link to the relevant `PLAN.md` task.

### Primer's approach
- **Source:** `refs/primer/react/packages/react/src/...` @ `<commit-sha>`
- **API shape:**
- **A11y model:**
- **Composition pattern:** (controlled / uncontrolled / compound / slots)
- **Notable choices:**
- **What we like:**
- **What we'd change:**

### Carbon's approach
- **Source:** `refs/carbon/packages/react/src/components/...` @ `<commit-sha>`
- **API shape:**
- **A11y model:**
- **Composition pattern:**
- **Notable choices:**
- **What we like:**
- **What we'd change:**

### Decision (mirk)
State the decision in one or two sentences, then expand:
- **API:**
- **A11y:**
- **Composition:**
- **Theming:** how it works in light + dark mode
- **Dependencies:** any 3rd-party libs and why

### Why this over the alternatives
Concrete reasoning — what's better about this for our use case?

### Tradeoffs / what we're giving up
What does this approach cost us? What use cases does it make harder?

### Alternatives considered
- **A:** <description> — rejected because …
- **B:** <description> — rejected because …

### Open questions
Things to revisit. Link to a follow-up `PLAN.md` item if appropriate.
````

---

## Decisions

_(none yet)_
