import type {
  NavigationMenuContentProps,
  NavigationMenuItemProps,
  NavigationMenuProviderProps,
  NavigationMenuRootProps,
} from "@repo/seed/ui/navigation-menu";

export type MDXNavigationMenuProps = {
  /** Value of the open menu (`null` when every menu is closed). Pass it to control the state. */
  value?: NavigationMenuProviderProps["value"];
  /** Menu open on first render.
   * @default null
   */
  defaultValue?: NavigationMenuProviderProps["defaultValue"];
  /** Called when a menu opens or every menu closes. */
  onValueChange?: NavigationMenuProviderProps["onValueChange"];
  /** Where the menus open relative to their trigger. Each `NavigationMenuRoot` can override it.
   * @default "bottom"
   */
  placement?: NavigationMenuProviderProps["placement"];
  /** Delay (ms) before a hovered menu opens. Skipped when another menu is already open.
   * @default 200
   */
  openDelay?: NavigationMenuProviderProps["openDelay"];
  /** Delay (ms) before a menu closes after the pointer leaves.
   * @default 100
   */
  closeDelay?: NavigationMenuProviderProps["closeDelay"];
  /** Size of the menus. `"responsive"` is `"small"` from 1280px and `"medium"` below.
   * @default "medium"
   */
  size?: NavigationMenuProviderProps["size"];
};

export type MDXNavigationMenuPropsKO = {
  /** 열려 있는 메뉴의 값(다 닫혀 있으면 `null`). 주면 바깥에서 상태를 쥡니다. */
  value?: NavigationMenuProviderProps["value"];
  /** 처음에 열어 둘 메뉴.
   * @default null
   */
  defaultValue?: NavigationMenuProviderProps["defaultValue"];
  /** 메뉴가 열리거나 모두 닫힐 때 불립니다. */
  onValueChange?: NavigationMenuProviderProps["onValueChange"];
  /** 메뉴가 버튼의 어느 쪽에 뜰지. `NavigationMenuRoot` 마다 따로 줄 수도 있습니다.
   * @default "bottom"
   */
  placement?: NavigationMenuProviderProps["placement"];
  /** 마우스를 올린 뒤 열리기까지의 시간(ms). 다른 메뉴가 열려 있으면 기다리지 않습니다.
   * @default 200
   */
  openDelay?: NavigationMenuProviderProps["openDelay"];
  /** 마우스가 벗어난 뒤 닫히기까지의 시간(ms).
   * @default 100
   */
  closeDelay?: NavigationMenuProviderProps["closeDelay"];
  /** 메뉴 크기. `"responsive"` 는 1280px 부터 `"small"`, 그보다 좁으면 `"medium"` 입니다.
   * @default "medium"
   */
  size?: NavigationMenuProviderProps["size"];
};

export type MDXNavigationMenuRootProps = {
  /** Identifies this menu. Must be unique within the provider. */
  value: NavigationMenuRootProps["value"];
  /** Keeps the menu from opening.
   * @default false
   */
  disabled?: NavigationMenuRootProps["disabled"];
  /** Overrides the provider's `placement` for this menu. */
  placement?: NavigationMenuRootProps["placement"];
  /** Gap (px) between the trigger and the menu.
   * @default 8
   */
  gutter?: NavigationMenuRootProps["gutter"];
  /** Space (px) kept between the menu and the edge of the screen.
   * @default 8
   */
  overflowPadding?: NavigationMenuRootProps["overflowPadding"];
  /** CSS positioning method of the menu.
   * @default "absolute"
   */
  strategy?: NavigationMenuRootProps["strategy"];
};

export type MDXNavigationMenuRootPropsKO = {
  /** 이 메뉴를 가리키는 값. Provider 안에서 겹치지 않아야 합니다. */
  value: NavigationMenuRootProps["value"];
  /** 메뉴가 열리지 않게 합니다.
   * @default false
   */
  disabled?: NavigationMenuRootProps["disabled"];
  /** 이 메뉴만 Provider 의 `placement` 대신 쓸 자리. */
  placement?: NavigationMenuRootProps["placement"];
  /** 버튼과 메뉴 사이 간격(px).
   * @default 8
   */
  gutter?: NavigationMenuRootProps["gutter"];
  /** 메뉴가 화면 가장자리와 띄울 간격(px).
   * @default 8
   */
  overflowPadding?: NavigationMenuRootProps["overflowPadding"];
  /** 메뉴의 CSS 위치 방식.
   * @default "absolute"
   */
  strategy?: NavigationMenuRootProps["strategy"];
};

export type MDXNavigationMenuContentProps = {
  /** Number of columns. Items in a `NavigationMenuGroupItems` fill top to bottom, then flow to the next column, so long menus fit without scrolling.
   * @default 1
   */
  columns?: NavigationMenuContentProps["columns"];
  /** Element the menu is portalled into. Defaults to `document.body`. */
  positionerContainer?: NavigationMenuContentProps["positionerContainer"];
};

export type MDXNavigationMenuContentPropsKO = {
  /** 줄을 몇 단으로 놓을지. `NavigationMenuGroupItems` 안의 줄은 위에서 아래로 채운 뒤 옆 단으로 넘어가, 줄이 많아도 스크롤 없이 보입니다.
   * @default 1
   */
  columns?: NavigationMenuContentProps["columns"];
  /** 메뉴를 그려 넣을 요소. 주지 않으면 `document.body` 입니다. */
  positionerContainer?: NavigationMenuContentProps["positionerContainer"];
};

export type MDXNavigationMenuItemProps = {
  /** Item label. */
  label: NavigationMenuItemProps["label"];
  /** Secondary text under the label. */
  description?: NavigationMenuItemProps["description"];
  /** Icon before the label. */
  prefixIcon?: NavigationMenuItemProps["prefixIcon"];
  /** Icon after the label. */
  suffixIcon?: NavigationMenuItemProps["suffixIcon"];
  /** Marks the item as the current page (`aria-current="page"`). */
  current?: NavigationMenuItemProps["current"];
  /** Disables the item. */
  disabled?: NavigationMenuItemProps["disabled"];
  /** Overrides the provider's `size`. */
  size?: NavigationMenuItemProps["size"];
};

export type MDXNavigationMenuItemPropsKO = {
  /** 줄의 이름. */
  label: NavigationMenuItemProps["label"];
  /** 이름 아래의 설명. */
  description?: NavigationMenuItemProps["description"];
  /** 이름 앞의 아이콘. */
  prefixIcon?: NavigationMenuItemProps["prefixIcon"];
  /** 이름 뒤의 아이콘. */
  suffixIcon?: NavigationMenuItemProps["suffixIcon"];
  /** 지금 화면의 줄임을 나타냅니다(`aria-current="page"`). */
  current?: NavigationMenuItemProps["current"];
  /** 줄을 비활성화합니다. */
  disabled?: NavigationMenuItemProps["disabled"];
  /** 이 줄만 Provider 의 `size` 대신 쓸 크기. */
  size?: NavigationMenuItemProps["size"];
};
