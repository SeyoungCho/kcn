import { readFile } from "node:fs/promises";
import path from "node:path";
import { NextResponse } from "next/server";
import { type Registry, isRegistry } from "@/types/preview";
import { getDictionary } from "@/dictionaries";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const demoPathPattern = /^[a-z0-9-]+(?:\/[a-z0-9-]+)?$/;

function getRepoRoot() {
  return process.cwd().endsWith(path.join("apps", "website"))
    ? path.resolve(process.cwd(), "../..")
    : process.cwd();
}

function toConsumerPreviewCode(code: string, registry: Registry) {
  return code.replaceAll(`@repo/${registry}/ui/`, "@/components/ui/");
}

/**
 * Walks a `t.a.b.c` path against the dictionary section, consuming the longest
 * existing prefix. Returns the resolved value and how many segments matched, so
 * callers can leave any unresolved remainder (`[variant]`, `.replace(...)`).
 */
function resolvePath(sectionData: unknown, segments: string[]) {
  let value: unknown = sectionData;
  let consumed = 0;

  for (; consumed < segments.length; consumed++) {
    const key = segments[consumed];
    if (
      value !== null &&
      typeof value === "object" &&
      Object.prototype.hasOwnProperty.call(value, key)
    ) {
      value = (value as Record<string, unknown>)[key];
    } else {
      break;
    }
  }

  return { value, consumed };
}

/**
 * Demos localize their labels at runtime via `usePreviewDictionary()`, but the
 * Code tab is for copy-paste, so it should show plain source. This strips the
 * dictionary hook (import + `const t = ...` line) and resolves every `t.<path>`
 * reference to the value from the requested language's dictionary:
 *
 * - JSX text child `{t.fruits.apple}` → `Apple` (plain text, no braces)
 * - JSX attribute `placeholder={t.placeholder}` → `placeholder="Select a fruit"`
 * - Everything else (dynamic / non-string) → JSON literal with the unresolved
 *   remainder kept, e.g. `t.variants[variant]` → `{...}[variant]`.
 */
function inlineDictionary(
  code: string,
  section: string | null,
  sectionData: unknown,
) {
  let lines = code.split("\n");

  // Drop the provider import.
  lines = lines.filter(
    (line) =>
      !/^\s*import\s+\{[^}]*usePreviewDictionary[^}]*\}\s+from\s+["'][^"']*preview-dictionary-provider["'];?\s*$/.test(
        line,
      ),
  );

  if (!section || sectionData == null) {
    return lines.join("\n");
  }

  // Drop the `const t = usePreviewDictionary().demos.<section>;` line.
  lines = lines.filter(
    (line) =>
      !/^\s*const\s+t\s*=\s*usePreviewDictionary\(\)\.demos\.[A-Za-z_$][\w$]*;?\s*$/.test(
        line,
      ),
  );

  let out = lines.join("\n");

  const expr = (pathStr: string) => pathStr.slice(2).split("."); // drop "t."

  // 1. Attribute values: `attr={t.PATH}` → `attr="value"` when fully a string.
  out = out.replace(
    /=\{(t(?:\.[A-Za-z_$][\w$]*)+)\}/g,
    (match, pathStr: string) => {
      const segments = expr(pathStr);
      const { value, consumed } = resolvePath(sectionData, segments);
      if (
        consumed === segments.length &&
        typeof value === "string" &&
        !value.includes('"')
      ) {
        return `="${value}"`;
      }
      return match;
    },
  );

  // 2. Text children: `{t.PATH}` (not an attribute) → raw text when a string.
  out = out.replace(
    /(?<!=)\{(t(?:\.[A-Za-z_$][\w$]*)+)\}/g,
    (match, pathStr: string) => {
      const segments = expr(pathStr);
      const { value, consumed } = resolvePath(sectionData, segments);
      if (
        consumed === segments.length &&
        typeof value === "string" &&
        !/[<>{}&]/.test(value)
      ) {
        return value;
      }
      return match;
    },
  );

  // 3. Anything left (dynamic indexing, method calls, object props) → literal,
  //    keeping the unresolved remainder.
  out = out.replace(
    /\bt((?:\.[A-Za-z_$][\w$]*)+)/g,
    (_match, pathStr: string) => {
      const segments = (pathStr as string).slice(1).split(".");
      const { value, consumed } = resolvePath(sectionData, segments);
      const rest = segments
        .slice(consumed)
        .map((segment) => `.${segment}`)
        .join("");
      return `${JSON.stringify(value)}${rest}`;
    },
  );

  // Collapse the blank line left behind by the removed declaration.
  return out.replace(/\n{3,}/g, "\n\n");
}

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const registry = searchParams.get("registry");
  const demo = searchParams.get("demo");
  const lang = searchParams.get("lang") ?? "";

  if (!isRegistry(registry)) {
    return NextResponse.json({ error: "Invalid registry" }, { status: 400 });
  }

  if (!demo) {
    return NextResponse.json({ error: "Provide demo" }, { status: 400 });
  }

  if (!demoPathPattern.test(demo)) {
    return NextResponse.json({ error: "Invalid source path" }, { status: 400 });
  }

  const repoRoot = getRepoRoot();
  const filePath = path.join(
    repoRoot,
    "apps",
    "website",
    "src",
    "app",
    "preview",
    registry,
    "demos",
    ...demo.split("/"),
    "page.tsx",
  );

  const normalizedPath = path.normalize(filePath);
  const allowedRoot = path.join(
    repoRoot,
    "apps",
    "website",
    "src",
    "app",
    "preview",
    registry,
    "demos",
  );

  if (!normalizedPath.startsWith(path.normalize(allowedRoot + path.sep))) {
    return NextResponse.json({ error: "Invalid source path" }, { status: 400 });
  }

  try {
    const raw = await readFile(normalizedPath, "utf8");

    // Detect the dictionary section the demo reads, e.g. `.demos.select`.
    const sectionMatch = raw.match(
      /usePreviewDictionary\(\)\.demos\.([A-Za-z_$][\w$]*)/,
    );
    const section = sectionMatch?.[1] ?? null;
    const sectionData = section
      ? ((await getDictionary(lang)).demos as Record<string, unknown>)[section]
      : null;

    const code = toConsumerPreviewCode(
      inlineDictionary(raw, section, sectionData),
      registry,
    );

    return NextResponse.json(
      { code },
      {
        headers: {
          "Cache-Control": "no-store",
        },
      },
    );
  } catch {
    return NextResponse.json({ error: "Code not found" }, { status: 404 });
  }
}
