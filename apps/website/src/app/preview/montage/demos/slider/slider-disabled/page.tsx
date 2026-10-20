"use client";

import { Slider } from "@repo/montage/ui/slider";
import { usePreviewDictionary } from "@/components/preview/preview-dictionary-provider";

export default function SliderDisabledDemo() {
  const t = usePreviewDictionary().demos.montage.slider;

  return (
    <div className="flex min-h-screen items-center justify-center p-8">
      <span id="slider-disabled-label" className="sr-only">
        {t.disabled.heading}
      </span>
      <Slider
        defaultValue={60}
        disabled
        heading={t.disabled.heading}
        label={t.disabled.label}
        aria-labelledby="slider-disabled-label"
        className="max-w-[360px]"
      />
    </div>
  );
}
