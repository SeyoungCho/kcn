import type { SeparatorProps } from "@repo/montage/ui/separator";

export type MDXSeparatorProps = {
  /** @default "horizontal" */
  orientation?: SeparatorProps["orientation"];
  /** Change the color or thickness, e.g. `bg-line-neutral-secondary` or `h-0.5`. */
  className?: string;
};

export type MDXSeparatorPropsKO = {
  /** @default "horizontal" */
  orientation?: SeparatorProps["orientation"];
  /** 색이나 두께를 바꿔요. 예: `bg-line-neutral-secondary`, `h-0.5`. */
  className?: string;
};
