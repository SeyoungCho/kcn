"use client";

import * as React from "react";
import IconChevronLeftLine from "@karrotmarket/react-monochrome-icon/IconChevronLeftLine";
import IconChevronRightLine from "@karrotmarket/react-monochrome-icon/IconChevronRightLine";

import { PaginationButton } from "@/components/ui/pagination-button";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
} from "@/components/ui/select";
import { cn } from "@/lib/utils";

// 표 아래의 쪽 나눔 — 왼쪽에 한 쪽의 줄 수, 오른쪽에 보이는 범위(전체 수를 알면 고를 수 있다)와 이전 · 다음 버튼.

// ── 셈(useTablePagination) ───────────────────────────────────────────────────

const DEFAULT_VALUE: TablePaginationValue = { page: 1, pageSize: 10 };
const DEFAULT_PAGE_SIZE_OPTIONS: readonly number[] = [10, 25, 50];
const EMPTY_PAGE_RANGE_OPTIONS: readonly TablePaginationPageRangeOption[] = [];
// 쪽이 이보다 많으면 범위 선택지를 첫 쪽 · 마지막 쪽 · 지금 쪽의 둘레로 줄인다.
const MAX_AUTO_PAGE_OPTIONS = 200;

export interface TablePaginationValue {
  /** 지금 쪽 — 1 부터 */
  page: number;
  /** 한 쪽의 줄 수 */
  pageSize: number;
}

export type TablePaginationChangeReason =
  | "previous"
  | "next"
  | "page-range"
  | "page-size"
  | "constraint";

export interface TablePaginationChangeDetails {
  /** 바뀐 까닭 — 'constraint' 는 쪽이 범위를 벗어나 고쳐진 것 */
  reason: TablePaginationChangeReason;
  previousValue: TablePaginationValue;
}

export interface TablePaginationPageRangeOption {
  page: number;
  start: number;
  end: number;
}

interface UseTablePaginationBaseProps {
  value?: TablePaginationValue;
  /** @default { page: 1, pageSize: 10 } */
  defaultValue?: TablePaginationValue;
  onValueChange?: (
    value: TablePaginationValue,
    details: TablePaginationChangeDetails,
  ) => void;
  /** 고를 수 있는 한 쪽의 줄 수 @default [10, 25, 50] */
  pageSizeOptions?: readonly number[];
  /** 옮기기 · 고르기를 모두 막는다 @default false */
  disabled?: boolean;
}

export interface UseTablePaginationKnownProps extends UseTablePaginationBaseProps {
  /** 전체 줄 수 */
  totalItems: number;
  /** 범위 선택지에 보일 쪽 — 안 주면 200쪽까지는 전부, 더 많으면 첫 · 마지막 · 지금 쪽의 둘레 */
  pageOptions?: readonly number[];
  hasPreviousPage?: never;
  hasNextPage?: never;
  currentPageItemCount?: never;
}

export interface UseTablePaginationUnknownProps extends UseTablePaginationBaseProps {
  totalItems?: never;
  pageOptions?: never;
  /** 앞쪽이 있는지 — 전체 수를 모를 때 서버가 알려 주는 값 */
  hasPreviousPage: boolean;
  hasNextPage: boolean;
  /** 지금 쪽에 실제로 있는 줄 수 — 안 주면 pageSize */
  currentPageItemCount?: number;
}

export type UseTablePaginationProps =
  | UseTablePaginationKnownProps
  | UseTablePaginationUnknownProps;

function assertSafeInteger(value: number, name: string) {
  if (!Number.isSafeInteger(value))
    throw new RangeError(`TablePagination: ${name}는 안전한 정수여야 합니다.`);
}

function assertPositiveInteger(value: number, name: string) {
  assertSafeInteger(value, name);
  if (value < 1)
    throw new RangeError(
      `TablePagination: ${name}는 1 이상의 정수여야 합니다.`,
    );
}

function validateValue(
  value: TablePaginationValue | undefined,
  name: "value" | "defaultValue",
) {
  if (value === undefined) return;
  assertSafeInteger(value.page, `${name}.page`);
  assertPositiveInteger(value.pageSize, `${name}.pageSize`);
}

