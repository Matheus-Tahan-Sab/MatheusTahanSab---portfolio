// Localize authored React copy at compilation, including lazy-loaded components.
export default function portfolioLanguage({ types: t }, { messages }) {
  function translated(value) {
    const key = value.trim();
    if (!Object.hasOwn(messages, key)) return null;
    return value.replace(key, () => messages[key]);
  }
  function select(original, english) {
    return t.conditionalExpression(
      t.binaryExpression('===', t.memberExpression(t.memberExpression(t.identifier('document'), t.identifier('documentElement')), t.identifier('lang')), t.stringLiteral('en')),
      t.stringLiteral(english), t.stringLiteral(original)
    );
  }
  return { visitor: {
    JSXText(path) {
      const value = path.node.value.replace(/\s+/g, ' ');
      const english = translated(value);
      if (english === null) return;
      path.replaceWith(t.jsxExpressionContainer(select(value, english)));
      path.skip();
    },
    StringLiteral(path) {
      if (path.parentPath.isImportDeclaration() || path.parentPath.isExportNamedDeclaration() ||
          path.parentPath.isObjectProperty() && path.key === 'key') return;
      const english = translated(path.node.value);
      if (english === null) return;
      const choice = select(path.node.value, english);
      path.replaceWith(path.parentPath.isJSXAttribute() ? t.jsxExpressionContainer(choice) : choice);
      path.skip();
    }
  }};
}
