"use client";

import * as React from "react";
import { Slider as SliderPrimitive } from "@base-ui/react/slider";

import { cn } from "@/lib/utils";

// shadcn Slider 에 montage 의 모양을 입혔다 — 가는 회색 막대 위의 파란 손잡이(흰 테두리).
// 손잡이는 막대 양끝 안쪽에만 머물고(thumbAlignment="edge"), 올리거나 누르거나 초점이 가면 둘레에 옅은 파란 원이 깔린다.
// heading 은 막대 위 가운데의 제목, label 은 손잡이마다 아래에 붙는 값 글자다. 둘 다 값을 받는 함수로 줄 수 있다.
type SliderProps = Omit<SliderPrimitive.Root.Props, "children"> & {
  /** 막대 위 가운데에 놓는 제목. 함수를 주면 지금 값들로 만든 내용을 놓는다. */
  heading?: React.ReactNode | ((values: readonly number[]) => React.ReactNode);
  /** 손잡이마다 아래에 붙는 글자. 함수를 주면 그 손잡이의 값으로 만든 내용을 놓는다. */
  label?: React.ReactNode | ((value: number, index: number) => React.ReactNode);
};

function Slider({
  className,
  defaultValue,
  value,
  min = 0,
  max = 100,
  heading,
  label,
  ...props
}: SliderProps) {
  const _values = React.useMemo(
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
      className={cn("w-full", className)}
      defaultValue={defaultValue}
      value={value}
      min={min}
      max={max}
      thumbAlignment="edge"
      // 범위 슬라이더의 손잡이는 서로를 지나쳐 자리를 바꾼다
      thumbCollisionBehavior="swap"
      {...props}
    >
      {heading !== undefined && (
        <SliderPrimitive.Value
          data-slot="slider-heading"
          className="mb-8 block text-center text-headline2 font-semibold
            text-fg-neutral-primary data-disabled:text-fg-disable-primary"
        >
          {(_, values) =>
            typeof heading === "function" ? heading(values) : heading
          }
        </SliderPrimitive.Value>
      )}
      <SliderPrimitive.Control
        data-slot="slider-control"
        className="relative flex w-full cursor-pointer touch-none items-center
          p-2 select-none data-disabled:cursor-default"
      >
        <SliderPrimitive.Track
          data-slot="slider-track"
          className="relative h-1 w-full overflow-hidden rounded-full
            bg-surface-neutral-strong select-none
            data-disabled:bg-surface-disable-primary"
        >
          <SliderPrimitive.Indicator
            data-slot="slider-range"
            className="h-full bg-primary select-none
              data-disabled:bg-surface-disable-primary"
          />
        </SliderPrimitive.Track>
        {_values.map((_, index) => (
          <SliderPrimitive.Thumb
            key={index}
            index={index}
            data-slot="slider-thumb"
            // 흰 테두리는 그림자 토큰에 없어 그대로 적는다
            className="block size-5 shrink-0 cursor-pointer rounded-full
              bg-primary shadow-[0_0_0_2px_var(--color-bg-neutral-primary)]
              outline-none select-none after:absolute after:top-1/2
              after:left-1/2 after:size-8 after:-translate-1/2
              after:rounded-full after:bg-primary after:opacity-0
              after:transition-opacity after:duration-150 after:ease-[ease]
              focus-within:after:opacity-(--interaction-hover)
              hover:after:opacity-(--interaction-hover)
              active:after:opacity-(--interaction-hover)
              data-disabled:pointer-events-none
              data-disabled:bg-surface-disable-primary
              data-disabled:after:hidden [--interaction-hover:0.075]"
          />
        ))}
      </SliderPrimitive.Control>
      {label !== undefined && (
        <SliderPrimitive.Value
          data-slot="slider-label"
          className="relative mt-2 block h-5"
        >
          {(_, values) =>
            values.map((thumbValue, index) => {
              const content =
                typeof label === "function" ? label(thumbValue, index) : label;
              if (content == null || content === false) return null;
              // 손잡이처럼 양끝 안쪽에 머문다 — 값의 비율만큼 오른쪽으로 가고, 자기 폭의 같은 비율만큼 왼쪽으로 당긴다
              const percent = Math.min(
                100,
                Math.max(0, ((thumbValue - min) / (max - min)) * 100),
              );
              return (
                <span
                  key={index}
                  data-slot="slider-label-item"
                  className="absolute top-0 left-(--slider-label-position) w-max
                    -translate-x-(--slider-label-position) text-label1
                    font-medium text-fg-neutral-primary
                    in-data-disabled:text-fg-disable-primary"
                  style={
                    {
                      "--slider-label-position": `${percent}%`,
                    } as React.CSSProperties
                  }
                >
                  {content}
                </span>
              );
            })
          }
        </SliderPrimitive.Value>
      )}
    </SliderPrimitive.Root>
  );
}

export { Slider, type SliderProps };
