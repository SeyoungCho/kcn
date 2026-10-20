import type * as React from "react";
import { Menu as MenuPrimitive } from "@base-ui/react/menu";
import { cva, type VariantProps } from "class-variance-authority";
import { CheckIcon } from "lucide-react";

import { cn } from "@/lib/utils";

// shadcn DropdownMenu 에 t-flavored 의 모양을 입혔다. 하위 메뉴(DropdownMenuSub*)는 두지 않았다.
// 오른쪽 아이콘은 DropdownMenuShortcut 에 넣는다.
// 열리고 닫힐 때 투명도 없이 크기만 0 ↔ 1 로 바뀐다. 항목을 누르면 0.96 으로 줄고 회색 판이 깔린다.

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

// 트리거에 붙여(간격 0) bottom-start 로 연다
function DropdownMenuContent({
  align = "start",
  alignOffset = 0,
  side = "bottom",
  sideOffset = 0,
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
      >
        {/* 반경 20px · 흐림 30px 은 맞는 토큰이 없어 값을 그대로 쓴다 */}
        <MenuPrimitive.Popup
          data-slot="dropdown-menu-content"
          className={cn(
            `group/dropdown-menu max-h-[min(60vh,var(--available-height))]
            max-w-[66vw] min-w-45.5 origin-(--transform-origin)
            overflow-x-hidden overflow-y-auto rounded-[20px] border
            border-popover/75 bg-popover/80 py-2.5 text-popover-foreground
            shadow-md backdrop-blur-[30px] transition-[scale] duration-280
            ease-[cubic-bezier(0.25,1,0.5,1)] outline-none
            data-ending-style:scale-0 data-starting-style:scale-0`,
            className,
          )}
          {...props}
        />
      </MenuPrimitive.Positioner>
    </MenuPrimitive.Portal>
  );
}

function DropdownMenuGroup(props: MenuPrimitive.Group.Props) {
  return <MenuPrimitive.Group data-slot="dropdown-menu-group" {...props} />;
}

type DropdownMenuLabelProps = MenuPrimitive.GroupLabel.Props & {
  /** 앞에 체크 칸이 있는 항목과 글자 시작을 맞춘다. */
  inset?: boolean;
};

// 체크 · 라디오 항목이 있는 메뉴에서는 머리글이 4px 왼쪽으로 붙는다
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
        `mb-1 px-5 py-2 text-t7 font-bold break-keep text-grey-500
        group-has-data-[slot=dropdown-menu-checkbox-item]/dropdown-menu:pl-4
        group-has-data-[slot=dropdown-menu-radio-item]/dropdown-menu:pl-4
        data-inset:pl-10.5`,
        className,
      )}
      {...props}
    />
  );
}

// 누르면 0.96 으로 줄고(150ms) 회색 판이 깔린다. 떼면 판이 300ms 에 걸쳐 고르게 사라진다.
// 마우스를 올려도 바뀌지 않는다 — 판은 누를 때와 키보드로 옮길 때만 보인다.
const dropdownMenuItemVariants = cva(
  `relative isolate flex cursor-default items-center gap-1.5 py-2 text-t5
  font-medium break-keep text-grey-700 transition-[scale] duration-150 ease-out
  outline-none select-none after:absolute after:inset-0 after:-z-10
  after:rounded-sm after:bg-grey-opacity-100 after:opacity-0
  after:transition-opacity after:duration-300 after:ease-linear active:scale-96
  active:after:opacity-100 active:after:duration-150 active:after:ease-out
  focus-visible:after:opacity-100 data-disabled:pointer-events-none
  data-disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:shrink-0
  [&_svg:not([class*='size-'])]:size-5
  [&_svg:not([class*='text-'])]:text-grey-400`,
  {
    variants: {
      variant: {
        default: "",
        destructive: "text-destructive",
      },
      // 체크 · 라디오 항목 — 왼쪽에 체크 칸(24px)을 두고 왼쪽 여백을 12px 로 줄인다
      checkable: {
        false:
          "px-5 data-inset:pl-10.5 has-data-[slot=dropdown-menu-shortcut]:pr-4",
        true: "pr-5 pl-3 data-checked:font-bold data-checked:text-primary",
      },
    },
    defaultVariants: {
      variant: "default",
      checkable: false,
    },
  },
);

type DropdownMenuItemProps = MenuPrimitive.Item.Props &
  Pick<VariantProps<typeof dropdownMenuItemVariants>, "variant"> & {
    /** 앞에 체크 칸이 있는 항목과 글자 시작을 맞춘다. */
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

type DropdownMenuCheckboxItemProps = MenuPrimitive.CheckboxItem.Props;

function DropdownMenuCheckboxItem({
  className,
  children,
  ...props
}: DropdownMenuCheckboxItemProps) {
  return (
    <MenuPrimitive.CheckboxItem
      data-slot="dropdown-menu-checkbox-item"
      className={cn(dropdownMenuItemVariants({ checkable: true }), className)}
      {...props}
    >
      <span
        data-slot="dropdown-menu-checkbox-item-indicator"
        className="pointer-events-none flex size-6 items-center justify-center"
      >
        <MenuPrimitive.CheckboxItemIndicator>
          <CheckIcon strokeWidth={2.5} className="size-6 text-primary" />
        </MenuPrimitive.CheckboxItemIndicator>
      </span>
      {children}
    </MenuPrimitive.CheckboxItem>
  );
}

function DropdownMenuRadioGroup(props: MenuPrimitive.RadioGroup.Props) {
  return (
    <MenuPrimitive.RadioGroup
      data-slot="dropdown-menu-radio-group"
      {...props}
    />
  );
}

type DropdownMenuRadioItemProps = MenuPrimitive.RadioItem.Props;

function DropdownMenuRadioItem({
  className,
  children,
  ...props
}: DropdownMenuRadioItemProps) {
  return (
    <MenuPrimitive.RadioItem
      data-slot="dropdown-menu-radio-item"
      className={cn(dropdownMenuItemVariants({ checkable: true }), className)}
      {...props}
    >
      <span
        data-slot="dropdown-menu-radio-item-indicator"
        className="pointer-events-none flex size-6 items-center justify-center"
      >
        <MenuPrimitive.RadioItemIndicator>
          <CheckIcon strokeWidth={2.5} className="size-6 text-primary" />
        </MenuPrimitive.RadioItemIndicator>
      </span>
      {children}
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
      className={cn("my-2 h-px bg-border", className)}
      {...props}
    />
  );
}

// 항목 오른쪽 끝 — 오른쪽 아이콘(20px, grey-400)이 글자와 16px 떨어져 놓인다
function DropdownMenuShortcut({
  className,
  ...props
}: React.ComponentProps<"span">) {
  return (
    <span
      data-slot="dropdown-menu-shortcut"
      className={cn(
        `ml-auto flex shrink-0 items-center pl-2.5 text-t7 text-grey-500
        [&_svg:not([class*='size-'])]:size-5
        [&_svg:not([class*='text-'])]:text-grey-400`,
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
  dropdownMenuItemVariants,
  type DropdownMenuProps,
  type DropdownMenuContentProps,
  type DropdownMenuLabelProps,
  type DropdownMenuItemProps,
  type DropdownMenuCheckboxItemProps,
  type DropdownMenuRadioItemProps,
};
