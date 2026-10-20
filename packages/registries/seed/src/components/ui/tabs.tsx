"use client";

import * as React from "react";
import { Tabs as TabsPrimitive } from "@base-ui/react/tabs";
import { cva } from "class-variance-authority";
import type { VariantProps } from "class-variance-authority";

import { useScaleFeedback } from "@/lib/use-scale-feedback";
import { cn } from "@/lib/utils";

const tabsVariants = cva("relative", {
  variants: {
    /** 내용이 남은 높이를 다 채울지 */
    contentLayout: { fill: "flex h-full flex-col", hug: "block" },
  },
  defaultVariants: { contentLayout: "hug" },
});

const tabsListVariants = cva(
  [
    `relative isolate flex flex-nowrap content-stretch items-stretch
    overflow-x-auto`,
    "scrollbar-none [&::-webkit-scrollbar]:hidden",
    // 바탕은 두지 않는다(놓인 자리의 바탕 그대로) — 붙어 있는 줄(stickyList)만 아래 내용을 가리게 바탕을 깐다
    "shadow-[inset_0_-1px_var(--stroke-neutral-muted)]",
  ],
  {
    variants: {
      /** 탭이 폭을 나눠 가질지(fill) 글자만큼만 차지할지(hug) */
      triggerLayout: {
        fill: "justify-around px-0",
        hug: "justify-start px-x-global-gutter",
      },
      size: { small: "min-h-10", medium: "min-h-11" },
      stickyList: { true: "sticky top-0 z-1 bg-bg-layer-default", false: "" },
    },
    defaultVariants: {
      triggerLayout: "fill",
      size: "small",
      stickyList: false,
    },
  },
);

// 고른 탭 아래의 줄 — 자리와 폭은 Base UI 가 재서 --active-tab-left · --active-tab-width 로 준다.
// 자리는 정수 px 로 반올림한다: SEED 가 탭의 offsetLeft(정수)를 쓰기 때문이다. 탭의 폭이 소수라 그대로 두면 줄이 원본과 반 픽셀 어긋난다.
const tabsIndicatorVariants = cva(
  [
    `absolute bottom-0 border-0 border-b-2 border-solid border-fg-neutral
    text-fg-neutral`,
    "will-change-[left,width] transition-[left,width] duration-d4 ease-easing",
  ],
  {
    variants: {
      triggerLayout: {
        fill: `left-[calc(round(var(--active-tab-left,0px),1px)+var(--dimension-spacing-x-global-gutter))]
        w-[calc(var(--active-tab-width,0px)-2*var(--dimension-spacing-x-global-gutter))]`,
        hug: `left-[round(var(--active-tab-left,0px),1px)]
        w-(--active-tab-width,0px)`,
      },
    },
    defaultVariants: { triggerLayout: "fill" },
  },
);

// 글꼴(font-family)은 SEED 도 정하지 않는다 — 브라우저의 버튼 글꼴이거나 화면이 버튼에 정해 둔 글꼴이다.
const tabsTriggerVariants = cva(
  [
    `relative box-border flex cursor-pointer items-end justify-center border-0
    bg-transparent whitespace-nowrap`,
    `text-fg-neutral-subtle aria-selected:text-fg-neutral
    data-disabled:cursor-not-allowed data-disabled:text-fg-disabled`,
    "pressed:not-data-disabled:scale-(--feedback-scale)",
    `outline-solid outline-(length:--dimension-x0_5)
    -outline-offset-(--dimension-x0_5) outline-transparent
    focused:outline-stroke-focus-ring`,
    "[transition:var(--feedback-scale-transition),outline-color_var(--motion-duration-d3)_var(--motion-ease-easing)]",
  ],
  {
    variants: {
      triggerLayout: { fill: "flex-1", hug: "" },
      size: {
        small: "min-h-10 p-x2.5 text-t4 font-bold",
        medium: "min-h-11 p-x2.5 text-t5 font-bold",
      },
    },
    defaultVariants: { triggerLayout: "fill", size: "small" },
  },
);

type TabsListVariants = VariantProps<typeof tabsListVariants>;

