"use client";

import * as React from "react";
import { Tabs as TabsPrimitive } from "@base-ui/react/tabs";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

// shadcn Tabs 에 montage 의 모양을 입혔다.
//   TabsList variant — default = 세그먼트 컨트롤(회색 바탕 위를 흰 판이 살짝 튕기며 옮겨 간다), line = 글자 아래 막대,
//   chip · chip-primary = 칩 모양 탭(고른 칩을 chip 은 검게 채우고, chip-primary 는 파란 테두리로 감싼다).
//   fitted — 탭들이 줄 너비를 똑같이 나눈다. default 는 켜져 있고, line · chip 은 꺼져 있어 글자만큼 차지하고 넘치면 가로로 스크롤한다.
// 스크롤되는 줄은 스크롤이 남은 쪽 가장자리를 흐리게 지우고(scroll-fade-x), 누른 탭을 가운데로 데려온다.
// 화살표 키로 옮기면 바로 그 탭이 골라진다(activateOnFocus).
// 움직임의 시간 · 이징은 토큰이 없어 값을 바로 적었다.
const tabsListVariants = cva("group/tabs-list relative isolate flex", {
  variants: {
    variant: {
      default: "items-stretch bg-surface-neutral-secondary p-1",
      // 바닥의 머리카락 선은 스크롤해도 제자리에 있게 안쪽 그림자로 깐다
      line: `w-full scroll-fade-x items-center overflow-x-auto overflow-y-hidden
      scroll-smooth shadow-[inset_0_-1px_var(--color-line-neutral-tertiary)]
      [scrollbar-width:none] [&::-webkit-scrollbar]:hidden`,
      chip: `w-full scroll-fade-x items-center overflow-x-auto overflow-y-hidden
      scroll-smooth [scrollbar-width:none] [&::-webkit-scrollbar]:hidden`,
      "chip-primary": `w-full scroll-fade-x items-center overflow-x-auto
      overflow-y-hidden scroll-smooth [scrollbar-width:none]
      [&::-webkit-scrollbar]:hidden`,
    },
    size: {
      sm: "",
      default: "",
      lg: "",
      xl: "",
    },
    fitted: {
      true: "",
      false: "",
    },
  },
  compoundVariants: [
    { variant: "default", fitted: true, className: "w-full" },
    { variant: "default", fitted: false, className: "w-fit" },
    { variant: "default", size: "sm", className: "h-8 rounded-10" },
    { variant: "default", size: "default", className: "h-10 rounded-12" },
    { variant: "default", size: ["lg", "xl"], className: "h-12 rounded-14" },
    { variant: "line", fitted: false, className: "gap-6" },
    { variant: ["chip", "chip-primary"], size: "sm", className: "gap-1" },
    {
      variant: ["chip", "chip-primary"],
      size: "default",
      className: "gap-1.5",
    },
    { variant: ["chip", "chip-primary"], size: "lg", className: "gap-2" },
    { variant: ["chip", "chip-primary"], size: "xl", className: "gap-2.5" },
  ],
  defaultVariants: {
    variant: "default",
    size: "default",
    fitted: true,
  },
});

const tabsIndicatorVariants = cva(
  "absolute left-0 w-(--active-tab-width) translate-x-(--active-tab-left)",
  {
    variants: {
      variant: {
        default: `top-(--active-tab-top) -z-10 h-(--active-tab-height)
        bg-surface-elevated-primary shadow-xs transition-[translate,width]
        duration-500 ease-[cubic-bezier(0.25,1.25,0.4,0.99)]`,
        // 골라 둔 탭이 비활성이면 막대도 옅어진다
        line: `bottom-0 h-0.5 bg-fg-neutral-strong
        [transition:translate_300ms_ease,width_300ms_ease,background-color_200ms_ease]
        group-has-[[data-active][data-disabled]]/tabs-list:bg-surface-neutral-tertiary`,
      },
      size: {
        sm: "",
        default: "",
        lg: "",
        xl: "",
      },
    },
    compoundVariants: [
      { variant: "default", size: ["sm", "default"], className: "rounded-8" },
      { variant: "default", size: ["lg", "xl"], className: "rounded-10" },
    ],
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  },
);

