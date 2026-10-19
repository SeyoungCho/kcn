import type {
  ButtonChipProps,
  RadioChipItemProps,
  RadioChipRootProps,
  ToggleChipProps,
} from "@repo/seed/ui/chip";

export type MDXToggleChipProps = Pick<
  ToggleChipProps,
  "checked" | "defaultChecked" | "onCheckedChange" | "name"
> & {
  /** Visual style of the chip.
   * @default "solid"
   */
  variant?: ToggleChipProps["variant"];
  /** Size of the chip.
   * @default "medium"
   */
  size?: ToggleChipProps["size"];
  /** Whether the chip holds text or only an icon. Sets the minimum width.
   * @default "withText"
   */
  layout?: ToggleChipProps["layout"];
  /** @default false */
  disabled?: ToggleChipProps["disabled"];
  /** Accessibility attributes (such as `aria-label`) applied to the focusable chip element. */
  inputProps?: ToggleChipProps["inputProps"];
};

export type MDXToggleChipPropsKO = Pick<
  ToggleChipProps,
  "checked" | "defaultChecked" | "onCheckedChange" | "name"
> & {
  /** 칩의 모양.
   * @default "solid"
   */
  variant?: ToggleChipProps["variant"];
  /** 칩 크기.
   * @default "medium"
   */
  size?: ToggleChipProps["size"];
  /** 글자가 있는 칩인지 아이콘만 있는 칩인지. 가장 좁은 폭이 달라집니다.
   * @default "withText"
   */
  layout?: ToggleChipProps["layout"];
  /** @default false */
  disabled?: ToggleChipProps["disabled"];
  /** 초점을 받는 칩 요소에 붙는 접근성 속성(`aria-label` 등). */
  inputProps?: ToggleChipProps["inputProps"];
};

export type MDXButtonChipProps = {
  /** @default "solid" */
  variant?: ButtonChipProps["variant"];
  /** @default "medium" */
  size?: ButtonChipProps["size"];
  /** @default "withText" */
  layout?: ButtonChipProps["layout"];
  /** @default false */
  disabled?: ButtonChipProps["disabled"];
  onClick?: ButtonChipProps["onClick"];
};

export type MDXRadioChipRootProps = Pick<
  RadioChipRootProps,
  "value" | "defaultValue" | "onValueChange" | "disabled" | "name"
>;

export type MDXRadioChipItemProps = Pick<
  RadioChipItemProps,
  "value" | "variant" | "size" | "layout" | "disabled" | "inputProps"
>;
