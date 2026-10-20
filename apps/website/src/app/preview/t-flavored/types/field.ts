import type { FieldErrorProps, FieldProps } from "@repo/t-flavored/ui/field";

export type MDXFieldProps = {
  /** Stacks the parts (`vertical`) or puts the control beside the label (`horizontal`, for switches and checkboxes).
   * @default "vertical"
   */
  orientation?: FieldProps["orientation"];
  /** Marks the field invalid: the label and description turn red and the control gets `aria-invalid`.
   * @default false
   */
  invalid?: FieldProps["invalid"];
  /** Disables the control inside the field.
   * @default false
   */
  disabled?: FieldProps["disabled"];
  /** Name of the control when the form is submitted. */
  name?: FieldProps["name"];
  /** Custom validation that returns an error message (or several) for `<FieldError />` to show. */
  validate?: FieldProps["validate"];
  /** When `validate` and native constraints run.
   * @default "onSubmit"
   */
  validationMode?: FieldProps["validationMode"];
};

export type MDXFieldPropsKO = {
  /** 부품을 위아래로 쌓거나(`vertical`), 라벨 옆에 칸을 둬요(`horizontal` — 스위치 · 체크박스).
   * @default "vertical"
   */
  orientation?: FieldProps["orientation"];
  /** 에러 상태로 만들어요 — 라벨 · 도움말이 빨개지고 칸에 `aria-invalid` 가 붙어요.
   * @default false
   */
  invalid?: FieldProps["invalid"];
  /** 안의 칸을 비활성화해요.
   * @default false
   */
  disabled?: FieldProps["disabled"];
  /** 폼을 보낼 때 칸의 이름이에요. */
  name?: FieldProps["name"];
  /** 직접 하는 검사예요 — 돌려준 에러 메시지(여러 개도 돼요)를 `<FieldError />` 가 보여 줘요. */
  validate?: FieldProps["validate"];
  /** `validate` 와 브라우저 검사를 언제 할지 정해요.
   * @default "onSubmit"
   */
  validationMode?: FieldProps["validationMode"];
};

export type MDXFieldErrorProps = {
  /** Error messages from a form library; duplicates show once and several show as a list. */
  errors?: FieldErrorProps["errors"];
  /** Without `children` or `errors`, which validity state shows the browser's message (`true` always shows it). */
  match?: FieldErrorProps["match"];
};

export type MDXFieldErrorPropsKO = {
  /** 폼 라이브러리의 에러 목록이에요 — 같은 메시지는 한 번만, 여러 개면 목록으로 보여요. */
  errors?: FieldErrorProps["errors"];
  /** `children` · `errors` 가 없을 때 어떤 검사 결과에서 브라우저의 메시지를 보일지 정해요(`true` 면 늘 보여요). */
  match?: FieldErrorProps["match"];
};
