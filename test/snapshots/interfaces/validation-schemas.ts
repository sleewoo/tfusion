import { assert, type Equals } from "tsafe";

import type {
  ValidationSchemaTest1,
  ValidationSchemaTest2,
  ValidationSchemaTest4,
  ValidationSchemaTest5,
  ValidationSchemaTest6,
  ValidationSchemaTest7,
  ValidationSchemaTest8,
  ValidationSchemaTest9,
  ValidationSchemaTest10,
  ValidationSchemaTest11,
  ValidationSchemaTest12,
  ValidationSchemaTest13,
  ValidationSchemaTest14,
  ValidationSchemaTest15,
  ValidationSchemaTest16,
  ValidationSchemaTest17,
  ValidationSchemaTest18,
  ValidationSchemaTest19,
  ValidationSchemaTest20,
  ValidationSchemaTest21,
  ValidationSchemaTest22,
  ValidationSchemaTest23,
  ValidationSchemaTest25,
  ValidationSchemaTest3View,
  ValidationSchemaTest24View,
} from "@/fixtures/interfaces/validation-schemas.ts";

// 1. Zod-like base schema
type ValidationSchemaTest1Flat<T> = {
  _type: T;
  parse: ((input: unknown) => T);
  safeParse: ((input: unknown) => T);
  refine: (<U extends T>(fn: ((val: T) => U /** unresolved */)) => U /** unresolved */)
};

// 2. Yup-like casting schema
type ValidationSchemaTest2Flat<T> = {
  cast: ((value: unknown) => T);
  validateSync: ((value: unknown) => T);
  describe: (() => {
    type: string;
    fields: { [K in keyof (T)]?: {
      type: string;
      required: boolean;
      tests: string[]
    } }
  })
};

// 4. Class-validator metadata
type ValidationSchemaTest4Flat<T> = {
  target: {
    new: ((...args: unknown[]) => T)
  };
  constraints: {
    type: (("min") | ("max") | ("matches"));
    value: ((number) | (string) | (RegExp));
    message?: string
  }[];
  errorMessage?: ((string) | (((validationContext: {
    path: (((string) | (number)))[];
    parent: unknown;
    schema: unknown
  }) => string)))
};

// 5. Joi-like async schema
type ValidationSchemaTest5Flat<T> = {
  validateAsync: ((value: unknown) => Promise<T>);
  options: {
    abortEarly: boolean;
    stripUnknown: boolean;
    presence: (("required") | ("optional"))
  }
};

// 6. io-ts codec
type ValidationSchemaTest6Flat<T, U = T /** unresolved */> = {
  decode: ((input: U) => (({
    left: {
      path: (((string) | (number)))[];
      message: string;
      code: (("invalid_type") | ("missing_value") | ("custom") | ("too_small") | ("too_big"));
      expected?: string;
      received?: string;
      fatal?: boolean;
      [k: string]: unknown
    }[]
  }) | ({
    right: T
  })));
  encode: ((value: T) => U);
  name: string;
  is: ((u: unknown) => u is Record<string, T>)
};

// 7. Superstruct coercer
type ValidationSchemaTest7Flat<T> = {
  coerce: ((value: unknown, context: {
    path: (((string) | (number)))[];
    parent: unknown;
    schema: unknown
  }) => T);
  validate: ((value: T, context: {
    path: (((string) | (number)))[];
    parent: unknown;
    schema: unknown
  }) => {
    path: (((string) | (number)))[];
    message: string;
    code: (("invalid_type") | ("missing_value") | ("custom") | ("too_small") | ("too_big"));
    expected?: string;
    received?: string;
    fatal?: boolean;
    [k: string]: unknown
  }[])
};

// 8. Valibot pipe
type ValidationSchemaTest8Flat<T> = {
  pipe: Array<{
    type: (("transform") | ("check"));
    fn: ((value: T) => unknown)
  }>;
  transform: ((value: T) => unknown);
  fallback: (() => T)
};

