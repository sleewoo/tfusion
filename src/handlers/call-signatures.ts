import { format } from "node:util";

import type { HandlerQualifier } from "@/types";
import { isPrimitiveOrLiteral, renderCallSignatureAssets } from "@/utils";

export const handlerQualifier: HandlerQualifier = (data) => {
  const { typeParameters } = data;

  /**
   * primitive keywords and literal type nodes can never carry
   * call signatures - skip them on AST alone so falling through
   * to the primitive/literal branch stays checker-free.
   * */
  if (isPrimitiveOrLiteral(data.typeNode)) {
    return undefined;
  }

  const callSignatures = data.type.getCallSignatures();

  // if a type has call signatures, it is definitelly a function, is not it?
  return callSignatures.length
    ? (next) => {
        const signatures = callSignatures.map((signature) => {
          const {
            //
            generics,
            parameters,
            returnType,
          } = renderCallSignatureAssets(signature, (data) => {
            return next({
              typeNode: data.typeNode,
              get type() {
                return data.type;
              },
              typeParameters,
            });
          });
          return format(
            callSignatures.length > 1 //
              ? "%s(%s): %s"
              : "%s(%s) => %s",
            generics.length ? format("<%s>", generics.join(", ")) : "",
            parameters.join(", "),
            returnType,
          );
        });
        return format(
          callSignatures.length > 1 //
            ? "{\n%s\n}"
            : "(%s)",
          signatures.join("\n"),
        );
      }
    : undefined;
};
