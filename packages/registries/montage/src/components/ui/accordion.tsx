import { Accordion as AccordionPrimitive } from "@base-ui/react/accordion";
import { cva, type VariantProps } from "class-variance-authority";
import { ChevronDownIcon } from "lucide-react";

import { cn } from "@/lib/utils";

// shadcn Accordion 에 montage 의 모양을 입혔다.
//   variant — default 는 좌우 여백 없이 쓰고, 마우스를 올리면 둥근 막이 양옆으로 조금 넓게 깔린다.
//             full 은 좌우 여백을 두고 막이 줄 너비를 꽉 채운다.
//   size — 제목 줄의 위아래 여백 sm · default · lg (8 · 12 · 16px). 기본은 lg.
// 줄 사이에는 머리카락 선이 깔리고 마지막 줄에서는 빠진다. 접힌 줄에 마우스를 올리거나 누르면 선이 사라진다.
// 펼치면 화살표가 뒤집히고 높이가 늘어난다. 움직임의 시간 · 이징은 토큰이 없어 값을 바로 적었다.
// 제목 앞 아이콘은 글자 앞에 두면 된다 — <AccordionTrigger><InfoIcon />제목</AccordionTrigger>.
const accordionVariants = cva("group/accordion flex w-full flex-col", {
  variants: {
    variant: {
      default: "[--accordion-px:0px]",
      full: "[--accordion-px:--spacing(5)]",
    },
    size: {
      sm: "[--accordion-py:--spacing(2)]",
      default: "[--accordion-py:--spacing(3)]",
      lg: "[--accordion-py:--spacing(4)]",
    },
  },
  defaultVariants: {
    variant: "default",
    size: "lg",
  },
});

type AccordionProps = AccordionPrimitive.Root.Props &
  VariantProps<typeof accordionVariants>;

function Accordion({
  className,
  variant = "default",
  size = "lg",
  ...props
}: AccordionProps) {
  return (
    <AccordionPrimitive.Root
      data-slot="accordion"
      data-variant={variant}
      data-size={size}
      className={cn(accordionVariants({ variant, size }), className)}
      {...props}
    />
  );
}

type AccordionItemProps = AccordionPrimitive.Item.Props;

function AccordionItem({ className, ...props }: AccordionItemProps) {
  return (
    <AccordionPrimitive.Item
      data-slot="accordion-item"
      className={cn(
        `group/accordion-item relative after:pointer-events-none after:absolute
        after:inset-x-(--accordion-px) after:bottom-0 after:h-px
        after:bg-line-neutral-tertiary after:transition-opacity
        after:duration-300 after:ease-[ease] last:after:hidden
        not-data-open:not-data-disabled:hover:after:opacity-0
        not-data-open:not-data-disabled:active:after:opacity-0`,
        className,
      )}
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
          items-start gap-2 rounded-16 px-(--accordion-px) py-(--accordion-py)
          text-left text-body2 font-semibold text-fg-neutral-primary
          outline-none select-none [--interaction-active:0.09]
          [--interaction-hover:0.0375] after:pointer-events-none after:absolute
          after:inset-y-0 after:-inset-x-3 after:-z-10 after:rounded-[inherit]
          after:bg-fg-neutral-primary after:opacity-0 after:transition-opacity
          after:duration-150 after:ease-[ease]
          hover:after:opacity-(--interaction-hover) focus-visible:outline-2
          focus-visible:outline-ring focus-visible:outline-solid
          active:after:opacity-(--interaction-active)
          data-disabled:pointer-events-none data-disabled:cursor-default
          data-disabled:text-fg-disable-primary
          data-disabled:[&_svg]:text-fg-disable-primary
          group-data-[variant=full]/accordion:rounded-none
          group-data-[variant=full]/accordion:after:inset-x-0`,
          className,
        )}
        {...props}
      >
        <span
          data-slot="accordion-trigger-label"
          className="flex flex-1 items-start gap-3 py-px break-keep
            wrap-anywhere [&>svg]:my-px [&>svg]:shrink-0
            [&>svg]:text-fg-neutral-tertiary
            [&>svg:not([class*='size-'])]:size-5"
        >
          {children}
        </span>
        <ChevronDownIcon
          data-slot="accordion-trigger-icon"
          aria-hidden
          className="pointer-events-none my-0.5 size-5 shrink-0
            transition-transform duration-300 ease-[ease]
            group-data-panel-open/accordion-trigger:rotate-180"
        />
      </AccordionPrimitive.Trigger>
    </AccordionPrimitive.Header>
  );
}

type AccordionContentProps = AccordionPrimitive.Panel.Props;

// 제목 글자와 내용 사이는 크기와 상관없이 16px 로 맞춘다 — 제목 줄의 아래 여백만큼 위 여백을 덜어 낸다.
function AccordionContent({
  className,
  children,
  ...props
}: AccordionContentProps) {
  return (
    <AccordionPrimitive.Panel
      data-slot="accordion-content"
      className="h-(--accordion-panel-height) overflow-hidden
        transition-[height] duration-300 ease-[ease] data-ending-style:h-0
        data-starting-style:h-0"
      {...props}
    >
      <div
        data-slot="accordion-content-inner"
        className={cn(
          `px-(--accordion-px) pt-[calc(--spacing(4)-var(--accordion-py))]
          pb-(--accordion-py) text-label1 text-fg-neutral-secondary break-keep
          wrap-anywhere`,
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
  accordionVariants,
  type AccordionProps,
  type AccordionItemProps,
  type AccordionTriggerProps,
  type AccordionContentProps,
};
