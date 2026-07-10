import { SyntaxKind, type TypeNode } from "ts-morph";

import type { HandlerQualifier } from "@/types";

export const handlerQualifier: HandlerQualifier = ({
  typeNode,
  typeParameters,
}) => {
  return typeNode.isKind(SyntaxKind.ParenthesizedType)
    ? (next) => {
        const [innerType] = typeNode.forEachChildAsArray();
        return next({
          typeNode: innerType as TypeNode,
          get type() {
            return innerType.getType();
          },
          typeParameters,
        });
      }
    : undefined;
};
