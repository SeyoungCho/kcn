import type * as React from "react";
import { Checkbox as CheckboxPrimitive } from "@base-ui/react/checkbox";
import { Radio as RadioPrimitive } from "@base-ui/react/radio";
import { RadioGroup as RadioGroupPrimitive } from "@base-ui/react/radio-group";
import { useRender } from "@base-ui/react/use-render";
import IconCheckmarkFatFill from "@karrotmarket/react-monochrome-icon/IconCheckmarkFatFill";
import IconMinusFatFill from "@karrotmarket/react-monochrome-icon/IconMinusFatFill";
import { cva } from "class-variance-authority";
import type { VariantProps } from "class-variance-authority";

import { checkmarkVariants } from "@/components/ui/checkbox";
import { Divider } from "@/components/ui/divider";
import type { DividerProps } from "@/components/ui/divider";
import { Icon } from "@/components/ui/icon";
import { radiomarkVariants } from "@/components/ui/radio-group";
import { cn } from "@/lib/utils";

// 가로 줄을 세로로 쌓은 목록 — 줄마다 앞(prefix) · 제목과 설명 · 뒤(suffix) 자리가 있다.
// 누르는 줄(ListButtonItem) · 켜고 끄는 줄(ListCheckItem) · 하나만 고르는 줄(ListRadioItem)은 가리키거나 누르면
// 양옆이 들어간 둥근 바탕이 깔리고, 키보드 초점이 오면 줄 전체에 초점 링이 그려진다.

// 모서리 토큰('r2') 또는 CSS 값
const toRadius = (radius: string | undefined) =>
  radius && /^r\d/.test(radius) ? `var(--radius-${radius})` : radius;

const flag = (on: boolean | undefined) => (on ? ("" as const) : undefined);

export interface ListProps extends useRender.ComponentProps<"ul"> {
  /** 가리키거나 누른 줄의 둥근 바탕의 모서리 — 토큰('r2') 또는 CSS 값. 둥근 카드 안에 넣을 때 카드에 맞춘다 */
  itemBorderRadius?: string;
}

/** 목록 — 기본은 ul. 켜고 끄는 줄은 render={<fieldset />}, 하나만 고르는 줄은 render={<ListRadioGroup … />} 로 감싼다. */
function List({
  render,
  className,
  style,
  itemBorderRadius,
  ...props
}: ListProps) {
  return useRender({
    render,
    defaultTagName: "ul",
    props: {
      "data-slot": "list",
      className: cn(
        "m-0 box-border flex list-none flex-col border-0 p-0",
        className,
      ),
      style: {
        "--list-item-border-radius": toRadius(itemBorderRadius),
        ...style,
      } as React.CSSProperties,
      ...props,
    },
  });
}

// ── 줄의 부위 ─────────────────────────────────────────────────────────────────

const listItemVariants = cva(
  `relative isolate box-border flex w-full border-none px-x-global-gutter py-x3
  font-[inherit] antialiased`,
  {
    variants: {
      /** 앞 · 뒤 자리를 세로로 어디에 맞출지 — 제목이 길어 여러 줄이면 flex-start */
      alignItems: {
        center: "items-center",
        "flex-start": "items-start",
        "flex-end": "items-end",
        stretch: "items-stretch",
        baseline: "items-baseline",
      },
    },
    defaultVariants: { alignItems: "center" },
  },
);

type ListItemVariants = VariantProps<typeof listItemVariants>;

// 바탕(::before)과 초점 링(::after)은 줄(가장 가까운 relative 조상)을 다 덮는다.
const CONTENT = cn(
  "m-0 box-border inline-flex grow flex-col items-start gap-x0.5 border-none bg-transparent py-0 pr-x2.5 pl-0 text-start no-underline font-[inherit]",
  "before:absolute before:inset-0 before:-z-1 before:content-['']",
  "before:transition-[background-color,inset-inline,border-radius] before:duration-color-transition before:ease-easing",
  "after:absolute after:inset-0 after:content-['']",
  "after:outline-solid after:outline-(length:--dimension-x0_5) after:-outline-offset-(--dimension-x0_5) after:outline-transparent",
  "after:transition-[outline-color] after:duration-d3 after:ease-easing",
  "focus:outline-none",
);

