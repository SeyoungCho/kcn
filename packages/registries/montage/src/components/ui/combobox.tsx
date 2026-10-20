"use client";

import * as React from "react";
import { Combobox as ComboboxPrimitive } from "@base-ui/react/combobox";
import { cva, type VariantProps } from "class-variance-authority";
import { CheckIcon, ChevronDownIcon, XIcon } from "lucide-react";

import { cn } from "@/lib/utils";

// shadcn Combobox 에 montage 의 모양을 입혔다. 입력 칸은 Input 과 같은 틀이고, 목록은 Select 의 목록과 같다.
// 글자를 치면 목록이 걸러지고, 키보드 · 마우스로 가리킨 항목에 옅은 막(::after)이 깔린다.
// 여러 개를 고를 때는 ComboboxChips 안에 ComboboxChip 과 ComboboxChipsInput 을 둔다.

type ComboboxProps<
  Value,
  Multiple extends boolean | undefined = false,
  Item = Value,
> = ComboboxPrimitive.Root.Props<Value, Multiple, Item>;

const Combobox = ComboboxPrimitive.Root;

type ComboboxValueProps = ComboboxPrimitive.Value.Props;

function ComboboxValue(props: ComboboxValueProps) {
  return <ComboboxPrimitive.Value data-slot="combobox-value" {...props} />;
}

// 입력 칸 안의 아이콘 버튼 — 아이콘보다 조금 넓은 막이 깔린다
const comboboxIconButtonClassName = `relative isolate flex size-6 shrink-0
  cursor-pointer items-center justify-center outline-none after:absolute
  after:-inset-1 after:-z-10 after:rounded-10 after:bg-fg-neutral-primary
  after:opacity-0 after:transition-opacity after:duration-150
  hover:after:opacity-5 active:after:opacity-12 disabled:pointer-events-none
  disabled:text-fg-disable-primary group-data-[size=sm]/combobox-field:size-5
  group-data-[size=sm]/combobox-field:after:rounded-8`;

type ComboboxTriggerProps = ComboboxPrimitive.Trigger.Props;

function ComboboxTrigger({
  className,
  children,
  ...props
}: ComboboxTriggerProps) {
  return (
    <ComboboxPrimitive.Trigger
      data-slot="combobox-trigger"
      className={cn(
        "group/combobox-trigger text-fg-neutral-tertiary",
        comboboxIconButtonClassName,
        className,
      )}
      {...props}
    >
      {children}
      <ChevronDownIcon
        strokeWidth={2.5}
        className="pointer-events-none size-4
          group-data-popup-open/combobox-trigger:rotate-180"
      />
    </ComboboxPrimitive.Trigger>
  );
}

type ComboboxClearProps = ComboboxPrimitive.Clear.Props;

// lucide 에는 속이 찬 원 안의 X 가 없어 직접 그린다
function ComboboxClear({ className, children, ...props }: ComboboxClearProps) {
  return (
    <ComboboxPrimitive.Clear
      data-slot="combobox-clear"
      className={cn(
        "text-fg-neutral-quaternary",
        comboboxIconButtonClassName,
        className,
      )}
      {...props}
    >
      {children ?? (
        <svg
          aria-hidden
          viewBox="0 0 24 24"
          fill="currentColor"
          className="pointer-events-none size-5
            group-data-[size=sm]/combobox-field:size-4.5"
        >
          <path
            fillRule="evenodd"
            d="M12 2.1a9.9 9.9 0 1 0 0 19.8 9.9 9.9 0 1 0 0-19.8ZM8.68 16.6 12 13.27l3.32 3.33 1.28-1.28L13.27 12l3.33-3.32-1.28-1.28L12 10.73 8.68 7.4 7.4 8.68 10.73 12 7.4 15.32Z"
          />
        </svg>
      )}
    </ComboboxPrimitive.Clear>
  );
}

// 입력 칸의 틀 — 글자 칸에 초점이 오면 파란 테두리와 옅은 바깥 띠가 생긴다
const comboboxFieldClassName = `group/combobox-field relative flex w-full min-w-0
  cursor-text bg-effect-transparent-primary text-fg-neutral-primary inset-ring
  inset-ring-line-neutral-secondary backdrop-blur-[32px] transition-shadow
  duration-200 has-[input:focus]:inset-ring-line-brand-strong
  has-[input:focus]:ring-4 has-[input:focus]:ring-line-brand-focus
  has-[input[aria-invalid=true]]:inset-ring-line-negative-primary
  has-[input[aria-invalid=true]:focus]:inset-ring-line-negative-strong
  has-[input[aria-invalid=true]:focus]:ring-line-negative-focus
  has-[input:disabled]:cursor-default
  has-[input:disabled]:bg-surface-neutral-tertiary
  has-[input:disabled]:inset-ring-line-neutral-tertiary
  has-[input:disabled]:backdrop-blur-none`;

