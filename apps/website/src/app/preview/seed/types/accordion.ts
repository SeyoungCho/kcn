import type {
  AccordionContentProps,
  AccordionItemProps,
  AccordionProps,
  AccordionTriggerProps,
} from "@repo/seed/ui/accordion";

export type MDXAccordionProps = Pick<AccordionProps, "disabled"> & {
  /** `inline` draws a thin line between rows; `separated` puts each item in its own bordered box.
   * @default "inline"
   */
  variant?: AccordionProps["variant"];
  /** Size of the rows. `responsive` is `medium` below 768px and `large` from 768px.
   * @default "medium"
   */
  size?: AccordionProps["size"];
  /** Values of the expanded items (controlled). */
  values?: AccordionProps["values"];
  /** Values of the items expanded initially. */
  defaultValues?: AccordionProps["defaultValues"];
  /** Called with the expanded values when they change. */
  onValuesChange?: AccordionProps["onValuesChange"];
  /** Allows more than one item to be expanded at a time.
   * @default false
   */
  multiple?: AccordionProps["multiple"];
};

export type MDXAccordionPropsKO = Pick<AccordionProps, "disabled"> & {
  /** `inline` 은 줄 사이에 가는 선, `separated` 는 항목마다 테두리를 두른 상자.
   * @default "inline"
   */
  variant?: AccordionProps["variant"];
  /** 줄의 크기. `responsive` 는 768px 아래에서 `medium`, 768px 부터 `large`.
   * @default "medium"
   */
  size?: AccordionProps["size"];
  /** 펼쳐 둘 항목의 value 들(제어). */
  values?: AccordionProps["values"];
  /** 처음에 펼쳐 둘 항목의 value 들. */
  defaultValues?: AccordionProps["defaultValues"];
  /** 펼친 항목이 바뀌면 그 value 들로 불립니다. */
  onValuesChange?: AccordionProps["onValuesChange"];
  /** 여러 항목을 같이 펼 수 있게 합니다.
   * @default false
   */
  multiple?: AccordionProps["multiple"];
};

export type MDXAccordionItemProps = Pick<
  AccordionItemProps,
  "value" | "disabled"
>;

export type MDXAccordionTriggerProps = {
  /** Title of the item. */
  title: AccordionTriggerProps["title"];
  /** Secondary text below the title. */
  description?: AccordionTriggerProps["description"];
  /** Content before the title, such as an icon. */
  prefix?: AccordionTriggerProps["prefix"];
  /** Icon at the end. Rotates half a turn when expanded.
   * @default <IconChevronDownSmallLine />
   */
  suffixIcon?: AccordionTriggerProps["suffixIcon"];
  /** Heading level of the element that wraps the trigger.
   * @default 3
   */
  headingLevel?: AccordionTriggerProps["headingLevel"];
};

export type MDXAccordionTriggerPropsKO = {
  /** 항목의 제목. */
  title: AccordionTriggerProps["title"];
  /** 제목 아래의 설명. */
  description?: AccordionTriggerProps["description"];
  /** 제목 앞에 놓는 것(아이콘 등). */
  prefix?: AccordionTriggerProps["prefix"];
  /** 오른쪽 끝의 아이콘. 펼치면 반 바퀴 돕니다.
   * @default <IconChevronDownSmallLine />
   */
  suffixIcon?: AccordionTriggerProps["suffixIcon"];
  /** 제목 줄을 감싸는 제목 요소의 단계.
   * @default 3
   */
  headingLevel?: AccordionTriggerProps["headingLevel"];
};

export type MDXAccordionContentProps = Pick<
  AccordionContentProps,
  "keepMounted" | "hiddenUntilFound"
>;
