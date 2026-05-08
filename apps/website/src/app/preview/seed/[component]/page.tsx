import { mdxComponents } from "@repo/seed/mdx";
import { renderPreview } from "@/lib/preview";

interface PageProps {
  params: Promise<{ component: string }>;
  searchParams: Promise<{ props?: string; children?: string }>;
}

/**
 * Renders a single seed component inside the iframe.
 *
 * URL format: /preview/seed/<ComponentName>?props=<json>&children=<text>
 *
 * - <ComponentName> is the suffix (e.g. "Button"); it's resolved against
 *   seed's MDX export map keyed as "Seed<ComponentName>".
 * - "props" is a URL-encoded JSON string of props to spread.
 * - "children" is a URL-encoded text string to render as the component's
 *   children (sufficient for simple text labels).
 */
export default async function SeedPreviewPage({
  params,
  searchParams,
}: PageProps) {
  const { component } = await params;
  const search = await searchParams;

  return renderPreview({
    registryPrefix: "Seed",
    componentName: component,
    componentMap: mdxComponents,
    propsParam: search.props,
    childrenParam: search.children,
  });
}
