"use client";

import { Spinner } from "@repo/montage/ui/spinner";
import { usePreviewDictionary } from "@/components/preview/preview-dictionary-provider";

export default function SpinnerVariantsDemo() {
  const t = usePreviewDictionary().demos.montage.spinner;
  const variants = [
    { variant: "default", label: t.variants.default },
    { variant: "brand", label: t.variants.brand },
  ] as const;

  return (
    <div className="flex min-h-screen items-center justify-center gap-12 p-8">
      {variants.map(({ variant, label }) => (
        <div key={variant} className="flex flex-col items-center gap-3">
          <Spinner variant={variant} />
          <span className="text-caption1 text-fg-neutral-secondary">
            {label}
          </span>
        </div>
      ))}
    </div>
  );
}
