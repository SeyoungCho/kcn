import type { IdentityPlaceholderProps } from "@repo/seed/ui/identity-placeholder";

export type MDXIdentityPlaceholderProps = {
  /** Which silhouette to draw.
   * @default "person"
   */
  identity?: IdentityPlaceholderProps["identity"];
  /** Accessible name, read as "no photo".
   * @default "프로필 사진 없음"
   */
  label?: IdentityPlaceholderProps["label"];
};

export type MDXIdentityPlaceholderPropsKO = {
  /** 그릴 그림 — 사람 · 가게.
   * @default "person"
   */
  identity?: IdentityPlaceholderProps["identity"];
  /** 읽어 주는 이름 — 사진이 없다는 뜻으로 읽혀요.
   * @default "프로필 사진 없음"
   */
  label?: IdentityPlaceholderProps["label"];
};
