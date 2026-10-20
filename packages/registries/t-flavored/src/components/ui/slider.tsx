"use client";

import * as React from "react";
import { Slider as SliderPrimitive } from "@base-ui/react/slider";

import { cn } from "@/lib/utils";

// shadcn Slider 에 t-flavored 의 모양을 입혔다 — 높이 40px 칸 가운데의 5px 막대와 24px 흰 손잡이.
// 손잡이는 막대 안쪽에만 머물고(thumbAlignment="edge"), 채움은 막대 왼쪽 끝에서 손잡이 가운데까지 간다.
// 채움 색은 --slider-color 로 바꾼다(기본 blue-400).
// labels 는 막대 아래 눈금 글자(왼쪽 끝 · 가운데 · 오른쪽 끝), tooltip 은 손잡이 위에 늘 떠 있는 값 말풍선이다.
type SliderProps = SliderPrimitive.Root.Props & {
  /** 막대 아래에 놓는 눈금 글자. `mid` 는 가운데에 놓인다. */
  labels?: {
    min: React.ReactNode;
    max: React.ReactNode;
    mid?: React.ReactNode;
  };
  /** 손잡이 위에 값을 띄운다. 함수를 주면 그 값으로 만든 내용을 띄운다. */
  tooltip?: boolean | ((value: number) => React.ReactNode);
};

function Slider({
  className,
  defaultValue,
  value,
  min = 0,
  max = 100,
  labels,
  tooltip,
  ...props
}: SliderProps) {
  const values = React.useMemo(
    () =>
      Array.isArray(value)
        ? value
        : Array.isArray(defaultValue)
          ? defaultValue
          : [value ?? defaultValue ?? min],
    [value, defaultValue, min],
  );

  return (
    <SliderPrimitive.Root
      data-slot="slider"
      className={cn(
        "w-full [--slider-color:var(--color-blue-400)] data-disabled:opacity-30",
        className,
      )}
      defaultValue={defaultValue}
      value={value}
      min={min}
      max={max}
      thumbAlignment="edge"
      {...props}
    >
      <SliderPrimitive.Control
        data-slot="slider-control"
        className="relative flex h-10 w-full cursor-pointer touch-none
          items-center select-none data-disabled:cursor-default"
      >
        <SliderPrimitive.Track
          data-slot="slider-track"
          className="relative h-1.25 w-full overflow-hidden rounded-full
            bg-grey-200 select-none"
        >
          <SliderPrimitive.Indicator
            data-slot="slider-range"
            className="h-full bg-(--slider-color) select-none"
          />
        </SliderPrimitive.Track>
        {values.map((_, index) => (
          <SliderPrimitive.Thumb
            key={index}
            index={index}
            data-slot="slider-thumb"
            // 테두리 1px 과 두 겹 그림자 — 그림자 크기는 토큰에 없어 그대로 적는다
            className="block size-6 shrink-0 rounded-full bg-white
              shadow-[0_0_0_1px_var(--color-grey-opacity-200),0_8px_8px_0_var(--color-grey-opacity-200),0_2px_3px_0_var(--color-grey-opacity-300)]
              outline-none select-none has-focus-visible:ring-3
              has-focus-visible:ring-ring/50"
          >
            {tooltip && (
              <span
                data-slot="slider-tooltip"
                aria-hidden
                // 말풍선 아래 끝이 손잡이 위로 21px 떠 있고, 꼬리(16px 정사각형을 45° 돌린 것)가 그 사이를 잇는다
                className="pointer-events-none absolute bottom-[calc(100%+21px)]
                  left-1/2 -translate-x-1/2 rounded-2xl bg-popover px-4
                  py-[13px] text-t6 font-bold whitespace-nowrap text-grey-800
                  shadow-lg after:absolute after:top-full after:left-1/2
                  after:size-4 after:-translate-1/2 after:rotate-45
                  after:rounded-br-[3px] after:bg-popover"
              >
                <SliderPrimitive.Value data-slot="slider-tooltip-value">
                  {(formattedValues, thumbValues) =>
                    typeof tooltip === "function"
                      ? tooltip(thumbValues[index] ?? min)
                      : formattedValues[index]
                  }
                </SliderPrimitive.Value>
              </span>
            )}
          </SliderPrimitive.Thumb>
        ))}
      </SliderPrimitive.Control>
      {labels && (
        <div
          data-slot="slider-labels"
          className="relative flex h-5 justify-between text-t7 font-medium
            text-grey-600"
        >
          <span data-slot="slider-label">{labels.min}</span>
          {labels.mid && (
            <span
              data-slot="slider-label"
              className="absolute inset-x-0 text-center"
            >
              {labels.mid}
            </span>
          )}
          <span data-slot="slider-label">{labels.max}</span>
        </div>
      )}
    </SliderPrimitive.Root>
  );
}

export { Slider, type SliderProps };
