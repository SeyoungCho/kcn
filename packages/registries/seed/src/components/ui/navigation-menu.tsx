"use client";

import * as React from "react";
import { Popover as PopoverPrimitive } from "@base-ui/react/popover";
import { cva } from "class-variance-authority";

import { PrefixIcon, SuffixIcon } from "@/components/ui/affix-icon";
import { useScaleFeedback } from "@/lib/use-scale-feedback";
import { cn } from "@/lib/utils";

// 내비게이션 메뉴 — 버튼에 마우스를 올리거나 누르면 옆에 하위 메뉴가 뜬다(접힌 사이드 메뉴의 하위 메뉴).
// 모양은 메뉴(menu.tsx)와 같고, 동작이 다르다: 고르는 메뉴가 아니라 펼쳐 보이는 것이라 줄은 그냥 버튼이고,
// 여럿 가운데 하나만 열리며(Provider 가 어느 것이 열렸는지 쥔다) 하나가 열려 있으면 옆의 것은 기다리지 않고 바로 열린다.

type Side = "top" | "right" | "bottom" | "left";
type Align = "start" | "center" | "end";
type Placement = Side | `${Side}-${"start" | "end"}`;
type MenuSize = "medium" | "small" | "responsive";

const DEFAULT_OPEN_DELAY = 200;
const DEFAULT_CLOSE_DELAY = 100;

const splitPlacement = (placement: Placement) => {
  const [side, align = "center"] = placement.split("-") as [
    Side,
    Align | undefined,
  ];
  return { side, align };
};

interface NavigationMenuContextValue {
  /** 열려 있는 메뉴의 값 — 없으면 null */
  value: string | null;
  setValue: (
    next: string | null | ((previous: string | null) => string | null),
  ) => void;
  /** 옆의 메뉴에서 옮겨 와 열렸다 — 움직임 없이 바로 바뀐다 */
  instant: boolean;
  placement: Placement;
  openDelay: number;
  closeDelay: number;
  size: MenuSize;
}

const NavigationMenuContext =
  React.createContext<NavigationMenuContextValue | null>(null);

function useNavigationMenuContext() {
  const context = React.useContext(NavigationMenuContext);
  if (!context)
    throw new Error(
      "NavigationMenu 의 부품은 NavigationMenuProvider 안에서 쓴다.",
    );
  return context;
}

export interface NavigationMenuProviderProps {
  children?: React.ReactNode;
  /** 열려 있는 메뉴의 값 — null 이면 다 닫혀 있다 */
  value?: string | null;
  defaultValue?: string | null;
  onValueChange?: (value: string | null) => void;
  /** 안의 메뉴들이 뜨는 자리 — 메뉴마다 따로 줄 수도 있다 @default "bottom" */
  placement?: Placement;
  /** 올린 뒤 열리기까지(ms) — 다른 메뉴가 열려 있으면 기다리지 않는다 @default 200 */
  openDelay?: number;
  /** 벗어난 뒤 닫히기까지(ms) @default 100 */
  closeDelay?: number;
  /** 'responsive' 는 1280px 부터 small, 그보다 좁으면 medium @default "medium" */
  size?: MenuSize;
}

function NavigationMenuProvider({
  children,
  value: valueProp,
  defaultValue = null,
  onValueChange,
  placement = "bottom",
  openDelay = DEFAULT_OPEN_DELAY,
  closeDelay = DEFAULT_CLOSE_DELAY,
  size = "medium",
}: NavigationMenuProviderProps) {
  const [innerValue, setInnerValue] = React.useState(defaultValue);
  const value = valueProp === undefined ? innerValue : valueProp;
  const controlled = valueProp !== undefined;
  const [instant, setInstant] = React.useState(false);

  const latest = React.useRef({ value, onValueChange });
  latest.current = { value, onValueChange };
  const setValue = React.useCallback<NavigationMenuContextValue["setValue"]>(
    (next) => {
      const previous = latest.current.value;
      const resolved = typeof next === "function" ? next(previous) : next;
      if (resolved === previous) return;
      latest.current.value = resolved;
      setInstant(previous !== null && resolved !== null);
      if (!controlled) setInnerValue(resolved);
      latest.current.onValueChange?.(resolved);
    },
    [controlled],
  );

  const context = React.useMemo(
    () => ({
      value,
      setValue,
      instant,
      placement,
      openDelay,
      closeDelay,
      size,
    }),
    [value, setValue, instant, placement, openDelay, closeDelay, size],
  );
  return (
    <NavigationMenuContext.Provider value={context}>
      {children}
    </NavigationMenuContext.Provider>
  );
}

