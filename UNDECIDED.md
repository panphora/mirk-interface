# UNDECIDED

Active brainstorming. Anything currently being weighed lives here so it doesn't pollute `DECISIONS.md` (current accepted choices) or `HISTORY.md` (the immutable log).

When an item is resolved:

- The current choice goes into (or replaces an entry in) `DECISIONS.md`.
- A one-liner is appended to `HISTORY.md` with the *why*. Nothing is ever removed from `HISTORY.md` — even if the decision is later reversed, the original entry stays and a new entry is added.
- If implementation work falls out of it, a task lands in `PLAN.md`.
- The item is removed from this file.

## Entry format

One `## <topic>` heading per item, with bullets for:

- **Options being weighed** — the alternatives we're comparing.
- **Constraints** — what the answer must satisfy (rules from `README.md`, prior decisions in `HISTORY.md`).
- **Open questions** — what we still need to figure out before we can decide.
- **Currently leaning** — best guess right now, or "no preference yet".

---

- **`text-box-trim: trim-both` + `text-box-edge: cap alphabetic`** — defer until Firefox ships (Chrome ≥133, Safari ≥17.4 only as of late 2025). Tuned `py-` + `leading-tight` is good enough meanwhile, and would need re-tuning anyway when we adopt.
