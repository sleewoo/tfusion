// @license MIT
// Contains AI-generated test patterns

export type TypeSystemTortureTest1<T> = [T, ...T[]] extends [
  infer First,
  ...infer Rest,
]
  ? [First, Rest]
  : never;

export type TypeSystemTortureTest2 = [readonly [string], ...[number, boolean?]];

export type TypeSystemTortureTest3 = [...[1, 2, 3], ...[4, 5]];

export type TypeSystemTortureTest4 = [string, ...[number], ...[boolean]];

export type TypeSystemTortureTest5 = [first?: string, ...rest: number[]];

export type TypeSystemTortureTest6<T, U> = [T, ...[U extends T ? U : never]];

export type TypeSystemTortureTest7<T> = [keyof T, { [K in keyof T]: T[K] }];

export type TypeSystemTortureTest8<T> = [T, T extends (infer U)[] ? U : never];

export type TypeSystemTortureTest9<T extends Array<string | number>> = [
  [...T],
  T,
] extends [[...infer U], unknown]
  ? U
  : never;

export type TypeSystemTortureTest10 = [
  readonly [...string[]],
  mutable: [...number[]],
];

export type TypeSystemTortureTest11<T extends string> = [T, ...T[]];

export type TypeSystemTortureTest12<T, U> = [...T[], U[]] extends [...infer R]
  ? R
  : never;

// @skip-assert: unique symbol makes unique types
export type TypeSystemTortureTest13<T> = [T, T] & {
  readonly __brand: unique symbol;
};

export type TypeSystemTortureTest14<T> = [T, ...(T | null)[]] | [null, ...T[]];

export type TypeSystemTortureTest15<T> = [T, ...{ [K in keyof T]: T[K] }[]];

export type TypeSystemTortureTest16<T> = [
  T,
  ...(T extends never[] ? T : never),
];

export type TypeSystemTortureTest17<T> = [T, ...T[keyof T][]];

export type TypeSystemTortureTest18<T> = [
  T,
  ...(T extends { length: number } ? [T["length"]] : never),
];

export type TypeSystemTortureTest19<T> = [
  T,
  ...(T extends Record<string, infer V> ? V[] : never),
];

export type TypeSystemTortureTest20<T> = [
  T,
  ...(T extends unknown[] ? { [K in keyof T]: T[K] } : never),
];

export type TypeSystemTortureTest21<T> = [
  T,
  ...(T extends (...args: never) => infer R ? [R] : never),
];

export type TypeSystemTortureTest22<T> = [
  T,
  ...(T extends new (...args: never) => infer I ? [I] : never),
];

export type TypeSystemTortureTest23<T> = [
  T,
  ...(T extends Promise<infer V> ? [V] : never),
];

export type TypeSystemTortureTest24<T> = [
  T,
  ...(T extends `/${string}` ? [T] : never),
];

export type TypeSystemTortureTest25<T> = [
  T,
  ...(T extends Date ? [number] : [string]),
];
