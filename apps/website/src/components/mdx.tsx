import defaultMdxComponents from "fumadocs-ui/mdx";
import type { MDXComponents } from "mdx/types";
import { Button as TFlavoredButton } from "@repo/t-flavored/ui/button";
import { Input as TFlavoredInput } from "@repo/t-flavored/ui/input";

export function getMDXComponents(components?: MDXComponents) {
  return {
    ...defaultMdxComponents,
    TFlavoredButton,
    TFlavoredInput,
    ...components,
  } satisfies MDXComponents;
}

export const useMDXComponents = getMDXComponents;

declare global {
  type MDXProvidedComponents = ReturnType<typeof getMDXComponents>;
}