interface NavigationMenuRootSettings {
  value: string;
  open: boolean;
  disabled: boolean;
  placement: Placement;
  gutter: number;
  overflowPadding: number;
  strategy: "absolute" | "fixed";
}

const NavigationMenuRootContext =
  React.createContext<NavigationMenuRootSettings | null>(null);

function useNavigationMenuRootContext() {
  const context = React.useContext(NavigationMenuRootContext);
  if (!context)
    throw new Error("NavigationMenu 의 부품은 NavigationMenuRoot 안에서 쓴다.");
  return context;
}

export interface NavigationMenuRootProps {
  children?: React.ReactNode;
  /** 이 메뉴를 가리키는 값 — Provider 안에서 겹치지 않아야 한다 */
  value: string;
  disabled?: boolean;
  /** 안 주면 Provider 의 placement */
  placement?: Placement;
  /** 버튼과의 간격(px) @default 8 */
  gutter?: number;
  /** 화면 가장자리와 띄울 간격(px) @default 8 */
  overflowPadding?: number;
  /** @default "absolute" */
  strategy?: "absolute" | "fixed";
}

/** 버튼 하나와 그 하위 메뉴 — 요소를 만들지 않는다. */
function NavigationMenuRoot({
  children,
  value,
  disabled = false,
  placement,
  gutter = 8,
  overflowPadding = 8,
  strategy = "absolute",
}: NavigationMenuRootProps) {
  const provider = useNavigationMenuContext();
  const open = provider.value === value;
  const { setValue } = provider;
  const settings = React.useMemo(
    () => ({
      value,
      open,
      disabled,
      placement: placement ?? provider.placement,
      gutter,
      overflowPadding,
      strategy,
    }),
    [
      value,
      open,
      disabled,
      placement,
      provider.placement,
      gutter,
      overflowPadding,
      strategy,
    ],
  );
  return (
    <NavigationMenuRootContext.Provider value={settings}>
      <PopoverPrimitive.Root
        open={open}
        onOpenChange={(nextOpen) => {
          if (nextOpen && disabled) return;
          // 닫을 때는 아직 이 메뉴가 열려 있을 때만 비운다 — 옆의 메뉴가 먼저 열린 뒤에 늦게 온 닫힘이 그것까지 닫지 않게.
          setValue((previous) =>
            nextOpen ? value : previous === value ? null : previous,
          );
        }}
      >
        {children}
      </PopoverPrimitive.Root>
    </NavigationMenuRootContext.Provider>
  );
}

export type NavigationMenuTriggerProps = PopoverPrimitive.Trigger.Props;

function NavigationMenuTrigger(props: NavigationMenuTriggerProps) {
  const provider = useNavigationMenuContext();
  const { disabled } = useNavigationMenuRootContext();
  return (
    <PopoverPrimitive.Trigger
      data-slot="navigation-menu-trigger"
      disabled={disabled}
      openOnHover
      delay={provider.value === null ? provider.openDelay : 0}
      closeDelay={provider.closeDelay}
      {...props}
    />
  );
}

// 커지고 줄어드는 기준점 — 버튼 쪽 변, 맞춘 쪽 모서리.
const TRANSFORM_ORIGIN = [
  "data-[side=top]:origin-bottom data-[side=bottom]:origin-top data-[side=left]:origin-right data-[side=right]:origin-left",
  "data-[side=top]:data-[align=start]:origin-bottom-left data-[side=top]:data-[align=end]:origin-bottom-right",
  "data-[side=bottom]:data-[align=start]:origin-top-left data-[side=bottom]:data-[align=end]:origin-top-right",
  "data-[side=left]:data-[align=start]:origin-top-right data-[side=left]:data-[align=end]:origin-bottom-right",
  "data-[side=right]:data-[align=start]:origin-top-left data-[side=right]:data-[align=end]:origin-bottom-left",
].join(" ");

const contentVariants = cva(
  [
    "overflow-hidden rounded-r5 bg-bg-layer-floating shadow-s3 outline-none",
    TRANSFORM_ORIGIN,
    `data-open:animate-[seed-enter_var(--motion-duration-d3)_var(--motion-ease-enter)]
    [--seed-enter-opacity:0] [--seed-enter-scale:0.95]`,
    `data-closed:animate-[seed-exit_var(--motion-duration-d2)_var(--motion-ease-exit)_forwards]
    [--seed-exit-opacity:0] [--seed-exit-scale:0.95]`,
    // 옆의 메뉴에서 옮겨 올 때는 움직임 없이 바로 바꾼다.
    "data-[swap]:[animation-duration:0s]!",
  ],
  {
    variants: {
      // 한 단의 폭 — 여러 단이면 단마다 이 폭이고, 메뉴는 단을 다 담는 폭(w-max)이 된다.
      size: {
        medium: "[--navigation-menu-column-width:240px]",
        small: "[--navigation-menu-column-width:200px]",
        responsive: `[--navigation-menu-column-width:240px]
        min-[1280px]:[--navigation-menu-column-width:200px]`,
      },
      multiColumn: {
        false: "w-(--navigation-menu-column-width)",
        true: "w-max",
      },
    },
    defaultVariants: { size: "medium", multiColumn: false },
  },
);

