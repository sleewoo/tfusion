// @license MIT
// Contains AI-generated test patterns

import type { ValidationContext, ValidationError } from "./object-types";

// 1. Zod-like base schema
export type ValidationSchemaTest1<T> = {
  _type: T;
  parse: (input: unknown) => T;
  safeParse: (input: unknown) => T;
  refine: <U extends T>(fn: (val: T) => U) => U;
};

// 2. Yup-like casting schema
export type ValidationSchemaTest2<T> = {
  cast: (value: unknown) => T;
  validateSync: (value: unknown) => T;
  describe: () => SchemaDescription<T>;
};

// 3. AJV JSON Schema
export interface ValidationSchemaTest3 {
  $schema: string;
  $defs: Record<string, JsonSchema>;
  type: JsonType | JsonTypeI[];
  properties?: Record<string, JsonSchema>;
  required?: string[];
  readonly "@additionalProperties"?: boolean;
}

// 4. Class-validator metadata
export type ValidationSchemaTest4<T> = {
  target: ClassConstructor<T>;
  constraints: PropertyConstraint[];
  errorMessage?: string | ((validationContext: ValidationContext) => string);
};

// 5. Joi-like async schema
export type ValidationSchemaTest5<T> = {
  validateAsync: (value: unknown) => Promise<T>;
  options: {
    abortEarly: boolean;
    stripUnknown: boolean;
    presence: "required" | "optional";
  };
};

// 6. io-ts codec
export type ValidationSchemaTest6<T, U = T> = {
  decode: (input: U) => Either<ValidationError[], T>;
  encode: (value: T) => U;
  name: string;
  is: (u: unknown) => u is Record<string, T>;
};

// 7. Superstruct coercer
export type ValidationSchemaTest7<T> = {
  coerce: (value: unknown, context: ValidationContext) => T;
  validate: (value: T, context: ValidationContext) => ValidationError[];
};

// 8. Valibot pipe
export type ValidationSchemaTest8<T> = {
  pipe: Array<ValidationPipeStep<T>>;
  transform: (value: T) => unknown;
  fallback: () => T;
};

// 9. Vest test suite
export type ValidationSchemaTest9<T> = {
  test: (fieldName: keyof T, assertions: () => void) => void;
  enforce: (values: Partial<T>) => ValidationSuiteResult<T>;
};

// 10. JSON Schema with references
// @relaxed-assert
export type ValidationSchemaTest10 = ValidationSchemaTest3 & {
  $ref: string;
  $dynamicRef?: string;
  $recursiveAnchor?: boolean;
};

// 11. Conditional validation
export type ValidationSchemaTest11<T> = {
  if: (value: Partial<T>, context: ValidationContext) => boolean;
  then: ValidationSchemaTest1<never>;
  otherwise?: ValidationSchemaTest1<never>;
};

// 12. Discriminated union
export type ValidationSchemaTest12<T extends string> = {
  discriminator: T;
  mapping: Record<string, ValidationSchemaTest1<never>>;
  options: string[];
};

// 13. Recursive schema
export type ValidationSchemaTest13<T> = {
  definition: T;
  unwrap: () => T;
};

// 14. Branded type
export type ValidationSchemaTest14<T, B extends string> = T & {
  readonly __brand: B;
  readonly __validator: ValidationSchemaTest1<T>;
};

// 15. Default values
export type ValidationSchemaTest15<T> = ValidationSchemaTest1<T> & {
  default: T | (() => T);
  optional: () => T | undefined;
};

// 16. Error customization
export type ValidationSchemaTest16<T> = ValidationSchemaTest1<T> & {
  message: string | ((ctx: ValidationContext) => string);
  path: (string | number)[];
  params?: Record<string, unknown>;
};

// 17. Schema metadata
export type ValidationSchemaTest17<T> = ValidationSchemaTest1<T> & {
  meta: {
    description?: string;
    examples?: T[];
    deprecated?: boolean;
    [key: string]: unknown;
  };
};

// 18. Partial schema
export type ValidationSchemaTest18<T> = {
  partial: () => Partial<T>;
  required: () => Required<T>;
};

// 19. Object composition
export type ValidationSchemaTest19<T, U> = {
  merge: (schema: ValidationSchemaTest1<T>) => U;
  omit: <K extends keyof (T & U)>(keys: K[]) => Omit<U, K>;
};

// 20. Array constraints
export type ValidationSchemaTest20<T> = ValidationSchemaTest1<T[]> & {
  min: (length: number) => T;
  max: (length: number) => T;
  length: (length: number) => T;
};

// 21. Record validation
export type ValidationSchemaTest21<K extends string | number | symbol, V> = {
  keySchema: ValidationSchemaTest1<K>;
  valueSchema: ValidationSchemaTest1<V>;
  catchall: ValidationSchemaTest1<never>;
};

// 22. Lazy evaluation
export type ValidationSchemaTest22<T> = {
  lazy: (fn: () => ValidationSchemaTest1<T>) => ValidationSchemaTest1<T>;
};

// 23. Async side effects
export type ValidationSchemaTest23<T> = ValidationSchemaTest1<T> & {
  checkAsync: (value: T) => Promise<boolean>;
  transformAsync: (value: T) => Promise<T>;
};

// 24. File validation
export interface ValidationSchemaTest24 {
  type: "file";
  validate: (file: {
    name: string;
    size: number;
    type: string;
    content: ArrayBuffer;
  }) => ValidationError[];
}

// 25. Cross-field validation
export type ValidationSchemaTest25<T> = {
  dependencies: (keyof T)[];
  validate: (value: T, context: ValidationContext) => ValidationError[];
};

type JsonType = "string" | "number" | "boolean" | "object" | "array" | "null";
type JsonTypeI = "string" & { __id: number };

type SchemaDescription<T> = {
  type: string;
  fields: {
    [K in keyof T]?: FieldDescription;
  };
};

type FieldDescription = {
  type: string;
  required: boolean;
  tests: string[];
};

type ClassConstructor<T> = { new: (...args: unknown[]) => T };

type PropertyConstraint = {
  type: "min" | "max" | "matches";
  value: number | string | RegExp;
  message?: string;
};

type Either<L, R> = { left: L } | { right: R };

type ValidationPipeStep<T> = {
  type: "transform" | "check";
  fn: (value: T) => unknown;
};

type ValidationSuiteResult<T> = {
  valid: boolean;
  errors: {
    [K in keyof T]?: ValidationError[];
  };
};

type JsonSchema = {
  $id?: string;
  $schema?: string;
  [keyword: string]: unknown;
};

// view aliases
export type ValidationSchemaTest3View = ValidationSchemaTest3;
export type ValidationSchemaTest24View = ValidationSchemaTest24;
