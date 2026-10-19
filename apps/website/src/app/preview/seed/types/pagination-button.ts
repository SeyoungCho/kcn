import type { PaginationButtonProps } from "@repo/seed/ui/pagination-button";

export type MDXPaginationButtonProps = {
  /** The single icon to draw, passed as an element such as `<IconChevronLeftLine />`. */
  children: PaginationButtonProps["children"];
  /** Name read by screen readers — required, since the button shows only an icon. */
  "aria-label"?: PaginationButtonProps["aria-label"];
  /** @default false */
  disabled?: PaginationButtonProps["disabled"];
  onClick?: PaginationButtonProps["onClick"];
};

export type MDXPaginationButtonPropsKO = {
  /** 그릴 아이콘 하나 — `<IconChevronLeftLine />` 처럼 요소로 줍니다. */
  children: PaginationButtonProps["children"];
  /** 스크린 리더가 읽는 이름 — 아이콘만 있는 버튼이라 꼭 주세요. */
  "aria-label"?: PaginationButtonProps["aria-label"];
  /** @default false */
  disabled?: PaginationButtonProps["disabled"];
  onClick?: PaginationButtonProps["onClick"];
};
