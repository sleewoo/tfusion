import { format } from "node:util";

import { SyntaxKind } from "ts-morph";

import type { CycleParameters, HandlerQualifier } from "@/types";
import { renderTypeParameter } from "@/utils";

export const handlerQualifier: HandlerQualifier = (
  { typeNode, typeParameters },
  { overrides, stripComments },
) => {
  return typeNode.isKind(SyntaxKind.TypeReference)
    ? (next) => {
        const nameNode = typeNode.getTypeName();
        const typeName = nameNode.getText();

        if (typeParameters?.[typeName]) {
          return typeParameters[typeName];
        }

        const typeArguments = typeNode.getTypeArguments().map((param) => {
          return next({
            typeNode: param,
            type: param.getType(),
            typeParameters,
          });
        });

        if (overrides?.[typeName]) {
          return typeArguments.length
            ? format("%s<%s>", overrides[typeName], typeArguments.join(", "))
            : overrides[typeName];
        }

        /**
         * using name symbol cause type symbol/aliasedSymbol very unreliable here.
         *
         * - type symbol/aliasedSymbol is dropped on some "complex" types like:
         *   type Re16 = readonly [number, ...(readonly boolean[])];
         *   type RT05 = [header: string, ...rows: Array<string[]>];
         *
         * - type symbol/aliasedSymbol is flattening builtins, eg:
         *   export type Test = Readonly<{}>
         *   converted to:
         *   type Readonly<T> = {readonly[P in keyof T]:T[P];}
         * */
        const aliasedSymbol = nameNode.getSymbol()?.getAliasedSymbol();
        const nameSymbol = aliasedSymbol ?? nameNode.getSymbol();

        const aliasDeclaration = nameSymbol
          ?.getDeclarations()
          ?.find((e) => e.isKind(SyntaxKind.TypeAliasDeclaration));

        const aliasNode = aliasDeclaration
          ? aliasDeclaration.getTypeNode()
          : undefined;

        let text: string;

        if (aliasNode) {
          const aliasType = aliasNode.getType();
          text = next({
            typeNode: aliasNode,
            type: aliasType.getTargetType() || aliasType,
            typeParameters: aliasDeclaration
              ?.getTypeParameters()
              .reduce((map: CycleParameters, param, i) => {
                /**
                 * Maps type parameters to their corresponding type arguments.
                 *
                 * If a type argument is explicitly provided at this index, it will be used.
                 * Otherwise, the type parameter itself is resolved (e.g., using its default or constraint).
                 *
                 * Example:
                 *   type Item = { ... };
                 *   type Response<T = number> = ListResponse<T, I = Item>;
                 *
                 * When resolving `ListResponse<T, I>`, we check each type parameter:
                 * - The first parameter (`T`) is resolved to `number`, because it's provided via `Response<T = number>`.
                 * - The second parameter (`I`) has no matching argument at the given index,
                 *   so we resolve the parameter itself, which falls back to its default: `Item`.
                 *
                 * Note: An empty string is considered a valid argument
                 * and should not be treated as missing.
                 *
                 * */
                map[param.getName()] =
                  typeof typeArguments[i] === "string"
                    ? typeArguments[i]
                    : renderTypeParameter(param, next).text;

                return map;
              }, {}),
          });
        } else {
          text = stripComments
            ? typeNode.getText()
            : `${typeNode.getText()} /** unresolved */`;
        }

        return text;
      }
    : undefined;
};
