import type {
  BottomSheetContentProps,
  BottomSheetRootProps,
} from "@repo/seed/ui/bottom-sheet";

export type MDXBottomSheetProps = Pick<
  BottomSheetRootProps,
  "open" | "onOpenChange"
> & {
  /** Initial open state when uncontrolled.
   * @default false
   */
  defaultOpen?: BottomSheetRootProps["defaultOpen"];
  /** Closes the sheet when the user presses outside it.
   * @default true
   */
  closeOnInteractOutside?: BottomSheetRootProps["closeOnInteractOutside"];
  /** Closes the sheet with the Esc key.
   * @default true
   */
  closeOnEscape?: BottomSheetRootProps["closeOnEscape"];
};

export type MDXBottomSheetPropsKO = Pick<
  BottomSheetRootProps,
  "open" | "onOpenChange"
> & {
  /** 제어하지 않을 때 처음 열림 상태.
   * @default false
   */
  defaultOpen?: BottomSheetRootProps["defaultOpen"];
  /** 바깥을 누르면 닫습니다.
   * @default true
   */
  closeOnInteractOutside?: BottomSheetRootProps["closeOnInteractOutside"];
  /** Esc 키로 닫습니다.
   * @default true
   */
  closeOnEscape?: BottomSheetRootProps["closeOnEscape"];
};

export type MDXBottomSheetContentProps = {
  /** Title in the header. Without a title, give the content an `aria-label`. */
  title?: BottomSheetContentProps["title"];
  /** Description under the title. */
  description?: BottomSheetContentProps["description"];
  /** Shows the close button in the top-right corner.
   * @default true
   */
  showCloseButton?: BottomSheetContentProps["showCloseButton"];
  /** Shows the drag handle at the top center.
   * @default false
   */
  showHandle?: BottomSheetContentProps["showHandle"];
  /** Stacking order when it overlaps other dialogs or sheets — higher is on top. */
  layerIndex?: BottomSheetContentProps["layerIndex"];
};

export type MDXBottomSheetContentPropsKO = {
  /** 머리의 제목. 제목이 없으면 `aria-label` 을 주세요. */
  title?: BottomSheetContentProps["title"];
  /** 제목 아래의 설명. */
  description?: BottomSheetContentProps["description"];
  /** 오른쪽 위의 닫기 버튼을 보여 줍니다.
   * @default true
   */
  showCloseButton?: BottomSheetContentProps["showCloseButton"];
  /** 위쪽 가운데의 손잡이를 보여 줍니다.
   * @default false
   */
  showHandle?: BottomSheetContentProps["showHandle"];
  /** 다른 창 · 시트와 겹칠 때의 순서 — 클수록 위에 놓입니다. */
  layerIndex?: BottomSheetContentProps["layerIndex"];
};
