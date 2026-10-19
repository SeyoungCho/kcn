import * as React from "react";
import IconExclamationmarkCircleFill from "@karrotmarket/react-monochrome-icon/IconExclamationmarkCircleFill";
import IconXmarkCircleFill from "@karrotmarket/react-monochrome-icon/IconXmarkCircleFill";
import { cva } from "class-variance-authority";

import { PrefixIcon } from "@/components/ui/affix-icon";
import {
  Field,
  FieldDescription,
  FieldErrorMessage,
  FieldFooter,
  FieldHeader,
  FieldIndicatorText,
  FieldLabel,
  FieldRequiredIndicator,
  useFieldContext,
  useMergedRef,
} from "@/components/ui/field";
import type { FieldLabelProps } from "@/components/ui/field";
import { Icon } from "@/components/ui/icon";
import { useScaleFeedback } from "@/lib/use-scale-feedback";
import { cn } from "@/lib/utils";

// 입력 칸 모양의 버튼 — 누르면 고르는 창 · 시트를 연다. 고른 값은 FieldButtonValue 로, 고르기 전의 안내는 FieldButtonPlaceholder 로 보인다.
// 칸 상자(버튼)는 칸 뒤에 깔리고(-z-1), 앞뒤 글 · 아이콘 · 값은 그 위에 놓이되 누름은 버튼으로 흘려보낸다(pointer-events: none).
// 지우기 버튼만 따로 누른다. 틀(Field) 안에 놓으면 틀의 disabled · invalid · readOnly 를 따르고, 이름표를 누르면 버튼에 초점이 온다.

type Size = "large" | "medium";

interface FieldButtonContextValue {
  size: Size;
  stateProps: {
    "data-disabled"?: "";
    "data-readonly"?: "";
    "data-invalid"?: "";
  };
}

const FieldButtonContext = React.createContext<FieldButtonContextValue>({
  size: "large",
  stateProps: {},
});

const flag = (on: boolean | undefined) => (on ? ("" as const) : undefined);

const controlVariants = cva(
  "group/field-button relative isolate box-border flex w-full items-center",
  {
    variants: {
      size: {
        large: "h-x13 gap-x2.5 px-x4",
        medium: "h-x10 gap-x2 px-x3.5",
      },
    },
    defaultVariants: { size: "large" },
  },
);

// 칸 상자. 읽기 전용이면 누를 수 없게 disabled 를 주지만 모양은 읽기 전용이다 — 그래서 :disabled 가 아니라 data-disabled 속성으로 가린다.
// 마우스를 올린 바탕은 칸 전체(이름표 · 지우기 버튼 위 포함 — group/field-button)에서, 누르는 바탕(터치)은 버튼 자신에서 건다.
const buttonVariants = cva(
  [
    `absolute inset-0 -z-1 m-0 cursor-pointer border-none bg-bg-transparent p-0
    inset-ring inset-ring-stroke-neutral-weak`,
    "[transition:background-color_var(--motion-duration-color-transition)_var(--motion-ease-easing),outline-color_var(--motion-duration-d3)_var(--motion-ease-easing)]",
    `after:pointer-events-none after:absolute after:inset-0
    after:rounded-[inherit] after:border-2 after:border-solid
    after:border-transparent after:content-['']`,
    `after:transition-[border-color] after:duration-[0.1s] after:ease-easing
    invalid:after:border-stroke-critical-solid`,
    "data-disabled:cursor-not-allowed data-disabled:bg-bg-disabled",
    `not-data-disabled:data-readonly:cursor-default
    not-data-disabled:data-readonly:bg-bg-disabled`,
    `not-data-disabled:not-data-readonly:group-hovered/field-button:bg-bg-transparent-pressed
    not-data-disabled:not-data-readonly:engaged:bg-bg-transparent-pressed`,
    `outline-solid outline-(length:--dimension-x0_5)
    outline-offset-(--dimension-x0_5) outline-transparent
    focused:outline-stroke-focus-ring`,
  ],
  {
    variants: { size: { large: "rounded-r3", medium: "rounded-r2" } },
    defaultVariants: { size: "large" },
  },
);

const TEXT_SIZE: Record<Size, string> = { large: "text-t5", medium: "text-t4" };
const ICON_SIZE: Record<Size, string> = {
  large: "[--icon-size:var(--dimension-x5)]",
  medium: "[--icon-size:var(--dimension-x4)]",
};
const CLEAR_ICON_SIZE: Record<Size, string> = {
  large: "[--icon-size:22px]",
  medium: "[--icon-size:var(--dimension-x4_5)]",
};
const AFFIX_TEXT =
  "pointer-events-none font-regular text-fg-neutral-subtle data-disabled:text-fg-disabled";
const AFFIX_ICON =
  "pointer-events-none shrink-0 [--icon-color:var(--fg-neutral-muted)] data-disabled:[--icon-color:var(--fg-disabled)]";
const VALUE_TEXT =
  "pointer-events-none grow overflow-hidden font-regular text-ellipsis whitespace-nowrap";

