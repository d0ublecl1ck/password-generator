export type RandomInt = (maxExclusive: number) => number;

function assertMaxExclusive(maxExclusive: number) {
  if (!Number.isSafeInteger(maxExclusive) || maxExclusive <= 0) {
    throw new Error("maxExclusive must be a positive safe integer");
  }
}

function randomIntFromCrypto(maxExclusive: number, cryptoObj: Crypto): number {
  // Rejection sampling to avoid modulo bias.
  const maxUint32 = 0xffffffff;
  const limit = Math.floor((maxUint32 + 1) / maxExclusive) * maxExclusive;
  const buf = new Uint32Array(1);
  while (true) {
    cryptoObj.getRandomValues(buf);
    const value = buf[0] ?? 0;
    if (value < limit) return value % maxExclusive;
  }
}

export const defaultRandomInt: RandomInt = (maxExclusive) => {
  assertMaxExclusive(maxExclusive);

  const cryptoObj = (globalThis as unknown as { crypto?: Crypto }).crypto;
  if (cryptoObj) return randomIntFromCrypto(maxExclusive, cryptoObj);

  // Very old environments fallback.
  return Math.floor(Math.random() * maxExclusive);
};
