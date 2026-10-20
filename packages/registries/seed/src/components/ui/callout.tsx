"use client";

import * as React from "react";
import IconChevronRightLine from "@karrotmarket/react-monochrome-icon/IconChevronRightLine";
import IconXmarkLine from "@karrotmarket/react-monochrome-icon/IconXmarkLine";
import { cva } from "class-variance-authority";
import type { VariantProps } from "class-variance-authority";

import { PrefixIcon, SuffixIcon } from "@/components/ui/affix-icon";
import { useScaleFeedback } from "@/lib/use-scale-feedback";
import { cn } from "@/lib/utils";

// 글자 · 아이콘 색은 색조마다 하나라 --callout-fg 로 두고 안쪽 요소가 읽는다.
const calloutVariants = cva(
  [
    `box-border flex min-h-12.5 w-full items-center gap-x3 rounded-r2.5
    [border:none] px-x3.5 py-x3.5`,
    "text-start font-[inherit] [font-size:unset] no-underline antialiased",
    `[--prefix-icon-size:var(--dimension-x4)]
    [--suffix-icon-size:var(--dimension-x4)]`,
    `[--prefix-icon-color:var(--callout-fg)]
    [--suffix-icon-color:var(--callout-fg)]`,
    // SEED 처럼 늘 쌓임 맥락을 만든다(누르는 콜아웃이 누르는 순간에만 맥락이 생기지 않게 한 것이 그냥 콜아웃에도 걸려 있다)
    "scale-[1]",
  ],
  {
    variants: {
      tone: {
        neutral: "bg-bg-neutral-weak [--callout-fg:var(--fg-neutral)]",
        informative:
          "bg-bg-informative-weak [--callout-fg:var(--fg-informative-contrast)]",
        positive:
          "bg-bg-positive-weak [--callout-fg:var(--fg-positive-contrast)]",
        warning: "bg-bg-warning-weak [--callout-fg:var(--fg-warning-contrast)]",
        critical:
          "bg-bg-critical-weak [--callout-fg:var(--fg-critical-contrast)]",
        magic: `bg-[linear-gradient(88deg,var(--gradient-glow-magic))]
        [--callout-fg:var(--fg-neutral)]`,
      },
    },
    defaultVariants: { tone: "neutral" },
  },
);

// 통째로 누르는 콜아웃(버튼)에만 붙는 것 — 손을 대면 바탕이 짙어지고, 누르면 살짝 줄어든다.
const actionableVariants = cva(
  [
    "cursor-pointer pressed:scale-(--feedback-scale)",
    "[transition:var(--feedback-scale-transition),outline-color_var(--motion-duration-d3)_var(--motion-ease-easing)]",
    `outline-solid outline-(length:--dimension-x0_5)
    outline-offset-(--dimension-x0_5) outline-transparent
    focused:outline-stroke-focus-ring`,
  ],
  {
    variants: {
      tone: {
        neutral: "engaged:bg-bg-neutral-weak-pressed",
        informative: "engaged:bg-bg-informative-weak-pressed",
        positive: "engaged:bg-bg-positive-weak-pressed",
        warning: "engaged:bg-bg-warning-weak-pressed",
        critical: "engaged:bg-bg-critical-weak-pressed",
        magic:
          "engaged:bg-[linear-gradient(88deg,var(--gradient-glow-magic-pressed))]",
      },
    },
    defaultVariants: { tone: "neutral" },
  },
);

const TEXT = "text-t4 text-(--callout-fg)";
// 제목 · 설명 · 링크가 한 줄로 이어질 때 사이에 두는 빈칸 두 개
const GAP_AFTER = "after:whitespace-pre after:content-['__']";

type Tone = VariantProps<typeof calloutVariants>["tone"];

interface CalloutContentProps {
  /** 글 앞의 아이콘 — `<IconExclamationmarkCircleLine />` 처럼 요소로 준다 */
  prefixIcon?: React.ReactElement;
  title?: React.ReactNode;
  description: React.ReactNode;
}

type LinkProps = React.ButtonHTMLAttributes<HTMLButtonElement>;

function CalloutBody({
  prefixIcon,
  title,
  description,
  linkProps,
}: CalloutContentProps & { linkProps?: LinkProps }) {
  return (
    <>
      {prefixIcon ? <PrefixIcon svg={prefixIcon} /> : null}
      <div data-slot="callout-content" className="mr-auto leading-t4">
        {title ? (
          <span
            data-slot="callout-title"
            className={cn(TEXT, "font-bold", GAP_AFTER)}
          >
            {title}
          </span>
        ) : null}
        <span
          data-slot="callout-description"
          className={cn(TEXT, "font-regular", linkProps && GAP_AFTER)}
        >
          {description}
        </span>
        {linkProps ? (
          <button
            type="button"
            data-slot="callout-link"
            {...linkProps}
            className={cn(
              TEXT,
              `inline-block cursor-pointer rounded-r1 [border:none]
                bg-transparent p-0 font-[inherit] font-regular underline
                underline-offset-2`,
              "transition-[outline-color] duration-d3 ease-easing",
              `outline-solid outline-(length:--dimension-x0_5)
                outline-offset-(--dimension-x0_5) outline-transparent
                focused:outline-stroke-focus-ring`,
              linkProps.className,
            )}
          />
        ) : null}
      </div>
    </>
  );
}

