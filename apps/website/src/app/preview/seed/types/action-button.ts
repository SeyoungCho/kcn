import type { ActionButtonProps } from "@repo/seed/ui/action-button";

export type MDXActionButtonProps = {
  /** Visual style of the button.
   * @default "brandSolid"
   */
  variant?: ActionButtonProps["variant"];
  /** Size of the button.
   * @default "medium"
   */
  size?: ActionButtonProps["size"];
  /** Whether the button holds text or only an icon. Give icon-only buttons an `aria-label`.
   * @default "withText"
   */
  layout?: ActionButtonProps["layout"];
  /** Shows a progress indicator and blocks presses while keeping the button focusable.
   * @default false
   */
  loading?: ActionButtonProps["loading"];
  /** Disables the button.
   * @default false
   */
  disabled?: ActionButtonProps["disabled"];
  /** Base UI [render](https://base-ui.com/react/handbook/composition) prop — replaces the rendered element (similar to Radix `asChild`). */
  render?: ActionButtonProps["render"];
};

export type MDXActionButtonPropsKO = {
  /** 버튼의 모양.
   * @default "brandSolid"
   */
  variant?: ActionButtonProps["variant"];
  /** 버튼 크기.
   * @default "medium"
   */
  size?: ActionButtonProps["size"];
  /** 글자가 있는 버튼인지 아이콘만 있는 버튼인지. 아이콘만 있으면 `aria-label` 을 주세요.
   * @default "withText"
   */
  layout?: ActionButtonProps["layout"];
  /** 진행 표시를 보여 주고 누르기를 막습니다(초점은 남습니다).
   * @default false
   */
  loading?: ActionButtonProps["loading"];
  /** 버튼을 비활성화합니다.
   * @default false
   */
  disabled?: ActionButtonProps["disabled"];
  /** Base UI [render](https://base-ui.com/react/handbook/composition) prop — 그려질 요소를 바꿉니다(Radix 의 `asChild` 와 비슷). */
  render?: ActionButtonProps["render"];
};
