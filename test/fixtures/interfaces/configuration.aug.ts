// @license MIT
// Contains AI-generated test patterns
// Cross-file declaration merge partner for configuration.ts (global augmentation)

declare global {
  interface ConfigurationTest13 {
    type: "memory" | "redis" | "memcached";
    clusters?: Array<{
      host: string;
      port: number;
    }>;
    compression?: boolean;
  }

  interface ConfigurationTest17 {
    csp: {
      directives: Record<string, string[]>;
    };
    permissionsPolicy: Record<string, string[]>;
  }

  interface ConfigurationTest19 {
    buckets: Record<
      string,
      {
        driver: string;
        region?: string;
        credentials: {
          key: string;
          secret: string;
        };
      }
    >;
  }

  interface ConfigurationTest21 {
    release: string;
    tracing: {
      sampleRate: number;
      tracesSampler: (context: unknown) => number;
    };
  }

  interface ConfigurationTest4 {
    coverage: {
      thresholds: {
        lines: number;
        functions: number;
        branches: number;
      };
      exclude: string[];
    };
    setupFiles: string[];
  }

  interface ConfigurationTest6 {
    services: Record<
      string,
      {
        image: string;
        ports: string[];
        environment: Record<string, string>;
        volumes?: string[];
      }
    >;
    networks: Record<string, { driver: string }>;
  }

  interface ConfigurationTest9 {
    standardHeaders: boolean;
    legacyHeaders: boolean;
    skip: (req: unknown) => boolean;
  }
}

export {};
