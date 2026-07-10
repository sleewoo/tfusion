import { format } from "node:util";

import { SyntaxKind, type TypeNode } from "ts-morph";

import type { HandlerQualifier } from "@/types";

export const handlerQualifier: HandlerQualifier = ({
  typeNode,
  typeParameters,
}) => {
  return typeNode.isKind(SyntaxKind.UnionType)
    ? (next) => {
        /**
         * type.getUnionTypes() is dropping undefined elements.
         * using typeNode.forEachChildAsArray() to get original user input.
         * */
        return format(
          "(%s)",
          typeNode
            .forEachChildAsArray()
            .map((typeNode) => {
              return format(
                "(%s)",
                next({
                  typeNode: typeNode as TypeNode,
                  get type() {
                    return typeNode.getType();
                  },
                  typeParameters,
                }),
              );
            })
            .join(" | "),
        );
      }
    : undefined;
};