// 9. Vest test suite
type ValidationSchemaTest9Flat<T> = {
  test: ((fieldName: keyof (T), assertions: (() => void)) => void);
  enforce: ((values: Partial<T>) => {
    valid: boolean;
    errors: { [K in keyof (T)]?: {
      path: (((string) | (number)))[];
      message: string;
      code: (("invalid_type") | ("missing_value") | ("custom") | ("too_small") | ("too_big"));
      expected?: string;
      received?: string;
      fatal?: boolean;
      [k: string]: unknown
    }[] }
  })
};

// 10. JSON Schema with references
// @relaxed-assert
type ValidationSchemaTest10Flat = (({
  $schema: string;
  $defs: Record<string, {
    [k: string]: unknown;
    $id?: string;
    $schema?: string
  }>;
  type: (((("string") | ("number") | ("boolean") | ("object") | ("array") | ("null"))) | ((("string") & ({
    __id: number
  }))[]));
  properties?: Record<string, {
    [k: string]: unknown;
    $id?: string;
    $schema?: string
  }>;
  required?: string[];
  readonly "@additionalProperties"?: boolean
}) & ({
  $ref: string;
  $dynamicRef?: string;
  $recursiveAnchor?: boolean
}));

// 11. Conditional validation
type ValidationSchemaTest11Flat<T> = {
  if: ((value: Partial<T>, context: {
    path: (((string) | (number)))[];
    parent: unknown;
    schema: unknown
  }) => boolean);
  then: {
    _type: never;
    parse: ((input: unknown) => never);
    safeParse: ((input: unknown) => never);
    refine: (<U extends never>(fn: ((val: never) => U /** unresolved */)) => U /** unresolved */)
  };
  otherwise?: {
    _type: never;
    parse: ((input: unknown) => never);
    safeParse: ((input: unknown) => never);
    refine: (<U extends never>(fn: ((val: never) => U /** unresolved */)) => U /** unresolved */)
  }
};

// 12. Discriminated union
type ValidationSchemaTest12Flat<T extends string> = {
  discriminator: T;
  mapping: Record<string, {
    _type: never;
    parse: ((input: unknown) => never);
    safeParse: ((input: unknown) => never);
    refine: (<U extends never>(fn: ((val: never) => U /** unresolved */)) => U /** unresolved */)
  }>;
  options: string[]
};

// 13. Recursive schema
type ValidationSchemaTest13Flat<T> = {
  definition: T;
  unwrap: (() => T)
};

// 14. Branded type
type ValidationSchemaTest14Flat<T, B extends string> = ((T) & ({
  readonly __brand: B;
  readonly __validator: {
    _type: T;
    parse: ((input: unknown) => T);
    safeParse: ((input: unknown) => T);
    refine: (<U extends T>(fn: ((val: T) => U /** unresolved */)) => U /** unresolved */)
  }
}));

// 15. Default values
type ValidationSchemaTest15Flat<T> = (({
  _type: T;
  parse: ((input: unknown) => T);
  safeParse: ((input: unknown) => T);
  refine: (<U extends T>(fn: ((val: T) => U /** unresolved */)) => U /** unresolved */)
}) & ({
  default: ((T) | ((() => T)));
  optional: (() => ((T) | (undefined)))
}));

// 16. Error customization
type ValidationSchemaTest16Flat<T> = (({
  _type: T;
  parse: ((input: unknown) => T);
  safeParse: ((input: unknown) => T);
  refine: (<U extends T>(fn: ((val: T) => U /** unresolved */)) => U /** unresolved */)
}) & ({
  message: ((string) | (((ctx: {
    path: (((string) | (number)))[];
    parent: unknown;
    schema: unknown
  }) => string)));
  path: (((string) | (number)))[];
  params?: Record<string, unknown>
}));

// 17. Schema metadata
type ValidationSchemaTest17Flat<T> = (({
  _type: T;
  parse: ((input: unknown) => T);
  safeParse: ((input: unknown) => T);
  refine: (<U extends T>(fn: ((val: T) => U /** unresolved */)) => U /** unresolved */)
}) & ({
  meta: {
    [k: string]: unknown;
    description?: string;
    examples?: T[];
    deprecated?: boolean
  }
}));

