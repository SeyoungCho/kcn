import type { InputGroupAddon } from "@repo/seed/ui/input-group";

type InputGroupAddonProps = React.ComponentProps<typeof InputGroupAddon>;

export type MDXInputGroupAddonProps = {
  /**
   * Positions the addon before or after the control, either inline or as a block.
   * @remarks `"inline-start" | "inline-end" | "block-start" | "block-end"`
   * @default "inline-start"
   */
  align?: InputGroupAddonProps["align"];
};

export type MDXInputGroupAddonPropsKO = {
  /**
   * addon을 control 앞뒤에 인라인 또는 블록 형태로 배치합니다.
   * @remarks `"inline-start" | "inline-end" | "block-start" | "block-end"`
   * @default "inline-start"
   */
  align?: InputGroupAddonProps["align"];
};
