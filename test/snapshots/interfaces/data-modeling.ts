import { assert, type Equals } from "tsafe";

import type {
  DataModelingTest2,
  DataModelingTest3,
  DataModelingTest4,
  DataModelingTest5,
  DataModelingTest6,
  DataModelingTest7,
  DataModelingTest8,
  DataModelingTest11,
  DataModelingTest12,
  DataModelingTest14,
  DataModelingTest18,
  DataModelingTest19,
  DataModelingTest21,
  DataModelingTest1View,
  DataModelingTest9View,
  DataModelingTest10View,
  DataModelingTest13View,
  DataModelingTest15View,
  DataModelingTest16View,
  DataModelingTest17View,
  DataModelingTest20View,
  DataModelingTest22View,
  DataModelingTest23View,
  DataModelingTest24View,
  DataModelingTest25View,
  DataModelingTest25BaseView,
  DataModelingTest10BaseView,
  DataModelingTest17BaseView,
} from "@/fixtures/interfaces/data-modeling.ts";

// 2. Type-safe generic repository pattern
type DataModelingTest2Flat<T extends {
  name: string;
  columns: {
    name: string;
    type: string;
    nullable: boolean;
    primary: boolean
  }[];
  relations: never[]
}> = {
  metadata: T;
  find: ((criteria: Partial<(({ [K in (((T)["columns"])[number])["name"]]: never }) & ({ [K in (((T)["relations"])[number])["target"]]?: never }))>) => Promise<(({ [K in (((T)["columns"])[number])["name"]]: never }) & ({ [K in (((T)["relations"])[number])["target"]]?: never }))[]>);
  save: ((entity: (({ [K in (((T)["columns"])[number])["name"]]: never }) & ({ [K in (((T)["relations"])[number])["target"]]?: never }))) => Promise<void>)
};

// 3. Polymorphic product type
// @skip-assert
type DataModelingTest3Flat = (({
  sku: "";
  price: number;
  variants: {
    color: string
  }[]
}) & ({
  digitalAsset?: string;
  physicalDimensions?: {
    weight: number;
    height: number
  }
}));

// 4. TypeORM-style active record pattern
// @relaxed-assert
type DataModelingTest4Flat = (({
  id: string;
  save: (() => Promise<void>);
  remove: (() => Promise<void>);
  reload: (() => Promise<void>)
}) & ({
  id: string;
  name: string;
  email?: string;
  readonly createdAt: Date
}));

// 5. Zod-like schema definition
type DataModelingTest5Flat<T> = {
  _shape: T;
  parse: ((input: unknown) => T);
  safeParse: ((input: unknown) => (({
    success: true;
    data: T
  }) | ({
    success: false;
    error: {
      code: string;
      message: string;
      path: (((string) | (number)))[]
    }
  })))
};

// 6. Prisma-style filtered result
type DataModelingTest6Flat<T> = {
  where: Partial<T>;
  include?: { [K in keyof (T)]?: boolean };
  orderBy?: { [K in keyof (T)]?: (("asc") | ("desc")) }
};

// 7. MongoDB-style document structure
type DataModelingTest7Flat<T> = ((T) & ({
  _id: string;
  __v: number;
  createdAt: Date;
  updatedAt: Date
}));

// 8. GraphQL resolver type
// @skip-assert
type DataModelingTest8Flat<TArgs, TReturn> = {
  args: TArgs;
  context: {
    user?: {
      id: string;
      name: string;
      email?: string;
      readonly createdAt: Date
    };
    dataSources: {
      products: {
        sku: "";
        price: number;
        variants: {
          color: string
        }[]
      }[];
      users: {
        id: string;
        name: string;
        email?: string;
        readonly createdAt: Date
      }[]
    }
  };
  resolve: (() => TReturn)
};

// 11. JSON:API resource object
type DataModelingTest11Flat<T> = {
  type: string;
  id: string;
  attributes: T;
  relationships?: {
    [k: string]: {
      data: (({
        type: string;
        id: string
      }) | (Array<{
        type: string;
        id: string
      }>))
    }
  }
};

