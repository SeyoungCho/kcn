import { mdxComponents } from "@repo/montage/mdx";
import { renderPreview } from "@/lib/preview";

interface PageProps {
  params: Promise<{ component: string }>;
  searchParams: Promise<{ props?: string; children?: string }>;
}

/**
 * Renders a single montage component inside the iframe.
 *
 * URL format: /preview/montage/<ComponentName>?props=<json>&children=<text>
 *
 * - <ComponentName> is resolved against montage's MDX export map keyed as
 *   "Montage<ComponentName>".
 */
export default async function MontagePreviewPage({
  params,
  searchParams,
}: PageProps) {
  const { component } = await params;
  const search = await searchParams;

  return renderPreview({
    registryPrefix: "Montage",
    componentName: component,
    componentMap: mdxComponents,
    propsParam: search.props,
    childrenParam: search.children,
  });
}