const comboboxInputClassName = `min-w-0 flex-1 bg-transparent px-1
  text-fg-neutral-primary caret-fg-brand-primary outline-none
  placeholder:text-fg-neutral-tertiary disabled:cursor-default
  disabled:placeholder:text-fg-disable-primary`;

// 높이는 여백과 글자 줄 높이로 정해진다 — default 가 sm 보다 한 단계 크다
const comboboxInputVariants = cva(
  `${comboboxFieldClassName} items-center gap-0.5`,
  {
    variants: {
      size: {
        default: "rounded-14 p-3 text-body2 *:data-[slot=combobox-input]:py-px",
        sm: "rounded-12 p-2.5 text-label1",
      },
    },
    defaultVariants: {
      size: "default",
    },
  },
);

type ComboboxInputProps = Omit<ComboboxPrimitive.Input.Props, "size"> &
  VariantProps<typeof comboboxInputVariants> & {
    /** 오른쪽에 목록을 여닫는 화살표 버튼을 둔다. */
    showTrigger?: boolean;
    /** 값이 있으면 오른쪽에 지우기 버튼을 둔다. */
    showClear?: boolean;
  };

function ComboboxInput({
  className,
  children,
  size = "default",
  disabled = false,
  showTrigger = true,
  showClear = false,
  ...props
}: ComboboxInputProps) {
  return (
    <ComboboxPrimitive.InputGroup
      data-slot="combobox-input-group"
      data-size={size}
      className={cn(comboboxInputVariants({ size, className }))}
    >
      <ComboboxPrimitive.Input
        data-slot="combobox-input"
        disabled={disabled}
        className={comboboxInputClassName}
        {...props}
      />
      {(showClear || showTrigger) && (
        <span
          data-slot="combobox-input-addon"
          className="flex shrink-0 items-center gap-2"
        >
          {showClear && <ComboboxClear disabled={disabled} />}
          {showTrigger && <ComboboxTrigger disabled={disabled} />}
        </span>
      )}
      {children}
    </ComboboxPrimitive.InputGroup>
  );
}

type ComboboxContentProps = ComboboxPrimitive.Popup.Props &
  Pick<
    ComboboxPrimitive.Positioner.Props,
    "side" | "align" | "sideOffset" | "alignOffset" | "anchor"
  >;

// 입력 칸 아래에 입력 칸과 같은 너비로 열린다
function ComboboxContent({
  className,
  side = "bottom",
  sideOffset = 8,
  align = "center",
  alignOffset = 0,
  anchor,
  ...props
}: ComboboxContentProps) {
  return (
    <ComboboxPrimitive.Portal>
      <ComboboxPrimitive.Positioner
        data-slot="combobox-positioner"
        side={side}
        sideOffset={sideOffset}
        align={align}
        alignOffset={alignOffset}
        anchor={anchor}
        className="isolate z-50 outline-none"
      >
        <ComboboxPrimitive.Popup
          data-slot="combobox-content"
          className={cn(
            `group/combobox-content relative w-(--anchor-width)
            max-w-(--available-width) min-w-35 origin-(--transform-origin)
            overflow-hidden rounded-16 border
            border-line-neutral-secondary-opaque bg-popover
            text-popover-foreground shadow-sm outline-none`,
            className,
          )}
          {...props}
        />
      </ComboboxPrimitive.Positioner>
    </ComboboxPrimitive.Portal>
  );
}

type ComboboxListProps = ComboboxPrimitive.List.Props;

// 목록은 정해진 높이(또는 화면에 남은 높이)까지 자라고, 넘치면 안에서 얇은 스크롤 막대로 스크롤된다
function ComboboxList({ className, ...props }: ComboboxListProps) {
  return (
    <ComboboxPrimitive.List
      data-slot="combobox-list"
      className={cn(
        `flex max-h-[min(--spacing(100),var(--available-height))] flex-col gap-1
        overflow-y-auto overscroll-contain py-2 outline-none
        [scrollbar-width:thin] data-empty:py-0`,
        className,
      )}
      {...props}
    />
  );
}