export interface FieldButtonControlProps extends Omit<
  React.HTMLAttributes<HTMLDivElement>,
  "prefix"
> {
  /** 크기 — 기본 large */
  size?: Size;
  disabled?: boolean;
  invalid?: boolean;
  readOnly?: boolean;
  /** 폼으로 보낼 값 — 값마다 숨은 input 이 하나씩 붙는다. 안 주면 보내지 않는다 */
  values?: string[];
  /** 지우기 버튼을 누르면 [] 로 불린다 */
  onValuesChange?: (values: string[]) => void;
  /** 폼으로 보낼 때의 이름 */
  name?: string;
  prefixIcon?: React.ReactElement;
  prefix?: React.ReactNode;
  suffixIcon?: React.ReactElement;
  suffix?: React.ReactNode;
  /** 지우기 버튼 — disabled · readOnly 이면 보이지 않는다. onValuesChange 를 같이 준다 */
  showClearButton?: boolean;
  /** 지우기 버튼의 이름 */
  clearLabel?: string;
  /** 칸 상자(button)에 붙는 것 — onClick 과, 누르면 무엇이 열리는지 · 지금 값이 무엇인지 알려 주는 aria-label */
  buttonProps?: React.ButtonHTMLAttributes<HTMLButtonElement>;
  /** 칸 상자(button) */
  buttonRef?: React.Ref<HTMLButtonElement>;
  ref?: React.Ref<HTMLDivElement>;
}

/** 칸만 — 이름표 · 설명 없이 쓰거나, 직접 짠 틀(Field) 안에 놓을 때. */
function FieldButtonControl({
  size = "large",
  disabled: disabledProp = false,
  invalid: invalidProp = false,
  readOnly: readOnlyProp = false,
  values = [],
  onValuesChange,
  name,
  prefixIcon,
  prefix,
  suffixIcon,
  suffix,
  showClearButton,
  clearLabel = "지우기",
  buttonProps,
  buttonRef,
  className,
  children,
  ...props
}: FieldButtonControlProps) {
  const field = useFieldContext();
  const disabled = disabledProp || !!field?.disabled;
  const invalid = invalidProp || !!field?.invalid;
  const readOnly = readOnlyProp || !!field?.readOnly;
  const context = React.useMemo(
    () => ({
      size,
      stateProps: {
        "data-disabled": flag(disabled),
        "data-readonly": flag(readOnly),
        "data-invalid": flag(invalid),
      },
    }),
    [size, disabled, readOnly, invalid],
  );
  const { stateProps } = context;

  // 이름표를 누르면 버튼에 초점만 준다(누른 것으로 치지 않는다 — 고르는 창이 열리지 않게).
  const innerButtonRef = React.useRef<HTMLButtonElement | null>(null);
  const mergedButtonRef = useMergedRef(innerButtonRef, buttonRef);
  const focusControlRef = field?.focusControlRef;
  React.useEffect(() => {
    if (!focusControlRef) return undefined;
    const focus = () => innerButtonRef.current?.focus();
    focusControlRef.current = focus;
    return () => {
      if (focusControlRef.current === focus) focusControlRef.current = null;
    };
  }, [focusControlRef]);

  const { scaleFeedbackRef, scaleFeedbackClassName } =
    useScaleFeedback<HTMLButtonElement>();
  const fieldName = name ?? field?.name;

  return (
    <FieldButtonContext value={context}>
      <div
        data-slot="field-button"
        {...stateProps}
        className={cn(controlVariants({ size }), className)}
        {...props}
      >
        <button
          ref={mergedButtonRef}
          type="button"
          data-slot="field-button-button"
          id={field?.controlId}
          aria-describedby={field?.describedBy}
          aria-disabled={disabled || readOnly || undefined}
          aria-invalid={invalid || undefined}
          {...stateProps}
          {...buttonProps}
          disabled={disabled || readOnly}
          className={cn(buttonVariants({ size }), buttonProps?.className)}
        />
        {prefixIcon ? (
          <Icon
            svg={prefixIcon}
            data-slot="field-button-prefix-icon"
            {...stateProps}
            className={cn(AFFIX_ICON, ICON_SIZE[size])}
          />
        ) : null}
        {prefix ? (
          <span
            data-slot="field-button-prefix-text"
            aria-hidden
            {...stateProps}
            className={cn(AFFIX_TEXT, TEXT_SIZE[size])}
          >
            {prefix}
          </span>
        ) : null}
        {children}
        {showClearButton ? (
          <button
            ref={scaleFeedbackRef}
            type="button"
            data-slot="field-button-clear"
            aria-label={clearLabel}
            hidden={disabled || readOnly}
            disabled={disabled || readOnly}
            onClick={() => onValuesChange?.([])}
            className={cn(
              scaleFeedbackClassName,
              `m-0 cursor-pointer rounded-full border-none bg-transparent p-0
                [--icon-color:var(--fg-neutral-subtle)] [[hidden]]:hidden`,
              `pressed:scale-(--feedback-scale)
                [transition:var(--feedback-scale-transition),outline-color_var(--motion-duration-d3)_var(--motion-ease-easing)]`,
              `outline-solid outline-(length:--dimension-x0_5)
                outline-offset-(--dimension-x0_5) outline-transparent
                focused:outline-stroke-focus-ring`,
              CLEAR_ICON_SIZE[size],
            )}
          >
            <Icon svg={<IconXmarkCircleFill />} />
          </button>
        ) : null}
        {suffix ? (
          <span
            data-slot="field-button-suffix-text"
            aria-hidden
            {...stateProps}
            className={cn(AFFIX_TEXT, TEXT_SIZE[size])}
          >
            {suffix}
          </span>
        ) : null}
        {suffixIcon ? (
          <Icon
            svg={suffixIcon}
            data-slot="field-button-suffix-icon"
            {...stateProps}
            className={cn(AFFIX_ICON, ICON_SIZE[size])}
          />
        ) : null}
        {/* 읽기 전용은 값을 보내고, 못 쓰는 칸은 보내지 않는다 */}
        {values.map((value, index) => (
          <input
            key={index}
            type="hidden"
            name={fieldName}
            value={value}
            disabled={disabled}
          />
        ))}
      </div>
    </FieldButtonContext>
  );
}

