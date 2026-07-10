import { format } from "node:util";

import { SyntaxKind } from "ts-morph";

import type { HandlerQualifier } from "@/types";

export const handlerQualifier: HandlerQualifier = ({
  typeNode,
  typeParameters,
}) => {
  return typeNode.isKind(SyntaxKind.MappedType)
    ? (next) => {
        const mappedTypeParameter = typeNode.getTypeParameter();

        const mappedTypeConstraint = mappedTypeParameter.getConstraint();

        const mappedTypeNode = typeNode.getTypeNode();

        const nameTypeNode = typeNode.getNameTypeNode();

        const readonlyToken = typeNode.getReadonlyToken();
        const questionToken = typeNode.getQuestionToken();

        let preModifiers = "";
        let postModifiers = "";

        if (readonlyToken) {
          /**
           * readonlyToken.getText() returns "readonly" when no plus/minus token preceed.
           * and returns only the plus/minus token if it exists.
           * eg:
           * for `{ readonly [...] }` it returns "readonly"
           * for `{ +readonly [...] }` it returns "+"
           * for `{ -readonly [...] }` it returns "-"
           *
           * */
          preModifiers = format(
            "%sreadonly ",
            readonlyToken.getText().replace("readonly", ""),
          );
        }

        if (questionToken) {
          /**
           * extracting 3rd sibling (index 2) from mappedTypeNode,
           * it would be plus/minus token, if provided.
           * eg:
           * for `{ [...]?:  mappedTypeNode }` 3rd sibling would be "]"
           * for `{ [...]-?: mappedTypeNode }` 3rd sibling would be "-"
           * for `{ [...]+?: mappedTypeNode }` 3rd sibling would be "+"
           * */
          const thirdSibling = mappedTypeNode?.getPreviousSiblings()[2];
          if (thirdSibling?.isKind(SyntaxKind.MinusToken)) {
            postModifiers = "-?";
          } else if (thirdSibling?.isKind(SyntaxKind.PlusToken)) {
            postModifiers = "+?";
          } else {
            postModifiers = "?";
          }
        }

        return format(
          "{ %s[%s in %s%s]%s: %s }",
          preModifiers,
          mappedTypeParameter.getNameNode().getText(),
          mappedTypeConstraint
            ? next({
                typeNode: mappedTypeConstraint,
                get type() {
                  return mappedTypeConstraint.getType();
                },
                typeParameters,
              })
            : "unknown /** unresolved mapped type constraint */",
          nameTypeNode
            ? format(
                " as %s",
                next({
                  typeNode: nameTypeNode,
                  get type() {
                    return nameTypeNode.getType();
                  },
                  typeParameters,
                }),
              )
            : "",
          postModifiers,
          mappedTypeNode
            ? next({
                typeNode: mappedTypeNode,
                get type() {
                  return mappedTypeNode?.getType();
                },
                typeParameters,
              })
            : "unknown /** unresolved mapped type node */",
        );
      }
    : undefined;
};
