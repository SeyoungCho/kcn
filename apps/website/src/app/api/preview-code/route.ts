import { readFile } from "node:fs/promises";
import path from "node:path";
import { NextResponse } from "next/server";
import { type Registry, isRegistry } from "@/types/preview";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const slugPattern = /^[a-z0-9-]+$/;

function getRepoRoot() {
  return process.cwd().endsWith(path.join("apps", "website"))
    ? path.resolve(process.cwd(), "../..")
    : process.cwd();
}

function toConsumerPreviewCode(code: string, registry: Registry) {
  return code.replaceAll(`@repo/${registry}/ui/`, "@/components/ui/");
}

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const registry = searchParams.get("registry");
  const demo = searchParams.get("demo");

  if (!isRegistry(registry)) {
    return NextResponse.json({ error: "Invalid registry" }, { status: 400 });
  }

  if (!demo) {
    return NextResponse.json({ error: "Provide demo" }, { status: 400 });
  }

  if (!slugPattern.test(demo)) {
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
    demo,
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
    const code = toConsumerPreviewCode(
      await readFile(normalizedPath, "utf8"),
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
