import type {
  EmptyContentProps,
  EmptyMediaProps,
  EmptyProps,
} from "@repo/montage/ui/empty";

export type MDXEmptyProps = {
  /** `sm` is narrower with a smaller title, for small screens.
   * @default "default"
   */
  size?: EmptyProps["size"];
  /** Space above and below. `compact` suits lists and cards.
   * @default "default"
   */
  padding?: EmptyProps["padding"];
};

export type MDXEmptyPropsKO = {
  /** `sm` 은 좁은 화면용으로 폭이 좁고 제목이 작아요.
   * @default "default"
   */
  size?: EmptyProps["size"];
  /** 위아래 여백. 목록 · 카드 안에서는 `compact` 를 써요.
   * @default "default"
   */
  padding?: EmptyProps["padding"];
};

export type MDXEmptyMediaProps = {
  /** `default` holds an illustration; `icon` puts an icon on a grey tile.
   * @default "default"
   */
  variant?: EmptyMediaProps["variant"];
};

export type MDXEmptyMediaPropsKO = {
  /** `default` 는 그림을 담고, `icon` 은 회색 칸 위에 아이콘을 얹어요.
   * @default "default"
   */
  variant?: EmptyMediaProps["variant"];
};

export type MDXEmptyContentProps = {
  /** `horizontal` puts buttons in a row; `vertical` stacks them at the same width.
   * @default "horizontal"
   */
  orientation?: EmptyContentProps["orientation"];
};

export type MDXEmptyContentPropsKO = {
  /** `horizontal` 은 버튼을 한 줄에, `vertical` 은 같은 폭으로 쌓아요.
   * @default "horizontal"
   */
  orientation?: EmptyContentProps["orientation"];
};
