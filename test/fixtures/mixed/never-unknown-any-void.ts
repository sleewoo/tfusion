// @license MIT
// Contains AI-generated test patterns

import type { BrandedArraysCase1 } from "@/fixtures/arrays/branded-arrays";
import type { ComplexObjectArraysCase1 } from "@/fixtures/arrays/complex-object-arrays";

import type { FunctionTypesCase3 } from "./function-types";

// Inspired by error handling patterns
export type NeverUnknownAnyVoidCase1 = () => never;

// Similar to exhaustive type checking
export type NeverUnknownAnyVoidCase2<T> = T extends string ? T : never;

// Pattern from third-party library boundaries
export type NeverUnknownAnyVoidCase3 = unknown & { __fromExternal: true };

// Inspired by dynamic data handling
// biome-ignore lint: any
export type NeverUnknownAnyVoidCase4 = any | ComplexObjectArraysCase1;

// Similar to event handler returns
export type NeverUnknownAnyVoidCase5 = (event: Event) => void;

// Pattern from impossible type combinations
export type NeverUnknownAnyVoidCase6 = string & number;

// Inspired by type assertion escapes
export type NeverUnknownAnyVoidCase7 = BrandedArraysCase1[number];

// Similar to bottom-type propagation
export type NeverUnknownAnyVoidCase8 = never[] | never;

// Pattern from untyped callback parameters
// biome-ignore lint: any
export type NeverUnknownAnyVoidCase9 = (cb: (result: any) => void) => void;

// Inspired by recursive termination
export type NeverUnknownAnyVoidCase10<T> = T extends never ? T : T[];

// Similar to unsafe type assertions
// biome-ignore lint: any
export type NeverUnknownAnyVoidCase11 = any extends infer T ? T : never;

// Pattern from type-safe void operations
export type NeverUnknownAnyVoidCase12 = {
  log: (message: string) => void;
  value: void extends true ? never : unknown;
};

// Inspired by impossible conditions
// biome-ignore lint: any
export type NeverUnknownAnyVoidCase13 = never extends infer T ? T : any;

// Similar to JSON parse results
export type NeverUnknownAnyVoidCase14 = unknown | never;

// Pattern from function type compatibility
export type NeverUnknownAnyVoidCase15 = (...args: unknown[]) => void;

// Inspired by type system escape hatches
export type NeverUnknownAnyVoidCase16 = {
  [key: string]: unknown;
  __brand: never;
};

// Similar to impossible intersections
export type NeverUnknownAnyVoidCase17 = void & { value: never };

// Pattern from generic constraints
export type NeverUnknownAnyVoidCase18<T> = T;

// Inspired by type predicate narrowing
export type NeverUnknownAnyVoidCase19 = (
  value: unknown,
) => value is BrandedArraysCase1[number];

// Similar to async operation fallbacks
export type NeverUnknownAnyVoidCase20 = Promise<never> | Promise<unknown>;

// Pattern from recursive type bottoms
export type NeverUnknownAnyVoidCase21<T> = T extends never ? T : [T];

// Inspired by type-safe voids
export type NeverUnknownAnyVoidCase22 = {
  action: FunctionTypesCase3;
  callback: () => void;
};

// Similar to impossible mapped types
export type NeverUnknownAnyVoidCase23 = {
  [K in never]: K;
};

// Pattern from error propagation
export type NeverUnknownAnyVoidCase24 = Error | never;

// Inspired by top-type conversions
export type NeverUnknownAnyVoidCase25 = unknown extends infer T
  ? T extends ComplexObjectArraysCase1
    ? T
    : Record<string, T>
  : never;
