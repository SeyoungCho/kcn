import * as React from "react";
import IconChevronUpSmallFill from "@karrotmarket/react-monochrome-icon/IconChevronUpSmallFill";
import IconSquareSplitedVerticalLeftLine from "@karrotmarket/react-monochrome-icon/IconSquareSplitedVerticalLeftLine";
import { cva } from "class-variance-authority";
import type { VariantProps } from "class-variance-authority";

import {
  HelpBubbleTooltipDelayGroup,
  HelpBubbleTooltipTriggerPortal,
} from "@/components/ui/help-bubble";
import { Icon } from "@/components/ui/icon";
import {
  NavigationMenuContent,
  NavigationMenuGroup,
  NavigationMenuGroupItems,
  NavigationMenuGroupLabel,
  NavigationMenuItem,
  NavigationMenuProvider,
  NavigationMenuRoot,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";
import { cn } from "@/lib/utils";

// 사이드 메뉴 — 접으면 아이콘만 남고(56px), 펼치면 이름까지 보인다(240px).
// 접힘 상태는 Provider 가 쥐고, 메뉴 밖(상단 줄의 접기 버튼 …)에서도 useSideNavigationContext 로 읽고 바꾼다.

// 사이드 메뉴가 저절로 접히고 펼쳐지는 경계 — 이보다 좁아지면 접고, 넓어지면 펼친다.
const WIDE_SCREEN = "(min-width: 1280px)";

interface SideNavigationContextValue {
  collapsed: boolean;
  setCollapsed: (next: boolean | ((previous: boolean) => boolean)) => void;
  /** 접히거나 펼쳐지는 중(폭이 바뀌는 동안) */
  transitioning: boolean;
  /** 폭이 다 바뀌었다 — 메뉴의 뿌리가 알린다 */
  endTransition: () => void;
}

const SideNavigationContext =
  React.createContext<SideNavigationContextValue | null>(null);

function useSideNavigationContext() {
  const context = React.useContext(SideNavigationContext);
  if (!context)
    throw new Error("사이드 메뉴의 부품은 SideNavigationProvider 안에서 쓴다.");
  return context;
}

type State = "collapsed" | "expanded";
const useNavigationState = (): State =>
  useSideNavigationContext().collapsed ? "collapsed" : "expanded";
const flag = (on: boolean | undefined) => (on ? ("" as const) : undefined);

// ── 상태 ─────────────────────────────────────────────────────────────────────

export interface SideNavigationProviderProps {
  children: React.ReactNode;
  /** 접힘 — 주면 바깥이 쥔다 */
  collapsed?: boolean;
  /** @default false */
  defaultCollapsed?: boolean;
  onCollapsedChange?: (collapsed: boolean) => void;
}

function SideNavigationProvider({
  children,
  collapsed: collapsedProp,
  defaultCollapsed = false,
  onCollapsedChange,
}: SideNavigationProviderProps) {
  const [innerCollapsed, setInnerCollapsed] = React.useState(defaultCollapsed);
  const collapsed = collapsedProp ?? innerCollapsed;
  const controlled = collapsedProp !== undefined;

  // 바깥에서 건넨 함수 · 지금 값은 ref 로 읽어, setCollapsed 가 그릴 때마다 새것이 되지 않게 한다.
  const latest = React.useRef({ collapsed, onCollapsedChange });
  latest.current = { collapsed, onCollapsedChange };
  const setCollapsed = React.useCallback<
    SideNavigationContextValue["setCollapsed"]
  >(
    (next) => {
      const previous = latest.current.collapsed;
      const value = typeof next === "function" ? next(previous) : next;
      if (value === previous) return;
      if (!controlled) setInnerCollapsed(value);
      latest.current.onCollapsedChange?.(value);
    },
    [controlled],
  );

  // 접힘이 바뀌면 폭이 다 바뀔 때까지 '바뀌는 중'이다 — 그동안에는 접힌 모양의 말풍선을 붙이지 않는다.
  const [transitioning, setTransitioning] = React.useState(false);
  const previousCollapsed = React.useRef(collapsed);
  if (previousCollapsed.current !== collapsed) {
    previousCollapsed.current = collapsed;
    if (!transitioning) setTransitioning(true);
  }
  const endTransition = React.useCallback(() => setTransitioning(false), []);

  React.useEffect(() => {
    const query = window.matchMedia(WIDE_SCREEN);
    const follow = (event: MediaQueryListEvent) => setCollapsed(!event.matches);
    query.addEventListener("change", follow);
    return () => query.removeEventListener("change", follow);
  }, [setCollapsed]);

  const context = React.useMemo(
    () => ({ collapsed, setCollapsed, transitioning, endTransition }),
    [collapsed, setCollapsed, transitioning, endTransition],
  );
  return (
    <SideNavigationContext.Provider value={context}>
      {children}
    </SideNavigationContext.Provider>
  );
}

// ── 틀 ───────────────────────────────────────────────────────────────────────

// 접고 펼치는 움직임은 모두 200ms, 빠르기는 브라우저 기본(ease)이다 — SEED 가 그렇게 적어 두었다.
const rootVariants = cva(
  `relative flex h-full w-60 shrink-0 flex-col overflow-x-hidden
  [transition:width_200ms] data-[side-navigation-state=collapsed]:w-x14`,
  {
    variants: {
      tone: {
        neutral:
          "bg-gray-100 shadow-[inset_-1px_0_0_0_var(--stroke-neutral-muted)]",
        transparent: "",
      },
    },
    defaultVariants: { tone: "neutral" },
  },
);

export interface SideNavigationRootProps
  extends React.ComponentProps<"nav">, VariantProps<typeof rootVariants> {}

function SideNavigationRoot({
  className,
  tone,
  children,
  onTransitionEnd,
  ...props
}: SideNavigationRootProps) {
  const { endTransition } = useSideNavigationContext();
  return (
    <nav
      data-slot="side-navigation"
      data-side-navigation-state={useNavigationState()}
      className={cn(rootVariants({ tone }), className)}
      onTransitionEnd={(event) => {
        onTransitionEnd?.(event);
        // 안쪽 요소의 움직임이 끝난 것은 세지 않는다.
        if (event.target === event.currentTarget) endTransition();
      }}
      {...props}
    >
      {/* 접힌 메뉴의 말풍선은 하나가 떠 있으면 옆의 것이 기다리지 않고 바로 뜬다. */}
      <HelpBubbleTooltipDelayGroup>
        {/* 접혔을 때 하위 메뉴는 줄의 오른쪽에 뜬다. */}
        <NavigationMenuProvider placement="right-start" size="responsive">
          {children}
        </NavigationMenuProvider>
      </HelpBubbleTooltipDelayGroup>
    </nav>
  );
}

export type SideNavigationHeaderProps = React.ComponentProps<"div">;

function SideNavigationHeader({
  className,
  ...props
}: SideNavigationHeaderProps) {
  return (
    <div
      data-slot="side-navigation-header"
      data-side-navigation-state={useNavigationState()}
      className={cn("box-border min-h-x16 shrink-0 p-x2", className)}
      {...props}
    />
  );
}

export type SideNavigationContentProps = React.ComponentProps<"div">;

function SideNavigationContent({
  className,
  ref,
  ...props
}: SideNavigationContentProps) {
  // 스크롤해 내려가 있으면 위에 금을 긋는다.
  const elementRef = React.useRef<HTMLDivElement | null>(null);
  const [scrolled, setScrolled] = React.useState(false);
  React.useEffect(() => {
    const element = elementRef.current;
    if (!element) return undefined;
    const check = () => setScrolled(element.scrollTop > 0);
    check();
    element.addEventListener("scroll", check);
    const observer = new ResizeObserver(check);
    observer.observe(element);
    return () => {
      element.removeEventListener("scroll", check);
      observer.disconnect();
    };
  }, []);
  const setRefs = React.useCallback(
    (node: HTMLDivElement | null) => {
      elementRef.current = node;
      if (typeof ref === "function") ref(node);
      else if (ref) ref.current = node;
    },
    [ref],
  );

  return (
    <div
      ref={setRefs}
      data-slot="side-navigation-content"
      data-scrolled={flag(scrolled)}
      data-side-navigation-state={useNavigationState()}
      className={cn(
        "flex flex-1 flex-col gap-x2 overflow-y-auto px-x2 pt-x2 pb-x6",
        // 아래 끝은 흐려지며 사라진다.
        "mask-[linear-gradient(to_top,transparent_0,black_24px)]",
        `[scrollbar-color:var(--bg-neutral-weak-alpha)_transparent]
        scrollbar-thin`,
        "[transition:gap_200ms,box-shadow_var(--motion-duration-color-transition)_var(--motion-ease-easing)]",
        "data-scrolled:shadow-[inset_0_1px_0_0_var(--stroke-neutral-muted)]",
        `data-[side-navigation-state=collapsed]:gap-0
        data-[side-navigation-state=collapsed]:scrollbar-none`,
        className,
      )}
      {...props}
    />
  );
}

export type SideNavigationFooterProps = React.ComponentProps<"div">;

function SideNavigationFooter({
  className,
  ...props
}: SideNavigationFooterProps) {
  return (
    <div
      data-slot="side-navigation-footer"
      data-side-navigation-state={useNavigationState()}
      className={cn("shrink-0 p-x2 empty:hidden", className)}
      {...props}
    />
  );
}

export type SideNavigationInsetProps = React.ComponentProps<"div">;

/** 사이드 메뉴 옆의 본문 자리 — 남은 폭을 다 차지하고 안에서 스크롤한다. */
function SideNavigationInset({
  className,
  ...props
}: SideNavigationInsetProps) {
  return (
    <div
      data-slot="side-navigation-inset"
      className={cn("grow overflow-y-auto", className)}
      {...props}
    />
  );
}

export type SideNavigationTriggerProps = Omit<
  React.ComponentProps<"button">,
  "children"
>;

/** 접기 · 펼치기 버튼 — 메뉴의 오른쪽 위에 놓인다. */
function SideNavigationTrigger({
  className,
  onClick,
  ...props
}: SideNavigationTriggerProps) {
  const { collapsed, setCollapsed } = useSideNavigationContext();
  return (
    <button
      type="button"
      data-slot="side-navigation-trigger"
      data-side-navigation-state={useNavigationState()}
      aria-label={collapsed ? "사이드바 열기" : "사이드바 닫기"}
      className={cn(
        `absolute top-x3 right-x3 inline-flex min-h-x10 min-w-x10 cursor-pointer
        items-center justify-center rounded-[8px] border-none bg-transparent
        p-x2.5`,
        "[--icon-color:var(--fg-neutral-subtle)] [--icon-size:18px]",
        `outline-solid outline-(length:--dimension-x0_5)
        outline-offset-(--dimension-x0_5) outline-transparent
        focused:outline-stroke-focus-ring`,
        "[transition:right_200ms,background-color_200ms,outline-color_var(--motion-duration-d3)_var(--motion-ease-easing)]",
        `engaged:bg-bg-transparent-pressed
        data-[side-navigation-state=collapsed]:right-x2`,
        className,
      )}
      onClick={(event) => {
        onClick?.(event);
        if (!event.defaultPrevented) setCollapsed((previous) => !previous);
      }}
      {...props}
    >
      <Icon svg={<IconSquareSplitedVerticalLeftLine />} />
    </button>
  );
}

// ── 메뉴 줄 ──────────────────────────────────────────────────────────────────

// 글꼴(font-family)과 위아래 안쪽 여백은 SEED 도 정하지 않는다 — 브라우저의 버튼 기본값이거나 화면이 버튼에 정해 둔 값이다.
const ITEM = [
  // 줄 높이는 최소 44px — 이름이 길어 두 줄이 되면 늘어난다(한 줄이면 늘 44px)
  "relative flex min-h-11 w-full items-center gap-x3 overflow-hidden rounded-[10px] border-none px-x2 text-left outline-none [background:none]",
  "scroll-mt-x2 scroll-mb-x6 [transition:padding_200ms,background-color_200ms]",
  "data-disabled:cursor-not-allowed not-data-disabled:cursor-pointer",
  // 손을 댔을 때의 바탕과 초점 링 — 접히면 아이콘만 한 칸(40px)으로 줄어든다.
  "before:absolute before:inset-0 before:rounded-[10px] before:content-['']",
  "before:outline-solid before:outline-(length:--dimension-x0_5) before:-outline-offset-(--dimension-x0_5) before:outline-transparent focused:before:outline-stroke-focus-ring",
  "before:[transition:background-color_200ms,outline-color_var(--motion-duration-d3)_var(--motion-ease-easing)]",
  "data-[side-navigation-state=collapsed]:before:right-[unset] data-[side-navigation-state=collapsed]:before:w-x10",
  "not-data-disabled:not-data-current:engaged:before:bg-bg-transparent-pressed",
  // 지금 화면의 줄
  "data-current:bg-bg-transparent-selected data-current:not-data-disabled:engaged:bg-bg-transparent-selected-pressed",
  "data-[side-navigation-state=collapsed]:px-x2.5",
].join(" ");

// 아이콘은 흐름에서 빼 둔다 — 접힐 때 이름이 사라져도 제자리에 남는다.
const ITEM_PREFIX_ICON = [
  "absolute top-1/2 [--icon-color:var(--palette-gray-600)] [--icon-size:var(--dimension-x5)] transform-[translateY(-50%)] [transition:color_200ms]",
  "not-data-disabled:data-current:[--icon-color:var(--fg-neutral)] data-disabled:[--icon-color:var(--fg-disabled)]",
].join(" ");

// 이름이 폭을 넘으면 말줄임 대신 줄을 바꿔 다 보인다(SEED) — 낱말 단위로, 아주 긴 낱말만 중간에서. 접혔거나 접히고 펴지는 동안은
// 한 줄 그대로(좁아지는 폭에서 글자마다 꺾여 줄 높이가 튀지 않게) — data-wrap 은 펼친 채 멈췄을 때만 붙는다.
const ITEM_LABEL = [
  "min-w-0 grow overflow-hidden p-x1.5 pl-[calc(20px+12px)] text-t4 font-medium text-ellipsis whitespace-nowrap text-fg-neutral-muted",
  "data-wrap:whitespace-normal data-wrap:break-keep data-wrap:wrap-anywhere",
  "[transition:opacity_200ms,color_200ms] data-[side-navigation-state=collapsed]:opacity-0",
  "not-data-disabled:data-current:text-fg-neutral data-disabled:text-fg-disabled",
].join(" ");

// 뒤 아이콘은 펼침 표시(위 화살표)의 자리다 — 펼쳐져 있지 않으면 뒤집어 둔다. 펼쳐지는 줄이 아니어도 늘 뒤집힌 채다(SEED 와 같다).
const ITEM_SUFFIX_ICON = [
  "[--icon-color:var(--fg-neutral-subtle)] [--icon-size:var(--dimension-x4)] [transition:transform_200ms,opacity_200ms] not-data-open:transform-[rotate(180deg)]",
  "data-[side-navigation-state=collapsed]:opacity-0",
].join(" ");

export interface SideNavigationItemButtonProps extends Omit<
  React.ComponentProps<"button">,
  "children"
> {
  /** 지금 화면의 줄 */
  current?: boolean;
  prefixIcon?: React.ReactElement;
  label: React.ReactNode;
  suffixIcon?: React.ReactElement;
  /** 접혔을 때 이름을 알려 주는 말풍선을 붙이지 않는다 — 이 버튼이 메뉴를 여는 버튼이라 이름이 메뉴에 보일 때 */
  disableTooltip?: boolean;
}

interface ItemPartsProps {
  state: State;
  current?: boolean;
  disabled?: boolean;
  /** 펼쳐지는 줄일 때만 — 뒤 아이콘이 따라 돈다 */
  open?: boolean;
  prefixIcon?: React.ReactElement;
  label: React.ReactNode;
  suffixIcon?: React.ReactElement;
}

// 줄의 안쪽 — 그냥 줄과 펼쳐지는 줄이 같이 쓴다.
function ItemParts({
  state,
  current,
  disabled,
  open,
  prefixIcon,
  label,
  suffixIcon,
}: ItemPartsProps) {
  const { transitioning } = useSideNavigationContext();
  const stateProps = {
    "data-side-navigation-state": state,
    "data-current": flag(current),
    "data-disabled": flag(disabled),
  };
  return (
    <>
      {prefixIcon ? (
        <Icon
          svg={prefixIcon}
          data-slot="side-navigation-item-prefix-icon"
          {...stateProps}
          className={ITEM_PREFIX_ICON}
        />
      ) : null}
      <span
        data-slot="side-navigation-item-label"
        {...stateProps}
        data-wrap={flag(state === "expanded" && !transitioning)}
        className={ITEM_LABEL}
      >
        {label}
      </span>
      {suffixIcon ? (
        <Icon
          svg={suffixIcon}
          data-slot="side-navigation-item-suffix-icon"
          {...stateProps}
          data-open={flag(open)}
          className={ITEM_SUFFIX_ICON}
        />
      ) : null}
    </>
  );
}

function SideNavigationItemButton({
  current,
  disabled,
  prefixIcon,
  label,
  suffixIcon,
  disableTooltip,
  className,
  ...props
}: SideNavigationItemButtonProps) {
  const { collapsed, transitioning } = useSideNavigationContext();
  const state: State = collapsed ? "collapsed" : "expanded";

  const button = (
    <button
      type="button"
      disabled={disabled}
      aria-current={current ? "page" : undefined}
      className={cn(ITEM, className)}
      {...props}
      // 메뉴를 여는 버튼으로 쓰일 때(MenuTrigger 의 render) 그쪽이 건넨 이름에 덮이지 않게 뒤에 둔다.
      data-slot="side-navigation-item"
      data-side-navigation-state={state}
      data-current={flag(current)}
      data-disabled={flag(disabled)}
    >
      <ItemParts
        state={state}
        current={current}
        disabled={disabled}
        prefixIcon={prefixIcon}
        label={label}
        suffixIcon={suffixIcon}
      />
    </button>
  );

  // 다 접힌 뒤에만 말풍선을 붙인다(접히는 중에는 이름이 아직 보인다).
  if (!collapsed || transitioning || disableTooltip) return button;
  return (
    <HelpBubbleTooltipTriggerPortal title={label} placement="right">
      {button}
    </HelpBubbleTooltipTriggerPortal>
  );
}

// ── 묶음 ─────────────────────────────────────────────────────────────────────

interface SideNavigationSubItem {
  key?: React.Key;
  label: React.ReactNode;
  current?: boolean;
  disabled?: boolean;
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
}

interface SideNavigationLeafItem extends SideNavigationSubItem {
  prefixIcon?: React.ReactElement;
  items?: never;
  defaultOpen?: never;
  open?: never;
  onOpenChange?: never;
}

interface SideNavigationParentItem {
  key?: React.Key;
  label: React.ReactNode;
  prefixIcon?: React.ReactElement;
  /** 하위 메뉴 — 펼쳤을 때는 줄 아래로 펼쳐지고, 접혔을 때는 옆에 뜬다 */
  items: SideNavigationSubItem[];
  /** 처음부터 펼쳐 둘지 */
  defaultOpen?: boolean;
  /** 펼침 — 주면 바깥이 쥔다(다른 곳에서 이 묶음의 화면으로 옮겨 갔을 때 펼쳐 주려면) */
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  current?: never;
  disabled?: never;
  onClick?: never;
}

export type SideNavigationGroupItem =
  | SideNavigationLeafItem
  | SideNavigationParentItem;

const subItems = (items: SideNavigationSubItem[]) =>
  items.map((sub, index) => (
    <SideNavigationItemButton
      key={sub.key ?? index}
      current={sub.current}
      disabled={sub.disabled}
      label={sub.label}
      onClick={sub.onClick}
    />
  ));

/** 펼쳐지는 줄 — 누르면 아래로 하위 메뉴가 펼쳐진다. 메뉴가 접히는 동안에는 닫아 둔다. */
function CollapsibleItem({ item }: { item: SideNavigationParentItem }) {
  const { collapsed, transitioning } = useSideNavigationContext();
  const state: State = collapsed ? "collapsed" : "expanded";
  const hasCurrentChild = item.items.some((sub) => sub.current);
  const current = collapsed && hasCurrentChild;

  const [innerOpen, setInnerOpen] = React.useState(item.defaultOpen ?? false);
  const userOpen = item.open ?? innerOpen;
  const toggle = () => {
    const next = !userOpen;
    if (item.open === undefined) setInnerOpen(next);
    item.onOpenChange?.(next);
  };
  // 처음 그릴 때는 바로 펼쳐 두고, 메뉴가 펼쳐지며 다시 그려질 때는 닫힌 데서 시작해 펼쳐지는 움직임을 보인다.
  const [ready, setReady] = React.useState(!collapsed && !transitioning);
  React.useEffect(() => setReady(!collapsed), [collapsed]);
  const open = !collapsed && ready && userOpen;

  // 하위 메뉴의 높이를 재서 그만큼 펼친다. 닫히는 움직임이 끝나면 화면에서 뺀다(hidden).
  const panelId = React.useId();
  const panelRef = React.useRef<HTMLDivElement | null>(null);
  const [height, setHeight] = React.useState<number | undefined>(undefined);
  const [visible, setVisible] = React.useState(open);
  React.useLayoutEffect(() => {
    const panel = panelRef.current;
    if (!panel) return undefined;
    const measure = () => setHeight(panel.scrollHeight);
    measure();
    const observer = new ResizeObserver(measure);
    observer.observe(panel);
    return () => observer.disconnect();
  }, [open]);
  React.useEffect(() => {
    if (open) setVisible(true);
  }, [open]);

  return (
    <div data-slot="side-navigation-item-collapsible" data-open={flag(open)}>
      <button
        type="button"
        data-slot="side-navigation-item"
        aria-expanded={open}
        aria-controls={panelId}
        className={ITEM}
        data-side-navigation-state={state}
        data-current={flag(current)}
        data-open={flag(open)}
        onClick={toggle}
      >
        <ItemParts
          state={state}
          current={current}
          open={open}
          prefixIcon={item.prefixIcon}
          label={item.label}
          suffixIcon={<IconChevronUpSmallFill />}
        />
      </button>
      <div
        ref={panelRef}
        id={panelId}
        data-slot="side-navigation-item-panel"
        data-side-navigation-state={state}
        data-open={flag(open)}
        hidden={!open && !visible}
        style={
          {
            "--collapsible-content-height":
              height === undefined ? undefined : open ? `${height}px` : "0px",
          } as React.CSSProperties
        }
        className="h-0 overflow-hidden opacity-0
          [transition:height_200ms,opacity_200ms]
          data-open:h-(--collapsible-content-height) data-open:opacity-100"
        onTransitionEnd={(event) => {
          if (event.propertyName === "height" && !open) setVisible(false);
        }}
      >
        {subItems(item.items)}
      </div>
    </div>
  );
}

// 옆에 뜨는 하위 메뉴의 한 단에 놓을 줄 수 — 넘으면 단을 늘려 스크롤 없이 한눈에 보이게 한다.
const FLYOUT_MAX_ROWS = 10;

/** 접힌 메뉴의 하위 메뉴 — 줄에 올리거나 누르면 옆에 뜬다. 줄이 많으면 여러 단으로 놓는다. */
function FlyoutItem({
  item,
  value,
}: {
  item: SideNavigationParentItem;
  value: string;
}) {
  return (
    <NavigationMenuRoot value={value}>
      <NavigationMenuTrigger
        render={
          <SideNavigationItemButton
            prefixIcon={item.prefixIcon}
            label={item.label}
            current={item.items.some((sub) => sub.current)}
            disableTooltip
          />
        }
      />
      <NavigationMenuContent
        columns={Math.ceil(item.items.length / FLYOUT_MAX_ROWS)}
      >
        <NavigationMenuGroup>
          <NavigationMenuGroupLabel>{item.label}</NavigationMenuGroupLabel>
          <NavigationMenuGroupItems>
            {item.items.map((sub, index) => (
              <NavigationMenuItem
                key={sub.key ?? index}
                current={sub.current}
                disabled={sub.disabled}
                onClick={sub.onClick}
                label={sub.label}
              />
            ))}
          </NavigationMenuGroupItems>
        </NavigationMenuGroup>
      </NavigationMenuContent>
    </NavigationMenuRoot>
  );
}

export interface SideNavigationGroupProps {
  ref?: React.Ref<HTMLDivElement>;
  /** 묶음의 이름 — 접히면 사라진다 */
  label?: React.ReactNode;
  items: SideNavigationGroupItem[];
}

function SideNavigationGroup({ ref, label, items }: SideNavigationGroupProps) {
  const { collapsed, transitioning } = useSideNavigationContext();
  const state: State = collapsed ? "collapsed" : "expanded";
  // 다 접힌 뒤에는 하위 메뉴를 옆에 띄운다.
  const flyout = collapsed && !transitioning;
  const groupId = React.useId();

  return (
    <div
      ref={ref}
      data-slot="side-navigation-group"
      data-side-navigation-state={state}
      className="flex flex-col"
    >
      {label ? (
        <div
          data-slot="side-navigation-group-label"
          data-side-navigation-state={state}
          className={cn(
            `pointer-events-none overflow-hidden p-x1.5 text-t4 font-bold
              text-ellipsis whitespace-nowrap text-fg-neutral-muted opacity-100`,
            "[transition:margin_200ms,opacity_200ms]",
            // 접히면 제 높이만큼 위로 당겨, 자리를 남기지 않고 사라진다.
            `data-[side-navigation-state=collapsed]:mt-[calc(-1*(1lh+6px*2))]
              data-[side-navigation-state=collapsed]:opacity-0`,
          )}
        >
          {label}
        </div>
      ) : null}
      {items.map((item, index) => {
        const key = item.key ?? index;
        if (!item.items) {
          return (
            <SideNavigationItemButton
              key={key}
              current={item.current}
              disabled={item.disabled}
              prefixIcon={item.prefixIcon}
              label={item.label}
              onClick={item.onClick}
            />
          );
        }
        return flyout ? (
          <FlyoutItem key={key} item={item} value={`${groupId}:${key}`} />
        ) : (
          <CollapsibleItem key={key} item={item} />
        );
      })}
    </div>
  );
}

export {
  SideNavigationProvider,
  SideNavigationRoot,
  SideNavigationHeader,
  SideNavigationContent,
  SideNavigationFooter,
  SideNavigationGroup,
  SideNavigationItemButton,
  SideNavigationTrigger,
  SideNavigationInset,
  useSideNavigationContext,
};
