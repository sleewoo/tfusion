import { assert, type Equals } from "tsafe";

import type {
  ConfigurationTest3,
  ConfigurationTest8,
  ConfigurationTest10,
  ConfigurationTest24,
  ConfigurationTest1View,
  ConfigurationTest2View,
  ConfigurationTest4View,
  ConfigurationTest5View,
  ConfigurationTest6View,
  ConfigurationTest7View,
  ConfigurationTest9View,
  ConfigurationTest11View,
  ConfigurationTest12View,
  ConfigurationTest13View,
  ConfigurationTest14View,
  ConfigurationTest15View,
  ConfigurationTest16View,
  ConfigurationTest17View,
  ConfigurationTest18View,
  ConfigurationTest19View,
  ConfigurationTest20View,
  ConfigurationTest21View,
  ConfigurationTest22View,
  ConfigurationTest23View,
  ConfigurationTest25View,
  ConfigurationTest1BaseView,
  ConfigurationTest2BaseView,
  ConfigurationTest14BaseView,
  ConfigurationTest11BaseView,
} from "@/fixtures/interfaces/configuration.ts";

// 3. TypeORM database config
// @relaxed-assert
type ConfigurationTest3Flat = (({
  type: (("postgres") | ("mysql") | ("sqlite"));
  host: string;
  port: number;
  username: string;
  password: string;
  database: string;
  ssl?: boolean
}) & ({
  entities: {
    name: string;
    columns: {
      name: string;
      type: string;
      nullable: boolean;
      primary: boolean
    }[];
    relations: never[]
  }[];
  migrations: string[];
  logging: ((boolean) | (((("query") | ("error")))[]));
  synchronize: boolean
}));

// 8. Feature flag system
type ConfigurationTest8Flat<T extends string> = Record<T, {
  description: string;
  enabled: boolean;
  rollout?: number;
  constraints?: Record<string, unknown>
}>;

// 10. Auth providers config
type ConfigurationTest10Flat = Record<string, {
  clientId: string;
  clientSecret: string;
  callbackUrl: string;
  scopes?: string[]
}>;

// 24. Feature permission matrix
type ConfigurationTest24Flat = Record<string, {
  roles: string[];
  conditions?: Record<string, unknown>;
  override?: boolean
}>;

// view aliases
type ConfigurationTest1ViewFlat = {
  entry: ((string) | (string[]) | (Record<string, string>));
  output: {
    path: string;
    filename: string;
    publicPath?: string
  };
  module: {
    rules: {
      test: RegExp;
      use: string[];
      exclude?: RegExp[]
    }[]
  };
  plugins: {
    name: string;
    options?: Record<string, unknown>;
    enabled?: boolean
  }[];
  mode: (("development") | ("production"))
};

type ConfigurationTest2ViewFlat = {
  presets: Array<((string) | ([
    string,
    Record<string, unknown>
  ]))>;
  plugins: Array<((string) | ([
    string,
    symbol
  ]))>;
  env?: Record<string, unknown>;
  targets?: ((string) | (Record<string, string>))
};

type ConfigurationTest4ViewFlat = {
  coverage: {
    thresholds: {
      lines: number;
      functions: number;
      branches: number
    };
    exclude: string[]
  };
  setupFiles: string[];
  testMatch: string[];
  transform: Record<string, string>
};

type ConfigurationTest5ViewFlat = {
  extends: string[];
  plugins: string[];
  rules: Record<string, (("off") | ("warn") | ("error"))>;
  overrides: Array<{
    files: string[];
    rules: Record<string, unknown>
  }>
};

type ConfigurationTest6ViewFlat = {
  services: Record<string, {
    image: string;
    ports: string[];
    environment: Record<string, string>;
    volumes?: string[]
  }>;
  networks: Record<string, {
    driver: string
  }>;
  version: "3.8"
};

type ConfigurationTest7ViewFlat = {
  stages: string[];
  jobs: Record<string, {
    stage: string;
    script: string[];
    artifacts?: {
      paths: string[]
    };
    only?: {
      branches: string[]
    }
  }>
};

