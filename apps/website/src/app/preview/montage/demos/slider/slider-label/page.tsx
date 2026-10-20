"use client";

import { Slider } from "@repo/montage/ui/slider";
import { usePreviewDictionary } from "@/components/preview/preview-dictionary-provider";

export default function SliderLabelDemo() {
  const t = usePreviewDictionary().demos.montage.slider;

  return (
    <div className="flex min-h-screen items-center justify-center p-8">
      <span id="slider-label-label" className="sr-only">
        {t.sunlight.label}
      </span>
      <Slider
        defaultValue={[1, 4]}
        max={10}
        aria-labelledby="slider-label-label"
        label={(value) => {
          if (value === 0) return t.sunlight.shade;
          if (value === 10) return t.sunlight.tenPlus;
          return `${value}${t.sunlight.hoursSuffix}`;
        }}
        className="max-w-[360px]"
      />
    </div>
  );
}
