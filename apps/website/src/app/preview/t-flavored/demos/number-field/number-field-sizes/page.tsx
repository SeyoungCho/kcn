"use client";

import {
  NumberField,
  NumberFieldDecrement,
  NumberFieldGroup,
  NumberFieldIncrement,
  NumberFieldInput,
} from "@repo/t-flavored/ui/number-field";
import { usePreviewDictionary } from "@/components/preview/preview-dictionary-provider";

const sizes = ["xs", "sm", "default", "lg"] as const;

export default function NumberFieldSizesDemo() {
  const t = usePreviewDictionary().demos.tFlavored.numberField;

  return (
    <div
      className="flex min-h-screen flex-wrap items-center justify-center gap-2
        p-8"
    >
      {sizes.map((size) => (
        <NumberField key={size} size={size} defaultValue={0}>
          <NumberFieldGroup>
            <NumberFieldDecrement aria-label={t.decrease} />
            <NumberFieldInput aria-label={`${t.quantity} (${t.sizes[size]})`} />
            <NumberFieldIncrement aria-label={t.increase} />
          </NumberFieldGroup>
        </NumberField>
      ))}
    </div>
  );
}