// 12. Kafka message schema
type DataModelingTest12Flat<T> = {
  key: string;
  value: T;
  headers: Record<string, string>;
  timestamp: number
};

// 14. Firebase Firestore document
type DataModelingTest14Flat<T> = ((T) & ({
  __firestore: {
    path: string;
    createTime: Date;
    updateTime: Date
  }
}));

// 18. Sequelize model definition
type DataModelingTest18Flat<T> = {
  define: ((modelName: string, attributes: {
    [k: string]: {
      type: (("STRING") | ("INTEGER") | ("DATE") | ("BOOLEAN"));
      allowNull?: boolean;
      primaryKey?: boolean
    }
  }) => {
    new (): T;
    findAll: ((options?: never) => Promise<T[]>)
  });
  associations: {
    [k: string]: {
      associationType: (("BelongsTo") | ("HasMany") | ("BelongsToMany"));
      target: {
        new (): never;
        findAll: ((options?: never) => Promise<never[]>)
      }
    }
  }
};

// 19. JWT payload structure
// @relaxed-assert
type DataModelingTest19Flat = (({
  id: string;
  name: string;
  email?: string;
  readonly createdAt: Date
}) & ({
  iat: number;
  exp: number;
  aud: string;
  iss: string;
  sub: string
}));

// 21. Data transfer object (DTO)
type DataModelingTest21Flat = ((Omit<{
  id: string;
  name: string;
  email?: string;
  readonly createdAt: Date
}, (("createdAt") | ("updatedAt"))>) & ({
  passwordHash: string;
  lastLogin?: Date
}));

// view aliases
type DataModelingTest1ViewFlat = {
  id: string;
  createdAt: Date;
  updatedAt?: Date
};

type DataModelingTest9ViewFlat = {
  settings: {
    numberOfShards: number;
    numberOfReplicas: number
  };
  mappings: {
    properties: {
      [k: string]: {
        type: (("text") | ("keyword") | ("long") | ("date"));
        index?: boolean;
        analyzer?: string
      }
    }
  }
};

type DataModelingTest10ViewFlat = {
  key: string;
  fields: Record<string, ((string) | (number))>;
  ttl?: number
};

type DataModelingTest13ViewFlat = {
  required: string[];
  properties: {
    [k: string]: {
      type: (("string") | ("number") | ("boolean") | ("object"));
      format?: (("date-time") | ("email") | ("uri"));
      enum?: string[]
    }
  };
  type: "object"
};

type DataModelingTest15ViewFlat = {
  fields: {
    [k: string]: {
      type: (("string") | ("int32") | ("double") | ("bool") | ("message"));
      repeated?: boolean;
      optional?: boolean
    }
  }
};

type DataModelingTest16ViewFlat = {
  header: string[];
  rows: Array<Record<string, string>>;
  errors: Array<{
    row: number;
    message: string
  }>
};

type DataModelingTest17ViewFlat = {
  up: ((queryRunner: {
    query: ((sql: string, parameters?: unknown[]) => Promise<void>)
  }) => Promise<void>);
  down: ((queryRunner: {
    query: ((sql: string, parameters?: unknown[]) => Promise<void>)
  }) => Promise<void>);
  timestamp: number
};

type DataModelingTest20ViewFlat = {
  object: string[];
  conditions: {
    [k: string]: never
  };
  subject: string[];
  action: string[]
};

type DataModelingTest22ViewFlat = {
  score: number;
  member: string
};

type DataModelingTest23ViewFlat = {
  aggs?: {
    [k: string]: {
      terms?: {
        field: string
      };
      avg?: {
        field: string
      }
    }
  };
  query: {
    bool: {
      must?: Array<{
        match?: {
          [k: string]: never
        }
      }>;
      filter?: Array<{
        range?: {
          [k: string]: never
        }
      }>
    }
  }
};

