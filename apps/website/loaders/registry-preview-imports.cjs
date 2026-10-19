const path = require("node:path");

module.exports = function registryPreviewImports(source) {
  const resourcePath = this.resourcePath.split(path.sep).join("/");
  const registryMatch = resourcePath.match(
    /\/packages\/registries\/([^/]+)\/src\//,
  );

  if (!registryMatch) {
    return source;
  }

  const registry = registryMatch[1];

  return source
    .replace(/(["'])@\/components\/ui\//g, `$1@repo/${registry}/ui/`)
    .replace(/(["'])@\/lib\//g, `$1@repo/${registry}/lib/`);
};
