import type { Combobox as ComboboxPrimitive } from "@base-ui/react/combobox";
import type { ComboboxContentProps } from "@repo/seed/ui/combobox";

type RootProps = ComboboxPrimitive.Root.Props<string, boolean>;

export type MDXComboboxProps = Pick<
  RootProps,
  | "value"
  | "defaultValue"
  | "onValueChange"
  | "inputValue"
  | "onInputValueChange"
  | "open"
  | "onOpenChange"
  | "name"
> & {
  /** All options. The list filters them by the typed text. */
  items?: RootProps["items"];
  /** Lets the user pick several options. Values become arrays; show them with `ComboboxChips`.
   * @default false
   */
  multiple?: RootProps["multiple"];
  /** Converts a value to the text shown in the input and used for filtering. */
  itemToStringLabel?: RootProps["itemToStringLabel"];
  /** Custom filter. Pass `null` to turn filtering off (for example, when the server filters). */
  filter?: RootProps["filter"];
  /** Maximum number of options shown.
   * @default -1
   */
  limit?: RootProps["limit"];
  /** Whether the list opens when the input is clicked.
   * @default true
   */
  openOnInputClick?: RootProps["openOnInputClick"];
  /** @default false */
  disabled?: RootProps["disabled"];
  /** @default false */
  readOnly?: RootProps["readOnly"];
  /** @default false */
  required?: RootProps["required"];
};

export type MDXComboboxPropsKO = Pick<
  RootProps,
  | "value"
  | "defaultValue"
  | "onValueChange"
  | "inputValue"
  | "onInputValueChange"
  | "open"
  | "onOpenChange"
  | "name"
> & {
  /** 모든 항목. 친 글자로 목록을 걸러요. */
  items?: RootProps["items"];
  /** 여럿을 고를 수 있어요. 값은 배열이 되고, `ComboboxChips` 로 보여 줘요.
   * @default false
   */
  multiple?: RootProps["multiple"];
  /** 값을 입력칸에 보일 글(거르기에도 써요)로 바꿔요. */
  itemToStringLabel?: RootProps["itemToStringLabel"];
  /** 직접 거르는 함수. `null` 을 주면 거르지 않아요(서버에서 거를 때 등). */
  filter?: RootProps["filter"];
  /** 보여 줄 항목의 최대 개수.
   * @default -1
   */
  limit?: RootProps["limit"];
  /** 입력칸을 누르면 목록이 열리는지.
   * @default true
   */
  openOnInputClick?: RootProps["openOnInputClick"];
  /** @default false */
  disabled?: RootProps["disabled"];
  /** @default false */
  readOnly?: RootProps["readOnly"];
  /** @default false */
  required?: RootProps["required"];
};

export type MDXComboboxContentProps = {
  /** Gap between the input and the list, in px.
   * @default 8
   */
  gutter?: ComboboxContentProps["gutter"];
};

export type MDXComboboxContentPropsKO = {
  /** 입력칸과 목록 사이의 간격(px).
   * @default 8
   */
  gutter?: ComboboxContentProps["gutter"];
};
