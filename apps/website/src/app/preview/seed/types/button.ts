import type { ButtonVariantProps, ButtonProps } from "@repo/seed/ui/button";

type MDXButtonVariantProps = {
  /** variant of the button
   * @remarks `"brandSolid" | "neutralSolid" | "neutralWeak" | "criticalSolid" | "brandOutline" | "neutralOutline" | "ghost"`
   * @default "brandSolid"
   */
  variant?: ButtonVariantProps["variant"];
  /** size of the button
   * @remarks `"xs" | "sm" | "md" | "lg"`
   * @default "md"
   */
  size?: ButtonVariantProps["size"];
  /** layout property that determines whether the button should have text or an icon
   * @remarks `"withText" | "iconOnly"`
   * @default "withText"
   * @type {"withText" | "iconOnly"}
   */
  layout?: ButtonVariantProps["layout"];
};

type MDXButtonVariantPropsKO = {
  /** 버튼 배리언트
   * @remarks `"brandSolid" | "neutralSolid" | "neutralWeak" | "criticalSolid" | "brandOutline" | "neutralOutline" | "ghost"`
   * @default "brandSolid"
   */
  variant?: ButtonVariantProps["variant"];
  /** 버튼 크기
   * @remarks `"xs" | "sm" | "md" | "lg"`
   * @default "md"
   */
  size?: ButtonVariantProps["size"];
  /** 버튼에 텍스트 또는 아이콘이 포함되어 있는지 결정하는 레이아웃 속성
   * @remarks `"withText" | "iconOnly"`
   * @default "withText"
   * @type {"withText" | "iconOnly"}
   */
  layout?: ButtonVariantProps["layout"];
};

export type MDXButtonProps = MDXButtonVariantProps & {
  /**
   * Base UI prop - [render](https://base-ui.com/react/handbook/composition#render-function)
   *
   * Allows you to replace the component’s HTML element with a different tag, or compose it with another component.
   *
   * Accepts a ReactElement or a function that returns the element to render.
   * Similar to the ```asChild``` prop in Radix UI.
   * @remarks `ReactElement | ((props: HTMLProps, state: Button.State) => ReactElement)`
   */
  render?: ButtonProps["render"];
};

export type MDXButtonPropsKO = MDXButtonVariantPropsKO & {
  /**
   * Base UI prop - [render](https://base-ui.com/react/handbook/composition#render-function)
   *
   * 컴포넌트의 HTML 요소를 다른 태그로 대체하거나 다른 컴포넌트와 함께 구성할 수 있습니다.
   *
   * ReactElement 또는 요소를 반환하는 함수를 받습니다. Radix UI의 ```asChild``` prop과 유사합니다.
   * @remarks `ReactElement | ((props: HTMLProps, state: Button.State) => ReactElement)`
   */
  render?: ButtonProps["render"];
};
