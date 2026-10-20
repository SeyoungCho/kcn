import type { TextareaProps } from "@repo/t-flavored/ui/textarea";

export type MDXTextareaProps = {
  /** Look of the field — the same values as Input.
   * @default "default"
   */
  variant?: TextareaProps["variant"];
  /** Value of the textarea. Use when controlled. */
  value?: TextareaProps["value"];
  /** Value of the textarea on first render. Use when uncontrolled. */
  defaultValue?: TextareaProps["defaultValue"];
  /** Shows the error state. Set for you inside `<Field invalid>`. */
  "aria-invalid"?: TextareaProps["aria-invalid"];
  /** @default false */
  disabled?: TextareaProps["disabled"];
  /** Height grows with the content. Pass `h-*` to fix it or `min-h-*` to set a minimum. */
  className?: TextareaProps["className"];
};

export type MDXTextareaPropsKO = {
  /** 입력 칸의 모양 — Input 과 같은 값이에요.
   * @default "default"
   */
  variant?: TextareaProps["variant"];
  /** 입력 값. 제어 컴포넌트로 쓸 때 줘요. */
  value?: TextareaProps["value"];
  /** 처음 그릴 때의 값. 비제어 컴포넌트로 쓸 때 줘요. */
  defaultValue?: TextareaProps["defaultValue"];
  /** 에러 상태를 보여 줘요. `<Field invalid>` 안에서는 저절로 붙어요. */
  "aria-invalid"?: TextareaProps["aria-invalid"];
  /** @default false */
  disabled?: TextareaProps["disabled"];
  /** 높이는 내용에 맞춰 늘어나요. `h-*` 로 고정하거나 `min-h-*` 로 최소 높이를 정해요. */
  className?: TextareaProps["className"];
};