// 가리키거나(마우스) 누를 때(터치)의 바탕 — 줄의 상태를 그대로 받는 버튼 · 링크와, 줄(group/list-item)에서 받는 체크 · 라디오가 조건만 다르다.
const ENGAGED_SELF = cn(
  "not-data-disabled:engaged:before:inset-x-x1.5 not-data-disabled:engaged:before:rounded-(--list-item-border-radius,var(--dimension-x2_5))",
  "not-data-disabled:engaged:before:bg-bg-transparent-pressed",
);
const ENGAGED_GROUP = cn(
  "not-data-disabled:group-engaged/list-item:before:inset-x-x1.5 not-data-disabled:group-engaged/list-item:before:rounded-(--list-item-border-radius,var(--dimension-x2_5))",
  "not-data-disabled:group-engaged/list-item:before:bg-bg-transparent-pressed",
);
const HIGHLIGHTED = "before:bg-bg-brand-weak";
const HIGHLIGHTED_ENGAGED_SELF =
  "not-data-disabled:engaged:before:bg-bg-brand-weak-pressed";
const HIGHLIGHTED_ENGAGED_GROUP =
  "not-data-disabled:group-engaged/list-item:before:bg-bg-brand-weak-pressed";

// 앞 · 뒤 자리의 체크 · 라디오 표시는 줄과 같이 움직인다 — 따로 줄어들거나 초점 링을 그리지 않는다.
const PREFIX =
  "inline-flex shrink-0 items-center pr-x3 [--feedback-scale:1] [--icon-color:var(--fg-neutral)] [--icon-size:22px] data-disabled:[--icon-color:var(--fg-disabled)]";
const SUFFIX = cn(
  "inline-flex shrink-0 items-center gap-x1 text-t5 font-regular text-fg-neutral-subtle",
  "[--feedback-scale:1] [--icon-color:var(--fg-neutral-subtle)] [--icon-size:18px] data-disabled:[--icon-color:var(--fg-disabled)]",
);
const TITLE =
  "shrink-0 text-t5 font-regular text-fg-neutral data-disabled:text-fg-disabled";
const DETAIL =
  "text-t3 font-regular text-fg-neutral-subtle data-disabled:text-fg-disabled";

interface ListItemSlots {
  /** 제목 */
  title: React.ReactNode;
  /** 제목 아래의 설명 */
  detail?: React.ReactNode;
  /** 앞 자리 — 아이콘 · 아바타 · 체크 · 라디오 표시 */
  prefix?: React.ReactNode;
  /** 뒤 자리 — 아이콘 · 버튼 · 글 · 체크 · 라디오 표시 */
  suffix?: React.ReactNode;
}

const ListPrefix = ({
  disabled,
  children,
}: {
  disabled?: boolean;
  children: React.ReactNode;
}) => (
  <div
    data-slot="list-item-prefix"
    data-disabled={flag(disabled)}
    className={PREFIX}
  >
    {children}
  </div>
);

const ListSuffix = ({
  disabled,
  children,
}: {
  disabled?: boolean;
  children: React.ReactNode;
}) => (
  <div
    data-slot="list-item-suffix"
    data-disabled={flag(disabled)}
    className={SUFFIX}
  >
    {children}
  </div>
);

const ListText = ({
  title,
  detail,
  disabled,
}: Pick<ListItemSlots, "title" | "detail"> & { disabled?: boolean }) => (
  <>
    <span
      data-slot="list-item-title"
      data-disabled={flag(disabled)}
      className={TITLE}
    >
      {title}
    </span>
    {detail ? (
      <span
        data-slot="list-item-detail"
        data-disabled={flag(disabled)}
        className={DETAIL}
      >
        {detail}
      </span>
    ) : null}
  </>
);

