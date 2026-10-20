"use client";

import { Slider } from "@repo/montage/ui/slider";
import { usePreviewDictionary } from "@/components/preview/preview-dictionary-provider";

export default function SliderDemo() {
  const t = usePreviewDictionary().demos.montage.slider;

  return (
    <div className="flex min-h-screen items-center justify-center p-8">
      <span id="slider-demo-label" className="sr-only">
        {t.demo.label}
      </span>
      <Slider
        defaultValue={40}
        aria-labelledby="slider-demo-label"
        className="max-w-[360px]"
      />
    </div>
  );
}
