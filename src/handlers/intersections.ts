import { format } from "node:util";

import { SyntaxKind, type TypeNode } from "ts-morph";

import type { HandlerQualifier } from "@/types";

export const handlerQualifier: HandlerQualifier = ({
  typeNode,
  typeParameters,
}) => {
  return typeNode.isKind(SyntaxKind.IntersectionType)
    ? (next) => {
        /**
         * type.getIntersectionTypes() is converting whole type to undefined
         * if it contains an undefined element.
         * using typeNode.forEachChildAsArray() to get original user input.
         * */
        return format(
          "(%s)",
          typeNode
            .forEachChildAsArray()
            .map((intersectionTypeNode) => {
              return format(
                "(%s)",
                next({
                  typeNode: intersectionTypeNode as TypeNode,
                  get type() {
                    return intersectionTypeNode.getType();
                  },
                  typeParameters,
                }),
              );
            })
            .join(" & "),
        );
      }
    : undefined;
};
