"use client";

import { Button } from "@repo/t-flavored/ui/button";
import { usePreviewDictionary } from "@/components/preview/preview-dictionary-provider";

const variants = [
  "default",
  "weak",
  "dark",
  "secondary",
  "destructive",
  "destructive-weak",
  "outline",
  "ghost",
  "link",
] as const;

export default function ButtonVariantsDemo() {
  const t = usePreviewDictionary().demos.tFlavored.button;

  return (
    <div className="flex min-h-screen items-center justify-center p-8">
      <div
        className="grid w-full max-w-[480px] grid-cols-2 gap-3 sm:grid-cols-3"
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
