import jscodeshift, {
  API,
  FileInfo,
  Collection,
  ImportDeclaration,
  CallExpression,
} from "jscodeshift";
import { AMPLITUDE_IMPORT_DECLARTION } from "./helpers";
export const parser = "tsx";
declare module "jscodeshift/src/Collection" {
  interface Collection<N> {
    replaceImportDeclaration: typeof customCollectionMethods.replaceImportDeclaration;
    replaceSegmentExpressionStatements: typeof customCollectionMethods.replaceSegmentExpressionStatements;
  }
}

const customCollectionMethods = {
  replaceImportDeclaration: function (
    this: Collection<any>
  ): Collection<ImportDeclaration> {
    return this.find(jscodeshift.ImportDeclaration, {
      source: {
        value: "@segment/analytics-next",
      },
    }).replaceWith(() => AMPLITUDE_IMPORT_DECLARTION);
  },
  replaceSegmentExpressionStatements: function (
    this: Collection<any>
  ): Collection<CallExpression> {
    return this.find(jscodeshift.CallExpression, {
      callee: {
        object: {
          name: "analytics",
        },
        property: { name: "track" },
        type: "MemberExpression",
      },
    }).replaceWith(({ node }) => {
      return jscodeshift.callExpression(
        jscodeshift.identifier("track"),
        node.arguments
      );
    });
  },
};

export default function transformer(file: FileInfo, api: API) {
  const { jscodeshift } = api;

  jscodeshift.registerMethods(customCollectionMethods);
  return jscodeshift(file.source)
    .replaceImportDeclaration()
    .replaceSegmentExpressionStatements()
    .toSource();
}