// 메뉴의 단 수 — 묶음의 줄(NavigationMenuGroupItems)이 따른다.
const NavigationMenuColumnsContext = React.createContext(1);

export interface NavigationMenuContentProps
  extends PopoverPrimitive.Popup.Props {
  /** 메뉴를 그려 넣을 곳 — 안 주면 body */
  positionerContainer?: PopoverPrimitive.Portal.Props["container"];
  /**
   * 줄을 몇 단으로 놓을지 — 줄이 많아도 스크롤 없이 한눈에 보이게 한다. 줄은 위에서 아래로 채운 뒤 옆 단으로 넘어간다
   * (묶음의 줄을 NavigationMenuGroupItems 로 감쌀 때). 여러 단이면 화면 높이가 모자랄 때만 스크롤한다. @default 1
   */
  columns?: number;
}

function NavigationMenuContent({
  children,
  positionerContainer,
  className,
  columns = 1,
  ...props
}: NavigationMenuContentProps) {
  const { size, instant } = useNavigationMenuContext();
  const { placement, gutter, overflowPadding, strategy } =
    useNavigationMenuRootContext();
  return (
    <PopoverPrimitive.Portal container={positionerContainer}>
      <PopoverPrimitive.Positioner
        data-slot="navigation-menu-positioner"
        {...splitPlacement(placement)}
        sideOffset={gutter}
        collisionPadding={overflowPadding}
        positionMethod={strategy}
        className="z-[calc(99999+var(--z-index-offset,0))] outline-none"
      >
        <PopoverPrimitive.Popup
          data-slot="navigation-menu-content"
          data-swap={instant ? "" : undefined}
          // 마우스로 열었을 때는 초점을 가져오지 않는다 — 키보드로 열었을 때만 안으로 옮긴다.
          initialFocus={(openType) => openType === "keyboard"}
          className={cn(
            contentVariants({ size, multiColumn: columns > 1 }),
            className,
          )}
          {...props}
        >
          {/* 화면에 남은 높이가 모자라도 200px 까지만 줄인다 — 그보다 낮으면 안에서 스크롤한다. 한 단일 때는 480px 에서 멈춘다. */}
          <div
            data-slot="navigation-menu-scroll-area"
            className={cn(
              "box-border flex flex-col gap-x2 overflow-y-auto py-x2",
              columns > 1
                ? "max-h-[max(200px,var(--available-height,480px))]"
                : "max-h-[min(480px,max(200px,var(--available-height,480px)))]",
            )}
          >
            <NavigationMenuColumnsContext.Provider value={columns}>
              {children}
            </NavigationMenuColumnsContext.Provider>
          </div>
        </PopoverPrimitive.Popup>
      </PopoverPrimitive.Positioner>
    </PopoverPrimitive.Portal>
  );
}

// 묶음이 제 이름표를 이름으로 삼게 잇는다.
const NavigationMenuGroupContext = React.createContext<{
  labelId: string;
  setHasLabel: (has: boolean) => void;
} | null>(null);

// 이어지는 묶음 사이에는 선을 긋는다.
const GROUP_DIVIDER = [
  "[[data-slot=navigation-menu-group]+&]:before:block [[data-slot=navigation-menu-group]+&]:before:content-['']",
  "[[data-slot=navigation-menu-group]+&]:before:mx-x4 [[data-slot=navigation-menu-group]+&]:before:mb-x2",
  "[[data-slot=navigation-menu-group]+&]:before:h-px [[data-slot=navigation-menu-group]+&]:before:shrink-0 [[data-slot=navigation-menu-group]+&]:before:bg-stroke-neutral-muted",
].join(" ");

export type NavigationMenuGroupProps = React.ComponentProps<"div">;

