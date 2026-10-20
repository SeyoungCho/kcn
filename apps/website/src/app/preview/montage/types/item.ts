import type { ItemMediaProps, ItemProps } from "@repo/montage/ui/item";

export type MDXItemProps = {
  /** Layout. `default` has no side padding; `full` adds side padding and a full-width press highlight.
   * @default "default"
   */
  variant?: ItemProps["variant"];
  /** Vertical padding.
   * @default "default"
   */
  size?: ItemProps["size"];
  /** Base UI [render](https://base-ui.com/react/handbook/composition) prop — render an `<a>` or `<button>` to make the row pressable. */
  render?: ItemProps["render"];
};

export type MDXItemPropsKO = {
  /** 배치. `default` 는 좌우 여백이 없고, `full` 은 좌우 여백을 두고 누를 때 줄 너비를 꽉 채워 깔려요.
   * @default "default"
   */
  variant?: ItemProps["variant"];
  /** 위아래 여백.
   * @default "default"
   */
  size?: ItemProps["size"];
  /** Base UI [render](https://base-ui.com/react/handbook/composition) prop — `<a>` · `<button>` 으로 그리면 누를 수 있는 줄이 돼요. */
  render?: ItemProps["render"];
};

export type MDXItemMediaProps = {
  /** Look. `default` is a plain icon, `icon` puts the icon on a tinted tile, and `image` crops a picture.
   * @default "default"
   */
  variant?: ItemMediaProps["variant"];
};

export type MDXItemMediaPropsKO = {
  /** 모양. `default` 는 아이콘만, `icon` 은 옅은 판 위의 아이콘, `image` 는 둥글게 자른 그림이에요.
   * @default "default"
   */
  variant?: ItemMediaProps["variant"];
};
