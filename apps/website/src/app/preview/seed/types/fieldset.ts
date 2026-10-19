import type {
  FieldsetChromeProps,
  FieldsetLabelProps,
} from "@repo/seed/ui/fieldset";

export type MDXFieldsetProps = {
  /** Group label. */
  label?: FieldsetChromeProps["label"];
  /** Font weight of the label.
   * @default "medium"
   */
  labelWeight?: FieldsetChromeProps["labelWeight"];
  /** Secondary text next to the label (such as "Optional"). */
  indicator?: FieldsetChromeProps["indicator"];
  /** Shows the required mark next to the label. */
  showRequiredIndicator?: FieldsetChromeProps["showRequiredIndicator"];
  /** Helper text below the group. Hidden visually while an error message shows. */
  description?: FieldsetChromeProps["description"];
  /** Error text below the group. */
  errorMessage?: FieldsetChromeProps["errorMessage"];
};

export type MDXFieldsetPropsKO = {
  /** 묶음의 이름표. */
  label?: FieldsetChromeProps["label"];
  /** 이름표의 굵기.
   * @default "medium"
   */
  labelWeight?: FieldsetChromeProps["labelWeight"];
  /** 이름표 옆의 보조 글('선택' 같은 것). */
  indicator?: FieldsetChromeProps["indicator"];
  /** 이름표 옆에 필수 표시를 보여 줘요. */
  showRequiredIndicator?: FieldsetChromeProps["showRequiredIndicator"];
  /** 묶음 아래의 도움말. 오류 메시지가 보이는 동안에는 화면에서 감춰요. */
  description?: FieldsetChromeProps["description"];
  /** 묶음 아래의 오류 메시지. */
  errorMessage?: FieldsetChromeProps["errorMessage"];
};

export type MDXFieldsetLabelProps = {
  /** Font weight of the label.
   * @default "medium"
   */
  weight?: FieldsetLabelProps["weight"];
};

export type MDXFieldsetLabelPropsKO = {
  /** 이름표의 굵기.
   * @default "medium"
   */
  weight?: FieldsetLabelProps["weight"];
};
