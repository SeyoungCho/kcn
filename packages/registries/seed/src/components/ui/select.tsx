import * as React from "react";
import { Select as SelectPrimitive } from "@base-ui/react/select";
import IconCheckmarkFatFill from "@karrotmarket/react-monochrome-icon/IconCheckmarkFatFill";
import IconChevronDownSmallLine from "@karrotmarket/react-monochrome-icon/IconChevronDownSmallLine";
import IconExclamationmarkCircleFill from "@karrotmarket/react-monochrome-icon/IconExclamationmarkCircleFill";
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
} from "@/components/ui/field";
import type { FieldLabelProps } from "@/components/ui/field";
import { Icon } from "@/components/ui/icon";
import { openOnRelease } from "@/lib/open-on-release";
import { useScaleFeedback } from "@/lib/use-scale-feedback";
import { cn } from "@/lib/utils";

// 선택 상자 — 누르면 아래로 목록이 펼쳐지고 하나(또는 여럿)를 고른다.
// 값은 늘 배열로 주고받는다(하나만 고를 때도 [값], 안 골랐으면 []).

type Size = "large" | "medium";
type Side = "top" | "right" | "bottom" | "left";
type Align = "start" | "center" | "end";
export type SelectPlacement = Side | `${Side}-start` | `${Side}-end`;

interface SelectOption {
  /** 버튼에 보일 글 */
  textValue: string;
  icon: React.ReactElement | undefined;
}

interface SelectContextValue {
  size: Size;
  open: boolean;
  value: string[];
  disabled: boolean;
  readOnly: boolean;
  invalid: boolean;
  side: Side;
  align: Align;
  gutter: number;
  overflowPadding: number;
  /** 선택지 — 버튼이 고른 것의 글 · 아이콘을 여기서 찾는다 */
  options: ReadonlyMap<string, SelectOption>;
  registerOption: (value: string, option: SelectOption) => () => void;
  /** 가리킨 줄의 바탕을 보일지 — 아래 Select 의 armed 를 본다 */
  armed: boolean;
  arm: () => void;
}

const SelectContext = React.createContext<SelectContextValue | null>(null);

function useSelectContext() {
  const context = React.useContext(SelectContext);
  if (!context)
    throw new Error("Select 의 부품은 Select(또는 SelectRoot) 안에서 쓴다.");
  return context;
}

const flag = (on: boolean | undefined) => (on ? ("" as const) : undefined);

const sameOption = (a: SelectOption | undefined, b: SelectOption) =>
  !!a && a.textValue === b.textValue && a.icon?.type === b.icon?.type;
const sameOptions = (
  a: ReadonlyMap<string, SelectOption>,
  b: ReadonlyMap<string, SelectOption>,
) =>
  a.size === b.size &&
  [...b].every(([key, option]) => sameOption(a.get(key), option));

const toTextValue = ({
  textValue,
  label,
  value,
}: Pick<SelectItemProps, "textValue" | "label" | "value">) =>
  textValue ?? (typeof label === "string" ? label : value);

// 목록은 펼칠 때에야 그려지므로, 닫혀 있는 동안 버튼에 보일 글은 자식으로 적힌 SelectItem 의 props 에서 읽는다.
// 다른 부품으로 감싼 SelectItem 은 여기서 보이지 않는다 — 그런 것은 한 번 펼쳐진 뒤에 스스로 적어 넣는다(registerOption).
function collectOptions(
  children: React.ReactNode,
  into: Map<string, SelectOption>,
) {
  React.Children.forEach(children, (child) => {
    if (!React.isValidElement(child)) return;
    if (child.type === SelectItem) {
      const props = child.props as SelectItemProps;
      into.set(props.value, {
        textValue: toTextValue(props),
        icon: props.prefixIcon,
      });
      return;
    }
    collectOptions(
      (child.props as { children?: React.ReactNode }).children,
      into,
    );
  });
  return into;
}

// ── 뿌리 ─────────────────────────────────────────────────────────────────────

