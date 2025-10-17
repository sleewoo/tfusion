import { format } from "node:util";

import crc from "crc/crc32";
import { Project, type SourceFile, SyntaxKind } from "ts-morph";

import builtins from "./builtins";
import { handlerQualifier as arrayQualifier } from "./handlers/arrays";
import { handlerQualifier as callSignatureQualifier } from "./handlers/call-signatures";
import { handlerQualifier as conditionalTypeQualifier } from "./handlers/conditional-types";
import { handlerQualifier as constructorTypeQualifier } from "./handlers/constructors";
import { handlerQualifier as indexedAccessTypeQualifier } from "./handlers/indexed-access";
import { handlerQualifier as inferTypeQualifier } from "./handlers/infers";
import { handlerQualifier as intersectionQualifier } from "./handlers/intersections";
import { handlerQualifier as mappedTypeQualifier } from "./handlers/mapped-types";
import { handlerQualifier as objectQualifier } from "./handlers/object-keyword";
import { handlerQualifier as optionalTypeQualifier } from "./handlers/optional-types";
import { handlerQualifier as parenthesizedTypeQualifier } from "./handlers/parenthesized-types";
import { handlerQualifier as symbolQualifier } from "./handlers/symbol-keyword";
import { handlerQualifier as templateLiteralTypeQualifier } from "./handlers/template-literals";
import { handlerQualifier as tupleQualifier } from "./handlers/tuples";
import { handlerQualifier as typeLiteralQualifier } from "./handlers/type-literals";
import { handlerQualifier as typeOperatorQualifier } from "./handlers/type-operators";
import { handlerQualifier as typeQueryQualifier } from "./handlers/type-queries";
import { handlerQualifier as typeReferenceQualifier } from "./handlers/type-references";
import { handlerQualifier as unionQualifier } from "./handlers/unions";
import { handlerQualifier as voidQualifier } from "./handlers/void-keyword";
import type { CycleSignature, ResolvedType, UserOptions } from "./types";
import {
  getSafePropName,
  isPrimitiveOrLiteral,
  renderTypeParameter,
} from "./utils";

export type { ResolvedType };

export default (file: string, opts?: UserOptions) => {
  const project = new Project({ compilerOptions: { skipLibCheck: true } });
  const sourceFile = project.addSourceFileAtPath(file);
  return flattener(project, sourceFile, opts);
};

