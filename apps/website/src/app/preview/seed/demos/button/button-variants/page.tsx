"use client";

import { Button } from "@repo/seed/ui/button";
import { usePreviewDictionary } from "@/components/preview/preview-dictionary-provider";

const variants = [
  "brandSolid",
  "neutralSolid",
  "neutralWeak",
  "criticalSolid",
  "brandOutline",
  "neutralOutline",
  "ghost",
] as const;

export default function ButtonVariantsDemo() {
  const t = usePreviewDictionary().demos.button;

  return (
    <div className="flex min-h-screen items-center justify-center p-8">
      <div
        className="grid w-full max-w-[560px] grid-cols-1 gap-3 sm:grid-cols-2"
      >
        {variants.map((variant) => (
          <Button key={variant} variant={variant}>
            {t.variants[variant]}
          </Button>
        ))}
      </div>
    </div>
  );
}
