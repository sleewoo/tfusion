import { SyntaxKind } from "ts-morph";

import type { HandlerQualifier } from "@/types";

export const handlerQualifier: HandlerQualifier = ({ typeNode }) => {
  return typeNode.isKind(SyntaxKind.SymbolKeyword) ? () => "symbol" : undefined;
};
