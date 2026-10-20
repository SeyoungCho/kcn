"use client";

import { Field, FieldGroup, FieldLabel } from "@repo/t-flavored/ui/field";
import { Slider } from "@repo/t-flavored/ui/slider";
import { usePreviewDictionary } from "@/components/preview/preview-dictionary-provider";

export default function SliderColorsDemo() {
  const t = usePreviewDictionary().demos.tFlavored.slider;

  return (
    <div className="flex min-h-screen items-center justify-center p-8">
      <FieldGroup className="w-full max-w-[360px] gap-4">
        <Field>
          <FieldLabel>{t.colors.blue}</FieldLabel>
          <Slider
            defaultValue={50}
            className="[--slider-color:var(--color-blue-500)]"
          />
        </Field>
        <Field>
          <FieldLabel>{t.colors.green}</FieldLabel>
          <Slider
            defaultValue={50}
            className="[--slider-color:var(--color-green-500)]"
          />
        </Field>
        <Field>
          <FieldLabel>{t.colors.red}</FieldLabel>
          <Slider
            defaultValue={50}
            className="[--slider-color:var(--color-red-500)]"
          />
        </Field>
      </FieldGroup>
    </div>
  );
}
