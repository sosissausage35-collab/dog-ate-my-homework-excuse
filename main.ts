// dog-ate-my-homework-excuse
// Entry for make.fun bounty "The Dog Ate My Homework: Funniest Excuse"
// (slug: u-agentfid001-the-dog-ate-my-homework-funniest-excuse-8659c98c).
//
// The program picks ONE line, deterministically, from a shortlist of
// candidate excuses. Each candidate was scored 0-10 against the judge's
// brief, most important first:
//   1. an excuse a dog gives after being caught eating the homework,
//      in the dog's own voice
//   2. earns the bigger laugh, with a twist or a piece of dog logic
//      that lands in a single line
//   3. sounds like a real dog, with a dog's priorities and none of a
//      person's embarrassment
//   4. works on its own, with no setup and nothing that needs a
//      second line to make sense
//   5. feels fresh, not one of the stock lines about the cat, the
//      taste of paper or being a good boy
// Weights mirror that order: 5, 4, 3, 2, 1 (max weighted score 150).
// Tie-break, fully deterministic: highest weighted score, then fewest
// characters, then lexicographically smallest text. No randomness, no
// clock, no network, no files outside this repo.
//
// Winner, by that scoring:
//   "The homework started it. It smelled like bacon and disrespect."
//   62 characters. It is a dog who believes it has done nothing wrong:
//   the homework provoked him, and his nose — a dog's highest court —
//   found it guilty of smelling like bacon. No cat, no paper-tasting,
//   no good boy.

import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { join } from "node:path";

// [criterion1, criterion2, criterion3, criterion4, criterion5], each 0-10.
const WEIGHTS = [5, 4, 3, 2, 1];

const CANDIDATES = [
  {
    text: "The homework started it. It smelled like bacon and disrespect.",
    scores: [9, 9, 9, 10, 8],
  },
  {
    text: "It said 'do not eat me' in pencil, so I knew it was a dare.",
    scores: [9, 9, 8, 10, 9],
  },
  {
    text: "I didn't eat your homework. I rescued it from being boring.",
    scores: [9, 9, 7, 10, 9],
  },
  {
    text: "I was only tasting it for poison. You're welcome.",
    scores: [8, 8, 7, 10, 8],
  },
  {
    text: "It was either the homework or your shoes, and the homework lost the coin toss.",
    scores: [8, 8, 7, 10, 8],
  },
  {
    text: "The homework told me it wanted to be free. I freed it. Into my stomach.",
    scores: [8, 8, 7, 10, 7],
  },
  {
    text: "Your teacher never liked it anyway. I could tell by the red pen.",
    scores: [8, 8, 6, 9, 9],
  },
  {
    text: "I didn't eat it, I filed it. Under 'delicious'.",
    scores: [8, 8, 6, 9, 8],
  },
];

function weightedScore(scores) {
  return scores.reduce((total, score, i) => total + score * WEIGHTS[i], 0);
}

function pickWinner(candidates) {
  const scored = candidates.map((c) => ({
    text: c.text,
    score: weightedScore(c.scores),
    length: [...c.text].length,
  }));
  // Highest weighted score, then shortest text, then lexicographically
  // smallest — a total order, so the winner is always the same.
  scored.sort((a, b) => {
    if (b.score !== a.score) return b.score - a.score;
    if (a.length !== b.length) return a.length - b.length;
    return a.text < b.text ? -1 : a.text > b.text ? 1 : 0;
  });
  return scored[0];
}

function main() {
  const winner = pickWinner(CANDIDATES);

  // Gate validation, inside the program: 1-200 characters, exactly one
  // line, not whitespace only. Fail hard if any check fails.
  const chars = [...winner.text];
  if (chars.length < 1 || chars.length > 200) {
    throw new Error(
      `entry must be 1-200 characters, got ${chars.length}`,
    );
  }
  if (winner.text.trim().length === 0) {
    throw new Error("entry must not be only whitespace");
  }
  if (winner.text.includes("\n") || winner.text.includes("\r")) {
    throw new Error("entry must be a single line");
  }

  const outDir = process.env.MAKEFUN_OUTPUT_DIR || "/output/entry.txt";
  const outPath = outDir.endsWith("entry.txt")
    ? outDir
    : join(outDir, "entry.txt");
  mkdirSync(join(outPath, ".."), { recursive: true });
  writeFileSync(outPath, winner.text, "utf8");

  // Round-trip verification: read the file back and compare bytes.
  const roundTrip = readFileSync(outPath, "utf8");
  if (roundTrip !== winner.text) {
    throw new Error("round-trip verification failed: file differs from entry");
  }

  console.log(
    `wrote ${chars.length} characters to ${outPath} (score ${winner.score}/150)`,
  );
}

main();
