import type {
  InputGroupAddonProps,
  InputGroupButtonProps,
  InputGroupProps,
} from "@repo/t-flavored/ui/input-group";

export type MDXInputGroupProps = {
  /** Look of the group. `default` · `line` · `big` · `hero` match Input; `search` is a grey search box.
   * @default "default"
   */
  variant?: InputGroupProps["variant"];
};

export type MDXInputGroupPropsKO = {
  /** 묶음의 모양. `default` · `line` · `big` · `hero` 는 Input 과 같고, `search` 는 회색 검색창이에요.
   * @default "default"
   */
  variant?: InputGroupProps["variant"];
};

export type MDXInputGroupAddonProps = {
  /** Side of the input. Text in an `inline-end` addon (a unit) stays light while the input is empty.
   * @default "inline-start"
   */
  align?: InputGroupAddonProps["align"];
};

export type MDXInputGroupAddonPropsKO = {
  /** 칸의 어느 쪽에 둘지. `inline-end` 의 글(단위)은 칸이 비어 있는 동안 옅어요.
   * @default "inline-start"
   */
  align?: InputGroupAddonProps["align"];
};

export type MDXInputGroupButtonProps = {
  /** `sm` is a small Button for an action on the right; `icon-xs` and `icon-sm` are grey icon buttons such as clear or show password.
   * @default "icon-xs"
   */
  size?: InputGroupButtonProps["size"];
  /** Button variant.
   * @default "ghost"
   */
  variant?: InputGroupButtonProps["variant"];
};

export type MDXInputGroupButtonPropsKO = {
  /** `sm` 은 오른쪽 액션용 작은 Button, `icon-xs` · `icon-sm` 은 지우기 · 비밀번호 보기 같은 회색 아이콘 버튼이에요.
   * @default "icon-xs"
   */
  size?: InputGroupButtonProps["size"];
  /** Button 의 모양.
   * @default "ghost"
   */
  variant?: InputGroupButtonProps["variant"];
};
