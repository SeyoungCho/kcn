"use client";

import * as React from "react";
import { useMergedRefs } from "@base-ui/utils/useMergedRefs";

import { useScrollEdges } from "@/lib/use-scroll-edges";
import { cn } from "@/lib/utils";

// 데이터 표 — shadcn 의 Table 짜임(Table · TableHeader · TableBody · TableRow · TableHead · TableCell · TableCaption).
// SEED 에는 데이터 표가 없어, 모양은 SEED 의 토큰으로 새로 정했다: 둥근 테두리 틀 안에서 가로 · 세로로 밀리고,
// 머리글은 회색 바탕 · 작은 글자로 틀 위에 붙어 있고(sticky), 줄은 높이를 고정하고 아래에 옅은 금을 긋는다.
// 테두리는 안쪽 그림자가 아니라 진짜 테두리로 그린다 — 배경이 있는 칸(머리글)이 선을 덮지 않게.
//
// 포그(안개) — 틀 너머에 가려진 것이 있을 때만 옅은 그라디언트가 나타난다(useScrollEdges 가 틀에 다는 data-overflow-*).
//   위   아래로 내려가 있으면 머리글 아래에
//   옆   고정 열(pin)의 경계(pinEdge)에 — 왼쪽 고정은 옆으로 밀려 있을 때, 오른쪽 고정은 끝까지 밀지 않았을 때. 위보다 더 옅게
// 어두운 바탕에서는 옅은 검정이 안 보여 더 진한 검정으로(dark:).
// 세기는 틀의 변수(--table-fog-*: 0 · 1)로 켜고 끈다 — 표 안에 표를 넣어도 안쪽 표는 제 틀의 값을 본다.

export type TableProps = React.ComponentProps<"table"> & {
  /** 틀(스크롤 상자)에 줄 클래스 — 높이 · 최대 높이 같은 것 */
  containerClassName?: string;
  /** 틀(스크롤 상자)의 ref — 무한 스크롤의 감지 기준 등 */
  containerRef?: React.Ref<HTMLDivElement>;
  /** 틀 안, 표 바로 뒤에 붙일 것 — 스크롤 영역의 끝(무한 스크롤 감지 줄 등) */
  scrollEnd?: React.ReactNode;
};

/** 표 — 둥근 테두리 틀(넘치면 가로 · 세로로 민다) 안에 그린다. 틀에 클래스를 주려면 감싸지 말고 containerClassName */
function Table({
  className,
  containerClassName,
  containerRef,
  scrollEnd,
  ...props
}: TableProps) {
  const edgesRef = useScrollEdges<HTMLDivElement>();
  const ref = useMergedRefs(edgesRef, containerRef);
  return (
    <div
      ref={ref}
      data-slot="table-container"
      className={cn(
        // isolate — 머리글 · 고정 열의 층(z-index)이 표 밖으로 새지 않게.
        // relative — 칸 안의 절대 위치 요소(화면 낭독기용 sr-only 글 등)가 이 틀을 기준으로 잡혀 틀의 스크롤 안에 머물게.
        //   없으면 그 요소들이 바깥(본문 main)을 기준으로 잡혀 틀 밖으로 새고, 본문의 스크롤 길이를 표의 전체 길이만큼 늘린다.
        `relative isolate box-border overflow-auto rounded-r3 border
        border-solid border-stroke-neutral-muted bg-bg-layer-default`,
        `[--table-fog-left:0] [--table-fog-right:0] [--table-fog-top:0]
        data-overflow-left:[--table-fog-left:1]
        data-overflow-right:[--table-fog-right:1]
        data-overflow-top:[--table-fog-top:1]`,
        // 스크롤 막대 — 세로 막대는 숨기고(머리글이 붙어 있어 위치를 안다), 가로 막대만 사이드 메뉴의 막대처럼 얇고 둥글게.
        // 표준 속성(scrollbar-width · color)이 auto 가 아니면 크롬은 ::-webkit-scrollbar 를 무시한다 — 웹킷 막대를 그리는 브라우저에서만 auto 로 되돌린다
        // (Firefox 는 한 축만 숨길 수 없어 앱 전체의 얇은 막대를 그대로 쓴다).
        `supports-[selector(::-webkit-scrollbar)]:scrollbar-auto
        supports-[selector(::-webkit-scrollbar)]:[scrollbar-color:auto]`,
        `[&::-webkit-scrollbar]:h-x2.5 [&::-webkit-scrollbar]:w-0
        [&::-webkit-scrollbar]:bg-transparent
        [&::-webkit-scrollbar-corner]:bg-transparent
        [&::-webkit-scrollbar-track]:bg-transparent`,
        `[&::-webkit-scrollbar-thumb]:rounded-full
        [&::-webkit-scrollbar-thumb]:border-2
        [&::-webkit-scrollbar-thumb]:border-solid
        [&::-webkit-scrollbar-thumb]:border-transparent
        [&::-webkit-scrollbar-thumb]:bg-bg-neutral-weak-alpha
        [&::-webkit-scrollbar-thumb]:bg-clip-content`,
        containerClassName,
      )}
    >
      <table
        data-slot="table"
        className={cn(
          "w-full border-separate border-spacing-0 text-t4 text-fg-neutral",
          className,
        )}
        {...props}
      />
      {scrollEnd}
    </div>
  );
}

function TableHeader({ className, ...props }: React.ComponentProps<"thead">) {
  return <thead data-slot="table-header" className={className} {...props} />;
}

function TableBody({ className, ...props }: React.ComponentProps<"tbody">) {
  return (
    <tbody
      data-slot="table-body"
      className={cn("[&>tr:last-child>td]:shadow-none", className)}
      {...props}
    />
  );
}

