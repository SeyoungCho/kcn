// Emits type declarations for a registry package into dist/types and rewrites
// the consumer-facing aliases (@/components/ui/*, @/lib/*) to relative paths.
//
// Registry sources import each other the way a shadcn consumer would
// (`@/components/ui/icon`). Every registry uses the same specifiers, so the
// docs website cannot resolve them per registry with one tsconfig. The website
// reads these declarations instead (package.json exports → "types"), where each
// alias already points inside its own registry.
//
// Usage (from a registry package): node ../../../scripts/build-registry-types.mjs

import { execFileSync } from "node:child_process";
import { readdirSync, readFileSync, rmSync, writeFileSync } from "node:fs";
import { dirname, join, relative, sep } from "node:path";

const cwd = process.cwd();
const outDir = join(cwd, "dist", "types");

rmSync(outDir, { recursive: true, force: true });

execFileSync(
  "tsc",
  [
    "-p",
    "tsconfig.json",
    "--noEmit",
    "false",
    "--declaration",
    "--emitDeclarationOnly",
    "--declarationMap",
    "false",
    "--rootDir",
    "src",
    "--outDir",
    outDir,
  ],
  { cwd, stdio: "inherit" },
);

const ALIASES = [
  ["@/components/ui/", join(outDir, "components", "ui")],
  ["@/lib/", join(outDir, "lib")],
];

const walk = (dir) =>
  readdirSync(dir, { withFileTypes: true }).flatMap((entry) => {
    const path = join(dir, entry.name);
    if (entry.isDirectory()) return walk(path);
    return path.endsWith(".d.ts") ? [path] : [];
  });

for (const file of walk(outDir)) {
  const source = readFileSync(file, "utf8");
  const next = source.replace(
    /(["'])(@\/(?:components\/ui|lib)\/)([^"']+)\1/g,
    (match, quote, prefix, rest) => {
      const [, target] = ALIASES.find(([alias]) => alias === prefix);
      let path = relative(dirname(file), join(target, rest)).split(sep).join("/");
      if (!path.startsWith(".")) path = `./${path}`;
      return `${quote}${path}.js${quote}`;
    },
  );
  if (next !== source) writeFileSync(file, next);
}