function NavigationMenuGroup({
  className,
  ...props
}: NavigationMenuGroupProps) {
  const labelId = React.useId();
  const [hasLabel, setHasLabel] = React.useState(false);
  const context = React.useMemo(() => ({ labelId, setHasLabel }), [labelId]);
  return (
    <NavigationMenuGroupContext.Provider value={context}>
      <div
        role="group"
        aria-labelledby={hasLabel ? labelId : undefined}
        data-slot="navigation-menu-group"
        className={cn("flex flex-col", GROUP_DIVIDER, className)}
        {...props}
      />
    </NavigationMenuGroupContext.Provider>
  );
}

export type NavigationMenuGroupItemsProps = React.ComponentProps<"div">;

/** 묶음의 줄들 — 메뉴가 여러 단(NavigationMenuContent 의 columns)이면 위에서 아래로 채운 뒤 옆 단으로 넘어간다 */
function NavigationMenuGroupItems({
  className,
  style,
  children,
  ...props
}: NavigationMenuGroupItemsProps) {
  const columns = React.useContext(NavigationMenuColumnsContext);
  const rows = Math.ceil(React.Children.count(children) / columns);
  return (
    <div
      data-slot="navigation-menu-group-items"
      className={cn(
        columns > 1 ? "grid grid-flow-col" : "flex flex-col",
        className,
      )}
      style={
        columns > 1
          ? {
              gridTemplateRows: `repeat(${rows}, auto)`,
              gridTemplateColumns: `repeat(${columns}, minmax(var(--navigation-menu-column-width), max-content))`,
              ...style,
            }
          : style
      }
      {...props}
    >
      {children}
    </div>
  );
}

const SMALL_LABEL = "px-x4 py-x2 text-t3 font-regular";
const MEDIUM_LABEL = "px-x4 py-x2.5 text-t4 font-medium";

const groupLabelVariants = cva("text-fg-neutral-subtle", {
  variants: {
    size: {
      medium: MEDIUM_LABEL,
      small: SMALL_LABEL,
      responsive: `${MEDIUM_LABEL} min-[1280px]:px-x4 min-[1280px]:py-x2
      min-[1280px]:text-t3 min-[1280px]:font-regular`,
    },
  },
  defaultVariants: { size: "medium" },
});

export type NavigationMenuGroupLabelProps = React.ComponentProps<"div">;

function NavigationMenuGroupLabel({
  className,
  ...props
}: NavigationMenuGroupLabelProps) {
  const { size } = useNavigationMenuContext();
  const group = React.useContext(NavigationMenuGroupContext);
  if (!group)
    throw new Error(
      "NavigationMenuGroupLabel 은 NavigationMenuGroup 안에서 쓴다.",
    );
  const { setHasLabel } = group;
  React.useEffect(() => {
    setHasLabel(true);
    return () => setHasLabel(false);
  }, [setHasLabel]);
  return (
    <div
      role="presentation"
      id={group.labelId}
      data-slot="navigation-menu-group-label"
      className={cn(groupLabelVariants({ size }), className)}
      {...props}
    />
  );
}

const itemVariants = cva(
  [
    `group/navigation-menu-item relative isolate m-0 flex cursor-default
    items-center [border:none] [background:none] text-start font-[inherit]
    text-inherit no-underline outline-none select-none`,
    "scroll-mt-x2 scroll-mb-x2",
    `[--prefix-icon-color:var(--fg-neutral)]
    [--suffix-icon-color:var(--fg-neutral)]`,
    // 바탕 — 손을 대면 양옆이 x2 만큼 들어간 둥근 칸이 된다.
    "before:absolute before:inset-0 before:-z-1 before:content-['']",
    `before:transition-[background-color,inset-inline,border-radius]
    before:duration-color-transition before:ease-easing`,
    `not-data-disabled:engaged:before:inset-x-x2
    not-data-disabled:engaged:before:rounded-r3
    not-data-disabled:engaged:before:bg-bg-transparent-pressed`,
    // 누르면 바탕은 그대로 두고 안쪽만 줄인다.
    "not-data-disabled:pressed:[--content-scale:var(--feedback-scale)]",
    // 초점 링
    `after:absolute after:inset-x-x2 after:inset-y-0 after:rounded-r3
    after:content-['']`,
    `after:outline-(length:--dimension-x0_5)
    after:-outline-offset-(--dimension-x0_5) after:outline-transparent
    after:outline-solid`,
    `after:transition-[outline-color] after:duration-d3 after:ease-easing
    focused:after:outline-stroke-focus-ring`,
    `data-disabled:cursor-not-allowed
    data-disabled:[--prefix-icon-color:var(--fg-disabled)]
    data-disabled:[--suffix-icon-color:var(--fg-disabled)]`,
  ],
  {
    variants: {
      size: {
        medium: `gap-x3 px-x4 py-x3 [--prefix-icon-size:22px]
        [--suffix-icon-size:18px]`,
        small: `gap-x2 px-x4 py-x2.5 [--prefix-icon-size:18px]
        [--suffix-icon-size:16px]`,
        responsive: [
          `gap-x3 px-x4 py-x3 [--prefix-icon-size:22px]
          [--suffix-icon-size:18px]`,
          `min-[1280px]:gap-x2 min-[1280px]:px-x4 min-[1280px]:py-x2.5
          min-[1280px]:[--prefix-icon-size:18px]
          min-[1280px]:[--suffix-icon-size:16px]`,
        ],
      },
    },
    defaultVariants: { size: "medium" },
  },
);

