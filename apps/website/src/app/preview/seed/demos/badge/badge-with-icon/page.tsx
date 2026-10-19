"use client";

import IconCheckmarkFatFill from "@karrotmarket/react-monochrome-icon/IconCheckmarkFatFill";
import IconStarFill from "@karrotmarket/react-monochrome-icon/IconStarFill";
import { Badge } from "@repo/seed/ui/badge";
import { usePreviewDictionary } from "@/components/preview/preview-dictionary-provider";

export default function BadgeWithIconDemo() {
  const t = usePreviewDictionary().demos.badge;

  return (
    <div
      className="flex min-h-screen flex-wrap items-center justify-center gap-3
        p-8"
    >
      <Badge tone="positive" variant="weak" prefix={<IconCheckmarkFatFill />}>
        {t.withIcon.verified}
      </Badge>
      <Badge tone="brand" prefix={<IconStarFill />}>
        {t.withIcon.popular}
      </Badge>
      <Badge
        size="large"
        tone="informative"
        variant="outline"
        prefix={<IconCheckmarkFatFill />}
      >
        {t.withIcon.new}
      </Badge>
    </div>
  );
}
