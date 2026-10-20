"use client";

import * as React from "react";
import { Tabs as TabsPrimitive } from "@base-ui/react/tabs";
import { cva } from "class-variance-authority";
import type { VariantProps } from "class-variance-authority";

import { useScaleFeedback } from "@/lib/use-scale-feedback";
import { cn } from "@/lib/utils";

const chipTabsVariants = cva("relative", {
  variants: {
    /** 내용이 남은 높이를 다 채울지 */
    contentLayout: { fill: "flex h-full flex-col", hug: "block" },
  },
  defaultVariants: { contentLayout: "hug" },
});

const chipTabsListVariants = cva(
  [
    `relative isolate flex flex-nowrap content-stretch items-stretch gap-2
    overflow-x-auto px-x4 py-0`,
    "scrollbar-none [&::-webkit-scrollbar]:hidden",
  ],
  {
    variants: { stickyList: { true: "sticky top-0 z-1", false: "" } },
    defaultVariants: { stickyList: false },
  },
);

// 고른 칩은 aria-selected 로 가린다. 손을 댔을 때의 바탕색은 고른 칩과 안 고른 칩이 다르다.
const chipTabsTriggerVariants = cva(
  [
    `box-border flex shrink-0 cursor-pointer items-center justify-center
    rounded-full border-0`,
    "font-[inherit] text-(length:--font-size-t4) font-medium whitespace-nowrap",
    `pressed:not-data-disabled:scale-(--feedback-scale)
    data-disabled:cursor-not-allowed data-disabled:opacity-50`,
    `outline-solid outline-(length:--dimension-x0_5)
    outline-offset-(--dimension-x0_5) outline-transparent
    focused:outline-stroke-focus-ring`,
    "[transition:background-color_var(--motion-duration-color-transition)_var(--motion-ease-easing),var(--feedback-scale-transition),outline-color_var(--motion-duration-d3)_var(--motion-ease-easing)]",
  ],
  {
    variants: {
      size: {
        medium: `min-h-9 min-w-x12
        px-[calc(var(--dimension-x2)_+_var(--dimension-x1_5))]`,
        large: `min-h-10 min-w-x13
        px-[calc(var(--dimension-x2_5)_+_var(--dimension-x1_5))]`,
      },
      variant: {
        neutralSolid: [
          `bg-bg-neutral-weak-alpha text-fg-neutral
          engaged:bg-bg-neutral-weak-alpha-pressed`,
          `aria-selected:bg-bg-neutral-solid
          aria-selected:text-fg-on-neutral-solid
          aria-selected:engaged:bg-bg-neutral-solid-pressed`,
        ],
        neutralOutline: [
          `border border-solid border-stroke-neutral-muted bg-bg-transparent
          text-fg-neutral engaged:bg-bg-transparent-pressed`,
          `aria-selected:border-transparent aria-selected:bg-bg-neutral-solid
          aria-selected:text-fg-on-neutral-solid
          aria-selected:engaged:bg-bg-neutral-solid-pressed`,
        ],
      },
    },
    defaultVariants: { size: "medium", variant: "neutralSolid" },
  },
);

type ChipTabsTriggerVariants = VariantProps<typeof chipTabsTriggerVariants>;
type ChipTabsListVariants = VariantProps<typeof chipTabsListVariants>;

// 묶음(ChipTabsRoot)이 정한 크기 · 변형을 줄과 칩이 물려받는다.
const ChipTabsContext = React.createContext<
  ChipTabsTriggerVariants & ChipTabsListVariants
>({});

export interface ChipTabsRootProps
  extends
    Omit<
      TabsPrimitive.Root.Props,
      "className" | "value" | "defaultValue" | "onValueChange"
    >,
    VariantProps<typeof chipTabsVariants>,
    ChipTabsTriggerVariants,
    ChipTabsListVariants {
  value?: string;
  defaultValue?: string;
  onValueChange?: (value: string) => void;
  className?: string;
}

function ChipTabsRoot({
  className,
  size = "medium",
  variant = "neutralSolid",
  contentLayout,
  stickyList = false,
  onValueChange,
  ...props
}: ChipTabsRootProps) {
  const context = React.useMemo(
    () => ({ size, variant, stickyList }),
    [size, variant, stickyList],
  );
  return (
    <ChipTabsContext.Provider value={context}>
      <TabsPrimitive.Root
        data-slot="chip-tabs"
        className={cn(chipTabsVariants({ contentLayout }), className)}
        onValueChange={(value) => onValueChange?.(String(value))}
        {...props}
      />
    </ChipTabsContext.Provider>
  );
}

export interface ChipTabsListProps extends Omit<
  TabsPrimitive.List.Props,
  "className"
> {
  className?: string;
}

// 화살표 키로 옮기면 바로 그 칩이 골라진다(SEED 와 같게 — Base UI 의 기본은 Enter 를 눌러야 한다).
function ChipTabsList({ className, ...props }: ChipTabsListProps) {
  const { stickyList } = React.useContext(ChipTabsContext);
  return (
    <TabsPrimitive.List
      data-slot="chip-tabs-list"
      activateOnFocus
      className={cn(chipTabsListVariants({ stickyList }), className)}
      {...props}
    />
  );
}

export interface ChipTabsTriggerProps extends Omit<
  TabsPrimitive.Tab.Props,
  "className" | "render" | "value"
> {
  value: string;
  className?: string;
}

// Base UI 는 고른 탭에 data-active 를 붙이는데, 우리(와 SEED)에게 data-active 는 '누르는 중'이다(pressed:).
// 그대로 두면 고른 칩이 늘 눌린 것처럼 줄어들어, 그 속성을 뗀다.
const renderTab = (props: React.ComponentPropsWithRef<"button">) => {
  const rest: Record<string, unknown> = { ...props };
  delete rest["data-active"];
  return <button {...rest} />;
};

function ChipTabsTrigger({ ref, className, ...props }: ChipTabsTriggerProps) {
  const { size, variant } = React.useContext(ChipTabsContext);
  const { scaleFeedbackRef, scaleFeedbackClassName } =
    useScaleFeedback<HTMLElement>(ref);
  return (
    <TabsPrimitive.Tab
      ref={scaleFeedbackRef}
      data-slot="chip-tabs-trigger"
      render={renderTab}
      className={cn(
        scaleFeedbackClassName,
        chipTabsTriggerVariants({ size, variant }),
        className,
      )}
      {...props}
    />
  );
}

export interface ChipTabsContentProps extends Omit<
  TabsPrimitive.Panel.Props,
  "className" | "value"
> {
  value: string;
  className?: string;
}

/** 칩의 내용 — 고른 칩의 것만 그린다. */
function ChipTabsContent({ className, ...props }: ChipTabsContentProps) {
  return (
    <TabsPrimitive.Panel
      data-slot="chip-tabs-content"
      className={cn(
        `min-w-0 flex-[0_0_100%] overflow-x-hidden overflow-y-auto
        transform-[translate3d(0,0,0)]`,
        className,
      )}
      {...props}
    />
  );
}

export { ChipTabsRoot, ChipTabsList, ChipTabsTrigger, ChipTabsContent };
