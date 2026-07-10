import { format } from "node:util";

import { SyntaxKind } from "ts-morph";

import type { HandlerQualifier } from "@/types";
import { indent } from "@/utils";

export const handlerQualifier: HandlerQualifier = (
  { typeNode, typeParameters },
  { stripComments },
) => {
  return typeNode.isKind(SyntaxKind.TupleType)
    ? (next) => {
        const elements = typeNode.getElements().map((element) => {
          const isOptional = element.isKind(SyntaxKind.OptionalType);
          let isRest = element.isKind(SyntaxKind.RestType);

          let name: string | undefined;
          let text: string;

          if (element.isKind(SyntaxKind.NamedTupleMember)) {
            name = element.hasQuestionToken()
              ? format("%s?", element.getName())
              : element.getName();

            const elementTypeNode = element.getTypeNode();

            text = next({
              typeNode: elementTypeNode,
              get type() {
                return elementTypeNode.getType();
              },
              typeParameters,
            });

            if (element.getFirstChildByKind(SyntaxKind.DotDotDotToken)) {
              isRest = true;
            }
          } else if (element.isKind(SyntaxKind.RestType)) {
            const parenthesizedType = element.getFirstChildByKind(
              SyntaxKind.ParenthesizedType,
            );
            if (parenthesizedType) {
              const innerTypeNode = parenthesizedType.getTypeNode();
              text = format(
                "(%s)",
                next({
                  typeNode: innerTypeNode,
                  get type() {
                    return innerTypeNode.getType();
                  },
                  typeParameters,
                }),
              );
            } else {
              const elementTypeNode = element.getTypeNode();
              text = next({
                typeNode: elementTypeNode,
                get type() {
                  return elementTypeNode.getType();
                },
                typeParameters,
              });
            }
          } else {
            text = next({
              typeNode: element,
              get type() {
                return element.getType();
              },
              typeParameters,
            });
          }

          if (!text) {
            text = stripComments
              ? "unknown"
              : "unknown /** unknown tuple element signature */";
          }

          if (isRest) {
            return name
              ? format("...%s: %s", name, text)
              : format("...%s", text);
          }

          return name
            ? format("%s: %s", name, text)
            : isOptional
              ? format("(%s)?", text)
              : text;
        });

        return format(
          elements.length ? "[\n%s\n]" : "[%s]",
          elements.map((e) => indent(e)).join(",\n"),
        );
      }
    : undefined;
};
