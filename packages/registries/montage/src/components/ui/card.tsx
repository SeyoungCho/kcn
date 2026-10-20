"use client";

import type * as React from "react";
import { mergeProps } from "@base-ui/react/merge-props";
import { useRender } from "@base-ui/react/use-render";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

// shadcn Card 에 montage 의 모양을 입혔다 — 면 · 테두리 없이 썸네일(CardMedia) 아래에 글자를 쌓는 콘텐츠 카드다.
//   size — default 는 넓은 화면, sm 은 좁은 화면. 간격 · 썸네일 비율 · 제목 글자 · 글자 칸의 옆 여백이 바뀐다.
//   orientation — vertical 은 썸네일 아래에 글자, horizontal 은 왼쪽 썸네일 옆에 글자를 두는 목록용 카드다.
// 카드 위에 마우스를 올리면 썸네일 사진이 살짝 커진다. render 로 <a> 를 그리면 카드 전체가 링크가 된다.
const cardVariants = cva("group/card flex w-full min-w-0 text-left", {
  variants: {
    size: {
      default: "",
      sm: "",
    },
    orientation: {
      vertical: "flex-col",
      horizontal: "flex-row items-center",
    },
  },
  compoundVariants: [
    { orientation: "vertical", size: "default", className: "gap-2" },
    { orientation: "vertical", size: "sm", className: "gap-1.5" },
    { orientation: "horizontal", size: "default", className: "gap-4" },
    { orientation: "horizontal", size: "sm", className: "gap-3" },
  ],
  defaultVariants: {
    size: "default",
    orientation: "vertical",
  },
});

type CardProps = useRender.ComponentProps<"div"> &
  VariantProps<typeof cardVariants>;

function Card({
  className,
  size = "default",
  orientation = "vertical",
  render,
  ...props
}: CardProps) {
  return useRender({
    defaultTagName: "div",
    props: mergeProps<"div">(
      { className: cn(cardVariants({ size, orientation }), className) },
      props,
    ),
    render,
    state: { slot: "card", size, orientation },
  });
}

// 썸네일 칸 — <img> 를 자식으로 넣는다. 비율은 vertical 3:2(sm 은 4:3), horizontal 은 3:2 에 폭이 고정이다.
// 둘레에 가는 선(::after)을 두르고, 카드에 마우스를 올리면 사진만 살짝 커진다.
function CardMedia({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="card-media"
      className={cn(
        `relative isolate aspect-3/2 w-full shrink-0 overflow-hidden rounded-12
        after:pointer-events-none after:absolute after:inset-0
        after:rounded-[inherit] after:border after:border-line-neutral-secondary
        group-data-[orientation=horizontal]/card:w-30 [&>img]:size-full
        [&>img]:object-cover [&>img]:transition-transform [&>img]:duration-200
        [&>img]:ease-[ease] group-hover/card:[&>img]:scale-[1.025]`,
        `group-data-[size=sm]/card:group-data-[orientation=horizontal]/card:w-24
        group-data-[size=sm]/card:group-data-[orientation=vertical]/card:aspect-4/3`,
        className,
      )}
      {...props}
    />
  );
}

// 썸네일 위의 줄(CardMedia 안) 또는 가로 카드의 앞 · 뒤 칸(체크박스 · 아이콘 · 토글 버튼).
// 썸네일 위에서는 위에서 아래로 옅어지는 검은 막을 깔고 흰 글자 · 버튼을 얹는다 — 글자는 왼쪽, 버튼은 오른쪽으로 간다.
// 막이 옅어지는 곡선은 맞는 유틸리티가 없어 mask-image 값으로 적는다.
function CardAction({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="card-action"
      className={cn(
        `flex shrink-0 items-center justify-center
        [&_svg:not([class*='size-'])]:size-6`,
        `in-data-[slot=card-media]:absolute in-data-[slot=card-media]:inset-x-0
        in-data-[slot=card-media]:top-0 in-data-[slot=card-media]:z-1
        in-data-[slot=card-media]:isolate in-data-[slot=card-media]:items-start
        in-data-[slot=card-media]:justify-end in-data-[slot=card-media]:gap-1
        in-data-[slot=card-media]:p-3.5 in-data-[slot=card-media]:text-label2
        in-data-[slot=card-media]:font-semibold
        in-data-[slot=card-media]:text-white
        in-data-[slot=card-media]:before:absolute
        in-data-[slot=card-media]:before:inset-0
        in-data-[slot=card-media]:before:-z-1
        in-data-[slot=card-media]:before:bg-black
        in-data-[slot=card-media]:before:opacity-35
        in-data-[slot=card-media]:before:[mask-image:linear-gradient(to_bottom,#000,rgb(0_0_0/0.73)_26%,rgb(0_0_0/0.52)_46%,rgb(0_0_0/0.35)_60%,rgb(0_0_0/0.18)_76%,rgb(0_0_0/0.07)_87%,transparent)]
        in-data-[slot=card-media]:[&_button]:text-white
        in-data-[slot=card-media]:[&>:not(button)]:me-auto`,
        `group-data-[size=sm]/card:in-data-[slot=card-media]:p-2.5
        group-data-[size=sm]/card:in-data-[slot=card-media]:text-caption2
        group-data-[size=sm]/card:in-data-[slot=card-media]:[&_svg:not([class*='size-'])]:size-5`,
        className,
      )}
      {...props}
    />
  );
}

// 글자 칸 — 제목과 설명을 쌓는다.
function CardHeader({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="card-header"
      className={cn(
        `flex min-w-0 flex-1 flex-col gap-0.5 px-1.5
        group-data-[orientation=horizontal]/card:px-0
        group-data-[size=sm]/card:group-data-[orientation=vertical]/card:px-0.5`,
        className,
      )}
      {...props}
    />
  );
}

// vertical 은 두 줄, horizontal 은 한 줄까지 보이고 넘치면 말줄임한다. 글자 색은 둘레의 것을 그대로 쓴다.
function CardTitle({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="card-title"
      className={cn(
        `mb-0.5 line-clamp-2 text-body1 font-semibold wrap-anywhere break-keep
        group-data-[orientation=horizontal]/card:line-clamp-1
        group-data-[size=sm]/card:text-body2`,
        className,
      )}
      {...props}
    />
  );
}

// 한 줄 설명. 여러 개를 이어 두어도 된다(부가 설명 · 추가 설명).
function CardDescription({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="card-description"
      className={cn(
        "truncate text-label2 font-medium text-fg-neutral-tertiary",
        className,
      )}
      {...props}
    />
  );
}

function CardContent({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="card-content"
      className={cn(
        `px-1.5 group-data-[orientation=horizontal]/card:px-0
        group-data-[size=sm]/card:group-data-[orientation=vertical]/card:px-0.5`,
        className,
      )}
      {...props}
    />
  );
}

// 글자 아래의 줄 — 배지 같은 부가 정보를 나란히 둔다.
function CardFooter({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="card-footer"
      className={cn(
        `mt-0.5 flex flex-wrap items-center gap-1.5 px-1.5
        group-data-[orientation=horizontal]/card:px-0
        group-data-[size=sm]/card:group-data-[orientation=vertical]/card:px-0.5`,
        className,
      )}
      {...props}
    />
  );
}

export {
  Card,
  CardMedia,
  CardHeader,
  CardTitle,
  CardDescription,
  CardAction,
  CardContent,
  CardFooter,
  cardVariants,
  type CardProps,
};
