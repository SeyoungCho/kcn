import type { DividerProps } from "@repo/seed/ui/divider";

export type MDXDividerProps = {
  /** Direction of the line.
   * @default "horizontal"
   */
  orientation?: DividerProps["orientation"];
  /** Insets both ends (horizontal) or top and bottom (vertical) by 16px.
   * @default false
   */
  inset?: DividerProps["inset"];
  /** Color — a token name (`"stroke.neutralMuted"`, `"palette.gray200"`) or any CSS color.
   * @default "stroke.neutralMuted"
   */
  color?: DividerProps["color"];
  /** Thickness — a px number or a CSS length.
   * @default 1
   */
  thickness?: DividerProps["thickness"];
  /** Element to render. `<hr>` is announced as a separator; use `"div"` for a purely decorative line, and `"li"` inside lists (add `role="separator"` to announce it).
   * @default "hr"
   */
  as?: DividerProps["as"];
};

export type MDXDividerPropsKO = {
  /** 선의 방향.
   * @default "horizontal"
   */
  orientation?: DividerProps["orientation"];
  /** 양 끝(가로) · 위아래(세로)를 16px 씩 띄웁니다.
   * @default false
   */
  inset?: DividerProps["inset"];
  /** 색 — 토큰 이름(`"stroke.neutralMuted"`, `"palette.gray200"`) 또는 CSS 색.
   * @default "stroke.neutralMuted"
   */
  color?: DividerProps["color"];
  /** 굵기 — px 숫자나 CSS 길이.
   * @default 1
   */
  thickness?: DividerProps["thickness"];
  /** 그릴 요소. `<hr>` 은 구분선으로 읽힙니다. 꾸밈일 뿐이면 `"div"`, 목록 안에서는 `"li"`(읽히게 하려면 `role="separator"`).
   * @default "hr"
   */
  as?: DividerProps["as"];
};
