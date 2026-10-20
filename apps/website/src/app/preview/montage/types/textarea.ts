import type { TextareaProps } from "@repo/montage/ui/textarea";

export type MDXTextareaProps = {
  /** Minimum height and text size. `sm` is one step smaller.
   * @remarks `"default" | "sm"`
   * @default "default"
   */
  size?: TextareaProps["size"];
  /** Value of the textarea. Use when controlled. */
  value?: TextareaProps["value"];
  /** Value of the textarea on first render. Use when uncontrolled. */
  defaultValue?: TextareaProps["defaultValue"];
  /** Shows the error state. Set for you inside `<Field invalid>`.
   * @remarks `boolean`
   */
  "aria-invalid"?: TextareaProps["aria-invalid"];
  /** @default false */
  disabled?: TextareaProps["disabled"];
  /** The height grows with the content. Pass `max-h-*` to cap it or `h-*` to fix it. */
  className?: TextareaProps["className"];
};

export type MDXTextareaPropsKO = {
  /** 최소 높이와 글자 크기예요. `sm` 은 한 단계 작아요.
   * @remarks `"default" | "sm"`
   * @default "default"
   */
  size?: TextareaProps["size"];
  /** 입력 값. 제어 컴포넌트로 쓸 때 줘요. */
  value?: TextareaProps["value"];
  /** 처음 그릴 때의 값. 비제어 컴포넌트로 쓸 때 줘요. */
  defaultValue?: TextareaProps["defaultValue"];
  /** 에러 상태를 보여 줘요. `<Field invalid>` 안에서는 저절로 붙어요.
   * @remarks `boolean`
   */
  "aria-invalid"?: TextareaProps["aria-invalid"];
  /** @default false */
  disabled?: TextareaProps["disabled"];
  /** 높이는 내용에 맞춰 늘어나요. `max-h-*` 로 최대 높이를, `h-*` 로 고정 높이를 정해요. */
  className?: TextareaProps["className"];
};