export interface SelectProps {
  children?: React.ReactNode;
  /** 크기 — 기본은 large */
  size?: Size;
  open?: boolean;
  defaultOpen?: boolean;
  onOpenChange?: (open: boolean) => void;
  /** 고른 값들 — 안 골랐으면 [] */
  value?: string[];
  defaultValue?: string[];
  onValueChange?: (value: string[]) => void;
  disabled?: boolean;
  invalid?: boolean;
  readOnly?: boolean;
  required?: boolean;
  /** 폼으로 보낼 때의 이름 */
  name?: string;
  form?: string;
  /** 여럿을 고를 수 있다 */
  multiple?: boolean;
  /** 목록이 놓일 자리 — 기본은 bottom */
  placement?: SelectPlacement;
  /** 버튼과 목록의 사이(px) — 기본은 8 */
  gutter?: number;
  /** 목록이 화면 가장자리에서 띄울 거리(px) — 기본은 8 */
  overflowPadding?: number;
}

const EMPTY: string[] = [];

/** 선택 상자의 뿌리 — 틀(이름표 · 설명 · 오류) 없이 버튼과 목록만 쓸 때. 틀(Field) 안에 있으면 틀의 상태도 같이 따른다. */
function Select({
  children,
  size = "large",
  open: openProp,
  defaultOpen = false,
  onOpenChange,
  value: valueProp,
  defaultValue,
  onValueChange,
  disabled: disabledProp = false,
  invalid: invalidProp = false,
  readOnly: readOnlyProp = false,
  required: requiredProp = false,
  name,
  form,
  multiple = false,
  placement = "bottom",
  gutter = 8,
  overflowPadding = 8,
}: SelectProps) {
  const field = useFieldContext();
  const disabled = disabledProp || !!field?.disabled;
  const invalid = invalidProp || !!field?.invalid;
  const readOnly = readOnlyProp || !!field?.readOnly;
  const required = requiredProp || !!field?.required;

  const [innerOpen, setInnerOpen] = React.useState(defaultOpen);
  const open = openProp ?? innerOpen;
  const [innerValue, setInnerValue] = React.useState(defaultValue ?? EMPTY);
  const value = valueProp ?? innerValue;

  // Base UI 는 펼치자마자 고른 줄을 가리킨 것으로 친다. SEED 는 마우스로 펼쳤을 때 아무 줄도 가리키지 않고,
  // 마우스를 움직이거나 키를 눌러야 가리킨 줄의 바탕이 보인다 — 그 차이를 armed 로 맞춘다(키보드로 펼치면 바로 보인다).
  const [armed, setArmed] = React.useState(false);
  const arm = React.useCallback(() => setArmed(true), []);

  const setOpen = (
    next: boolean,
    details?: SelectPrimitive.Root.ChangeEventDetails,
  ) => {
    // 읽기 전용이면 초점은 받되 펼쳐지지 않는다(Base UI 는 펼친 채 고르기만 막는다).
    if (next && (disabled || readOnly)) return;
    const event = details?.event;
    // 키보드 · 보조 기기로 누른 클릭은 detail 이 0 이다.
    if (next)
      setArmed(
        event instanceof KeyboardEvent ||
          (event instanceof MouseEvent &&
            event.type === "click" &&
            event.detail === 0),
      );
    if (openProp === undefined) setInnerOpen(next);
    onOpenChange?.(next);
  };
  const setValue = (next: string[]) => {
    // 같은 값을 다시 골랐을 때는 알리지 않는다.
    if (
      next.length === value.length &&
      next.every((entry, index) => entry === value[index])
    )
      return;
    if (valueProp === undefined) setInnerValue(next);
    onValueChange?.(next);
  };

  // 그려진 선택지는 스스로 적어 넣는다. 글이나 아이콘이 실제로 바뀔 때만 다시 그린다(아이콘 요소는 그릴 때마다 새것이라 그대로 견주면 끝없이 돈다).
  const [registered, setOptions] = React.useState<
    ReadonlyMap<string, SelectOption>
  >(() => new Map());
  // 자식에서 읽은 것에 스스로 적어 넣은 것을 덮는다. 내용이 같으면 앞의 Map 을 그대로 써서, 아래의 context 가 그릴 때마다 바뀌지 않게 한다.
  const merged = collectOptions(children, new Map());
  for (const [key, option] of registered) merged.set(key, option);
  const optionsRef = React.useRef<ReadonlyMap<string, SelectOption>>(merged);
  if (!sameOptions(optionsRef.current, merged)) optionsRef.current = merged;
  const options = optionsRef.current;
  const registerOption = React.useCallback(
    (optionValue: string, option: SelectOption) => {
      setOptions((previous) => {
        const before = previous.get(optionValue);
        if (sameOption(before, option)) return previous;
        return new Map(previous).set(optionValue, option);
      });
      return () =>
        setOptions((previous) => {
          if (!previous.has(optionValue)) return previous;
          const next = new Map(previous);
          next.delete(optionValue);
          return next;
        });
    },
    [],
  );

  const [side, align = "center"] = placement.split("-") as [
    Side,
    Align | undefined,
  ];
  const context = React.useMemo<SelectContextValue>(
    () => ({
      size,
      open,
      value,
      disabled,
      readOnly,
      invalid,
      side,
      align,
      gutter,
      overflowPadding,
      options,
      registerOption,
      armed,
      arm,
    }),
    [
      size,
      open,
      value,
      disabled,
      readOnly,
      invalid,
      side,
      align,
      gutter,
      overflowPadding,
      options,
      registerOption,
      armed,
      arm,
    ],
  );

  // 화면을 잠그지 않는다(modal) — SEED 의 선택 상자는 펼쳐져 있어도 뒤의 화면이 그대로 움직인다.
  const shared = {
    open,
    onOpenChange: setOpen,
    disabled,
    readOnly,
    required,
    name: name ?? field?.name,
    form,
    modal: false,
  };
  return (
    <SelectContext.Provider value={context}>
      {multiple ? (
        <SelectPrimitive.Root<string, true>
          multiple
          value={value}
          onValueChange={(next) => setValue(next)}
          {...shared}
        >
          {children}
        </SelectPrimitive.Root>
      ) : (
        <SelectPrimitive.Root<string>
          value={value[0] ?? null}
          onValueChange={(next) => setValue(next == null ? [] : [next])}
          {...shared}
        >
          {children}
        </SelectPrimitive.Root>
      )}
    </SelectContext.Provider>
  );
}

