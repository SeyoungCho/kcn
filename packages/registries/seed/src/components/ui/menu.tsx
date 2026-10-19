import * as React from "react";
import { Menu as MenuPrimitive } from "@base-ui/react/menu";
import { cva } from "class-variance-authority";
import type { VariantProps } from "class-variance-authority";

import IconCheckmarkFatFill from "@karrotmarket/react-monochrome-icon/IconCheckmarkFatFill";

import { PrefixIcon, SuffixIcon } from "@/components/ui/affix-icon";
import { Icon } from "@/components/ui/icon";
import { openOnRelease } from "@/lib/open-on-release";
import { useScaleFeedback } from "@/lib/use-scale-feedback";
import { cn } from "@/lib/utils";

type Side = "top" | "right" | "bottom" | "left";
type Align = "start" | "center" | "end";
type Placement = Side | `${Side}-${"start" | "end"}`;
type MenuSize = "medium" | "small" | "responsive";

/** 'top-start' → ['top', 'start'] — SEED 는 자리를 한 낱말로, Base UI 는 변과 맞춤으로 나눠 받는다. */
const splitPlacement = (placement: Placement) => {
  const [side, align = "center"] = placement.split("-") as [
    Side,
    Align | undefined,
  ];
  return { side, align };
};

/**
 * 화면 가장자리에 부딪힐 때 — 변(위 · 아래)은 뒤집고, 맞춤(start · end)은 뒤집지 않고 밀어 넣는다(SEED 와 같다).
 * Base UI 의 기본은 맞춤도 뒤집는데, 그 판정에 여백 + 1px 을 쓴다. 그래서 가장자리에서 꼭 여백만큼 떨어진 트리거
 * (사이드 메뉴 맨 아래의 계정 메뉴)에서 Base UI 만 맞춤을 end 로 뒤집었다.
 */
const COLLISION_AVOIDANCE = { side: "flip", align: "shift" } as const;

interface MenuSettings {
  placement: Placement;
  gutter: number;
  overflowPadding: number;
  strategy: "absolute" | "fixed";
  matchReferenceWidth: boolean;
  size: MenuSize;
}

// SEED 는 자리 잡는 값과 크기를 Root 가 받는다 — Root 가 받아 두었다가 Content · Item · GroupLabel 에 건넨다.
const MenuSettingsContext = React.createContext<MenuSettings>({
  placement: "bottom",
  gutter: 8,
  overflowPadding: 8,
  strategy: "absolute",
  matchReferenceWidth: false,
  size: "medium",
});

export interface MenuRootProps extends MenuPrimitive.Root.Props {
  /** 뜨는 자리 @default "bottom" */
  placement?: Placement;
  /** 기준 요소와의 간격(px) @default 8 */
  gutter?: number;
  /** 화면 가장자리와 띄울 간격(px) @default 8 */
  overflowPadding?: number;
  /** @default "absolute" */
  strategy?: "absolute" | "fixed";
  /** 메뉴의 폭을 기준 요소의 폭에 맞출지 @default false */
  matchReferenceWidth?: boolean;
  /** 'responsive' 는 1280px 부터 small, 그보다 좁으면 medium @default "medium" */
  size?: MenuSize;
}

function MenuRoot({
  placement = "bottom",
  gutter = 8,
  overflowPadding = 8,
  strategy = "absolute",
  matchReferenceWidth = false,
  size = "medium",
  ...props
}: MenuRootProps) {
  const settings = React.useMemo(
    () => ({
      placement,
      gutter,
      overflowPadding,
      strategy,
      matchReferenceWidth,
      size,
    }),
    [placement, gutter, overflowPadding, strategy, matchReferenceWidth, size],
  );
  return (
    <MenuSettingsContext.Provider value={settings}>
      {/* SEED 의 메뉴처럼 바깥을 막지 않고(modal 아님), 마우스를 올린 것과 키보드 초점을 따로 그린다. */}
      <MenuPrimitive.Root
        modal={false}
        highlightItemOnHover={false}
        {...props}
      />
    </MenuSettingsContext.Provider>
  );
}

