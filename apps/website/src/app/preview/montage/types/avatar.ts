import type { ComponentProps } from "react";
import type { AvatarFallback, AvatarProps } from "@repo/montage/ui/avatar";

type AvatarFallbackProps = ComponentProps<typeof AvatarFallback>;

export type MDXAvatarProps = {
  /** `default` is a circle for people; `logo` is a rounded square that fits the whole image.
   * @default "default"
   */
  variant?: AvatarProps["variant"];
  /** Size.
   * @default "default"
   */
  size?: AvatarProps["size"];
  /** Base UI [render](https://base-ui.com/react/handbook/composition) prop. Render a `<button>` or `<a>` to make the avatar pressable. */
  render?: AvatarProps["render"];
};

export type MDXAvatarPropsKO = {
  /** `default` 는 사람용 동그라미, `logo` 는 이미지가 다 보이는 둥근 네모예요.
   * @default "default"
   */
  variant?: AvatarProps["variant"];
  /** 크기.
   * @default "default"
   */
  size?: AvatarProps["size"];
  /** Base UI [render](https://base-ui.com/react/handbook/composition) prop. `<button>` · `<a>` 로 그리면 누를 수 있는 아바타가 돼요. */
  render?: AvatarProps["render"];
};

export type MDXAvatarFallbackProps = {
  /** Shown instead of the image. Leave it empty for a silhouette (a building for `logo`). */
  children?: AvatarFallbackProps["children"];
  /** How long to wait before showing the fallback, in milliseconds.
   * @default 0
   */
  delay?: AvatarFallbackProps["delay"];
};

export type MDXAvatarFallbackPropsKO = {
  /** 이미지 대신 보여 줄 내용. 비워 두면 사람 실루엣(`logo` 는 건물)을 그려요. */
  children?: AvatarFallbackProps["children"];
  /** 대체 내용을 보여 주기 전에 기다리는 시간(ms).
   * @default 0
   */
  delay?: AvatarFallbackProps["delay"];
};
