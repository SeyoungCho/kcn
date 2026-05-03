import defaultMdxComponents from "fumadocs-ui/mdx";
import type { MDXComponents } from "mdx/types";
import { mdxComponents as montageMDXComponents } from "@repo/montage/mdx";
import { mdxComponents as seedMDXComponents } from "@repo/seed/mdx";
import { mdxComponents as tFlavoredMDXComponents } from "@repo/t-flavored/mdx";

const registryMDXComponents = {
  ...montageMDXComponents,
  ...seedMDXComponents,
  ...tFlavoredMDXComponents,
};

export function getMDXComponents(components?: MDXComponents) {
  return {
    ...defaultMdxComponents,
    ...registryMDXComponents,
    ...components,
  } satisfies MDXComponents;
}

export const useMDXComponents = getMDXComponents;

declare global {
  type MDXProvidedComponents = ReturnType<typeof getMDXComponents>;
}