function validateOptions(
  options: readonly number[],
  name: "pageOptions" | "pageSizeOptions",
) {
  const seen = new Set<number>();
  options.forEach((option, index) => {
    assertPositiveInteger(option, `${name}[${index}]`);
    if (seen.has(option))
      throw new RangeError(
        `TablePagination: ${name}에는 중복 값을 전달할 수 없습니다.`,
      );
    seen.add(option);
  });
}

function validateProps(props: UseTablePaginationProps) {
  validateValue(props.value, "value");
  validateValue(props.defaultValue, "defaultValue");
  validateOptions(
    props.pageSizeOptions ?? DEFAULT_PAGE_SIZE_OPTIONS,
    "pageSizeOptions",
  );

  if (props.totalItems !== undefined) {
    assertSafeInteger(props.totalItems, "totalItems");
    if (props.totalItems < 0)
      throw new RangeError(
        "TablePagination: totalItems는 0 이상의 정수여야 합니다.",
      );
    if (props.pageOptions !== undefined)
      validateOptions(props.pageOptions, "pageOptions");
    return;
  }

  if (
    typeof props.hasPreviousPage !== "boolean" ||
    typeof props.hasNextPage !== "boolean"
  ) {
    throw new TypeError(
      "TablePagination: 전체 항목 수를 모르는 경우 hasPreviousPage와 hasNextPage가 필요합니다.",
    );
  }
  if (props.currentPageItemCount !== undefined) {
    assertSafeInteger(props.currentPageItemCount, "currentPageItemCount");
    if (props.currentPageItemCount < 0)
      throw new RangeError(
        "TablePagination: currentPageItemCount는 0 이상의 정수여야 합니다.",
      );
  }
}

const clampPage = (page: number, totalPages: number | undefined) => {
  if (totalPages === 0) return 1;
  return totalPages === undefined
    ? Math.max(page, 1)
    : Math.min(Math.max(page, 1), totalPages);
};

function createRange(page: number, pageSize: number, itemCount: number) {
  if (itemCount === 0) return { start: 0, end: 0 };
  const offset = (page - 1) * pageSize;
  const start = offset + 1;
  const end = offset + itemCount;
  if (
    !Number.isSafeInteger(offset) ||
    !Number.isSafeInteger(start) ||
    !Number.isSafeInteger(end)
  ) {
    throw new RangeError(
      "TablePagination: page와 pageSize로 계산한 범위가 안전한 정수를 벗어납니다.",
    );
  }
  return { start, end };
}

function createKnownRange(page: number, pageSize: number, totalItems: number) {
  if (totalItems === 0) return { start: 0, end: 0 };
  const offset = (page - 1) * pageSize;
  if (!Number.isSafeInteger(offset))
    throw new RangeError(
      "TablePagination: page와 pageSize로 계산한 범위가 안전한 정수를 벗어납니다.",
    );
  return createRange(page, pageSize, Math.min(pageSize, totalItems - offset));
}

function createAutoPageOptions(page: number, totalPages: number) {
  if (totalPages <= MAX_AUTO_PAGE_OPTIONS)
    return Array.from({ length: totalPages }, (_, index) => index + 1);
  const windowSize = MAX_AUTO_PAGE_OPTIONS - 2;
  const centeredStart = page - Math.floor((windowSize - 1) / 2);
  const windowStart = Math.min(
    Math.max(centeredStart, 2),
    totalPages - windowSize,
  );
  return [
    1,
    ...Array.from({ length: windowSize }, (_, index) => windowStart + index),
    totalPages,
  ];
}

