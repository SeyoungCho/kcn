import type {
  ChipTabsContentProps,
  ChipTabsRootProps,
  ChipTabsTriggerProps,
} from "@repo/seed/ui/chip-tabs";

export type MDXChipTabsProps = Pick<
  ChipTabsRootProps,
  "value" | "defaultValue" | "onValueChange"
> & {
  /** Visual style of the chips.
   * @default "neutralSolid"
   */
  variant?: ChipTabsRootProps["variant"];
  /** Size of the chips.
   * @default "medium"
   */
  size?: ChipTabsRootProps["size"];
  /** `"fill"` makes the content take up the remaining height.
   * @default "hug"
   */
  contentLayout?: ChipTabsRootProps["contentLayout"];
  /** Sticks the chip list to the top while the page scrolls.
   * @default false
   */
  stickyList?: ChipTabsRootProps["stickyList"];
};

export type MDXChipTabsPropsKO = Pick<
  ChipTabsRootProps,
  "value" | "defaultValue" | "onValueChange"
> & {
  /** 칩의 모양.
   * @default "neutralSolid"
   */
  variant?: ChipTabsRootProps["variant"];
  /** 칩 크기.
   * @default "medium"
   */
  size?: ChipTabsRootProps["size"];
  /** `"fill"` 이면 내용이 남은 높이를 다 채웁니다.
   * @default "hug"
   */
  contentLayout?: ChipTabsRootProps["contentLayout"];
  /** 스크롤할 때 칩 줄을 위에 붙여 둡니다.
   * @default false
   */
  stickyList?: ChipTabsRootProps["stickyList"];
};

export type MDXChipTabsTriggerProps = Pick<
  ChipTabsTriggerProps,
  "value" | "disabled"
>;

export type MDXChipTabsContentProps = Pick<ChipTabsContentProps, "value">;