function TableFooter({ className, ...props }: React.ComponentProps<"tfoot">) {
  return (
    <tfoot
      data-slot="table-footer"
      className={cn("bg-bg-neutral-muted font-medium", className)}
      {...props}
    />
  );
}

export interface TableRowProps extends React.ComponentProps<"tr"> {
  /** 줄을 누를 수 있다 — 손가락 모양 · 마우스를 올리면 바탕이 바뀐다 */
  clickable?: boolean;
}

function TableRow({ className, clickable, ...props }: TableRowProps) {
  return (
    <tr
      data-slot="table-row"
      data-clickable={clickable ? "" : undefined}
      className={cn(
        `data-clickable:cursor-pointer
        hovered:data-clickable:[&>td]:bg-bg-layer-default-pressed`,
        `data-clickable:focused:outline-solid
        data-clickable:focused:outline-(length:--dimension-x0_5)
        data-clickable:focused:-outline-offset-(--dimension-x0_5)
        data-clickable:focused:outline-stroke-focus-ring`,
        className,
      )}
      {...props}
    />
  );
}

/** 칸을 열 고정으로 — 표를 옆으로 밀어도 그 쪽 끝에 붙어 있다 */
export interface TablePinProps {
  /** 고정할 쪽 */
  pin?: "left" | "right";
  /** 그 쪽 끝에서 띄울 거리(px 숫자 · CSS 값) — 앞에 고정된 열들의 폭. 기본 0 */
  pinOffset?: number | string;
  /** 고정 열 묶음의 경계 칸(왼쪽 고정의 마지막 · 오른쪽 고정의 첫 칸) — 다른 칸이 뒤로 지나갈 때 경계에 포그를 그린다 */
  pinEdge?: boolean;
}

// 양 끝 칸은 표 테두리와 조금 더 띄운다.
const EDGE = "first:pl-x4 last:pr-x4";

// 고정 열의 경계 포그(::after) — 칸 밖으로 그라디언트를 그린다
const PIN_EDGE_FOG = {
  left: "after:pointer-events-none after:absolute after:inset-y-0 after:left-full after:w-x2 after:bg-linear-to-r after:from-static-black-alpha-200 after:to-transparent dark:after:from-static-black-alpha-700 after:opacity-(--table-fog-left) after:transition-opacity after:duration-d4 after:ease-easing",
  right:
    "after:pointer-events-none after:absolute after:inset-y-0 after:right-full after:w-x2 after:bg-linear-to-l after:from-static-black-alpha-200 after:to-transparent dark:after:from-static-black-alpha-700 after:opacity-(--table-fog-right) after:transition-opacity after:duration-d4 after:ease-easing",
};

const pinStyle = (
  pin: TablePinProps["pin"],
  pinOffset: TablePinProps["pinOffset"],
  style: React.CSSProperties | undefined,
) => (pin ? { [pin]: pinOffset ?? 0, ...style } : style);

function TableHead({
  className,
  pin,
  pinOffset,
  pinEdge,
  style,
  ...props
}: React.ComponentProps<"th"> & TablePinProps) {
  return (
    <th
      data-slot="table-head"
      data-pin={pin}
      className={cn(
        // 틀 위에 붙는다(세로로 밀 때). 고정 열의 머리글은 그 위 층
        `sticky top-0 z-2 box-border bg-bg-neutral-muted px-x3 py-x2.5 text-left
        align-middle text-t3 font-medium whitespace-nowrap
        text-fg-neutral-muted`,
        "shadow-[inset_0_-1px_0_0_var(--stroke-neutral-muted)]",
        // 위 포그(::before) — 아래로 내려가 있으면 머리글 아래에
        `before:pointer-events-none before:absolute before:inset-x-0
        before:top-full before:h-x2 before:bg-linear-to-b
        before:from-static-black-alpha-300 before:to-transparent
        dark:before:from-static-black-alpha-800 before:opacity-(--table-fog-top)
        before:transition-opacity before:duration-d4 before:ease-easing`,
        EDGE,
        pin && "z-3",
        pin && pinEdge && PIN_EDGE_FOG[pin],
        className,
      )}
      style={pinStyle(pin, pinOffset, style)}
      {...props}
    />
  );
}

/** 칸 — 줄 높이를 고정한다(버튼이 있는 줄과 없는 줄의 높이가 달라지지 않게) */
function TableCell({
  className,
  pin,
  pinOffset,
  pinEdge,
  style,
  ...props
}: React.ComponentProps<"td"> & TablePinProps) {
  return (
    <td
      data-slot="table-cell"
      data-pin={pin}
      className={cn(
        `box-border h-x12 px-x3 py-x2 align-middle text-fg-neutral
        shadow-[inset_0_-1px_0_0_var(--stroke-neutral-subtle)]`,
        "[transition:background-color_var(--motion-duration-color-transition)_var(--motion-ease-easing)]",
        EDGE,
        // 고정 열 — 뒤로 지나가는 칸을 가리게 바탕을 칠한다(마우스를 올린 줄의 바탕은 TableRow 가 칸마다 칠한다)
        pin && "sticky z-1 bg-bg-layer-default",
        pin && pinEdge && PIN_EDGE_FOG[pin],
        className,
      )}
      style={pinStyle(pin, pinOffset, style)}
      {...props}
    />
  );
}

/** 표의 이름 — 화면에는 보이지 않고 화면 낭독기만 읽는다 */
function TableCaption({
  className,
  ...props
}: React.ComponentProps<"caption">) {
  return (
    <caption
      data-slot="table-caption"
      className={cn("sr-only", className)}
      {...props}
    />
  );
}

export {
  Table,
  TableHeader,
  TableBody,
  TableFooter,
  TableRow,
  TableHead,
  TableCell,
  TableCaption,
};