/** 쪽 나눔의 셈 — 지금 쪽 · 범위 · 선택지와, 옮기는 함수들을 준다. */
function useTablePagination(props: UseTablePaginationProps) {
  validateProps(props);

  const {
    value: valueProp,
    defaultValue = DEFAULT_VALUE,
    onValueChange,
    pageSizeOptions: pageSizeOptionsProp = DEFAULT_PAGE_SIZE_OPTIONS,
    disabled = false,
  } = props;
  const { totalItems, pageOptions } = props;

  const [innerValue, setInnerValue] = React.useState(defaultValue);
  const rawValue = valueProp ?? innerValue;
  const controlled = valueProp !== undefined;
  const onValueChangeRef = React.useRef(onValueChange);
  onValueChangeRef.current = onValueChange;
  const setRawValue = React.useCallback(
    (next: TablePaginationValue, details: TablePaginationChangeDetails) => {
      if (!controlled) setInnerValue(next);
      onValueChangeRef.current?.(next, details);
    },
    [controlled],
  );

  const totalPages =
    totalItems === undefined
      ? undefined
      : Math.ceil(totalItems / rawValue.pageSize);
  const page = clampPage(rawValue.page, totalPages);
  const pageSize = rawValue.pageSize;
  const value = React.useMemo(
    () => (rawValue.page === page ? rawValue : { page, pageSize }),
    [page, pageSize, rawValue],
  );

  // 줄이 줄어 지금 쪽이 없어졌으면 고친 쪽을 알린다(같은 어긋남은 한 번만).
  const constraintKeyRef = React.useRef<string | undefined>(undefined);
  React.useEffect(() => {
    if (rawValue.page === page) {
      constraintKeyRef.current = undefined;
      return;
    }
    const constraintKey = `${rawValue.page}:${rawValue.pageSize}:${page}:${pageSize}`;
    if (constraintKeyRef.current === constraintKey) return;
    constraintKeyRef.current = constraintKey;
    setRawValue(value, { reason: "constraint", previousValue: rawValue });
  }, [page, pageSize, rawValue, setRawValue, value]);

  // 지금의 줄 수가 선택지에 없어도 고른 것으로 보이게 끼워 넣는다.
  const pageSizeOptions = React.useMemo(
    () =>
      [...new Set([...pageSizeOptionsProp, pageSize])].sort((a, b) => a - b),
    [pageSize, pageSizeOptionsProp],
  );

  const pageRangeOptions = React.useMemo(() => {
    if (totalItems === undefined || totalPages === undefined)
      return EMPTY_PAGE_RANGE_OPTIONS;
    const pages = new Set(
      (pageOptions ?? createAutoPageOptions(page, totalPages)).filter(
        (option) => option <= totalPages,
      ),
    );
    pages.add(page);
    return [...pages]
      .sort((a, b) => a - b)
      .map((optionPage) => ({
        page: optionPage,
        ...createKnownRange(optionPage, pageSize, totalItems),
      }));
  }, [page, pageSize, pageOptions, totalItems, totalPages]);

  let range: { start: number; end: number };
  let hasPreviousPage: boolean;
  let hasNextPage: boolean;
  if (totalItems !== undefined && totalPages !== undefined) {
    range = createKnownRange(page, pageSize, totalItems);
    hasPreviousPage = totalItems > 0 && page > 1;
    hasNextPage = totalItems > 0 && page < totalPages;
  } else {
    range = createRange(
      page,
      pageSize,
      Math.min(props.currentPageItemCount ?? pageSize, pageSize),
    );
    hasPreviousPage = page > 1 && !!props.hasPreviousPage;
    hasNextPage = !!props.hasNextPage;
  }

  const changePage = (
    nextPage: number,
    reason: "previous" | "next" | "page-range",
  ) => {
    if (disabled) return;
    assertSafeInteger(nextPage, "goToPage의 page");
    const constrainedPage = clampPage(nextPage, totalPages);
    if (constrainedPage === page) return;
    setRawValue(
      { page: constrainedPage, pageSize },
      { reason, previousValue: value },
    );
  };

  return {
    value,
    page,
    pageSize,
    range,
    pageSizeOptions,
    pageRangeOptions,
    totalItems,
    totalPages,
    isTotalKnown: totalItems !== undefined,
    hasPreviousPage,
    hasNextPage,
    disabled,
    pageRangeSelectDisabled:
      totalItems === undefined || disabled || pageRangeOptions.length <= 1,
    goToPage: (nextPage: number) => changePage(nextPage, "page-range"),
    // 줄 수를 바꾸면 첫 쪽으로 돌아간다.
    setPageSize: (nextPageSize: number) => {
      if (disabled) return;
      assertPositiveInteger(nextPageSize, "setPageSize의 pageSize");
      if (nextPageSize === pageSize) return;
      setRawValue(
        { page: 1, pageSize: nextPageSize },
        { reason: "page-size", previousValue: value },
      );
    },
    goToPreviousPage: () => {
      if (hasPreviousPage) changePage(page - 1, "previous");
    },
    goToNextPage: () => {
      if (hasNextPage) changePage(page + 1, "next");
    },
  };
}

