import type { TableRowProps } from "@repo/montage/ui/table";

export type MDXTableProps = {
  /** Makes the row pressable — it gets a pointer cursor, keyboard focus and a press highlight.
   * @default false
   */
  interactive?: TableRowProps["interactive"];
};

export type MDXTablePropsKO = {
  /** 누를 수 있는 줄로 만들어요 — 손가락 커서, 키보드 초점, 누를 때 옅은 막이 생겨요.
   * @default false
   */
  interactive?: TableRowProps["interactive"];
};
