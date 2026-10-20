"use client";

import { Button } from "@repo/montage/ui/button";
import { usePreviewDictionary } from "@/components/preview/preview-dictionary-provider";

const variants = [
  "default",
  "secondary",
  "destructive",
  "outline",
  "outline-primary",
  "ghost",
  "link",
] as const;

export default function ButtonVariantsDemo() {
  const t = usePreviewDictionary().demos.montage.button;

  return (
    <div className="flex min-h-screen items-center justify-center p-8">
      <div
        className="flex max-w-[480px] flex-wrap items-center justify-center
          gap-3"
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
