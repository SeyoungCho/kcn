"use client";

import { Badge } from "@repo/t-flavored/ui/badge";
import { usePreviewDictionary } from "@/components/preview/preview-dictionary-provider";

// 왼쪽은 fill, 오른쪽은 같은 색의 weak
const pairs = [
  ["default", "weak"],
  ["teal", "teal-weak"],
  ["green", "green-weak"],
  ["destructive", "destructive-weak"],
  ["yellow", "yellow-weak"],
  ["dark", "secondary"],
] as const;

export default function BadgeVariantsDemo() {
  const t = usePreviewDictionary().demos.tFlavored.badge;

  return (
    <div className="flex min-h-screen items-center justify-center p-8">
      <div
        className="grid grid-cols-2 items-center justify-items-start gap-x-3
          gap-y-2"
      >
        {pairs.flat().map((variant) => (
          <Badge key={variant} variant={variant}>
            {t.variants[variant]}
          </Badge>
        ))}
      </div>
    </div>
  );
}
