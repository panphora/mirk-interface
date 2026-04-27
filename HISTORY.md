# HISTORY

A chronological, **append-only** log of every meaningful decision on this project. **Decision + reasoning, one bullet each, kept tight.** Purpose: a portable "lessons learned" so we can apply this thinking to a future UI kit without re-discovering it.

Conventions:
- Add a one-liner here whenever a decision is locked. If a prior decision is reversed, add a *new* entry — never edit or delete the old one.
- The current accepted state lives in `DECISIONS.md`; this file is the audit trail of how we got there.
- Keep entries terse — the *why* is what matters.
- Group by date the decision was made.

---

## 2026-04-26

- **Reference systems: Primer + Carbon.** Both are designed by companies (not individuals), so they're more likely to embed real accessibility and best-practice work at scale. Studying two cross-checks each other — what one team misses, the other often catches. Goal of mirk is performant, small, *and* best-practices, so we mine both.
- **3-column showcase layout (Primer | Carbon | mirk).** Visual side-by-side comparison while building, so every mirk component is judged against best-in-class peers in real time.
- **Build components from scratch, one at a time, simple → complex.** Establishes form-composition primitives, focus-ring conventions, and theming on cheap components before tackling expensive ones; gives every component a clean ADR rather than a rushed batch.
- **Light + dark mode are first-class.** mirk drops into other devs' pages — we don't control the host theme, so both modes have to be peers from day one, not one with the other bolted on.
- **Pure HTML + CSS only. No DIY JavaScript. No web components.** Components must be copy-pasteable; `document.documentElement.outerHTML` must round-trip state. Native elements give us a11y, keyboard handling, form participation, and serialization for free.
- **Default to native form elements; CSS-only state via `:checked`, `:has()`, `:focus-within`, etc.** Falls out of the pure-HTML rule — fewer moving parts than anything else.
- **When native isn't enough, use a curated third-party plugin and style it. We never write our own JS components.** Battle-tested plugins beat DIY JS; no init scripts for users to maintain.
- **Styling: Tailwind.** Compact, HTML-first, familiar to most devs, portable; fits the copy-paste-a-snippet model and aligns with the hyperclay ethos.
- **Rich text engine: overtype.dev.** Self-authored, so bug fixes are in our hands. Performant and small enough that 20 instances on one page work fine (TinyMCE chokes at that scale). Easy for devs to integrate, looks nice.
- **Tags and multi-select: deferred.** They need JS, but more importantly they're advanced patterns most forms genuinely don't need; users find them less familiar. Reach for the simpler core components first.
- **Decision-log discipline: per-decision ADR file under `decisions/`, numbered, never renumbered, superseded files stay in place.** Lets us unwind a decision cleanly if it turns out wrong, remember why we did something months later, and avoid re-litigating dead ends.
- **Repo layout: `README.md` (locked rules), `PLAN.md` (tasks), `decisions/` (verbose ADRs), `HISTORY.md` (this file — concise log), `refs/` (read-only upstream sources).** Each file has a single job so they don't drift into each other.

## 2026-04-27

- **Single-select dropdown: native `<select>` with `appearance: base-select`, progressive enhancement.** We want robust cross-browser support today (the OS popup is the universal fallback everywhere); where modern engines support `base-select` we get a fully-styled dropdown matching the rest of mirk for free, no JS required.
- **Decision tracking restructured.** `decisions/` folder (per-file ADRs, never renumbered, superseded files left in place) replaced by a single top-level `DECISIONS.md` (living doc, current state only, edited freely) plus a new top-level `UNDECIDED.md` for active brainstorming. `HISTORY.md` becomes the append-only audit trail — *this* file is what guarantees we never lose the *why*. Reason: we don't need two parallel records of every decision; one current-state file + one immutable log is enough, with fewer small files to navigate.
