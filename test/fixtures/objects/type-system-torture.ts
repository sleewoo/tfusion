// @license MIT
// Contains AI-generated test patterns

import type { NumericRange, TreeNode } from "./object-types";

// 1. Deep recursive type constraints
export type TypeTortureTest1<T> = T extends object
  ? { [K in keyof T]: Record<number, T[K]> }
  : T extends (infer U)[]
    ? U[]
    : T;

// 2. Recursive conditional path extraction
export type TypeTortureTest2<
  T,
  Path extends string,
> = Path extends `${infer Head}.${infer Tail}`
  ? Head extends keyof T
    ? [T[Head], Tail]
    : never
  : Path extends keyof T
    ? T[Path]
    : never;

// 3. Mapped type key remapping with template literals
export type TypeTortureTest3<T> = {
  [K in keyof T as `get${Capitalize<string & K>}[${string}]`]: () => T[K];
} & {
  [K in keyof T as `set${Capitalize<string & K>}`]: (value: T[K]) => void;
};

// 4. JSON schema validator
export type TypeTortureTest4<T> = {
  [K in keyof T]: T[K] extends object
    ? [T[K]]
    : T[K] extends (infer U)[]
      ? U[]
      : new (
          ...args: unknown[]
        ) => T[K];
};

// 5. Variadic tuple type shift
export type TypeTortureTest5<T extends []> = T extends [never, ...infer Rest]
  ? Rest
  : never;

// 6. Deep readonly with exceptions
export type TypeTortureTest6<T, Keys extends keyof T> = {
  readonly [K in keyof T]: K extends Keys ? T[K] : Record<string, T[K]>;
};

// 7. Function composition types
export type TypeTortureTest7<Fns extends ((arg: unknown) => never)[]> =
  Fns extends [infer F, ...infer Rest]
    ? F extends (arg: infer A) => infer B
      ? Rest extends [(arg: B) => never, ...[]]
        ? (arg: A) => Rest
        : never
      : never
    : never;

// 8. Type algebra
export type TypeTortureTest8<N extends number> = N extends 0
  ? []
  : Record<string, N extends 1 ? 0 : never> extends infer U
    ? [U, ...U[]]
    : never;

// 9. Pattern matching for types
export type TypeTortureTest9<T> = T extends {
  type: infer Type;
  payload: infer P;
}
  ? { [K in Type as string | number]: (payload: P) => void }
  : never;

// 10. Type transformations
export type TypeTortureTest10<T> = T extends TreeNode
  ? {
      value: T["value"];
      children: T["children"];
    }
  : T extends (infer U)[]
    ? U[]
    : T;

// 11. Type-level arithmetic
export type TypeTortureTest11<N extends number> = [
  ...Array<N>,
]["length"] extends number
  ? [...Array<N>]["length"]
  : never;

// 12. Key path generation
export type TypeTortureTest12<T, Path extends string = ""> = T extends object
  ? {
      [K in keyof T]:
        | `${Path}${K & string}`
        | Record<`${Path}${K & string}.`, T[K]>;
    }[keyof T]
  : never;

// 13. Complex constraint inference
export type TypeTortureTest13<T> = T extends (infer U)[]
  ? U extends object
    ? keyof U
    : never
  : never;

// 14. Type predicates
export type TypeTortureTest14<T> = T extends (...args: infer A) => infer R
  ? (...args: A[]) => R
  : T extends object
    ? { [K in keyof T]: Record<number, T[K]> }
    : T;

// 15. Mapped type value transformations
export type TypeTortureTest15<T> = {
  [K in keyof T]: T[K] extends (...args: infer A) => infer R
    ? (...args: A) => R
    : T[K] extends object
      ? Record<string, T[K]>
      : T[K];
};

// 16. Type unification
export type TypeTortureTest16<T, U> = T extends U ? T : U extends T ? U : T | U;

// 17. Type-level string manipulation
export type TypeTortureTest17<S extends string | number | symbol> =
  S extends `${infer Head}${infer Tail}` ? `${Uppercase<Head>}${Tail}` : S;

// 18. Optional chaining
export type TypeTortureTest18<
  T,
  Path extends string,
> = Path extends `${infer Head}.${infer Tail}`
  ? Head extends keyof T
    ? Extract<T[Head], Tail>
    : undefined
  : Path extends keyof T
    ? T[Path]
    : undefined;

// 19. Complex generic constraints
export type TypeTortureTest19<
  T extends Record<string, unknown>,
  U extends keyof T,
> = {
  [K in U]: T[K] extends (...args: []) => never ? ReturnType<T[K]> : never;
};

// 20. Type merging
export type TypeTortureTest20<T, U> = {
  [K in keyof T | keyof U]: K extends keyof T
    ? K extends keyof U
      ? Record<string, [T[K], U[K]]>
      : T[K]
    : U[K & keyof U];
};

// 21. Type-level state machine
export type TypeTortureTest21<S, A> = A extends {
  type: infer T;
  payload: infer P;
}
  ? T extends "SET"
    ? P
    : T extends "ADD"
      ? S extends number
        ? `${S} + ${string}`
        : never
      : T extends "APPEND"
        ? `${string}${number}`
        : never
  : never;

// 22. Pattern matching
export type TypeTortureTest22<T> = T extends { __typename: infer I }
  ? { [K in I as string]: T }
  : never;

// 23. Type-level dictionary validation
export type TypeTortureTest23<T> = {
  [K in keyof T]: K extends string
    ? T[K] extends number
      ? NumericRange<0, 100> extends T[K]
        ? T[K]
        : never
      : never
    : never;
};

// 24. Type narrowing
export type TypeTortureTest24<T> =
  T extends Array<infer U>
    ? U extends object
      ? { [K in keyof U]: U[K][] }
      : U
    : T extends object
      ? { [K in keyof T]: [T[K]] }
      : T;

// 25. Ultimate type challenge (combines multiple features)
export type TypeTortureTest25<T> = T extends (...args: infer A) => infer R
  ? TypeTortureTest14<(a: A) => R>
  : T extends object
    ? { [K in keyof T as TypeTortureTest17<K>]: T[K] }
    : T;
