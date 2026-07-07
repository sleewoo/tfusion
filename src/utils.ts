import { format } from "node:util";

import {
  type CallSignatureDeclaration,
  type LiteralTypeNode,
  type MethodDeclaration,
  type ParameterDeclaration,
  type PrefixUnaryExpression,
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
    const text = next({ typeNode: defaultParam, type: defaultParam.getType() });
    return {
      name,
      text,
      fullText: format(
        "%s extends %s = %s",
        name,
        next({ typeNode: constraint, type: constraint.getType() }),
        text,
      ),
    };
  }

  if (constraint) {
    const text = next({ typeNode: constraint, type: constraint.getType() });
    return {
      name,
      text,
      fullText: `${name} extends ${text}`,
    };
  }

  if (defaultParam) {
    const text = next({ typeNode: defaultParam, type: defaultParam.getType() });
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
            type: predicateTypeNode.getType(),
          })
        : "unknown",
    );
  } else if (returnTypeNode) {
    returnType = next({
      typeNode: returnTypeNode,
      type: returnTypeNode.getType(),
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
        type: paramTypeNode.getType(),
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
