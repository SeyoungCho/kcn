import type {
  ListButtonItemProps,
  ListCheckItemProps,
  ListCheckmarkProps,
  ListHeaderProps,
  ListItemProps,
  ListProps,
  ListRadioItemProps,
  ListRadiomarkProps,
} from "@repo/seed/ui/list";

export type MDXListProps = {
  /** Corner radius of the hover/press background — a radius token (`"r2"`) or a CSS value. Match it to the card when the list sits inside a rounded card. */
  itemBorderRadius?: ListProps["itemBorderRadius"];
  /** Base UI [render](https://base-ui.com/react/handbook/composition) prop — replaces the rendered element (similar to Radix `asChild`). Use `<fieldset />` for check items and `<ListRadioGroup />` for radio items. */
  render?: ListProps["render"];
};

export type MDXListPropsKO = {
  /** 가리키거나 누른 줄의 둥근 바탕의 모서리 — 모서리 토큰(`"r2"`) 또는 CSS 값. 둥근 카드 안에 넣을 때 카드에 맞춥니다. */
  itemBorderRadius?: ListProps["itemBorderRadius"];
  /** Base UI [render](https://base-ui.com/react/handbook/composition) prop — 그려질 요소를 바꿉니다(Radix 의 `asChild` 와 비슷). 켜고 끄는 줄은 `<fieldset />`, 하나만 고르는 줄은 `<ListRadioGroup />`. */
  render?: ListProps["render"];
};

export type MDXListItemProps = {
  /** Title of the row. */
  title: ListItemProps["title"];
  /** Description below the title. */
  detail?: ListItemProps["detail"];
  /** Leading slot — an icon, avatar, checkmark, or radiomark. */
  prefix?: ListItemProps["prefix"];
  /** Trailing slot — an icon, button, text, checkmark, or radiomark. */
  suffix?: ListItemProps["suffix"];
  /** Vertical alignment of the slots. Use `"flex-start"` when the title wraps.
   * @default "center"
   */
  alignItems?: ListItemProps["alignItems"];
  /** Highlights the row with a brand-tinted background.
   * @default false
   */
  highlighted?: ListItemProps["highlighted"];
};

export type MDXListItemPropsKO = {
  /** 줄의 제목. */
  title: ListItemProps["title"];
  /** 제목 아래의 설명. */
  detail?: ListItemProps["detail"];
  /** 앞 자리 — 아이콘 · 아바타 · 체크 · 라디오 표시. */
  prefix?: ListItemProps["prefix"];
  /** 뒤 자리 — 아이콘 · 버튼 · 글 · 체크 · 라디오 표시. */
  suffix?: ListItemProps["suffix"];
  /** 앞 · 뒤 자리를 세로로 어디에 맞출지. 제목이 여러 줄이면 `"flex-start"`.
   * @default "center"
   */
  alignItems?: ListItemProps["alignItems"];
  /** 브랜드색 바탕으로 강조합니다.
   * @default false
   */
  highlighted?: ListItemProps["highlighted"];
};

export type MDXListButtonItemProps = MDXListItemProps & {
  /** Disables the row.
   * @default false
   */
  disabled?: ListButtonItemProps["disabled"];
  /** Props for the row (`li`). Everything else goes to the button (or the link passed via `render`). */
  rootProps?: ListButtonItemProps["rootProps"];
  /** Base UI [render](https://base-ui.com/react/handbook/composition) prop — replaces the rendered element (similar to Radix `asChild`). Pass `<a href="…" />` for a link row. */
  render?: ListButtonItemProps["render"];
};

export type MDXListButtonItemPropsKO = MDXListItemPropsKO & {
  /** 줄을 비활성화합니다.
   * @default false
   */
  disabled?: ListButtonItemProps["disabled"];
  /** 줄(`li`)에 붙는 속성. 나머지는 버튼(또는 `render` 로 준 링크)에 붙습니다. */
  rootProps?: ListButtonItemProps["rootProps"];
  /** Base UI [render](https://base-ui.com/react/handbook/composition) prop — 그려질 요소를 바꿉니다(Radix 의 `asChild` 와 비슷). 링크 줄은 `<a href="…" />`. */
  render?: ListButtonItemProps["render"];
};

export type MDXListCheckItemProps = MDXListItemProps &
  Pick<
    ListCheckItemProps,
    | "checked"
    | "defaultChecked"
    | "onCheckedChange"
    | "indeterminate"
    | "disabled"
    | "name"
    | "value"
  >;

export type MDXListCheckItemPropsKO = MDXListItemPropsKO &
  Pick<
    ListCheckItemProps,
    | "checked"
    | "defaultChecked"
    | "onCheckedChange"
    | "indeterminate"
    | "disabled"
    | "name"
    | "value"
  >;

export type MDXListRadioItemProps = MDXListItemProps &
  Pick<ListRadioItemProps, "value" | "disabled">;

export type MDXListRadioItemPropsKO = MDXListItemPropsKO &
  Pick<ListRadioItemProps, "value" | "disabled">;

export type MDXListCheckmarkProps = {
  /** Shape of the mark. `ghost` shows a faint check even when off.
   * @default "square"
   */
  variant?: ListCheckmarkProps["variant"];
  /** @default "brand" */
  tone?: ListCheckmarkProps["tone"];
  /** @default "medium" */
  size?: ListCheckmarkProps["size"];
};

export type MDXListCheckmarkPropsKO = {
  /** 표시의 모양. `ghost` 는 꺼져 있어도 흐린 체크를 보여 줍니다.
   * @default "square"
   */
  variant?: ListCheckmarkProps["variant"];
  /** @default "brand" */
  tone?: ListCheckmarkProps["tone"];
  /** @default "medium" */
  size?: ListCheckmarkProps["size"];
};

export type MDXListRadiomarkProps = {
  /** @default "brand" */
  tone?: ListRadiomarkProps["tone"];
  /** @default "medium" */
  size?: ListRadiomarkProps["size"];
};

export type MDXListHeaderProps = {
  /** Text style of the header.
   * @default "mediumWeak"
   */
  variant?: ListHeaderProps["variant"];
  /** Base UI [render](https://base-ui.com/react/handbook/composition) prop — replaces the rendered element (similar to Radix `asChild`). Pass `<h2 />` when the header is a heading. */
  render?: ListHeaderProps["render"];
};

export type MDXListHeaderPropsKO = {
  /** 머리글의 글자 모양.
   * @default "mediumWeak"
   */
  variant?: ListHeaderProps["variant"];
  /** Base UI [render](https://base-ui.com/react/handbook/composition) prop — 그려질 요소를 바꿉니다(Radix 의 `asChild` 와 비슷). 제목이면 `<h2 />`. */
  render?: ListHeaderProps["render"];
};
