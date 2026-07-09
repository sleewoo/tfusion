import { format } from "node:util";

import { SyntaxKind } from "ts-morph";

import type { HandlerQualifier } from "@/types";
import { indent, renderCallSignatureAssets } from "@/utils";

export const handlerQualifier: HandlerQualifier = (
  { typeNode, type, typeParameters },
  { stripComments },
) => {
  return typeNode.isKind(SyntaxKind.TypeLiteral)
    ? (next) => {
        /**
         * collecting regular index signatures, without comments:
         *    Record<string, ...>
         *    { [key: string]: ... }
         *    Record<number, ...>
         *    { [key: number]: ... }
         * and template index signatures, also without comments:
         *     Record<`some_${string}`, ...>
         *     { [key: `some_${string}`]: ... }
         * */
        const indexSignatures = typeNode
          .getIndexSignatures()
          .flatMap((signature) => {
            const keyTypeNode = signature.getKeyTypeNode();
            const returnTypeNode = signature.getReturnTypeNode();
            return [
              {
                key: keyTypeNode.getText(),
                returnType: returnTypeNode
                  ? next({
                      typeNode: returnTypeNode,
                      type: returnTypeNode.getType(),
                      typeParameters,
                    })
                  : stripComments
                    ? "unknown"
                    : "unknown /** unresolved */",
              },
            ];
          });

        /**
         * collecting construct signatures, without comments:
         *    export type Constructable = {
         *      new (...): ...;
         *    }
         * */
        const constructSignatures = type
          .getConstructSignatures()
          .map((signature) => {
            return renderCallSignatureAssets(signature, (data) => {
              return next({ ...data, typeParameters });
            });
          });

        /**
         * collecting method signatures, with comments
         *    export type ObjectWithMethods = {
         *      calculate(...): ...;
         *    }
         * */
        const methodSignatures = typeNode
          .getChildrenOfKind(SyntaxKind.MethodSignature)
          .flatMap((methodSignature) => {
            const name = methodSignature.getName();
            const comments = stripComments
              ? []
              : methodSignature
                  .getLeadingCommentRanges()
                  .map((e) => e.getText().trim());
            return methodSignature
              .getType()
              .getCallSignatures()
              .map((signature) => {
                const { generics, parameters, returnType } =
                  renderCallSignatureAssets(signature, (data) => {
                    return next({ ...data, typeParameters });
                  });
                return {
                  name,
                  comments,
                  generics,
                  parameters,
                  returnType,
                };
              });
          });

        /**
         * collecting regular properties, with comments
         * */
        const propertySignatures = typeNode
          .getChildrenOfKind(SyntaxKind.PropertySignature)
          .map((propertySignature) => {
            const propertyTypeNode = propertySignature.getTypeNode();
            return {
              name: format(
                "%s%s%s",
                propertySignature.isReadonly() ? "readonly " : "",
                propertySignature.getName(),
                propertySignature.hasQuestionToken() ? "?" : "",
              ),
              text: propertyTypeNode
                ? next({
                    typeNode: propertyTypeNode,
                    type: propertyTypeNode.getType(),
                    typeParameters,
                  })
                : stripComments
                  ? "unknown"
                  : "unknown /** unknown property signature */",
              comments: stripComments
                ? []
                : propertySignature
                    .getLeadingCommentRanges()
                    .map((e) => e.getText().trim()),
            };
          });

        const hunks: Array<string> = [];

        for (const { key, returnType } of indexSignatures) {
          hunks.push(format("[k: %s]: %s", key, returnType));
        }

        for (const {
          generics,
          parameters,
          returnType,
        } of constructSignatures) {
          hunks.push(
            format(
              "new %s(%s): %s",
              generics.length ? format("<%s>", generics.join(", ")) : "",
              parameters.join(", "),
              returnType,
            ),
          );
        }

        for (const {
          name,
          comments,
          generics,
          parameters,
          returnType,
        } of methodSignatures) {
          hunks.push(
            [
              ...comments,
              format(
                "%s%s(%s): %s",
                name,
                generics.length ? format("<%s>", generics.join(", ")) : "",
                parameters.join(", "),
                returnType,
              ),
            ].join("\n"),
          );
        }

        for (const { name, text, comments } of propertySignatures) {
          hunks.push(
            [
              //
              ...comments,
              format("%s: %s", name, text),
            ].join("\n"),
          );
        }

        return format(
          hunks.length ? "{\n%s\n}" : "{%s}",
          hunks.map((e) => indent(e)).join(";\n"),
        );
      }
    : undefined;
};
