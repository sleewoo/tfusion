import { assert, type Equals } from "tsafe";

import type {
  ApiResponseTest1,
  ApiResponseTest3,
  ApiResponseTest4,
  ApiResponseTest5,
  ApiResponseTest6,
  ApiResponseTest7,
  ApiResponseTest8,
  ApiResponseTest9,
  ApiResponseTest11,
  ApiResponseTest13,
  ApiResponseTest14,
  ApiResponseTest15,
  ApiResponseTest16,
  ApiResponseTest21,
  ApiResponseTest22,
  ApiResponseTest2View,
  ApiResponseTest10View,
  ApiResponseTest12View,
  ApiResponseTest17View,
  ApiResponseTest18View,
  ApiResponseTest19View,
  ApiResponseTest20View,
  ApiResponseTest23View,
  ApiResponseTest24View,
  ApiResponseTest25View,
  ApiResponseTest18BaseView,
  ApiResponseTest19BaseView,
} from "@/fixtures/interfaces/api-responses.ts";

// 1. Basic REST success response
type ApiResponseTest1Flat<T> = {
  data: T;
  status: number;
  headers: Record<string, string>
};

// 3. Paginated response
type ApiResponseTest3Flat<T> = {
  items: T[];
  meta: {
    total: number;
    page: number;
    pageSize: number;
    nextCursor?: string;
    prevCursor?: string
  };
  links: {
    href: string;
    rel: string;
    method: (("GET") | ("POST") | ("PUT") | ("DELETE"));
    type?: string
  }[]
};

// 4. GraphQL-style response
type ApiResponseTest4Flat<T> = {
  data?: T;
  errors?: Array<{
    message: string;
    path: (((string) | (number)))[];
    extensions?: Record<string, unknown>
  }>
};

// 5. JSON:API specification
type ApiResponseTest5Flat<T> = {
  jsonapi: {
    version: string
  };
  data: Array<{
    type: string;
    id: string;
    attributes: T;
    relationships?: Record<string, {
      data: (({
        type: string;
        id: string
      }) | (Array<{
        type: string;
        id: string
      }>))
    }>
  }>;
  included?: unknown[]
};

// 6. OData v4 response
type ApiResponseTest6Flat<T> = {
  "@odata.context": string;
  "@odata.count"?: number;
  value: T[];
  "@odata.nextLink"?: string
};

// 7. tRPC-style response
type ApiResponseTest7Flat<T> = {
  result: {
    data: T
  };
  context?: {
    req?: unknown;
    res?: unknown
  }
};

// 8. Bulk operation result
type ApiResponseTest8Flat<T> = {
  succeeded: Array<{
    item: T;
    id: string
  }>;
  failed: Array<{
    item: T;
    error: {
      code: string;
      message: string;
      details?: Array<{
        field?: string;
        issue: string
      }>
    }
  }>
};

// 9. Streaming response
type ApiResponseTest9Flat<T> = {
  stream: AsyncIterable<T> /** unresolved */;
  headers: {
    "Content-Type": "application/x-ndjson";
    "Transfer-Encoding": "chunked"
  }
};

// 11. HAL (Hypertext Application Language)
type ApiResponseTest11Flat<T> = {
  _embedded: {
    items: T[]
  };
  _links: Record<string, {
    href: string;
    rel: string;
    method: (("GET") | ("POST") | ("PUT") | ("DELETE"));
    type?: string
  }>;
  page: {
    total: number;
    page: number;
    pageSize: number;
    nextCursor?: string;
    prevCursor?: string
  }
};

// 13. Batch response
type ApiResponseTest13Flat = Array<(({
  status: 200;
  body: unknown
}) | ({
  status: 207;
  body: {
    results: Array<(({
      data: unknown;
      status: number;
      headers: Record<string, string>
    }) | ({
      error: {
        code: string;
        message: string;
        details?: Array<{
          field?: string;
          issue: string
        }>
      };
      status: number;
      debug?: {
        timestamp: Date;
        stack?: string
      }
    }))>
  }
}))>;

// 14. Server-Sent Events (SSE)
type ApiResponseTest14Flat<T> = {
  data: T;
  event?: string;
  id?: string;
  retry?: number
}[];

// 15. Websocket acknowledgement
type ApiResponseTest15Flat<T> = {
  correlationId: string;
  timestamp: Date;
  payload: ((T) | ({
    code: string;
    message: string;
    details?: Array<{
      field?: string;
      issue: string
    }>
  }))
};

// 16. CQRS-style response
type ApiResponseTest16Flat<T> = {
  commandId: string;
  ack: boolean;
  result?: T;
  errors?: {
    code: string;
    message: string;
    details?: Array<{
      field?: string;
      issue: string
    }>
  }[]
};

// 21. Versioned response
type ApiResponseTest21Flat<T> = {
  version: string;
  data: T;
  deprecated?: boolean;
  migrationGuide?: string
};

// 22. Conditional response
type ApiResponseTest22Flat<T> = (({
  status: 200;
  body: T;
  fresh: boolean
}) | ({
  status: 304;
  headers: {
    ETag: string
  }
}));

// view aliases
type ApiResponseTest2ViewFlat = {
  error: {
    code: string;
    message: string;
    details?: Array<{
      field?: string;
      issue: string
    }>
  };
  status: number;
  debug?: {
    timestamp: Date;
    stack?: string
  }
};

