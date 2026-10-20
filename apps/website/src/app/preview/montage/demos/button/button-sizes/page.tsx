"use client";

import { Button } from "@repo/montage/ui/button";
import { usePreviewDictionary } from "@/components/preview/preview-dictionary-provider";

const sizes = ["xs", "sm", "default", "lg"] as const;

export default function ButtonSizesDemo() {
  const t = usePreviewDictionary().demos.montage.button;

  return (
    <div
      className="flex min-h-screen flex-wrap items-center justify-center gap-3
        p-8"
    >
      {sizes.map((size) => (
        <Button key={size} size={size}>
          {t.sizes[size]}
        </Button>
      ))}
    </div>
  );
}
