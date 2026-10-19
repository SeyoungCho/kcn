import type {
  FieldButtonControlProps,
  FieldButtonProps,
} from "@repo/seed/ui/field-button";

export type MDXFieldButtonControlProps = {
  /** Size of the field.
   * @default "large"
   */
  size?: FieldButtonControlProps["size"];
  /** Values submitted with a form — one hidden input per value. Nothing is submitted when omitted. */
  values?: FieldButtonControlProps["values"];
  /** Called with `[]` when the clear button is pressed. */
  onValuesChange?: FieldButtonControlProps["onValuesChange"];
  /** Form name of the hidden inputs. */
  name?: FieldButtonControlProps["name"];
  /** Icon before the value. */
  prefixIcon?: FieldButtonControlProps["prefixIcon"];
  /** Text before the value. */
  prefix?: FieldButtonControlProps["prefix"];
  /** Icon after the value. */
  suffixIcon?: FieldButtonControlProps["suffixIcon"];
  /** Text after the value. */
  suffix?: FieldButtonControlProps["suffix"];
  /** Shows a clear button. Hidden while `disabled` or `readOnly`. Pair it with `onValuesChange`. */
  showClearButton?: FieldButtonControlProps["showClearButton"];
  /** Props for the underlying `<button>` — pass `onClick` and an `aria-label` that names the field and its current value. */
  buttonProps?: FieldButtonControlProps["buttonProps"];
  /** @default false */
  invalid?: FieldButtonControlProps["invalid"];
  /** @default false */
  disabled?: FieldButtonControlProps["disabled"];
  /** Looks read-only and can't be pressed, but still submits its values.
   * @default false
   */
  readOnly?: FieldButtonControlProps["readOnly"];
};

export type MDXFieldButtonControlPropsKO = {
  /** 칸 크기.
   * @default "large"
   */
  size?: FieldButtonControlProps["size"];
  /** 폼으로 보낼 값 — 값마다 숨은 input 이 하나씩 붙어요. 안 주면 보내지 않아요. */
  values?: FieldButtonControlProps["values"];
  /** 지우기 버튼을 누르면 `[]` 로 불려요. */
  onValuesChange?: FieldButtonControlProps["onValuesChange"];
  /** 숨은 input 의 폼 이름. */
  name?: FieldButtonControlProps["name"];
  /** 값 앞의 아이콘. */
  prefixIcon?: FieldButtonControlProps["prefixIcon"];
  /** 값 앞의 글. */
  prefix?: FieldButtonControlProps["prefix"];
  /** 값 뒤의 아이콘. */
  suffixIcon?: FieldButtonControlProps["suffixIcon"];
  /** 값 뒤의 글. */
  suffix?: FieldButtonControlProps["suffix"];
  /** 지우기 버튼을 보여 줘요. `disabled` · `readOnly` 일 때는 숨겨요. `onValuesChange` 와 같이 줘요. */
  showClearButton?: FieldButtonControlProps["showClearButton"];
  /** 실제 `<button>` 에 붙는 속성 — `onClick` 과, 칸 이름 · 지금 값을 알려 주는 `aria-label` 을 줘요. */
  buttonProps?: FieldButtonControlProps["buttonProps"];
  /** @default false */
  invalid?: FieldButtonControlProps["invalid"];
  /** @default false */
  disabled?: FieldButtonControlProps["disabled"];
  /** 읽기 전용 모양이고 누를 수 없지만 값은 폼으로 보내요.
   * @default false
   */
  readOnly?: FieldButtonControlProps["readOnly"];
};

export type MDXFieldButtonProps = MDXFieldButtonControlProps & {
  /** Label above the field. Pressing it focuses the button without opening anything. */
  label?: FieldButtonProps["label"];
  /** Font weight of the label.
   * @default "medium"
   */
  labelWeight?: FieldButtonProps["labelWeight"];
  /** Secondary text next to the label (such as "Optional"). */
  indicator?: FieldButtonProps["indicator"];
  /** Helper text below the field. Hidden visually while an error message shows. */
  description?: FieldButtonProps["description"];
  /** Error text below the field. Shown only when `invalid` is set. */
  errorMessage?: FieldButtonProps["errorMessage"];
  /** @default false */
  required?: FieldButtonProps["required"];
  /** Shows the required mark next to the label. */
  showRequiredIndicator?: FieldButtonProps["showRequiredIndicator"];
};

export type MDXFieldButtonPropsKO = MDXFieldButtonControlPropsKO & {
  /** 칸 위의 이름표. 누르면 버튼에 초점만 가고 아무것도 열리지 않아요. */
  label?: FieldButtonProps["label"];
  /** 이름표의 굵기.
   * @default "medium"
   */
  labelWeight?: FieldButtonProps["labelWeight"];
  /** 이름표 옆의 보조 글('선택' 같은 것). */
  indicator?: FieldButtonProps["indicator"];
  /** 칸 아래의 도움말. 오류 메시지가 보이는 동안에는 화면에서 감춰요. */
  description?: FieldButtonProps["description"];
  /** 칸 아래의 오류 메시지. `invalid` 일 때만 보여요. */
  errorMessage?: FieldButtonProps["errorMessage"];
  /** @default false */
  required?: FieldButtonProps["required"];
  /** 이름표 옆에 필수 표시를 보여 줘요. */
  showRequiredIndicator?: FieldButtonProps["showRequiredIndicator"];
};
