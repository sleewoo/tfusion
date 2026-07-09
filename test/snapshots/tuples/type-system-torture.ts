import { assert, type Equals } from "tsafe";

import type {
  TypeSystemTortureTest1,
  TypeSystemTortureTest2,
  TypeSystemTortureTest3,
  TypeSystemTortureTest4,
  TypeSystemTortureTest5,
  TypeSystemTortureTest6,
  TypeSystemTortureTest7,
  TypeSystemTortureTest8,
  TypeSystemTortureTest9,
  TypeSystemTortureTest10,
  TypeSystemTortureTest11,
  TypeSystemTortureTest12,
  TypeSystemTortureTest13,
  TypeSystemTortureTest14,
  TypeSystemTortureTest15,
  TypeSystemTortureTest16,
  TypeSystemTortureTest17,
  TypeSystemTortureTest18,
  TypeSystemTortureTest19,
  TypeSystemTortureTest20,
  TypeSystemTortureTest21,
  TypeSystemTortureTest22,
  TypeSystemTortureTest23,
  TypeSystemTortureTest24,
  TypeSystemTortureTest25,
} from "@/fixtures/tuples/type-system-torture.ts";

// @license MIT
// Contains AI-generated test patterns
type TypeSystemTortureTest1Flat<T> = (([
  T,
  ...T[]
]) extends ([
  infer First,
  ...infer Rest
]) ? ([
  First /** unresolved */,
  Rest /** unresolved */
]) : (never));

type TypeSystemTortureTest2Flat = [
  readonly [
    string
  ],
  ...[
    number,
    (boolean)?
  ]
];

type TypeSystemTortureTest3Flat = [
  ...[
    1,
    2,
    3
  ],
  ...[
    4,
    5
  ]
];

type TypeSystemTortureTest4Flat = [
  string,
  ...[
    number
  ],
  ...[
    boolean
  ]
];

type TypeSystemTortureTest5Flat = [
  first?: string,
  ...rest: number[]
];

type TypeSystemTortureTest6Flat<T, U> = [
  T,
  ...[
    ((U) extends (T) ? (U) : (never))
  ]
];

type TypeSystemTortureTest7Flat<T> = [
  keyof (T),
  { [K in keyof (T)]: (T)[K /** unresolved */] }
];

type TypeSystemTortureTest8Flat<T> = [
  T,
  ((T) extends ((infer U)[]) ? (U /** unresolved */) : (never))
];

type TypeSystemTortureTest9Flat<T extends Array<((string) | (number))>> = (([
  [
    ...T
  ],
  T
]) extends ([
  [
    ...infer U
  ],
  unknown
]) ? (U /** unresolved */) : (never));

type TypeSystemTortureTest10Flat = [
  readonly [
    ...string[]
  ],
  mutable: [
    ...number[]
  ]
];

type TypeSystemTortureTest11Flat<T extends string> = [
  T,
  ...T[]
];

type TypeSystemTortureTest12Flat<T, U> = (([
  ...T[],
  U[]
]) extends ([
  ...infer R
]) ? (R /** unresolved */) : (never));

// @skip-assert: unique symbol makes unique types
type TypeSystemTortureTest13Flat<T> = (([
  T,
  T
]) & ({
  readonly __brand: unique symbol
}));

type TypeSystemTortureTest14Flat<T> = (([
  T,
  ...(((T) | (null)))[]
]) | ([
  null,
  ...T[]
]));

type TypeSystemTortureTest15Flat<T> = [
  T,
  ...{ [K in keyof (T)]: (T)[K /** unresolved */] }[]
];

type TypeSystemTortureTest16Flat<T> = [
  T,
  ...(((T) extends (never[]) ? (T) : (never)))
];

type TypeSystemTortureTest17Flat<T> = [
  T,
  ...(T)[keyof (T)][]
];

type TypeSystemTortureTest18Flat<T> = [
  T,
  ...(((T) extends ({
    length: number
  }) ? ([
    (T)["length"]
  ]) : (never)))
];

type TypeSystemTortureTest19Flat<T> = [
  T,
  ...(((T) extends (Record<string, infer V>) ? (V /** unresolved */[]) : (never)))
];

