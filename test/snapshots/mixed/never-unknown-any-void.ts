import { assert, type Equals } from "tsafe";

import type {
  NeverUnknownAnyVoidCase1,
  NeverUnknownAnyVoidCase2,
  NeverUnknownAnyVoidCase3,
  NeverUnknownAnyVoidCase4,
  NeverUnknownAnyVoidCase5,
  NeverUnknownAnyVoidCase6,
  NeverUnknownAnyVoidCase7,
  NeverUnknownAnyVoidCase8,
  NeverUnknownAnyVoidCase9,
  NeverUnknownAnyVoidCase10,
  NeverUnknownAnyVoidCase11,
  NeverUnknownAnyVoidCase12,
  NeverUnknownAnyVoidCase13,
  NeverUnknownAnyVoidCase14,
  NeverUnknownAnyVoidCase15,
  NeverUnknownAnyVoidCase16,
  NeverUnknownAnyVoidCase17,
  NeverUnknownAnyVoidCase18,
  NeverUnknownAnyVoidCase19,
  NeverUnknownAnyVoidCase20,
  NeverUnknownAnyVoidCase21,
  NeverUnknownAnyVoidCase22,
  NeverUnknownAnyVoidCase23,
  NeverUnknownAnyVoidCase24,
  NeverUnknownAnyVoidCase25,
} from "@/fixtures/mixed/never-unknown-any-void.ts";

// Inspired by error handling patterns
type NeverUnknownAnyVoidCase1Flat = (() => never);

// Similar to exhaustive type checking
type NeverUnknownAnyVoidCase2Flat<T> = ((T) extends (string) ? (T) : (never));

// Pattern from third-party library boundaries
type NeverUnknownAnyVoidCase3Flat = ((unknown) & ({
  __fromExternal: true
}));

// Inspired by dynamic data handling
// biome-ignore lint: any
type NeverUnknownAnyVoidCase4Flat = ((any) | (Array<{
  id: ((string) & ({
    __brand: "ProductID"
  }));
  variants:  readonly [
        string,
        ...((({
          a: number
        }) | ({
          b: string
        })))[]
      ];
  pricing: {
    base: number;
    currency: (((string) & ({
      __brand: "id"
    }))) | (((number) & ({
      __brand: "count"
    })));
    discounts?: [
      key: `i18n_${string}`,
      translations: [
        string,
        ((newValue: string) => void)
      ][]
    ]
  }
}>));

// Similar to event handler returns
type NeverUnknownAnyVoidCase5Flat = ((event: Event) => void);

// Pattern from impossible type combinations
type NeverUnknownAnyVoidCase6Flat = ((string) & (number));

// Inspired by type assertion escapes
type NeverUnknownAnyVoidCase7Flat = (string) & ({
  __brand: "TransactionID"
});

// Similar to bottom-type propagation
type NeverUnknownAnyVoidCase8Flat = ((never[]) | (never));

// Pattern from untyped callback parameters
// biome-ignore lint: any
type NeverUnknownAnyVoidCase9Flat = ((cb: ((result: any) => void)) => void);

// Inspired by recursive termination
type NeverUnknownAnyVoidCase10Flat<T> = ((T) extends (never) ? (T) : (T[]));

// Similar to unsafe type assertions
// biome-ignore lint: any
type NeverUnknownAnyVoidCase11Flat = ((any) extends (infer T) ? (T /** unresolved */) : (never));

// Pattern from type-safe void operations
type NeverUnknownAnyVoidCase12Flat = {
  log: ((message: string) => void);
  value: ((void) extends (true) ? (never) : (unknown))
};

// Inspired by impossible conditions
// biome-ignore lint: any
type NeverUnknownAnyVoidCase13Flat = ((never) extends (infer T) ? (T /** unresolved */) : (any));

// Similar to JSON parse results
type NeverUnknownAnyVoidCase14Flat = ((unknown) | (never));

// Pattern from function type compatibility
type NeverUnknownAnyVoidCase15Flat = ((...args: unknown[]) => void);

// Inspired by type system escape hatches
type NeverUnknownAnyVoidCase16Flat = {
  [k: string]: unknown;
  __brand: never
};

// Similar to impossible intersections
type NeverUnknownAnyVoidCase17Flat = ((void) & ({
  value: never
}));

// Pattern from generic constraints
type NeverUnknownAnyVoidCase18Flat<T> = T;

// Inspired by type predicate narrowing
type NeverUnknownAnyVoidCase19Flat = ((value: unknown) => value is (string) & ({
  __brand: "TransactionID"
}));

// Similar to async operation fallbacks
type NeverUnknownAnyVoidCase20Flat = ((Promise<never>) | (Promise<unknown>));

// Pattern from recursive type bottoms
type NeverUnknownAnyVoidCase21Flat<T> = ((T) extends (never) ? (T) : ([
  T
]));

