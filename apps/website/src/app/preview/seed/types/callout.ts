import type {
  ActionableCalloutProps,
  CalloutProps,
  DismissibleCalloutProps,
} from "@repo/seed/ui/callout";

export type MDXCalloutProps = {
  /** Color tone of the callout.
   * @default "neutral"
   */
  tone?: CalloutProps["tone"];
  /** Icon before the text, passed as an element such as `<IconExclamationmarkCircleLine />`. */
  prefixIcon?: CalloutProps["prefixIcon"];
  /** Bold title shown before the description on the same line. */
  title?: CalloutProps["title"];
  /** Main message. */
  description: CalloutProps["description"];
  /** Props for an underlined link button placed after the text. Its `children` is the link text. */
  linkProps?: CalloutProps["linkProps"];
};

export type MDXCalloutPropsKO = {
  /** 콜아웃의 색조.
   * @default "neutral"
   */
  tone?: CalloutProps["tone"];
  /** 글 앞의 아이콘. `<IconExclamationmarkCircleLine />` 처럼 요소로 줍니다. */
  prefixIcon?: CalloutProps["prefixIcon"];
  /** 설명 앞에 같은 줄로 이어지는 굵은 제목. */
  title?: CalloutProps["title"];
  /** 본문 메시지. */
  description: CalloutProps["description"];
  /** 글 끝에 놓는 밑줄 링크(버튼)의 props. `children` 이 링크 글자예요. */
  linkProps?: CalloutProps["linkProps"];
};

export type MDXActionableCalloutProps = Pick<
  ActionableCalloutProps,
  "prefixIcon" | "title" | "description" | "onClick" | "disabled"
> & {
  /** Color tone of the callout.
   * @default "neutral"
   */
  tone?: ActionableCalloutProps["tone"];
};

export type MDXActionableCalloutPropsKO = MDXActionableCalloutProps;

export type MDXDismissibleCalloutProps = {
  /** Whether the callout is shown (controlled). */
  open?: DismissibleCalloutProps["open"];
  /** Whether the callout is shown initially (uncontrolled).
   * @default true
   */
  defaultOpen?: DismissibleCalloutProps["defaultOpen"];
  /** Called when the close button is pressed. */
  onDismiss?: DismissibleCalloutProps["onDismiss"];
};

export type MDXDismissibleCalloutPropsKO = {
  /** 보이는지(직접 다룰 때). */
  open?: DismissibleCalloutProps["open"];
  /** 처음에 보이는지(맡겨 둘 때).
   * @default true
   */
  defaultOpen?: DismissibleCalloutProps["defaultOpen"];
  /** 닫기 버튼을 눌렀을 때 불려요. */
  onDismiss?: DismissibleCalloutProps["onDismiss"];
};
