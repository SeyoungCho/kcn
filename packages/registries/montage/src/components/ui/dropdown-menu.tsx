import type * as React from "react";
import { Menu as MenuPrimitive } from "@base-ui/react/menu";
import { cva, type VariantProps } from "class-variance-authority";
import { CheckIcon } from "lucide-react";

import { cn } from "@/lib/utils";

// shadcn DropdownMenu 에 montage 의 메뉴 모양을 입혔다. 하위 메뉴(DropdownMenuSub*)는 두지 않았다.
// 메뉴는 트리거 아래 가운데에 열리고, 길면 스크롤된다. 묶음 제목(DropdownMenuLabel)은 스크롤해도 위에 붙어 남는다.
// 고른 항목(체크 · 라디오)은 글자가 굵고 파래지며 오른쪽에 체크가 붙는다 — variant 로 왼쪽 체크박스 · 라디오로 바꿀 수 있다.
// 오른쪽 값 · 아이콘은 DropdownMenuShortcut 에 넣는다.
// 아래에 붙는 버튼 줄은 DropdownMenuFooter 다. 여닫는 움직임은 없다.

type DropdownMenuProps = MenuPrimitive.Root.Props;

function DropdownMenu(props: DropdownMenuProps) {
  return <MenuPrimitive.Root data-slot="dropdown-menu" {...props} />;
}

function DropdownMenuPortal(props: MenuPrimitive.Portal.Props) {
  return <MenuPrimitive.Portal data-slot="dropdown-menu-portal" {...props} />;
}

function DropdownMenuTrigger(props: MenuPrimitive.Trigger.Props) {
  return <MenuPrimitive.Trigger data-slot="dropdown-menu-trigger" {...props} />;
}

type DropdownMenuContentProps = MenuPrimitive.Popup.Props &
  Pick<
    MenuPrimitive.Positioner.Props,
    "align" | "alignOffset" | "side" | "sideOffset"
  >;

// 높이 상한은 맞는 토큰이 없어 값을 그대로 쓴다
function DropdownMenuContent({
  align = "center",
  alignOffset = 0,
  side = "bottom",
  sideOffset = 10,
  className,
  ...props
}: DropdownMenuContentProps) {
  return (
    <MenuPrimitive.Portal>
      <MenuPrimitive.Positioner
        data-slot="dropdown-menu-positioner"
        className="isolate z-50 outline-none"
        align={align}
        alignOffset={alignOffset}
        side={side}
        sideOffset={sideOffset}
        collisionPadding={20}
      >
        <MenuPrimitive.Popup
          data-slot="dropdown-menu-content"
          className={cn(
            `flex max-h-[min(400px,var(--available-height))] w-80
            max-w-(--available-width) min-w-35 flex-col gap-1 overflow-x-hidden
            overflow-y-auto overscroll-contain rounded-16 border
            border-line-neutral-secondary-opaque bg-popover py-2
            text-popover-foreground shadow-sm outline-none
            has-data-[slot=dropdown-menu-footer]:pb-0`,
            className,
          )}
          {...props}
        />
      </MenuPrimitive.Positioner>
    </MenuPrimitive.Portal>
  );
}

function DropdownMenuGroup({ className, ...props }: MenuPrimitive.Group.Props) {
  return (
    <MenuPrimitive.Group
      data-slot="dropdown-menu-group"
      className={cn("flex flex-col gap-1", className)}
      {...props}
    />
  );
}

type DropdownMenuLabelProps = MenuPrimitive.GroupLabel.Props & {
  /** 앞에 아이콘이 있는 항목과 글자 시작을 맞춘다. */
  inset?: boolean;
};

// 메뉴 위 여백만큼 올려 붙여, 스크롤해도 맨 위에 남는다
function DropdownMenuLabel({
  className,
  inset,
  ...props
}: DropdownMenuLabelProps) {
  return (
    <MenuPrimitive.GroupLabel
      data-slot="dropdown-menu-label"
      data-inset={inset || undefined}
      className={cn(
        `sticky -top-2 z-10 bg-popover px-5 py-1 text-caption1 font-semibold
        break-keep text-muted-foreground data-inset:pl-13.5`,
        className,
      )}
      {...props}
    />
  );
}

