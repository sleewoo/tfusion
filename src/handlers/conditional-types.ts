import { format } from "node:util";

import { SyntaxKind } from "ts-morph";

import type { HandlerQualifier } from "@/types";

export const handlerQualifier: HandlerQualifier = ({
  typeNode,
  typeParameters,
}) => {
  return typeNode.isKind(SyntaxKind.ConditionalType)
    ? (next) => {
        return format(
          "((%s) extends (%s) ? (%s) : (%s))",
          ...[
            typeNode.getCheckType(),
            typeNode.getExtendsType(),
            typeNode.getTrueType(),
            typeNode.getFalseType(),
          ].map((typeNode) => {
            return next({
              typeNode,
              get type() {
                return typeNode.getType();
              },
              typeParameters,
            });
          }),
        );
      }
    : undefined;
};
