import { assert, type Equals } from "tsafe";

import type {
  Product,
  ProcedureParams,
  RelationMetadata,
  SyntheticEvent,
  NumericRange,
  UserView,
  VariantView,
  EntityMetadataView,
  ColumnMetadataView,
  ValidationErrorView,
  ValidationContextView,
  ErrorResultView,
  PaginationMetaView,
  HypermediaLinkView,
  FieldErrorView,
  CSSPropertiesView,
  CoordinatesView,
  DimensionView,
  DatabaseConnectionView,
  RuleSetView,
  PluginDefinitionView,
  TreeNodeView,
  PaginationMetaBaseView,
  HypermediaLinkBaseView,
  ErrorResultBaseView,
  PluginDefinitionBaseView,
} from "@/fixtures/interfaces/object-types.ts";

type ProductFlat<T extends string = string> = {
  sku: T;
  price: number;
  variants: {
    color: string;
    size: (("S") | ("M") | ("L"))
  }[]
};

// API patterns from tRPC
type ProcedureParamsFlat<TInput, TOutput> = {
  input: TInput;
  output: TOutput;
  meta?: unknown
};

// Database patterns from TypeORM
type RelationMetadataFlat = object;

// Added UI-specific foundational types
type SyntheticEventFlat<T = Element> = {
  target: T;
  preventDefault: (() => void);
  stopPropagation: (() => void)
};

type NumericRangeFlat<Start extends number, End extends number> = ((Exclude<((([])["length"]) extends (End) ? (([])[number]) : ([
  End,
  [
    ...[],
    ([])["length"]
  ]
])), ((([])["length"]) extends (Start) ? (([])[number]) : ([
  Start,
  [
    ...[],
    ([])["length"]
  ]
]))>) extends (number) ? (Exclude<((([])["length"]) extends (End) ? (([])[number]) : ([
  End,
  [
    ...[],
    ([])["length"]
  ]
])), ((([])["length"]) extends (Start) ? (([])[number]) : ([
  Start,
  [
    ...[],
    ([])["length"]
  ]
]))>) : (never));

// view aliases
type UserViewFlat = {
  id: string;
  name: string;
  email?: string;
  readonly createdAt: Date
};

type VariantViewFlat = {
  color: string;
  size: (("S") | ("M") | ("L"))
};

type EntityMetadataViewFlat = {
  name: string;
  columns: {
    name: string;
    type: string;
    nullable: boolean;
    primary: boolean
  }[];
  relations: never[]
};

type ColumnMetadataViewFlat = {
  name: string;
  type: string;
  nullable: boolean;
  primary: boolean
};

type ValidationErrorViewFlat = {
  path: (((string) | (number)))[];
  message: string;
  code: (("invalid_type") | ("missing_value") | ("custom") | ("too_small") | ("too_big"));
  expected?: string;
  received?: string;
  fatal?: boolean;
  [k: string]: unknown
};

type ValidationContextViewFlat = {
  path: (((string) | (number)))[];
  parent: unknown;
  schema: unknown
};

type ErrorResultViewFlat = {
  code: string;
  message: string;
  details?: Array<{
    field?: string;
    issue: string
  }>
};

type PaginationMetaViewFlat = {
  total: number;
  page: number;
  pageSize: number;
  nextCursor?: string;
  prevCursor?: string
};

type HypermediaLinkViewFlat = {
  href: string;
  rel: string;
  method: (("GET") | ("POST") | ("PUT") | ("DELETE"));
  type?: string
};

type FieldErrorViewFlat = {
  path: (((string) | (number)))[];
  message: string;
  code: (("missing") | ("invalid") | ("conflict"))
};

type CSSPropertiesViewFlat = {
  [k: string]: ((string) | (number))
};

type CoordinatesViewFlat = {
  x: number;
  y: number
};

type DimensionViewFlat = {
  width: number;
  height: number
};

type DatabaseConnectionViewFlat = {
  type: (("postgres") | ("mysql") | ("sqlite"));
  host: string;
  port: number;
  username: string;
  password: string;
  database: string;
  ssl?: boolean
};

type RuleSetViewFlat = {
  test: RegExp;
  use: string[];
  exclude?: RegExp[]
};

type PluginDefinitionViewFlat = {
  name: string;
  options?: Record<string, unknown>;
  enabled?: boolean
};

type TreeNodeViewFlat = {
  value: unknown;
  children: []
};

type PaginationMetaBaseViewFlat = {
  total: number;
  page: number
};

type HypermediaLinkBaseViewFlat = {
  href: string;
  rel: string
};

type ErrorResultBaseViewFlat = {
  code: string
};

type PluginDefinitionBaseViewFlat = {
  name: string
};


assert<
  Equals<
    Product<never>,
    ProductFlat<never>
  >
>;
assert<
  Equals<
    ProcedureParams<never, never>,
    ProcedureParamsFlat<never, never>
  >
>;
assert<
  Equals<
    RelationMetadata,
    RelationMetadataFlat
  >
>;
assert<
  Equals<
    SyntheticEvent<never>,
    SyntheticEventFlat<never>
  >
>;
assert<
  Equals<
    NumericRange<never, never>,
    NumericRangeFlat<never, never>
  >
>;
assert<
  Equals<
    UserView,
    UserViewFlat
  >
>;
assert<
  Equals<
    VariantView,
    VariantViewFlat
  >
>;
assert<
  Equals<
    EntityMetadataView,
    EntityMetadataViewFlat
  >
>;
assert<
  Equals<
    ColumnMetadataView,
    ColumnMetadataViewFlat
  >
>;
assert<
  Equals<
    ValidationErrorView,
    ValidationErrorViewFlat
  >
>;
assert<
  Equals<
    ValidationContextView,
    ValidationContextViewFlat
  >
>;
assert<
  Equals<
    ErrorResultView,
    ErrorResultViewFlat
  >
>;
assert<
  Equals<
    PaginationMetaView,
    PaginationMetaViewFlat
  >
>;
assert<
  Equals<
    HypermediaLinkView,
    HypermediaLinkViewFlat
  >
>;
assert<
  Equals<
    FieldErrorView,
    FieldErrorViewFlat
  >
>;
assert<
  Equals<
    CSSPropertiesView,
    CSSPropertiesViewFlat
  >
>;
assert<
  Equals<
    CoordinatesView,
    CoordinatesViewFlat
  >
>;
assert<
  Equals<
    DimensionView,
    DimensionViewFlat
  >
>;
assert<
  Equals<
    DatabaseConnectionView,
    DatabaseConnectionViewFlat
  >
>;
assert<
  Equals<
    RuleSetView,
    RuleSetViewFlat
  >
>;
assert<
  Equals<
    PluginDefinitionView,
    PluginDefinitionViewFlat
  >
>;
assert<
  Equals<
    TreeNodeView,
    TreeNodeViewFlat
  >
>;
assert<
  Equals<
    PaginationMetaBaseView,
    PaginationMetaBaseViewFlat
  >
>;
assert<
  Equals<
    HypermediaLinkBaseView,
    HypermediaLinkBaseViewFlat
  >
>;
assert<
  Equals<
    ErrorResultBaseView,
    ErrorResultBaseViewFlat
  >
>;
assert<
  Equals<
    PluginDefinitionBaseView,
    PluginDefinitionBaseViewFlat
  >
>;