// ── 버튼 ─────────────────────────────────────────────────────────────────────

const triggerVariants = cva(
  [
    `relative isolate m-0 box-border flex w-full cursor-pointer items-center
    border-none bg-bg-transparent font-[inherit]`,
    "inset-ring inset-ring-stroke-neutral-weak",
    "[transition:background-color_var(--motion-duration-color-transition)_var(--motion-ease-easing),outline-color_var(--motion-duration-d3)_var(--motion-ease-easing)]",
    // 오류의 굵은 테두리 — 상자의 크기가 바뀌지 않게 ::after 로 그린다.
    `after:pointer-events-none after:absolute after:inset-0
    after:rounded-[inherit] after:border-2 after:border-transparent
    after:content-['']`,
    `after:transition-[border-color] after:duration-[0.1s] after:ease-easing
    invalid:after:border-stroke-critical-solid`,
    "data-disabled:cursor-not-allowed data-disabled:bg-bg-disabled",
    `not-data-disabled:data-readonly:cursor-default
    not-data-disabled:data-readonly:bg-bg-disabled`,
    "not-data-disabled:not-data-readonly:engaged:bg-bg-transparent-pressed",
    // 누르면 바탕은 그대로 두고 안쪽만 줄인다.
    "not-data-disabled:not-data-readonly:pressed:[--content-scale:var(--feedback-scale)]",
    `outline-solid outline-(length:--dimension-x0_5)
    outline-offset-(--dimension-x0_5) outline-transparent
    focused:outline-stroke-focus-ring`,
  ],
  {
    variants: {
      size: {
        large: "h-x13 gap-x2.5 rounded-r3 px-x4",
        medium: "h-x10 gap-x2 rounded-r2 px-x3.5",
      },
    },
    defaultVariants: { size: "large" },
  },
);

