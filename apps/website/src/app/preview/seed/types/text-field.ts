import type { TextFieldProps } from "@repo/seed/ui/text-field";

export type MDXTextFieldProps = Pick<
  TextFieldProps,
  "value" | "defaultValue" | "onValueChange"
> & {
  /** Visual style of the field.
   * @default "outline"
   */
  variant?: TextFieldProps["variant"];
  /** Size of the field.
   * @default "large"
   */
  size?: TextFieldProps["size"];
  /** Label above the field. */
  label?: TextFieldProps["label"];
  /** Helper text below the field. Hidden visually while an error message shows. */
  description?: TextFieldProps["description"];
  /** Error text below the field. Shown only when `invalid` is set. */
  errorMessage?: TextFieldProps["errorMessage"];
  /** Icon before the input. */
  prefixIcon?: TextFieldProps["prefixIcon"];
  /** Text before the input. */
  prefix?: TextFieldProps["prefix"];
  /** Icon after the input. */
  suffixIcon?: TextFieldProps["suffixIcon"];
  /** Text after the input (units and the like). */
  suffix?: TextFieldProps["suffix"];
  /** Shows a `current/max` character counter below the field, counting graphemes. */
  maxGraphemeCount?: TextFieldProps["maxGraphemeCount"];
  /** @default false */
  invalid?: TextFieldProps["invalid"];
  /** @default false */
  disabled?: TextFieldProps["disabled"];
  /** @default false */
  readOnly?: TextFieldProps["readOnly"];
  /** @default false */
  required?: TextFieldProps["required"];
  /** Shows the required mark next to the label. */
  showRequiredIndicator?: TextFieldProps["showRequiredIndicator"];
};

export type MDXTextFieldPropsKO = Pick<
  TextFieldProps,
  "value" | "defaultValue" | "onValueChange"
> & {
  /** 입력 칸의 모양.
   * @default "outline"
   */
  variant?: TextFieldProps["variant"];
  /** 입력 칸 크기.
   * @default "large"
   */
  size?: TextFieldProps["size"];
  /** 칸 위의 이름표. */
  label?: TextFieldProps["label"];
  /** 칸 아래의 도움말. 오류 메시지가 보이는 동안에는 화면에서 감춰요. */
  description?: TextFieldProps["description"];
  /** 칸 아래의 오류 메시지. `invalid` 일 때만 보여요. */
  errorMessage?: TextFieldProps["errorMessage"];
  /** 입력 앞의 아이콘. */
  prefixIcon?: TextFieldProps["prefixIcon"];
  /** 입력 앞의 글. */
  prefix?: TextFieldProps["prefix"];
  /** 입력 뒤의 아이콘. */
  suffixIcon?: TextFieldProps["suffixIcon"];
  /** 입력 뒤의 글(단위 등). */
  suffix?: TextFieldProps["suffix"];
  /** 칸 아래에 `지금 글자 수/상한` 을 보여 줘요(글자는 grapheme 단위로 세요). */
  maxGraphemeCount?: TextFieldProps["maxGraphemeCount"];
  /** @default false */
  invalid?: TextFieldProps["invalid"];
  /** @default false */
  disabled?: TextFieldProps["disabled"];
  /** @default false */
  readOnly?: TextFieldProps["readOnly"];
  /** @default false */
  required?: TextFieldProps["required"];
  /** 이름표 옆에 필수 표시를 보여 줘요. */
  showRequiredIndicator?: TextFieldProps["showRequiredIndicator"];
};
