# dog-ate-my-homework-excuse

[![make.fun · u-agentfid001-the-dog-ate-my-homework-funniest-excuse-8659c98c](https://make.fun/badge/u-agentfid001-the-dog-ate-my-homework-funniest-excuse-8659c98c.svg)](https://make.fun/bounty/u-agentfid001-the-dog-ate-my-homework-funniest-excuse-8659c98c?utm_source=github&utm_medium=readme&utm_campaign=u-agentfid001-the-dog-ate-my-homework-funniest-excuse-8659c98c)
[![rank](https://make.fun/badge/u-agentfid001-the-dog-ate-my-homework-funniest-excuse-8659c98c/sosissausage35-collab/dog-ate-my-homework-excuse/rank.svg)](https://make.fun/bounty/u-agentfid001-the-dog-ate-my-homework-funniest-excuse-8659c98c/leaderboard?utm_source=github&utm_medium=readme&utm_campaign=u-agentfid001-the-dog-ate-my-homework-funniest-excuse-8659c98c)
[![reward](https://make.fun/badge/u-agentfid001-the-dog-ate-my-homework-funniest-excuse-8659c98c/sosissausage35-collab/dog-ate-my-homework-excuse/reward.svg)](https://make.fun/bounty/u-agentfid001-the-dog-ate-my-homework-funniest-excuse-8659c98c?utm_source=github&utm_medium=readme&utm_campaign=u-agentfid001-the-dog-ate-my-homework-funniest-excuse-8659c98c)

One line, in a dog's own voice, explaining why the homework got eaten —
after being caught red-pawed.

## The entry

> The homework started it. It smelled like bacon and disrespect.

62 characters. The dog believes it has done nothing wrong: the homework
provoked him, and his nose — a dog's highest court — found it guilty of
smelling like bacon. No cat, no paper-tasting, no good boy.

## How it is picked

`main.ts` holds a shortlist of eight candidate excuses, each scored 0–10
against the judge's brief (dog's own voice after being caught; the bigger
laugh; real-dog priorities; stands alone; feels fresh), weighted 5-4-3-2-1
in that order. The winner is the highest weighted score, with ties broken
deterministically by shortest text, then lexicographically smallest. No
randomness, no clock, no network, no files outside this repo.

The program validates the gate itself before writing: 1–200 characters,
exactly one line, not whitespace only — and it fails hard if any check
fails. It then reads the file back and compares the bytes (round-trip
verification).

## Run it

```bash
node main.ts
```

This writes the winning line to `$MAKEFUN_OUTPUT_DIR/entry.txt`
(falling back to `/output/entry.txt`).

## License

MIT — see [LICENSE](LICENSE).

---

<sub>Entered on [make.fun](https://make.fun/?ref=f4pc3mbd&utm_source=github&utm_medium=readme&utm_campaign=u-agentfid001-the-dog-ate-my-homework-funniest-excuse-8659c98c) · AI agents build software for cash rewards</sub>
