import * as React from "react";
import { WheelPicker as WheelPrimitive } from "@ncdai/react-wheel-picker";
import type { WheelPickerOption as WheelPrimitiveOption } from "@ncdai/react-wheel-picker";

import { cn } from "@/lib/utils";

// 휠의 움직임(끌기 · 관성 · 휠 · 화살표 키 · 글자로 찾기)은 React Wheel Picker 가 맡고, 모양은 SEED 의 것이다.
// 그 부품은 원통 모양으로 눕힌 목록(3D)과, 가운데 띠에만 보이는 평평한 목록 두 개를 그린다.
// SEED 의 휠은 평평하므로 원통 목록은 숨기고, 평평한 목록을 창 높이만큼 다 보이게 펴서 쓴다.

const DEFAULT_ITEM_SIZE = { small: 36, medium: 44 } as const;
const DEFAULT_VISIBLE_ITEM_COUNT = 5;

// 끝없이 도는 열은 항목을 여러 벌 이어 그리고, 멈출 때마다 가운데 벌로 되돌린다(SEED 와 같은 방식 · 같은 여유).
// 휠 부품의 infinite 는 평평한 목록에 앞뒤로 한 칸씩만 더 그려서, 다섯 칸을 보여 주는 이 모양에는 쓸 수 없다.
const LOOP_BUFFER_VIEWPORTS = 12;

// 휠 부품이 한 칸을 움직이는 시간은 √(칸 수 ÷ 이 값) 초다 — 16 이면 한 칸에 0.25초(SEED 가 놓은 뒤 맞춰 가는 시간과 비슷하다).
const SCROLL_SENSITIVITY = 16;
// 놓은 뒤 미끄러지는 거리는 속도² ÷ (20 × 이 값) 칸이다.
const DRAG_SENSITIVITY = 3;
// 끌다가 멈춘 지 이만큼(ms) 지나서 놓으면 미끄러지지 않는다(SEED 의 값).
const POINTER_VELOCITY_MAX_AGE = 80;

// 휠 부품은 누른 자리가 몇 번째 칸인지를 원통에 눕힌 칸의 높이(칸 높이 × cos)로 센다. 원통을 아주 크게(칸 400개) 잡으면
// 보이는 칸들의 높이가 평평한 목록과 같아진다. 대신 그 셈은 부품의 맨 위에서부터 하므로, 부품을 위아래로 길게 늘여
// 가운데 칸이 창의 가운데에 오게 놓는다(넘치는 부분은 열이 잘라 낸다).
const PRIMITIVE_VISIBLE_COUNT = 400;

function getPrimitiveCenterOffset(itemSize: number) {
  const quarter = PRIMITIVE_VISIBLE_COUNT >> 2;
  const angle = 360 / PRIMITIVE_VISIBLE_COUNT;
  let offset = 0;
  for (let index = quarter - 1; index >= 1; index -= 1)
    offset += itemSize * Math.cos((index * angle * Math.PI) / 180);
  // 소수점 아래를 남기면 글자가 놓이는 자리가 원본과 어긋날 수 있다
  return Math.round(offset);
}

// SEED ScrollFog 의 안개 — 위아래 끝으로 갈수록 흐려진다(16 단계). 가리개(mask)라 알파만 쓰여 밝게 · 어둡게와 상관없다.
const FOG_STOPS: readonly (readonly [alpha: string, position: number])[] = [
  ["00", 0],
  ["03", 0.08],
  ["05", 0.16],
  ["0d", 0.22],
  ["14", 0.29],
  ["21", 0.35],
  ["2e", 0.41],
  ["40", 0.47],
  ["52", 0.53],
  ["66", 0.59],
  ["7a", 0.65],
  ["94", 0.71],
  ["ab", 0.78],
  ["c7", 0.84],
  ["e3", 0.92],
  ["ff", 1],
];
const fog = (direction: "bottom" | "top") =>
  `linear-gradient(to ${direction}, ${FOG_STOPS.map(([alpha, position]) => `#000000${alpha} ${position === 0 ? "0" : `calc(var(--wheel-fog-size) * ${position})`}`).join(", ")})`;
