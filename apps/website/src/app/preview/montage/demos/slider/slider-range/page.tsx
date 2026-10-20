"use client";

import { Slider } from "@repo/montage/ui/slider";
import { usePreviewDictionary } from "@/components/preview/preview-dictionary-provider";

export default function SliderRangeDemo() {
  const t = usePreviewDictionary().demos.montage.slider;

  return (
    <div className="flex min-h-screen items-center justify-center p-8">
      <span id="slider-range-label" className="sr-only">
        {t.range.label}
      </span>
      <Slider
        defaultValue={[20, 70]}
        aria-labelledby="slider-range-label"
        className="max-w-[360px]"
      />
    </div>
  );
}
