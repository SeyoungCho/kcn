"use client";

import {
  SegmentedControl,
  SegmentedControlItem,
} from "@repo/seed/ui/segmented-control";
import { usePreviewDictionary } from "@/components/preview/preview-dictionary-provider";

export default function SegmentedControlDisabledDemo() {
  const t = usePreviewDictionary().demos.segmentedControl;

  return (
    <div
      className="flex min-h-screen flex-col items-center justify-center gap-4
        p-8"
    >
      <SegmentedControl defaultValue="day" aria-label={t.label}>
        <SegmentedControlItem value="day">{t.options.day}</SegmentedControlItem>
        <SegmentedControlItem value="week">
          {t.options.week}
        </SegmentedControlItem>
        <SegmentedControlItem value="month" disabled>
          {t.options.month}
        </SegmentedControlItem>
      </SegmentedControl>
      <SegmentedControl
        defaultValue="week"
        disabled
        aria-label={t.disabledLabel}
      >
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
