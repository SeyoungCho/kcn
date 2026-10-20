"use client";

import * as React from "react";
import { mergeProps } from "@base-ui/react/merge-props";
import { Tabs as TabsPrimitive } from "@base-ui/react/tabs";
import { useRender } from "@base-ui/react/use-render";
import { cva, type VariantProps } from "class-variance-authority";
import { ChevronLeftIcon, ChevronRightIcon } from "lucide-react";

import { cn } from "@/lib/utils";

// shadcn Pagination 에 montage 의 모양을 입혔다.
//   PaginationLink size — default 는 쪽 번호(글자 버튼), icon · icon-lg 는 이전 · 다음 화살표(작게 · 크게).
//   쪽 번호 · 화살표는 마우스를 올리거나 누르면 글자보다 조금 넓은 막(::after)이 살짝 커지며 깔린다. 지금 쪽에는 막이 늘 깔려 있다.
// 더 있는 부품
//   PaginationCounter — "3/10" 쪽 표시. default 는 이전 · 다음 사이에 두는 글자, overlay 는 이미지 위에 띄우는 흐린 유리 알약.
//   PaginationDots — 점 쪽 표시(캐러셀). max 개까지만 보이고 남은 쪽 가장자리 점은 작아진다. 마우스를 올리면 모든 점이 펼쳐진다.
// 움직임의 시간 · 이징은 토큰이 없어 값을 바로 적었다.

function Pagination({ className, ...props }: React.ComponentProps<"nav">) {
  return (
    <nav
      role="navigation"
      aria-label="pagination"
      data-slot="pagination"
      className={cn("mx-auto flex w-full justify-center", className)}
      {...props}
    />
  );
}

// 이전 · 다음 사이에 PaginationCounter 를 두면 간격이 좁아진다.
function PaginationContent({
  className,
  ...props
}: React.ComponentProps<"ul">) {
  return (
    <ul
      data-slot="pagination-content"
      className={cn(
        `flex flex-row items-center gap-4
        has-data-[slot=pagination-counter]:gap-2`,
        className,
      )}
      {...props}
    />
  );
}

function PaginationItem({ className, ...props }: React.ComponentProps<"li">) {
  return (
    <li
      data-slot="pagination-item"
      className={cn("flex justify-center", className)}
      {...props}
    />
  );
}

const paginationLinkVariants = cva(
  `relative isolate inline-flex shrink-0 cursor-pointer items-center
  justify-center outline-none select-none [--interaction-active:0.09]
  [--interaction-hover:0.0375] after:pointer-events-none after:absolute
  after:-z-10 after:scale-95 after:rounded-[inherit] after:bg-fg-neutral-primary
  after:opacity-0 after:transition-[opacity,scale] after:duration-150
  after:ease-[ease] hover:after:scale-100
  hover:after:opacity-(--interaction-hover) focus-visible:outline-2
  focus-visible:outline-ring focus-visible:outline-solid active:after:scale-100
  active:after:opacity-(--interaction-active) aria-disabled:pointer-events-none
  aria-disabled:text-fg-disable-primary aria-disabled:after:hidden
  [&_svg]:pointer-events-none [&_svg]:shrink-0`,
  {
    variants: {
      size: {
        default: `min-h-8 min-w-5 rounded-10 py-1.25 text-body2 font-normal
        text-fg-neutral-secondary transition-[color,font-weight] duration-150
        ease-[ease] after:inset-y-0 after:-inset-x-1.25
        aria-[current=page]:font-medium
        aria-[current=page]:text-fg-neutral-primary
        aria-[current=page]:[--interaction-hover:0.09]
        aria-[current=page]:after:opacity-(--interaction-active)
        aria-disabled:aria-[current=page]:font-normal
        aria-disabled:aria-[current=page]:text-fg-disable-primary`,
        // 화살표는 칸보다 조금 크게 그린다 — 줄 아이콘의 꺾쇠가 칸을 채우도록
        icon: `size-4 rounded-8 text-fg-neutral-tertiary after:-inset-1
        [&_svg:not([class*='size-'])]:size-5`,
        "icon-lg": `size-6 rounded-10 text-fg-neutral-tertiary after:-inset-1.5
        [&_svg:not([class*='size-'])]:size-7`,
      },
    },
    defaultVariants: {
      size: "default",
    },
  },
);

type PaginationLinkProps = useRender.ComponentProps<"a"> &
  VariantProps<typeof paginationLinkVariants> & {
    /** 지금 보고 있는 쪽이다. */
    isActive?: boolean;
  };

