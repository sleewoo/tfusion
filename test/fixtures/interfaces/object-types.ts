// @license MIT
// Contains AI-generated test patterns

// Core shapes from TypeScript Handbook examples
export interface User {
  id: string;
  name: string;
  email?: string;
  readonly createdAt: Date;
}

export type Product<T extends string = string> = {
  sku: T;
  price: number;
  variants: Variant[];
};

declare global {
  interface Variant {
    color: string;
  }
}

// API patterns from tRPC
export type ProcedureParams<TInput, TOutput> = {
  input: TInput;
  output: TOutput;
  meta?: unknown;
};

// Database patterns from TypeORM
export type RelationMetadata = object;

export interface EntityMetadata {
  name: string;
  columns: ColumnMetadata[];
  relations: never[];
}

export interface ColumnMetadata {
  name: string;
  type: string;
  nullable: boolean;
  primary: boolean;
}

// Added comprehensive validation error type
export interface ValidationError {
  path: (string | number)[];
  message: string;
  code: "invalid_type" | "missing_value" | "custom" | "too_small" | "too_big";
  expected?: string;
  received?: string;
  fatal?: boolean;
  [meta: string]: unknown;
}

// Added validation context type
export interface ValidationContext {
  path: (string | number)[];
  parent: unknown;
  schema: unknown;
}

export interface ErrorResultBase {
  code: string;
}

export interface ErrorResult extends ErrorResultBase {
  message: string;
  details?: Array<{
    field?: string;
    issue: string;
  }>;
}

export interface PaginationMetaBase {
  total: number;
  page: number;
}

export interface PaginationMeta extends PaginationMetaBase {
  pageSize: number;
  nextCursor?: string;
  prevCursor?: string;
}

export interface HypermediaLinkBase {
  href: string;
  rel: string;
}

export interface HypermediaLink extends HypermediaLinkBase {
  method: "GET" | "POST" | "PUT" | "DELETE";
  type?: string;
}

export interface FieldError {
  path: (string | number)[];
  message: string;
  code: "missing" | "invalid" | "conflict";
}

// Added UI-specific foundational types
export type SyntheticEvent<T = Element> = {
  target: T;
  preventDefault: () => void;
  stopPropagation: () => void;
};

export interface CSSProperties {
  [key: string]: string | number;
}

declare global {
  interface Coordinates {
    x: number;
  }
}

export interface Dimension {
  width: number;
  height: number;
}

export interface DatabaseConnection {
  type: "postgres" | "mysql" | "sqlite";
  host: string;
  port: number;
  username: string;
  password: string;
  database: string;
  ssl?: boolean;
}

export interface RuleSet {
  test: RegExp;
  use: string[];
  exclude?: RegExp[];
}

export interface PluginDefinitionBase {
  name: string;
}

export interface PluginDefinition extends PluginDefinitionBase {
  options?: Record<string, unknown>;
  enabled?: boolean;
}

export interface TreeNode {
  value: unknown;
  children: [];
}

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
// view aliases
export type UserView = User;
export type VariantView = Variant;
export type EntityMetadataView = EntityMetadata;
export type ColumnMetadataView = ColumnMetadata;
export type ValidationErrorView = ValidationError;
export type ValidationContextView = ValidationContext;
export type ErrorResultView = ErrorResult;
export type PaginationMetaView = PaginationMeta;
export type HypermediaLinkView = HypermediaLink;
export type FieldErrorView = FieldError;
export type CSSPropertiesView = CSSProperties;
export type CoordinatesView = Coordinates;
export type DimensionView = Dimension;
export type DatabaseConnectionView = DatabaseConnection;
export type RuleSetView = RuleSet;
export type PluginDefinitionView = PluginDefinition;
export type TreeNodeView = TreeNode;
export type PaginationMetaBaseView = PaginationMetaBase;
export type HypermediaLinkBaseView = HypermediaLinkBase;
export type ErrorResultBaseView = ErrorResultBase;
export type PluginDefinitionBaseView = PluginDefinitionBase;