// 18. Partial schema
type ValidationSchemaTest18Flat<T> = {
  partial: (() => Partial<T>);
  required: (() => Required<T>)
};

// 19. Object composition
type ValidationSchemaTest19Flat<T, U> = {
  merge: ((schema: {
    _type: T;
    parse: ((input: unknown) => T);
    safeParse: ((input: unknown) => T);
    refine: (<U extends T>(fn: ((val: T) => U /** unresolved */)) => U /** unresolved */)
  }) => U);
  omit: (<K extends keyof (((T) & (U)))>(keys: K /** unresolved */[]) => Omit<U, K /** unresolved */>)
};

// 20. Array constraints
type ValidationSchemaTest20Flat<T> = (({
  _type: T[];
  parse: ((input: unknown) => T[]);
  safeParse: ((input: unknown) => T[]);
  refine: (<U extends T[]>(fn: ((val: T[]) => U /** unresolved */)) => U /** unresolved */)
}) & ({
  min: ((length: number) => T);
  max: ((length: number) => T);
  length: ((length: number) => T)
}));

// 21. Record validation
type ValidationSchemaTest21Flat<K extends ((string) | (number) | (symbol)), V> = {
  keySchema: {
    _type: K;
    parse: ((input: unknown) => K);
    safeParse: ((input: unknown) => K);
    refine: (<U extends K>(fn: ((val: K) => U /** unresolved */)) => U /** unresolved */)
  };
  valueSchema: {
    _type: V;
    parse: ((input: unknown) => V);
    safeParse: ((input: unknown) => V);
    refine: (<U extends V>(fn: ((val: V) => U /** unresolved */)) => U /** unresolved */)
  };
  catchall: {
    _type: never;
    parse: ((input: unknown) => never);
    safeParse: ((input: unknown) => never);
    refine: (<U extends never>(fn: ((val: never) => U /** unresolved */)) => U /** unresolved */)
  }
};

// 22. Lazy evaluation
type ValidationSchemaTest22Flat<T> = {
  lazy: ((fn: (() => {
    _type: T;
    parse: ((input: unknown) => T);
    safeParse: ((input: unknown) => T);
    refine: (<U extends T>(fn: ((val: T) => U /** unresolved */)) => U /** unresolved */)
  })) => {
    _type: T;
    parse: ((input: unknown) => T);
    safeParse: ((input: unknown) => T);
    refine: (<U extends T>(fn: ((val: T) => U /** unresolved */)) => U /** unresolved */)
  })
};

// 23. Async side effects
type ValidationSchemaTest23Flat<T> = (({
  _type: T;
  parse: ((input: unknown) => T);
  safeParse: ((input: unknown) => T);
  refine: (<U extends T>(fn: ((val: T) => U /** unresolved */)) => U /** unresolved */)
}) & ({
  checkAsync: ((value: T) => Promise<boolean>);
  transformAsync: ((value: T) => Promise<T>)
}));

// 25. Cross-field validation
type ValidationSchemaTest25Flat<T> = {
  dependencies: (keyof (T))[];
  validate: ((value: T, context: {
    path: (((string) | (number)))[];
    parent: unknown;
    schema: unknown
  }) => {
    path: (((string) | (number)))[];
    message: string;
    code: (("invalid_type") | ("missing_value") | ("custom") | ("too_small") | ("too_big"));
    expected?: string;
    received?: string;
    fatal?: boolean;
    [k: string]: unknown
  }[])
};

// view aliases
type ValidationSchemaTest3ViewFlat = {
  $schema: string;
  $defs: Record<string, {
    [k: string]: unknown;
    $id?: string;
    $schema?: string
  }>;
  type: (((("string") | ("number") | ("boolean") | ("object") | ("array") | ("null"))) | ((("string") & ({
    __id: number
  }))[]));
  properties?: Record<string, {
    [k: string]: unknown;
    $id?: string;
    $schema?: string
  }>;
  required?: string[];
  readonly "@additionalProperties"?: boolean
};

