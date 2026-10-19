import type {
  ResponsiveDialogContentProps,
  ResponsiveDialogRootProps,
} from "@repo/seed/ui/responsive-dialog";

export type MDXResponsiveDialogProps = {
  /** Controlled open state. */
  open?: ResponsiveDialogRootProps["open"];
  /** Initial open state when uncontrolled.
   * @default false
   */
  defaultOpen?: ResponsiveDialogRootProps["defaultOpen"];
  /** Called with the next open state. It doesn't say which form was closed. */
  onOpenChange?: ResponsiveDialogRootProps["onOpenChange"];
  /** Props passed only to the dialog (768px and up) — `size`, `closeOnInteractOutside` (default `false`), `closeOnEscape`, … */
  dialogRootProps?: ResponsiveDialogRootProps["dialogRootProps"];
  /** Props passed only to the bottom sheet (767px and below) — `closeOnInteractOutside` (default `true`), `closeOnEscape`, … */
  bottomSheetRootProps?: ResponsiveDialogRootProps["bottomSheetRootProps"];
};

export type MDXResponsiveDialogPropsKO = {
  /** 제어되는 열림 상태. */
  open?: ResponsiveDialogRootProps["open"];
  /** 제어하지 않을 때 처음 열림 상태.
   * @default false
   */
  defaultOpen?: ResponsiveDialogRootProps["defaultOpen"];
  /** 바뀐 열림 상태를 알립니다. 어느 모양에서 닫혔는지는 알리지 않습니다. */
  onOpenChange?: ResponsiveDialogRootProps["onOpenChange"];
  /** 창(768px 이상)에만 넘길 값 — `size` · `closeOnInteractOutside`(기본 `false`) · `closeOnEscape` … */
  dialogRootProps?: ResponsiveDialogRootProps["dialogRootProps"];
  /** 시트(767px 이하)에만 넘길 값 — `closeOnInteractOutside`(기본 `true`) · `closeOnEscape` … */
  bottomSheetRootProps?: ResponsiveDialogRootProps["bottomSheetRootProps"];
};

export type MDXResponsiveDialogContentProps = {
  /** Title in the header. Without a title, give the content an `aria-label`. */
  title?: ResponsiveDialogContentProps["title"];
  /** Description under the title. */
  description?: ResponsiveDialogContentProps["description"];
  /** Shows the close button in the top-right corner.
   * @default true
   */
  showCloseButton?: ResponsiveDialogContentProps["showCloseButton"];
  /** Shows the drag handle at the top. Only drawn as a bottom sheet.
   * @default false
   */
  showHandle?: ResponsiveDialogContentProps["showHandle"];
  /** Stacking order when it overlaps other dialogs or sheets — higher is on top. */
  layerIndex?: ResponsiveDialogContentProps["layerIndex"];
};

export type MDXResponsiveDialogContentPropsKO = {
  /** 머리의 제목. 제목이 없으면 `aria-label` 을 주세요. */
  title?: ResponsiveDialogContentProps["title"];
  /** 제목 아래의 설명. */
  description?: ResponsiveDialogContentProps["description"];
  /** 오른쪽 위의 닫기 버튼을 보여 줍니다.
   * @default true
   */
  showCloseButton?: ResponsiveDialogContentProps["showCloseButton"];
  /** 위쪽 가운데의 손잡이를 보여 줍니다. 시트일 때만 그립니다.
   * @default false
   */
  showHandle?: ResponsiveDialogContentProps["showHandle"];
  /** 다른 창 · 시트와 겹칠 때의 순서 — 클수록 위에 놓입니다. */
  layerIndex?: ResponsiveDialogContentProps["layerIndex"];
};
