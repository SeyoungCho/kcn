import type {
  TextareaProps,
  TextareaVariantProps,
} from "@repo/seed/ui/textarea";

export type MDXTextareaProps = {
  /**
   * Size of the textarea.
   * @remarks `"md" | "lg"`
   * @default "lg"
   */
  size?: TextareaVariantProps["size"];
  /**
   * Placeholder text displayed when the textarea is empty.
   * @remarks `string`
   */
  placeholder?: TextareaProps["placeholder"];
  /**
   * Disables user interaction with the textarea.
   * @remarks `boolean`
   * @default false
   */
  disabled?: TextareaProps["disabled"];
  /**
   * Prevents editing while keeping the textarea focusable.
   * @remarks `boolean`
   * @default false
   */
  readOnly?: TextareaProps["readOnly"];
  /**
   * Marks the textarea as invalid for validation styling.
   * @remarks `boolean`
   * @default false
   */
  "data-invalid"?: boolean;
};

export type MDXTextareaPropsKO = {
  /**
   * Textarea의 크기입니다.
   * @remarks `"md" | "lg"`
   * @default "lg"
   */
  size?: TextareaVariantProps["size"];
  /**
   * Textarea가 비어 있을 때 표시할 안내 문구입니다.
   * @remarks `string`
   */
  placeholder?: TextareaProps["placeholder"];
  /**
   * Textarea를 비활성화하여 사용자 입력을 막습니다.
   * @remarks `boolean`
   * @default false
   */
  disabled?: TextareaProps["disabled"];
  /**
   * 포커스는 허용하지만 내용 편집을 막습니다.
   * @remarks `boolean`
   * @default false
   */
  readOnly?: TextareaProps["readOnly"];
  /**
   * 유효성 검사 오류 스타일을 적용합니다.
   * @remarks `boolean`
   * @default false
   */
  "data-invalid"?: boolean;
};