// 줄어드는 안쪽 상자 — 바깥(버튼 · 줄)의 배치를 그대로 물려받아, 상자가 없을 때와 같은 자리에 놓인다.
// 바깥의 높이를 다 채운다(self-stretch) — 상자의 크기가 원본과 다르면 줄어들 때 글자 · 아이콘이 다른 자리에서 다듬어져 픽셀이 어긋난다.
const CONTENT_SCALE = [
  "min-h-0 min-w-0 flex-auto self-stretch justify-self-stretch [grid-area:1/1/-1/-1] [display:inherit] [flex-direction:inherit] [flex-wrap:inherit] [gap:inherit]",
  "[align-content:inherit] [align-items:inherit] [justify-content:inherit] [justify-items:inherit]",
  "scale-(--content-scale) [transition:var(--feedback-scale-transition)]",
].join(" ");

const TRIGGER_TEXT =
  "pointer-events-none grow overflow-hidden text-start font-regular text-ellipsis whitespace-nowrap";
const TRIGGER_TEXT_SIZE: Record<Size, string> = {
  large: "text-t5",
  medium: "text-t4",
};
const TRIGGER_ICON =
  "pointer-events-none shrink-0 [--icon-color:var(--fg-neutral-muted)] data-disabled:[--icon-color:var(--fg-disabled)]";
const TRIGGER_ICON_SIZE: Record<Size, string> = {
  large: "[--icon-size:var(--dimension-x5)]",
  medium: "[--icon-size:var(--dimension-x4)]",
};

export interface SelectTriggerProps extends Omit<
  SelectPrimitive.Trigger.Props,
  "children"
> {
  /** 안 주면 뿌리의 size */
  size?: Size;
  /** 아무것도 안 골랐을 때 보이는 글 */
  placeholder?: React.ReactNode;
  /** 앞 아이콘 — 고른 선택지에 아이콘이 있으면 그것이 대신 보인다 */
  prefixIcon?: React.ReactElement;
  /** 뒤 아이콘 — 기본은 아래 화살표 */
  suffixIcon?: React.ReactElement;
}

function SelectTrigger({
  className,
  size: sizeProp,
  placeholder,
  prefixIcon,
  suffixIcon = <IconChevronDownSmallLine />,
  ref,
  ...props
}: SelectTriggerProps) {
  const context = useSelectContext();
  const field = useFieldContext();
  const size = sizeProp ?? context.size;
  const { scaleFeedbackRef, scaleFeedbackClassName } =
    useScaleFeedback<HTMLButtonElement>(ref);

  // 이름표를 누르면 초점만 받는다(펼치지 않는다).
  const elementRef = React.useRef<HTMLButtonElement | null>(null);
  const setRefs = React.useCallback(
    (node: HTMLButtonElement | null) => {
      elementRef.current = node;
      scaleFeedbackRef(node);
    },
    [scaleFeedbackRef],
  );
  const focusControlRef = field?.focusControlRef;
  React.useEffect(() => {
    if (!focusControlRef) return undefined;
    const focus = () => elementRef.current?.focus();
    focusControlRef.current = focus;
    return () => {
      if (focusControlRef.current === focus) focusControlRef.current = null;
    };
  }, [focusControlRef]);

  // 그려져 있지 않은 값은 안 고른 것으로 친다.
  const selected = context.value.flatMap(
    (entry) => context.options.get(entry) ?? [],
  );
  const icon =
    (selected.length === 1 ? selected[0]!.icon : undefined) ?? prefixIcon;
  const stateProps = {
    "data-disabled": flag(context.disabled),
    "data-readonly": flag(context.readOnly),
  };

  return (
    <SelectPrimitive.Trigger
      ref={setRefs}
      data-slot="select-trigger"
      data-invalid={flag(context.invalid)}
      aria-invalid={context.invalid}
      aria-labelledby={field?.labelledBy}
      aria-describedby={field?.describedBy}
      className={cn(
        scaleFeedbackClassName,
        "[--content-scale:1]",
        triggerVariants({ size }),
        className,
      )}
      {...openOnRelease(props)}
    >
      <span data-slot="select-trigger-content" className={CONTENT_SCALE}>
        {icon ? (
          <Icon
            svg={icon}
            data-slot="select-prefix-icon"
            {...stateProps}
            className={cn(TRIGGER_ICON, TRIGGER_ICON_SIZE[size])}
          />
        ) : null}
        {selected.length > 0 ? (
          <span
            data-slot="select-value"
            {...stateProps}
            className={cn(
              TRIGGER_TEXT,
              TRIGGER_TEXT_SIZE[size],
              "text-fg-neutral data-disabled:text-fg-disabled",
            )}
          >
            {selected.map((option) => option.textValue).join(", ")}
          </span>
        ) : placeholder ? (
          <span
            data-slot="select-placeholder"
            {...stateProps}
            className={cn(
              TRIGGER_TEXT,
              TRIGGER_TEXT_SIZE[size],
              "text-fg-placeholder data-disabled:text-fg-disabled",
            )}
          >
            {placeholder}
          </span>
        ) : null}
        <Icon
          svg={suffixIcon}
          data-slot="select-suffix-icon"
          data-open={flag(context.open)}
          {...stateProps}
          className={cn(
            TRIGGER_ICON,
            TRIGGER_ICON_SIZE[size],
            `transform-[rotate(0deg)] transition-[transform] duration-d2
            ease-easing data-open:transform-[rotate(180deg)]
            data-open:duration-d3`,
          )}
        />
      </span>
    </SelectPrimitive.Trigger>
  );
}

