import type {
  SideNavigationGroupItem,
  SideNavigationGroupProps,
  SideNavigationItemButtonProps,
  SideNavigationProviderProps,
  SideNavigationRootProps,
} from "@repo/seed/ui/side-navigation";

export type MDXSideNavigationProps = {
  /** Whether the menu is collapsed to icons. Pass it to control the state. */
  collapsed?: SideNavigationProviderProps["collapsed"];
  /** Collapsed state on first render.
   * @default false
   */
  defaultCollapsed?: SideNavigationProviderProps["defaultCollapsed"];
  /** Called when the menu collapses or expands, including when the screen crosses 1280px. */
  onCollapsedChange?: SideNavigationProviderProps["onCollapsedChange"];
};

export type MDXSideNavigationPropsKO = {
  /** 메뉴를 아이콘만 남게 접을지. 주면 바깥에서 상태를 쥡니다. */
  collapsed?: SideNavigationProviderProps["collapsed"];
  /** 처음에 접어 둘지.
   * @default false
   */
  defaultCollapsed?: SideNavigationProviderProps["defaultCollapsed"];
  /** 메뉴가 접히거나 펼쳐질 때 불립니다(화면 폭이 1280px 을 넘나들 때도). */
  onCollapsedChange?: SideNavigationProviderProps["onCollapsedChange"];
};

export type MDXSideNavigationRootProps = {
  /** Background of the menu. `"neutral"` adds a gray fill and a right border.
   * @default "neutral"
   */
  tone?: SideNavigationRootProps["tone"];
};

export type MDXSideNavigationRootPropsKO = {
  /** 메뉴의 바탕. `"neutral"` 은 회색 바탕과 오른쪽 금을 그립니다.
   * @default "neutral"
   */
  tone?: SideNavigationRootProps["tone"];
};

export type MDXSideNavigationGroupProps = {
  /** Group heading. Hidden while collapsed. */
  label?: SideNavigationGroupProps["label"];
  /** Items of the group. An item with `items` becomes a parent: it expands inline when the menu is expanded, and opens a flyout menu when collapsed. Parents also take `defaultOpen`, `open` and `onOpenChange`; leaves take `current`, `disabled` and `onClick`. */
  items: SideNavigationGroupItem[];
};

export type MDXSideNavigationGroupPropsKO = {
  /** 묶음의 이름. 접히면 사라집니다. */
  label?: SideNavigationGroupProps["label"];
  /** 묶음의 줄들. `items` 가 있는 줄은 하위 메뉴를 가져, 펼친 메뉴에서는 아래로 펼쳐지고 접힌 메뉴에서는 옆에 뜹니다. 하위 메뉴가 있는 줄은 `defaultOpen` · `open` · `onOpenChange`, 그렇지 않은 줄은 `current` · `disabled` · `onClick` 을 받습니다. */
  items: SideNavigationGroupItem[];
};

export type MDXSideNavigationItemButtonProps = {
  /** Item label. Shown as a tooltip while collapsed. */
  label: SideNavigationItemButtonProps["label"];
  /** Icon before the label. Stays visible while collapsed. */
  prefixIcon?: SideNavigationItemButtonProps["prefixIcon"];
  /** Icon after the label. */
  suffixIcon?: SideNavigationItemButtonProps["suffixIcon"];
  /** Marks the item as the current page (`aria-current="page"`). */
  current?: SideNavigationItemButtonProps["current"];
  /** Disables the item. */
  disabled?: SideNavigationItemButtonProps["disabled"];
  /** Skips the tooltip shown while collapsed. */
  disableTooltip?: SideNavigationItemButtonProps["disableTooltip"];
};

export type MDXSideNavigationItemButtonPropsKO = {
  /** 줄의 이름. 접혔을 때는 말풍선으로 보입니다. */
  label: SideNavigationItemButtonProps["label"];
  /** 이름 앞의 아이콘. 접혀도 남습니다. */
  prefixIcon?: SideNavigationItemButtonProps["prefixIcon"];
  /** 이름 뒤의 아이콘. */
  suffixIcon?: SideNavigationItemButtonProps["suffixIcon"];
  /** 지금 화면의 줄임을 나타냅니다(`aria-current="page"`). */
  current?: SideNavigationItemButtonProps["current"];
  /** 줄을 비활성화합니다. */
  disabled?: SideNavigationItemButtonProps["disabled"];
  /** 접혔을 때 이름 말풍선을 붙이지 않습니다. */
  disableTooltip?: SideNavigationItemButtonProps["disableTooltip"];
};
