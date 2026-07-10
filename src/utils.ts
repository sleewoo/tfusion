import { format } from "node:util";

import {
  type CallSignatureDeclaration,
  type InterfaceDeclaration,
  type LiteralTypeNode,
  type MethodDeclaration,
  type ParameterDeclaration,
  type PrefixUnaryExpression,
  Project,
  type PropertyName,
  type Signature,
  SyntaxKind,
  type TypeNode,
  type TypeParameterDeclaration,
} from "ts-morph";

import type { Next, ResolvedType } from "./types";

/**
 * Extracts a comparable property name from a PropertySignature node.
 *
 * - Identifier - returned as-is (`id` -> `id`)
 * - String / numeric literal - normalized via getLiteralText(): quotes stripped
 *   and numerics canonicalized, matching the runtime object key
 *     `"first-name"` -> `first-name`
 *     `0x10` -> `16`
 * - Anything else (computed names, bigint literals, ...) - returned as is
 *   i.e. the raw source text (`[sym]`, `1n`). For computed names this
 *   is the bracketed expression, not a resolved key.
 *
 * @param prop The PropertySignature node to extract the name from.
 * @returns A string representing the property name
 * */
export const getLiteralPropName = (nameNode: PropertyName): string => {
  return nameNode.isKind(SyntaxKind.StringLiteral) ||
    nameNode.isKind(SyntaxKind.NumericLiteral)
    ? nameNode.getLiteralText()
    : nameNode.getText();
};

export const renderTypeParameter = (
  param: TypeParameterDeclaration,
  next: Next,
): ResolvedType["parameters"][number] => {
  const name = param.getName();

  const constraint = param.getConstraint();
  const defaultParam = param.getDefault();

  if (constraint && defaultParam) {
    const text = next({
      typeNode: defaultParam,
      get type() {
        return defaultParam.getType();
      },
    });
    return {
      name,
      text,
      fullText: format(
        "%s extends %s = %s",
        name,
        next({
          typeNode: constraint,
          get type() {
            return constraint.getType();
          },
        }),
        text,
      ),
    };
  }

  if (constraint) {
    const text = next({
      typeNode: constraint,
      get type() {
        return constraint.getType();
      },
    });
    return {
      name,
      text,
      fullText: `${name} extends ${text}`,
    };
  }

  if (defaultParam) {
    const text = next({
      typeNode: defaultParam,
      get type() {
        return defaultParam.getType();
      },
    });
    return {
      name,
      text,
      fullText: `${name} = ${text}`,
    };
  }

  return {
    name,
    text: name,
    fullText: name,
  };
};

export const renderCallSignatureAssets = (signature: Signature, next: Next) => {
  const declaration = signature.getDeclaration() as
    | CallSignatureDeclaration
    | MethodDeclaration;

  const generics = declaration
    .getTypeParameters()
    .map((param) => renderTypeParameter(param, next).fullText);

  const parameters = declaration
    .getChildrenOfKind(SyntaxKind.Parameter)
    .map((param) => renderCallSignatureParameter(param, next));

  const returnTypeNode = declaration.getReturnTypeNode();

  let returnType = "unknown";

  if (returnTypeNode?.isKind(SyntaxKind.TypePredicate)) {
    const predicateTypeNode = returnTypeNode.getTypeNode();
    returnType = format(
      returnTypeNode.getAssertsModifier() //
        ? "asserts %s is %s"
        : "%s is %s",
      returnTypeNode.getParameterNameNode().getText(),
      predicateTypeNode
        ? next({
            typeNode: predicateTypeNode,
            get type() {
              return predicateTypeNode.getType();
            },
          })
        : "unknown",
    );
  } else if (returnTypeNode) {
    returnType = next({
      typeNode: returnTypeNode,
      get type() {
        return returnTypeNode.getType();
      },
    });
  }

  return {
    generics,
    parameters,
    returnType,
  };
};

export const renderCallSignatureParameter = (
  param: ParameterDeclaration,
  next: Next,
) => {
  const paramTypeNode = param.getTypeNode();

  const value = paramTypeNode
    ? next({
        typeNode: paramTypeNode,
        get type() {
          return paramTypeNode.getType();
        },
      })
    : "unknown";

  return param.isRestParameter()
    ? format("...%s: %s", param.getName(), value)
    : format(
        "%s%s: %s",
        param.getName(),
        param.hasQuestionToken() ? "?" : "",
        value,
      );
};

export const indent = (hunk: string, level = 1) => {
  return hunk.replace(/^/gm, " ".repeat(level * 2));
};

