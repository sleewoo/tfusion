import { format } from "node:util";

import { Project, SyntaxKind, type TypeNode } from "ts-morph";

import type { CycleParameters, HandlerQualifier } from "@/types";

/**
 * An in-memory project is relatively lightweight,
 * as long as the type checker is not invoked.
 *
 * To maintain performance, avoid calling the following:
 *  - getType()
 *  - getStructure()
 *  - getDescendants()
 *
 * Also avoid calling `project.getTypeChecker()`.
 */
const project = new Project({
  compilerOptions: {
    skipLibCheck: true,
    noResolve: true,
  },
  useInMemoryFileSystem: true,
});

export const handlerQualifier: HandlerQualifier = (
  { typeNode, typeParameters },
  { stripComments },
) => {
  return typeNode.isKind(SyntaxKind.IndexedAccessType)
    ? (next) => {
        const objTypeNode = typeNode.getObjectTypeNode();
        const idxTypeNode = typeNode.getIndexTypeNode();

        /**
         * Unfold the indexed-access syntax to reveal each underlying type explicitly.
         */
        const text = format(
          "(%s)[%s]",
          next({
            typeNode: objTypeNode,
            type: objTypeNode.getType(),
            typeParameters,
          }),
          next({
            typeNode: idxTypeNode,
            type: idxTypeNode.getType(),
            typeParameters,
          }),
        );

        /**
         * Create a temporary in-memory type alias synchronously.
         * Reusing the same source file minimizes overhead.
         */
        const virtualTypeAlias = project
          .createSourceFile("__.ts", `type __T = ${text}`, {
            overwrite: true,
          })
          .getTypeAlias("__T");

        const virtualTypeNode = virtualTypeAlias?.getTypeNode();

        if (!virtualTypeNode) {
          return text;
        }

        const [
          // The root type node and the list of subsequent index-nodes
          originTypeNode,
          indexTypeNodes,
        ] = flatIndexedAccessMapper(virtualTypeNode);

        if (!indexTypeNodes?.length) {
          return text;
        }

        const targetTypeNode = indexTypeNodes.reduce(
          flatIndexedAccessReducer(typeParameters),
          originTypeNode,
        );

        return stripComments
          ? targetTypeNode?.getText() || text
          : targetTypeNode?.getFullText() || text;
      }
    : undefined;
};

type FlatIndexedAccessMap =
  | [objTypeNode: TypeNode, idxTypeNodes: Array<TypeNode>]
  | [];

/**
 * Deconstructs a nested indexed-access chain into its base object and index sequence.
 *
 * Example:
 *   T["users"][number]["id"]
 *   → [ T, ["users", number, "id"] ]
 * */
const flatIndexedAccessMapper = (typeNode: TypeNode): FlatIndexedAccessMap => {
  const next = (
    typeNode: TypeNode,
    map: FlatIndexedAccessMap,
  ): FlatIndexedAccessMap => {
    if (typeNode.isKind(SyntaxKind.IndexedAccessType)) {
      map[0] = unwrapParenthesizedType(typeNode.getObjectTypeNode());
      map[1] = [typeNode.getIndexTypeNode(), ...(map[1] || [])];
      return next(map[0], map);
    }
    return map;
  };
  return next(unwrapParenthesizedType(typeNode), []);
};

const flatIndexedAccessReducer = (
  typeParameters: CycleParameters | undefined,
) => {
  return (
    objTypeNode: TypeNode | undefined,
    idxTypeNode: TypeNode,
  ): TypeNode | undefined => {
    if (!objTypeNode) {
      /**
       * previous step unresolved, stop processing
       * */
      return undefined;
    }

    if (idxTypeNode.isKind(SyntaxKind.NumberKeyword)) {
      /**
       * Handle numeric keyword indexing.
       *
       * Example:
       *   T[number]     ✅ NumberKeyword
       * */
      return resolveTargetType(objTypeNode, 0, typeParameters);
    }

    /**
     * Handle `StringLiteral` / `NumericLiteral` indexing.
     *
     * Example:
     *   T["id"]         ✅ StringLiteral
     *   T[10]           ✅ NumericLiteral
     * */
    if (idxTypeNode.isKind(SyntaxKind.LiteralType)) {
      const idxLiteral = idxTypeNode.getLiteral();
      if (
        idxLiteral.isKind(SyntaxKind.StringLiteral) ||
        idxLiteral.isKind(SyntaxKind.NumericLiteral)
      ) {
        return resolveTargetType(
          objTypeNode,
          idxLiteral.getLiteralValue(),
          typeParameters,
        );
      }
    }

    /**
     * Current index is of unsuported type.
     *
     * Example:
     *   T[SomeType]     ❌ type reference
     *   T["a" | "b"]    ❌ union
     *   T[any & K]      ❌ intersection
     *   T[keyof K]      ❌ type operator
     *   T[`_${K}`]      ❌ template literal
     *   etc.
     * */
    return undefined;
  };
};

