import { format } from "node:util";

import { SyntaxKind, type TypeNode } from "ts-morph";

import type { HandlerQualifier } from "@/types";

export const handlerQualifier: HandlerQualifier = ({ typeNode }) => {
  return typeNode.isKind(SyntaxKind.TemplateLiteralType)
    ? (next) => {
        const head = typeNode.getHead().getText();
        const tail = typeNode.getTemplateSpans().map((span) => {
          return span
            .getChildren()
            .map((e) => {
              return [
                SyntaxKind.TemplateMiddle,
                SyntaxKind.TemplateTail,
              ].includes(e.getKind())
                ? e.getText()
                : next({
                    typeNode: e as TypeNode,
                    get type() {
                      return e.getType();
                    },
                  });
            })
            .join("");
        });
        return format("%s%s", head, tail.join(""));
      }
    : undefined;
};
