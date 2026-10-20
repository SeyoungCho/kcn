"use client";

import {
  NumberField,
  NumberFieldDecrement,
  NumberFieldGroup,
  NumberFieldIncrement,
  NumberFieldInput,
} from "@repo/t-flavored/ui/number-field";
import { usePreviewDictionary } from "@/components/preview/preview-dictionary-provider";

export default function NumberFieldDemo() {
  const t = usePreviewDictionary().demos.tFlavored.numberField;

  return (
    <div className="flex min-h-screen items-center justify-center p-8">
      <NumberField size="lg" defaultValue={0}>
        <NumberFieldGroup>
          <NumberFieldDecrement aria-label={t.decrease} />
          <NumberFieldInput aria-label={t.quantity} />
          <NumberFieldIncrement aria-label={t.increase} />
        </NumberFieldGroup>
      </NumberField>
    </div>
  );
}
