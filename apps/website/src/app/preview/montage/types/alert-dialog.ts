import type {
  AlertDialogActionProps,
  AlertDialogCancelProps,
  AlertDialogProps,
} from "@repo/montage/ui/alert-dialog";

export type MDXAlertDialogProps = {
  /** Whether the dialog is open. Use with `onOpenChange` to control it. */
  open?: AlertDialogProps["open"];
  /** Whether the dialog starts open when uncontrolled.
   * @default false
   */
  defaultOpen?: AlertDialogProps["defaultOpen"];
  /** Called when the dialog opens or closes — including Esc or `AlertDialogCancel`. */
  onOpenChange?: AlertDialogProps["onOpenChange"];
};

export type MDXAlertDialogPropsKO = {
  /** 열렸는지 여부예요. `onOpenChange` 와 함께 써서 제어해요. */
  open?: AlertDialogProps["open"];
  /** 제어하지 않을 때 처음에 열어 둘지 정해요.
   * @default false
   */
  defaultOpen?: AlertDialogProps["defaultOpen"];
  /** 열리거나 닫힐 때 불려요. Esc 나 `AlertDialogCancel` 로 닫힐 때도 불려요. */
  onOpenChange?: AlertDialogProps["onOpenChange"];
};

export type MDXAlertDialogActionProps = {
  /** Button style. The default is a text button.
   * @default "link"
   */
  variant?: AlertDialogActionProps["variant"];
  /** Button size.
   * @default "default"
   */
  size?: AlertDialogActionProps["size"];
  /** Runs the action. The dialog stays open until you close it. */
  onClick?: AlertDialogActionProps["onClick"];
};

export type MDXAlertDialogActionPropsKO = {
  /** 버튼 모양이에요. 기본은 글자 버튼이에요.
   * @default "link"
   */
  variant?: AlertDialogActionProps["variant"];
  /** 버튼 크기예요.
   * @default "default"
   */
  size?: AlertDialogActionProps["size"];
  /** 액션을 실행해요. 다이얼로그는 직접 닫을 때까지 열려 있어요. */
  onClick?: AlertDialogActionProps["onClick"];
};

export type MDXAlertDialogCancelProps = {
  /** Button style. The default is a gray text button.
   * @default "link"
   */
  variant?: AlertDialogCancelProps["variant"];
  /** Button size.
   * @default "default"
   */
  size?: AlertDialogCancelProps["size"];
};

export type MDXAlertDialogCancelPropsKO = {
  /** 버튼 모양이에요. 기본은 회색 글자 버튼이에요.
   * @default "link"
   */
  variant?: AlertDialogCancelProps["variant"];
  /** 버튼 크기예요.
   * @default "default"
   */
  size?: AlertDialogCancelProps["size"];
};
