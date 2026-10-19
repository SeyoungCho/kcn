import type { AvatarProps } from "@repo/seed/ui/avatar";

export type MDXAvatarProps = {
  /** Diameter in px — a number or a numeric string (`"42"`).
   * @default 48
   */
  size?: AvatarProps["size"];
  /** Image URL. */
  src?: AvatarProps["src"];
  /** Alternative text for the image. */
  alt?: AvatarProps["alt"];
  /** Shown when there is no image or it has not loaded (usually `IdentityPlaceholder`). */
  fallback?: AvatarProps["fallback"];
};

export type MDXAvatarPropsKO = {
  /** 지름(px) — 숫자나 숫자 글자(`"42"`)로 줍니다.
   * @default 48
   */
  size?: AvatarProps["size"];
  /** 사진 주소. */
  src?: AvatarProps["src"];
  /** 사진의 대체 글. */
  alt?: AvatarProps["alt"];
  /** 사진이 없거나 아직 못 읽었을 때 보이는 것(주로 `IdentityPlaceholder`). */
  fallback?: AvatarProps["fallback"];
};
