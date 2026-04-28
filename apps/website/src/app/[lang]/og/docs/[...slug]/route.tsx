import { getPageImage, source } from "@/lib/source";
import { notFound } from "next/navigation";
import { ImageResponse } from "next/og";
import { generate as DefaultImage } from "fumadocs-ui/og";
import { appName } from "@/lib/shared";
import { i18n } from "@/lib/i18n";

export const revalidate = false;

export async function GET(
  _req: Request,
  context: RouteContext<"/[lang]/og/docs/[...slug]">
) {
  const { slug, lang } = await context.params;

  const page = source.getPage(slug.slice(0, -1), lang);
  if (!page) notFound();

  return new ImageResponse(
    <DefaultImage
      title={page.data.title}
      description={page.data.description}
      site={appName}
    />,
    {
      width: 1200,
      height: 630,
    }
  );
}

export function generateStaticParams() {
  return i18n.languages.flatMap((lang) =>
    source.getPages(lang).map((page) => ({
      lang,
      slug: getPageImage(page).segments,
    }))
  );
}
