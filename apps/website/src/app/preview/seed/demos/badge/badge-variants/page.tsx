"use client";

import { Badge } from "@repo/seed/ui/badge";
import { usePreviewDictionary } from "@/components/preview/preview-dictionary-provider";

const tones = [
  "neutral",
  "brand",
  "informative",
  "positive",
  "warning",
  "critical",
] as const;
const variants = ["solid", "weak", "outline"] as const;

export default function BadgeVariantsDemo() {
  const t = usePreviewDictionary().demos.badge;

  return (
    <div className="flex min-h-screen items-center justify-center p-8">
      <div className="flex flex-col gap-3">
        {variants.map((variant) => (
          <div key={variant} className="flex flex-wrap items-center gap-2">
            {tones.map((tone) => (
              <Badge key={tone} variant={variant} tone={tone}>
                {t.tones[tone]}
              </Badge>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}