/**
 * determines if a TypeNode is a primitive or literal value.
 *
 * Covers:
 * - Keyword primitives: string, number, boolean, bigint, symbol, undefined, null,
 *   any, unknown, void, never
 * - Literal types: string literals, numeric literals, boolean literals (true/false)
 * - Negative numbers: -123, -1.5
 * */
/**
 * Renders a primitive keyword or literal type node without touching
 * the type checker. Matches checker output (type.getText) for the
 * primitive/literal surface: numeric and bigint literals are printed
 * in their canonical form (the parser stores the normalized value
 * in compilerNode.text, e.g. 0x1a3f -> "6719"), everything else is
 * emitted as written.
 * */
export const renderPrimitiveOrLiteral = (node: TypeNode): string => {
  if (node.isKind(SyntaxKind.LiteralType)) {
    const literalNode = node.getLiteral();
    if (literalNode.isKind(SyntaxKind.NumericLiteral)) {
      return literalNode.compilerNode.text;
    }
    if (literalNode.isKind(SyntaxKind.BigIntLiteral)) {
      return literalNode.compilerNode.text;
    }
  }
  return node.getText();
};

export const isPrimitiveOrLiteral = (node: TypeNode): boolean => {
  const text = node.getText();

  // Check primitive types by text (most reliable)
  const primitiveTexts = [
    "string",
    "number",
    "boolean",
    "bigint",
    "symbol",
    "undefined",
    "null",
    "any",
    "unknown",
    "void",
    "never",
  ];

  if (primitiveTexts.includes(text)) {
    return true;
  }

  const kind = node.getKind();

  // Also check by kind as fallback
  const primitiveKinds = [
    SyntaxKind.StringKeyword,
    SyntaxKind.NumberKeyword,
    SyntaxKind.BooleanKeyword,
    SyntaxKind.BigIntKeyword,
    SyntaxKind.SymbolKeyword,
    SyntaxKind.UndefinedKeyword,
    SyntaxKind.NullKeyword,
    SyntaxKind.AnyKeyword,
    SyntaxKind.UnknownKeyword,
    SyntaxKind.VoidKeyword,
    SyntaxKind.NeverKeyword,
  ];

  if (primitiveKinds.includes(kind)) {
    return true;
  }

  // Handle literal types
  if (kind === SyntaxKind.LiteralType) {
    const literalNode = (node as LiteralTypeNode).getLiteral();
    const literalKind = literalNode.getKind();

    // string / numeric / bigint literals
    if (
      [
        SyntaxKind.StringLiteral,
        SyntaxKind.NumericLiteral,
        SyntaxKind.BigIntLiteral,
      ].includes(literalKind)
    ) {
      return true;
    }

    // boolean literals
    if (
      [SyntaxKind.TrueKeyword, SyntaxKind.FalseKeyword].includes(literalKind)
    ) {
      return true;
    }

    // negative numbers: -123, -1.5
    if (literalKind === SyntaxKind.PrefixUnaryExpression) {
      const expr = literalNode as PrefixUnaryExpression;
      if (
        expr.getOperatorToken() === SyntaxKind.MinusToken &&
        expr.getOperand().getKind() === SyntaxKind.NumericLiteral
      ) {
        return true;
      }
    }

    return false;
  }

  return false;
};

/**
 * Renders an interface declaration as an inline object-literal body.
 *
 * tfusion resolves named type references by inlining their declaration. Type
 * aliases expose a single TypeNode that the traversal recurses into directly;
 * interfaces do not, so their members are rendered here instead.
 *
 * Coverage:
 * - own and merged members (multiple `interface X {}` blocks) - ts-morph's
 *   `getProperties()`/`getMethods()`/etc. already flatten declaration merging.
 * - inherited members via `extends`, walked through `getBaseDeclarations()`.
 *   A derived member shadows an inherited one of the same name (nearest wins).
 *
 * Each member's type node is fed back through `next()`, so nested references
 * (aliases, other interfaces, arrays, unions) flatten with the same rules as
 * the rest of the traversal.
 *
 * Not covered (callers should keep the unresolved fallthrough for these):
 * - generic interfaces whose members depend on type parameters; the parameter
 *   map is not threaded here, so `resolveInterfaceMembers` returns undefined
 *   when the interface (or any base) declares type parameters, letting the
 *   caller emit the bare name rather than a wrong inlining.
 * */

type RenderedMember = {
  name: string;
  text: string;
  optional: boolean;
  readonly: boolean;
  comments: Array<string>;
};

