"use client";

import * as React from "react";
import { Tabs as TabsPrimitive } from "@base-ui/react/tabs";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

// shadcn Tabs 에 t-flavored 의 모양을 입혔다.
//   TabsList variant — default = 세그먼트 컨트롤(회색 바탕 위를 흰 알약이 미끄러진다), line = 글자 아래 밑줄.
//   fluid — 탭 폭을 글자에 맞추고, 넘치면 가로로 스크롤한다.
// 알약 · 밑줄은 Base UI 가 재 준 자리(--active-tab-left · --active-tab-width)로 옮겨 간다.
// 알약은 살짝 튕기며 200ms, 밑줄은 ease-out-quint 300ms 로 옮겨 간다.
const tabsListVariants = cva(
  `group/tabs-list relative isolate flex w-full items-stretch overflow-x-auto
  overflow-y-hidden scroll-smooth [scrollbar-width:none]
  [&::-webkit-scrollbar]:hidden`,
  {
    variants: {
      variant: {
        default: "bg-grey-opacity-100",
        // 아래 머리카락 선은 스크롤해도 제자리에 있게 안쪽 그림자로 깐다
        line: "bg-background pb-0.5 shadow-[inset_0_-1px_var(--color-hairline)]",
      },
      size: {
        default: "",
        sm: "",
      },
      fluid: {
        false: "",
        true: "",
      },
    },
    compoundVariants: [
      {
        variant: "default",
        size: "default",
        className: "rounded-xl px-1.25 py-1",
      },
      { variant: "default", size: "sm", className: "rounded-md p-0.75" },
      { variant: "line", fluid: false, className: "px-5" },
      { variant: "line", fluid: true, className: "pl-3.5" },
    ],
    defaultVariants: {
      variant: "default",
      size: "default",
      fluid: false,
    },
  },
);

const tabsIndicatorVariants = cva(
  `absolute left-0 w-(--active-tab-width) translate-x-(--active-tab-left)
  transition-[translate,width]`,
  {
    variants: {
      variant: {
        default: `top-(--active-tab-top) -z-1 h-(--active-tab-height)
        bg-surface-float shadow-[0_1px_2px_0_rgb(0_0_0/0.09)] duration-200
        ease-[cubic-bezier(0.5,0.4,0,1.1)]`,
        // 탭 폭에서 양쪽 10px 을 뺀 2px 막대
        line: `bottom-0 h-0.5 px-2.5 duration-300
        ease-[cubic-bezier(0.22,1,0.36,1)] after:block after:size-full
        after:rounded-[1px] after:bg-grey-800`,
      },
      size: {
        default: "",
        sm: "",
      },
    },
    compoundVariants: [
      { variant: "default", size: "default", className: "rounded-md" },
      { variant: "default", size: "sm", className: "rounded-sm" },
    ],
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  },
);

// 알약 탭은 누르는 동안 글자가 0.95 로 줄고, 회색 물결이 번졌다가 손을 떼면 퍼지며 사라진다.
// 밑줄 탭은 누름 효과가 없다.
const tabsTriggerVariants = cva(
  `relative inline-flex min-w-0 cursor-pointer items-center justify-center
  whitespace-nowrap text-grey-600 outline-none select-none focus-visible:ring-3
  focus-visible:ring-ring/50 focus-visible:ring-inset data-active:text-grey-800
  data-disabled:pointer-events-none data-disabled:opacity-30
  [&_svg]:pointer-events-none [&_svg]:shrink-0`,
  {
    variants: {
      variant: {
        default: `rounded-lg font-medium transition-[scale] duration-100
        before:pointer-events-none before:absolute before:top-1/2
        before:left-1/2 before:-z-1 before:aspect-square before:w-full
        before:-translate-1/2 before:scale-200
        before:bg-[radial-gradient(closest-side,var(--color-grey-300),transparent)]
        before:opacity-0 before:transition-[opacity,scale] before:duration-300
        active:scale-95 active:before:scale-100 active:before:opacity-15
        active:before:transition-none data-active:font-semibold`,
        line: "min-w-16 font-semibold data-active:font-bold",
      },
      size: {
        default: "text-t5",
        sm: "text-t6",
      },
      fluid: {
        false: "flex-1",
        true: "flex-none",
      },
    },
    compoundVariants: [
      { variant: "default", size: "default", className: "px-3 py-1.75" },
      { variant: "default", size: "sm", className: "px-3.5 py-1.25" },
      // 밑줄 탭은 글자 크기와 상관없이 줄 높이를 1.252 로 둔다
      {
        variant: "line",
        size: "default",
        className: "pt-3 pb-3.5 leading-[1.252]",
      },
      { variant: "line", size: "sm", className: "py-2 leading-[1.252]" },
      { variant: "line", fluid: false, className: "px-2" },
      { variant: "line", fluid: true, className: "px-3" },
    ],
    defaultVariants: {
      variant: "default",
      size: "default",
      fluid: false,
    },
  },
);

type TabsListVariants = VariantProps<typeof tabsListVariants>;

// 줄(TabsList)이 정한 모양 · 크기 · 배치를 탭(TabsTrigger)이 물려받는다.
const TabsListContext = React.createContext<TabsListVariants>({
  variant: "default",
  size: "default",
  fluid: false,
});

type TabsProps = TabsPrimitive.Root.Props;

function Tabs({ className, ...props }: TabsProps) {
  return (
    <TabsPrimitive.Root
      data-slot="tabs"
      className={cn(
        "group/tabs flex flex-col gap-2 data-[orientation=vertical]:flex-row",
        className,
      )}
      {...props}
    />
  );
}

type TabsListProps = TabsPrimitive.List.Props & TabsListVariants;

function TabsList({
  className,
  variant = "default",
  size = "default",
  fluid = false,
  children,
  ...props
}: TabsListProps) {
  const context = React.useMemo(
    () => ({ variant, size, fluid }),
    [variant, size, fluid],
  );

  return (
    <TabsListContext value={context}>
      <TabsPrimitive.List
        data-slot="tabs-list"
        data-variant={variant}
        data-size={size}
        className={cn(tabsListVariants({ variant, size, fluid }), className)}
        {...props}
      >
        {children}
        <TabsPrimitive.Indicator
          data-slot="tabs-indicator"
          className={tabsIndicatorVariants({ variant, size })}
        />
      </TabsPrimitive.List>
    </TabsListContext>
  );
}

type TabsTriggerProps = TabsPrimitive.Tab.Props;

function TabsTrigger({ className, ...props }: TabsTriggerProps) {
  const { variant, size, fluid } = React.use(TabsListContext);

  return (
    <TabsPrimitive.Tab
      data-slot="tabs-trigger"
      className={cn(tabsTriggerVariants({ variant, size, fluid }), className)}
      {...props}
    />
  );
}

type TabsContentProps = TabsPrimitive.Panel.Props;

function TabsContent({ className, ...props }: TabsContentProps) {
  return (
    <TabsPrimitive.Panel
      data-slot="tabs-content"
      className={cn("flex-1 outline-none", className)}
      {...props}
    />
  );
}

export {
  Tabs,
  TabsList,
  TabsTrigger,
  TabsContent,
  tabsListVariants,
  tabsIndicatorVariants,
  tabsTriggerVariants,
  type TabsProps,
  type TabsListProps,
  type TabsTriggerProps,
  type TabsContentProps,
};