// ── 화면 ─────────────────────────────────────────────────────────────────────

const DEFAULT_LOCALE = "ko-KR";

/** 화면에 보이고 읽어 주는 글 — 숫자는 locale 로 적은 글로 받는다 */
export interface TablePaginationLabels {
  rootAriaLabel: string;
  pageRangeAriaLabel: string;
  pageSizeAriaLabel: string;
  previousPageAriaLabel: string;
  nextPageAriaLabel: string;
  /** 범위 선택지 · 전체 수를 모를 때의 범위 — '1-10' */
  range: (start: string, end: string) => string;
  /** 범위 옆의 전체 수 — '/ 총 120개' */
  total: (totalItems: string) => string;
  /** 쪽당 줄 수 선택지 — '10개' */
  pageSize: (size: string) => string;
  /** 쪽당 줄 수 상자 옆의 글 — '씩 보기' */
  pageSizeSuffix: string;
}

const DEFAULT_LABELS: TablePaginationLabels = {
  rootAriaLabel: "표 페이지 탐색",
  pageRangeAriaLabel: "표시 범위",
  pageSizeAriaLabel: "페이지당 표시 개수",
  previousPageAriaLabel: "이전 페이지",
  nextPageAriaLabel: "다음 페이지",
  range: (start, end) => `${start}-${end}`,
  total: (totalItems) => `/ 총 ${totalItems}개`,
  pageSize: (size) => `${size}개`,
  pageSizeSuffix: "씩 보기",
};

const ROW = "box-border flex min-w-max shrink-0 items-center";
const SELECT_BOX = "box-border flex w-max min-w-24 shrink-0";
const TEXT = "m-0 text-t4 font-regular whitespace-nowrap";

type DistributiveOmit<T, K extends PropertyKey> = T extends unknown
  ? Omit<T, K>
  : never;

export type TablePaginationProps = UseTablePaginationProps & {
  /** 보이고 읽어 주는 글 — 준 것만 바꾼다(기본 한국어) */
  labels?: Partial<TablePaginationLabels>;
  /** 숫자를 적는 방식 @default "ko-KR" */
  locale?: string | string[];
} & DistributiveOmit<
    React.ComponentProps<"div">,
    keyof UseTablePaginationProps | "children" | "role"
  >;

