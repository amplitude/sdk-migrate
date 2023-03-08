export default function transformer(file, { jscodeshift }): string {

  jscodeshift.registerMethods({
    findIdentifiers: function () {
      return this.find(jscodeshift.Identifier);
    },
    replaceImportDeclaration: function () {

      return this.find(jscodeshift.ImportDeclaration, {
        source: {
          value: '@segment/analytics-next',
        },
      })
      .replaceWith(nodePath => {
        const node = nodePath.node;
        node.source.value = '@amplitude/analytics-browser';
        return node;
      })
    }
  });

  jscodeshift.registerMethods({
    findSegmentExpressionStatements: function () {
      return this.find(jscodeshift.CallExpression, {
        callee: {
          object: { name: "analytics" },
          property: { name: "track" }
        }
      }).replaceWith(({ node }) =>
        jscodeshift.callExpression(jscodeshift.identifier("amplitude"), node.arguments)
      );
    }
  });

  return jscodeshift(file.source)
    .findSegmentExpressionStatements()

    .toSource();
}