type ValidationSchemaTest24ViewFlat = {
  type: "file";
  validate: ((file: {
    name: string;
    size: number;
    type: string;
    content: ArrayBuffer
  }) => {
    path: (((string) | (number)))[];
    message: string;
    code: (("invalid_type") | ("missing_value") | ("custom") | ("too_small") | ("too_big"));
    expected?: string;
    received?: string;
    fatal?: boolean;
    [k: string]: unknown
  }[])
};


assert<
  Equals<
    ValidationSchemaTest1<never>,
    ValidationSchemaTest1Flat<never>
  >
>;
assert<
  Equals<
    ValidationSchemaTest2<never>,
    ValidationSchemaTest2Flat<never>
  >
>;
assert<
  Equals<
    ValidationSchemaTest4<never>,
    ValidationSchemaTest4Flat<never>
  >
>;
assert<
  Equals<
    ValidationSchemaTest5<never>,
    ValidationSchemaTest5Flat<never>
  >
>;
assert<
  Equals<
    ValidationSchemaTest6<never, never>,
    ValidationSchemaTest6Flat<never, never>
  >
>;
assert<
  Equals<
    ValidationSchemaTest7<never>,
    ValidationSchemaTest7Flat<never>
  >
>;
assert<
  Equals<
    ValidationSchemaTest8<never>,
    ValidationSchemaTest8Flat<never>
  >
>;
assert<
  Equals<
    ValidationSchemaTest9<never>,
    ValidationSchemaTest9Flat<never>
  >
>;
assert<
    ValidationSchemaTest10Flat extends ValidationSchemaTest10
      ? ValidationSchemaTest10 extends ValidationSchemaTest10Flat ? true : false
      : false
>;
assert<
  Equals<
    ValidationSchemaTest11<never>,
    ValidationSchemaTest11Flat<never>
  >
>;
assert<
  Equals<
    ValidationSchemaTest12<never>,
    ValidationSchemaTest12Flat<never>
  >
>;
assert<
  Equals<
    ValidationSchemaTest13<never>,
    ValidationSchemaTest13Flat<never>
  >
>;
assert<
  Equals<
    ValidationSchemaTest14<never, never>,
    ValidationSchemaTest14Flat<never, never>
  >
>;
assert<
  Equals<
    ValidationSchemaTest15<never>,
    ValidationSchemaTest15Flat<never>
  >
>;
assert<
  Equals<
    ValidationSchemaTest16<never>,
    ValidationSchemaTest16Flat<never>
  >
>;
assert<
  Equals<
    ValidationSchemaTest17<never>,
    ValidationSchemaTest17Flat<never>
  >
>;
assert<
  Equals<
    ValidationSchemaTest18<never>,
    ValidationSchemaTest18Flat<never>
  >
>;
assert<
  Equals<
    ValidationSchemaTest19<never, never>,
    ValidationSchemaTest19Flat<never, never>
  >
>;
assert<
  Equals<
    ValidationSchemaTest20<never>,
    ValidationSchemaTest20Flat<never>
  >
>;
assert<
  Equals<
    ValidationSchemaTest21<never, never>,
    ValidationSchemaTest21Flat<never, never>
  >
>;
assert<
  Equals<
    ValidationSchemaTest22<never>,
    ValidationSchemaTest22Flat<never>
  >
>;
assert<
  Equals<
    ValidationSchemaTest23<never>,
    ValidationSchemaTest23Flat<never>
  >
>;
assert<
  Equals<
    ValidationSchemaTest25<never>,
    ValidationSchemaTest25Flat<never>
  >
>;
assert<
  Equals<
    ValidationSchemaTest3View,
    ValidationSchemaTest3ViewFlat
  >
>;
assert<
  Equals<
    ValidationSchemaTest24View,
    ValidationSchemaTest24ViewFlat
  >
>;