type ApiResponseTest10ViewFlat = {
  code: "validation_failed";
  errors: {
    path: (((string) | (number)))[];
    message: string;
    code: (("missing") | ("invalid") | ("conflict"))
  }[];
  status: 422
};

type ApiResponseTest12ViewFlat = {
  type: string;
  title: string;
  status: number;
  detail?: string;
  instance?: string;
  [k: `_${number}`]: {
    code: "validation_failed";
    errors: {
      path: (((string) | (number)))[];
      message: string;
      code: (("missing") | ("invalid") | ("conflict"))
    }[];
    status: 422
  }
};

type ApiResponseTest17ViewFlat = {
  checks: Record<string, {
    status: (("pass") | ("fail") | ("warn"));
    output?: string;
    duration: number
  }>;
  status: (("ok") | ("degraded") | ("down"))
};

type ApiResponseTest18ViewFlat = {
  url: string;
  method: (("PUT") | ("GET"));
  headers: Record<string, string>;
  expiresAt: Date;
  fields?: Record<string, string>
};

type ApiResponseTest19ViewFlat = {
  "X-RateLimit-Limit": number;
  "X-RateLimit-Remaining": number;
  "X-RateLimit-Reset": number;
  "Retry-After"?: number
};

type ApiResponseTest20ViewFlat = {
  warning: {
    code: 299;
    text: string;
    sunset?: Date;
    link?: string
  }
};

type ApiResponseTest23ViewFlat = {
  allowedOrigins: string[];
  allowedMethods: string[];
  allowedHeaders: string[];
  maxAge?: number;
  allowCredentials?: boolean
};

type ApiResponseTest24ViewFlat = {
  acceptRanges: (("bytes") | ("none"));
  contentLength: number;
  body: ArrayBuffer;
  status: 206;
  contentRange: string
};

type ApiResponseTest25ViewFlat = {
  endpoints: Array<{
    path: string;
    methods: string[];
    description?: string;
    parameters?: Array<{
      name: string;
      in: (("query") | ("path") | ("header"));
      required?: boolean
    }>
  }>
};

type ApiResponseTest18BaseViewFlat = {
  url: string;
  method: (("PUT") | ("GET"))
};

type ApiResponseTest19BaseViewFlat = {
  "X-RateLimit-Limit": number;
  "X-RateLimit-Remaining": number
};


assert<
  Equals<
    ApiResponseTest1<never>,
    ApiResponseTest1Flat<never>
  >
>;
assert<
  Equals<
    ApiResponseTest3<never>,
    ApiResponseTest3Flat<never>
  >
>;
assert<
  Equals<
    ApiResponseTest4<never>,
    ApiResponseTest4Flat<never>
  >
>;
assert<
  Equals<
    ApiResponseTest5<never>,
    ApiResponseTest5Flat<never>
  >
>;
assert<
  Equals<
    ApiResponseTest6<never>,
    ApiResponseTest6Flat<never>
  >
>;
assert<
  Equals<
    ApiResponseTest7<never>,
    ApiResponseTest7Flat<never>
  >
>;
assert<
  Equals<
    ApiResponseTest8<never>,
    ApiResponseTest8Flat<never>
  >
>;
assert<
  Equals<
    ApiResponseTest9<never>,
    ApiResponseTest9Flat<never>
  >
>;
assert<
  Equals<
    ApiResponseTest11<never>,
    ApiResponseTest11Flat<never>
  >
>;
assert<
  Equals<
    ApiResponseTest13,
    ApiResponseTest13Flat
  >
>;
assert<
  Equals<
    ApiResponseTest14<never>,
    ApiResponseTest14Flat<never>
  >
>;
assert<
  Equals<
    ApiResponseTest15<never>,
    ApiResponseTest15Flat<never>
  >
>;
assert<
  Equals<
    ApiResponseTest16<never>,
    ApiResponseTest16Flat<never>
  >
>;
assert<
  Equals<
    ApiResponseTest21<never>,
    ApiResponseTest21Flat<never>
  >
>;
assert<
  Equals<
    ApiResponseTest22<never>,
    ApiResponseTest22Flat<never>
  >
>;
assert<
  Equals<
    ApiResponseTest2View,
    ApiResponseTest2ViewFlat
  >
>;
assert<
  Equals<
    ApiResponseTest10View,
    ApiResponseTest10ViewFlat
  >
>;
assert<
  Equals<
    ApiResponseTest12View,
    ApiResponseTest12ViewFlat
  >
>;
assert<
  Equals<
    ApiResponseTest17View,
    ApiResponseTest17ViewFlat
  >
>;
assert<
  Equals<
    ApiResponseTest18View,
    ApiResponseTest18ViewFlat
  >
>;
assert<
  Equals<
    ApiResponseTest19View,
    ApiResponseTest19ViewFlat
  >
>;
assert<
  Equals<
    ApiResponseTest20View,
    ApiResponseTest20ViewFlat
  >
>;
assert<
  Equals<
    ApiResponseTest23View,
    ApiResponseTest23ViewFlat
  >
>;
assert<
  Equals<
    ApiResponseTest24View,
    ApiResponseTest24ViewFlat
  >
>;
assert<
  Equals<
    ApiResponseTest25View,
    ApiResponseTest25ViewFlat
  >
>;
assert<
  Equals<
    ApiResponseTest18BaseView,
    ApiResponseTest18BaseViewFlat
  >
>;
assert<
  Equals<
    ApiResponseTest19BaseView,
    ApiResponseTest19BaseViewFlat
  >
>;