// ── 줄 ───────────────────────────────────────────────────────────────────────

export interface ListItemProps
  extends
    Omit<React.ComponentProps<"li">, "title" | "prefix" | "children">,
    ListItemSlots,
    ListItemVariants {
  /** 브랜드색 바탕으로 강조한다 */
  highlighted?: boolean;
}

/** 누를 수 없는 줄. 뒤 자리의 버튼만 누를 수 있다. */
function ListItem({
  title,
  detail,
  prefix,
  suffix,
  alignItems,
  highlighted,
  className,
  ...props
}: ListItemProps) {
  return (
    <li
      data-slot="list-item"
      className={cn(listItemVariants({ alignItems }), className)}
      {...props}
    >
      {prefix ? <ListPrefix>{prefix}</ListPrefix> : null}
      <div
        data-slot="list-item-content"
        className={cn(CONTENT, highlighted && HIGHLIGHTED)}
      >
        <ListText title={title} detail={detail} />
      </div>
      {suffix ? <ListSuffix>{suffix}</ListSuffix> : null}
    </li>
  );
}

export interface ListButtonItemProps
  extends
    Omit<useRender.ComponentProps<"button">, "title" | "prefix" | "children">,
    ListItemSlots,
    ListItemVariants {
  highlighted?: boolean;
  /** 줄(li) 요소 */
  rootRef?: React.Ref<HTMLLIElement>;
  /** 줄(li)에 붙는 속성 — className · ref 외의 것은 버튼(또는 render 로 준 링크)에 붙는다 */
  rootProps?: React.HTMLAttributes<HTMLLIElement>;
}

/**
 * 줄 전체를 누르는 줄 — 제목 자리가 버튼이고, 그 바탕 · 초점 링이 줄을 다 덮는다. 링크로 쓰려면 render={<a href="…" />}.
 * 앞 · 뒤 자리에 따로 누를 것을 넣으면 그 요소에 position: relative 를 준다(줄의 버튼 위로 올라오게).
 */
function ListButtonItem({
  title,
  detail,
  prefix,
  suffix,
  alignItems,
  highlighted,
  rootRef,
  rootProps,
  render,
  className,
  disabled,
  ...props
}: ListButtonItemProps) {
  const content = useRender({
    render,
    defaultTagName: "button",
    props: {
      ...(!render && { type: "button" }),
      disabled,
      "data-slot": "list-item-content",
      "data-disabled": flag(disabled),
      className: cn(
        CONTENT,
        ENGAGED_SELF,
        highlighted && cn(HIGHLIGHTED, HIGHLIGHTED_ENGAGED_SELF),
        "focused:after:outline-stroke-focus-ring",
        className,
      ),
      children: <ListText title={title} detail={detail} disabled={disabled} />,
      ...props,
    },
  });
  return (
    <li
      ref={rootRef}
      data-slot="list-item"
      {...rootProps}
      className={cn(listItemVariants({ alignItems }), rootProps?.className)}
    >
      {prefix ? <ListPrefix disabled={disabled}>{prefix}</ListPrefix> : null}
      {content}
      {suffix ? <ListSuffix disabled={disabled}>{suffix}</ListSuffix> : null}
    </li>
  );
}

// 줄 전체가 체크박스 · 라디오다(초점도 줄이 받는다). 앞 · 뒤 자리의 ListCheckmark · ListRadiomark 가 줄의 상태를 그린다.
// group/checkbox · group/radio 는 체크 · 라디오 표시의 '줄을 가리키면 같이 바뀌는' 모양을 그대로 쓰려고 붙인다.
const SELECTABLE_ROOT = "group/list-item cursor-default outline-none";