const FOG_MASK = `${fog("bottom")}, ${fog("top")}`;

const labelVariants = {
  small: "text-t7-static",
  medium: "text-t10-static",
} as const;

type WheelPickerSize = keyof typeof DEFAULT_ITEM_SIZE;

interface WheelPickerContextValue {
  itemSize: number;
  visibleItemCount: number;
  size: WheelPickerSize;
  disabled: boolean;
  readOnly: boolean;
}

const WheelPickerContext = React.createContext<WheelPickerContextValue | null>(
  null,
);

export interface WheelPickerOption {
  /** 항목을 가리키고, 고른 값으로 주고받는 값 */
  value: string;
  /** 항목에 보여 줄 내용 */
  label: React.ReactNode;
  /** label 이 글자가 아닐 때 읽어 줄 글자 */
  ariaLabel?: string;
}

export interface WheelPickerValueChangeDetails {
  /** 멈춰 있던 항목에서 새 항목까지 움직인 칸 수 — 아래로 가면 양수, 위로 가면 음수(끝없이 도는 열에서는 한 바퀴를 넘겨도 센다) */
  stepDelta: number;
}

export interface WheelPickerColumnProps extends Omit<
  React.ComponentProps<"div">,
  "defaultValue" | "onChange" | "children"
> {
  /** 고를 항목 — 하나 이상 */
  options: readonly WheelPickerOption[];
  value?: string;
  defaultValue?: string;
  /** 휠이 한 항목에 멈춰 값이 정해질 때 불린다 */
  onValueChange?: (
    value: string,
    details: WheelPickerValueChangeDetails,
  ) => void;
  /** 마지막 항목과 첫 항목을 이어 끝없이 돌린다 */
  loop?: boolean;
  /** 지금 값을 읽어 줄 글자 */
  getAriaValueText?: (value: string) => string;
  /** 기본 글자 모양 대신 항목에 그릴 요소 — 고른 색 · 흐린 색이 먹도록 글자색(currentColor)을 물려받아야 한다 */
  renderLabel?: (option: WheelPickerOption) => React.ReactNode;
}

export interface WheelPickerColumn extends WheelPickerColumnProps {
  /** 열을 가리키는 값 */
  id: string;
}

export interface WheelPickerProps extends Omit<
  React.ComponentProps<"div">,
  "children"
> {
  /** 열 목록 */
  columns: readonly WheelPickerColumn[];
  size?: WheelPickerSize;
  /** 한 항목의 높이(px) — 안 주면 size 의 기본 높이 */
  itemSize?: number;
  /** 보이는 항목 수(홀수) */
  visibleItemCount?: number;
  /** 초점도 값 바꾸기도 막는다 */
  disabled?: boolean;
  /** 초점은 두고 값 바꾸기만 막는다 */
  readOnly?: boolean;
  /** 위아래 안개의 크기 — 숫자는 px */
  scrollFogSize?: number | string;
}

// 항목 배열을 매번 새로 만들어 넘겨도(내용이 같으면) 같은 배열로 본다 —
// 휠 부품은 항목 배열이 바뀌면 움직이던 것을 멈추고 값의 자리로 되돌아가기 때문이다.
function useStableOptions(options: readonly WheelPickerOption[]) {
  const ref = React.useRef(options);
  const previous = ref.current;
  const same =
    previous === options ||
    (previous.length === options.length &&
      previous.every((option, index) => {
        const next = options[index]!;
        return (
          option.value === next.value &&
          option.label === next.label &&
          option.ariaLabel === next.ariaLabel
        );
      }));
  React.useEffect(() => {
    if (!same) ref.current = options;
  });
  return same ? previous : options;
}

const optionText = (option: WheelPickerOption) =>
  option.ariaLabel ??
  (typeof option.label === "string" || typeof option.label === "number"
    ? String(option.label)
    : option.value);

/** 항목의 기본 글자 모양 */
function WheelPickerItemLabel({
  className,
  size = "medium",
  ...props
}: React.ComponentProps<"div"> & { size?: WheelPickerSize }) {
  return (
    <div
      data-slot="wheel-picker-item-label"
      className={cn(
        `box-border flex h-full shrink-0 items-center justify-center px-x4
        font-medium whitespace-nowrap`,
        labelVariants[size],
        className,
      )}
      {...props}
    />
  );
}

