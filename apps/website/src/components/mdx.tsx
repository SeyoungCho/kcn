import defaultMdxComponents from "fumadocs-ui/mdx";
import type { MDXComponents } from "mdx/types";
import { Button as SeedButton } from "@repo/seed/ui/button";
import { Input as SeedInput } from "@repo/seed/ui/input";
import { Button as TFlavoredButton } from "@repo/t-flavored/ui/button";
import { Input as TFlavoredInput } from "@repo/t-flavored/ui/input";

export function getMDXComponents(components?: MDXComponents) {
  return {
    ...defaultMdxComponents,
    SeedButton,
    SeedInput,
    TFlavoredButton,
    TFlavoredInput,
    ...components,
  } satisfies MDXComponents;
}

export const useMDXComponents = getMDXComponents;

declare global {
  type MDXProvidedComponents = ReturnType<typeof getMDXComponents>;
}