function PaginationLink({
  className,
  isActive,
  size = "default",
  render,
  ...props
}: PaginationLinkProps) {
  return useRender({
    defaultTagName: "a",
    props: mergeProps<"a">(
      {
        "aria-current": isActive ? "page" : undefined,
        className: cn(paginationLinkVariants({ size }), className),
      },
      props,
    ),
    render,
    state: {
      slot: "pagination-link",
      active: isActive,
      size,
    },
  });
}

function PaginationPrevious({ size = "icon", ...props }: PaginationLinkProps) {
  return (
    <PaginationLink aria-label="Go to previous page" size={size} {...props}>
      <ChevronLeftIcon />
    </PaginationLink>
  );
}

function PaginationNext({ size = "icon", ...props }: PaginationLinkProps) {
  return (
    <PaginationLink aria-label="Go to next page" size={size} {...props}>
      <ChevronRightIcon />
    </PaginationLink>
  );
}

function PaginationEllipsis({
  className,
  ...props
}: React.ComponentProps<"span">) {
  return (
    <span
      aria-hidden
      data-slot="pagination-ellipsis"
      className={cn(
        `flex min-h-8 items-center justify-center text-body2
        text-fg-neutral-tertiary`,
        className,
      )}
      {...props}
    >
      ...
      <span className="sr-only">More pages</span>
    </span>
  );
}

const paginationCounterVariants = cva(
  "group/pagination-counter inline-flex w-fit items-center whitespace-nowrap",
  {
    variants: {
      variant: {
        default: `text-label2 font-medium text-fg-neutral-secondary
        aria-disabled:text-fg-disable-primary`,
        // 뒤를 흐리고 밝힌 유리 위에 검은 막을 한 겹 더 깐다
        overlay: `relative isolate rounded-full text-white/88 before:absolute
        before:inset-0 before:-z-10 before:rounded-[inherit] before:bg-white/35
        before:backdrop-blur-[32px] before:backdrop-brightness-150
        before:backdrop-saturate-150 after:absolute after:inset-0 after:-z-10
        after:rounded-[inherit] after:bg-black/28`,
      },
      size: {
        sm: "",
        default: "",
      },
    },
    compoundVariants: [
      {
        variant: "overlay",
        size: "sm",
        className: "gap-0.75 px-2.5 py-1 text-label2",
      },
      {
        variant: "overlay",
        size: "default",
        className: "gap-1 px-3 py-1.5 text-body2",
      },
    ],
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  },
);

type PaginationCounterProps = Omit<React.ComponentProps<"span">, "children"> &
  VariantProps<typeof paginationCounterVariants> & {
    /** 지금 쪽 번호. */
    page: number;
    /** 전체 쪽 수. */
    total: number;
  };

function PaginationCounter({
  className,
  variant = "default",
  size = "default",
  page,
  total,
  ...props
}: PaginationCounterProps) {
  return (
    <span
      data-slot="pagination-counter"
      data-variant={variant}
      data-size={size}
      className={cn(paginationCounterVariants({ variant, size }), className)}
      {...props}
    >
      <span
        data-slot="pagination-counter-page"
        className="group-data-[variant=overlay]/pagination-counter:font-semibold
          group-data-[variant=overlay]/pagination-counter:[text-shadow:0_0_6px_rgb(0_0_0/0.08)]"
      >
        {page}
      </span>
      <span
        data-slot="pagination-counter-separator"
        className="group-data-[variant=overlay]/pagination-counter:font-normal
          group-data-[variant=overlay]/pagination-counter:text-white/61"
      >
        /
      </span>
      <span
        data-slot="pagination-counter-total"
        className="group-data-[variant=overlay]/pagination-counter:font-semibold"
      >
        {total}
      </span>
    </span>
  );
}

// 보이는 점의 크기 비율 — 창(max 개) 밖은 0, 창 가장자리 쪽에 쪽이 더 남아 있으면 바깥 점일수록 작게.
// 남은 쪽이 하나뿐이거나 창이 4개 이하면 한 단계만 줄인다.
function getDotScales(count: number, index: number, max: number) {
  if (count <= max) return Array.from({ length: count }, () => 1);

  const start = Math.min(
    Math.max(index - Math.ceil(max / 2) + 1, 0),
    count - max,
  );
  const end = start + max - 1;
  const taper = (hidden: number) =>
    hidden === 0 ? [] : hidden === 1 || max <= 4 ? [0.8] : [0.6, 0.8];
  const startTaper = taper(start);
  const endTaper = taper(count - 1 - end);

  return Array.from({ length: count }, (_, index) =>
    index < start || index > end
      ? 0
      : Math.min(startTaper[index - start] ?? 1, endTaper[end - index] ?? 1),
  );
}

