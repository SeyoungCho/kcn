import type * as React from "react";
import { Popover as PopoverPrimitive } from "@base-ui/react/popover";
import { XIcon } from "lucide-react";

import { cn } from "@/lib/utils";

// shadcn Popover 에 montage 의 팝오버 모양을 입혔다. 반투명한 판 뒤가 흐려 보인다.
// PopoverHeader 를 넣으면 안내 말풍선 모양(작은 반경 · 좁은 여백 · 폭 상한)이 되고, 아니면 아무 내용이나 담는 판이다.
// 안내 말풍선의 버튼은 PopoverFooter 에, 닫기 버튼은 showCloseButton 으로 단다. 여닫는 움직임은 없다.

type PopoverProps = PopoverPrimitive.Root.Props;

function Popover(props: PopoverProps) {
  return <PopoverPrimitive.Root data-slot="popover" {...props} />;
}

function PopoverTrigger(props: PopoverPrimitive.Trigger.Props) {
  return <PopoverPrimitive.Trigger data-slot="popover-trigger" {...props} />;
}

type PopoverContentProps = PopoverPrimitive.Popup.Props &
  Pick<
    PopoverPrimitive.Positioner.Props,
    "align" | "alignOffset" | "side" | "sideOffset"
  > & {
    /** 오른쪽 위의 닫기 버튼. PopoverHeader 와 함께 쓴다. */
    showCloseButton?: boolean;
  };

// 흐림 · 말풍선 폭 상한은 맞는 토큰이 없어 값을 그대로 쓴다
function PopoverContent({
  className,
  children,
  align = "center",
  alignOffset = 0,
  side = "bottom",
  sideOffset = 10,
  showCloseButton = false,
  ...props
}: PopoverContentProps) {
  return (
    <PopoverPrimitive.Portal>
      <PopoverPrimitive.Positioner
        data-slot="popover-positioner"
        className="isolate z-50"
        align={align}
        alignOffset={alignOffset}
        side={side}
        sideOffset={sideOffset}
        collisionPadding={20}
      >
        <PopoverPrimitive.Popup
          data-slot="popover-content"
          className={cn(
            `group/popover-content relative flex max-w-(--available-width)
            min-w-35 flex-col gap-4 rounded-16 bg-popover/88 p-4
            text-popover-foreground shadow-spread-sm backdrop-blur-[32px]
            outline-none
            has-data-[slot=popover-header]:max-w-[min(360px,var(--available-width))]
            has-data-[slot=popover-header]:gap-0
            has-data-[slot=popover-header]:rounded-12
            has-data-[slot=popover-header]:px-3.5
            has-data-[slot=popover-header]:py-3`,
            className,
          )}
          {...props}
        >
          {children}
          {showCloseButton && (
            <PopoverPrimitive.Close
              data-slot="popover-close"
              className="absolute top-3.75 right-4.25 isolate flex size-4
                cursor-pointer items-center justify-center rounded-8
                text-fg-neutral-primary opacity-61 outline-none
                [--interaction-active:0.09] [--interaction-hover:0.0375]
                after:pointer-events-none after:absolute after:-inset-1
                after:-z-10 after:scale-95 after:rounded-[inherit]
                after:bg-fg-neutral-primary after:opacity-0
                after:transition-[opacity,scale] after:duration-150
                hover:after:scale-100 hover:after:opacity-(--interaction-hover)
                focus-visible:outline-2 focus-visible:outline-ring
                focus-visible:outline-solid active:after:scale-100
                active:after:opacity-(--interaction-active) [&_svg]:size-4
                [&_svg]:shrink-0"
            >
              <XIcon />
              <span className="sr-only">Close</span>
            </PopoverPrimitive.Close>
          )}
        </PopoverPrimitive.Popup>
      </PopoverPrimitive.Positioner>
    </PopoverPrimitive.Portal>
  );
}

// 닫기 버튼이 있으면 그 자리를 비운다
function PopoverHeader({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="popover-header"
      className={cn(
        `flex flex-col gap-1.5
        group-has-[>[data-slot=popover-close]]/popover-content:pr-6.5`,
        className,
      )}
      {...props}
    />
  );
}

// 오른쪽에 붙는 글자 버튼 줄 — 제목이 있으면 설명과 조금 더 가깝다
function PopoverFooter({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="popover-footer"
      className={cn(
        `mt-4 flex h-5 items-center justify-end gap-4
        group-has-data-[slot=popover-title]/popover-content:mt-3`,
        className,
      )}
      {...props}
    />
  );
}

function PopoverTitle({ className, ...props }: PopoverPrimitive.Title.Props) {
  return (
    <PopoverPrimitive.Title
      data-slot="popover-title"
      className={cn(
        "text-body2 font-semibold break-keep wrap-anywhere text-foreground",
        className,
      )}
      {...props}
    />
  );
}

function PopoverDescription({
  className,
  ...props
}: PopoverPrimitive.Description.Props) {
  return (
    <PopoverPrimitive.Description
      data-slot="popover-description"
      className={cn(
        `py-0.5 text-label2 font-medium break-keep wrap-anywhere
        text-fg-neutral-secondary`,
        className,
      )}
      {...props}
    />
  );
}

export {
  Popover,
  PopoverContent,
  PopoverDescription,
  PopoverFooter,
  PopoverHeader,
  PopoverTitle,
  PopoverTrigger,
  type PopoverContentProps,
  type PopoverProps,
};
