import type {
  TabsContentProps,
  TabsRootProps,
  TabsTriggerProps,
} from "@repo/seed/ui/tabs";

export type MDXTabsProps = Pick<
  TabsRootProps,
  "value" | "defaultValue" | "onValueChange"
> & {
  /** `"fill"` splits the width evenly between tabs; `"hug"` sizes each tab to its text.
   * @default "fill"
   */
  triggerLayout?: TabsRootProps["triggerLayout"];
  /** Size of the tabs.
   * @default "small"
   */
  size?: TabsRootProps["size"];
  /** `"fill"` makes the content take up the remaining height.
   * @default "hug"
   */
  contentLayout?: TabsRootProps["contentLayout"];
  /** Sticks the tab list to the top while the page scrolls, with a background so content does not show through.
   * @default false
   */
  stickyList?: TabsRootProps["stickyList"];
};

export type MDXTabsPropsKO = Pick<
  TabsRootProps,
  "value" | "defaultValue" | "onValueChange"
> & {
  /** `"fill"` 이면 탭이 폭을 똑같이 나눠 갖고, `"hug"` 이면 글자만큼만 차지합니다.
   * @default "fill"
   */
  triggerLayout?: TabsRootProps["triggerLayout"];
  /** 탭 크기.
   * @default "small"
   */
  size?: TabsRootProps["size"];
  /** `"fill"` 이면 내용이 남은 높이를 다 채웁니다.
   * @default "hug"
   */
  contentLayout?: TabsRootProps["contentLayout"];
  /** 스크롤할 때 탭 줄을 위에 붙여 두고, 아래 내용이 비치지 않게 바탕을 깝니다.
   * @default false
   */
  stickyList?: TabsRootProps["stickyList"];
};

export type MDXTabsTriggerProps = Pick<TabsTriggerProps, "value" | "disabled">;

export type MDXTabsContentProps = Pick<TabsContentProps, "value">;