const selectableContent = (highlighted: boolean | undefined) =>
  cn(
    CONTENT,
    ENGAGED_GROUP,
    highlighted && cn(HIGHLIGHTED, HIGHLIGHTED_ENGAGED_GROUP),
    "group-focused/list-item:after:outline-stroke-focus-ring",
  );

export interface ListCheckItemProps
  extends
    Omit<
      CheckboxPrimitive.Root.Props,
      "title" | "prefix" | "children" | "render" | "className"
    >,
    ListItemSlots,
    ListItemVariants {
  highlighted?: boolean;
  className?: string;
}

/** 켜고 끄는 줄(체크박스). 목록은 render={<fieldset />} 처럼 묶음으로 감싼다. */
function ListCheckItem({
  title,
  detail,
  prefix,
  suffix,
  alignItems,
  highlighted,
  className,
  ...props
}: ListCheckItemProps) {
  return (
    <CheckboxPrimitive.Root
      data-slot="list-item"
      className={cn(
        listItemVariants({ alignItems }),
        SELECTABLE_ROOT,
        "group/checkbox",
        className,
      )}
      render={(rootProps, state) => (
        <div {...rootProps}>
          {prefix ? (
            <ListPrefix disabled={state.disabled}>{prefix}</ListPrefix>
          ) : null}
          <div
            data-slot="list-item-content"
            data-disabled={flag(state.disabled)}
            data-checked={flag(state.checked)}
            className={selectableContent(highlighted)}
          >
            <ListText title={title} detail={detail} disabled={state.disabled} />
          </div>
          {suffix ? (
            <ListSuffix disabled={state.disabled}>{suffix}</ListSuffix>
          ) : null}
        </div>
      )}
      {...props}
    />
  );
}

export type ListRadioGroupProps = RadioGroupPrimitive.Props<string>;

/** 하나만 고르는 줄의 묶음(라디오 그룹) — `<List render={<ListRadioGroup defaultValue="…" aria-label="…" />}>` 로 쓴다. */
function ListRadioGroup(props: ListRadioGroupProps) {
  return (
    <RadioGroupPrimitive<string> data-slot="list-radio-group" {...props} />
  );
}

export interface ListRadioItemProps
  extends
    Omit<
      RadioPrimitive.Root.Props<string>,
      "title" | "prefix" | "children" | "render" | "className"
    >,
    ListItemSlots,
    ListItemVariants {
  highlighted?: boolean;
  className?: string;
}

/** 하나만 고르는 줄(라디오). ListRadioGroup 안에 놓는다. */
function ListRadioItem({
  title,
  detail,
  prefix,
  suffix,
  alignItems,
  highlighted,
  className,
  ...props
}: ListRadioItemProps) {
  return (
    <RadioPrimitive.Root<string>
      data-slot="list-item"
      className={cn(
        listItemVariants({ alignItems }),
        SELECTABLE_ROOT,
        "group/radio",
        className,
      )}
      render={(rootProps, state) => (
        <div {...rootProps}>
          {prefix ? (
            <ListPrefix disabled={state.disabled}>{prefix}</ListPrefix>
          ) : null}
          <div
            data-slot="list-item-content"
            data-disabled={flag(state.disabled)}
            data-checked={flag(state.checked)}
            className={selectableContent(highlighted)}
          >
            <ListText title={title} detail={detail} disabled={state.disabled} />
          </div>
          {suffix ? (
            <ListSuffix disabled={state.disabled}>{suffix}</ListSuffix>
          ) : null}
        </div>
      )}
      {...props}
    />
  );
}

// ── 줄의 상태를 그리는 표시 ─────────────────────────────────────────────────────

type CheckmarkVariants = Pick<
  VariantProps<typeof checkmarkVariants>,
  "variant" | "tone" | "size"
>;

export interface ListCheckmarkProps extends CheckmarkVariants {
  className?: string;
}

