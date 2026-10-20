"use client";

import { Select as SelectPrimitive } from "@base-ui/react/select";
import { cva, type VariantProps } from "class-variance-authority";
import { CheckIcon, ChevronDownIcon } from "lucide-react";

import { cn } from "@/lib/utils";

// shadcn Select 에 montage 의 모양을 입혔다. 여러 개를 고를 때는 Select 에 multiple 을 준다.
// 버튼은 입력 칸과 같은 틀이다 — 누르거나 열려 있으면 파란 테두리와 옅은 바깥 띠가 생긴다.
// 목록은 버튼 아래에 버튼과 같은 너비로 열린다(고른 항목을 버튼 위에 겹치지 않는다).
// 항목은 마우스를 올리거나 누르면 옅은 막(::after)이 깔리고, 키보드로 옮기면 조금 더 진한 막이 깔린다.

type SelectProps<
  Value,
  Multiple extends boolean | undefined = false,
> = SelectPrimitive.Root.Props<Value, Multiple>;

const Select = SelectPrimitive.Root;

type SelectGroupProps = SelectPrimitive.Group.Props;

function SelectGroup({ className, ...props }: SelectGroupProps) {
  return (
    <SelectPrimitive.Group
      data-slot="select-group"
      className={cn("flex flex-col gap-1", className)}
      {...props}
    />
  );
}

type SelectValueProps = SelectPrimitive.Value.Props;

function SelectValue({ className, ...props }: SelectValueProps) {
  return (
    <SelectPrimitive.Value
      data-slot="select-value"
      className={cn("min-w-0 flex-1 truncate px-1 text-left", className)}
      {...props}
    />
  );
}

// 높이는 여백과 글자 줄 높이로 정해진다 — default 가 sm 보다 한 단계 크다.
const selectTriggerVariants = cva(
  `group/select-trigger relative flex w-full min-w-0 cursor-pointer items-center
  gap-0.5 bg-effect-transparent-primary font-normal text-fg-neutral-primary
  inset-ring inset-ring-line-neutral-secondary backdrop-blur-[32px]
  transition-shadow duration-200 outline-none select-none
  focus:inset-ring-line-brand-strong focus:ring-4 focus:ring-line-brand-focus
  data-placeholder:text-fg-neutral-tertiary
  data-popup-open:inset-ring-line-brand-strong data-popup-open:ring-4
  data-popup-open:ring-line-brand-focus
  aria-invalid:inset-ring-line-negative-primary
  aria-invalid:focus:inset-ring-line-negative-strong
  aria-invalid:focus:ring-line-negative-focus
  aria-invalid:data-popup-open:inset-ring-line-negative-strong
  aria-invalid:data-popup-open:ring-line-negative-focus
  data-disabled:cursor-default data-disabled:bg-surface-neutral-tertiary
  data-disabled:inset-ring-line-neutral-tertiary
  data-disabled:backdrop-blur-none
  data-disabled:data-placeholder:text-fg-disable-primary
  [&>svg]:pointer-events-none [&>svg]:shrink-0
  [&>svg:not([class*='text-'])]:text-fg-neutral-tertiary`,
  {
    variants: {
      size: {
        default: `rounded-14 p-3 text-body2 *:data-[slot=select-value]:py-px
        [&>svg]:mx-0.5 [&>svg:not([class*='size-'])]:size-5`,
        sm: `rounded-12 px-2.5 py-2 text-label1
        *:data-[slot=select-value]:py-0.5 [&>svg]:mx-px
        [&>svg:not([class*='size-'])]:size-4.5`,
      },
    },
    defaultVariants: {
      size: "default",
    },
  },
);

type SelectTriggerProps = SelectPrimitive.Trigger.Props &
  VariantProps<typeof selectTriggerVariants>;

function SelectTrigger({
  className,
  size = "default",
  children,
  ...props
}: SelectTriggerProps) {
  return (
    <SelectPrimitive.Trigger
      data-slot="select-trigger"
      data-size={size}
      className={cn(selectTriggerVariants({ size, className }))}
      {...props}
    >
      {children}
      <SelectPrimitive.Icon
        data-slot="select-icon"
        className="flex h-6 w-6 shrink-0 items-center justify-center
          text-fg-neutral-tertiary
          group-data-disabled/select-trigger:text-fg-disable-primary
          group-data-[size=sm]/select-trigger:w-5"
      >
        <ChevronDownIcon
          strokeWidth={2.5}
          className="pointer-events-none size-4
            group-data-popup-open/select-trigger:rotate-180"
        />
      </SelectPrimitive.Icon>
    </SelectPrimitive.Trigger>
  );
}

type SelectContentProps = SelectPrimitive.Popup.Props &
  Pick<
    SelectPrimitive.Positioner.Props,
    "align" | "alignOffset" | "side" | "sideOffset" | "alignItemWithTrigger"
  >;

