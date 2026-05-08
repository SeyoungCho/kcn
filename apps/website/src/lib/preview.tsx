import type { ComponentType } from "react";

interface RenderPreviewOptions {
  /** e.g. "Seed", "Montage", "TFlavored" — prefix used in registry's mdx.ts. */
  registryPrefix: string;
  /** e.g. "Button" — comes from the [component] route segment. */
  componentName: string;
  /** Registry's mdx exports, e.g. { SeedButton, SeedInput }. */
  componentMap: Record<string, ComponentType<Record<string, unknown>>>;
  /** Raw "props" search param (URL-encoded JSON). */
  propsParam?: string;
  /** Raw "children" search param (URL-encoded plain text). */
  childrenParam?: string;
}

/**
 * Shared renderer for all per-registry preview pages.
 *
 * Looks up the requested component by `${registryPrefix}${componentName}`,
 * deserializes the optional `props` JSON and `children` text from the URL,
 * and renders the component centered in the iframe viewport.
 */
export function renderPreview({
  registryPrefix,
  componentName,
  componentMap,
  propsParam,
  childrenParam,
}: RenderPreviewOptions) {
  const lookupKey = `${registryPrefix}${componentName}`;
  const Component = componentMap[lookupKey];

  if (!Component) {
    return (
      <div className="flex min-h-screen items-center justify-center p-8 text-sm">
        Component not found: <code className="ml-1">{lookupKey}</code>
      </div>
    );
  }

  let parsedProps: Record<string, unknown> = {};
  if (propsParam) {
    try {
      parsedProps = JSON.parse(propsParam);
    } catch (err) {
      console.error(`Failed to parse props for ${lookupKey}:`, err);
    }
  }

  const children = childrenParam ?? undefined;

  return (
    <div className="flex min-h-screen items-center justify-center p-8">
      <Component {...parsedProps}>{children}</Component>
    </div>
  );
}
