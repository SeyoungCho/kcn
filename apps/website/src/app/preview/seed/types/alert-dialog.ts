import type {
  AlertDialogContentProps,
  AlertDialogRootProps,
} from "@repo/seed/ui/alert-dialog";

export type MDXAlertDialogProps = Pick<
  AlertDialogRootProps,
  "open" | "defaultOpen" | "onOpenChange"
> & {
  /** Closes the dialog with the Esc key. Pressing outside never closes it.
   * @default true
   */
  closeOnEscape?: AlertDialogRootProps["closeOnEscape"];
};

export type MDXAlertDialogPropsKO = Pick<
  AlertDialogRootProps,
  "open" | "defaultOpen" | "onOpenChange"
> & {
  /** Esc 키로 닫습니다. 바깥을 눌러서는 닫히지 않습니다.
   * @default true
   */
  closeOnEscape?: AlertDialogRootProps["closeOnEscape"];
};

export type MDXAlertDialogContentProps = {
  /** Stacking order when it overlaps other dialogs or sheets — higher is on top. */
  layerIndex?: AlertDialogContentProps["layerIndex"];
};

export type MDXAlertDialogContentPropsKO = {
  /** 다른 창 · 시트와 겹칠 때의 순서 — 클수록 위에 놓입니다. */
  layerIndex?: AlertDialogContentProps["layerIndex"];
};
