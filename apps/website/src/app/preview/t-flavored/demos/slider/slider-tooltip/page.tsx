"use client";

import { Field, FieldLabel } from "@repo/t-flavored/ui/field";
import { Slider } from "@repo/t-flavored/ui/slider";
import { usePreviewDictionary } from "@/components/preview/preview-dictionary-provider";

export default function SliderTooltipDemo() {
  const t = usePreviewDictionary().demos.tFlavored.slider;

  return (
    <div className="flex min-h-screen items-center justify-center p-8">
      <Field className="w-full max-w-[360px] gap-14">
        <FieldLabel>{t.tooltip.label}</FieldLabel>
        <Slider defaultValue={50} tooltip />
      </Field>
    </div>
  );
}
