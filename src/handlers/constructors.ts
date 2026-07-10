import { format } from "node:util";

import { SyntaxKind } from "ts-morph";

import type { HandlerQualifier } from "@/types";
import { renderCallSignatureParameter, renderTypeParameter } from "@/utils";

export const handlerQualifier: HandlerQualifier = (
  { typeNode },
  { stripComments },
) => {
  return typeNode.isKind(SyntaxKind.ConstructorType)
    ? (next) => {
        const generics = typeNode
          .getChildrenOfKind(SyntaxKind.TypeParameter)
          .map((param) => renderTypeParameter(param, next).fullText);

        const parameters = typeNode
          .getChildrenOfKind(SyntaxKind.Parameter)
          .map((param) => renderCallSignatureParameter(param, next));

        const returnTypeNode = typeNode.getReturnTypeNode();

        return format(
          "new %s(%s) => %s",
          generics.length ? format("<%s>", generics.join(", ")) : "",
          parameters.join(", "),
          returnTypeNode
            ? next({
                typeNode: returnTypeNode,
                get type() {
                  return returnTypeNode.getType();
                },
              })
            : stripComments
              ? "unknown"
              : "unknown /** unknown return type */",
        );
      }
    : undefined;
};