/** ListCheckItem 의 앞 · 뒤 자리에 놓는 네모 칸 — 줄이 켜졌는지 · 못 쓰는지를 따라 그린다. */
function ListCheckmark({
  variant = "square",
  tone,
  size,
  className,
}: ListCheckmarkProps) {
  return (
    <CheckboxPrimitive.Indicator
      keepMounted
      data-slot="list-checkmark"
      className={(state) =>
        cn(
          checkmarkVariants({
            variant,
            tone,
            size,
            on: state.checked || state.indeterminate,
            disabled: state.disabled,
          }),
          "mt-0 block",
          className,
        )
      }
      render={(props, state) => (
        <span {...props}>
          {/* ghost 는 꺼져 있어도 흐린 체크를 보여 준다 */}
          {state.checked || state.indeterminate || variant === "ghost" ? (
            <Icon
              svg={
                state.indeterminate ? (
                  <IconMinusFatFill />
                ) : (
                  <IconCheckmarkFatFill />
                )
              }
              className={cn(
                "absolute inset-0 m-auto block overflow-visible text-center",
                variant === "ghost" &&
                  "transition-[color] duration-color-transition ease-easing",
              )}
            />
          ) : null}
        </span>
      )}
    />
  );
}

type RadiomarkVariants = Pick<
  VariantProps<typeof radiomarkVariants>,
  "tone" | "size"
>;

export interface ListRadiomarkProps extends RadiomarkVariants {
  className?: string;
}

/** ListRadioItem 의 앞 · 뒤 자리에 놓는 동그라미 — 줄을 골랐는지 · 못 쓰는지를 따라 그린다. */
function ListRadiomark({ tone, size, className }: ListRadiomarkProps) {
  return (
    <RadioPrimitive.Indicator
      keepMounted
      data-slot="list-radiomark"
      className={(state) =>
        cn(
          radiomarkVariants({
            tone,
            size,
            checked: state.checked,
            disabled: state.disabled,
          }),
          "mt-0",
          className,
        )
      }
      render={(props, state) => (
        <span {...props}>
          {state.checked ? (
            <Icon
              svg={
                <svg viewBox="0 0 24 24">
                  <circle cx="12" cy="12" r="12" fill="currentColor" />
                </svg>
              }
              className="block rounded-full"
            />
          ) : null}
        </span>
      )}
    />
  );
}

// ── 머리글 · 구분선 ─────────────────────────────────────────────────────────────

const listHeaderVariants = cva(
  `box-border flex w-full items-center justify-between gap-x2.5
  px-x-global-gutter py-x2 text-t4`,
  {
    variants: {
      variant: {
        mediumWeak: "font-medium text-fg-neutral-subtle",
        boldSolid: "font-bold text-fg-neutral",
      },
    },
    defaultVariants: { variant: "mediumWeak" },
  },
);

export interface ListHeaderProps
  extends
    useRender.ComponentProps<"div">,
    VariantProps<typeof listHeaderVariants> {}

/** 목록 위의 머리글 — 목록(List) 밖, 바로 위에 놓는다. 제목이면 render={<h2 />}. */
function ListHeader({ render, className, variant, ...props }: ListHeaderProps) {
  return useRender({
    render,
    defaultTagName: "div",
    props: {
      "data-slot": "list-header",
      className: cn(listHeaderVariants({ variant }), className),
      ...props,
    },
  });
}

/** 줄 사이의 구분선 — 기본은 읽어 주지 않는 <li aria-hidden>. 목록이 fieldset 등이면 as="div". */
function ListDivider({
  as = "li",
  "aria-hidden": ariaHidden = true,
  ...props
}: DividerProps) {
  return (
    <Divider
      data-slot="list-divider"
      as={as}
      aria-hidden={ariaHidden}
      {...props}
    />
  );
}

export {
  List,
  ListItem,
  ListButtonItem,
  ListCheckItem,
  ListRadioGroup,
  ListRadioItem,
  ListCheckmark,
  ListRadiomark,
  ListHeader,
  ListDivider,
  listItemVariants,
  listHeaderVariants,
};