export const flattener = (
  project: Project,
  file: string | SourceFile,
  opts?: UserOptions,
): Array<ResolvedType> => {
  const sourceFile =
    typeof file === "string"
      ? project.getSourceFile(file) || project.addSourceFileAtPath(file)
      : file;

  const {
    typesFilter,
    maxDepth = 16,
    stripComments = false,
    withProperties,
    formatters,
  } = { ...opts };

  const overrides: Record<string, string> = {
    ...builtins,
    ...opts?.overrides,
  };

  const handlerStack = [
    /**
     * always run typeOperatorQualifier first!
     * */
    typeOperatorQualifier,
    symbolQualifier,
    voidQualifier,
    objectQualifier,
    constructorTypeQualifier,
    conditionalTypeQualifier,
    optionalTypeQualifier,
    parenthesizedTypeQualifier,
    indexedAccessTypeQualifier,
    templateLiteralTypeQualifier,
    mappedTypeQualifier,
    inferTypeQualifier,
    typeReferenceQualifier,
    typeLiteralQualifier,
    typeQueryQualifier,
    unionQualifier,
    intersectionQualifier,
    tupleQualifier,
    arrayQualifier,
    callSignatureQualifier,
  ];

  const traverse: CycleSignature = (data, opts, step = 1) => {
    if (step > maxDepth) {
      return stripComments //
        ? "never"
        : "never /** maxDepth exceeded */";
    }

    for (const qualifier of handlerStack) {
      const handler = qualifier(data, opts);
      if (handler) {
        return handler((next) => {
          return traverse(next, opts, step + 1);
        });
      }
    }

    // if no handler matched so far, perhaps it's a primitive/literal value
    if (isPrimitiveOrLiteral(data.typeNode)) {
      return data.type.getText(data.typeNode);
    }

    return stripComments //
      ? "unknown"
      : "unknown /** unresolved */";
  };

  const resolvedTypes = sourceFile.getTypeAliases().flatMap((typeAlias) => {
    if (!typeAlias.isExported()) {
      return [];
    }

    const typeNode = typeAlias.getTypeNode();

    if (!typeNode) {
      return [];
    }

    const typeName = typeAlias.getName();

    const type = typeAlias.getType();

    const comments = stripComments
      ? []
      : typeAlias.getLeadingCommentRanges().map((e) => e.getText());

    const opts: UserOptions = {
      stripComments,
      overrides: {
        ...overrides,
        // overriding type to avoid recursing into itself
        [typeName]: typeName,
      },
    };

    const typeParameters = typeAlias.getTypeParameters().map((param) => {
      return renderTypeParameter(param, (data) => traverse(data, opts));
    });

    if (!typesFilter || typesFilter(typeName)) {
      const text = traverse(
        {
          typeNode,
          type,
          typeParameters: typeParameters.reduce(
            (map: Record<string, string>, { name }) => {
              map[name] = name;
              return map;
            },
            {},
          ),
        },
        opts,
      );

      return [
        {
          kind: typeNode.getKindName() as ResolvedType["kind"],
          name: typeName,
          parameters: typeParameters,
          comments,
          text,
        },
      ];
    }

    return [];
  });

  if (withProperties || formatters?.length) {
    const literalTypes = resolvedTypes
      .map((e) => {
        return format(
          "%s\ntype %s%s = %s;",
          e.comments.join("\n"),
          e.name,
          e.parameters.length
            ? `<${e.parameters.map((e) => e.fullText).join(", ")}>`
            : "",
          e.text,
        ).trim();
      })
      .join("\n\n");

    /**
     * Creating a source file containing resolved types.
     * Needed to extract properties for type literals and apply formatters, if any.
     * Creating a temp source file is pretty lightweight operation -
     * no file-system calls and no type checker usage, jsut pure AST operations.
     * */
    const sourceFileName = `${crc(resolvedTypes.map((e) => e.name).join("+"))}-${Date.now()}.ts`;

    const sourceFile = project.createSourceFile(
      sourceFileName,
      formatters?.length
        ? formatters.reduce((c, f) => f(c, sourceFileName), literalTypes)
        : literalTypes,
      { overwrite: true },
    );

    const resolvedTypesWithProperties = sourceFile
      .getTypeAliases()
      .flatMap((typeAlias): Array<ResolvedType> => {
        const name = typeAlias.getName();
        const resolvedType = resolvedTypes.find((e) => e.name === name);

        if (!resolvedType) {
          return [];
        }

        const typeNode = typeAlias.getTypeNode();

        if (!typeNode) {
          return [resolvedType];
        }

        const text = formatters?.length
          ? typeNode.getText() // getting formatted text
          : resolvedType.text;

        if (!withProperties || typeNode.getKind() !== SyntaxKind.TypeLiteral) {
          return [{ ...resolvedType, text }];
        }

        if (Array.isArray(withProperties) && !withProperties.includes(name)) {
          return [{ ...resolvedType, text }];
        }

        const properties = typeNode
          .getChildrenOfKind(SyntaxKind.PropertySignature)
          .flatMap((prop) => {
            const name = getSafePropName(prop);
            const typeNode = prop.getTypeNode();
            return !name || !typeNode
              ? []
              : [
                  {
                    name,
                    text: typeNode.getText(),
                    optional: prop.hasQuestionToken(),
                    readonly: prop.isReadonly(),
                  },
                ];
          });

        return [{ ...resolvedType, text, properties }];
      });

    project.removeSourceFile(sourceFile);

    return resolvedTypesWithProperties;
  }

  return resolvedTypes;
};