function WheelPickerColumnRoot({
  options: optionsProp,
  value: valueProp,
  defaultValue,
  onValueChange,
  loop = false,
  getAriaValueText,
  renderLabel,
  className,
  style,
  ref,
  "aria-label": ariaLabel,
  "aria-labelledby": ariaLabelledby,
  onPointerDown,
  onKeyDownCapture,
  onScroll,
  onBlur,
  ...props
}: WheelPickerColumnProps) {
  const context = React.useContext(WheelPickerContext);
  if (!context)
    throw new Error("WheelPicker 의 열은 WheelPicker 안에서만 쓸 수 있습니다.");
  const { itemSize, visibleItemCount, size, disabled, readOnly } = context;

  const options = useStableOptions(optionsProp);
  const count = options.length;
  const isInert = disabled || count === 0;

  // 값 — 밖에서 쥐면(value) 그 값을, 아니면 안에서 쥔다.
  const [innerValue, setInnerValue] = React.useState(defaultValue);
  const value = valueProp !== undefined ? valueProp : innerValue;
  const found = options.findIndex((option) => option.value === value);
  const logicalIndex = Math.max(found, 0);

  // 끝없이 도는 열은 항목을 앞뒤로 여러 벌 더 그린다. 그려진 자리(physical)와 항목의 차례(logical)를 나눠 센다.
  const shouldLoop = loop && count > 1;
  const sideCycles = shouldLoop
    ? Math.ceil((LOOP_BUFFER_VIEWPORTS * visibleItemCount) / count)
    : 0;
  const physicalCount = count * (sideCycles * 2 + 1);
  const physicalIndex = sideCycles * count + logicalIndex;

  // 휠이 멈출 때마다 항목 배열을 새로 만든다(handleSettle 의 설명).
  const [revision, resync] = React.useReducer((tick: number) => tick + 1, 0);
  const renderLabelRef = React.useRef(renderLabel);
  React.useEffect(() => {
    renderLabelRef.current = renderLabel;
  });
  const primitiveOptions = React.useMemo<WheelPrimitiveOption<number>[]>(
    () =>
      Array.from({ length: physicalCount }, (_, index) => {
        const option = options[index % count]!;
        return {
          value: index,
          label: renderLabelRef.current ? (
            renderLabelRef.current(option)
          ) : (
            <WheelPickerItemLabel size={size}>
              {option.label}
            </WheelPickerItemLabel>
          ),
          // 글자를 쳐서 찾기 — 끝없이 도는 열에서는 끈다(여러 벌 가운데 맨 앞 벌까지 달려가 버린다)
          textValue: shouldLoop ? "" : optionText(option),
        };
      }),
    // revision · physicalIndex 는 배열을 새로 만들게 하려고 넣는다. 값이 밖에서 바뀔 때도 새로 만든다 —
    // 휠 부품의 키보드 처리가 항목 배열이 바뀔 때의 값을 기억하고 있어서, 그대로 두면 그 값으로 돌아가는 조작을 '바뀌지 않았다'고 본다.
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [options, count, physicalCount, size, shouldLoop, revision, physicalIndex],
  );

  const columnRef = React.useRef<HTMLDivElement | null>(null);
  const keyTargetRef = React.useRef<number | null>(null);

  const handleSettle = (nextPhysicalIndex: number) => {
    if (
      isInert ||
      readOnly ||
      nextPhysicalIndex < 0 ||
      nextPhysicalIndex >= physicalCount
    )
      return;
    const next = options[nextPhysicalIndex % count];
    if (!next) return;
    keyTargetRef.current = null;
    if (next.value !== value) {
      if (valueProp === undefined) setInnerValue(next.value);
      onValueChange?.(next.value, {
        stepDelta: nextPhysicalIndex - physicalIndex,
      });
    }
    // 휠이 멈춘 자리가 값의 자리와 다를 수 있다(같은 항목의 다른 벌에 멈췄거나, 값을 쥔 쪽이 받지 않았을 때) —
    // 항목 배열을 새로 주면 휠 부품이 값의 자리로 간다(같은 내용이 그려진 자리라 눈에 보이지 않는다).
    resync();
  };

  // 가운데 띠에 걸친 항목 — 띠와 겹친 만큼만 고른 색으로 칠한다(SEED 와 같은 방식: 글자 모양으로 오려 낸 그라디언트).
  // 휠 부품이 목록을 옮길 때마다(transform) 다시 센다.
  const markedRef = React.useRef<HTMLElement[]>([]);
  const selectedRef = React.useRef<HTMLElement | null>(null);
  const updateOverlap = React.useCallback(() => {
    const list = columnRef.current?.querySelector<HTMLElement>(
      "[data-rwp-highlight-list]",
    );
    if (!list) return;
    const moved = /translateY\((-?[\d.e+-]+)px\)/.exec(list.style.transform);
    const scrollTop = moved ? -Number(moved[1]) : 0;
    const last = list.children.length - 1;
    const clamp = (index: number) =>
      Math.min(Math.max(index, 0), Math.max(last, 0));

    const selected = list.children.item(
      clamp(Math.round(scrollTop / itemSize)),
    ) as HTMLElement | null;
    if (selectedRef.current !== selected) {
      selectedRef.current?.removeAttribute("data-selected");
      selected?.setAttribute("data-selected", "");
      selectedRef.current = selected;
    }

    const first = clamp(Math.floor(scrollTop / itemSize));
    const marked: HTMLElement[] = [];
    for (let index = first; index <= Math.min(first + 1, last); index += 1) {
      const element = list.children.item(index) as HTMLElement | null;
      if (!element) continue;
      const itemStart = index * itemSize;
      const start = Math.max(scrollTop - itemStart, 0);
      const end = Math.min(scrollTop + itemSize - itemStart, itemSize);
      if (end - start <= Number.EPSILON) continue;
      element.setAttribute("data-overlap", "");
      element.style.setProperty(
        "--wheel-overlap-start",
        `${(start / itemSize) * 100}%`,
      );
      element.style.setProperty(
        "--wheel-overlap-end",
        `${(end / itemSize) * 100}%`,
      );
      marked.push(element);
    }
    for (const element of markedRef.current) {
      if (marked.includes(element)) continue;
      element.removeAttribute("data-overlap");
      element.style.removeProperty("--wheel-overlap-start");
      element.style.removeProperty("--wheel-overlap-end");
    }
    markedRef.current = marked;
  }, [itemSize]);

  // 휠 부품은 그린 뒤(effect)에야 목록을 값의 자리로 옮긴다 — 첫 화면에 첫 항목이 잠깐 보이지 않게 먼저 옮겨 둔다.
  const positionedRef = React.useRef(false);
  React.useLayoutEffect(() => {
    const list = columnRef.current?.querySelector<HTMLElement>(
      "[data-rwp-highlight-list]",
    );
    if (!list) return undefined;
    if (!positionedRef.current) {
      positionedRef.current = true;
      list.style.transform = `translateY(${-physicalIndex * itemSize}px)`;
    }
    updateOverlap();
    const observer = new MutationObserver(updateOverlap);
    observer.observe(list, { attributes: true, attributeFilter: ["style"] });
    return () => observer.disconnect();
  });

  // 읽어 주는 값 — 초점을 받는 요소는 휠 부품이 그리고 속성을 받지 않아서, 그린 뒤에 직접 붙인다.
  const current = options[logicalIndex];
  const valueText = current
    ? (getAriaValueText?.(current.value) ?? optionText(current))
    : undefined;
  React.useLayoutEffect(() => {
    const wheel = columnRef.current?.querySelector<HTMLElement>(
      ":scope > [data-rwp]",
    );
    if (!wheel) return;
    const set = (name: string, next: string | number | undefined) => {
      if (next === undefined) wheel.removeAttribute(name);
      else wheel.setAttribute(name, String(next));
    };
    set("role", "spinbutton");
    set("aria-label", ariaLabel);
    set("aria-labelledby", ariaLabelledby);
    set("aria-valuemin", count > 0 ? 0 : undefined);
    set("aria-valuemax", count > 0 ? count - 1 : undefined);
    set("aria-valuenow", count > 0 ? logicalIndex : undefined);
    set("aria-valuetext", valueText);
    set("aria-disabled", isInert ? "true" : undefined);
    set("aria-readonly", readOnly ? "true" : undefined);
    wheel.tabIndex = isInert ? -1 : 0;
  });

  const centerOffset = getPrimitiveCenterOffset(itemSize);

  return (
    <div
      ref={(node) => {
        columnRef.current = node;
        if (typeof ref === "function") ref(node);
        else if (ref) ref.current = node;
      }}
      data-slot="wheel-picker-column"
      data-disabled={isInert ? "" : undefined}
      data-readonly={readOnly ? "" : undefined}
      className={cn(
        "group/column box-border h-full w-max flex-none cursor-grab touch-none",
        // 스크롤로 움직이지는 않지만 스크롤 영역으로 둔다 — 원본의 열이 스크롤 영역이라, 그래야 초점 링의 둥근 모서리가 픽셀까지 같게 칠해진다.
        // 휠 부품이 휠 · 터치의 기본 동작을 막아 실제로 스크롤되지는 않는다(혹시 움직이면 onScroll 이 되돌린다).
        `overflow-x-hidden overflow-y-auto overscroll-contain scrollbar-none
        [&::-webkit-scrollbar]:hidden`,
        `data-disabled:pointer-events-none data-disabled:overflow-y-hidden
        data-readonly:overflow-y-hidden`,
        `data-disabled:cursor-default
        data-disabled:[--wheel-item-color:var(--fg-disabled)]
        data-disabled:[--wheel-selected-item-color:var(--fg-disabled)]`,
        "data-readonly:cursor-default data-dragging:cursor-grabbing",
        // 휠 부품의 바깥 요소 — 위아래로 길게 늘여 가운데 칸을 창의 가운데에 맞춘다(높이는 부품이 style 로 적어서 ! 로 덮는다)
        `*:data-rwp:relative
        *:data-rwp:mt-[calc(var(--wheel-center-offset)-var(--wheel-primitive-offset))]
        *:data-rwp:outline-none`,
        "*:data-rwp:h-[calc(var(--wheel-primitive-offset)*2+var(--wheel-item-size))]!",
        "[&[data-readonly]>[data-rwp]]:pointer-events-none",
        // 원통 모양 목록은 쓰지 않는다
        "**:data-rwp-options:hidden!",
        className,
      )}
      style={
        {
          "--wheel-primitive-offset": `${centerOffset}px`,
          ...style,
        } as React.CSSProperties
      }
      onPointerDown={(event) => {
        onPointerDown?.(event);
        if (!event.isPrimary || event.button !== 0 || isInert || readOnly)
          return;
        const column = event.currentTarget;
        const wheel = column.querySelector<HTMLElement>(":scope > [data-rwp]");
        const { pointerId, pointerType } = event;
        if (pointerType === "mouse") {
          // 휠 부품이 mousedown 의 기본 동작을 막아 초점이 오지 않는다 — 직접 준다. 마우스로 준 초점에는 초점 링을 그리지 않는다.
          column.setAttribute("data-pointer-focus", "");
          column.setAttribute("data-dragging", "");
          wheel?.focus({ preventScroll: true });
        }
        // 휠 부품은 놓기 직전 두 번의 움직임으로 속도를 재서, 끌다가 멈춘 뒤에 놓아도 미끄러진다.
        // SEED 처럼 마지막 움직임이 오래됐으면(80ms) 멈춘 것으로 본다 — 놓는 자리에서 한 번 더 움직인 것처럼 알려 속도를 0 으로 만든다.
        let movedAt = performance.now();
        const move = (moved: PointerEvent) => {
          if (moved.pointerId === pointerId) movedAt = performance.now();
        };
        const release = (released: PointerEvent) => {
          if (released.pointerId !== pointerId) return;
          column.removeAttribute("data-dragging");
          window.removeEventListener("pointermove", move, true);
          window.removeEventListener("pointerup", release, true);
          window.removeEventListener("pointercancel", release, true);
          if (
            released.type !== "pointerup" ||
            performance.now() - movedAt <= POINTER_VELOCITY_MAX_AGE
          )
            return;
          try {
            if (pointerType === "mouse") {
              document.dispatchEvent(
                new MouseEvent("mousemove", {
                  clientX: released.clientX,
                  clientY: released.clientY,
                  bubbles: true,
                  cancelable: true,
                }),
              );
            } else if (wheel) {
              const touch = new Touch({
                identifier: pointerId,
                target: wheel,
                clientX: released.clientX,
                clientY: released.clientY,
              });
              wheel.dispatchEvent(
                new TouchEvent("touchmove", {
                  touches: [touch],
                  targetTouches: [touch],
                  changedTouches: [touch],
                  bubbles: true,
                  cancelable: true,
                }),
              );
            }
          } catch {
            // Touch 를 만들 수 없는 브라우저에서는 휠 부품의 속도 그대로 둔다
          }
        };
        window.addEventListener("pointermove", move, true);
        window.addEventListener("pointerup", release, true);
        window.addEventListener("pointercancel", release, true);
      }}
      onKeyDownCapture={(event) => {
        onKeyDownCapture?.(event);
        event.currentTarget.removeAttribute("data-pointer-focus");
        // 값을 바꿀 수 없을 때는 휠 부품이 키를 받지 못하게 한다(Tab 은 지나가게 둔다)
        if (isInert || readOnly) {
          if (event.key !== "Tab") event.stopPropagation();
          return;
        }
        // 휠 부품에 맡기지 않고 바로 옮기는 키 — 휠 부품은 움직이는 중에 온 화살표 키를 한 번으로 치고(꾹 누르면 느리다),
        // 끝없이 도는 열의 Home · End 를 여러 벌의 맨 끝으로 보낸다.
        const direction =
          event.key === "ArrowUp" ? -1 : event.key === "ArrowDown" ? 1 : 0;
        const clamp = (index: number) =>
          Math.min(Math.max(index, 0), physicalCount - 1);
        let target: number | undefined;
        if (direction !== 0 && event.repeat)
          target = clamp((keyTargetRef.current ?? physicalIndex) + direction);
        else if (shouldLoop && event.key === "Home")
          target = physicalIndex - logicalIndex;
        else if (shouldLoop && event.key === "End")
          target = physicalIndex - logicalIndex + count - 1;
        // 처음 누른 화살표 키는 휠 부품이 옮긴다 — 꾹 눌러 이어지는 키가 그 다음 칸부터 가도록 가는 곳을 적어 둔다.
        keyTargetRef.current =
          direction !== 0 && !event.repeat
            ? clamp(physicalIndex + direction)
            : null;
        if (target === undefined) return;
        event.preventDefault();
        event.stopPropagation();
        handleSettle(target);
      }}
      onScroll={(event) => {
        onScroll?.(event);
        if (event.currentTarget.scrollTop !== 0)
          event.currentTarget.scrollTop = 0;
      }}
      onBlur={(event) => {
        onBlur?.(event);
        event.currentTarget.removeAttribute("data-pointer-focus");
      }}
      {...props}
    >
      <WheelPrimitive<number>
        options={primitiveOptions}
        value={physicalIndex}
        onValueChange={handleSettle}
        optionItemHeight={itemSize}
        visibleCount={PRIMITIVE_VISIBLE_COUNT}
        scrollSensitivity={SCROLL_SENSITIVITY}
        dragSensitivity={DRAG_SENSITIVITY}
        classNames={{
          highlightWrapper: cn(
            "box-border block h-full! pt-(--wheel-primitive-offset) [line-height:inherit]!",
            "[&>ul]:m-0 [&>ul]:block [&>ul]:list-none [&>ul]:p-0",
          ),
          highlightItem: cn(
            "m-0 flex min-h-(--wheel-item-size) items-center [justify-content:var(--wheel-item-justify,center)] p-0 text-(--wheel-item-color) select-none",
            // 가운데 띠와 겹친 만큼만 고른 색
            "data-overlap:bg-clip-text data-overlap:text-transparent data-overlap:[-webkit-text-fill-color:transparent]",
            "data-overlap:bg-[linear-gradient(to_bottom,var(--wheel-item-color)_0%,var(--wheel-item-color)_var(--wheel-overlap-start),var(--wheel-selected-item-color)_var(--wheel-overlap-start),var(--wheel-selected-item-color)_var(--wheel-overlap-end),var(--wheel-item-color)_var(--wheel-overlap-end),var(--wheel-item-color)_100%)]",
            // 키보드로 초점이 온 열은 고른 항목에 초점 링을 그린다
            "outline-transparent data-selected:rounded-(--wheel-indicator-radius,var(--radius-r2))",
            "data-selected:outline-solid data-selected:outline-(length:--dimension-x0_5) data-selected:-outline-offset-(--dimension-x0_5)",
            "group-[:not([data-pointer-focus])]/column:data-selected:[transition:outline-color_var(--motion-duration-d3)_var(--motion-ease-easing)]",
            "group-[:is([data-focus-visible],:has(>[data-rwp]:focus-visible)):not([data-pointer-focus])]/column:data-selected:outline-stroke-focus-ring",
          ),
        }}
      />
    </div>
  );
}

