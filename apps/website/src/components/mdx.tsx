import defaultMdxComponents from "fumadocs-ui/mdx";
import type { MDXComponents } from "mdx/types";
import TFlavoredButton from "@repo/t-flavored/ui/button";

export function getMDXComponents(components?: MDXComponents) {
  return {
    ...defaultMdxComponents,
    TFlavoredButton,
    ...components,
  } satisfies MDXComponents;
}

export const useMDXComponents = getMDXComponents;

declare global {
  type MDXProvidedComponents = ReturnType<typeof getMDXComponents>;
}
