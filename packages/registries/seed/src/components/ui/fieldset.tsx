import type * as React from "react";
import IconExclamationmarkCircleFill from "@karrotmarket/react-monochrome-icon/IconExclamationmarkCircleFill";
import { cva } from "class-variance-authority";
import type { VariantProps } from "class-variance-authority";

import { Icon } from "@/components/ui/icon";
import { cn } from "@/lib/utils";

// 여러 선택지를 묶는 부품(체크박스 묶음 · 라디오 묶음)의 테두리 — 이름표 · 필수 표시 · 설명 · 오류 글.
// SEED 의 field · field-label 레시피를 옮긴 것이라 입력 칸의 field 와 모양이 같다.

const fieldsetLabelVariants = cva("text-t5 text-fg-neutral", {
  variants: { weight: { medium: "font-medium", bold: "font-bold" } },
  defaultVariants: { weight: "medium" },
});

// 글자 크기 한계(--font-size-limit-*)를 따라 늘고 주는 px 값 — SEED 가 필수 표시 · 보조 글의 치수에 쓴다.
const REQUIRED_INDICATOR_CLASS = cn(
  "inline align-top text-fg-critical",
  "size-[clamp(calc(6px*var(--font-size-limit-min)),0.375rem,calc(6px*var(--font-size-limit-max)))]",
  "mt-[clamp(calc(4px*var(--font-size-limit-min)),0.25rem,calc(4px*var(--font-size-limit-max)))]",
  "ml-[clamp(calc(2px*var(--font-size-limit-min)),0.125rem,calc(2px*var(--font-size-limit-max)))]",
);

function Fieldset({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      data-slot="fieldset"
      className={cn("relative flex w-full flex-col gap-x2", className)}
      {...props}
    />
  );
}

function FieldsetHeader({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      data-slot="fieldset-header"
      className={cn(
        "flex items-center justify-between gap-x2.5 px-x0.5",
        className,
      )}
      {...props}
    />
  );
}

export interface FieldsetLabelProps
  extends
    React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof fieldsetLabelVariants> {}

function FieldsetLabel({ className, weight, ...props }: FieldsetLabelProps) {
  return (
    <div
      data-slot="fieldset-label"
      className={cn(fieldsetLabelVariants({ weight }), className)}
      {...props}
    />
  );
}

function FieldsetRequiredIndicator({
  className,
  ...props
}: React.SVGAttributes<SVGSVGElement>) {
  return (
    <svg
      aria-hidden
      data-slot="fieldset-required-indicator"
      viewBox="0 0 6 6"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={cn(REQUIRED_INDICATOR_CLASS, className)}
      {...props}
    >
      <path
        d="M3.75002 1.55859L4.41318 1.09468C4.75243 0.857361 5.21982 0.939865 5.45732 1.27899C5.69499 1.61836 5.61243 2.08615 5.27295 2.32366L4.30763 2.99902L5.27372 3.67612C5.61285 3.91381 5.69517 4.38137 5.45761 4.72059C5.21999 5.0599 4.7523 5.14233 4.41299 4.90471L3.75002 4.44043V5.25C3.75002 5.66421 3.41423 6 3.00002 6C2.5858 6 2.25002 5.66421 2.25002 5.25V4.44043L1.58704 4.90471C1.24773 5.14233 0.780041 5.0599 0.542418 4.72059C0.304856 4.38137 0.387176 3.91381 0.726309 3.67612L1.6924 2.99902L0.727079 2.32366C0.387603 2.08615 0.305043 1.61836 0.542707 1.27899C0.780206 0.939865 1.2476 0.857361 1.58685 1.09468L2.25002 1.55859V0.75C2.25002 0.335786 2.5858 0 3.00002 0C3.41423 0 3.75002 0.335786 3.75002 0.75V1.55859Z"
        fill="currentColor"
      />
    </svg>
  );
}

