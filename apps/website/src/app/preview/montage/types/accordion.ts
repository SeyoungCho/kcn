import type {
  AccordionContentProps,
  AccordionItemProps,
  AccordionProps,
} from "@repo/montage/ui/accordion";

export type MDXAccordionProps = {
  /** Layout. `default` has no side padding; `full` adds side padding and a full-width press highlight.
   * @default "default"
   */
  variant?: AccordionProps["variant"];
  /** Vertical padding of each heading row.
   * @default "lg"
   */
  size?: AccordionProps["size"];
  /** Lets several items stay open at once.
   * @default false
   */
  multiple?: AccordionProps["multiple"];
  /** Values of the open items (controlled). Use with `onValueChange`. */
  value?: AccordionProps["value"];
  /** Values of the items open at first (uncontrolled). */
  defaultValue?: AccordionProps["defaultValue"];
  /** Called when an item opens or closes. */
  onValueChange?: AccordionProps["onValueChange"];
  /** @default false */
  disabled?: AccordionProps["disabled"];
};

export type MDXAccordionPropsKO = {
  /** 배치. `default` 는 좌우 여백이 없고, `full` 은 좌우 여백을 두고 누를 때 줄 너비를 꽉 채워 깔려요.
   * @default "default"
   */
  variant?: AccordionProps["variant"];
  /** 제목 줄의 위아래 여백.
   * @default "lg"
   */
  size?: AccordionProps["size"];
  /** 여러 항목을 함께 펼쳐 둘 수 있어요.
   * @default false
   */
  multiple?: AccordionProps["multiple"];
  /** 펼친 항목들의 값(제어 모드). `onValueChange` 와 같이 써요. */
  value?: AccordionProps["value"];
  /** 처음에 펼칠 항목들의 값(비제어 모드). */
  defaultValue?: AccordionProps["defaultValue"];
  /** 항목이 펼쳐지거나 접힐 때 불려요. */
  onValueChange?: AccordionProps["onValueChange"];
  /** @default false */
  disabled?: AccordionProps["disabled"];
};

export type MDXAccordionItemProps = Pick<
  AccordionItemProps,
  "value" | "disabled"
>;

export type MDXAccordionItemPropsKO = {
  /** 이 항목을 가리키는 값. */
  value?: AccordionItemProps["value"];
  /** @default false */
  disabled?: AccordionItemProps["disabled"];
};

export type MDXAccordionContentProps = Pick<
  AccordionContentProps,
  "keepMounted" | "hiddenUntilFound"
>;

export type MDXAccordionContentPropsKO = {
  /** 접힌 동안에도 DOM 에 남겨 둬요.
   * @default false
   */
  keepMounted?: AccordionContentProps["keepMounted"];
  /** 브라우저의 페이지 찾기로 접힌 내용을 찾아 펼칠 수 있어요.
   * @default false
   */
  hiddenUntilFound?: AccordionContentProps["hiddenUntilFound"];
};
