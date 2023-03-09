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
    replaceTrack: typeof customCollectionMethods.replaceTrack;
  }
}

const customCollectionMethods = {
  replaceImportDeclaration: function (
    this: Collection<any>
  ): Collection<ImportDeclaration> {
    this.find(jscodeshift.ImportDeclaration, {
      source: {
        value: "@segment/analytics-next",
      },
    }).replaceWith(() => AMPLITUDE_IMPORT_DECLARTION);
    return this;
  },
  replaceTrack: function (this: Collection<any>): Collection<CallExpression> {
    this.find(jscodeshift.CallExpression, {
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
    return this;
  },
};

export default function transformer(file: FileInfo, api: API) {
  const { jscodeshift } = api;

  jscodeshift.registerMethods(customCollectionMethods);
  return jscodeshift(file.source)
    .replaceImportDeclaration()
    .replaceTrack()
    .toSource();
}