type ConfigurationTest9ViewFlat = {
  standardHeaders: boolean;
  legacyHeaders: boolean;
  skip: ((req: unknown) => boolean);
  windowMs: number;
  max: number
};

type ConfigurationTest11ViewFlat = {
  transports: Array<{
    type: (("console") | ("file") | ("http"));
    level: (("error") | ("warn") | ("info") | ("debug"));
    format: (("json") | ("text"))
  }>;
  redact: string[];
  sampling?: {
    rate: number
  }
};

type ConfigurationTest12ViewFlat = {
  metrics: {
    enabled: boolean;
    endpoint?: string;
    interval: number
  };
  alerts: Array<{
    condition: string;
    channels: string[];
    severity: (("critical") | ("warning"))
  }>
};

type ConfigurationTest13ViewFlat = {
  type: (("memory") | ("redis") | ("memcached"));
  clusters?: Array<{
    host: string;
    port: number
  }>;
  compression?: boolean;
  ttl: number;
  staleWhileRevalidate?: number
};

type ConfigurationTest14ViewFlat = {
  defaultLocale: string;
  locales: string[];
  loaders: Array<{
    pattern: string;
    format: (("json") | ("yaml") | ("po"))
  }>;
  fallback: Record<string, string>
};

type ConfigurationTest15ViewFlat = {
  colorSchemes: Record<string, {
    primary: string;
    secondary: string;
    text: string
  }>;
  spacing: {
    unit: number;
    multipliers: number[]
  };
  typography: Record<string, {
    fontSize: number;
    fontWeight: number
  }>
};

type ConfigurationTest16ViewFlat = {
  endpoints: Array<{
    path: string;
    method: (("GET") | ("POST") | ("PUT") | ("DELETE"));
    cache?: {
      ttl: number;
      headers: string[]
    };
    rateLimit?: {
      standardHeaders: boolean;
      legacyHeaders: boolean;
      skip: ((req: unknown) => boolean);
      windowMs: number;
      max: number
    }
  }>
};

type ConfigurationTest17ViewFlat = {
  csp: {
    directives: Record<string, string[]>
  };
  permissionsPolicy: Record<string, string[]>;
  cors: {
    origins: string[];
    methods: string[];
    headers: string[]
  }
};

type ConfigurationTest18ViewFlat = {
  driver: (("redis") | ("sqs") | ("rabbitmq"));
  queues: Record<string, {
    timeout: number;
    retries: number;
    dlq?: string;
    concurrency: number
  }>
};

type ConfigurationTest19ViewFlat = {
  buckets: Record<string, {
    driver: string;
    region?: string;
    credentials: {
      key: string;
      secret: string
    }
  }>;
  default: (("s3") | ("gcs") | ("local"))
};

type ConfigurationTest20ViewFlat = {
  routes: Array<{
    path: string;
    component: string;
    guards?: string[]
  }>;
  fallback: string
};

type ConfigurationTest21ViewFlat = {
  release: string;
  tracing: {
    sampleRate: number;
    tracesSampler: ((context: unknown) => number)
  };
  dsn: string;
  environment: (("production") | ("staging"))
};

type ConfigurationTest22ViewFlat = {
  targets: Record<string, {
    include: string[];
    exclude: string[];
    format: (("esm") | ("cjs") | ("umd"));
    minify?: boolean;
    sourcemap: boolean
  }>
};

type ConfigurationTest23ViewFlat = {
  schemas: Record<string, {
    type: (("object") | ("array"));
    fields: Record<string, {
      type: string;
      required: boolean;
      validate?: ((value: unknown) => boolean)
    }>
  }>
};

type ConfigurationTest25ViewFlat = {
  plugins: Array<{
    id: string;
    entryPoint: string;
    configSchema?:  Record<string, {
        type: (("object") | ("array"));
        fields: Record<string, {
          type: string;
          required: boolean;
          validate?: ((value: unknown) => boolean)
        }>
      }>;
    dependencies?: string[]
  }>;
  registry: Record<string, {
    version: string;
    enabled: boolean
  }>
};

type ConfigurationTest1BaseViewFlat = {
  entry: ((string) | (string[]) | (Record<string, string>));
  output: {
    path: string;
    filename: string;
    publicPath?: string
  }
};

