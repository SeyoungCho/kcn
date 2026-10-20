import type {
  TabsContentProps,
  TabsListProps,
  TabsProps,
  TabsTriggerProps,
} from "@repo/t-flavored/ui/tabs";

export type MDXTabsProps = Pick<
  TabsProps,
  "value" | "defaultValue" | "onValueChange"
>;

export type MDXTabsPropsKO = {
  /** 고른 탭의 값(제어 모드). `onValueChange` 와 같이 써요. */
  value?: TabsProps["value"];
  /** 처음에 고를 탭의 값(비제어 모드). */
  defaultValue?: TabsProps["defaultValue"];
  /** 고른 탭이 바뀔 때 불려요. */
  onValueChange?: TabsProps["onValueChange"];
};

export type MDXTabsListProps = {
  /** Look. `default` is a segmented control; `line` is underlined tabs.
   * @default "default"
   */
  variant?: TabsListProps["variant"];
  /** Size.
   * @default "default"
   */
  size?: TabsListProps["size"];
  /** Fits each tab to its label and scrolls the list sideways when it overflows.
   * @default false
   */
  fluid?: TabsListProps["fluid"];
  /** Selects a tab as soon as it receives keyboard focus.
   * @default false
   */
  activateOnFocus?: TabsListProps["activateOnFocus"];
};

export type MDXTabsListPropsKO = {
  /** 모양. `default` 는 세그먼트 컨트롤, `line` 은 밑줄 탭이에요.
   * @default "default"
   */
  variant?: TabsListProps["variant"];
  /** 크기.
   * @default "default"
   */
  size?: TabsListProps["size"];
  /** 탭 폭을 글자에 맞추고, 넘치면 가로로 스크롤해요.
   * @default false
   */
  fluid?: TabsListProps["fluid"];
  /** 키보드로 초점이 옮겨 가면 바로 그 탭을 골라요.
   * @default false
   */
  activateOnFocus?: TabsListProps["activateOnFocus"];
};

export type MDXTabsTriggerProps = Pick<TabsTriggerProps, "value" | "disabled">;

export type MDXTabsTriggerPropsKO = {
  /** 이 탭의 값. 같은 값을 가진 `TabsContent` 를 보여 줘요. */
  value?: TabsTriggerProps["value"];
  /** @default false */
  disabled?: TabsTriggerProps["disabled"];
};

export type MDXTabsContentProps = Pick<
  TabsContentProps,
  "value" | "keepMounted"
>;

export type MDXTabsContentPropsKO = {
  /** 이 내용을 보여 줄 탭의 값. */
  value?: TabsContentProps["value"];
  /** 숨겨진 동안에도 DOM 에 남겨 둬요.
   * @default false
   */
  keepMounted?: TabsContentProps["keepMounted"];
};
