import test from "node:test";
import assert from "node:assert/strict";

import {
  generateMemorablePassword,
  generatePin,
  generateRandomPassword,
} from "./generators";

function makeSeqRandomInt(seq: number[]) {
  let i = 0;
  return (maxExclusive: number) => {
    const value = seq[i % seq.length] ?? 0;
    i++;
    return Math.abs(value) % maxExclusive;
  };
}

test("generateRandomPassword respects length and sets", () => {
  const rnd = makeSeqRandomInt([1, 2, 3, 4, 5, 6, 7, 8, 9]);
  const out = generateRandomPassword(
    { length: 12, numbers: true, symbols: true },
    rnd,
  );
  assert.equal(out.length, 12);
  assert.match(out, /[a-zA-Z]/);
  assert.match(out, /[0-9]/);
  assert.match(out, /[!@#$%^&*()\-_=+\[\]{};:,.<>\/?~]/);
});

test("generateMemorablePassword supports word count and toggles", () => {
  const rnd = makeSeqRandomInt([0, 1, 2, 3, 0, 1, 2, 3]);
  const wordlist = [
    "alpha",
    "bravo",
    "charlie",
    "delta",
    "echoes",
    "foxtrot",
    "golfing",
    "hotel",
    "india",
    "juliet",
    "kilo",
    "lima",
    "mango",
    "november",
    "oscar",
    "papa",
    "quartz",
    "romeo",
    "sierra",
    "tango",
    "uniform",
    "victory",
    "whiskey",
    "xray",
    "yankee",
    "zebra",
    "amber",
    "banana",
    "candle",
    "dragon",
    "forest",
    "galaxy",
  ];
  const out = generateMemorablePassword(
    { words: 4, capitalize: true, fullWords: false },
    rnd,
    wordlist,
  );
  assert.equal(out.split("-").length, 4);
  for (const w of out.split("-")) {
    assert.equal(w.length, 4);
    assert.equal(w[0], w[0]?.toUpperCase());
  }
});

test("generatePin produces digits only", () => {
  const rnd = makeSeqRandomInt([0, 1, 2, 3, 4, 5, 6, 7, 8, 9]);
  const out = generatePin({ length: 6 }, rnd);
  assert.equal(out.length, 6);
  assert.match(out, /^[0-9]+$/);
});
