# refs/ — read-only upstream sources

The two reference design systems we study. **Never edit these directories** — they're for reading only.

The clones themselves are gitignored (they're large monorepos). This file is the durable record of which commit each `refs/` entry was pinned to.

## How to set up locally

```sh
git clone --depth=1 https://github.com/primer/react.git refs/primer
git clone --depth=1 https://github.com/carbon-design-system/carbon.git refs/carbon
rm -rf refs/primer/.git refs/carbon/.git
```

The `.git` directories are removed after cloning so mirk-ui-kit doesn't contain nested repos. We treat `refs/` as a frozen snapshot — any "refresh" is a re-clone, not a fetch.

## Pinned commits

When you cite Primer or Carbon source in a `DECISIONS.md` entry, include the SHA from the table below so a future reader can find exactly what we read.

| ref           | repo                                       | commit SHA                                 | date       |
| ------------- | ------------------------------------------ | ------------------------------------------ | ---------- |
| `refs/primer` | `primer/react`                             | `619175c00dece144573fe5afbe4cd51e524a6c3d` | 2026-04-27 |
| `refs/carbon` | `carbon-design-system/carbon`              | `6898a87e8c7ca8e76fb05cb7ecde63391e5ca90a` | 2026-04-27 |

## Refreshing

If a decision warrants reading a newer version, delete the existing folder and re-run the clone block above (the `rm -rf .git` step is required each time), then update the table above. Old SHAs cited in `DECISIONS.md` / `HISTORY.md` remain valid pointers thanks to GitHub's commit-permanence.
