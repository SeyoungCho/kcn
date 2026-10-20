import type {
  PaginationCounterProps,
  PaginationDotsProps,
  PaginationLinkProps,
} from "@repo/montage/ui/pagination";

export type MDXPaginationProps = {
  /** Marks the link as the current page. */
  isActive?: PaginationLinkProps["isActive"];
  /** Size. `default` is a page number; `icon` · `icon-lg` are the previous and next arrows.
   * @default "default"
   */
  size?: PaginationLinkProps["size"];
  /** Base UI [render](https://base-ui.com/react/handbook/composition) prop — renders another element such as a `<button>`. */
  render?: PaginationLinkProps["render"];
};

export type MDXPaginationPropsKO = {
  /** 지금 보고 있는 쪽이에요. */
  isActive?: PaginationLinkProps["isActive"];
  /** 크기. `default` 는 쪽 번호, `icon` · `icon-lg` 는 이전 · 다음 화살표예요.
   * @default "default"
   */
  size?: PaginationLinkProps["size"];
  /** Base UI [render](https://base-ui.com/react/handbook/composition) prop — `<button>` 같은 다른 요소로 그려요. */
  render?: PaginationLinkProps["render"];
};

export type MDXPaginationCounterProps = {
  /** Current page number. */
  page: PaginationCounterProps["page"];
  /** Total number of pages. */
  total: PaginationCounterProps["total"];
  /** Look. `overlay` is a frosted pill for placing over images.
   * @default "default"
   */
  variant?: PaginationCounterProps["variant"];
  /** Size of the `overlay` pill.
   * @default "default"
   */
  size?: PaginationCounterProps["size"];
};

export type MDXPaginationCounterPropsKO = {
  /** 지금 쪽 번호. */
  page: PaginationCounterProps["page"];
  /** 전체 쪽 수. */
  total: PaginationCounterProps["total"];
  /** 모양. `overlay` 는 이미지 위에 띄우는 흐린 알약이에요.
   * @default "default"
   */
  variant?: PaginationCounterProps["variant"];
  /** `overlay` 알약의 크기.
   * @default "default"
   */
  size?: PaginationCounterProps["size"];
};

export type MDXPaginationDotsProps = {
  /** Total number of pages. */
  count: PaginationDotsProps["count"];
  /** Current page, starting at 1 (controlled). Use with `onValueChange`. */
  value?: PaginationDotsProps["value"];
  /** Page shown first, starting at 1 (uncontrolled).
   * @default 1
   */
  defaultValue?: PaginationDotsProps["defaultValue"];
  /** Called when a dot is pressed. */
  onValueChange?: PaginationDotsProps["onValueChange"];
  /** Most dots shown at once. Dots near a hidden edge get smaller.
   * @default 5
   */
  max?: PaginationDotsProps["max"];
  /** Look. `overlay` is white dots for placing over images.
   * @default "default"
   */
  variant?: PaginationDotsProps["variant"];
  /** @default "default" */
  size?: PaginationDotsProps["size"];
};

export type MDXPaginationDotsPropsKO = {
  /** 전체 쪽 수. */
  count: PaginationDotsProps["count"];
  /** 지금 쪽, 1부터(제어 모드). `onValueChange` 와 같이 써요. */
  value?: PaginationDotsProps["value"];
  /** 처음 쪽, 1부터(비제어 모드).
   * @default 1
   */
  defaultValue?: PaginationDotsProps["defaultValue"];
  /** 점을 누르면 불려요. */
  onValueChange?: PaginationDotsProps["onValueChange"];
  /** 한 번에 보이는 점의 최대 개수. 가려진 쪽 가장자리의 점은 작아져요.
   * @default 5
   */
  max?: PaginationDotsProps["max"];
  /** 모양. `overlay` 는 이미지 위에 두는 흰 점이에요.
   * @default "default"
   */
  variant?: PaginationDotsProps["variant"];
  /** @default "default" */
  size?: PaginationDotsProps["size"];
};