function TablePagination(props: TablePaginationProps) {
  const {
    value: _value,
    defaultValue: _defaultValue,
    onValueChange: _onValueChange,
    pageSizeOptions: _pageSizeOptions,
    disabled: _disabled,
    totalItems: _totalItems,
    pageOptions: _pageOptions,
    hasPreviousPage: _hasPreviousPage,
    hasNextPage: _hasNextPage,
    currentPageItemCount: _currentPageItemCount,
    labels: labelsProp,
    locale = DEFAULT_LOCALE,
    className,
    ...rootProps
  } = props;
  const localeKey = Intl.getCanonicalLocales(locale).join(",");
  const numberFormatter = React.useMemo(
    () => new Intl.NumberFormat(localeKey === "" ? [] : localeKey.split(",")),
    [localeKey],
  );
  const labels = { ...DEFAULT_LABELS, ...labelsProp };
  const tablePaginationText = {
    ...labels,
    range: (start: number, end: number) =>
      labels.range(numberFormatter.format(start), numberFormatter.format(end)),
    total: (totalItems: number) =>
      labels.total(numberFormatter.format(totalItems)),
    pageSize: (size: number) => labels.pageSize(numberFormatter.format(size)),
  };
  const pagination = useTablePagination(props);
  const previousDisabled = pagination.disabled || !pagination.hasPreviousPage;
  const nextDisabled = pagination.disabled || !pagination.hasNextPage;

  // 선택 상자는 값을 글자로 주고받는다.
  const pick = (values: string[], apply: (value: number) => void) => {
    const next = Number(values[0]);
    if (Number.isSafeInteger(next)) apply(next);
  };

  return (
    <div
      data-slot="table-pagination"
      aria-label={tablePaginationText.rootAriaLabel}
      aria-disabled={pagination.disabled || undefined}
      data-disabled={pagination.disabled ? "" : undefined}
      // 늘 한 줄이다 — 좁으면 줄이지 않고 넘친다(가로로 미는 것은 감싸는 쪽이 정한다).
      className={cn(
        `box-border flex h-10 w-full min-w-max flex-nowrap items-center
        justify-between gap-x4`,
        className,
      )}
      {...rootProps}
      role="group"
    >
      <div data-slot="table-pagination-page-size" className={cn(ROW, "gap-x2")}>
        <div className={SELECT_BOX}>
          <Select
            size="medium"
            value={[String(pagination.pageSize)]}
            onValueChange={(values) => pick(values, pagination.setPageSize)}
            disabled={pagination.disabled}
          >
            <SelectTrigger
              aria-label={tablePaginationText.pageSizeAriaLabel}
              style={{ minWidth: 96 }}
            />
            <SelectContent>
              <SelectGroup>
                {pagination.pageSizeOptions.map((pageSize) => (
                  <SelectItem
                    key={pageSize}
                    value={String(pageSize)}
                    label={tablePaginationText.pageSize(pageSize)}
                  />
                ))}
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>
        <span className={TEXT}>{tablePaginationText.pageSizeSuffix}</span>
      </div>

      <div data-slot="table-pagination-pages" className={cn(ROW, "gap-x4")}>
        {pagination.totalItems !== undefined ? (
          <div
            data-slot="table-pagination-page-range"
            className={cn(ROW, "gap-x2")}
          >
            <div className={SELECT_BOX}>
              <Select
                size="medium"
                value={[String(pagination.page)]}
                onValueChange={(values) => pick(values, pagination.goToPage)}
                disabled={
                  pagination.disabled || pagination.pageRangeSelectDisabled
                }
              >
                <SelectTrigger
                  aria-label={tablePaginationText.pageRangeAriaLabel}
                  style={{ minWidth: 96 }}
                />
                <SelectContent
                  style={
                    { "--select-max-height": "240px" } as React.CSSProperties
                  }
                >
                  <SelectGroup>
                    {pagination.pageRangeOptions.map((option) => (
                      <SelectItem
                        key={option.page}
                        value={String(option.page)}
                        label={tablePaginationText.range(
                          option.start,
                          option.end,
                        )}
                      />
                    ))}
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>
            <span className={TEXT}>
              {tablePaginationText.total(pagination.totalItems)}
            </span>
          </div>
        ) : (
          <span className={TEXT}>
            {tablePaginationText.range(
              pagination.range.start,
              pagination.range.end,
            )}
          </span>
        )}
        <div
          data-slot="table-pagination-buttons"
          className="box-border flex items-center"
        >
          <PaginationButton
            disabled={previousDisabled}
            aria-disabled={previousDisabled || undefined}
            data-disabled={previousDisabled ? "" : undefined}
            aria-label={tablePaginationText.previousPageAriaLabel}
            onClick={pagination.goToPreviousPage}
          >
            <IconChevronLeftLine />
          </PaginationButton>
          <PaginationButton
            disabled={nextDisabled}
            aria-disabled={nextDisabled || undefined}
            data-disabled={nextDisabled ? "" : undefined}
            aria-label={tablePaginationText.nextPageAriaLabel}
            onClick={pagination.goToNextPage}
          >
            <IconChevronRightLine />
          </PaginationButton>
        </div>
      </div>
    </div>
  );
}

export { TablePagination, useTablePagination };
