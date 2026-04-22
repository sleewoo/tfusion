// @license MIT
// Contains AI-generated test patterns

// Core shapes from TypeScript Handbook examples
export type User = {
  id: string;
  name: string;
  email?: string;
  readonly createdAt: Date;
};

export type Product<T extends string = string> = {
  sku: T;
  price: number;
  variants: Variant[];
};

export type Variant = {
  color: string;
  size: "S" | "M" | "L";
};

// API patterns from tRPC
export type ProcedureParams<TInput, TOutput> = {
  input: TInput;
  output: TOutput;
  meta?: unknown;
};

// Database patterns from TypeORM
export type RelationMetadata = object;

export type EntityMetadata = {
  name: string;
  columns: ColumnMetadata[];
  relations: never[];
};

export type ColumnMetadata = {
  name: string;
  type: string;
  nullable: boolean;
  primary: boolean;
};

// Added comprehensive validation error type
export type ValidationError = {
  path: (string | number)[];
  message: string;
  code: "invalid_type" | "missing_value" | "custom" | "too_small" | "too_big";
  expected?: string;
  received?: string;
  fatal?: boolean;
  [meta: string]: unknown;
};

// Added validation context type
export type ValidationContext = {
  path: (string | number)[];
  parent: unknown;
  schema: unknown;
};

export type ErrorResult = {
  code: string;
  message: string;
  details?: Array<{
    field?: string;
    issue: string;
  }>;
};

export type PaginationMeta = {
  total: number;
  page: number;
  pageSize: number;
  nextCursor?: string;
  prevCursor?: string;
};

export type HypermediaLink = {
  href: string;
  rel: string;
  method: "GET" | "POST" | "PUT" | "DELETE";
  type?: string;
};

export type FieldError = {
  path: (string | number)[];
  message: string;
  code: "missing" | "invalid" | "conflict";
};

// Added UI-specific foundational types
export type SyntheticEvent<T = Element> = {
  target: T;
  preventDefault: () => void;
  stopPropagation: () => void;
};

export type CSSProperties = {
  [key: string]: string | number;
};

export type Coordinates = {
  x: number;
  y: number;
};

export type Dimension = {
  width: number;
  height: number;
};

export type DatabaseConnection = {
  type: "postgres" | "mysql" | "sqlite";
  host: string;
  port: number;
  username: string;
  password: string;
  database: string;
  ssl?: boolean;
};

export type RuleSet = {
  test: RegExp;
  use: string[];
  exclude?: RegExp[];
};

export type PluginDefinition = {
  name: string;
  options?: Record<string, unknown>;
  enabled?: boolean;
};

export type TreeNode = {
  value: unknown;
  children: [];
};

export type NumericRange<Start extends number, End extends number> =
  Exclude<Enumerate<End>, Enumerate<Start>> extends number
    ? Exclude<Enumerate<End>, Enumerate<Start>>
    : never;

type Enumerate<
  N extends number,
  Acc extends number[] = [],
> = Acc["length"] extends N //
  ? Acc[number]
  : [N, [...Acc, Acc["length"]]];