const paginationDotsVariants = cva(
  `group/pagination-dots relative flex w-fit items-center before:absolute
  before:-inset-2 hover:[--dots-expanded:1]
  has-focus-visible:[--dots-expanded:1]`,
  {
    variants: {
      size: {
        sm: "h-2 [--dot-size:--spacing(2)]",
        default: "h-2.5 [--dot-size:--spacing(2.5)]",
      },
    },
    defaultVariants: {
      size: "default",
    },
  },
);

// 점의 크기 · 앞 간격은 점마다 정한 비율(--dot-scale · --dot-gap)을 쓰고, 줄에 마우스가 올라가면(--dots-expanded) 모두 원래 크기로 편다.
const paginationDotVariants = cva(
  `relative size-[calc(var(--dot-size)*var(--dots-expanded,var(--dot-scale)))]
  shrink-0 cursor-pointer rounded-full outline-none transition-all duration-200
  ease-[ease]
  not-first:ms-[calc(var(--dot-size)*var(--dots-expanded,var(--dot-gap)))]
  focus-visible:outline-2 focus-visible:outline-offset-2
  focus-visible:outline-ring focus-visible:outline-solid`,
  {
    variants: {
      variant: {
        default: "bg-fg-neutral-primary/16 aria-selected:bg-fg-neutral-primary",
        // 흰 점은 바깥에 옅은 테두리를 한 겹 두른다
        overlay: `bg-white/52 after:absolute after:-inset-px after:rounded-full
        after:border after:border-line-neutral-secondary after:opacity-52
        after:transition-[border-color,opacity] after:duration-200
        after:ease-[ease] aria-selected:bg-white aria-selected:after:opacity-100
        data-hidden:after:border-transparent
        group-hover/pagination-dots:data-hidden:after:border-line-neutral-secondary
        group-has-focus-visible/pagination-dots:data-hidden:after:border-line-neutral-secondary`,
      },
    },
    defaultVariants: {
      variant: "default",
    },
  },
);

type PaginationDotsProps = Omit<
  TabsPrimitive.Root.Props,
  "value" | "defaultValue" | "onValueChange" | "orientation"
> &
  VariantProps<typeof paginationDotsVariants> &
  VariantProps<typeof paginationDotVariants> & {
    /** 전체 쪽 수. */
    count: number;
    /** 지금 쪽(1부터). 바깥에서 쥘 때 쓴다. */
    value?: number;
    /** 처음 쪽(1부터). */
    defaultValue?: number;
    /** 점을 눌러 쪽을 바꿀 때 불린다. */
    onValueChange?: (value: number) => void;
    /** 한 번에 보이는 점의 최대 개수. */
    max?: number;
  };

function PaginationDots({
  className,
  variant = "default",
  size = "default",
  count,
  value,
  defaultValue = 1,
  onValueChange,
  max = 5,
  ...props
}: PaginationDotsProps) {
  const [uncontrolledValue, setUncontrolledValue] =
    React.useState(defaultValue);
  const page = value ?? uncontrolledValue;
  const scales = getDotScales(count, page - 1, max);
  const firstVisible = scales.findIndex((scale) => scale > 0);

  return (
    <TabsPrimitive.Root
      data-slot="pagination-dots"
      value={page}
      onValueChange={(next: number) => {
        setUncontrolledValue(next);
        onValueChange?.(next);
      }}
      className={cn("w-fit", className)}
      {...props}
    >
      <TabsPrimitive.List
        data-slot="pagination-dots-list"
        data-variant={variant}
        data-size={size}
        activateOnFocus
        className={paginationDotsVariants({ size })}
      >
        {scales.map((scale, index) => (
          <TabsPrimitive.Tab
            key={index}
            value={index + 1}
            aria-label={`Page ${index + 1}`}
            data-slot="pagination-dot"
            data-hidden={scale === 0 ? "" : undefined}
            style={
              {
                "--dot-scale": scale,
                "--dot-gap": scale === 0 || index === firstVisible ? 0 : 1,
              } as React.CSSProperties
            }
            className={paginationDotVariants({ variant })}
          />
        ))}
      </TabsPrimitive.List>
    </TabsPrimitive.Root>
  );
}

export {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationPrevious,
  PaginationNext,
  PaginationEllipsis,
  PaginationCounter,
  PaginationDots,
  paginationLinkVariants,
  paginationCounterVariants,
  paginationDotsVariants,
  paginationDotVariants,
  type PaginationLinkProps,
  type PaginationCounterProps,
  type PaginationDotsProps,
};
