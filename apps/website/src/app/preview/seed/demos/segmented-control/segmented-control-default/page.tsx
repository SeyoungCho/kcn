"use client";

import {
  SegmentedControl,
  SegmentedControlItem,
} from "@repo/seed/ui/segmented-control";
import { usePreviewDictionary } from "@/components/preview/preview-dictionary-provider";

export default function SegmentedControlDefaultDemo() {
  const t = usePreviewDictionary().demos.segmentedControl;

  return (
    <div className="flex min-h-screen items-center justify-center p-8">
      <SegmentedControl defaultValue="week" aria-label={t.label}>
        <SegmentedControlItem value="day">{t.options.day}</SegmentedControlItem>
        <SegmentedControlItem value="week">
          {t.options.week}
        </SegmentedControlItem>
        <SegmentedControlItem value="month">
          {t.options.month}
        </SegmentedControlItem>
      </SegmentedControl>
    </div>
  );
}
