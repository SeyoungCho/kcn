import type {
  MenuContentProps,
  MenuItemProps,
  MenuRadioItemProps,
  MenuRootProps,
} from "@repo/seed/ui/menu";

export type MDXMenuProps = Pick<
  MenuRootProps,
  "open" | "defaultOpen" | "onOpenChange"
> & {
  /** Where the menu opens relative to the trigger.
   * @default "bottom"
   */
  placement?: MenuRootProps["placement"];
  /** Gap between the trigger and the menu, in px.
   * @default 8
   */
  gutter?: MenuRootProps["gutter"];
  /** Minimum gap from the viewport edges, in px.
   * @default 8
   */
  overflowPadding?: MenuRootProps["overflowPadding"];
  /** CSS positioning strategy.
   * @default "absolute"
   */
  strategy?: MenuRootProps["strategy"];
  /** Matches the menu width to the trigger width.
   * @default false
   */
  matchReferenceWidth?: MenuRootProps["matchReferenceWidth"];
  /** Size of the menu and its items. `responsive` is `small` from 1280px up and `medium` below.
   * @default "medium"
   */
  size?: MenuRootProps["size"];
};

export type MDXMenuPropsKO = Pick<
  MenuRootProps,
  "open" | "defaultOpen" | "onOpenChange"
> & {
  /** 트리거를 기준으로 뜨는 자리.
   * @default "bottom"
   */
  placement?: MenuRootProps["placement"];
  /** 트리거와의 간격(px).
   * @default 8
   */
  gutter?: MenuRootProps["gutter"];
  /** 화면 가장자리와 띄울 간격(px).
   * @default 8
   */
  overflowPadding?: MenuRootProps["overflowPadding"];
  /** CSS 자리 잡기 방식.
   * @default "absolute"
   */
  strategy?: MenuRootProps["strategy"];
  /** 메뉴의 폭을 트리거의 폭에 맞춥니다.
   * @default false
   */
  matchReferenceWidth?: MenuRootProps["matchReferenceWidth"];
  /** 메뉴와 항목의 크기. `responsive` 는 1280px 부터 `small`, 그보다 좁으면 `medium` 입니다.
   * @default "medium"
   */
  size?: MenuRootProps["size"];
};

export type MDXMenuContentProps = {
  /** Where to render the menu. Defaults to `body`. */
  positionerContainer?: MenuContentProps["positionerContainer"];
};

export type MDXMenuContentPropsKO = {
  /** 메뉴를 그려 넣을 곳. 안 주면 `body` 입니다. */
  positionerContainer?: MenuContentProps["positionerContainer"];
};

export type MDXMenuItemProps = Pick<MenuItemProps, "onClick"> & {
  /** Text of the item. */
  label: MenuItemProps["label"];
  /** Secondary text under the label. */
  description?: MenuItemProps["description"];
  /** Icon before the label. */
  prefixIcon?: MenuItemProps["prefixIcon"];
  /** Icon after the label. */
  suffixIcon?: MenuItemProps["suffixIcon"];
  /** Color tone — use `critical` for destructive actions.
   * @default "neutral"
   */
  tone?: MenuItemProps["tone"];
  /** Overrides the size from `MenuRoot`. */
  size?: MenuItemProps["size"];
  /** Text matched by typeahead. Defaults to the visible text. */
  typeaheadLabel?: MenuItemProps["typeaheadLabel"];
  /** Disables the item.
   * @default false
   */
  disabled?: MenuItemProps["disabled"];
};

export type MDXMenuItemPropsKO = Pick<MenuItemProps, "onClick"> & {
  /** 항목의 글. */
  label: MenuItemProps["label"];
  /** 글 아래의 보조 설명. */
  description?: MenuItemProps["description"];
  /** 글 앞의 아이콘. */
  prefixIcon?: MenuItemProps["prefixIcon"];
  /** 글 뒤의 아이콘. */
  suffixIcon?: MenuItemProps["suffixIcon"];
  /** 색 — 지우기처럼 되돌릴 수 없는 일에는 `critical` 을 씁니다.
   * @default "neutral"
   */
  tone?: MenuItemProps["tone"];
  /** `MenuRoot` 의 크기 대신 쓸 크기. */
  size?: MenuItemProps["size"];
  /** 글자를 쳐서 찾을 때 견줄 글. 안 주면 보이는 글입니다. */
  typeaheadLabel?: MenuItemProps["typeaheadLabel"];
  /** 항목을 비활성화합니다.
   * @default false
   */
  disabled?: MenuItemProps["disabled"];
};

export type MDXMenuRadioItemProps = {
  /** Value selected by this item in the parent `MenuRadioGroup`. */
  value: MenuRadioItemProps["value"];
  /** Text of the item. */
  label: MenuRadioItemProps["label"];
  /** Secondary text under the label. */
  description?: MenuRadioItemProps["description"];
  /** Icon before the label. */
  prefixIcon?: MenuRadioItemProps["prefixIcon"];
  /** Color tone.
   * @default "neutral"
   */
  tone?: MenuRadioItemProps["tone"];
  /** Disables the item.
   * @default false
   */
  disabled?: MenuRadioItemProps["disabled"];
};

export type MDXMenuRadioItemPropsKO = {
  /** 바깥 `MenuRadioGroup` 에서 이 항목이 고르는 값. */
  value: MenuRadioItemProps["value"];
  /** 항목의 글. */
  label: MenuRadioItemProps["label"];
  /** 글 아래의 보조 설명. */
  description?: MenuRadioItemProps["description"];
  /** 글 앞의 아이콘. */
  prefixIcon?: MenuRadioItemProps["prefixIcon"];
  /** 색.
   * @default "neutral"
   */
  tone?: MenuRadioItemProps["tone"];
  /** 항목을 비활성화합니다.
   * @default false
   */
  disabled?: MenuRadioItemProps["disabled"];
};