// ── 목록 ─────────────────────────────────────────────────────────────────────

export interface SelectContentProps extends SelectPrimitive.Popup.Props {
  /** 목록을 그릴 곳 — 안 주면 body */
  positionerContainer?: SelectPrimitive.Portal.Props["container"];
}

/** 펼쳐지는 목록 — body 에 그린다. 닫혀 있는 동안에는 그리지 않는다. */
function SelectContent({
  className,
  children,
  positionerContainer,
  onPointerMove,
  onKeyDown,
  ...props
}: SelectContentProps) {
  const { side, align, gutter, overflowPadding, armed, arm } =
    useSelectContext();
  const field = useFieldContext();
  return (
    <SelectPrimitive.Portal container={positionerContainer}>
      <SelectPrimitive.Positioner
        data-slot="select-positioner"
        side={side}
        align={align}
        sideOffset={gutter}
        collisionPadding={overflowPadding}
        // 고른 줄을 버튼 위에 겹쳐 놓는 Base UI 의 기본 배치는 쓰지 않는다 — 늘 버튼 아래(또는 위)에 놓는다.
        alignItemWithTrigger={false}
        className="z-[calc(99999+var(--z-index-offset,0))] outline-none"
      >
        <SelectPrimitive.Popup
          data-slot="select-content"
          data-armed={flag(armed)}
          onPointerMove={(event) => {
            onPointerMove?.(event);
            arm();
          }}
          onKeyDown={(event) => {
            onKeyDown?.(event);
            arm();
          }}
          className={cn(
            `group/select-content w-(--anchor-width) origin-(--transform-origin)
            overflow-hidden rounded-r5 bg-bg-layer-floating shadow-s3
            outline-none`,
            `[--seed-enter-opacity:0] [--seed-enter-scale:0.95]
            [--seed-exit-opacity:0] [--seed-exit-scale:0.95]`,
            "data-open:animate-[seed-enter_var(--motion-duration-d3)_var(--motion-ease-enter)]",
            "data-closed:animate-[seed-exit_var(--motion-duration-d2)_var(--motion-ease-exit)_forwards]",
            className,
          )}
          {...props}
        >
          <SelectPrimitive.List
            data-slot="select-list"
            // 목록(listbox)에도 틀의 이름표를 이름으로 단다.
            aria-labelledby={field?.labelledBy}
            className={cn(
              "box-border flex flex-col gap-x2 overflow-y-auto py-x2",
              "max-h-[min(var(--select-max-height,480px),max(200px,var(--available-height,480px)))]",
            )}
          >
            {children}
          </SelectPrimitive.List>
        </SelectPrimitive.Popup>
      </SelectPrimitive.Positioner>
    </SelectPrimitive.Portal>
  );
}

