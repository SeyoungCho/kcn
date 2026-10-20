"use client";

import * as React from "react";
import IconExclamationmarkCircleFill from "@karrotmarket/react-monochrome-icon/IconExclamationmarkCircleFill";
import { cva } from "class-variance-authority";

import { PrefixIcon } from "@/components/ui/affix-icon";
import {
  Field,
  FieldCharacterCount,
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
import { cn } from "@/lib/utils";

// 글자를 적는 칸 — 테두리 상자(TextFieldRoot) 안에 앞뒤 아이콘 · 글자와 input · textarea 를 놓는다.
// 이름표 · 설명 · 오류 · 글자 수까지 한 번에 놓는 것이 TextField 다.

type Variant = "outline" | "underline";
type Size = "large" | "medium";

// 초점 · 오류의 굵은 테두리는 ::after 로 그린다(상자의 크기가 바뀌지 않게). 오류가 초점보다 앞선다.
const rootVariants = cva(
  [
    "relative flex w-full items-center overflow-hidden",
    `after:pointer-events-none after:absolute after:inset-0
    after:rounded-[inherit] after:border-transparent after:content-['']`,
    "after:transition-[border-color] after:duration-[0.1s] after:ease-easing",
  ],
  {
    variants: {
      variant: {
        outline: [
          "inset-ring inset-ring-stroke-neutral-weak after:border-2",
          "[&:not([data-readonly],[data-invalid],:invalid):is(:focus,[data-focus])]:after:border-stroke-neutral-contrast",
          "invalid:after:border-stroke-critical-solid",
          "data-disabled:bg-bg-disabled data-readonly:bg-bg-disabled",
        ],
        underline: [
          `shadow-[inset_0_-1px_0_0_var(--stroke-neutral-weak)]
          after:border-b-2`,
          "[&:not([data-readonly],[data-invalid],:invalid):is(:focus,[data-focus])]:after:border-b-stroke-neutral-contrast",
          "invalid:after:border-b-stroke-critical-solid",
        ],
      },
      size: { large: "", medium: "" },
    },
    compoundVariants: [
      {
        variant: "outline",
        size: "large",
        className: "min-h-x13 gap-x2.5 rounded-r3",
      },
      {
        variant: "outline",
        size: "medium",
        className: "min-h-x10 gap-x2 rounded-r2",
      },
      {
        variant: "underline",
        size: "large",
        className: "min-h-x10 gap-x2.5 py-x2",
      },
      {
        variant: "underline",
        size: "medium",
        className: "min-h-8.5 gap-x2 py-x1.5",
      },
    ],
    defaultVariants: { variant: "outline", size: "large" },
  },
);

// 변형 × 크기마다 달라지는 값 — 글자 크기, 아이콘 크기, 맨 앞 · 맨 뒤에 놓였을 때의 여백.
const PARTS: Record<
  Variant,
  Record<
    Size,
    {
      text: string;
      icon: string;
      start: string;
      end: string;
      padStart: string;
      padEnd: string;
    }
  >
> = {
  outline: {
    large: {
      text: "text-t5",
      icon: "[--icon-size:var(--dimension-x5)]",
      start: "first:ml-x4",
      end: "last:mr-x4",
      padStart: "first:pl-x4",
      padEnd: "last:pr-x4",
    },
    medium: {
      text: "text-t4",
      icon: "[--icon-size:var(--dimension-x4)]",
      start: "first:ml-x3.5",
      end: "last:mr-x3.5",
      padStart: "first:pl-x3.5",
      padEnd: "last:pr-x3.5",
    },
  },
  underline: {
    large: {
      text: "text-t6",
      icon: "[--icon-size:var(--dimension-x6)]",
      start: "",
      end: "",
      padStart: "",
      padEnd: "",
    },
    medium: {
      text: "text-t5",
      icon: "[--icon-size:var(--dimension-x5)]",
      start: "",
      end: "",
      padStart: "",
      padEnd: "",
    },
  },
};

const VALUE = cn(
  "box-border grow resize-none self-stretch border-0 border-none bg-transparent px-0 font-regular text-fg-neutral outline-none",
  "font-[inherit] [font-style:inherit]",
  "placeholder:font-regular placeholder:text-fg-placeholder",
  "autofill:bg-clip-text autofill:[-webkit-text-fill-color:var(--fg-neutral)]",
  "data-disabled:cursor-not-allowed data-disabled:text-fg-disabled data-disabled:placeholder:text-fg-disabled",
);
// 밑줄 변형은 읽기 전용일 때 글자를 흐리게 한다(테두리 변형은 바탕색으로 알린다).
const UNDERLINE_READONLY =
  "[&[data-readonly]:not([data-disabled])]:text-fg-neutral-muted [&[data-readonly]:not([data-disabled])]:placeholder:text-fg-neutral-muted";
const TEXTAREA: Record<Size, string> = {
  large: "min-h-23.5 py-x3.5",
  medium: "min-h-20.5 py-x3",
};
const AFFIX_TEXT =
  "font-regular text-fg-neutral-subtle data-disabled:text-fg-disabled";
const AFFIX_ICON =
  "shrink-0 [--icon-color:var(--fg-neutral-muted)] data-disabled:[--icon-color:var(--fg-disabled)]";

interface TextFieldStateProps {
  "data-disabled"?: "";
  "data-invalid"?: "";
  "data-readonly"?: "";
  "data-focus"?: "";
  "data-empty"?: "";
}

interface TextFieldContextValue {
  variant: Variant;
  size: Size;
  value: string;
  controlled: boolean;
  defaultValue: string | undefined;
  disabled: boolean;
  readOnly: boolean;
  invalid: boolean;
  required: boolean;
  name: string | undefined;
  stateProps: TextFieldStateProps;
  setValue: (value: string) => void;
  setFocused: (focused: boolean) => void;
}

const TextFieldContext = React.createContext<TextFieldContextValue | null>(
  null,
);

function useTextFieldContext() {
  const context = React.useContext(TextFieldContext);
  if (!context)
    throw new Error(
      "TextField 의 부품은 TextFieldRoot(또는 TextField) 안에서 쓴다.",
    );
  return context;
}

const flag = (on: boolean | undefined) => (on ? ("" as const) : undefined);

export interface TextFieldRootProps extends Omit<
  React.HTMLAttributes<HTMLDivElement>,
  "defaultValue" | "onChange"
> {
  /** 모양 — 기본은 outline */
  variant?: Variant;
  /** 크기 — 기본은 large */
  size?: Size;
  value?: string;
  defaultValue?: string;
  onValueChange?: (value: string) => void;
  required?: boolean;
  disabled?: boolean;
  readOnly?: boolean;
  invalid?: boolean;
  name?: string;
  ref?: React.Ref<HTMLDivElement>;
}

/** 칸의 테두리 상자. 틀(Field) 안에 있으면 틀의 disabled · invalid · readOnly · required 도 같이 따른다. */
function TextFieldRoot({
  variant = "outline",
  size = "large",
  value: valueProp,
  defaultValue,
  onValueChange,
  required: requiredProp = false,
  disabled: disabledProp = false,
  readOnly: readOnlyProp = false,
  invalid: invalidProp = false,
  name,
  className,
  ...props
}: TextFieldRootProps) {
  const field = useFieldContext();
  const disabled = disabledProp || !!field?.disabled;
  const readOnly = readOnlyProp || !!field?.readOnly;
  const invalid = invalidProp || !!field?.invalid;
  const required = requiredProp || !!field?.required;

  const controlled = valueProp !== undefined;
  const [inner, setInner] = React.useState(defaultValue ?? "");
  const value = controlled ? valueProp : inner;
  const [focused, setFocused] = React.useState(false);

  const onValueChangeRef = React.useRef(onValueChange);
  onValueChangeRef.current = onValueChange;
  const setValue = React.useCallback(
    (next: string) => {
      if (!controlled) setInner(next);
      onValueChangeRef.current?.(next);
    },
    [controlled],
  );

  const context = React.useMemo<TextFieldContextValue>(
    () => ({
      variant,
      size,
      value,
      controlled,
      defaultValue,
      disabled,
      readOnly,
      invalid,
      required,
      name: name ?? field?.name,
      stateProps: {
        "data-disabled": flag(disabled),
        "data-invalid": flag(invalid),
        "data-readonly": flag(readOnly),
        "data-focus": flag(focused),
        "data-empty": flag(value === ""),
      },
      setValue,
      setFocused,
    }),
    [
      variant,
      size,
      value,
      controlled,
      defaultValue,
      disabled,
      readOnly,
      invalid,
      required,
      name,
      field?.name,
      focused,
      setValue,
    ],
  );

  return (
    <TextFieldContext.Provider value={context}>
      <div
        data-slot="text-field"
        {...context.stateProps}
        className={cn(rootVariants({ variant, size }), className)}
        {...props}
      />
    </TextFieldContext.Provider>
  );
}

/** input · textarea 가 같이 받는 것 — 값 · 상태 · 틀과 잇는 속성. */
function useControlProps<T extends HTMLInputElement | HTMLTextAreaElement>({
  onChange,
  onFocus,
  onBlur,
}: Pick<React.DOMAttributes<T>, "onChange" | "onFocus" | "onBlur">) {
  const context = useTextFieldContext();
  const field = useFieldContext();
  const { setValue, setFocused } = context;
  return {
    ...context.stateProps,
    id: field?.controlId,
    name: context.name,
    disabled: context.disabled,
    readOnly: context.readOnly,
    "aria-labelledby": field?.labelledBy,
    "aria-describedby": field?.describedBy,
    "aria-required": context.required || undefined,
    "aria-invalid": context.invalid || undefined,
    ...(context.controlled
      ? { value: context.value }
      : { defaultValue: context.defaultValue }),
    onChange: (event: React.ChangeEvent<T>) => {
      onChange?.(event);
      setValue(event.target.value);
    },
    onFocus: (event: React.FocusEvent<T>) => {
      onFocus?.(event);
      setFocused(true);
    },
    onBlur: (event: React.FocusEvent<T>) => {
      onBlur?.(event);
      setFocused(false);
    },
  };
}

export interface TextFieldInputProps extends Omit<
  React.InputHTMLAttributes<HTMLInputElement>,
  "size" | "value" | "defaultValue"
> {
  ref?: React.Ref<HTMLInputElement>;
}

function TextFieldInput({
  className,
  onChange,
  onFocus,
  onBlur,
  ...props
}: TextFieldInputProps) {
  const { variant, size } = useTextFieldContext();
  const control = useControlProps<HTMLInputElement>({
    onChange,
    onFocus,
    onBlur,
  });
  const part = PARTS[variant][size];
  return (
    <input
      data-slot="text-field-input"
      {...control}
      // 폭 0 에서 늘어난다 — 안 그러면 input 의 기본 폭이 상자를 밀어낸다.
      className={cn(
        VALUE,
        "w-0",
        part.text,
        part.padStart,
        part.padEnd,
        variant === "underline" && UNDERLINE_READONLY,
        className,
      )}
      {...props}
    />
  );
}

export interface TextFieldTextareaProps extends Omit<
  React.TextareaHTMLAttributes<HTMLTextAreaElement>,
  "value" | "defaultValue"
> {
  /** 처음 보이는 줄 수 */
  rows?: number;
  /** 적은 글에 맞춰 높이가 늘어난다 — 기본은 켬. style.height 를 주면 늘어나지 않는다 */
  autoresize?: boolean;
  ref?: React.Ref<HTMLTextAreaElement>;
}

function TextFieldTextarea({
  className,
  autoresize = true,
  onChange,
  onFocus,
  onBlur,
  ref,
  ...props
}: TextFieldTextareaProps) {
  const { variant, size, value } = useTextFieldContext();
  const control = useControlProps<HTMLTextAreaElement>({
    onChange,
    onFocus,
    onBlur,
  });
  const part = PARTS[variant][size];
  const innerRef = React.useRef<HTMLTextAreaElement | null>(null);
  const mergedRef = useMergedRef(innerRef, ref);
  const fixedHeight = props.style?.height;

  // 글이 바뀔 때마다 높이를 내용만큼으로 맞춘다. rows 로 정한 높이보다 줄지는 않는다(scrollHeight 가 보이는 높이보다 작아지지 않는다).
  React.useLayoutEffect(() => {
    const textarea = innerRef.current;
    if (!textarea || !autoresize || fixedHeight) return;
    const { alignSelf, overflow } = textarea.style;
    // Firefox 는 overflow 를 숨겼다 풀면 스크롤 위치를 잃고 높이도 틀리게 잰다.
    if (!("MozAppearance" in textarea.style))
      textarea.style.overflow = "hidden";
    textarea.style.alignSelf = "start";
    textarea.style.height = "auto";
    textarea.style.height = `${textarea.scrollHeight + (textarea.offsetHeight - textarea.clientHeight)}px`;
    textarea.style.overflow = overflow;
    textarea.style.alignSelf = alignSelf;
  }, [autoresize, fixedHeight, value]);

  return (
    <textarea
      ref={mergedRef}
      data-slot="text-field-textarea"
      {...control}
      className={cn(
        VALUE,
        TEXTAREA[size],
        part.text,
        part.padStart,
        part.padEnd,
        variant === "underline" && UNDERLINE_READONLY,
        className,
      )}
      {...props}
    />
  );
}

export interface TextFieldAffixIconProps extends Omit<
  React.SVGAttributes<SVGSVGElement>,
  "color"
> {
  /** 그릴 아이콘 — `<IconMagnifyingglassLine />` 처럼 요소로 준다 */
  svg: React.ReactElement;
}

function TextFieldPrefixIcon({
  svg,
  className,
  ...props
}: TextFieldAffixIconProps) {
  const { variant, size, stateProps } = useTextFieldContext();
  const part = PARTS[variant][size];
  return (
    <Icon
      svg={svg}
      data-slot="text-field-prefix-icon"
      {...stateProps}
      className={cn(AFFIX_ICON, part.icon, part.start, className)}
      {...props}
    />
  );
}

function TextFieldSuffixIcon({
  svg,
  className,
  ...props
}: TextFieldAffixIconProps) {
  const { variant, size, stateProps } = useTextFieldContext();
  const part = PARTS[variant][size];
  return (
    <Icon
      svg={svg}
      data-slot="text-field-suffix-icon"
      {...stateProps}
      className={cn(AFFIX_ICON, part.icon, part.end, className)}
      {...props}
    />
  );
}

function TextFieldPrefixText({
  className,
  ...props
}: React.HTMLAttributes<HTMLSpanElement>) {
  const { variant, size, stateProps } = useTextFieldContext();
  const part = PARTS[variant][size];
  return (
    <span
      data-slot="text-field-prefix-text"
      {...stateProps}
      className={cn(AFFIX_TEXT, part.text, part.start, className)}
      {...props}
    />
  );
}

function TextFieldSuffixText({
  className,
  ...props
}: React.HTMLAttributes<HTMLSpanElement>) {
  const { variant, size, stateProps } = useTextFieldContext();
  const part = PARTS[variant][size];
  return (
    <span
      data-slot="text-field-suffix-text"
      {...stateProps}
      className={cn(AFFIX_TEXT, part.text, part.end, className)}
      {...props}
    />
  );
}

// ── 글자 수 ───────────────────────────────────────────────────────────────────

// 눈에 보이는 글자 단위로 센다 — 이모지 · 받침 조합이 여러 글자로 세어지지 않게.
const segmenter =
  typeof Intl !== "undefined" && "Segmenter" in Intl
    ? new Intl.Segmenter(undefined, { granularity: "grapheme" })
    : null;
const toGraphemes = (text: string) =>
  segmenter
    ? Array.from(segmenter.segment(text), (item) => item.segment)
    : Array.from(text);

export interface TextFieldValueChangeDetails {
  /** 적힌 그대로 */
  value: string;
  graphemes: string[];
  /** 상한(maxGraphemeCount)에서 자른 값 — 상한이 없으면 value 와 같다 */
  slicedValue: string;
  slicedGraphemes: string[];
}

export interface UseTextFieldWithGraphemesParams {
  maxGraphemeCount?: number;
  value?: string;
  defaultValue?: string;
  onValueChange?: (details: TextFieldValueChangeDetails) => void;
}

/** 값을 글자 단위로 세어, 칸에 넘길 것(textFieldRootProps)과 글자 수 표시에 넘길 것(counterProps)을 준다. 값을 자르지는 않는다 — 자른 값은 slicedValue 로 알려 줄 뿐이다. */
function useTextFieldWithGraphemes({
  maxGraphemeCount,
  value: valueProp,
  defaultValue = "",
  onValueChange,
}: UseTextFieldWithGraphemesParams) {
  const [inner, setInner] = React.useState(defaultValue);
  const controlled = valueProp !== undefined;
  const value = controlled ? valueProp : inner;
  const graphemes = React.useMemo(() => toGraphemes(value), [value]);

  const handleValueChange = React.useCallback(
    (next: string) => {
      const nextGraphemes = toGraphemes(next);
      const slicedGraphemes =
        maxGraphemeCount === undefined
          ? nextGraphemes
          : nextGraphemes.slice(0, maxGraphemeCount);
      if (!controlled) setInner(next);
      onValueChange?.({
        value: next,
        graphemes: nextGraphemes,
        slicedValue: slicedGraphemes.join(""),
        slicedGraphemes,
      });
    },
    [controlled, maxGraphemeCount, onValueChange],
  );

  return {
    textFieldRootProps: { value, onValueChange: handleValueChange },
    counterProps: { current: graphemes.length, max: maxGraphemeCount ?? 0 },
    graphemes,
  };
}

// ── 이름표 · 설명 · 오류 · 글자 수까지 한 번에 ─────────────────────────────────

export interface TextFieldProps extends Omit<
  TextFieldRootProps,
  "prefix" | "onValueChange"
> {
  label?: React.ReactNode;
  /** 이름표의 굵기 — 기본은 medium */
  labelWeight?: FieldLabelProps["weight"];
  /** 이름표 옆의 보조 글('선택' 같은 것) */
  indicator?: React.ReactNode;
  /** 이름표 줄 오른쪽에 놓는 것 */
  headerSuffix?: React.ReactNode;
  prefixIcon?: React.ReactElement;
  prefix?: React.ReactNode;
  suffixIcon?: React.ReactElement;
  suffix?: React.ReactNode;
  description?: React.ReactNode;
  /** invalid 일 때만 보인다 */
  errorMessage?: React.ReactNode;
  hideCharacterCount?: boolean;
  /** 주면 칸 아래에 '지금 글자 수/상한'이 나온다 */
  maxGraphemeCount?: number;
  showRequiredIndicator?: boolean;
  fieldRef?: React.Ref<HTMLDivElement>;
  onValueChange?: (details: TextFieldValueChangeDetails) => void;
}

function TextField({
  prefix,
  prefixIcon,
  suffix,
  suffixIcon,
  label,
  labelWeight,
  indicator,
  headerSuffix,
  description,
  errorMessage,
  hideCharacterCount,
  children,
  required,
  disabled,
  invalid,
  readOnly,
  name,
  showRequiredIndicator,
  value,
  defaultValue,
  onValueChange,
  maxGraphemeCount,
  fieldRef,
  ...props
}: TextFieldProps) {
  const { textFieldRootProps, counterProps } = useTextFieldWithGraphemes({
    value,
    defaultValue,
    onValueChange,
    maxGraphemeCount,
  });
  const showError = !!errorMessage && !!invalid;
  const showCount = !hideCharacterCount && maxGraphemeCount !== undefined;

  return (
    <Field
      ref={fieldRef}
      required={required}
      disabled={disabled}
      invalid={invalid}
      readOnly={readOnly}
      name={name}
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
          {headerSuffix}
        </FieldHeader>
      ) : null}
      <TextFieldRoot {...props} {...textFieldRootProps}>
        {prefixIcon ? <TextFieldPrefixIcon svg={prefixIcon} /> : null}
        {prefix ? <TextFieldPrefixText>{prefix}</TextFieldPrefixText> : null}
        {children}
        {suffix ? <TextFieldSuffixText>{suffix}</TextFieldSuffixText> : null}
        {suffixIcon ? <TextFieldSuffixIcon svg={suffixIcon} /> : null}
      </TextFieldRoot>
      {description || showError || showCount ? (
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
          {showCount ? <FieldCharacterCount {...counterProps} /> : null}
        </FieldFooter>
      ) : null}
    </Field>
  );
}

export {
  TextField,
  TextFieldRoot,
  TextFieldInput,
  TextFieldTextarea,
  TextFieldPrefixIcon,
  TextFieldPrefixText,
  TextFieldSuffixIcon,
  TextFieldSuffixText,
  useTextFieldWithGraphemes,
};
