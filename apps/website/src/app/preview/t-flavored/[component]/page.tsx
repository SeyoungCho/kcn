import { mdxComponents } from "@repo/t-flavored/mdx";
import { renderPreview } from "@/lib/preview";

interface PageProps {
  params: Promise<{ component: string }>;
  searchParams: Promise<{ props?: string; children?: string }>;
}

/**
 * Renders a single t-flavored component inside the iframe.
 *
 * URL format: /preview/t-flavored/<ComponentName>?props=<json>&children=<text>
 *
 * - <ComponentName> is resolved against t-flavored's MDX export map keyed as
 *   "TFlavored<ComponentName>".
 */
export default async function TFlavoredPreviewPage({
  params,
  searchParams,
}: PageProps) {
  const { component } = await params;
  const search = await searchParams;

  return renderPreview({
    registryPrefix: "TFlavored",
    componentName: component,
    componentMap: mdxComponents,
    propsParam: search.props,
    childrenParam: search.children,
  });
}
