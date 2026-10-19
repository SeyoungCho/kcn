import * as React from "react";
import { Combobox as ComboboxPrimitive } from "@base-ui/react/combobox";
import IconCheckmarkFatFill from "@karrotmarket/react-monochrome-icon/IconCheckmarkFatFill";
import IconXmarkLine from "@karrotmarket/react-monochrome-icon/IconXmarkLine";

import { Icon } from "@/components/ui/icon";
import { cn } from "@/lib/utils";

// 찾아서 고르기 — 입력칸에 친 글자로 목록을 거르고 고른다(shadcn 의 combobox). 여럿을 고르면 고른 것이 칩으로 칸 안에 쌓인다.
// SEED 에 없는 부품이라 모양은 SEED 의 선택 상자(select)를 따른다: 칸은 입력칸 · 선택 상자의 테두리, 목록은 선택 상자의 목록과 항목.
// 동작(거르기 · 화살표 · Enter · 칩 지우기 · 화면 낭독기)은 Base UI Combobox 가 한다.

const Combobox = ComboboxPrimitive.Root;

export type ComboboxInputGroupProps = ComboboxPrimitive.InputGroup.Props;

/** 입력칸의 틀 — 선택 상자(medium)와 같은 테두리 · 둥글기. 칩이 쌓이면 높이가 늘어난다 */
function ComboboxInputGroup({ className, ...props }: ComboboxInputGroupProps) {
  return (
    <ComboboxPrimitive.InputGroup
      data-slot="combobox-input-group"
      className={cn(
        `relative box-border flex min-h-x10 w-full cursor-text flex-wrap
        items-center gap-x1 rounded-r2 bg-bg-layer-default px-x2 py-x1.5`,
        `inset-ring inset-ring-stroke-neutral-weak
        hovered:inset-ring-stroke-neutral-contrast`,
        `outline-solid outline-(length:--dimension-x0_5)
        outline-offset-(--dimension-x0_5) outline-transparent
        focus-within:outline-stroke-focus-ring`,
        "[transition:outline-color_var(--motion-duration-d3)_var(--motion-ease-easing)]",
        className,
      )}
      {...props}
    />
  );
}

export type ComboboxChipsProps = ComboboxPrimitive.Chips.Props;

function ComboboxChips({ className, ...props }: ComboboxChipsProps) {
  return (
    <ComboboxPrimitive.Chips
      data-slot="combobox-chips"
      className={cn("flex w-full flex-wrap items-center gap-x1", className)}
      {...props}
    />
  );
}

export type ComboboxChipProps = ComboboxPrimitive.Chip.Props & {
  /** 빼기(×) 버튼의 이름 — 안 주면 글자 칩은 '사과 빼기', 아니면 '빼기' */
  removeLabel?: string;
};

/** 고른 것 하나 — 끝의 ×(또는 Backspace · Delete)로 뺀다 */
function ComboboxChip({
  className,
  children,
  removeLabel,
  ...props
}: ComboboxChipProps) {
  return (
    <ComboboxPrimitive.Chip
      data-slot="combobox-chip"
      className={cn(
        `box-border flex min-h-x6 max-w-full cursor-default items-center
        gap-x0.5 rounded-r1.5 bg-bg-neutral-weak py-x0.5 pr-x0.5 pl-x2 text-t3
        text-fg-neutral outline-none`,
        "focus-within:bg-bg-neutral-solid focus-within:text-fg-on-neutral-solid",
        className,
      )}
      {...props}
    >
      <span className="min-w-0 truncate">{children}</span>
      <ComboboxPrimitive.ChipRemove
        data-slot="combobox-chip-remove"
        className="m-0 flex size-x5 shrink-0 cursor-pointer items-center
          justify-center rounded-r1 border-none bg-transparent p-0 text-inherit
          [--icon-size:12px] hovered:bg-bg-transparent-pressed"
        aria-label={
          removeLabel ??
          (typeof children === "string" ? `${children} 빼기` : "빼기")
        }
      >
        <Icon svg={<IconXmarkLine />} />
      </ComboboxPrimitive.ChipRemove>
    </ComboboxPrimitive.Chip>
  );
}

export type ComboboxInputProps = ComboboxPrimitive.Input.Props;

function ComboboxInput({ className, ...props }: ComboboxInputProps) {
  return (
    <ComboboxPrimitive.Input
      data-slot="combobox-input"
      className={cn(
        `m-0 box-border h-x7 min-w-x12 flex-1 border-none bg-transparent px-x1
        font-[inherit] text-t4 text-fg-neutral outline-none
        placeholder:text-fg-placeholder`,
        className,
      )}
      {...props}
    />
  );
}