type TypeSystemTortureTest20Flat<T> = [
  T,
  ...(((T) extends (unknown[]) ? ({ [K in keyof (T)]: (T)[K /** unresolved */] }) : (never)))
];

type TypeSystemTortureTest21Flat<T> = [
  T,
  ...(((T) extends (((...args: never) => infer R)) ? ([
    R /** unresolved */
  ]) : (never)))
];

type TypeSystemTortureTest22Flat<T> = [
  T,
  ...(((T) extends (new (...args: never) => infer I) ? ([
    I /** unresolved */
  ]) : (never)))
];

type TypeSystemTortureTest23Flat<T> = [
  T,
  ...(((T) extends (Promise<infer V>) ? ([
    V /** unresolved */
  ]) : (never)))
];

type TypeSystemTortureTest24Flat<T> = [
  T,
  ...(((T) extends (`/${string}`) ? ([
    T
  ]) : (never)))
];

type TypeSystemTortureTest25Flat<T> = [
  T,
  ...(((T) extends (Date) ? ([
    number
  ]) : ([
    string
  ])))
];


assert<
  Equals<
    TypeSystemTortureTest1<never>,
    TypeSystemTortureTest1Flat<never>
  >
>;
assert<
  Equals<
    TypeSystemTortureTest2,
    TypeSystemTortureTest2Flat
  >
>;
assert<
  Equals<
    TypeSystemTortureTest3,
    TypeSystemTortureTest3Flat
  >
>;
assert<
  Equals<
    TypeSystemTortureTest4,
    TypeSystemTortureTest4Flat
  >
>;
assert<
  Equals<
    TypeSystemTortureTest5,
    TypeSystemTortureTest5Flat
  >
>;
assert<
  Equals<
    TypeSystemTortureTest6<never, never>,
    TypeSystemTortureTest6Flat<never, never>
  >
>;
assert<
  Equals<
    TypeSystemTortureTest7<never>,
    TypeSystemTortureTest7Flat<never>
  >
>;
assert<
  Equals<
    TypeSystemTortureTest8<never>,
    TypeSystemTortureTest8Flat<never>
  >
>;
assert<
  Equals<
    TypeSystemTortureTest9<never>,
    TypeSystemTortureTest9Flat<never>
  >
>;
assert<
  Equals<
    TypeSystemTortureTest10,
    TypeSystemTortureTest10Flat
  >
>;
assert<
  Equals<
    TypeSystemTortureTest11<never>,
    TypeSystemTortureTest11Flat<never>
  >
>;
assert<
  Equals<
    TypeSystemTortureTest12<never, never>,
    TypeSystemTortureTest12Flat<never, never>
  >
>;
assert<
  Equals<
    TypeSystemTortureTest14<never>,
    TypeSystemTortureTest14Flat<never>
  >
>;
assert<
  Equals<
    TypeSystemTortureTest15<never>,
    TypeSystemTortureTest15Flat<never>
  >
>;
assert<
  Equals<
    TypeSystemTortureTest16<never>,
    TypeSystemTortureTest16Flat<never>
  >
>;
assert<
  Equals<
    TypeSystemTortureTest17<never>,
    TypeSystemTortureTest17Flat<never>
  >
>;
assert<
  Equals<
    TypeSystemTortureTest18<never>,
    TypeSystemTortureTest18Flat<never>
  >
>;
assert<
  Equals<
    TypeSystemTortureTest19<never>,
    TypeSystemTortureTest19Flat<never>
  >
>;
assert<
  Equals<
    TypeSystemTortureTest20<never>,
    TypeSystemTortureTest20Flat<never>
  >
>;
assert<
  Equals<
    TypeSystemTortureTest21<never>,
    TypeSystemTortureTest21Flat<never>
  >
>;
assert<
  Equals<
    TypeSystemTortureTest22<never>,
    TypeSystemTortureTest22Flat<never>
  >
>;
assert<
  Equals<
    TypeSystemTortureTest23<never>,
    TypeSystemTortureTest23Flat<never>
  >
>;
assert<
  Equals<
    TypeSystemTortureTest24<never>,
    TypeSystemTortureTest24Flat<never>
  >
>;
assert<
  Equals<
    TypeSystemTortureTest25<never>,
    TypeSystemTortureTest25Flat<never>
  >
>;