// Inspired by type-safe voids
type NeverUnknownAnyVoidCase22Flat = {
  action: ((req: {
    params: Array<((string) & ({
      __brand: "TransactionID"
    }))>
  }, res: {
    json: ((data: unknown) => void)
  }) => Promise<void>);
  callback: (() => void)
};

// Similar to impossible mapped types
type NeverUnknownAnyVoidCase23Flat = { [K in never]: K /** unresolved */ };

// Pattern from error propagation
type NeverUnknownAnyVoidCase24Flat = ((Error) | (never));

// Inspired by top-type conversions
type NeverUnknownAnyVoidCase25Flat = ((unknown) extends (infer T) ? (((T /** unresolved */) extends (Array<{
  id: ((string) & ({
    __brand: "ProductID"
  }));
  variants:  readonly [
        string,
        ...((({
          a: number
        }) | ({
          b: string
        })))[]
      ];
  pricing: {
    base: number;
    currency: (((string) & ({
      __brand: "id"
    }))) | (((number) & ({
      __brand: "count"
    })));
    discounts?: [
      key: `i18n_${string}`,
      translations: [
        string,
        ((newValue: string) => void)
      ][]
    ]
  }
}>) ? (T /** unresolved */) : (Record<string, T /** unresolved */>))) : (never));


assert<
  Equals<
    NeverUnknownAnyVoidCase1,
    NeverUnknownAnyVoidCase1Flat
  >
>;
assert<
  Equals<
    NeverUnknownAnyVoidCase2<never>,
    NeverUnknownAnyVoidCase2Flat<never>
  >
>;
assert<
  Equals<
    NeverUnknownAnyVoidCase3,
    NeverUnknownAnyVoidCase3Flat
  >
>;
assert<
  Equals<
    NeverUnknownAnyVoidCase4,
    NeverUnknownAnyVoidCase4Flat
  >
>;
assert<
  Equals<
    NeverUnknownAnyVoidCase5,
    NeverUnknownAnyVoidCase5Flat
  >
>;
assert<
  Equals<
    NeverUnknownAnyVoidCase6,
    NeverUnknownAnyVoidCase6Flat
  >
>;
assert<
  Equals<
    NeverUnknownAnyVoidCase7,
    NeverUnknownAnyVoidCase7Flat
  >
>;
assert<
  Equals<
    NeverUnknownAnyVoidCase8,
    NeverUnknownAnyVoidCase8Flat
  >
>;
assert<
  Equals<
    NeverUnknownAnyVoidCase9,
    NeverUnknownAnyVoidCase9Flat
  >
>;
assert<
  Equals<
    NeverUnknownAnyVoidCase10<never>,
    NeverUnknownAnyVoidCase10Flat<never>
  >
>;
assert<
  Equals<
    NeverUnknownAnyVoidCase11,
    NeverUnknownAnyVoidCase11Flat
  >
>;
assert<
  Equals<
    NeverUnknownAnyVoidCase12,
    NeverUnknownAnyVoidCase12Flat
  >
>;
assert<
  Equals<
    NeverUnknownAnyVoidCase13,
    NeverUnknownAnyVoidCase13Flat
  >
>;
assert<
  Equals<
    NeverUnknownAnyVoidCase14,
    NeverUnknownAnyVoidCase14Flat
  >
>;
assert<
  Equals<
    NeverUnknownAnyVoidCase15,
    NeverUnknownAnyVoidCase15Flat
  >
>;
assert<
  Equals<
    NeverUnknownAnyVoidCase16,
    NeverUnknownAnyVoidCase16Flat
  >
>;
assert<
  Equals<
    NeverUnknownAnyVoidCase17,
    NeverUnknownAnyVoidCase17Flat
  >
>;
assert<
  Equals<
    NeverUnknownAnyVoidCase18<never>,
    NeverUnknownAnyVoidCase18Flat<never>
  >
>;
assert<
  Equals<
    NeverUnknownAnyVoidCase19,
    NeverUnknownAnyVoidCase19Flat
  >
>;
assert<
  Equals<
    NeverUnknownAnyVoidCase20,
    NeverUnknownAnyVoidCase20Flat
  >
>;
assert<
  Equals<
    NeverUnknownAnyVoidCase21<never>,
    NeverUnknownAnyVoidCase21Flat<never>
  >
>;
assert<
  Equals<
    NeverUnknownAnyVoidCase22,
    NeverUnknownAnyVoidCase22Flat
  >
>;
assert<
  Equals<
    NeverUnknownAnyVoidCase23,
    NeverUnknownAnyVoidCase23Flat
  >
>;
assert<
  Equals<
    NeverUnknownAnyVoidCase24,
    NeverUnknownAnyVoidCase24Flat
  >
>;
assert<
  Equals<
    NeverUnknownAnyVoidCase25,
    NeverUnknownAnyVoidCase25Flat
  >
>;
