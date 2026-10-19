import * as React from "react";
import { Drawer as DrawerPrimitive } from "@base-ui/react/drawer";

import { ActionButton } from "@/components/ui/action-button";
import type { ActionButtonProps } from "@/components/ui/action-button";
import {
  BottomSheetBody,
  BottomSheetContent,
  BottomSheetFooter,
  BottomSheetRoot,
  BottomSheetTrigger,
} from "@/components/ui/bottom-sheet";
import type {
  BottomSheetBodyProps,
  BottomSheetContentProps,
  BottomSheetFooterProps,
  BottomSheetRootProps,
  BottomSheetTriggerProps,
} from "@/components/ui/bottom-sheet";
import {
  DialogAction,
  DialogBody,
  DialogContent,
  DialogFooter,
  DialogRoot,
  DialogTrigger,
} from "@/components/ui/dialog";
import type {
  DialogBodyProps,
  DialogContentProps,
  DialogFooterProps,
  DialogRootProps,
  DialogTriggerProps,
} from "@/components/ui/dialog";
import { MOBILE, useMediaQuery } from "@/lib/use-media-query";
import { cn } from "@/lib/utils";

// 화면 폭에 따라 모양을 바꾸는 창 — 768px 이상은 가운데 뜨는 창(Dialog), 767px 이하는 아래에서 올라오는 시트(BottomSheet).
// 열려 있는 동안 폭이 경계를 넘으면 열린 채로 다른 모양으로 바뀐다. 두 모양이 서로 다른 뿌리라 열림은 여기서 쥔다.

interface ResponsiveDialogContextValue {
  /** 지금 시트로 그리는지 — 푸터의 버튼을 늘릴지 같은 것을 정할 때 본다 */
  shouldUseBottomSheet: boolean;
}

const ResponsiveDialogContext =
  React.createContext<ResponsiveDialogContextValue | null>(null);

function useResponsiveDialogContext() {
  const context = React.useContext(ResponsiveDialogContext);
  if (!context)
    throw new Error(
      "ResponsiveDialog 의 부품은 ResponsiveDialogRoot 안에서 쓴다.",
    );
  return context;
}

type SharedRootKeys = "children" | "open" | "defaultOpen" | "onOpenChange";

export interface ResponsiveDialogRootProps {
  children?: React.ReactNode;
  open?: boolean;
  defaultOpen?: boolean;
  /** 열림만 알린다 — 어느 모양에서 닫혔는지는 알리지 않는다 */
  onOpenChange?: (open: boolean) => void;
  /** 창(768px 이상)에만 넘길 것 — size · closeOnInteractOutside(기본 false) · closeOnEscape … */
  dialogRootProps?: Omit<DialogRootProps, SharedRootKeys>;
  /** 시트(767px 이하)에만 넘길 것 — closeOnInteractOutside(기본 true) · closeOnEscape … */
  bottomSheetRootProps?: Omit<BottomSheetRootProps, SharedRootKeys>;
}

function ResponsiveDialogRoot({
  children,
  open: openProp,
  defaultOpen = false,
  onOpenChange,
  dialogRootProps,
  bottomSheetRootProps,
}: ResponsiveDialogRootProps) {
  const shouldUseBottomSheet = useMediaQuery(MOBILE);
  const [innerOpen, setInnerOpen] = React.useState(defaultOpen);
  const open = openProp ?? innerOpen;

  const setOpen = (next: boolean) => {
    if (next === open) return;
    if (openProp === undefined) setInnerOpen(next);
    onOpenChange?.(next);
  };

  const context = React.useMemo(
    () => ({ shouldUseBottomSheet }),
    [shouldUseBottomSheet],
  );
  return (
    <ResponsiveDialogContext value={context}>
      {shouldUseBottomSheet ? (
        <BottomSheetRoot
          {...bottomSheetRootProps}
          open={open}
          onOpenChange={setOpen}
        >
          {children}
        </BottomSheetRoot>
      ) : (
        <DialogRoot {...dialogRootProps} open={open} onOpenChange={setOpen}>
          {children}
        </DialogRoot>
      )}
    </ResponsiveDialogContext>
  );
}

export type ResponsiveDialogTriggerProps = DialogTriggerProps &
  BottomSheetTriggerProps;

function ResponsiveDialogTrigger(props: ResponsiveDialogTriggerProps) {
  const { shouldUseBottomSheet } = useResponsiveDialogContext();
  return shouldUseBottomSheet ? (
    <BottomSheetTrigger {...props} />
  ) : (
    <DialogTrigger {...props} />
  );
}

export interface ResponsiveDialogContentProps
  extends
    Omit<DialogContentProps, "ref">,
    Pick<BottomSheetContentProps, "showHandle"> {
  ref?: React.Ref<HTMLDivElement>;
}

/**
 * 창 · 시트의 몸통. 제목이 없으면 aria-label 을 준다. 손잡이(showHandle)는 시트일 때만 그린다.
 * 시트는 화면 위를 조금(40px) 남기고 그보다 키가 크면 본문(ResponsiveDialogBody)만 스크롤된다 — 가운데 창(최대 80%)과 같게 머리 · 버튼 줄은 늘 보인다.
 */
function ResponsiveDialogContent({
  showHandle,
  className,
  ...props
}: ResponsiveDialogContentProps) {
  const { shouldUseBottomSheet } = useResponsiveDialogContext();
  return shouldUseBottomSheet ? (
    <BottomSheetContent
      showHandle={showHandle}
      className={cn("max-h-[calc(100dvh-var(--dimension-x10))]", className)}
      {...(props as Omit<BottomSheetContentProps, "showHandle" | "className">)}
    />
  ) : (
    <DialogContent className={className} {...props} />
  );
}

export type ResponsiveDialogBodyProps = DialogBodyProps & BottomSheetBodyProps;

function ResponsiveDialogBody({
  className,
  ...props
}: ResponsiveDialogBodyProps) {
  const { shouldUseBottomSheet } = useResponsiveDialogContext();
  return shouldUseBottomSheet ? (
    // 시트의 본문은 넘치면 스크롤 — 시트를 끌어내리는 손짓이 본문의 스크롤 · 누름을 가로채지 않게 한다(data-base-ui-swipe-ignore)
    <BottomSheetBody
      data-base-ui-swipe-ignore=""
      className={cn(
        "min-h-0 flex-1 touch-pan-y overflow-y-auto overscroll-contain",
        className,
      )}
      {...props}
    />
  ) : (
    <DialogBody className={className} {...props} />
  );
}

export type ResponsiveDialogFooterProps = DialogFooterProps &
  BottomSheetFooterProps;

function ResponsiveDialogFooter(props: ResponsiveDialogFooterProps) {
  const { shouldUseBottomSheet } = useResponsiveDialogContext();
  return shouldUseBottomSheet ? (
    <BottomSheetFooter {...props} />
  ) : (
    <DialogFooter {...props} />
  );
}

export type ResponsiveDialogActionProps = ActionButtonProps;

/** 누르면 창(또는 시트)이 닫히는 버튼 */
function ResponsiveDialogAction(props: ResponsiveDialogActionProps) {
  const { shouldUseBottomSheet } = useResponsiveDialogContext();
  return shouldUseBottomSheet ? (
    <DrawerPrimitive.Close render={<ActionButton {...props} />} />
  ) : (
    <DialogAction {...props} />
  );
}

export {
  ResponsiveDialogRoot,
  ResponsiveDialogTrigger,
  ResponsiveDialogContent,
  ResponsiveDialogBody,
  ResponsiveDialogFooter,
  ResponsiveDialogAction,
  useResponsiveDialogContext,
};
