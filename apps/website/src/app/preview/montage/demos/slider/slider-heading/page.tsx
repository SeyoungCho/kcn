"use client";

import { Slider } from "@repo/montage/ui/slider";
import { usePreviewDictionary } from "@/components/preview/preview-dictionary-provider";

const MIN = 0;
const MAX = 10;

export default function SliderHeadingDemo() {
  const t = usePreviewDictionary().demos.montage.slider;

  const formatHours = (value: number) => {
    if (value === MIN) return t.sunlight.shade;
    if (value === MAX) return t.sunlight.tenPlus;
    return `${value}${t.sunlight.hoursSuffix}`;
  };

  return (
    <div className="flex min-h-screen items-center justify-center p-8">
      <span id="slider-heading-label" className="sr-only">
        {t.sunlight.label}
      </span>
      <Slider
        min={MIN}
        max={MAX}
        defaultValue={[MIN, MAX]}
        aria-labelledby="slider-heading-label"
        heading={([from = MIN, to = MAX]) => {
          if (from === MIN && to === MAX) return t.sunlight.any;
          if (from === to) return `${t.sunlight.title} ${formatHours(from)}`;
          return `${formatHours(from)} ~ ${formatHours(to)}`;
        }}
        label={formatHours}
        className="max-w-[360px]"
      />
    </div>
  );
}
