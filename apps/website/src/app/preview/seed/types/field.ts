import type {
  FieldCharacterCountProps,
  FieldLabelProps,
  FieldProps,
} from "@repo/seed/ui/field";

export type MDXFieldProps = {
  /** Passed down to the control inside (such as `TextFieldRoot` or `FieldButtonControl`).
   * @default false
   */
  required?: FieldProps["required"];
  /** Disables the control and dims the label and messages.
   * @default false
   */
  disabled?: FieldProps["disabled"];
  /** Shows the control, character count, and messages in the error style.
   * @default false
   */
  invalid?: FieldProps["invalid"];
  /** @default false */
  readOnly?: FieldProps["readOnly"];
  /** Form name of the control. */
  name?: FieldProps["name"];
};

export type MDXFieldPropsKO = {
  /** 안에 놓인 칸(`TextFieldRoot`, `FieldButtonControl` 등)에 내려가요.
   * @default false
   */
  required?: FieldProps["required"];
  /** 칸을 비활성화하고 이름표 · 아래 글을 흐리게 해요.
   * @default false
   */
  disabled?: FieldProps["disabled"];
  /** 칸 · 글자 수 · 아래 글을 오류 모양으로 보여 줘요.
   * @default false
   */
  invalid?: FieldProps["invalid"];
  /** @default false */
  readOnly?: FieldProps["readOnly"];
  /** 폼으로 보낼 때 칸의 이름. */
  name?: FieldProps["name"];
};

export type MDXFieldLabelProps = {
  /** Font weight of the label.
   * @default "medium"
   */
  weight?: FieldLabelProps["weight"];
};

export type MDXFieldLabelPropsKO = {
  /** 이름표의 굵기.
   * @default "medium"
   */
  weight?: FieldLabelProps["weight"];
};

export type MDXFieldCharacterCountProps = {
  /** Current character count. */
  current: FieldCharacterCountProps["current"];
  /** Upper limit. The count turns red only when the `Field` is `invalid`. */
  max: FieldCharacterCountProps["max"];
};

export type MDXFieldCharacterCountPropsKO = {
  /** 지금 글자 수. */
  current: FieldCharacterCountProps["current"];
  /** 상한. 숫자는 `Field` 가 `invalid` 일 때만 빨갛게 바뀌어요. */
  max: FieldCharacterCountProps["max"];
};