type ConfigurationTest2BaseViewFlat = {
  presets: Array<((string) | ([
    string,
    Record<string, unknown>
  ]))>;
  plugins: Array<((string) | ([
    string,
    symbol
  ]))>
};

type ConfigurationTest14BaseViewFlat = {
  defaultLocale: string;
  locales: string[]
};

type ConfigurationTest11BaseViewFlat = {
  transports: Array<{
    type: (("console") | ("file") | ("http"));
    level: (("error") | ("warn") | ("info") | ("debug"));
    format: (("json") | ("text"))
  }>
};


assert<
    ConfigurationTest3Flat extends ConfigurationTest3
      ? ConfigurationTest3 extends ConfigurationTest3Flat ? true : false
      : false
>;
assert<
  Equals<
    ConfigurationTest8<never>,
    ConfigurationTest8Flat<never>
  >
>;
assert<
  Equals<
    ConfigurationTest10,
    ConfigurationTest10Flat
  >
>;
assert<
  Equals<
    ConfigurationTest24,
    ConfigurationTest24Flat
  >
>;
assert<
  Equals<
    ConfigurationTest1View,
    ConfigurationTest1ViewFlat
  >
>;
assert<
  Equals<
    ConfigurationTest2View,
    ConfigurationTest2ViewFlat
  >
>;
assert<
  Equals<
    ConfigurationTest4View,
    ConfigurationTest4ViewFlat
  >
>;
assert<
  Equals<
    ConfigurationTest5View,
    ConfigurationTest5ViewFlat
  >
>;
assert<
  Equals<
    ConfigurationTest6View,
    ConfigurationTest6ViewFlat
  >
>;
assert<
  Equals<
    ConfigurationTest7View,
    ConfigurationTest7ViewFlat
  >
>;
assert<
  Equals<
    ConfigurationTest9View,
    ConfigurationTest9ViewFlat
  >
>;
assert<
  Equals<
    ConfigurationTest11View,
    ConfigurationTest11ViewFlat
  >
>;
assert<
  Equals<
    ConfigurationTest12View,
    ConfigurationTest12ViewFlat
  >
>;
assert<
  Equals<
    ConfigurationTest13View,
    ConfigurationTest13ViewFlat
  >
>;
assert<
  Equals<
    ConfigurationTest14View,
    ConfigurationTest14ViewFlat
  >
>;
assert<
  Equals<
    ConfigurationTest15View,
    ConfigurationTest15ViewFlat
  >
>;
assert<
  Equals<
    ConfigurationTest16View,
    ConfigurationTest16ViewFlat
  >
>;
assert<
  Equals<
    ConfigurationTest17View,
    ConfigurationTest17ViewFlat
  >
>;
assert<
  Equals<
    ConfigurationTest18View,
    ConfigurationTest18ViewFlat
  >
>;
assert<
  Equals<
    ConfigurationTest19View,
    ConfigurationTest19ViewFlat
  >
>;
assert<
  Equals<
    ConfigurationTest20View,
    ConfigurationTest20ViewFlat
  >
>;
assert<
  Equals<
    ConfigurationTest21View,
    ConfigurationTest21ViewFlat
  >
>;
assert<
  Equals<
    ConfigurationTest22View,
    ConfigurationTest22ViewFlat
  >
>;
assert<
  Equals<
    ConfigurationTest23View,
    ConfigurationTest23ViewFlat
  >
>;
assert<
  Equals<
    ConfigurationTest25View,
    ConfigurationTest25ViewFlat
  >
>;
assert<
  Equals<
    ConfigurationTest1BaseView,
    ConfigurationTest1BaseViewFlat
  >
>;
assert<
  Equals<
    ConfigurationTest2BaseView,
    ConfigurationTest2BaseViewFlat
  >
>;
assert<
  Equals<
    ConfigurationTest14BaseView,
    ConfigurationTest14BaseViewFlat
  >
>;
assert<
  Equals<
    ConfigurationTest11BaseView,
    ConfigurationTest11BaseViewFlat
  >
>;
