import type { SyntaxKind, Type, TypeNode } from "ts-morph";

export type CycleParameters = Record<string, string | undefined>;

export type CycleData = {
  typeNode: TypeNode;
  type: Type;
  typeParameters?: CycleParameters | undefined;
};

export type CycleSignature = (
  data: CycleData,
  opts: UserOptions,
  step?: number,
) => string;

export type Next = (data: CycleData) => string;

export type Handler = (next: Next) => string;

export type HandlerQualifier = (
  data: CycleData,
  opts: UserOptions,
) => Handler | undefined;

export type Formatter = (text: string, filePath: string) => string;

export type UserOptions = {
  /**
   * by default all exported types will be processed.
   * use this filter to only process specific types.
   * */
  typesFilter?: (typeName: string) => boolean;

  /**
   * a map of types to override default name for.
   *
   * eg. you have a CustomPromise type that should be rendered as native Promise:
   *    import { CustomPromise } from "@/lib";
   *    export type ResponseHandler = () => CustomPromise<...>
   *
   * then add CustomPromise to `overrides`:
   *    overrides: {
   *      CustomPromise: "Promise",
   *    }
   *
   * and the flattened result will be:
   *    export type ResponseHandler = () => Promise<...>
   * */
  overrides?: Record<string, string>;

  /**
   * limit recursion to this level depth.
   * @default: 16
   * */
  maxDepth?: number;

  /**
   * If enabled, removes all comments from the generated output.
   * Useful for producing clean, minimal artifacts.
   * @default false
   * */
  stripComments?: boolean;

  /**
   * Controls property resolution behavior for type literals.
   * - When `true`: Resolves properties for ALL type literals encountered
   * - When `string[]`: Resolves properties ONLY for type literals matching the specified names
   * - When `false`: Skips property resolution entirely (default behavior)
   * */
  withProperties?: boolean | Array<string>;

  /**
   * An array of formatters to apply on resolved types.
   * */
  formatters?: Array<Formatter>;
};

export type ResolvedType = {
  kind: keyof typeof SyntaxKind;

  /**
   * The name of the type, identical to the exported alias in the original file.
   * */
  name: string;

  /**
   * Type parameters declared on the original type, if any.
   *
   * Example:
   *   export type Entry<T, R = string> = { ... }
   * Will produce:
   *   [
   *     { name: "T", text: "T" },
   *     { name: "R", text: "R = string" }
   *   ]
   * */
  parameters: Array<{ name: string; text: string; fullText: string }>;

  /**
   * Any single-line or multi-line comments
   * that immediately precede the original type declaration.
   * */
  comments: Array<string>;

  /**
   * The flattened type body (object literal only), without name or parameters.
   * */
  text: string;

  /**
   * For type literals, an array of properties.
   * */
  properties?: Array<{
    name: string;
    text: string;
    optional: boolean;
    readonly: boolean;
  }>;
};
