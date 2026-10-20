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
      <SegmentedControl defaultValue="partShade" aria-label={t.label}>
        <SegmentedControlItem value="shade">
          {t.options.shade}
        </SegmentedControlItem>
        <SegmentedControlItem value="partShade">
          {t.options.partShade}
        </SegmentedControlItem>
        <SegmentedControlItem value="fullSun">
          {t.options.fullSun}
        </SegmentedControlItem>
      </SegmentedControl>
    </div>
  );
}