export type MenuTriggerProps = MenuPrimitive.Trigger.Props;

function MenuTrigger(props: MenuTriggerProps) {
  return (
    <MenuPrimitive.Trigger data-slot="menu-trigger" {...openOnRelease(props)} />
  );
}

// 커지고 줄어드는 기준점 — SEED 처럼 기준 요소 쪽 변, 맞춘 쪽 모서리.
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
  ],
  {
    variants: {
      size: {
        medium: "w-60",
        small: "w-50",
        responsive: "w-60 min-[1280px]:w-50",
      },
      matchReferenceWidth: {
        true: "w-(--anchor-width) min-[1280px]:w-(--anchor-width)",
        false: "",
      },
    },
    defaultVariants: { size: "medium", matchReferenceWidth: false },
  },
);

export interface MenuContentProps extends MenuPrimitive.Popup.Props {
  /** 메뉴를 그려 넣을 곳 — 안 주면 body */
  positionerContainer?: MenuPrimitive.Portal.Props["container"];
}

function MenuContent({
  children,
  positionerContainer,
  className,
  ...props
}: MenuContentProps) {
  const {
    placement,
    gutter,
    overflowPadding,
    strategy,
    matchReferenceWidth,
    size,
  } = React.useContext(MenuSettingsContext);
  return (
    <MenuPrimitive.Portal container={positionerContainer}>
      <MenuPrimitive.Positioner
        data-slot="menu-positioner"
        {...splitPlacement(placement)}
        sideOffset={gutter}
        collisionPadding={overflowPadding}
        collisionAvoidance={COLLISION_AVOIDANCE}
        positionMethod={strategy}
        className="z-[calc(99999+var(--z-index-offset,0))] outline-none"
      >
        <MenuPrimitive.Popup
          data-slot="menu-content"
          className={cn(
            contentVariants({ size, matchReferenceWidth }),
            className,
          )}
          {...props}
        >
          {/* 화면에 남은 높이가 모자라도 200px 까지만 줄인다 — 그보다 낮으면 안에서 스크롤한다. */}
          <div
            data-slot="menu-scroll-area"
            className="box-border flex
              max-h-[min(480px,max(200px,var(--available-height,480px)))]
              flex-col gap-x2 overflow-y-auto py-x2"
          >
            {children}
          </div>
        </MenuPrimitive.Popup>
      </MenuPrimitive.Positioner>
    </MenuPrimitive.Portal>
  );
}

export type MenuGroupProps = MenuPrimitive.Group.Props;

// 이어지는 묶음 사이에는 선을 긋는다.
const GROUP_DIVIDER = [
  "[[data-slot=menu-group]+&]:before:block [[data-slot=menu-group]+&]:before:content-['']",
  "[[data-slot=menu-group]+&]:before:mx-x4 [[data-slot=menu-group]+&]:before:mb-x2",
  "[[data-slot=menu-group]+&]:before:h-px [[data-slot=menu-group]+&]:before:shrink-0 [[data-slot=menu-group]+&]:before:bg-stroke-neutral-muted",
].join(" ");

