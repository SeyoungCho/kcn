import type { DrawerContentProps, DrawerProps } from "@repo/montage/ui/drawer";

export type MDXDrawerProps = {
  /** Whether the drawer is open. Use with `onOpenChange` to control it. */
  open?: DrawerProps["open"];
  /** Whether the drawer starts open when uncontrolled.
   * @default false
   */
  defaultOpen?: DrawerProps["defaultOpen"];
  /** Called when the drawer opens or closes — including a swipe down, a press on the overlay or Esc. */
  onOpenChange?: DrawerProps["onOpenChange"];
  /** Keeps the drawer open when the overlay is pressed.
   * @default false
   */
  disablePointerDismissal?: DrawerProps["disablePointerDismissal"];
};

export type MDXDrawerPropsKO = {
  /** 열렸는지 여부예요. `onOpenChange` 와 함께 써서 제어해요. */
  open?: DrawerProps["open"];
  /** 제어하지 않을 때 처음에 열어 둘지 정해요.
   * @default false
   */
  defaultOpen?: DrawerProps["defaultOpen"];
  /** 열리거나 닫힐 때 불려요. 끌어내리거나 딤 · Esc 를 눌러 닫힐 때도 불려요. */
  onOpenChange?: DrawerProps["onOpenChange"];
  /** 딤을 눌러도 닫히지 않게 해요.
   * @default false
   */
  disablePointerDismissal?: DrawerProps["disablePointerDismissal"];
};

export type MDXDrawerContentProps = {
  /** Shows the handle at the top.
   * @default true
   */
  showHandle?: DrawerContentProps["showHandle"];
};

export type MDXDrawerContentPropsKO = {
  /** 위쪽 가운데에 손잡이를 보여 줘요.
   * @default true
   */
  showHandle?: DrawerContentProps["showHandle"];
};