export interface CalloutProps
  extends
    Omit<React.HTMLAttributes<HTMLDivElement>, "title" | "children">,
    CalloutContentProps {
  ref?: React.Ref<HTMLDivElement>;
  /** @default 'neutral' */
  tone?: Tone;
  /** 글 끝에 놓는 밑줄 링크(버튼) — children 이 글자다 */
  linkProps?: LinkProps;
}

/** 알림 상자 — 화면 안에서 알아 둘 것 · 조심할 것을 알린다. */
function Callout({
  className,
  tone,
  prefixIcon,
  title,
  description,
  linkProps,
  ...props
}: CalloutProps) {
  return (
    <div
      data-slot="callout"
      className={cn(calloutVariants({ tone }), className)}
      {...props}
    >
      <CalloutBody
        prefixIcon={prefixIcon}
        title={title}
        description={description}
        linkProps={linkProps}
      />
    </div>
  );
}

export interface ActionableCalloutProps
  extends
    Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, "title" | "children">,
    CalloutContentProps {
  ref?: React.Ref<HTMLButtonElement>;
  /** @default 'neutral' */
  tone?: Tone;
}

/** 통째로 누르는 알림 상자 — 끝에 '>' 가 붙는다. */
function ActionableCallout({
  ref,
  className,
  tone,
  prefixIcon,
  title,
  description,
  ...props
}: ActionableCalloutProps) {
  const { scaleFeedbackRef, scaleFeedbackClassName } = useScaleFeedback(ref);
  return (
    <button
      ref={scaleFeedbackRef}
      type="button"
      data-slot="callout"
      className={cn(
        scaleFeedbackClassName,
        calloutVariants({ tone }),
        actionableVariants({ tone }),
        className,
      )}
      {...props}
    >
      <CalloutBody
        prefixIcon={prefixIcon}
        title={title}
        description={description}
      />
      <SuffixIcon svg={<IconChevronRightLine />} />
    </button>
  );
}

export interface DismissibleCalloutProps extends CalloutProps {
  /** 보이는지(직접 다룰 때) */
  open?: boolean;
  /** @default true */
  defaultOpen?: boolean;
  /** 닫기를 눌렀을 때 */
  onDismiss?: () => void;
  /** 닫기(×) 버튼의 이름 */
  closeLabel?: string;
}

/** 닫을 수 있는 알림 상자 — 끝에 닫기(×) 버튼이 붙는다. */
function DismissibleCallout({
  className,
  tone,
  prefixIcon,
  title,
  description,
  linkProps,
  open: openProp,
  defaultOpen = true,
  onDismiss,
  closeLabel = "닫기",
  ...props
}: DismissibleCalloutProps) {
  const [openState, setOpenState] = React.useState(defaultOpen);
  const open = openProp ?? openState;
  const { scaleFeedbackRef, scaleFeedbackClassName } =
    useScaleFeedback<HTMLButtonElement>();

  if (!open) return null;

  return (
    <div
      data-slot="callout"
      className={cn(calloutVariants({ tone }), className)}
      {...props}
    >
      <CalloutBody
        prefixIcon={prefixIcon}
        title={title}
        description={description}
        linkProps={linkProps}
      />
      <button
        ref={scaleFeedbackRef}
        type="button"
        aria-label={closeLabel}
        data-slot="callout-close"
        className={cn(
          scaleFeedbackClassName,
          `flex size-x10 shrink-0 grow-0 cursor-pointer items-center
          justify-center rounded-r2 [border:none] bg-bg-transparent p-0`,
          // 누르는 자리는 40px 이지만 놓이는 자리는 아이콘(16px)만큼만 차지하게 바깥으로 당긴다
          "m-[calc((var(--dimension-x10)-var(--dimension-x4))*-0.5)]",
          "engaged:bg-bg-transparent-pressed pressed:scale-(--feedback-scale)",
          "[transition:background-color_var(--motion-duration-color-transition)_var(--motion-ease-easing),var(--feedback-scale-transition),outline-color_var(--motion-duration-d3)_var(--motion-ease-easing)]",
          `outline-solid outline-(length:--dimension-x0_5)
          outline-offset-(--dimension-x0_5) outline-transparent
          focused:outline-stroke-focus-ring`,
        )}
        onClick={() => {
          setOpenState(false);
          onDismiss?.();
        }}
      >
        <SuffixIcon svg={<IconXmarkLine />} />
      </button>
    </div>
  );
}

export { Callout, ActionableCallout, DismissibleCallout, calloutVariants };