// 칩 모양 탭은 마우스를 올리거나 누르면 위에 옅은 막(::after)이 깔린다.
const tabsTriggerVariants = cva(
  `relative inline-flex shrink-0 cursor-pointer items-center justify-center
  whitespace-nowrap outline-none select-none focus-visible:outline-2
  focus-visible:outline-ring focus-visible:outline-solid
  data-disabled:pointer-events-none data-disabled:cursor-default
  [&_svg]:pointer-events-none [&_svg]:shrink-0`,
  {
    variants: {
      variant: {
        default: `min-w-0 font-medium text-fg-neutral-tertiary transition-colors
        duration-200 data-active:text-fg-neutral-primary
        data-disabled:text-fg-disable-primary
        data-disabled:data-active:text-fg-disable-primary`,
        line: `scroll-mx-6 font-semibold text-fg-neutral-quaternary
        transition-colors duration-200 ease-[ease]
        focus-visible:-outline-offset-1
        not-data-active:hover:text-fg-neutral-tertiary
        data-active:text-fg-neutral-strong data-disabled:text-fg-disable-primary
        data-disabled:data-active:text-fg-disable-primary`,
        chip: `isolate scroll-mx-6 font-medium text-fg-neutral-primary
        shadow-[inset_0_0_0_1px_var(--color-line-neutral-secondary)]
        transition-[background-color,color,box-shadow] duration-300 ease-[ease]
        [--interaction-active:0.09] [--interaction-hover:0.0375]
        after:pointer-events-none after:absolute after:inset-0 after:-z-10
        after:rounded-[inherit] after:bg-fg-neutral-primary after:opacity-0
        after:transition-opacity after:duration-150 after:ease-[ease]
        hover:after:opacity-(--interaction-hover)
        active:after:opacity-(--interaction-active)
        data-active:bg-fg-neutral-strong data-active:text-fg-neutral-inverse
        data-active:shadow-none data-active:[--interaction-active:0.12]
        data-active:[--interaction-hover:0.05]
        data-active:after:bg-fg-neutral-inverse
        data-disabled:text-fg-disable-primary
        data-disabled:data-active:bg-surface-disable-primary
        data-disabled:data-active:text-fg-disable-primary`,
        "chip-primary": `isolate scroll-mx-6 font-medium text-fg-neutral-primary
        shadow-[inset_0_0_0_1px_var(--color-line-neutral-secondary)]
        transition-[background-color,color,box-shadow] duration-300 ease-[ease]
        [--interaction-active:0.09] [--interaction-hover:0.0375]
        after:pointer-events-none after:absolute after:inset-0 after:-z-10
        after:rounded-[inherit] after:bg-fg-neutral-primary after:opacity-0
        after:transition-opacity after:duration-150 after:ease-[ease]
        hover:after:opacity-(--interaction-hover)
        active:after:opacity-(--interaction-active)
        data-active:bg-surface-brand-subtle data-active:text-fg-brand-primary
        data-active:shadow-[inset_0_0_0_1px_var(--color-line-brand-strong)]
        data-active:[--interaction-active:0.12]
        data-active:[--interaction-hover:0.05]
        data-active:after:bg-fg-brand-primary
        data-disabled:text-fg-disable-primary
        data-disabled:data-active:bg-transparent
        data-disabled:data-active:text-fg-disable-primary
        data-disabled:data-active:shadow-[inset_0_0_0_1px_var(--color-line-neutral-secondary)]`,
      },
      size: {
        sm: "",
        default: "",
        lg: "",
        xl: "",
      },
      fitted: {
        true: "flex-1",
        false: "",
      },
    },
    compoundVariants: [
      {
        variant: "default",
        size: "sm",
        className: `gap-1 rounded-8 px-1.5 text-caption1
        [&_svg:not([class*='size-'])]:size-3.5`,
      },
      {
        variant: "default",
        size: "default",
        className: `gap-1.5 rounded-8 px-2 text-label1
        [&_svg:not([class*='size-'])]:size-4`,
      },
      {
        variant: "default",
        size: ["lg", "xl"],
        className: `gap-1.5 rounded-10 px-2 text-body2
        [&_svg:not([class*='size-'])]:size-4.5`,
      },
      {
        variant: "line",
        size: "sm",
        className:
          "gap-1 py-2.25 text-body2 [&_svg:not([class*='size-'])]:size-4.5",
      },
      {
        variant: "line",
        size: "default",
        className:
          "gap-1 py-3 text-headline2 [&_svg:not([class*='size-'])]:size-5",
      },
      {
        variant: "line",
        size: ["lg", "xl"],
        className:
          "gap-1 py-3.5 text-headline2 [&_svg:not([class*='size-'])]:size-5",
      },
      // 글자만큼 차지하는 탭은 누르는 자리를 양옆으로 12px 넓힌다
      {
        variant: "line",
        fitted: false,
        className: "before:absolute before:inset-y-0 before:-inset-x-3",
      },
      {
        variant: ["chip", "chip-primary"],
        size: "sm",
        className: `min-h-6 gap-0.5 rounded-8 px-2 py-1.25 text-caption2
        [&_svg:not([class*='size-'])]:size-3`,
      },
      {
        variant: ["chip", "chip-primary"],
        size: "default",
        className: `min-h-8 gap-1 rounded-10 px-2.5 py-2 text-caption1
        [&_svg:not([class*='size-'])]:size-3.5`,
      },
      {
        variant: ["chip", "chip-primary"],
        size: "lg",
        className: `min-h-9 gap-1 rounded-10 px-3 py-2.25 text-label2
        [&_svg:not([class*='size-'])]:size-3.5`,
      },
      {
        variant: ["chip", "chip-primary"],
        size: "xl",
        className: `min-h-10 gap-1 rounded-12 px-3.5 py-2.5 text-label1
        [&_svg:not([class*='size-'])]:size-4`,
      },
    ],
    defaultVariants: {
      variant: "default",
      size: "default",
      fitted: true,
    },
  },
);