/** 고른 값 — 화면에만 보인다(읽어 주는 이름은 buttonProps 의 aria-label 로 준다). */
function FieldButtonValue({
  className,
  ...props
}: React.ComponentProps<"div">) {
  const { size, stateProps } = React.useContext(FieldButtonContext);
  return (
    <div
      data-slot="field-button-value"
      aria-hidden
      {...stateProps}
      className={cn(
        VALUE_TEXT,
        TEXT_SIZE[size],
        "text-fg-neutral data-disabled:text-fg-disabled",
        className,
      )}
      {...props}
    />
  );
}

/** 고르기 전의 안내 글 — 화면에만 보인다. */
function FieldButtonPlaceholder({
  className,
  ...props
}: React.ComponentProps<"div">) {
  const { size, stateProps } = React.useContext(FieldButtonContext);
  return (
    <div
      data-slot="field-button-placeholder"
      aria-hidden
      {...stateProps}
      className={cn(
        VALUE_TEXT,
        TEXT_SIZE[size],
        "text-fg-placeholder data-disabled:text-fg-disabled",
        className,
      )}
      {...props}
    />
  );
}

// ── 이름표 · 설명 · 오류까지 한 번에 ───────────────────────────────────────────

export interface FieldButtonProps extends Omit<
  FieldButtonControlProps,
  "ref" | "buttonRef"
> {
  label?: React.ReactNode;
  /** 이름표의 굵기 — 기본 medium */
  labelWeight?: FieldLabelProps["weight"];
  /** 이름표 옆의 보조 글('선택' 같은 것) */
  indicator?: React.ReactNode;
  description?: React.ReactNode;
  /** invalid 일 때만 보인다 */
  errorMessage?: React.ReactNode;
  required?: boolean;
  showRequiredIndicator?: boolean;
  /** 틀(Field) 요소 */
  rootRef?: React.Ref<HTMLDivElement>;
  /** 칸 상자(button) */
  ref?: React.Ref<HTMLButtonElement>;
}

function FieldButton({
  label,
  labelWeight,
  indicator,
  description,
  errorMessage,
  required,
  showRequiredIndicator,
  rootRef,
  ref,
  disabled,
  invalid,
  readOnly,
  name,
  ...props
}: FieldButtonProps) {
  const showError = !!errorMessage && !!invalid;
  return (
    // 이름표 줄에 마우스를 올려도 칸 상자의 바탕이 바뀐다(group/field-button).
    <Field
      ref={rootRef}
      required={required}
      disabled={disabled}
      invalid={invalid}
      readOnly={readOnly}
      name={name}
      className="group/field-button"
    >
      {label || indicator ? (
        <FieldHeader>
          <FieldLabel weight={labelWeight}>
            {label}
            {showRequiredIndicator ? <FieldRequiredIndicator /> : null}
            {indicator ? (
              <FieldIndicatorText>{indicator}</FieldIndicatorText>
            ) : null}
          </FieldLabel>
        </FieldHeader>
      ) : null}
      <FieldButtonControl buttonRef={ref} {...props} />
      {description || showError ? (
        <FieldFooter>
          {/* 오류가 보이는 동안 설명은 화면에서만 감춘다(읽어 주는 기기에는 남긴다). */}
          {description ? (
            <FieldDescription className={showError ? "sr-only" : undefined}>
              {description}
            </FieldDescription>
          ) : null}
          {showError ? (
            <FieldErrorMessage>
              <PrefixIcon svg={<IconExclamationmarkCircleFill />} />
              {errorMessage}
            </FieldErrorMessage>
          ) : null}
        </FieldFooter>
      ) : null}
    </Field>
  );
}

export {
  FieldButton,
  FieldButtonControl,
  FieldButtonValue,
  FieldButtonPlaceholder,
};