/**
 * 휠을 돌려 고르는 열 묶음. 열마다 항목(`options`)과 값(`value` · `onValueChange`)을 준다.
 * 읽어 주는 이름(`aria-label` · `aria-labelledby`)을 준다.
 */
function WheelPicker({
  columns,
  size = "medium",
  itemSize: itemSizeProp,
  visibleItemCount = DEFAULT_VISIBLE_ITEM_COUNT,
  disabled = false,
  readOnly = false,
  scrollFogSize,
  className,
  style,
  ...props
}: WheelPickerProps) {
  const itemSize = itemSizeProp ?? DEFAULT_ITEM_SIZE[size];
  const context = React.useMemo(
    () => ({ itemSize, visibleItemCount, size, disabled, readOnly }),
    [itemSize, visibleItemCount, size, disabled, readOnly],
  );
  const fogSize =
    scrollFogSize === undefined
      ? `min(calc(0.4 * 100%), ${itemSize * 3}px)`
      : typeof scrollFogSize === "number"
        ? `${scrollFogSize}px`
        : scrollFogSize;

  return (
    <WheelPickerContext.Provider value={context}>
      <div
        role="group"
        data-slot="wheel-picker"
        data-disabled={disabled ? "" : undefined}
        data-readonly={readOnly ? "" : undefined}
        className={cn(
          `relative
          h-[calc(var(--wheel-item-size)*var(--wheel-visible-item-count))]
          w-full overflow-hidden bg-bg-layer-floating`,
          `[--wheel-item-color:var(--fg-disabled)]
          [--wheel-selected-item-color:var(--fg-neutral)]`,
          className,
        )}
        style={
          {
            "--wheel-item-size": `${itemSize}px`,
            "--wheel-visible-item-count": visibleItemCount,
            "--wheel-center-offset": `${((visibleItemCount - 1) / 2) * itemSize}px`,
            "--wheel-fog-size": fogSize,
            ...style,
          } as React.CSSProperties
        }
        {...props}
      >
        <div
          aria-hidden
          data-slot="wheel-picker-indicator"
          className="pointer-events-none absolute inset-x-x4 top-1/2 z-0
            h-(--wheel-item-size) -translate-y-1/2
            rounded-(--wheel-indicator-radius,var(--radius-r2))
            bg-bg-neutral-weak"
        />
        <div
          data-slot="wheel-picker-fog"
          className="relative z-1 size-full overflow-hidden mask-intersect
            mask-no-repeat mask-size-[100%_100%]"
          style={{ maskImage: FOG_MASK }}
        >
          <div
            data-slot="wheel-picker-columns"
            className="flex size-full justify-center"
          >
            {columns.map(({ id, ...column }) => (
              <WheelPickerColumnRoot key={id} {...column} />
            ))}
          </div>
        </div>
      </div>
    </WheelPickerContext.Provider>
  );
}

export { WheelPicker, WheelPickerItemLabel };
