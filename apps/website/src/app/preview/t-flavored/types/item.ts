import type { ItemMediaProps, ItemProps } from "@repo/t-flavored/ui/item";

export type MDXItemProps = {
  /** Surface. `default` is a plain row; `outline` and `muted` are boxed rows.
   * @default "default"
   */
  variant?: ItemProps["variant"];
  /** Vertical padding.
   * @default "default"
   */
  size?: ItemProps["size"];
  /** Base UI [render](https://base-ui.com/react/handbook/composition) prop. Render an `<a>` or `<button>` to make the row pressable. */
  render?: ItemProps["render"];
};

export type MDXItemPropsKO = {
  /** 바탕. `default` 는 바탕 없는 줄, `outline` · `muted` 는 상자 모양 줄이에요.
   * @default "default"
   */
  variant?: ItemProps["variant"];
  /** 위아래 여백.
   * @default "default"
   */
  size?: ItemProps["size"];
  /** Base UI [render](https://base-ui.com/react/handbook/composition) prop. `<a>` · `<button>` 으로 그리면 누를 수 있는 줄이 돼요. */
  render?: ItemProps["render"];
};

export type MDXItemMediaProps = {
  /** `default` shows the child as is; `icon` puts it in a grey squircle; `image` crops an `<img>` to that squircle.
   * @default "default"
   */
  variant?: ItemMediaProps["variant"];
};

export type MDXItemMediaPropsKO = {
  /** `default` 는 그대로, `icon` 은 회색 스쿼클 안에 넣고, `image` 는 `<img>` 를 같은 스쿼클로 잘라요.
   * @default "default"
   */
  variant?: ItemMediaProps["variant"];
};
