import type {
  AlertDialogActionProps,
  AlertDialogCancelProps,
  AlertDialogProps,
} from "@repo/t-flavored/ui/alert-dialog";

export type MDXAlertDialogProps = {
  /** Whether the dialog is open. Use with `onOpenChange` to control it. */
  open?: AlertDialogProps["open"];
  /** Whether the dialog starts open when uncontrolled.
   * @default false
   */
  defaultOpen?: AlertDialogProps["defaultOpen"];
  /** Called when the dialog opens or closes (a cancel button or Esc). Pressing the overlay never closes it. */
  onOpenChange?: AlertDialogProps["onOpenChange"];
  /** Called after the open or close animation finishes. */
  onOpenChangeComplete?: AlertDialogProps["onOpenChangeComplete"];
};

export type MDXAlertDialogPropsKO = {
  /** 열렸는지 여부예요. `onOpenChange` 와 함께 써서 제어해요. */
  open?: AlertDialogProps["open"];
  /** 제어하지 않을 때 처음에 열어 둘지 정해요.
   * @default false
   */
  defaultOpen?: AlertDialogProps["defaultOpen"];
  /** 열리거나 닫힐 때(취소 버튼 · Esc) 불려요. 딤을 눌러서는 닫히지 않아요. */
  onOpenChange?: AlertDialogProps["onOpenChange"];
  /** 열리고 닫히는 움직임이 끝난 뒤 불려요. */
  onOpenChangeComplete?: AlertDialogProps["onOpenChangeComplete"];
};

export type MDXAlertDialogActionProps = {
  /** Button style. `link` is a bold text button for a single acknowledgement.
   * @default "default"
   */
  variant?: AlertDialogActionProps["variant"];
  /** Button size.
   * @default "lg"
   */
  size?: AlertDialogActionProps["size"];
  /** Runs the action. It doesn't close the dialog by itself — set `open` to `false` when you're done. */
  onClick?: AlertDialogActionProps["onClick"];
};

export type MDXAlertDialogActionPropsKO = {
  /** 버튼 모양. `link` 는 알리기만 할 때 쓰는 굵은 글자 버튼이에요.
   * @default "default"
   */
  variant?: AlertDialogActionProps["variant"];
  /** 버튼 크기.
   * @default "lg"
   */
  size?: AlertDialogActionProps["size"];
  /** 동작을 실행해요. 스스로 닫지는 않으니 끝나면 `open` 을 `false` 로 바꿔 주세요. */
  onClick?: AlertDialogActionProps["onClick"];
};

export type MDXAlertDialogCancelProps = {
  /** Button style.
   * @default "secondary"
   */
  variant?: AlertDialogCancelProps["variant"];
  /** Button size.
   * @default "lg"
   */
  size?: AlertDialogCancelProps["size"];
};

export type MDXAlertDialogCancelPropsKO = {
  /** 버튼 모양.
   * @default "secondary"
   */
  variant?: AlertDialogCancelProps["variant"];
  /** 버튼 크기.
   * @default "lg"
   */
  size?: AlertDialogCancelProps["size"];
};