const groupLabelVariants = cva("px-x4 text-fg-neutral-subtle", {
  variants: {
    size: {
      large: "py-x2.5 text-t4 font-medium",
      medium: "py-x2 text-t3 font-regular",
    },
  },
  defaultVariants: { size: "large" },
});

export interface SelectGroupProps extends SelectPrimitive.Group.Props {
  /** 묶음의 이름 */
  label?: React.ReactNode;
}

function SelectGroup({
  className,
  label,
  children,
  ...props
}: SelectGroupProps) {
  const { size } = useSelectContext();
  return (
    <SelectPrimitive.Group
      data-slot="select-group"
      className={cn(
        "flex flex-col",
        // 묶음과 묶음 사이의 금
        `[&+&]:before:mx-x4 [&+&]:before:mb-x2 [&+&]:before:block
        [&+&]:before:h-px [&+&]:before:shrink-0
        [&+&]:before:bg-stroke-neutral-muted [&+&]:before:content-['']`,
        className,
      )}
      {...props}
    >
      {label ? (
        <SelectPrimitive.GroupLabel
          data-slot="select-group-label"
          className={groupLabelVariants({ size })}
        >
          {label}
        </SelectPrimitive.GroupLabel>
      ) : null}
      {children}
    </SelectPrimitive.Group>
  );
}

const itemVariants = cva(
  [
    `relative isolate m-0 flex cursor-default scroll-my-x2 items-center
    border-none bg-none px-x4 text-start text-inherit no-underline outline-none
    select-none font-[inherit]`,
    // 바탕 — 가리키거나 누르면 양옆이 x2 만큼 들어간 둥근 칸이 된다.
    `before:absolute before:inset-0 before:-z-1 before:rounded-r3
    before:content-['']`,
    "before:[transition:background-color_var(--motion-duration-color-transition)_var(--motion-ease-easing),inset-inline_var(--motion-duration-d3)_var(--motion-ease-easing)]",
    `not-data-disabled:pressed:before:inset-x-x2
    not-data-disabled:pressed:before:bg-bg-transparent-pressed`,
    "group-data-armed/select-content:not-data-disabled:data-highlighted:before:inset-x-x2",
    "group-data-armed/select-content:not-data-disabled:data-highlighted:before:bg-bg-transparent-pressed",
    "not-data-disabled:pressed:[--content-scale:var(--feedback-scale)]",
    "data-disabled:cursor-not-allowed",
  ],
  {
    variants: {
      size: {
        large: "gap-x3 py-x3",
        medium: "gap-x2 py-x2.5",
      },
    },
    defaultVariants: { size: "large" },
  },
);

const ITEM_PARTS: Record<
  Size,
  { prefixIcon: string; label: string; description: string; indicator: string }
> = {
  large: {
    prefixIcon: "[--icon-size:22px]",
    label: "text-t5",
    description: "text-t3",
    indicator: "[--icon-size:var(--dimension-x3_5)]",
  },
  medium: {
    prefixIcon: "[--icon-size:var(--dimension-x4_5)]",
    label: "text-t4",
    description: "text-t2",
    indicator: "[--icon-size:var(--dimension-x3)]",
  },
};
const ITEM_ICON =
  "shrink-0 [--icon-color:var(--fg-neutral)] data-disabled:[--icon-color:var(--fg-disabled)]";

export interface SelectItemProps extends Omit<
  SelectPrimitive.Item.Props,
  "children" | "label" | "value"
> {
  value: string;
  /** 안 주면 뿌리의 size */
  size?: Size;
  /** 줄에 보이는 것 */
  label?: React.ReactNode;
  /** 버튼에 보일 글 — 안 주면 label(글일 때), 그것도 아니면 value */
  textValue?: string;
  description?: React.ReactNode;
  /** 줄 앞의 아이콘 — 이 줄을 고르면 버튼 앞에도 보인다 */
  prefixIcon?: React.ReactElement;
  /** 글자를 쳐서 찾을 때 견줄 글 — 안 주면 버튼에 보일 글 */
  typeaheadLabel?: string;
}

