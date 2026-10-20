import { Accordion as AccordionPrimitive } from "@base-ui/react/accordion";
import { ChevronDownIcon } from "lucide-react";

import { cn } from "@/lib/utils";

// shadcn Accordion 에 t-flavored 의 모양을 입혔다.
// 줄 사이에는 왼쪽 24px 을 띄운 머리카락 선이 깔리고, 펼친 줄과 마지막 줄에서는 사라진다.
// 펼치면 제목이 파랗고 조금 굵어지며 화살표가 위로 돈다. 내용은 옅은 파란 바탕 위에 펼쳐진다.
// 누르면 제목 줄이 0.96 으로 줄고 둥근 회색 바탕이 깔린다.
// 움직임의 시간 · 이징은 토큰이 없어 클래스에 값을 바로 적었다(스프링은 ease-out-quint 로 근사).
// 제목 앞 프리픽스("Q")는 글자를 두어 만든다 — <AccordionTrigger><span className="text-primary">Q</span>제목</AccordionTrigger>.

type AccordionProps = AccordionPrimitive.Root.Props;

function Accordion({ className, ...props }: AccordionProps) {
  return (
    <AccordionPrimitive.Root
      data-slot="accordion"
      className={cn("flex w-full flex-col", className)}
      {...props}
    />
  );
}

type AccordionItemProps = AccordionPrimitive.Item.Props;

function AccordionItem({ className, ...props }: AccordionItemProps) {
  return (
    <AccordionPrimitive.Item
      data-slot="accordion-item"
      className={cn("group/accordion-item", className)}
      {...props}
    />
  );
}

type AccordionTriggerProps = AccordionPrimitive.Trigger.Props;

function AccordionTrigger({
  className,
  children,
  ...props
}: AccordionTriggerProps) {
  return (
    <AccordionPrimitive.Header data-slot="accordion-header" className="flex">
      <AccordionPrimitive.Trigger
        data-slot="accordion-trigger"
        className={cn(
          `group/accordion-trigger relative isolate flex flex-1 cursor-pointer
          items-center gap-4 bg-background py-4 pr-4 pl-6 text-left text-t5
          leading-[1.35] text-foreground outline-none select-none
          transition-[scale] duration-250 ease-[ease-out] before:absolute
          before:inset-x-1.5 before:inset-y-1 before:-z-1 before:rounded-lg
          before:bg-grey-opacity-100 before:opacity-0 before:transition-opacity
          before:duration-250 before:ease-[ease-out] after:absolute
          after:right-0 after:bottom-0 after:left-6 after:h-px after:bg-hairline
          focus-visible:ring-3 focus-visible:ring-ring/50
          focus-visible:ring-inset active:scale-[0.96] active:before:opacity-100
          data-disabled:pointer-events-none data-disabled:opacity-30
          data-panel-open:font-medium data-panel-open:text-primary
          data-panel-open:after:hidden group-last/accordion-item:after:hidden`,
          className,
        )}
        {...props}
      >
        <span
          data-slot="accordion-trigger-label"
          className="flex flex-1 items-start gap-2 break-keep"
        >
          {children}
        </span>
        <ChevronDownIcon
          data-slot="accordion-trigger-icon"
          aria-hidden
          className="pointer-events-none size-6 shrink-0 text-grey-400
            transition-[rotate,color] duration-500
            ease-[cubic-bezier(0.22,1,0.36,1)]
            group-data-panel-open/accordion-trigger:-rotate-180
            group-data-panel-open/accordion-trigger:text-grey-600"
        />
      </AccordionPrimitive.Trigger>
    </AccordionPrimitive.Header>
  );
}

type AccordionContentProps = AccordionPrimitive.Panel.Props;

// 높이는 ease-out-quint 500ms 로 열고 닫는다. 투명도는 높이를 따라가게 열 때는 ease 400ms 로 늦게,
// 닫을 때는 ease-out-quint 300ms 로 먼저 사라진다.
function AccordionContent({
  className,
  children,
  ...props
}: AccordionContentProps) {
  return (
    <AccordionPrimitive.Panel
      data-slot="accordion-content"
      className="h-(--accordion-panel-height) overflow-hidden bg-blue-500/4
        [transition:height_500ms_cubic-bezier(0.22,1,0.36,1),opacity_400ms_ease]
        data-ending-style:h-0 data-ending-style:opacity-0
        data-ending-style:[transition:height_500ms_cubic-bezier(0.22,1,0.36,1),opacity_300ms_cubic-bezier(0.22,1,0.36,1)]
        data-starting-style:h-0 data-starting-style:opacity-0"
      {...props}
    >
      <div
        data-slot="accordion-content-inner"
        className={cn(
          `px-6 py-4 text-t6 break-keep text-grey-700
          [&_p:not(:last-child)]:mb-4`,
          className,
        )}
      >
        {children}
      </div>
    </AccordionPrimitive.Panel>
  );
}

export {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
  type AccordionProps,
  type AccordionItemProps,
  type AccordionTriggerProps,
  type AccordionContentProps,
};