const itemLabelVariants = cva(
  `font-regular text-fg-neutral
  group-data-disabled/navigation-menu-item:text-fg-disabled`,
  {
    variants: {
      size: {
        medium: "text-t5",
        small: "text-t4",
        responsive: "text-t5 min-[1280px]:text-t4",
      },
    },
    defaultVariants: { size: "medium" },
  },
);

const itemDescriptionVariants = cva(
  `font-regular text-fg-neutral-subtle
  group-data-disabled/navigation-menu-item:text-fg-disabled`,
  {
    variants: {
      size: {
        medium: "text-t3",
        small: "text-t2",
        responsive: "text-t3 min-[1280px]:text-t2",
      },
    },
    defaultVariants: { size: "medium" },
  },
);

// 줄어드는 안쪽 상자 — 줄의 배치를 그대로 물려받아, 상자가 없을 때와 같은 자리에 놓인다.
const CONTENT_SCALE = [
  "min-h-0 min-w-0 flex-auto self-stretch justify-self-stretch [grid-area:1/1/-1/-1] [display:inherit] [flex-direction:inherit] [flex-wrap:inherit] gap-[inherit]",
  "[align-content:inherit] [align-items:inherit] [justify-content:inherit] [justify-items:inherit]",
  "scale-(--content-scale) [transition:var(--feedback-scale-transition)]",
].join(" ");

export interface NavigationMenuItemProps extends Omit<
  React.ComponentProps<"button">,
  "children"
> {
  /** 지금 화면의 줄 */
  current?: boolean;
  /** 안 주면 Provider 의 size */
  size?: MenuSize;
  prefixIcon?: React.ReactElement;
  label: React.ReactNode;
  description?: React.ReactNode;
  suffixIcon?: React.ReactElement;
}

function NavigationMenuItem({
  className,
  current,
  disabled,
  size: sizeProp,
  prefixIcon,
  label,
  description,
  suffixIcon,
  onClick,
  ref,
  ...props
}: NavigationMenuItemProps) {
  const provider = useNavigationMenuContext();
  const size = sizeProp ?? provider.size;
  const { scaleFeedbackRef, scaleFeedbackClassName } =
    useScaleFeedback<HTMLButtonElement>(ref);
  return (
    <button
      ref={scaleFeedbackRef}
      type="button"
      data-slot="navigation-menu-item"
      data-current={current ? "" : undefined}
      data-disabled={disabled ? "" : undefined}
      aria-current={current ? "page" : undefined}
      disabled={disabled}
      className={cn(
        scaleFeedbackClassName,
        "[--content-scale:1]",
        itemVariants({ size }),
        className,
      )}
      onClick={(event) => {
        onClick?.(event);
        // 줄을 고르면 메뉴를 닫는다.
        provider.setValue(null);
      }}
      {...props}
    >
      <span data-slot="navigation-menu-item-content" className={CONTENT_SCALE}>
        {prefixIcon ? <PrefixIcon svg={prefixIcon} /> : null}
        <div
          data-slot="navigation-menu-item-body"
          className="flex grow flex-col gap-x0.5"
        >
          <span
            data-slot="navigation-menu-item-label"
            className={itemLabelVariants({ size })}
          >
            {label}
          </span>
          {description ? (
            <span
              data-slot="navigation-menu-item-description"
              className={itemDescriptionVariants({ size })}
            >
              {description}
            </span>
          ) : null}
        </div>
        {suffixIcon ? <SuffixIcon svg={suffixIcon} /> : null}
      </span>
    </button>
  );
}

export {
  NavigationMenuProvider,
  NavigationMenuRoot,
  NavigationMenuTrigger,
  NavigationMenuContent,
  NavigationMenuGroup,
  NavigationMenuGroupLabel,
  NavigationMenuGroupItems,
  NavigationMenuItem,
};