const resolveTargetType = (
  objTypeNode: TypeNode,
  indexLiteral: string | number,
  typeParameters: CycleParameters | undefined,
): TypeNode | undefined => {
  const typeNode = unwrapParenthesizedType(objTypeNode);

  const next = (typeNode: TypeNode) => {
    return resolveTargetType(typeNode, indexLiteral, typeParameters);
  };

  if (typeNode.isKind(SyntaxKind.TypeReference)) {
    /**
     * Unwrap generic wrappers and recursively resolve the inner type.
     *
     * Handles constructs like:
     *   - Array<...>
     *   - ReadonlyArray<...>
     *   - Readonly<...>
     *   etc.
     * */
    const nextTypeNode = unwrapTypeReference(typeNode, typeParameters);
    return nextTypeNode //
      ? next(nextTypeNode)
      : undefined;
  }

  if (typeNode.isKind(SyntaxKind.ArrayType)) {
    /**
     * Handle array literal types such as:
     *   - `T[]`
     *   - `{ ... }[]`
     *   - `[ ... ][]`
     *   - `(...)[]`
     *
     * Only numeric indices are considered valid here.
     * While string keys like `"length"` or `"toString"` are technically valid on arrays,
     * those cases require deeper introspection into array internals and are out of scope.
     * */
    return typeof indexLiteral === "number"
      ? unwrapParenthesizedType(typeNode.getElementTypeNode())
      : undefined;
  }

  if (typeNode.isKind(SyntaxKind.TupleType)) {
    /**
     * Only numeric, non-negative literal indices are supported for tuple access:
     *
     *   type T = [A, B, C];
     *   T[0]          // ✅ A
     *   T[1]          // ✅ B
     *   T[-1]         // ❌ negative indices not supported
     *   T["1"]        // ❌ string indices not supported
     *   T[number]     // ❌ broad number-keyword index not supported
     */
    if (typeof indexLiteral !== "number" || indexLiteral < 0) {
      return undefined;
    }

    const element = typeNode.getElements()[indexLiteral];

    return element?.isKind(SyntaxKind.NamedTupleMember)
      ? element.getTypeNode()
      : element;
  }

  if (typeNode.isKind(SyntaxKind.TypeLiteral)) {
    /**
     * Handle type literals.
     *
     * Locate a matching property within a type literal by comparing against the resolved index key.
     *
     * For numeric literals, convert the property name (always a string) to a number for strict equality.
     * For string literals, match as-is.
     *
     * We match only regular property signatures by name.
     * This ignores:
     *   - methods
     *   - constructors
     *   - index signatures
     *   - template literal keys
     *
     * Side Note: This project assumes `exactOptionalPropertyTypes` semantics;
     *
     *   - Optional properties (e.g., `name?: string`) are treated strictly.
     *   - The property must be either `string` or omitted entirely.
     *   - `undefined` is not implicitly assignable unless explicitly included in the type.
     *
     * Example:
     *   type T = { name?: string; phone?: string | null }
     *   T["name"]  → string (rather than string | undefined)
     *   T["phone"] → string | null (rather than string | null | undefined)
     *
     * This matches how exactOptionalPropertyTypes behaves when enabled in tsconfig.
     * */
    const property = typeNode
      .getChildrenOfKind(SyntaxKind.PropertySignature)
      .find((e) => {
        const name =
          typeof indexLiteral === "number" //
            ? Number(e.getName())
            : e.getName();
        return name === indexLiteral;
      });

    return property?.getTypeNode();
  }

  if (typeNode.isKind(SyntaxKind.UnionType)) {
    /**
     * Handle union types by resolving each member independently.
     *
     * Example:
     *   type U = { a: string } | { a: number }
     *   export type T = U["a"]   → string | number
     *
     * Each union member is processed through the same resolution pipeline.
     * If any member fails to resolve, the entire union is considered unresolvable.
     * */
    const nodes = typeNode.getTypeNodes().map((node) => {
      const targetType = next(node);
      // returning node's text; later it will be rehidrated into a new TypeNode.
      // using getFullText to preserve comments.
      return targetType //
        ? targetType.getFullText()
        : undefined;
    });

    if (nodes.some((e) => e === undefined)) {
      // halt processing if any member failed to resolve
      return undefined;
    }

    /**
     * To pass the resolved union downstream, we must synthesize a new UnionType node.
     *
     * This is achieved by creating a temporary source file containing
     * a type alias that joins the resolved members as a union.
     * The resulting TypeNode is then extracted from the alias declaration.
     *
     * This avoids using the type checker and keeps processing lightweight.
     *
     * It is critical to wrap the union into ()
     * */
    const targetType = project
      .createSourceFile("__union.ts", `type __U = (${nodes.join(" | ")})`, {
        overwrite: true,
      })
      .getTypeAlias("__U");

    return targetType?.getTypeNode();
  }

  if (typeNode.isKind(SyntaxKind.IntersectionType)) {
    /**
     * Process intersection types by resolving each member from right to left.
     *
     * This reflects the standard structural behavior of intersections in TypeScript,
     * where properties defined later override those defined earlier:
     *
     *   type I = { b: string } & { a: number } & {}
     *   export type T = I["a"]   → number
     *
     * The resolution stops at the first successful extraction.
     * */
    return typeNode
      .getTypeNodes()
      .reverse()
      .reduce(
        (prev: TypeNode | undefined, node) => prev || next(node),
        undefined,
      );
  }

  return undefined;
};