// 항목은 메뉴 양옆을 비우고 놓이며, 마우스를 올리거나 누르면 양옆으로 조금 넓은 옅은 판이 깔린다(키보드로 옮기면 조금 더 짙다).
// 앞 아이콘은 회색이고 글자와 조금 더 떨어진다.
const dropdownMenuItemVariants = cva(
  `group/dropdown-menu-item relative isolate mx-5 flex min-h-12 cursor-pointer
  items-start gap-2 rounded-16 py-3.25 text-body2 font-medium break-keep
  wrap-break-word text-fg-neutral-primary outline-none select-none
  [--interaction-active:0.09] [--interaction-hover:0.0375]
  after:pointer-events-none after:absolute after:inset-y-0 after:-inset-x-3
  after:-z-10 after:rounded-[inherit] after:bg-fg-neutral-primary
  after:opacity-0 after:transition-opacity after:duration-150
  hover:after:opacity-(--interaction-hover) focus-visible:after:opacity-[0.06]
  active:after:opacity-(--interaction-active) data-disabled:pointer-events-none
  data-disabled:cursor-default data-disabled:text-fg-disable-primary
  data-inset:pl-8.5 [&_svg]:pointer-events-none [&_svg]:shrink-0
  [&_svg:not([class*='size-'])]:size-5.5
  [&_svg:not([class*='text-'])]:text-muted-foreground
  data-disabled:[&_svg:not([class*='text-'])]:text-fg-disable-primary
  [&>svg:first-child]:mr-1`,
  {
    variants: {
      variant: {
        default: "",
        destructive:
          "text-destructive [&_svg:not([class*='text-'])]:text-destructive",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  },
);

type DropdownMenuItemProps = MenuPrimitive.Item.Props &
  VariantProps<typeof dropdownMenuItemVariants> & {
    /** 앞에 아이콘이 있는 항목과 글자 시작을 맞춘다. */
    inset?: boolean;
  };

function DropdownMenuItem({
  className,
  inset,
  variant = "default",
  ...props
}: DropdownMenuItemProps) {
  return (
    <MenuPrimitive.Item
      data-slot="dropdown-menu-item"
      data-inset={inset || undefined}
      data-variant={variant}
      className={cn(dropdownMenuItemVariants({ variant }), className)}
      {...props}
    />
  );
}

// 고른 표시 — default 는 글자가 굵고 파래지며 오른쪽 끝에 체크가 붙는다.
// radio · checkbox 는 왼쪽의 동그라미 · 네모가 채워지고 글자는 그대로다.
const checkedTextClassName =
  "data-checked:font-semibold data-checked:text-fg-brand-primary";

// 동그라미 · 네모의 테두리 두께와 네모의 반경은 맞는 토큰이 없어 값을 그대로 쓴다
const dropdownMenuItemControlVariants = cva(
  `flex shrink-0 items-center justify-center bg-bg-neutral-primary
  inset-ring-[1.5px] inset-ring-line-neutral-primary
  group-data-checked/dropdown-menu-item:bg-primary
  group-data-disabled/dropdown-menu-item:opacity-43`,
  {
    variants: {
      variant: {
        radio: `my-px size-5 rounded-full after:size-2 after:rounded-full
        after:bg-white after:opacity-0
        group-data-checked/dropdown-menu-item:inset-ring-0
        group-data-checked/dropdown-menu-item:after:opacity-100`,
        checkbox: `mx-px my-0.5 size-4.5 rounded-[5px]
        transition-[background-color,box-shadow] duration-200
        group-data-checked/dropdown-menu-item:inset-ring-primary`,
      },
    },
  },
);

type DropdownMenuCheckboxItemProps = MenuPrimitive.CheckboxItem.Props & {
  /** 고른 표시. checkbox 는 왼쪽에 네모를 둔다. */
  variant?: "default" | "checkbox";
  /** 앞에 아이콘이 있는 항목과 글자 시작을 맞춘다. */
  inset?: boolean;
};

function DropdownMenuCheckboxItem({
  className,
  variant = "default",
  inset,
  children,
  ...props
}: DropdownMenuCheckboxItemProps) {
  return (
    <MenuPrimitive.CheckboxItem
      data-slot="dropdown-menu-checkbox-item"
      data-variant={variant}
      data-inset={inset || undefined}
      className={cn(
        dropdownMenuItemVariants(),
        variant === "default" && checkedTextClassName,
        className,
      )}
      {...props}
    >
      {variant === "checkbox" && (
        <span
          data-slot="dropdown-menu-checkbox-item-control"
          aria-hidden="true"
          className={dropdownMenuItemControlVariants({ variant })}
        >
          <CheckIcon
            strokeWidth={3}
            className="size-4 scale-75 text-white opacity-0
              transition-[opacity,scale] duration-200
              group-data-checked/dropdown-menu-item:scale-100
              group-data-checked/dropdown-menu-item:opacity-100"
          />
        </span>
      )}
      {children}
      {variant === "default" && (
        <MenuPrimitive.CheckboxItemIndicator
          data-slot="dropdown-menu-checkbox-item-indicator"
          className="ml-auto flex text-fg-brand-primary
            group-data-disabled/dropdown-menu-item:text-fg-disable-primary"
        >
          <CheckIcon strokeWidth={1.8} className="size-5.5 text-current" />
        </MenuPrimitive.CheckboxItemIndicator>
      )}
    </MenuPrimitive.CheckboxItem>
  );
}

function DropdownMenuRadioGroup({
  className,
  ...props
}: MenuPrimitive.RadioGroup.Props) {
  return (
    <MenuPrimitive.RadioGroup
      data-slot="dropdown-menu-radio-group"
      className={cn("flex flex-col gap-1", className)}
      {...props}
    />
  );
}

type DropdownMenuRadioItemProps = MenuPrimitive.RadioItem.Props & {
  /** 고른 표시. radio 는 왼쪽에 동그라미를 둔다. */
  variant?: "default" | "radio";
  /** 앞에 아이콘이 있는 항목과 글자 시작을 맞춘다. */
  inset?: boolean;
};

function DropdownMenuRadioItem({
  className,
  variant = "default",
  inset,
  children,
  ...props
}: DropdownMenuRadioItemProps) {
  return (
    <MenuPrimitive.RadioItem
      data-slot="dropdown-menu-radio-item"
      data-variant={variant}
      data-inset={inset || undefined}
      className={cn(
        dropdownMenuItemVariants(),
        variant === "default" && checkedTextClassName,
        className,
      )}
      {...props}
    >
      {variant === "radio" && (
        <span
          data-slot="dropdown-menu-radio-item-control"
          aria-hidden="true"
          className={dropdownMenuItemControlVariants({ variant })}
        />
      )}
      {children}
      {variant === "default" && (
        <MenuPrimitive.RadioItemIndicator
          data-slot="dropdown-menu-radio-item-indicator"
          className="ml-auto flex text-fg-brand-primary
            group-data-disabled/dropdown-menu-item:text-fg-disable-primary"
        >
          <CheckIcon strokeWidth={1.8} className="size-5.5 text-current" />
        </MenuPrimitive.RadioItemIndicator>
      )}
    </MenuPrimitive.RadioItem>
  );
}

function DropdownMenuSeparator({
  className,
  ...props
}: MenuPrimitive.Separator.Props) {
  return (
    <MenuPrimitive.Separator
      data-slot="dropdown-menu-separator"
      className={cn("mx-5 h-px shrink-0 bg-line-neutral-tertiary", className)}
      {...props}
    />
  );
}

// 항목 오른쪽 끝의 값 · 아이콘
function DropdownMenuShortcut({
  className,
  ...props
}: React.ComponentProps<"span">) {
  return (
    <span
      data-slot="dropdown-menu-shortcut"
      className={cn(
        `ml-auto flex shrink-0 items-center gap-2 text-body2 font-normal
        text-muted-foreground
        [&_svg:not([class*='text-'])]:text-fg-neutral-secondary`,
        className,
      )}
      {...props}
    />
  );
}

// 메뉴 아래에 붙어 남는 버튼 줄 — 버튼이 둘 이상이면 첫 버튼은 왼쪽, 나머지는 오른쪽에 놓인다.
// 글자 버튼(link)은 항목 글자와 시작을 맞춘다.
function DropdownMenuFooter({
  className,
  ...props
}: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="dropdown-menu-footer"
      className={cn(
        `sticky bottom-0 z-10 mt-1 flex h-14 shrink-0 items-center justify-end
        gap-2 border-t border-line-neutral-tertiary-opaque bg-popover px-3
        *:first:not-last:mr-auto *:data-[variant=link]:mx-2`,
        className,
      )}
      {...props}
    />
  );
}

export {
  DropdownMenu,
  DropdownMenuPortal,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuLabel,
  DropdownMenuItem,
  DropdownMenuCheckboxItem,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuFooter,
  dropdownMenuItemVariants,
  type DropdownMenuProps,
  type DropdownMenuContentProps,
  type DropdownMenuLabelProps,
  type DropdownMenuItemProps,
  type DropdownMenuCheckboxItemProps,
  type DropdownMenuRadioItemProps,
};
