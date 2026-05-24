import defaultMdxComponents from "fumadocs-ui/mdx";
import type { MDXComponents } from "mdx/types";
import {
  createGenerator,
  createFileSystemGeneratorCache,
} from "fumadocs-typescript";
import { mdxComponents as montageMDXComponents } from "@repo/montage/mdx";
import { mdxComponents as seedMDXComponents } from "@repo/seed/mdx";
import { mdxComponents as tFlavoredMDXComponents } from "@repo/t-flavored/mdx";
import { AutoTypeTable, type AutoTypeTableProps } from "fumadocs-typescript/ui";
import * as TabsComponents from "fumadocs-ui/components/tabs";
import { CodeBlock, Pre } from "fumadocs-ui/components/codeblock";
import { Preview } from "@/components/preview";

const registryMDXComponents = {
  ...montageMDXComponents,
  ...seedMDXComponents,
  ...tFlavoredMDXComponents,
};

const sharedMDXComponents = {
  Preview,
  ...TabsComponents,
};

const generator = createGenerator({
  // set a cache, necessary for serverless platform like Vercel
  cache: createFileSystemGeneratorCache(".next/fumadocs-typescript"),
});

export function getMDXComponents(components?: MDXComponents) {
  return {
    ...defaultMdxComponents,
    ...registryMDXComponents,
    ...sharedMDXComponents,
    pre: ({ ref: _ref, ...props }) => (
      <CodeBlock {...props}>
        <Pre>{props.children}</Pre>
      </CodeBlock>
    ),
    AutoTypeTable: (props: Partial<AutoTypeTableProps>) => (
      <AutoTypeTable {...props} generator={generator} />
    ),
    ...components,
  } satisfies MDXComponents;
}

export const useMDXComponents = getMDXComponents;

declare global {
  type MDXProvidedComponents = ReturnType<typeof getMDXComponents>;
}