type DataModelingTest24ViewFlat = {
  "xmlns:xsd": "http://www.w3.org/2001/XMLSchema";
  "xmlns:xsi": "http://www.w3.org/2001/XMLSchema-instance";
  "#content": Array<{
    "@_name": string;
    "#text": string
  }>
};

type DataModelingTest25ViewFlat = {
  path: (((string) | (number)))[];
  message: string;
  code: (("invalid_type") | ("custom") | ("too_small"));
  expected?: string;
  received?: string
};

type DataModelingTest25BaseViewFlat = {
  path: (((string) | (number)))[];
  message: string
};

type DataModelingTest10BaseViewFlat = {
  key: string
};

type DataModelingTest17BaseViewFlat = {
  up: ((queryRunner: {
    query: ((sql: string, parameters?: unknown[]) => Promise<void>)
  }) => Promise<void>)
};


assert<
  Equals<
    DataModelingTest2<never>,
    DataModelingTest2Flat<never>
  >
>;
assert<
    DataModelingTest4Flat extends DataModelingTest4
      ? DataModelingTest4 extends DataModelingTest4Flat ? true : false
      : false
>;
assert<
  Equals<
    DataModelingTest5<never>,
    DataModelingTest5Flat<never>
  >
>;
assert<
  Equals<
    DataModelingTest6<never>,
    DataModelingTest6Flat<never>
  >
>;
assert<
  Equals<
    DataModelingTest7<never>,
    DataModelingTest7Flat<never>
  >
>;
assert<
  Equals<
    DataModelingTest11<never>,
    DataModelingTest11Flat<never>
  >
>;
assert<
  Equals<
    DataModelingTest12<never>,
    DataModelingTest12Flat<never>
  >
>;
assert<
  Equals<
    DataModelingTest14<never>,
    DataModelingTest14Flat<never>
  >
>;
assert<
  Equals<
    DataModelingTest18<never>,
    DataModelingTest18Flat<never>
  >
>;
assert<
    DataModelingTest19Flat extends DataModelingTest19
      ? DataModelingTest19 extends DataModelingTest19Flat ? true : false
      : false
>;
assert<
  Equals<
    DataModelingTest21,
    DataModelingTest21Flat
  >
>;
assert<
  Equals<
    DataModelingTest1View,
    DataModelingTest1ViewFlat
  >
>;
assert<
  Equals<
    DataModelingTest9View,
    DataModelingTest9ViewFlat
  >
>;
assert<
  Equals<
    DataModelingTest10View,
    DataModelingTest10ViewFlat
  >
>;
assert<
  Equals<
    DataModelingTest13View,
    DataModelingTest13ViewFlat
  >
>;
assert<
  Equals<
    DataModelingTest15View,
    DataModelingTest15ViewFlat
  >
>;
assert<
  Equals<
    DataModelingTest16View,
    DataModelingTest16ViewFlat
  >
>;
assert<
  Equals<
    DataModelingTest17View,
    DataModelingTest17ViewFlat
  >
>;
assert<
  Equals<
    DataModelingTest20View,
    DataModelingTest20ViewFlat
  >
>;
assert<
  Equals<
    DataModelingTest22View,
    DataModelingTest22ViewFlat
  >
>;
assert<
  Equals<
    DataModelingTest23View,
    DataModelingTest23ViewFlat
  >
>;
assert<
  Equals<
    DataModelingTest24View,
    DataModelingTest24ViewFlat
  >
>;
assert<
  Equals<
    DataModelingTest25View,
    DataModelingTest25ViewFlat
  >
>;
assert<
  Equals<
    DataModelingTest25BaseView,
    DataModelingTest25BaseViewFlat
  >
>;
assert<
  Equals<
    DataModelingTest10BaseView,
    DataModelingTest10BaseViewFlat
  >
>;
assert<
  Equals<
    DataModelingTest17BaseView,
    DataModelingTest17BaseViewFlat
  >
>;
