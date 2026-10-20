import type {
  InputGroupAddonProps,
  InputGroupButtonProps,
  InputGroupProps,
} from "@repo/montage/ui/input-group";

export type MDXInputGroupProps = {
  /** Look of the group: an outlined box (`default`) or a grey filled box for search (`secondary`).
   * @remarks `"default" | "secondary"`
   * @default "default"
   */
  variant?: InputGroupProps["variant"];
  /** Height and text size, the same values as Input. Icons and buttons inside follow it.
   * @remarks `"default" | "sm"`
   * @default "default"
   */
  size?: InputGroupProps["size"];
};

export type MDXInputGroupPropsKO = {
  /** 묶음의 모양이에요 — 테두리 상자(`default`) 또는 검색용 회색 상자(`secondary`).
   * @remarks `"default" | "secondary"`
   * @default "default"
   */
  variant?: InputGroupProps["variant"];
  /** 높이와 글자 크기로, Input 과 같은 값이에요. 안의 아이콘 · 버튼도 따라가요.
   * @remarks `"default" | "sm"`
   * @default "default"
   */
  size?: InputGroupProps["size"];
};

export type MDXInputGroupAddonProps = {
  /** Where the addon sits: before or after the input, or above or below a textarea.
   * @remarks `"inline-start" | "inline-end" | "block-start" | "block-end"`
   * @default "inline-start"
   */
  align?: InputGroupAddonProps["align"];
};

export type MDXInputGroupAddonPropsKO = {
  /** 애드온의 자리예요 — 칸의 앞이나 뒤, 또는 textarea 의 위나 아래.
   * @remarks `"inline-start" | "inline-end" | "block-start" | "block-end"`
   * @default "inline-start"
   */
  align?: InputGroupAddonProps["align"];
};

export type MDXInputGroupButtonProps = {
  /** `xs` · `sm` are text buttons; `icon-xs` · `icon-sm` are bare icon buttons such as clear or show password. In a `size="sm"` group, `sm` and `icon-sm` shrink one step.
   * @remarks `"xs" | "sm" | "icon-xs" | "icon-sm"`
   * @default "icon-sm"
   */
  size?: InputGroupButtonProps["size"];
  /** Button variant.
   * @default "outline" for text sizes, "ghost" for icon sizes
   */
  variant?: InputGroupButtonProps["variant"];
};

export type MDXInputGroupButtonPropsKO = {
  /** `xs` · `sm` 은 글자 버튼, `icon-xs` · `icon-sm` 은 지우기 · 비밀번호 보기 같은 아이콘 버튼이에요. `size="sm"` 묶음 안에서는 `sm` · `icon-sm` 이 한 단계 작아져요.
   * @remarks `"xs" | "sm" | "icon-xs" | "icon-sm"`
   * @default "icon-sm"
   */
  size?: InputGroupButtonProps["size"];
  /** Button 의 모양이에요.
   * @default 글자 버튼은 "outline", 아이콘 버튼은 "ghost"
   */
  variant?: InputGroupButtonProps["variant"];
};
