import { defaultRandomInt, type RandomInt } from "./randomInt";
import { WORDLIST } from "./wordlist";

function clampInt(value: number, min: number, max: number) {
  if (!Number.isFinite(value)) throw new Error("value must be a number");
  const rounded = Math.trunc(value);
  if (rounded < min) return min;
  if (rounded > max) return max;
  return rounded;
}

function pickOne(chars: string, randomInt: RandomInt) {
  const idx = randomInt(chars.length);
  return chars[idx] ?? chars[0] ?? "";
}

function shuffle<T>(items: T[], randomInt: RandomInt): T[] {
  const arr = items.slice();
  for (let i = arr.length - 1; i > 0; i--) {
    const j = randomInt(i + 1);
    const tmp = arr[i];
    arr[i] = arr[j] as T;
    arr[j] = tmp as T;
  }
  return arr;
}

export type RandomPasswordOptions = {
  length: number; // 8-100
  numbers: boolean;
  symbols: boolean;
};

export function generateRandomPassword(
  options: RandomPasswordOptions,
  randomInt: RandomInt = defaultRandomInt,
) {
  const length = clampInt(options.length, 8, 100);

  const letters = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";
  const digits = "0123456789";
  const symbols = "!@#$%^&*()-_=+[]{};:,.<>/?~";

  const requiredSets: string[] = [letters];
  let pool = letters;
  if (options.numbers) {
    requiredSets.push(digits);
    pool += digits;
  }
  if (options.symbols) {
    requiredSets.push(symbols);
    pool += symbols;
  }

  const result: string[] = [];
  for (const set of requiredSets) {
    result.push(pickOne(set, randomInt));
  }
  while (result.length < length) {
    result.push(pickOne(pool, randomInt));
  }

  return shuffle(result, randomInt).join("");
}

export type MemorablePasswordOptions = {
  words: number; // 3-15
  capitalize: boolean;
  fullWords: boolean;
};

function titleCase(word: string) {
  const first = word.slice(0, 1);
  if (!first) return word;
  return first.toUpperCase() + word.slice(1);
}

export function generateMemorablePassword(
  options: MemorablePasswordOptions,
  randomInt: RandomInt = defaultRandomInt,
  wordlist: readonly string[] = WORDLIST,
) {
  const words = clampInt(options.words, 3, 15);
  if (wordlist.length < 32) throw new Error("wordlist is too small");

  const result: string[] = [];
  for (let i = 0; i < words; i++) {
    const word = wordlist[randomInt(wordlist.length)] ?? "word";
    const base = options.fullWords ? word : word.slice(0, 4);
    const finalWord = options.capitalize ? titleCase(base) : base;
    result.push(finalWord);
  }
  return result.join("-");
}

export type PinOptions = {
  length: number; // 3-12
};

export function generatePin(
  options: PinOptions,
  randomInt: RandomInt = defaultRandomInt,
) {
  const length = clampInt(options.length, 3, 12);
  const digits = "0123456789";
  let out = "";
  for (let i = 0; i < length; i++) {
    out += pickOne(digits, randomInt);
  }
  return out;
}