function FieldsetIndicatorText({
  className,
  ...props
}: React.HTMLAttributes<HTMLSpanElement>) {
  return (
    <span
      data-slot="fieldset-indicator-text"
      className={cn(
        `inline align-bottom text-t4 leading-t5 font-regular
        text-fg-neutral-subtle`,
        "pl-[clamp(calc(4px*var(--font-size-limit-min)),0.25rem,calc(4px*var(--font-size-limit-max)))]",
        className,
      )}
      {...props}
    />
  );
}

function FieldsetFooter({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      data-slot="fieldset-footer"
      className={cn("flex items-start gap-x2 px-x0.5", className)}
      {...props}
    />
  );
}

function FieldsetDescription({
  className,
  ...props
}: React.HTMLAttributes<HTMLSpanElement>) {
  return (
    <span
      data-slot="fieldset-description"
      className={cn(
        "flex text-t4 font-regular text-fg-neutral-subtle",
        className,
      )}
      {...props}
    />
  );
}

function FieldsetErrorMessage({
  className,
  children,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      aria-live="polite"
      data-slot="fieldset-error-message"
      className={cn("flex text-t4 font-regular text-fg-critical", className)}
      {...props}
    >
      <Icon
        svg={<IconExclamationmarkCircleFill />}
        size="x4"
        className="mt-[calc((var(--line-height-t4)-var(--dimension-x4))/2)]
          mr-x1.5"
      />
      {children}
    </div>
  );
}

export interface FieldsetChromeProps {
  label?: React.ReactNode;
  /** 이름표의 굵기 — 기본은 medium */
  labelWeight?: FieldsetLabelProps["weight"];
  /** 이름표 옆의 보조 글('선택' 같은 것) */
  indicator?: React.ReactNode;
  showRequiredIndicator?: boolean;
  description?: React.ReactNode;
  errorMessage?: React.ReactNode;
}

/** 묶음의 이름표 줄 — 이름표도 보조 글도 없으면 그리지 않는다. */
function FieldsetHeading({
  id,
  label,
  labelWeight,
  indicator,
  showRequiredIndicator,
}: Pick<
  FieldsetChromeProps,
  "label" | "labelWeight" | "indicator" | "showRequiredIndicator"
> & { id: string }) {
  if (!label && !indicator) return null;
  return (
    <FieldsetHeader>
      <FieldsetLabel id={id} weight={labelWeight}>
        {label}
        {showRequiredIndicator ? <FieldsetRequiredIndicator /> : null}
        {indicator ? (
          <FieldsetIndicatorText>{indicator}</FieldsetIndicatorText>
        ) : null}
      </FieldsetLabel>
    </FieldsetHeader>
  );
}

/** 묶음 아래의 설명 · 오류 글 — 오류가 보이는 동안 설명은 화면에서만 감춘다(읽어 주는 기기에는 남긴다). */
function FieldsetMessages({
  descriptionId,
  errorMessageId,
  description,
  errorMessage,
}: Pick<FieldsetChromeProps, "description" | "errorMessage"> & {
  descriptionId: string;
  errorMessageId: string;
}) {
  if (!description && !errorMessage) return null;
  return (
    <FieldsetFooter>
      {description ? (
        <FieldsetDescription
          id={descriptionId}
          className={errorMessage ? "sr-only" : undefined}
        >
          {description}
        </FieldsetDescription>
      ) : null}
      {errorMessage ? (
        <FieldsetErrorMessage id={errorMessageId}>
          {errorMessage}
        </FieldsetErrorMessage>
      ) : null}
    </FieldsetFooter>
  );
}

export {
  Fieldset,
  FieldsetHeader,
  FieldsetLabel,
  FieldsetRequiredIndicator,
  FieldsetIndicatorText,
  FieldsetFooter,
  FieldsetDescription,
  FieldsetErrorMessage,
  FieldsetHeading,
  FieldsetMessages,
  fieldsetLabelVariants,
};
