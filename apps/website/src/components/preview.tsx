"use client";

import { type ReactNode, useEffect, useState } from "react";
import { useDictionary } from "./dictionary-provider";
import { Tabs, TabsList, TabsTab, TabsPanel } from "@/components/ui/tabs";
import { DynamicCodeBlock } from "fumadocs-ui/components/dynamic-codeblock";

type Registry = "seed" | "montage" | "t-flavored";

/**
 * Two mutually exclusive preview modes:
 *
 *  1. **Simple component mode** — provide `component` plus optional `props`
 *     and text `children`. Good for "just show me a Button with this label"
 *     style snippets where the docs writer doesn't need composition.
 *
 *  2. **Demo file mode** — provide `demo` (a slug) and the iframe loads a
 *     pre-built page at `/preview/<registry>/demos/<slug>`. Use this whenever
 *     you need nested elements, multiple components, icons, layout wrappers,
 *     or anything that doesn't serialize cleanly to a URL query string.
 *
 *     Demo files live at:
 *     `apps/website/src/app/preview/<registry>/demos/<slug>/page.tsx`
 */
type PreviewProps = PreviewBaseProps & (PreviewComponentMode | PreviewDemoMode);

interface PreviewBaseProps {
  /** Which registry's iframe to embed. */
  registry: Registry;
  /** Iframe height in px. Defaults to 200. */
  height?: number;
  /** Optional iframe className override. */
  className?: string;
}

interface PreviewComponentMode {
  /** Component name without the registry prefix, e.g. "Button". */
  component: string;
  /** Demo slug must NOT be set in component mode. */
  demo?: never;
  /** Props to spread onto the rendered component (serialized to URL). */
  props?: Record<string, unknown>;
  /**
   * Children for the rendered component (e.g. a button label).
   * Flattened to plain text before being sent through the iframe URL, so
   * MDX-wrapped strings (paragraphs, fragments, etc.) still reach the
   * component as a single label.
   *
   * For nested elements (icons, multiple components), use a demo file
   * instead — see {@link PreviewDemoMode}.
   */
  children?: ReactNode;
}

interface PreviewDemoMode {
  /**
   * Slug of a demo page under
   * `apps/website/src/app/preview/<registry>/demos/<slug>/page.tsx`.
   *
   * Use this for any preview that needs nested JSX, icons, multi-component
   * layouts, or stateful wrappers — anything that the simple
   * `component` + `props` + text `children` API can't express.
   */
  demo: string;
  /** Component must NOT be set in demo mode. */
  component?: never;
  /** Props are baked into the demo file itself. */
  props?: never;
  /** Children are baked into the demo file itself. */
  children?: never;
}

/**
 * Recursively flattens any React node into a plain text string.
 *
 * MDX often wraps inline text in elements (e.g. `<p>` or fragments) and adds
 * surrounding whitespace, which means `children` rarely arrives as a bare
 * string. We walk the tree, pull out any string/number leaves, and join them.
 */
function flattenToText(node: ReactNode): string {
  if (node == null || typeof node === "boolean") return "";
  if (typeof node === "string") return node;
  if (typeof node === "number") return String(node);
  if (Array.isArray(node)) return node.map(flattenToText).join("");
  if (typeof node === "object" && "props" in node) {
    const element = node as { props?: { children?: ReactNode } };
    return flattenToText(element.props?.children);
  }
  return "";
}

/**
 * Embeds a registry preview inside an iframe so its theme is fully isolated
 * from the docs site (and from other registries).
 *
 * Each /preview/<registry>/* route loads ONLY that registry's CSS bundle,
 * so registries that share token names (e.g. `bg-primary`) but with
 * different values won't collide.
 *
 * Usage in MDX:
 * ```mdx
 * // Simple component with text children
 * <Preview registry="seed" component="Button">Click me</Preview>
 *
 * <Preview
 *   registry="seed"
 *   component="Button"
 *   props={{ variant: "destructive", size: "lg" }}
 * >
 *   Delete
 * </Preview>
 *
 * // Demo file for nested elements / composition
 * <Preview registry="seed" demo="button-with-icon" />
 * ```
 */
export function Preview(props: PreviewProps) {
  const { registry, height = 200, className } = props;

  /**
   * Compute the iframe `src` only after mount.
   *
   * Why: Fumadocs's MDX pipeline can produce different `children` shapes
   * during server-render vs client-hydration (e.g. wrapped in a `<p>` only
   * on one side, or text whitespace handled differently). That means
   * `flattenToText(children)` is not guaranteed to be deterministic across
   * the SSR / hydration boundary, which yields a different URL on each
   * side and triggers a React hydration mismatch on the iframe's `src`.
   *
   * Computing `src` inside `useEffect` sidesteps the mismatch entirely:
   * the SSR pass renders an empty placeholder of the same dimensions, and
   * the real iframe mounts on the client where `children` is stable.
   */
  const [src, setSrc] = useState<string | undefined>(undefined);

  useEffect(() => {
    if ("demo" in props && props.demo) {
      setSrc(`/preview/${registry}/demos/${props.demo}`);
      return;
    }

    const childrenText = flattenToText(props.children).trim();
    const search = new URLSearchParams();
    if (props.props && Object.keys(props.props).length > 0) {
      search.set("props", JSON.stringify(props.props));
    }
    if (childrenText) {
      search.set("children", childrenText);
    }
    const qs = search.toString();
    setSrc(`/preview/${registry}/${props.component}${qs ? `?${qs}` : ""}`);
  }, [registry, props]);

  const title =
    "demo" in props && props.demo
      ? `${registry} / demo:${props.demo} preview`
      : `${registry} / ${props.component} preview`;

  // i18n string for the fullscreen escape-hatch link. Falls back to English
  // if the dictionary provider is not in scope (e.g. the component is
  // accidentally rendered outside [lang]/).
  const dict = useDictionary();
  const openFullscreenLabel = dict?.preview.openFullscreen ?? "Open fullscreen";

  // The iframe gets the visible styling (border, radius, background); the
  // outer wrapper handles vertical spacing in the MDX flow + the trailing
  // fullscreen link. Passing `className` overrides only the iframe styling.
  const iframeClassName =
    className ?? "w-full rounded-lg border border-border bg-background";

  // SSR / pre-hydration: render a same-shape placeholder so the post-mount
  // iframe swap doesn't cause layout shift and the hydrated tree matches.
  if (!src) {
    return (
      <div className="my-4">
        <div
          className={iframeClassName}
          style={{ height }}
          aria-busy="true"
          aria-label="Loading preview…"
        />
      </div>
    );
  }

  return (
    <Tabs defaultValue="Preview">
      <TabsList>
        <TabsTab value="Preview">Preview</TabsTab>
        <TabsTab value="Code">Code</TabsTab>
      </TabsList>
      <TabsPanel value="Preview">
        <div className="my-4">
          <iframe
            src={src}
            title={title}
            className={iframeClassName}
            style={{ height }}
            loading="lazy"
          />
          <div className="mt-1 flex justify-end">
            <a
              href={src}
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs text-fd-muted-foreground hover:text-fd-foreground hover:underline"
            >
              {openFullscreenLabel} ↗
            </a>
          </div>
        </div>
      </TabsPanel>
      <TabsPanel value="Code">
        <div className="my-4">
          <DynamicCodeBlock
            lang="tsx"
            code={`<button onClick={() => alert("Hello World")}>Click me</button>`}
          />
        </div>
      </TabsPanel>
    </Tabs>
  );
}