const collectInterfaceMembers = (
  iface: InterfaceDeclaration,
  next: Next,
  stripComments: boolean,
  seen: Map<string, RenderedMember>,
  visited: Set<string>,
): boolean => {
  // bail on generics - member types may depend on type parameters
  // that are not threaded through here (see doc note above).
  if (iface.getTypeParameters().length) {
    return false;
  }

  // A merged interface has several declarations; getProperties() is
  // per-declaration, so gather every declaration. Different symbol accessors
  // expose different subsets: the reference-site symbol can miss `declare
  // global` augmentations spread across files, while the name-node symbol can
  // miss same-module re-opens seen through an import. Union both to be safe.
  const declarationSet = new Set<InterfaceDeclaration>();

  for (const symbol of [iface.getSymbol(), iface.getNameNode().getSymbol()]) {
    if (!symbol) {
      continue;
    }
    for (const declaration of symbol.getDeclarations()) {
      if (declaration.isKind(SyntaxKind.InterfaceDeclaration)) {
        declarationSet.add(declaration);
      }
    }
  }

  const declarations = declarationSet.size ? [...declarationSet] : [iface];

  const ifaceId = [
    //
    iface.getSourceFile().getFilePath(),
    iface.getName(),
  ].join("#");

  if (visited.has(ifaceId)) {
    return true;
  }

  visited.add(ifaceId);

  // inherited first, so own/derived members overwrite same-named ones
  for (const declaration of declarations) {
    for (const base of declaration.getBaseDeclarations()) {
      if (!base.isKind(SyntaxKind.InterfaceDeclaration)) {
        // extends something that is not a plain interface (e.g. a mapped or
        // generic type) - cannot render reliably, signal unresolved.
        return false;
      }
      if (!collectInterfaceMembers(base, next, stripComments, seen, visited)) {
        return false;
      }
    }
  }

  for (const declaration of declarations) {
    // method and construct/call signatures are not rendered; interfaces used
    // for validation payloads are data shapes. If any are present, signal
    // unresolved rather than silently dropping them.
    if (
      declaration.getMethods().length ||
      declaration.getConstructSignatures().length ||
      declaration.getCallSignatures().length
    ) {
      return false;
    }

    for (const prop of declaration.getProperties()) {
      const name = prop.getName();
      const typeNode = prop.getTypeNode();

      const text = typeNode
        ? next({
            typeNode,
            get type() {
              return typeNode.getType();
            },
            typeParameters: undefined,
          })
        : stripComments
          ? "unknown"
          : "unknown /** unresolved property signature */";

      seen.set(name, {
        name,
        text,
        optional: prop.hasQuestionToken(),
        readonly: prop.isReadonly(),
        comments: stripComments
          ? []
          : prop.getLeadingCommentRanges().map((e) => e.getText().trim()),
      });
    }

    // index signatures (own only; merging/inheritance of these is rare and
    // ts-morph does not dedupe them by a stable key).
    for (const signature of declaration.getIndexSignatures()) {
      const keyTypeNode = signature.getKeyTypeNode();
      const returnTypeNode = signature.getReturnTypeNode();

      const returnText = returnTypeNode
        ? next({
            typeNode: returnTypeNode,
            get type() {
              return returnTypeNode.getType();
            },
            typeParameters: undefined,
          })
        : stripComments
          ? "unknown"
          : "unknown /** unresolved */";

      seen.set(`[index:${keyTypeNode.getText()}]`, {
        name: format("[k: %s]", keyTypeNode.getText()),
        text: returnText,
        optional: false,
        readonly: false,
        comments: [],
      });
    }
  }

  return true;
};

export const resolveInterfaceMembers = (
  iface: InterfaceDeclaration,
  next: Next,
  stripComments: boolean,
): string | undefined => {
  const seen = new Map<string, RenderedMember>();

  const ok = collectInterfaceMembers(
    iface,
    next,
    stripComments,
    seen,
    new Set(),
  );

  if (!ok) {
    return undefined;
  }

  const hunks: Array<string> = [];

  for (const { name, text, optional, readonly, comments } of seen.values()) {
    hunks.push(
      [
        ...comments,
        format(
          "%s%s%s: %s",
          readonly ? "readonly " : "",
          name,
          optional ? "?" : "",
          text,
        ),
      ].join("\n"),
    );
  }

  return format(
    hunks.length ? "{\n%s\n}" : "{%s}",
    hunks.map((e) => indent(e)).join(";\n"),
  );
};

export const createScratchProject = () => {
  return new Project({
    compilerOptions: {
      skipLibCheck: true,
      noResolve: true,
    },
    useInMemoryFileSystem: true,
  });
};
