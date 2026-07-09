// @license MIT
// Contains AI-generated test patterns
// Cross-file declaration merge partner for api-responses.ts (global augmentation)

declare global {
  interface ApiResponseTest17 {
    checks: Record<
      string,
      {
        status: "pass" | "fail" | "warn";
        output?: string;
        duration: number;
      }
    >;
  }

  interface ApiResponseTest24 {
    acceptRanges: "bytes" | "none";
    contentLength: number;
    body: ArrayBuffer;
  }
}

export {};