// 묶음(TabsRoot)이 정한 크기 · 배치를 줄(TabsList)과 탭(TabsTrigger)이 물려받는다.
const TabsContext = React.createContext<TabsListVariants>({});

export interface TabsRootProps
  extends
    Omit<
      TabsPrimitive.Root.Props,
      "className" | "value" | "defaultValue" | "onValueChange"
    >,
    VariantProps<typeof tabsVariants>,
    TabsListVariants {
  value?: string;
  defaultValue?: string;
  onValueChange?: (value: string) => void;
  className?: string;
}

function TabsRoot({
  className,
  triggerLayout = "fill",
  contentLayout,
  size = "small",
  stickyList = false,
  onValueChange,
  ...props
}: TabsRootProps) {
  const context = React.useMemo(
    () => ({ triggerLayout, size, stickyList }),
    [triggerLayout, size, stickyList],
  );
  return (
    <TabsContext.Provider value={context}>
      <TabsPrimitive.Root
        data-slot="tabs"
        className={cn(tabsVariants({ contentLayout }), className)}
        onValueChange={(value) => onValueChange?.(String(value))}
        {...props}
      />
    </TabsContext.Provider>
  );
}

export interface TabsListProps extends Omit<
  TabsPrimitive.List.Props,
  "className"
> {
  className?: string;
}

// 화살표 키로 옮기면 바로 그 탭이 골라진다(SEED 와 같게 — Base UI 의 기본은 Enter 를 눌러야 한다).
function TabsList({ className, children, ...props }: TabsListProps) {
  const variants = React.useContext(TabsContext);
  return (
    <TabsPrimitive.List
      data-slot="tabs-list"
      activateOnFocus
      className={cn(tabsListVariants(variants), className)}
      {...props}
    >
      {children}
      <TabsPrimitive.Indicator
        data-slot="tabs-indicator"
        render={<div />}
        className={tabsIndicatorVariants({
          triggerLayout: variants.triggerLayout,
        })}
      />
    </TabsPrimitive.List>
  );
}

export interface TabsTriggerProps extends Omit<
  TabsPrimitive.Tab.Props,
  "className" | "render" | "value"
> {
  value: string;
  className?: string;
}

// Base UI 는 고른 탭에 data-active 를 붙이는데, 우리(와 SEED)에게 data-active 는 '누르는 중'이다(pressed:).
// 그대로 두면 고른 탭이 늘 눌린 것처럼 줄어들어, 그 속성을 떼고 고른 탭은 aria-selected 로 가린다.
const renderTab = (props: React.ComponentPropsWithRef<"button">) => {
  const rest: Record<string, unknown> = { ...props };
  delete rest["data-active"];
  // 역할(role="tab")은 Base UI 가 준다.
  return <button {...rest} />;
};

function TabsTrigger({ ref, className, ...props }: TabsTriggerProps) {
  const { triggerLayout, size } = React.useContext(TabsContext);
  const { scaleFeedbackRef, scaleFeedbackClassName } =
    useScaleFeedback<HTMLElement>(ref);
  return (
    <TabsPrimitive.Tab
      ref={scaleFeedbackRef}
      data-slot="tabs-trigger"
      render={renderTab}
      className={cn(
        scaleFeedbackClassName,
        tabsTriggerVariants({ triggerLayout, size }),
        className,
      )}
      {...props}
    />
  );
}

export interface TabsContentProps extends Omit<
  TabsPrimitive.Panel.Props,
  "className" | "value"
> {
  value: string;
  className?: string;
}

/** 탭의 내용 — 고른 탭의 것만 그린다. */
function TabsContent({ className, ...props }: TabsContentProps) {
  return (
    <TabsPrimitive.Panel
      data-slot="tabs-content"
      className={cn(
        `min-w-0 flex-[0_0_100%] overflow-x-hidden overflow-y-auto
        transform-[translate3d(0,0,0)]`,
        className,
      )}
      {...props}
    />
  );
}

export { TabsRoot, TabsList, TabsTrigger, TabsContent };
