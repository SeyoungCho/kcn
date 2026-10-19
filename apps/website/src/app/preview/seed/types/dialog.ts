import type { DialogContentProps, DialogRootProps } from "@repo/seed/ui/dialog";

export type MDXDialogProps = Pick<
  DialogRootProps,
  "open" | "defaultOpen" | "onOpenChange"
> & {
  /** Width of the dialog from 768px up — `medium` 480px, `large` 800px.
   * @default "medium"
   */
  size?: DialogRootProps["size"];
  /** Closes the dialog when the user presses outside it. Off by default so typed input isn't lost.
   * @default false
   */
  closeOnInteractOutside?: DialogRootProps["closeOnInteractOutside"];
  /** Closes the dialog with the Esc key.
   * @default true
   */
  closeOnEscape?: DialogRootProps["closeOnEscape"];
};

export type MDXDialogPropsKO = Pick<
  DialogRootProps,
  "open" | "defaultOpen" | "onOpenChange"
> & {
  /** 768px 이상에서 창의 폭 — `medium` 480px, `large` 800px.
   * @default "medium"
   */
  size?: DialogRootProps["size"];
  /** 바깥을 누르면 닫습니다. 입력하던 것을 잃지 않게 기본은 닫지 않습니다.
   * @default false
   */
  closeOnInteractOutside?: DialogRootProps["closeOnInteractOutside"];
  /** Esc 키로 닫습니다.
   * @default true
   */
  closeOnEscape?: DialogRootProps["closeOnEscape"];
};

export type MDXDialogContentProps = {
  /** Title in the header. Without a title, give the content an `aria-label`. */
  title?: DialogContentProps["title"];
  /** Description under the title. */
  description?: DialogContentProps["description"];
  /** Shows the close button in the top-right corner.
   * @default true
   */
  showCloseButton?: DialogContentProps["showCloseButton"];
  /** Stacking order when it overlaps other dialogs or sheets — higher is on top. */
  layerIndex?: DialogContentProps["layerIndex"];
};

export type MDXDialogContentPropsKO = {
  /** 머리의 제목. 제목이 없으면 `aria-label` 을 주세요. */
  title?: DialogContentProps["title"];
  /** 제목 아래의 설명. */
  description?: DialogContentProps["description"];
  /** 오른쪽 위의 닫기 버튼을 보여 줍니다.
   * @default true
   */
  showCloseButton?: DialogContentProps["showCloseButton"];
  /** 다른 창 · 시트와 겹칠 때의 순서 — 클수록 위에 놓입니다. */
  layerIndex?: DialogContentProps["layerIndex"];
};
