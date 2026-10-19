import * as React from "react";
import { cva } from "class-variance-authority";
import type { VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

// 입력 칸의 틀 — 이름표 줄 · 칸 · 아래 글(설명 · 오류 · 글자 수).
// 틀(Field)에 준 required · disabled · invalid · readOnly 가 이름표 · 칸 · 아래 글까지 내려간다(useFieldContext).
// Base UI 의 Field 는 쓰지 않았다 — readOnly · required 가 없고, 칸을 벗어나면 스스로 유효성을 따져 invalid 를 바꾼다(SEED 는 준 값만 본다).

/** 틀의 상태를 요소에 적는 속성 — 스타일이 이 속성을 본다. */
export interface FieldStateProps {
  "data-disabled"?: "";
  "data-invalid"?: "";
  "data-readonly"?: "";
}

export interface FieldContextValue {
  required: boolean;
  disabled: boolean;
  invalid: boolean;
  readOnly: boolean;
  name: string | undefined;
  /** 칸(input · textarea · 숨은 select)의 id — 이름표의 htmlFor 가 가리킨다 */
  controlId: string;
  labelId: string;
  descriptionId: string;
  errorMessageId: string;
  /** 이름표가 그려져 있을 때만 값이 있다 */
  labelledBy: string | undefined;
  /** 설명 · 오류 글 가운데 그려져 있는 것의 id */
  describedBy: string | undefined;
  stateProps: FieldStateProps;
  /** 이름표를 눌렀을 때 초점을 받을 칸이 따로 있으면 여기에 적는다 — 버튼으로 된 칸(선택 상자)은 htmlFor 로 이으면 눌린 것으로 쳐서 펼쳐진다 */
  focusControlRef: React.RefObject<(() => void) | null>;
  labelRef: React.RefCallback<HTMLElement>;
  descriptionRef: React.RefCallback<HTMLElement>;
  errorMessageRef: React.RefCallback<HTMLElement>;
}

const FieldContext = React.createContext<FieldContextValue | null>(null);

/** 틀 안이면 틀의 상태를, 밖이면 null 을 준다(칸은 틀 없이도 쓴다). */
function useFieldContext() {
  return React.useContext(FieldContext);
}

const flag = (on: boolean | undefined) => (on ? ("" as const) : undefined);

/** 받은 ref 와 안에서 쓰는 ref 를 같이 채운다. */
function useMergedRef<T>(
  ...refs: (React.Ref<T> | undefined)[]
): React.RefCallback<T> {
  const latest = React.useRef(refs);
  latest.current = refs;
  return React.useCallback((node: T | null) => {
    for (const ref of latest.current) {
      if (typeof ref === "function") ref(node);
      else if (ref) ref.current = node;
    }
  }, []);
}

export interface FieldProps extends React.HTMLAttributes<HTMLDivElement> {
  required?: boolean;
  disabled?: boolean;
  invalid?: boolean;
  readOnly?: boolean;
  /** 칸의 name — 폼으로 보낼 때의 이름 */
  name?: string;
  ref?: React.Ref<HTMLDivElement>;
}

function Field({
  required = false,
  disabled = false,
  invalid = false,
  readOnly = false,
  name,
  className,
  ...props
}: FieldProps) {
  const id = React.useId();
  // 이름표 · 설명 · 오류 글이 실제로 그려졌는지 — 그려진 것만 칸의 aria-labelledby · aria-describedby 에 넣는다.
  const [hasLabel, setHasLabel] = React.useState(false);
  const [hasDescription, setHasDescription] = React.useState(false);
  const [hasErrorMessage, setHasErrorMessage] = React.useState(false);
  const focusControlRef = React.useRef<(() => void) | null>(null);
  const labelRef = React.useCallback(
    (node: HTMLElement | null) => setHasLabel(!!node),
    [],
  );
  const descriptionRef = React.useCallback(
    (node: HTMLElement | null) => setHasDescription(!!node),
    [],
  );
  const errorMessageRef = React.useCallback(
    (node: HTMLElement | null) => setHasErrorMessage(!!node),
    [],
  );

  const context = React.useMemo<FieldContextValue>(() => {
    const describedBy = [
      hasDescription && `${id}description`,
      hasErrorMessage && `${id}error-message`,
    ]
      .filter(Boolean)
      .join(" ");
    return {
      required,
      disabled,
      invalid,
      readOnly,
      name,
      controlId: `${id}control`,
      labelId: `${id}label`,
      descriptionId: `${id}description`,
      errorMessageId: `${id}error-message`,
      labelledBy: hasLabel ? `${id}label` : undefined,
      describedBy: describedBy || undefined,
      stateProps: {
        "data-disabled": flag(disabled),
        "data-invalid": flag(invalid),
        "data-readonly": flag(readOnly),
      },
      focusControlRef,
      labelRef,
      descriptionRef,
      errorMessageRef,
    };
  }, [
    id,
    required,
    disabled,
    invalid,
    readOnly,
    name,
    hasLabel,
    hasDescription,
    hasErrorMessage,
    labelRef,
    descriptionRef,
    errorMessageRef,
  ]);

  return (
    <FieldContext.Provider value={context}>
      <div
        data-slot="field"
        {...context.stateProps}
        className={cn("relative flex w-full flex-col gap-x2", className)}
        {...props}
      />
    </FieldContext.Provider>
  );
}

function FieldHeader({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement> & { ref?: React.Ref<HTMLDivElement> }) {
  const field = useFieldContext();
  return (
    <div
      data-slot="field-header"
      {...field?.stateProps}
      className={cn(
        "flex items-center justify-between gap-x2.5 px-x0.5",
        className,
      )}
      {...props}
    />
  );
}

const fieldLabelVariants = cva("text-t5 text-fg-neutral", {
  variants: { weight: { medium: "font-medium", bold: "font-bold" } },
  defaultVariants: { weight: "medium" },
});

export interface FieldLabelProps
  extends
    React.LabelHTMLAttributes<HTMLLabelElement>,
    VariantProps<typeof fieldLabelVariants> {
  ref?: React.Ref<HTMLLabelElement>;
}

function FieldLabel({
  className,
  weight,
  ref,
  onClick,
  ...props
}: FieldLabelProps) {
  const field = useFieldContext();
  const mergedRef = useMergedRef(field?.labelRef, ref);
  return (
    <label
      ref={mergedRef}
      data-slot="field-label"
      id={field?.labelId}
      htmlFor={field?.controlId}
      {...field?.stateProps}
      className={cn(fieldLabelVariants({ weight }), className)}
      onClick={(event) => {
        onClick?.(event);
        const focusControl = field?.focusControlRef.current;
        if (!focusControl || event.defaultPrevented) return;
        event.preventDefault();
        focusControl();
      }}
      {...props}
    />
  );
}

// 글자 크기 한계(--font-size-limit-*)를 따라 늘고 주는 px 값 — SEED 가 필수 표시 · 보조 글의 치수에 쓴다.
const REQUIRED_INDICATOR_SIZE = cn(
  "size-[clamp(calc(6px*var(--font-size-limit-min)),0.375rem,calc(6px*var(--font-size-limit-max)))]",
  "mt-[clamp(calc(4px*var(--font-size-limit-min)),0.25rem,calc(4px*var(--font-size-limit-max)))]",
  "ml-[clamp(calc(2px*var(--font-size-limit-min)),0.125rem,calc(2px*var(--font-size-limit-max)))]",
);

/** 필수 표시(빨간 별) — 이름표 안, 글자 뒤에 놓는다. */
function FieldRequiredIndicator({
  className,
  ...props
}: React.SVGAttributes<SVGSVGElement>) {
  return (
    <svg
      aria-hidden
      data-slot="field-required-indicator"
      viewBox="0 0 6 6"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={cn(
        "inline align-top text-fg-critical",
        REQUIRED_INDICATOR_SIZE,
        className,
      )}
      {...props}
    >
      <path
        d="M3.75002 1.55859L4.41318 1.09468C4.75243 0.857361 5.21982 0.939865 5.45732 1.27899C5.69499 1.61836 5.61243 2.08615 5.27295 2.32366L4.30763 2.99902L5.27372 3.67612C5.61285 3.91381 5.69517 4.38137 5.45761 4.72059C5.21999 5.0599 4.7523 5.14233 4.41299 4.90471L3.75002 4.44043V5.25C3.75002 5.66421 3.41423 6 3.00002 6C2.5858 6 2.25002 5.66421 2.25002 5.25V4.44043L1.58704 4.90471C1.24773 5.14233 0.780041 5.0599 0.542418 4.72059C0.304856 4.38137 0.387176 3.91381 0.726309 3.67612L1.6924 2.99902L0.727079 2.32366C0.387603 2.08615 0.305043 1.61836 0.542707 1.27899C0.780206 0.939865 1.2476 0.857361 1.58685 1.09468L2.25002 1.55859V0.75C2.25002 0.335786 2.5858 0 3.00002 0C3.41423 0 3.75002 0.335786 3.75002 0.75V1.55859Z"
        fill="currentColor"
      />
    </svg>
  );
}

/** 이름표 옆의 보조 글('선택' 같은 것) — 이름표 안에 놓는다. */
function FieldIndicatorText({
  className,
  children,
  ...props
}: React.HTMLAttributes<HTMLSpanElement>) {
  const field = useFieldContext();
  return (
    <span
      data-slot="field-indicator-text"
      {...field?.stateProps}
      className={cn(
        `inline align-bottom text-t4 leading-t5 font-regular
        text-fg-neutral-subtle`,
        "pl-[clamp(calc(4px*var(--font-size-limit-min)),0.25rem,calc(4px*var(--font-size-limit-max)))]",
        className,
      )}
      {...props}
    >
      {/* 이름표 글과 붙어 읽히지 않게('액션 타입선택') 보이지 않는 띄어쓰기를 둔다. 글이 아니라 CSS 의 content 로 —
          읽는 이름에는 들어가고 화면의 글(textContent)은 그대로다(TagGroup 의 쉼표와 같다). */}
      <span
        data-slot="field-indicator-spoken-space"
        className="sr-only before:content-['_']"
      />
      {children}
    </span>
  );
}

function FieldFooter({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement> & { ref?: React.Ref<HTMLDivElement> }) {
  const field = useFieldContext();
  return (
    <div
      data-slot="field-footer"
      {...field?.stateProps}
      className={cn("flex items-start gap-x2 px-x0.5", className)}
      {...props}
    />
  );
}

// 설명 · 오류 글 앞에 PrefixIcon 을 놓으면 글 첫 줄의 가운데에 맞는다.
const MESSAGE_ICON = cn(
  "[--prefix-icon-size:var(--dimension-x4)] [--prefix-icon-margin-right:var(--dimension-x1_5)]",
  "[--prefix-icon-margin-top:calc((var(--line-height-t4)-var(--dimension-x4))/2)]",
);

export interface FieldDescriptionProps extends React.HTMLAttributes<HTMLSpanElement> {
  ref?: React.Ref<HTMLSpanElement>;
}

function FieldDescription({ className, ref, ...props }: FieldDescriptionProps) {
  const field = useFieldContext();
  const mergedRef = useMergedRef(field?.descriptionRef, ref);
  return (
    <span
      ref={mergedRef}
      data-slot="field-description"
      id={field?.descriptionId}
      {...field?.stateProps}
      className={cn(
        `flex text-t4 font-regular text-fg-neutral-subtle
        [--prefix-icon-color:var(--fg-neutral-subtle)]`,
        MESSAGE_ICON,
        className,
      )}
      {...props}
    />
  );
}

export interface FieldErrorMessageProps extends React.HTMLAttributes<HTMLDivElement> {
  ref?: React.Ref<HTMLDivElement>;
}

function FieldErrorMessage({
  className,
  ref,
  ...props
}: FieldErrorMessageProps) {
  const field = useFieldContext();
  const mergedRef = useMergedRef(field?.errorMessageRef, ref);
  return (
    <div
      ref={mergedRef}
      aria-live="polite"
      data-slot="field-error-message"
      id={field?.errorMessageId}
      {...field?.stateProps}
      className={cn(
        `flex text-t4 font-regular text-fg-critical
        [--prefix-icon-color:var(--fg-critical)]`,
        MESSAGE_ICON,
        className,
      )}
      {...props}
    />
  );
}

export interface FieldCharacterCountProps extends React.HTMLAttributes<HTMLDivElement> {
  /** 지금 글자 수 */
  current: number;
  /** 상한 */
  max: number;
  ref?: React.Ref<HTMLDivElement>;
}

/** '지금 글자 수/상한'. 빨갛게 바뀌는 것은 넘쳤을 때가 아니라 틀이 invalid 일 때다(SEED 와 같다 — 넘쳤다는 것은 쓰는 쪽이 invalid 로 알린다). */
function FieldCharacterCount({
  current,
  max,
  className,
  ...props
}: FieldCharacterCountProps) {
  const field = useFieldContext();
  return (
    <div
      data-slot="field-character-count"
      className={cn("ml-auto text-t4", className)}
      {...props}
    >
      <span
        data-slot="field-character-count-current"
        data-empty={flag(current === 0)}
        data-exceeded={flag(current > max)}
        {...field?.stateProps}
        className="text-t4 font-regular text-fg-neutral invalid:text-fg-critical
          [&[data-empty]:not(:invalid,[data-invalid])]:text-fg-neutral-subtle"
      >
        {current}
      </span>
      <span
        data-slot="field-character-count-max"
        {...field?.stateProps}
        className="text-t4 font-regular text-fg-neutral-subtle
          invalid:text-fg-critical"
      >
        /{max}
      </span>
    </div>
  );
}

export {
  Field,
  FieldHeader,
  FieldLabel,
  FieldRequiredIndicator,
  FieldIndicatorText,
  FieldFooter,
  FieldDescription,
  FieldErrorMessage,
  FieldCharacterCount,
  fieldLabelVariants,
  useFieldContext,
  useMergedRef,
};
