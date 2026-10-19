import type {
  SelectItemProps,
  SelectProps,
  SelectTriggerProps,
} from "@repo/seed/ui/select";

export type MDXSelectProps = Pick<
  SelectProps,
  | "value"
  | "defaultValue"
  | "onValueChange"
  | "open"
  | "onOpenChange"
  | "multiple"
  | "name"
> & {
  /** Size of the trigger and items.
   * @default "large"
   */
  size?: SelectProps["size"];
  /** @default false */
  invalid?: SelectProps["invalid"];
  /** @default false */
  disabled?: SelectProps["disabled"];
  /** @default false */
  readOnly?: SelectProps["readOnly"];
  /** @default false */
  required?: SelectProps["required"];
};

export type MDXSelectPropsKO = Pick<
  SelectProps,
  | "value"
  | "defaultValue"
  | "onValueChange"
  | "open"
  | "onOpenChange"
  | "multiple"
  | "name"
> & {
  /** 버튼과 항목의 크기.
   * @default "large"
   */
  size?: SelectProps["size"];
  /** @default false */
  invalid?: SelectProps["invalid"];
  /** @default false */
  disabled?: SelectProps["disabled"];
  /** @default false */
  readOnly?: SelectProps["readOnly"];
  /** @default false */
  required?: SelectProps["required"];
};

export type MDXSelectTriggerProps = Pick<
  SelectTriggerProps,
  "placeholder" | "prefixIcon" | "suffixIcon" | "size"
>;

export type MDXSelectItemProps = Pick<
  SelectItemProps,
  "value" | "label" | "description" | "prefixIcon" | "textValue" | "disabled"
>;
