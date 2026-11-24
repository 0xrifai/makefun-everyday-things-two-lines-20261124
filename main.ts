import { mkdir, writeFile } from "node:fs/promises";

// Everyday Things, Two Lines — a traffic jam, explained to a 10-year-old
// with a ketchup bottle: the one narrow neck every car has to squeeze
// through is the whole jam, in a shape a kid can hold in one hand.
const FIRST_LINE =
  "A traffic jam is ketchup stuck in a glass bottle: all the cars are pushing to get out through the same tiny neck at once, so almost nothing comes out.";

const SECOND_LINE =
  "The bottle fits because one narrow exit and everything jammed behind it is exactly what a jammed road is, but you can't shake or squeeze the cars out, and tapping the road won't make it wider.";

const ENTRY = `${FIRST_LINE}\n${SECOND_LINE}`;

// The bounty gate: UTF-8 text, 1-400 characters, exactly two lines.
// Refuse to write anything that would fail it, instead of writing
// a broken file and finding out at grading time.
const lines = ENTRY.split("\n");
if (ENTRY.length < 1 || ENTRY.length > 400) {
  throw new Error(`entry is ${ENTRY.length} characters, gate needs 1-400`);
}
if (lines.length !== 2 || lines.some((line) => line.trim().length === 0)) {
  throw new Error(`entry must be exactly two non-empty lines, got ${lines.length}`);
}
if (ENTRY.endsWith("\n")) {
  throw new Error("entry must not end with a trailing newline");
}

await mkdir("/output", { recursive: true });
await writeFile("/output/entry.txt", ENTRY, "utf8");
console.log(`Wrote ${ENTRY.length} characters across 2 lines to /output/entry.txt`);
