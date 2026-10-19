import type {
  TablePinProps,
  TableProps,
  TableRowProps,
} from "@repo/seed/ui/table";

export type MDXTableProps = {
  /** Class name for the scroll container — set height or max height here instead of wrapping the table. */
  containerClassName?: TableProps["containerClassName"];
  /** Ref to the scroll container, e.g. as the root for infinite-scroll observers. */
  containerRef?: TableProps["containerRef"];
  /** Rendered inside the scroll container right after the table, e.g. an infinite-scroll sentinel. */
  scrollEnd?: TableProps["scrollEnd"];
};

export type MDXTablePropsKO = {
  /** 틀(스크롤 상자)에 줄 클래스 — 표를 감싸지 말고 높이 · 최대 높이를 여기에 줍니다. */
  containerClassName?: TableProps["containerClassName"];
  /** 틀(스크롤 상자)의 ref — 무한 스크롤의 감지 기준 등. */
  containerRef?: TableProps["containerRef"];
  /** 틀 안, 표 바로 뒤에 붙일 것 — 무한 스크롤 감지 줄 등. */
  scrollEnd?: TableProps["scrollEnd"];
};

export type MDXTableRowProps = {
  /** Makes the row look clickable — pointer cursor and a hover background.
   * @default false
   */
  clickable?: TableRowProps["clickable"];
};

export type MDXTableRowPropsKO = {
  /** 누를 수 있는 줄로 그립니다 — 손가락 모양 · 마우스를 올리면 바탕이 바뀝니다.
   * @default false
   */
  clickable?: TableRowProps["clickable"];
};

export type MDXTableCellProps = {
  /** Pins the cell to one side so it stays visible while the table scrolls horizontally. Set it on the `TableHead` and every `TableCell` of the column. */
  pin?: TablePinProps["pin"];
  /** Distance from that side (px number or CSS value) — the total width of the pinned columns before it.
   * @default 0
   */
  pinOffset?: TablePinProps["pinOffset"];
  /** Marks the boundary cell of the pinned group (last left-pinned or first right-pinned) to draw a fade where other columns scroll underneath.
   * @default false
   */
  pinEdge?: TablePinProps["pinEdge"];
};

export type MDXTableCellPropsKO = {
  /** 칸을 한쪽 끝에 고정해, 표를 옆으로 밀어도 보이게 합니다. 그 열의 `TableHead` 와 모든 `TableCell` 에 줍니다. */
  pin?: TablePinProps["pin"];
  /** 그 쪽 끝에서 띄울 거리(px 숫자 · CSS 값) — 앞에 고정된 열들의 폭.
   * @default 0
   */
  pinOffset?: TablePinProps["pinOffset"];
  /** 고정 열 묶음의 경계 칸(왼쪽 고정의 마지막 · 오른쪽 고정의 첫 칸)에 줘서, 다른 칸이 뒤로 지나갈 때 경계에 그림자를 그립니다.
   * @default false
   */
  pinEdge?: TablePinProps["pinEdge"];
};
