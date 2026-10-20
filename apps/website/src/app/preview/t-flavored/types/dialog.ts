import type {
  DialogContentProps,
  DialogProps,
} from "@repo/t-flavored/ui/dialog";

export type MDXDialogProps = {
  /** Whether the dialog is open. Use with `onOpenChange` to control it. */
  open?: DialogProps["open"];
  /** Whether the dialog starts open when uncontrolled.
   * @default false
   */
  defaultOpen?: DialogProps["defaultOpen"];
  /** Called when the dialog opens or closes — including a tap on the overlay or Esc. */
  onOpenChange?: DialogProps["onOpenChange"];
  /** Called after the open or close animation finishes. */
  onOpenChangeComplete?: DialogProps["onOpenChangeComplete"];
  /** Keeps the dialog open when the overlay is pressed.
   * @default false
   */
  disablePointerDismissal?: DialogProps["disablePointerDismissal"];
};

export type MDXDialogPropsKO = {
  /** 열렸는지 여부예요. `onOpenChange` 와 함께 써서 제어해요. */
  open?: DialogProps["open"];
  /** 제어하지 않을 때 처음에 열어 둘지 정해요.
   * @default false
   */
  defaultOpen?: DialogProps["defaultOpen"];
  /** 열리거나 닫힐 때 불려요. 딤을 누르거나 Esc 를 눌러 닫힐 때도 불려요. */
  onOpenChange?: DialogProps["onOpenChange"];
  /** 열리고 닫히는 움직임이 끝난 뒤 불려요. */
  onOpenChangeComplete?: DialogProps["onOpenChangeComplete"];
  /** 딤을 눌러도 닫히지 않게 해요.
   * @default false
   */
  disablePointerDismissal?: DialogProps["disablePointerDismissal"];
};

export type MDXDialogContentProps = {
  /** Shows a close button in the top-right corner.
   * @default false
   */
  showCloseButton?: DialogContentProps["showCloseButton"];
  /** Element to focus when the dialog opens. By default the first focusable element inside. */
  initialFocus?: DialogContentProps["initialFocus"];
  /** Element to focus when the dialog closes. By default the trigger. */
  finalFocus?: DialogContentProps["finalFocus"];
};

export type MDXDialogContentPropsKO = {
  /** 오른쪽 위에 닫기 버튼을 보여 줘요.
   * @default false
   */
  showCloseButton?: DialogContentProps["showCloseButton"];
  /** 열릴 때 초점을 줄 요소예요. 기본은 안의 첫 번째 초점 가능한 요소예요. */
  initialFocus?: DialogContentProps["initialFocus"];
  /** 닫힐 때 초점을 돌려줄 요소예요. 기본은 트리거예요. */
  finalFocus?: DialogContentProps["finalFocus"];
};
