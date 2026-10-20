import type { ComponentProps } from "react";
import type { EmptyMediaProps } from "@repo/t-flavored/ui/empty";

export type MDXEmptyProps = {
  /** `EmptyHeader` (media, title, description) and `EmptyContent` (actions). */
  children?: ComponentProps<"div">["children"];
  className?: ComponentProps<"div">["className"];
};

export type MDXEmptyPropsKO = {
  /** `EmptyHeader`(그림 · 제목 · 설명)와 `EmptyContent`(버튼)예요. */
  children?: ComponentProps<"div">["children"];
  className?: ComponentProps<"div">["className"];
};

export type MDXEmptyMediaProps = {
  /** `default` shows the media as is; `icon` sizes an icon for you.
   * @default "default"
   */
  variant?: EmptyMediaProps["variant"];
};

export type MDXEmptyMediaPropsKO = {
  /** `default` 는 그림을 그대로 보여 주고, `icon` 은 아이콘 크기를 맞춰 줘요.
   * @default "default"
   */
  variant?: EmptyMediaProps["variant"];
};
