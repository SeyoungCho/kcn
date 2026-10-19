import type {
  UseTablePaginationKnownProps,
  UseTablePaginationUnknownProps,
} from "@repo/seed/ui/table-pagination";

type Base = Pick<UseTablePaginationKnownProps, "value" | "onValueChange">;

export type MDXTablePaginationProps = Base & {
  /** Initial value when uncontrolled.
   * @default { page: 1, pageSize: 10 }
   */
  defaultValue?: UseTablePaginationKnownProps["defaultValue"];
  /** Rows-per-page choices. The current page size is added if missing.
   * @default [10, 25, 50]
   */
  pageSizeOptions?: UseTablePaginationKnownProps["pageSizeOptions"];
  /** Disables navigation and both selects.
   * @default false
   */
  disabled?: UseTablePaginationKnownProps["disabled"];
  /** Total number of rows. When set, the range select and total are shown. Omit it and pass `hasPreviousPage` / `hasNextPage` when the total is unknown. */
  totalItems?: UseTablePaginationKnownProps["totalItems"];
  /** Pages listed in the range select (known total only). By default every page up to 200, otherwise the first, last, and pages around the current one. */
  pageOptions?: UseTablePaginationKnownProps["pageOptions"];
  /** Whether a previous page exists — required when `totalItems` is omitted. */
  hasPreviousPage?: UseTablePaginationUnknownProps["hasPreviousPage"];
  /** Whether a next page exists — required when `totalItems` is omitted. */
  hasNextPage?: UseTablePaginationUnknownProps["hasNextPage"];
  /** Rows actually on the current page (unknown total only), used for the range text.
   * @default pageSize
   */
  currentPageItemCount?: UseTablePaginationUnknownProps["currentPageItemCount"];
};

export type MDXTablePaginationPropsKO = Base & {
  /** 제어하지 않을 때의 처음 값.
   * @default { page: 1, pageSize: 10 }
   */
  defaultValue?: UseTablePaginationKnownProps["defaultValue"];
  /** 고를 수 있는 한 쪽의 줄 수. 지금 줄 수가 없으면 끼워 넣습니다.
   * @default [10, 25, 50]
   */
  pageSizeOptions?: UseTablePaginationKnownProps["pageSizeOptions"];
  /** 옮기기 · 고르기를 모두 막습니다.
   * @default false
   */
  disabled?: UseTablePaginationKnownProps["disabled"];
  /** 전체 줄 수. 주면 범위 선택과 전체 수가 보입니다. 전체 수를 모르면 빼고 `hasPreviousPage` · `hasNextPage` 를 줍니다. */
  totalItems?: UseTablePaginationKnownProps["totalItems"];
  /** 범위 선택에 보일 쪽(전체 수를 알 때만). 안 주면 200쪽까지는 전부, 더 많으면 첫 · 마지막 · 지금 쪽의 둘레. */
  pageOptions?: UseTablePaginationKnownProps["pageOptions"];
  /** 앞쪽이 있는지 — `totalItems` 를 안 줄 때 꼭 줍니다. */
  hasPreviousPage?: UseTablePaginationUnknownProps["hasPreviousPage"];
  /** 뒤쪽이 있는지 — `totalItems` 를 안 줄 때 꼭 줍니다. */
  hasNextPage?: UseTablePaginationUnknownProps["hasNextPage"];
  /** 지금 쪽에 실제로 있는 줄 수(전체 수를 모를 때만) — 범위 글자에 씁니다.
   * @default pageSize
   */
  currentPageItemCount?: UseTablePaginationUnknownProps["currentPageItemCount"];
};