function MenuGroup({ className, ...props }: MenuGroupProps) {
  return (
    <MenuPrimitive.Group
      data-slot="menu-group"
      className={cn("flex flex-col", GROUP_DIVIDER, className)}
      {...props}
    />
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

export type MenuGroupLabelProps = MenuPrimitive.GroupLabel.Props;

function MenuGroupLabel({ className, ...props }: MenuGroupLabelProps) {
  const { size } = React.useContext(MenuSettingsContext);
  return (
    <MenuPrimitive.GroupLabel
      data-slot="menu-group-label"
      className={cn(groupLabelVariants({ size }), className)}
      {...props}
    />
  );
}

const itemVariants = cva(
  [
    `group/menu-item relative isolate m-0 flex cursor-default items-center
    border-none bg-none text-start font-[inherit] text-inherit no-underline
    outline-none select-none`,
    "scroll-mt-x2 scroll-mb-x2",
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
      tone: {
        neutral: `[--prefix-icon-color:var(--fg-neutral)]
        [--suffix-icon-color:var(--fg-neutral)]`,
        critical: `[--prefix-icon-color:var(--fg-critical)]
        [--suffix-icon-color:var(--fg-critical)]`,
      },
    },
    defaultVariants: { size: "medium", tone: "neutral" },
  },
);

const itemLabelVariants = cva(
  "font-regular group-data-disabled/menu-item:text-fg-disabled",
  {
    variants: {
      size: {
        medium: "text-t5",
        small: "text-t4",
        responsive: "text-t5 min-[1280px]:text-t4",
      },
      tone: { neutral: "text-fg-neutral", critical: "text-fg-critical" },
    },
    defaultVariants: { size: "medium", tone: "neutral" },
  },
);

const itemDescriptionVariants = cva(
  `font-regular text-fg-neutral-subtle
  group-data-disabled/menu-item:text-fg-disabled`,
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

// 줄어드는 안쪽 상자 — 줄(Item)의 배치를 그대로 물려받아, 상자가 없을 때와 같은 자리에 놓인다.
const CONTENT_SCALE = [
  "min-h-0 min-w-0 flex-auto [display:inherit] [flex-direction:inherit] [flex-wrap:inherit] gap-[inherit]",
  "[align-content:inherit] [align-items:inherit] [justify-content:inherit] [justify-items:inherit]",
  "scale-(--content-scale) [transition:var(--feedback-scale-transition)]",
].join(" ");

export interface MenuItemProps
  extends
    Omit<MenuPrimitive.Item.Props, "children" | "label">,
    Pick<VariantProps<typeof itemVariants>, "tone"> {
  /** 안 주면 MenuRoot 의 size */
  size?: MenuSize;
  prefixIcon?: React.ReactElement;
  label: React.ReactNode;
  description?: React.ReactNode;
  suffixIcon?: React.ReactElement;
  /** 글자를 쳐서 찾을 때 견줄 글 — 안 주면 줄에 보이는 글 */
  typeaheadLabel?: string;
}

function MenuItem({
  className,
  size: sizeProp,
  tone,
  prefixIcon,
  label,
  description,
  suffixIcon,
  typeaheadLabel,
  ref,
  ...props
}: MenuItemProps) {
  const settings = React.useContext(MenuSettingsContext);
  const size = sizeProp ?? settings.size;
  const { scaleFeedbackRef, scaleFeedbackClassName } = useScaleFeedback(ref);
  return (
    <MenuPrimitive.Item
      ref={scaleFeedbackRef}
      data-slot="menu-item"
      label={typeaheadLabel}
      className={cn(
        scaleFeedbackClassName,
        "[--content-scale:1]",
        itemVariants({ size, tone }),
        className,
      )}
      {...props}
    >
      <span data-slot="menu-item-content" className={CONTENT_SCALE}>
        {prefixIcon ? <PrefixIcon svg={prefixIcon} /> : null}
        <div data-slot="menu-item-body" className="flex grow flex-col gap-x0.5">
          <span
            data-slot="menu-item-label"
            className={itemLabelVariants({ size, tone })}
          >
            {label}
          </span>
          {description ? (
            <span
              data-slot="menu-item-description"
              className={itemDescriptionVariants({ size })}
            >
              {description}
            </span>
          ) : null}
        </div>
        {suffixIcon ? <SuffixIcon svg={suffixIcon} /> : null}
      </span>
    </MenuPrimitive.Item>
  );
}

export type MenuRadioGroupProps = MenuPrimitive.RadioGroup.Props;

/** 하나만 고르는 줄의 묶음 — 고른 값(value)과 바꿀 때(onValueChange)를 받는다. 제목 · 구분선은 바깥 MenuGroup 이 그린다. */
function MenuRadioGroup({ className, ...props }: MenuRadioGroupProps) {
  return (
    <MenuPrimitive.RadioGroup
      data-slot="menu-radio-group"
      className={cn("flex flex-col", className)}
      {...props}
    />
  );
}

// 고른 줄 끝의 체크 — 선택 상자의 고른 항목과 같은 모양(SelectItem 의 indicator)
const radioIndicatorVariants = cva(
  `flex shrink-0 [--icon-color:var(--fg-neutral)]
  group-data-disabled/menu-item:[--icon-color:var(--fg-disabled)]`,
  {
    variants: {
      size: {
        medium: "[--icon-size:var(--dimension-x3_5)]",
        small: "[--icon-size:var(--dimension-x3)]",
        responsive: `[--icon-size:var(--dimension-x3_5)]
        min-[1280px]:[--icon-size:var(--dimension-x3)]`,
      },
    },
    defaultVariants: { size: "medium" },
  },
);

export interface MenuRadioItemProps
  extends
    Omit<MenuPrimitive.RadioItem.Props, "children" | "label">,
    Pick<VariantProps<typeof itemVariants>, "tone"> {
  /** 안 주면 MenuRoot 의 size */
  size?: MenuSize;
  prefixIcon?: React.ReactElement;
  label: React.ReactNode;
  description?: React.ReactNode;
  /** 글자를 쳐서 찾을 때 견줄 글 — 안 주면 줄에 보이는 글 */
  typeaheadLabel?: string;
}

/**
 * 하나만 고르는 줄 — MenuItem 과 같은 모양에 고른 줄은 끝에 체크. 골라도 메뉴는 닫히지 않는다(바뀐 것을 바로 보게).
 * SEED 의 메뉴에는 없어 Base UI 의 RadioItem 으로 더했다.
 */
function MenuRadioItem({
  className,
  size: sizeProp,
  tone,
  prefixIcon,
  label,
  description,
  typeaheadLabel,
  ref,
  ...props
}: MenuRadioItemProps) {
  const settings = React.useContext(MenuSettingsContext);
  const size = sizeProp ?? settings.size;
  const { scaleFeedbackRef, scaleFeedbackClassName } = useScaleFeedback(ref);
  return (
    <MenuPrimitive.RadioItem
      ref={scaleFeedbackRef}
      data-slot="menu-radio-item"
      label={typeaheadLabel}
      className={cn(
        scaleFeedbackClassName,
        "[--content-scale:1]",
        itemVariants({ size, tone }),
        className,
      )}
      {...props}
    >
      <span data-slot="menu-item-content" className={CONTENT_SCALE}>
        {prefixIcon ? <PrefixIcon svg={prefixIcon} /> : null}
        <div data-slot="menu-item-body" className="flex grow flex-col gap-x0.5">
          <span
            data-slot="menu-item-label"
            className={itemLabelVariants({ size, tone })}
          >
            {label}
          </span>
          {description ? (
            <span
              data-slot="menu-item-description"
              className={itemDescriptionVariants({ size })}
            >
              {description}
            </span>
          ) : null}
        </div>
        <MenuPrimitive.RadioItemIndicator
          data-slot="menu-radio-item-indicator"
          className={radioIndicatorVariants({ size })}
        >
          <Icon svg={<IconCheckmarkFatFill />} />
        </MenuPrimitive.RadioItemIndicator>
      </span>
    </MenuPrimitive.RadioItem>
  );
}

export {
  MenuRoot,
  MenuTrigger,
  MenuContent,
  MenuGroup,
  MenuGroupLabel,
  MenuItem,
  MenuRadioGroup,
  MenuRadioItem,
};
