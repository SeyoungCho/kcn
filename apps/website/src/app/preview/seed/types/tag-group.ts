import type {
  TagGroupItemProps,
  TagGroupRootProps,
} from "@repo/seed/ui/tag-group";

export type MDXTagGroupRootProps = {
  /** Text size of every item and separator.
   * @default "t2"
   */
  size?: TagGroupRootProps["size"];
  /** Font weight of every item.
   * @default "regular"
   */
  weight?: TagGroupRootProps["weight"];
  /** Text and icon color of every item.
   * @default "neutralSubtle"
   */
  tone?: TagGroupRootProps["tone"];
  /** Keeps the group on one line and cuts overflowing items with an ellipsis. Otherwise items wrap.
   * @default false
   */
  truncate?: TagGroupRootProps["truncate"];
  /** Text placed between items. Hidden from screen readers, which hear a comma instead.
   * @default " · "
   */
  separator?: TagGroupRootProps["separator"];
};

export type MDXTagGroupRootPropsKO = {
  /** 모든 항목과 구분자의 글자 크기.
   * @default "t2"
   */
  size?: TagGroupRootProps["size"];
  /** 모든 항목의 굵기.
   * @default "regular"
   */
  weight?: TagGroupRootProps["weight"];
  /** 모든 항목의 글자 · 아이콘 색.
   * @default "neutralSubtle"
   */
  tone?: TagGroupRootProps["tone"];
  /** 한 줄에 두고 넘치는 항목을 말줄임표로 자릅니다. 아니면 줄을 바꿉니다.
   * @default false
   */
  truncate?: TagGroupRootProps["truncate"];
  /** 항목 사이에 넣는 글자. 스크린 리더는 이 대신 쉼표를 읽습니다.
   * @default " · "
   */
  separator?: TagGroupRootProps["separator"];
};

export type MDXTagGroupItemProps = {
  /** Text of the item. */
  label: TagGroupItemProps["label"];
  /** Icon before the text, passed as an element such as `<IconCheckmarkLine />`. */
  prefixIcon?: TagGroupItemProps["prefixIcon"];
  /** Icon after the text. */
  suffixIcon?: TagGroupItemProps["suffixIcon"];
  /** Overrides the group's `size` for this item. */
  size?: TagGroupItemProps["size"];
  /** Overrides the group's `weight` for this item. */
  weight?: TagGroupItemProps["weight"];
  /** Overrides the group's `tone` for this item. */
  tone?: TagGroupItemProps["tone"];
};

export type MDXTagGroupItemPropsKO = {
  /** 항목의 글자. */
  label: TagGroupItemProps["label"];
  /** 글자 앞의 아이콘 — `<IconCheckmarkLine />` 처럼 요소로 줍니다. */
  prefixIcon?: TagGroupItemProps["prefixIcon"];
  /** 글자 뒤의 아이콘. */
  suffixIcon?: TagGroupItemProps["suffixIcon"];
  /** 이 항목만 묶음의 `size` 대신 쓸 값. */
  size?: TagGroupItemProps["size"];
  /** 이 항목만 묶음의 `weight` 대신 쓸 값. */
  weight?: TagGroupItemProps["weight"];
  /** 이 항목만 묶음의 `tone` 대신 쓸 값. */
  tone?: TagGroupItemProps["tone"];
};
