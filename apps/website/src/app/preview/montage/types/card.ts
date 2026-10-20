import type { CardProps } from "@repo/montage/ui/card";

export type MDXCardProps = {
  /** `sm` tightens spacing and text for narrow screens, and uses a taller thumbnail in vertical cards.
   * @default "default"
   */
  size?: CardProps["size"];
  /** `vertical` puts the text under the thumbnail; `horizontal` puts it beside a fixed-width thumbnail.
   * @default "vertical"
   */
  orientation?: CardProps["orientation"];
  /** Base UI [render](https://base-ui.com/react/handbook/composition) prop. Render an `<a>` to make the whole card a link. */
  render?: CardProps["render"];
};

export type MDXCardPropsKO = {
  /** `sm` 은 좁은 화면용으로 간격과 글자를 줄이고, 세로 카드의 썸네일을 조금 더 높게 해요.
   * @default "default"
   */
  size?: CardProps["size"];
  /** `vertical` 은 썸네일 아래에, `horizontal` 은 폭이 고정된 썸네일 옆에 글을 둬요.
   * @default "vertical"
   */
  orientation?: CardProps["orientation"];
  /** Base UI [render](https://base-ui.com/react/handbook/composition) prop. `<a>` 로 그리면 카드 전체가 링크가 돼요. */
  render?: CardProps["render"];
};
