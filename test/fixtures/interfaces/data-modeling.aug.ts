// @license MIT
// Contains AI-generated test patterns
// Cross-file declaration merge partner for data-modeling.ts (global augmentation)

declare global {
  interface DataModelingTest13 {
    required: string[];
    properties: {
      [key: string]: {
        type: "string" | "number" | "boolean" | "object";
        format?: "date-time" | "email" | "uri";
        enum?: string[];
      };
    };
  }

  interface DataModelingTest20 {
    object: string[];
    conditions: {
      [key: string]: never;
    };
  }

  interface DataModelingTest23 {
    aggs?: {
      [key: string]: {
        terms?: { field: string };
        avg?: { field: string };
      };
    };
  }

  interface DataModelingTest9 {
    settings: {
      numberOfShards: number;
      numberOfReplicas: number;
    };
  }
}

export {};