// 막은 항목보다 양옆으로 조금 넓다. 고르면 default 는 글자가 파래지고 오른쪽에 체크가,
// checkbox 는 왼쪽 네모가 채워진다.
const comboboxItemVariants = cva(
  `group/combobox-item relative isolate mx-5 flex cursor-pointer items-start
  gap-2 py-3 text-body2 font-medium text-fg-neutral-primary outline-none
  select-none [--interaction-active:0.09] after:pointer-events-none
  after:absolute after:inset-y-0 after:-inset-x-3 after:-z-10 after:rounded-16
  after:bg-fg-neutral-primary after:opacity-0 after:transition-opacity
  after:duration-150 active:after:opacity-(--interaction-active)
  data-highlighted:after:opacity-6 data-disabled:pointer-events-none
  data-disabled:cursor-default data-disabled:text-fg-disable-primary`,
  {
    variants: {
      variant: {
        default:
          "data-selected:font-semibold data-selected:text-fg-brand-primary",
        checkbox: "",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  },
);

type ComboboxItemProps = ComboboxPrimitive.Item.Props &
  VariantProps<typeof comboboxItemVariants>;

// 네모의 테두리 1.5px 와 반경 5px 은 맞는 토큰이 없어 값을 그대로 쓴다
function ComboboxItem({
  className,
  variant = "default",
  children,
  ...props
}: ComboboxItemProps) {
  return (
    <ComboboxPrimitive.Item
      data-slot="combobox-item"
      data-variant={variant}
      className={cn(comboboxItemVariants({ variant, className }))}
      {...props}
    >
      {variant === "checkbox" && (
        <span
          data-slot="combobox-item-control"
          aria-hidden
          className="mx-px my-0.75 flex size-4.5 shrink-0 items-center
            justify-center rounded-[5px] bg-bg-neutral-primary text-white
            inset-ring-[1.5px] inset-ring-line-neutral-primary
            transition-[background-color,box-shadow] duration-200
            group-data-disabled/combobox-item:opacity-43
            group-data-selected/combobox-item:bg-primary
            group-data-selected/combobox-item:inset-ring-primary"
        >
          <CheckIcon
            strokeWidth={3}
            className="size-4 scale-75 opacity-0 transition-[opacity,scale]
              duration-200 group-data-selected/combobox-item:scale-100
              group-data-selected/combobox-item:opacity-100"
          />
        </span>
      )}
      <span
        data-slot="combobox-item-text"
        className="min-w-0 flex-1 py-px break-keep"
      >
        {children}
      </span>
      {variant === "default" && (
        <ComboboxPrimitive.ItemIndicator
          data-slot="combobox-item-indicator"
          className="flex h-6 shrink-0 items-center text-fg-brand-primary
            group-data-disabled/combobox-item:text-fg-disable-primary"
        >
          <CheckIcon
            strokeWidth={1.8}
            className="pointer-events-none size-5.5"
          />
        </ComboboxPrimitive.ItemIndicator>
      )}
    </ComboboxPrimitive.Item>
  );
}

type ComboboxGroupProps = ComboboxPrimitive.Group.Props;

function ComboboxGroup({ className, ...props }: ComboboxGroupProps) {
  return (
    <ComboboxPrimitive.Group
      data-slot="combobox-group"
      className={cn("flex flex-col gap-1", className)}
      {...props}
    />
  );
}

type ComboboxLabelProps = ComboboxPrimitive.GroupLabel.Props;

// 목록을 내려도 묶음 이름은 위에 붙어 있다
function ComboboxLabel({ className, ...props }: ComboboxLabelProps) {
  return (
    <ComboboxPrimitive.GroupLabel
      data-slot="combobox-label"
      className={cn(
        `sticky top-0 z-10 bg-popover px-5 py-1 text-caption1 font-semibold
        text-fg-neutral-tertiary`,
        className,
      )}
      {...props}
    />
  );
}

type ComboboxCollectionProps = ComboboxPrimitive.Collection.Props;

function ComboboxCollection(props: ComboboxCollectionProps) {
  return (
    <ComboboxPrimitive.Collection data-slot="combobox-collection" {...props} />
  );
}

type ComboboxEmptyProps = ComboboxPrimitive.Empty.Props;

// 걸러진 항목이 없을 때만 글이 보인다. 요소는 늘 남아 있어야 읽어 주는 기기가 바뀐 것을 알린다.
function ComboboxEmpty({ className, ...props }: ComboboxEmptyProps) {
  return (
    <ComboboxPrimitive.Empty
      data-slot="combobox-empty"
      className={cn(
        `flex justify-center text-center text-body2 text-fg-neutral-tertiary
        not-empty:px-5 not-empty:py-3`,
        className,
      )}
      {...props}
    />
  );
}

type ComboboxSeparatorProps = ComboboxPrimitive.Separator.Props;

function ComboboxSeparator({ className, ...props }: ComboboxSeparatorProps) {
  return (
    <ComboboxPrimitive.Separator
      data-slot="combobox-separator"
      className={cn(
        "pointer-events-none mx-5 my-1 h-px shrink-0 bg-line-neutral-tertiary",
        className,
      )}
      {...props}
    />
  );
}

// 칩이 넘치면 다음 줄로 내려간다
const comboboxChipsVariants = cva(
  `${comboboxFieldClassName} flex-wrap items-center`,
  {
    variants: {
      size: {
        default: "gap-2 rounded-14 p-3 text-body2",
        sm: "gap-1.5 rounded-12 px-2.5 py-2 text-label1",
      },
    },
    defaultVariants: {
      size: "default",
    },
  },
);

type ComboboxChipsProps = ComboboxPrimitive.Chips.Props &
  VariantProps<typeof comboboxChipsVariants>;

function ComboboxChips({
  className,
  size = "default",
  ...props
}: ComboboxChipsProps) {
  return (
    <ComboboxPrimitive.Chips
      data-slot="combobox-chips"
      data-size={size}
      className={cn(comboboxChipsVariants({ size, className }))}
      {...props}
    />
  );
}

type ComboboxChipProps = ComboboxPrimitive.Chip.Props & {
  /** 오른쪽에 X 를 두고, 칩 어디를 눌러도 빠지게 한다. */
  showRemove?: boolean;
};

function ComboboxChip({
  className,
  children,
  showRemove = true,
  ...props
}: ComboboxChipProps) {
  return (
    <ComboboxPrimitive.Chip
      data-slot="combobox-chip"
      className={cn(
        `relative isolate inline-flex min-h-6 shrink-0 cursor-default
        items-center rounded-8 px-1.5 py-1.25 text-caption2 font-medium
        whitespace-nowrap text-fg-neutral-primary inset-ring
        inset-ring-line-neutral-secondary outline-none
        [--interaction-active:0.09] [--interaction-hover:0.0375]
        after:pointer-events-none after:absolute after:inset-0 after:-z-10
        after:rounded-[inherit] after:bg-fg-neutral-primary after:opacity-0
        after:transition-opacity after:duration-150
        hover:after:opacity-(--interaction-hover) focus-visible:outline-2
        focus-visible:outline-ring focus-visible:outline-solid
        active:after:opacity-(--interaction-active)
        data-disabled:pointer-events-none data-disabled:text-fg-disable-primary`,
        className,
      )}
      {...props}
    >
      <span data-slot="combobox-chip-text" className="px-0.5">
        {children}
      </span>
      {showRemove && (
        <ComboboxPrimitive.ChipRemove
          data-slot="combobox-chip-remove"
          className="flex cursor-pointer items-center outline-none
            before:absolute before:inset-0"
        >
          <XIcon className="pointer-events-none size-3" />
        </ComboboxPrimitive.ChipRemove>
      )}
    </ComboboxPrimitive.Chip>
  );
}

type ComboboxChipsInputProps = ComboboxPrimitive.Input.Props;

function ComboboxChipsInput({ className, ...props }: ComboboxChipsInputProps) {
  return (
    <ComboboxPrimitive.Input
      data-slot="combobox-chip-input"
      className={cn(
        comboboxInputClassName,
        "min-w-16 py-px group-data-[size=sm]/combobox-field:py-0.5",
        className,
      )}
      {...props}
    />
  );
}

// 칩 틀은 입력 칸(InputGroup)이 아니어서, 목록을 틀에 맞춰 열려면 이 ref 를 틀과 ComboboxContent 의 anchor 에 함께 준다
function useComboboxAnchor() {
  return React.useRef<HTMLDivElement | null>(null);
}

export {
  Combobox,
  ComboboxChip,
  ComboboxChips,
  ComboboxChipsInput,
  ComboboxClear,
  ComboboxCollection,
  ComboboxContent,
  ComboboxEmpty,
  ComboboxGroup,
  ComboboxInput,
  ComboboxItem,
  ComboboxLabel,
  ComboboxList,
  ComboboxSeparator,
  ComboboxTrigger,
  ComboboxValue,
  comboboxChipsVariants,
  comboboxInputVariants,
  comboboxItemVariants,
  useComboboxAnchor,
  type ComboboxChipProps,
  type ComboboxChipsInputProps,
  type ComboboxChipsProps,
  type ComboboxClearProps,
  type ComboboxCollectionProps,
  type ComboboxContentProps,
  type ComboboxEmptyProps,
  type ComboboxGroupProps,
  type ComboboxInputProps,
  type ComboboxItemProps,
  type ComboboxLabelProps,
  type ComboboxListProps,
  type ComboboxProps,
  type ComboboxSeparatorProps,
  type ComboboxTriggerProps,
  type ComboboxValueProps,
};
