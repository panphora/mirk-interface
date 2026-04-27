# Decision log

Every meaningful choice about a mirk component or piece of project infrastructure is recorded here. See the project `README.md` for *why* this discipline is non-negotiable.

## Rules

1. **One decision per file.** If a component has multiple distinct decisions (e.g. API shape, a11y model, styling approach), each gets its own file or its own clearly-titled section within one file. Err on the side of more files, not fewer.
2. **Numbered, never renumbered.** Files are prefixed with a zero-padded sequence number (`0001-`, `0002-`, ...). Once assigned, the number is permanent. Even if a decision is superseded, the file stays.
3. **Status is explicit.** Each file declares one of: `proposed`, `accepted`, `superseded by NNNN`, or `deprecated`.
4. **Superseding, not deleting.** If we change our mind, write a new decision that supersedes the old one. Update the old file's status to `superseded by NNNN` and link forward. Never delete or rewrite an accepted decision in place.
5. **Cite sources.** When referencing Primer or Carbon, include the file path within `refs/` and the commit SHA so the reader can find what we read.
6. **Write it before you build it.** Don't implement a component, then back-fill the decision. The decision file is the contract — the code follows it.
7. **Keep it short but complete.** A decision file should fit on one screen if possible. The point is signal, not ceremony.

## File naming

```
NNNN-<short-kebab-slug>.md
```

Examples:
- `0001-stack.md`
- `0002-theming.md`
- `0003-text-input.md`
- `0004-text-input-error-display.md`  ← if a component needs a follow-up decision

## Index

Maintain a one-line entry per accepted decision below, in numeric order. Include status if not `accepted`.

| #    | Title | Status |
| ---- | ----- | ------ |
| _none yet_ | | |

## Template

Copy `TEMPLATE.md` to start a new decision.
