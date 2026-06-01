import type {
  InputGroup,
  InputGroupAddon,
  InputGroupVariantProps,
} from "@repo/seed/ui/input-group";

type InputGroupProps = React.ComponentProps<typeof InputGroup>;
type InputGroupAddonProps = React.ComponentProps<typeof InputGroupAddon>;

export type MDXInputGroupProps = {
  /**
   * Visual style of the input group.
   * @remarks `"outline" | "underline"`
   * @default "outline"
   */
  variant?: InputGroupVariantProps["variant"];
  /**
   * Size of the input group and its composed elements.
   * @remarks `"md" | "lg"`
   * @default "lg"
   */
  size?: InputGroupVariantProps["size"];
  /**
   * Additional class names applied to the input group.
   */
  className?: InputGroupProps["className"];
};

export type MDXInputGroupPropsKO = {
  /**
   * Input Group의 시각적 스타일입니다.
   * @remarks `"outline" | "underline"`
   * @default "outline"
   */
  variant?: InputGroupVariantProps["variant"];
  /**
   * Input Group과 하위 요소의 크기입니다.
   * @remarks `"md" | "lg"`
   * @default "lg"
   */
  size?: InputGroupVariantProps["size"];
  /**
   * Input Group에 적용할 추가 클래스 이름입니다.
   */
  className?: InputGroupProps["className"];
};

export type MDXInputGroupAddonProps = {
  /**
   * Positions the addon around the control, either inline or as a block.
   * @remarks `"inline-start" | "inline-end" | "block-start" | "block-end"`
   * @default "inline-start"
   */
  align?: InputGroupAddonProps["align"];
};

export type MDXInputGroupAddonPropsKO = {
  /**
   * addon을 control 주변에 인라인 또는 블록 형태로 배치합니다.
   * @remarks `"inline-start" | "inline-end" | "block-start" | "block-end"`
   * @default "inline-start"
   */
  align?: InputGroupAddonProps["align"];
};
