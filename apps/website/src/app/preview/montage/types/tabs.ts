import type {
  TabsContentProps,
  TabsListProps,
  TabsProps,
  TabsTriggerProps,
} from "@repo/montage/ui/tabs";

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
  /** Look. `default` is a segmented control, `line` is underlined tabs, and `chip` · `chip-primary` are chip tabs.
   * @default "default"
   */
  variant?: TabsListProps["variant"];
  /** Size. `xl` only changes chip tabs.
   * @default "default"
   */
  size?: TabsListProps["size"];
  /** Splits the list width evenly between tabs. When unset, `default` is fitted and the others size tabs to their labels and scroll sideways.
   * @default undefined
   */
  fitted?: TabsListProps["fitted"];
  /** Selects a tab as soon as it receives keyboard focus.
   * @default true
   */
  activateOnFocus?: TabsListProps["activateOnFocus"];
};

export type MDXTabsListPropsKO = {
  /** 모양. `default` 는 세그먼트 컨트롤, `line` 은 밑줄 탭, `chip` · `chip-primary` 는 칩 모양 탭이에요.
   * @default "default"
   */
  variant?: TabsListProps["variant"];
  /** 크기. `xl` 은 칩 모양 탭에서만 달라져요.
   * @default "default"
   */
  size?: TabsListProps["size"];
  /** 탭들이 줄 너비를 똑같이 나눠요. 정하지 않으면 `default` 는 나누고, 나머지는 글자만큼 차지하고 넘치면 가로로 스크롤해요.
   * @default undefined
   */
  fitted?: TabsListProps["fitted"];
  /** 키보드로 초점이 옮겨 가면 바로 그 탭을 골라요.
   * @default true
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
