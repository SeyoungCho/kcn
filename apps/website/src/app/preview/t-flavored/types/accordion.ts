import type {
  AccordionItemProps,
  AccordionProps,
} from "@repo/t-flavored/ui/accordion";

export type MDXAccordionProps = Pick<
  AccordionProps,
  | "value"
  | "defaultValue"
  | "onValueChange"
  | "multiple"
  | "disabled"
  | "hiddenUntilFound"
>;

export type MDXAccordionPropsKO = {
  /** 펼친 항목들의 값(제어 모드). `onValueChange` 와 같이 써요. */
  value?: AccordionProps["value"];
  /** 처음에 펼쳐 둘 항목들의 값(비제어 모드). */
  defaultValue?: AccordionProps["defaultValue"];
  /** 항목이 펼쳐지거나 접힐 때 불려요. */
  onValueChange?: AccordionProps["onValueChange"];
  /** 여러 항목을 함께 펼칠 수 있게 해요.
   * @default false
   */
  multiple?: AccordionProps["multiple"];
  /** @default false */
  disabled?: AccordionProps["disabled"];
  /** 브라우저의 페이지 찾기로 접힌 내용도 찾아 펼칠 수 있게 해요.
   * @default false
   */
  hiddenUntilFound?: AccordionProps["hiddenUntilFound"];
};

export type MDXAccordionItemProps = Pick<
  AccordionItemProps,
  "value" | "disabled" | "onOpenChange"
>;

export type MDXAccordionItemPropsKO = {
  /** 이 항목을 가리키는 값. `Accordion` 의 `value` · `defaultValue` 에 써요. */
  value?: AccordionItemProps["value"];
  /** @default false */
  disabled?: AccordionItemProps["disabled"];
  /** 이 항목이 펼쳐지거나 접힐 때 불려요. */
  onOpenChange?: AccordionItemProps["onOpenChange"];
};