function SelectItem({
  className,
  value,
  size: sizeProp,
  label,
  textValue,
  description,
  prefixIcon,
  typeaheadLabel,
  disabled,
  ref,
  ...props
}: SelectItemProps) {
  const context = useSelectContext();
  const size = sizeProp ?? context.size;
  const part = ITEM_PARTS[size];
  const { scaleFeedbackRef, scaleFeedbackClassName } =
    useScaleFeedback<HTMLElement>(ref);
  const resolvedTextValue = toTextValue({ textValue, label, value });
  const selected = context.value.includes(value);
  const stateProps = { "data-disabled": flag(disabled) };

  const { registerOption } = context;
  const iconRef = React.useRef(prefixIcon);
  iconRef.current = prefixIcon;
  const iconType = prefixIcon?.type;
  React.useLayoutEffect(
    () =>
      registerOption(value, {
        textValue: resolvedTextValue,
        icon: iconRef.current,
      }),
    [registerOption, value, resolvedTextValue, iconType],
  );

  return (
    <SelectPrimitive.Item
      ref={scaleFeedbackRef}
      data-slot="select-item"
      value={value}
      disabled={disabled}
      label={typeaheadLabel ?? resolvedTextValue}
      className={cn(
        scaleFeedbackClassName,
        "[--content-scale:1]",
        itemVariants({ size }),
        className,
      )}
      {...props}
    >
      <span data-slot="select-item-content" className={CONTENT_SCALE}>
        {prefixIcon ? (
          <Icon
            svg={prefixIcon}
            data-slot="select-item-prefix-icon"
            {...stateProps}
            className={cn(ITEM_ICON, part.prefixIcon)}
          />
        ) : null}
        <div
          data-slot="select-item-body"
          className="flex grow flex-col gap-x0.5"
        >
          <span
            data-slot="select-item-label"
            {...stateProps}
            className={cn(
              "font-regular text-fg-neutral data-disabled:text-fg-disabled",
              part.label,
            )}
          >
            {label ?? resolvedTextValue}
          </span>
          {description ? (
            <span
              data-slot="select-item-description"
              {...stateProps}
              className={cn(
                `font-regular text-fg-neutral-subtle
                  data-disabled:text-fg-disabled`,
                part.description,
              )}
            >
              {description}
            </span>
          ) : null}
        </div>
        {selected ? (
          <Icon
            svg={<IconCheckmarkFatFill />}
            data-slot="select-item-indicator"
            {...stateProps}
            className={cn(ITEM_ICON, part.indicator)}
          />
        ) : null}
      </span>
    </SelectPrimitive.Item>
  );
}

// ── 이름표 · 설명 · 오류까지 한 번에 ───────────────────────────────────────────

export interface SelectRootProps extends SelectProps {
  label?: React.ReactNode;
  /** 이름표의 굵기 — 기본은 medium */
  labelWeight?: FieldLabelProps["weight"];
  /** 이름표 옆의 보조 글('선택' 같은 것) */
  indicator?: React.ReactNode;
  showRequiredIndicator?: boolean;
  description?: React.ReactNode;
  /** invalid 일 때만 보인다 */
  errorMessage?: React.ReactNode;
  fieldRef?: React.Ref<HTMLDivElement>;
}

function SelectRoot({
  label,
  labelWeight,
  indicator,
  showRequiredIndicator,
  description,
  errorMessage,
  fieldRef,
  children,
  ...props
}: SelectRootProps) {
  const showError = !!errorMessage && !!props.invalid;
  return (
    <Field
      ref={fieldRef}
      required={props.required}
      disabled={props.disabled}
      invalid={props.invalid}
      readOnly={props.readOnly}
      name={props.name}
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
      <Select {...props}>{children}</Select>
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
  Select,
  SelectRoot,
  SelectTrigger,
  SelectContent,
  SelectGroup,
  SelectItem,
};
