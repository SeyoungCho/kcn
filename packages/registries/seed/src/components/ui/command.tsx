import * as React from "react";
import { Autocomplete as AutocompletePrimitive } from "@base-ui/react/autocomplete";
import { Dialog as DialogPrimitive } from "@base-ui/react/dialog";
import IconMagnifyingglassLine from "@karrotmarket/react-monochrome-icon/IconMagnifyingglassLine";

import { Icon } from "@/components/ui/icon";
import { cn } from "@/lib/utils";

// 명령 팔레트 — 입력칸에 친 글자로 목록을 거르고, 화살표 · Enter 로 고른다(shadcn 의 command).
// SEED 에는 없는 부품이라 모양은 SEED 의 창 · 메뉴를 따른다: 바탕 · 둥글기 · 그림자는 메뉴, 항목은 메뉴 항목.
// 동작은 Base UI Autocomplete 의 '목록을 늘 펼쳐 둔(inline)' 형태 — 강조 이동 · aria-activedescendant · Enter 로 누르기를 그쪽이 한다.

// 층 — 창(dialog)과 같은 셈법이다. 기본 2 에 layerIndex 를 더한다.
const LAYER = "z-[calc(var(--dialog-z-index)+var(--layer-index,0))]";
// 열릴 때 · 닫힐 때 — 창(dialog.tsx)과 같은 움직임: 바탕은 흐려졌다 나타나고(d2), 창은 크게(1.3배)에서 줄며 나타난다(d4 · enter-expressive).
const CONTENT_MOTION = [
  "[--seed-enter-opacity:0] [--seed-enter-scale:1.3] [--seed-exit-opacity:0]",
  "data-open:animate-[seed-enter_var(--motion-duration-d4)_var(--motion-ease-enter-expressive)]",
  "data-closed:animate-[seed-exit_var(--motion-duration-d2)_var(--motion-ease-exit)_forwards]",
].join(" ");
// ── 뿌리 ─────────────────────────────────────────────────────────────────────

export type CommandProps = React.ComponentProps<
  typeof AutocompletePrimitive.Root
>;

function CommandRoot(props: CommandProps) {
  return (
    <AutocompletePrimitive.Root
      open
      inline
      autoHighlight="always"
      keepHighlight
      {...props}
    />
  );
}

/**
 * 목록을 늘 펼쳐 둔 자동완성. 거르는 일을 직접 하려면 `filteredItems` 에 거른 목록을 주고 `filter={null}` 로 둔다.
 * 강조는 늘 하나에 있다(`autoHighlight="always"`) — 열자마자 Enter 로 첫 항목을 고를 수 있다.
 * Base UI 의 Root 는 항목 타입을 받는 겹친 시그니처(낱 목록 · 묶음 목록)라, 감싼 함수에 그 시그니처를 그대로 입힌다.
 */
const Command = CommandRoot as typeof AutocompletePrimitive.Root;

// ── 입력 ─────────────────────────────────────────────────────────────────────

export interface CommandInputProps extends AutocompletePrimitive.Input.Props {
  /** 입력칸 오른쪽 끝에 놓을 것(단축키 안내 …) */
  suffix?: React.ReactNode;
}

function CommandInput({ className, suffix, ...props }: CommandInputProps) {
  return (
    <AutocompletePrimitive.InputGroup
      data-slot="command-input-group"
      className="flex shrink-0 items-center gap-x2 px-x4
        shadow-[inset_0_-1px_0_0_var(--stroke-neutral-muted)]
        [--icon-color:var(--fg-neutral-subtle)]
        [--icon-size:var(--dimension-x5)]"
    >
      <Icon svg={<IconMagnifyingglassLine />} />
      <AutocompletePrimitive.Input
        data-slot="command-input"
        className={cn(
          `box-border m-0 h-x14 min-w-0 grow border-none bg-transparent p-0
          font-[inherit] text-t5 text-fg-neutral outline-none
          placeholder:text-fg-placeholder`,
          className,
        )}
        {...props}
      />
      {suffix}
    </AutocompletePrimitive.InputGroup>
  );
}

// ── 목록 ─────────────────────────────────────────────────────────────────────

export type CommandListProps = AutocompletePrimitive.List.Props;

/** 항목 목록 — 길면 여기만 스크롤한다 */
function CommandList({ className, ...props }: CommandListProps) {
  return (
    <AutocompletePrimitive.List
      data-slot="command-list"
      className={cn(
        `box-border max-h-[min(400px,60dvh)] overflow-y-auto overscroll-contain
        py-x2 outline-none empty:hidden`,
        className,
      )}
      {...props}
    />
  );
}

export type CommandEmptyProps = AutocompletePrimitive.Empty.Props;

/** 맞는 항목이 없을 때의 안내 — 목록이 비면 그려진다 */
function CommandEmpty({ className, ...props }: CommandEmptyProps) {
  return (
    <AutocompletePrimitive.Empty
      data-slot="command-empty"
      className={cn(
        "px-x4 py-x8 text-center text-t4 text-fg-neutral-subtle empty:hidden",
        className,
      )}
      {...props}
    />
  );
}

export type CommandGroupProps = AutocompletePrimitive.Group.Props;

function CommandGroup({ className, ...props }: CommandGroupProps) {
  return (
    <AutocompletePrimitive.Group
      data-slot="command-group"
      className={cn("flex flex-col", className)}
      {...props}
    />
  );
}

