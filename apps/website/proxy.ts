import { createI18nMiddleware } from "fumadocs-core/i18n/middleware";
import { isMarkdownPreferred, rewritePath } from "fumadocs-core/negotiation";
import type { NextFetchEvent, NextRequest } from "next/server";
import { NextResponse } from "next/server";
import { i18n } from "@/lib/i18n";
import { docsContentRoute, docsRoute } from "@/lib/shared";

const i18nHandler = createI18nMiddleware(i18n);

function isRedirect(response: Response) {
  return response.headers.has("location");
}

/** Markdown export rewrites (`/{locale}/docs/...`). */
function createDocsRewrites(lang: string) {
  const { rewrite: rewriteSuffix } = rewritePath(
    `/${lang}${docsRoute}{/*path}.mdx`,
    `/${lang}${docsContentRoute}{/*path}/content.md`
  );
  const { rewrite: rewriteDocs } = rewritePath(
    `/${lang}${docsRoute}{/*path}`,
    `/${lang}${docsContentRoute}{/*path}/content.md`
  );
  return { rewriteSuffix, rewriteDocs };
}

const rewrites = i18n.languages.map((lang) => ({
  lang,
  ...createDocsRewrites(lang),
}));

export default async function proxy(
  request: NextRequest,
  event: NextFetchEvent
) {
  const i18nResponse = await Promise.resolve(i18nHandler(request, event));
  if (i18nResponse && isRedirect(i18nResponse)) return i18nResponse;

  const pathname = request.nextUrl.pathname;

  for (const { rewriteSuffix, rewriteDocs } of rewrites) {
    const rewritten =
      rewriteSuffix(pathname) ?? (isMarkdownPreferred(request) ? rewriteDocs(pathname) : false);
    if (rewritten) {
      return NextResponse.rewrite(new URL(rewritten, request.nextUrl));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|.*\\..*|favicon.ico).*)"],
};