type TabsListVariants = VariantProps<typeof tabsListVariants>;

// 줄(TabsList)이 정한 모양 · 크기 · 배치를 탭(TabsTrigger)이 물려받는다.
const TabsListContext = React.createContext<TabsListVariants>({
  variant: "default",
  size: "default",
  fitted: true,
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

type TabsListProps = TabsPrimitive.List.Props &
  Omit<TabsListVariants, "fitted"> & {
    /** 탭들이 줄 너비를 똑같이 나눈다. 정하지 않으면 default 는 켜지고 line · chip 은 꺼진다. */
    fitted?: boolean;
  };

function TabsList({
  className,
  variant = "default",
  size = "default",
  fitted,
  activateOnFocus = true,
  children,
  ...props
}: TabsListProps) {
  const isFitted = fitted ?? variant === "default";
  const context = React.useMemo(
    () => ({ variant, size, fitted: isFitted }),
    [variant, size, isFitted],
  );

  return (
    <TabsListContext value={context}>
      <TabsPrimitive.List
        data-slot="tabs-list"
        data-variant={variant}
        data-size={size}
        activateOnFocus={activateOnFocus}
        className={cn(
          tabsListVariants({ variant, size, fitted: isFitted }),
          className,
        )}
        {...props}
      >
        {children}
        {(variant === "default" || variant === "line") && (
          <TabsPrimitive.Indicator
            data-slot="tabs-indicator"
            className={tabsIndicatorVariants({ variant, size })}
          />
        )}
      </TabsPrimitive.List>
    </TabsListContext>
  );
}

type TabsTriggerProps = TabsPrimitive.Tab.Props;

function TabsTrigger({ className, onClick, ...props }: TabsTriggerProps) {
  const { variant, size, fitted } = React.use(TabsListContext);

  return (
    <TabsPrimitive.Tab
      data-slot="tabs-trigger"
      className={cn(tabsTriggerVariants({ variant, size, fitted }), className)}
      onClick={(event) => {
        onClick?.(event);
        // 넘쳐서 스크롤되는 줄이면 누른 탭을 가운데로 데려온다
        event.currentTarget.scrollIntoView({
          block: "nearest",
          inline: "center",
        });
      }}
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