export type CommandGroupLabelProps = AutocompletePrimitive.GroupLabel.Props;

function CommandGroupLabel({ className, ...props }: CommandGroupLabelProps) {
  return (
    <AutocompletePrimitive.GroupLabel
      data-slot="command-group-label"
      className={cn(
        "px-x4 py-x2 text-t3 font-bold text-fg-neutral-subtle",
        className,
      )}
      {...props}
    />
  );
}

/** 묶음 안의 항목들 — 묶음에 준 items 를 하나씩 그린다 */
const CommandCollection = AutocompletePrimitive.Collection;

export type CommandItemProps = AutocompletePrimitive.Item.Props;

/** 항목 — 누르거나 강조된 채 Enter 를 치면 onClick 이 불린다. 강조된 항목은 메뉴 항목처럼 양옆이 들어간 둥근 바탕을 깐다 */
function CommandItem({ className, ...props }: CommandItemProps) {
  return (
    <AutocompletePrimitive.Item
      data-slot="command-item"
      className={cn(
        `group/command-item relative isolate flex min-h-x12 cursor-pointer
        items-center gap-x3 px-x4 py-x2 text-t5 text-fg-neutral outline-none
        select-none`,
        "scroll-my-x2",
        `before:absolute before:inset-y-0 before:inset-x-x2 before:-z-1
        before:rounded-r3 before:content-['']`,
        `before:transition-[background-color] before:duration-color-transition
        before:ease-easing`,
        "data-highlighted:before:bg-bg-transparent-pressed",
        "data-disabled:cursor-not-allowed data-disabled:text-fg-disabled",
        className,
      )}
      {...props}
    />
  );
}

export type CommandShortcutProps = React.ComponentProps<"kbd">;

/** 단축키 표시 — ⌘K · Esc · Enter … */
function CommandShortcut({ className, ...props }: CommandShortcutProps) {
  return (
    <kbd
      data-slot="command-shortcut"
      className={cn(
        `box-border inline-flex h-x5 min-w-x5 shrink-0 items-center
        justify-center rounded-r1 bg-bg-neutral-weak px-x1 font-[inherit]
        text-t1 font-medium text-fg-neutral-subtle`,
        className,
      )}
      {...props}
    />
  );
}

export type CommandFooterProps = React.ComponentProps<"div">;

/** 아래 줄 — 쓸 수 있는 키를 알려 준다 */
function CommandFooter({ className, ...props }: CommandFooterProps) {
  return (
    <div
      data-slot="command-footer"
      className={cn(
        `flex shrink-0 flex-wrap items-center gap-x4 px-x4 py-x2.5 text-t2
        text-fg-neutral-subtle
        shadow-[inset_0_1px_0_0_var(--stroke-neutral-muted)]`,
        className,
      )}
      {...props}
    />
  );
}

// ── 창 ───────────────────────────────────────────────────────────────────────

export interface CommandDialogProps extends Omit<
  DialogPrimitive.Root.Props,
  "children"
> {
  children?: React.ReactNode;
  /** 창의 이름(화면 낭독기) — 보이는 제목이 없으므로 꼭 준다 */
  "aria-label": string;
  className?: string;
  /** 다른 창 · 고정된 머리줄과 겹칠 때의 순서 — 클수록 위 */
  layerIndex?: number;
}

/** 명령 팔레트를 담는 창 — 화면 위쪽(10%)에 뜨고, 바깥을 누르거나 Esc 로 닫는다 */
function CommandDialog({
  children,
  className,
  layerIndex,
  "aria-label": ariaLabel,
  ...props
}: CommandDialogProps) {
  return (
    <DialogPrimitive.Root {...props}>
      <DialogPrimitive.Portal>
        <DialogPrimitive.Viewport
          data-slot="command-dialog-positioner"
          className={cn(
            `fixed inset-0 box-border flex items-start justify-center px-x4
            pt-[10dvh] [--dialog-z-index:2]`,
            LAYER,
          )}
          style={{ "--layer-index": layerIndex } as React.CSSProperties}
        >
          <DialogPrimitive.Backdrop
            data-slot="command-dialog-backdrop"
            className={cn(
              `fixed inset-0 bg-bg-overlay [--seed-enter-opacity:0]
              [--seed-exit-opacity:0]`,
              "data-open:animate-[seed-enter_var(--motion-duration-d2)_var(--motion-ease-enter)]",
              "data-closed:animate-[seed-exit_var(--motion-duration-d2)_var(--motion-ease-exit)_forwards]",
              LAYER,
            )}
          />
          <DialogPrimitive.Popup
            data-slot="command-dialog-content"
            aria-label={ariaLabel}
            className={cn(
              `relative box-border flex max-h-[80dvh] w-full max-w-140 flex-col
              overflow-hidden rounded-r5 bg-bg-layer-floating shadow-s3
              outline-none`,
              CONTENT_MOTION,
              LAYER,
              className,
            )}
          >
            {children}
          </DialogPrimitive.Popup>
        </DialogPrimitive.Viewport>
      </DialogPrimitive.Portal>
    </DialogPrimitive.Root>
  );
}

export {
  Command,
  CommandInput,
  CommandList,
  CommandEmpty,
  CommandGroup,
  CommandGroupLabel,
  CommandCollection,
  CommandItem,
  CommandShortcut,
  CommandFooter,
  CommandDialog,
};