// 목록은 정해진 높이(또는 화면에 남은 높이)까지 자라고, 넘치면 안에서 얇은 스크롤 막대로 스크롤된다
function SelectContent({
  className,
  children,
  side = "bottom",
  sideOffset = 8,
  align = "center",
  alignOffset = 0,
  alignItemWithTrigger = false,
  ...props
}: SelectContentProps) {
  return (
    <SelectPrimitive.Portal>
      <SelectPrimitive.Positioner
        data-slot="select-positioner"
        side={side}
        sideOffset={sideOffset}
        align={align}
        alignOffset={alignOffset}
        alignItemWithTrigger={alignItemWithTrigger}
        className="isolate z-50 outline-none"
      >
        <SelectPrimitive.Popup
          data-slot="select-content"
          className={cn(
            `relative max-h-[min(--spacing(100),var(--available-height))]
            w-(--anchor-width) min-w-35 origin-(--transform-origin)
            overflow-x-hidden overflow-y-auto overscroll-contain rounded-16
            [scrollbar-width:thin] border border-line-neutral-secondary-opaque
            bg-popover text-popover-foreground shadow-sm outline-none`,
            className,
          )}
          {...props}
        >
          <SelectPrimitive.List
            data-slot="select-list"
            className="flex flex-col gap-1 py-2"
          >
            {children}
          </SelectPrimitive.List>
        </SelectPrimitive.Popup>
      </SelectPrimitive.Positioner>
    </SelectPrimitive.Portal>
  );
}

type SelectLabelProps = SelectPrimitive.GroupLabel.Props;

// 목록을 내려도 묶음 이름은 위에 붙어 있다
function SelectLabel({ className, ...props }: SelectLabelProps) {
  return (
    <SelectPrimitive.GroupLabel
      data-slot="select-label"
      className={cn(
        `sticky top-0 z-10 bg-popover px-5 py-1 text-caption1 font-semibold
        text-fg-neutral-tertiary`,
        className,
      )}
      {...props}
    />
  );
}

// 막은 항목보다 양옆으로 조금 넓다. 고르면 default 는 글자가 파래지고 오른쪽에 체크가,
// radio · checkbox 는 왼쪽 동그라미 · 네모가 채워진다.
const selectItemVariants = cva(
  `group/select-item relative isolate mx-5 flex cursor-pointer items-start gap-2
  py-3 text-body2 font-medium text-fg-neutral-primary outline-none select-none
  [--interaction-active:0.09] [--interaction-hover:0.0375]
  after:pointer-events-none after:absolute after:inset-y-0 after:-inset-x-3
  after:-z-10 after:rounded-16 after:bg-fg-neutral-primary after:opacity-0
  after:transition-opacity after:duration-150
  hover:after:opacity-(--interaction-hover) focus-visible:after:opacity-6
  active:after:opacity-(--interaction-active) data-disabled:pointer-events-none
  data-disabled:cursor-default data-disabled:text-fg-disable-primary`,
  {
    variants: {
      variant: {
        default:
          "data-selected:font-semibold data-selected:text-fg-brand-primary",
        radio: "",
        checkbox: "",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  },
);

// 동그라미 · 네모의 테두리 1.5px 와 네모의 반경 5px 은 맞는 토큰이 없어 값을 그대로 쓴다
const selectItemControlVariants = cva(
  `flex shrink-0 items-center justify-center bg-bg-neutral-primary text-white
  inset-ring-[1.5px] inset-ring-line-neutral-primary
  group-data-disabled/select-item:opacity-43
  group-data-selected/select-item:bg-primary`,
  {
    variants: {
      variant: {
        radio: `my-0.5 size-5 rounded-full after:size-2 after:rounded-full
        after:bg-white after:opacity-0
        group-data-selected/select-item:inset-ring-0
        group-data-selected/select-item:after:opacity-100`,
        checkbox: `mx-px my-0.75 size-4.5 rounded-[5px]
        transition-[background-color,box-shadow] duration-200
        group-data-selected/select-item:inset-ring-primary`,
      },
    },
  },
);

type SelectItemProps = SelectPrimitive.Item.Props &
  VariantProps<typeof selectItemVariants>;

function SelectItem({
  className,
  variant = "default",
  children,
  ...props
}: SelectItemProps) {
  return (
    <SelectPrimitive.Item
      data-slot="select-item"
      data-variant={variant}
      className={cn(selectItemVariants({ variant, className }))}
      {...props}
    >
      {variant !== "default" && (
        <span
          data-slot="select-item-control"
          aria-hidden
          className={selectItemControlVariants({ variant })}
        >
          {variant === "checkbox" && (
            <CheckIcon
              strokeWidth={3}
              className="size-4 scale-75 opacity-0 transition-[opacity,scale]
                duration-200 group-data-selected/select-item:scale-100
                group-data-selected/select-item:opacity-100"
            />
          )}
        </span>
      )}
      <SelectPrimitive.ItemText
        data-slot="select-item-text"
        className="min-w-0 flex-1 py-px break-keep"
      >
        {children}
      </SelectPrimitive.ItemText>
      {variant === "default" && (
        <SelectPrimitive.ItemIndicator
          data-slot="select-item-indicator"
          className="flex h-6 shrink-0 items-center text-fg-brand-primary
            group-data-disabled/select-item:text-fg-disable-primary"
        >
          <CheckIcon
            strokeWidth={1.8}
            className="pointer-events-none size-5.5"
          />
        </SelectPrimitive.ItemIndicator>
      )}
    </SelectPrimitive.Item>
  );
}

type SelectSeparatorProps = SelectPrimitive.Separator.Props;

function SelectSeparator({ className, ...props }: SelectSeparatorProps) {
  return (
    <SelectPrimitive.Separator
      data-slot="select-separator"
      className={cn(
        "pointer-events-none mx-5 my-1 h-px shrink-0 bg-line-neutral-tertiary",
        className,
      )}
      {...props}
    />
  );
}

export {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectSeparator,
  SelectTrigger,
  SelectValue,
  selectItemVariants,
  selectTriggerVariants,
  type SelectContentProps,
  type SelectGroupProps,
  type SelectItemProps,
  type SelectLabelProps,
  type SelectProps,
  type SelectSeparatorProps,
  type SelectTriggerProps,
  type SelectValueProps,
};
