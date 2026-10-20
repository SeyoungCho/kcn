"use client";

import { Field, FieldLabel } from "@repo/t-flavored/ui/field";
import { Slider } from "@repo/t-flavored/ui/slider";
import { usePreviewDictionary } from "@/components/preview/preview-dictionary-provider";

export default function SliderLabelsDemo() {
  const t = usePreviewDictionary().demos.tFlavored.slider;

  return (
    <div className="flex min-h-screen items-center justify-center p-8">
      <Field className="w-full max-w-[360px]">
        <FieldLabel>{t.labels.label}</FieldLabel>
        <Slider
          defaultValue={150}
          min={100}
          max={200}
          labels={{ min: t.labels.min, mid: t.labels.mid, max: t.labels.max }}
        />
      </Field>
    </div>
  );
}
