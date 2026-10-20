import type { ToggleProps } from "@repo/montage/ui/toggle";

export type MDXToggleProps = {
  /** Visual style. `icon` is an icon-only toggle without a background.
   * @default "default"
   */
  variant?: ToggleProps["variant"];
  /** Size. With `variant="icon"` it sets the icon size.
   * @default "default"
   */
  size?: ToggleProps["size"];
  /** Whether the toggle is pressed (controlled). Use with `onPressedChange`. */
  pressed?: ToggleProps["pressed"];
  /** Whether the toggle is initially pressed (uncontrolled).
   * @default false
   */
  defaultPressed?: ToggleProps["defaultPressed"];
  /** Called when the toggle is pressed or released. */
  onPressedChange?: ToggleProps["onPressedChange"];
  /** @default false */
  disabled?: ToggleProps["disabled"];
  /** Base UI [render](https://base-ui.com/react/handbook/composition) prop — renders another element (similar to Radix `asChild`). */
  render?: ToggleProps["render"];
};

export type MDXTogglePropsKO = {
  /** 모양. `icon` 은 바탕 없이 아이콘만 있는 토글이에요.
   * @default "default"
   */
  variant?: ToggleProps["variant"];
  /** 크기. `variant="icon"` 이면 아이콘 크기예요.
   * @default "default"
   */
  size?: ToggleProps["size"];
  /** 눌림 상태(외부에서 관리). `onPressedChange` 와 같이 써요. */
  pressed?: ToggleProps["pressed"];
  /** 처음 눌림 상태(내부에서 관리).
   * @default false
   */
  defaultPressed?: ToggleProps["defaultPressed"];
  /** 누르거나 풀 때 불려요. */
  onPressedChange?: ToggleProps["onPressedChange"];
  /** @default false */
  disabled?: ToggleProps["disabled"];
  /** Base UI [render](https://base-ui.com/react/handbook/composition) prop — 다른 요소로 그려요(Radix 의 `asChild` 와 비슷해요). */
  render?: ToggleProps["render"];
};