/**
 * A set of well-known unary generic types that wrap another type.
 *
 * These are considered safe to unwrap syntactically (i.e. to access their single type argument),
 * even if their semantic meaning is not preserved without full type resolution.
 *
 * Examples:
 *   - `Array<T>`        → unwrap to T
 *   - `Readonly<T>`     → unwrap to T
 *   - `Uppercase<T>`    → unwrap to T (but do not evaluate)
 * */
const resolvableTypeReferences = new Set<string>([
  "Array",
  "ReadonlyArray",
  "Readonly",
  "Partial",
  "Required",
  "Promise",
  "Awaited",
  "Uppercase",
  "Lowercase",
  "Capitalize",
  "Uncapitalize",
]);

/**
 * Recursively unwraps well-known single-argument generic wrappers
 * (e.g., Array<T>, Promise<T>, Uppercase<T>) down to their inner type node.
 *
 * Will not unwrap:
 *   - Type parameters (e.g., `T`)
 *   - Unknown or multi-argument generics
 *   - Non-TypeReference nodes
 * */
const unwrapTypeReference = (
  originTypeNode: TypeNode | undefined,
  typeParameters: CycleParameters | undefined,
): TypeNode | undefined => {
  const typeNode = originTypeNode
    ? unwrapParenthesizedType(originTypeNode)
    : undefined;

  if (typeNode?.isKind(SyntaxKind.TypeReference)) {
    const typeName = typeNode.getTypeName().getText();

    if (!typeName) {
      /**
       * unknown type reference
       * */
      return undefined;
    }

    if (typeParameters?.[typeName]) {
      /**
       * give up if object type is a reference to a type parameter
       * */
      return undefined;
    }

    if (!resolvableTypeReferences.has(typeName)) {
      /**
       * not a resolvable type reference
       * */
      return undefined;
    }

    const [innerType] = typeNode.getTypeArguments();

    if (["Array", "ReadonlyArray"].includes(typeName)) {
      const typeAlias = project
        .createSourceFile(
          "__array.ts",
          // using getFullText to preserve comments.
          `type __A = (${innerType.getFullText()})[]`,
          { overwrite: true },
        )
        .getTypeAlias("__A");
      return unwrapTypeReference(typeAlias?.getTypeNode(), typeParameters);
    }

    return unwrapTypeReference(innerType, typeParameters);
  }

  return typeNode;
};

const unwrapParenthesizedType = (typeNode: TypeNode): TypeNode => {
  if (typeNode.isKind(SyntaxKind.ParenthesizedType)) {
    const [innerTypeNode] = typeNode.forEachChildAsArray();
    /**
     * Unwraps the inner type from a parenthesized type.
     *
     * While the inner node can technically be any kind,
     * we treat it as a TypeNode for simplicity -
     * invalid types (non-array, non-tuple, non-object) will be filtered later anyway.
     * */
    return unwrapParenthesizedType(innerTypeNode as TypeNode);
  }
  return typeNode;
};