export interface ComboboxContentProps extends ComboboxPrimitive.Popup.Props {
  /** 입력칸과 목록 사이(px) @default 8 */
  gutter?: number;
}

/** 목록 — body 에 그린다. 입력칸의 폭에 맞추고, 남은 높이가 모자라면 안에서 스크롤한다 */
function ComboboxContent({
  className,
  children,
  gutter = 8,
  ...props
}: ComboboxContentProps) {
  return (
    <ComboboxPrimitive.Portal>
      <ComboboxPrimitive.Positioner
        data-slot="combobox-positioner"
        sideOffset={gutter}
        collisionPadding={8}
        className="z-[calc(99999+var(--z-index-offset,0))] outline-none"
      >
        <ComboboxPrimitive.Popup
          data-slot="combobox-content"
          className={cn(
            `box-border w-(--anchor-width) origin-(--transform-origin)
            overflow-y-auto overscroll-contain rounded-r5 bg-bg-layer-floating
            py-x2 shadow-s3 outline-none`,
            "max-h-[min(400px,max(200px,var(--available-height,400px)))]",
            `[--seed-enter-opacity:0] [--seed-enter-scale:0.95]
            [--seed-exit-opacity:0] [--seed-exit-scale:0.95]`,
            "data-open:animate-[seed-enter_var(--motion-duration-d3)_var(--motion-ease-enter)]",
            "data-closed:animate-[seed-exit_var(--motion-duration-d2)_var(--motion-ease-exit)_forwards]",
            className,
          )}
          {...props}
        >
          {children}
        </ComboboxPrimitive.Popup>
      </ComboboxPrimitive.Positioner>
    </ComboboxPrimitive.Portal>
  );
}

export type ComboboxEmptyProps = ComboboxPrimitive.Empty.Props;

function ComboboxEmpty({ className, ...props }: ComboboxEmptyProps) {
  return (
    <ComboboxPrimitive.Empty
      data-slot="combobox-empty"
      className={cn(
        "px-x4 py-x2.5 text-t4 text-fg-neutral-subtle empty:hidden",
        className,
      )}
      {...props}
    />
  );
}

export type ComboboxListProps = ComboboxPrimitive.List.Props;

function ComboboxList({ className, ...props }: ComboboxListProps) {
  return (
    <ComboboxPrimitive.List
      data-slot="combobox-list"
      className={cn("flex flex-col outline-none", className)}
      {...props}
    />
  );
}

export type ComboboxItemProps = ComboboxPrimitive.Item.Props;

/** 항목 — 선택 상자(medium)의 항목과 같은 모양. 고른 것은 끝에 체크 */
function ComboboxItem({ className, children, ...props }: ComboboxItemProps) {
  return (
    <ComboboxPrimitive.Item
      data-slot="combobox-item"
      className={cn(
        `relative isolate m-0 flex cursor-default scroll-my-x2 items-center
        gap-x2 px-x4 py-x2.5 text-t4 text-fg-neutral outline-none select-none`,
        `before:absolute before:inset-0 before:-z-1 before:rounded-r3
        before:content-['']`,
        "before:[transition:background-color_var(--motion-duration-color-transition)_var(--motion-ease-easing),inset-inline_var(--motion-duration-d3)_var(--motion-ease-easing)]",
        `not-data-disabled:data-highlighted:before:inset-x-x2
        not-data-disabled:data-highlighted:before:bg-bg-transparent-pressed`,
        "data-disabled:cursor-not-allowed data-disabled:text-fg-disabled",
        className,
      )}
      {...props}
    >
      <span className="min-w-0 grow break-all">{children}</span>
      <ComboboxPrimitive.ItemIndicator
        data-slot="combobox-item-indicator"
        className="flex shrink-0 [--icon-color:var(--fg-neutral)]
          [--icon-size:var(--dimension-x3)]"
      >
        <Icon svg={<IconCheckmarkFatFill />} />
      </ComboboxPrimitive.ItemIndicator>
    </ComboboxPrimitive.Item>
  );
}

const ComboboxValue = ComboboxPrimitive.Value;

export {
  Combobox,
  ComboboxInputGroup,
  ComboboxChips,
  ComboboxChip,
  ComboboxInput,
  ComboboxValue,
  ComboboxContent,
  ComboboxEmpty,
  ComboboxList,
  ComboboxItem,
};
