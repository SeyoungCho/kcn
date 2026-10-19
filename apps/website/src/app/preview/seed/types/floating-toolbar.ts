import type {
  FloatingToolbar,
  FloatingToolbarButton,
} from "@repo/seed/ui/floating-toolbar";
import type * as React from "react";

type FloatingToolbarProps = React.ComponentProps<typeof FloatingToolbar>;
type FloatingToolbarButtonProps = React.ComponentProps<
  typeof FloatingToolbarButton
>;

export type MDXFloatingToolbarProps = {
  /** Shows the toolbar. It rises in from the bottom and slides down as it closes. */
  open: FloatingToolbarProps["open"];
  /** Called by the close button and the Escape key (usually to clear the selection). Without it there is no close button. */
  onDismiss?: FloatingToolbarProps["onDismiss"];
  /** Accessible name of the close button.
   * @default "선택 해제"
   */
  closeLabel?: FloatingToolbarProps["closeLabel"];
  /** Accessible name of the toolbar. */
  "aria-label"?: FloatingToolbarProps["aria-label"];
};

export type MDXFloatingToolbarPropsKO = {
  /** 도구 줄을 보입니다. 아래에서 떠오르고, 닫힐 때 내려가며 사라집니다. */
  open: FloatingToolbarProps["open"];
  /** 닫기 버튼과 Esc 키가 부릅니다(보통 고르기 풀기). 주지 않으면 닫기 버튼이 없습니다. */
  onDismiss?: FloatingToolbarProps["onDismiss"];
  /** 닫기 버튼의 읽는 이름.
   * @default "선택 해제"
   */
  closeLabel?: FloatingToolbarProps["closeLabel"];
  /** 도구 줄의 읽는 이름. */
  "aria-label"?: FloatingToolbarProps["aria-label"];
};

export type MDXFloatingToolbarButtonProps = {
  /** Use `"critical"` for actions that cannot be undone — only the text and icon turn red.
   * @default "neutral"
   */
  tone?: FloatingToolbarButtonProps["tone"];
  /** @default false */
  disabled?: FloatingToolbarButtonProps["disabled"];
  onClick?: FloatingToolbarButtonProps["onClick"];
};

export type MDXFloatingToolbarButtonPropsKO = {
  /** 되돌릴 수 없는 일에는 `"critical"` — 글자와 아이콘만 빨갛게 됩니다.
   * @default "neutral"
   */
  tone?: FloatingToolbarButtonProps["tone"];
  /** @default false */
  disabled?: FloatingToolbarButtonProps["disabled"];
  onClick?: FloatingToolbarButtonProps["onClick"];
};
