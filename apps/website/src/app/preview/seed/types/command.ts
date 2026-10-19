import type {
  CommandDialogProps,
  CommandInputProps,
  CommandItemProps,
  CommandProps,
} from "@repo/seed/ui/command";

export type MDXCommandProps = {
  /** Items to list — a flat array, or groups of `{ value, items }`. Objects shaped `{ value, label }` are matched by `label`. */
  items?: CommandProps["items"];
  /** Pre-filtered items. Use with `filter={null}` to filter outside the component. */
  filteredItems?: CommandProps["filteredItems"];
  /** Function that matches an item against the query. `null` turns off built-in filtering. */
  filter?: CommandProps["filter"];
  /** Input text (controlled). */
  value?: CommandProps["value"];
  /** Initial input text (uncontrolled). */
  defaultValue?: CommandProps["defaultValue"];
  /** Called when the input text changes. */
  onValueChange?: CommandProps["onValueChange"];
  /** Converts an object item to the string used for matching. */
  itemToStringValue?: CommandProps["itemToStringValue"];
  /** Called when the highlighted item changes. */
  onItemHighlighted?: CommandProps["onItemHighlighted"];
  /** Base UI Autocomplete filtering mode.
   * @default "list"
   */
  mode?: CommandProps["mode"];
  /** Always keeps one item highlighted, so Enter picks the first match right away.
   * @default "always"
   */
  autoHighlight?: CommandProps["autoHighlight"];
};

export type MDXCommandPropsKO = {
  /** 목록에 놓을 항목 — 낱 배열이나 `{ value, items }` 묶음의 배열. `{ value, label }` 모양의 객체는 `label` 로 걸러요. */
  items?: CommandProps["items"];
  /** 미리 거른 항목. `filter={null}` 과 함께 써서 바깥에서 걸러요. */
  filteredItems?: CommandProps["filteredItems"];
  /** 항목이 입력한 글자에 맞는지 따지는 함수. `null` 이면 안에서 거르지 않아요. */
  filter?: CommandProps["filter"];
  /** 입력칸의 글자(제어). */
  value?: CommandProps["value"];
  /** 처음 글자(비제어). */
  defaultValue?: CommandProps["defaultValue"];
  /** 입력칸의 글자가 바뀔 때 불려요. */
  onValueChange?: CommandProps["onValueChange"];
  /** 객체 항목을 거를 때 쓸 글자로 바꿔요. */
  itemToStringValue?: CommandProps["itemToStringValue"];
  /** 강조된 항목이 바뀔 때 불려요. */
  onItemHighlighted?: CommandProps["onItemHighlighted"];
  /** Base UI Autocomplete 의 거르는 방식.
   * @default "list"
   */
  mode?: CommandProps["mode"];
  /** 강조를 늘 한 항목에 둬요 — 열자마자 Enter 로 첫 항목을 고를 수 있어요.
   * @default "always"
   */
  autoHighlight?: CommandProps["autoHighlight"];
};

export type MDXCommandInputProps = Pick<
  CommandInputProps,
  "placeholder" | "disabled"
> & {
  /** Content at the right end of the input, such as a shortcut hint. */
  suffix?: CommandInputProps["suffix"];
};

export type MDXCommandInputPropsKO = Pick<
  CommandInputProps,
  "placeholder" | "disabled"
> & {
  /** 입력칸 오른쪽 끝에 놓을 것(단축키 안내 등). */
  suffix?: CommandInputProps["suffix"];
};

export type MDXCommandItemProps = {
  /** Item value — pass the item from `items`. */
  value?: CommandItemProps["value"];
  /** Called when the item is clicked, or pressed with Enter while highlighted. */
  onClick?: CommandItemProps["onClick"];
  /** @default false */
  disabled?: CommandItemProps["disabled"];
};

export type MDXCommandItemPropsKO = {
  /** 항목의 값 — `items` 의 항목을 그대로 줘요. */
  value?: CommandItemProps["value"];
  /** 누르거나, 강조된 채 Enter 를 치면 불려요. */
  onClick?: CommandItemProps["onClick"];
  /** @default false */
  disabled?: CommandItemProps["disabled"];
};

export type MDXCommandDialogProps = Pick<
  CommandDialogProps,
  "open" | "defaultOpen" | "onOpenChange"
> & {
  /** Accessible name of the dialog. Required, since the palette has no visible title. */
  "aria-label": CommandDialogProps["aria-label"];
  /** Stacking order against other dialogs and fixed headers — higher sits on top. */
  layerIndex?: CommandDialogProps["layerIndex"];
};

export type MDXCommandDialogPropsKO = Pick<
  CommandDialogProps,
  "open" | "defaultOpen" | "onOpenChange"
> & {
  /** 창의 이름(화면 낭독기). 보이는 제목이 없으므로 꼭 줘요. */
  "aria-label": CommandDialogProps["aria-label"];
  /** 다른 창 · 고정된 머리줄과 겹칠 때의 순서 — 클수록 위예요. */
  layerIndex?: CommandDialogProps["layerIndex"];
};
