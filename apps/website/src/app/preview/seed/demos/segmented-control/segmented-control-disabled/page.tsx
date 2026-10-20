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
      <SegmentedControl defaultValue="shade" aria-label={t.label}>
        <SegmentedControlItem value="shade">
          {t.options.shade}
        </SegmentedControlItem>
        <SegmentedControlItem value="partShade">
          {t.options.partShade}
        </SegmentedControlItem>
        <SegmentedControlItem value="fullSun" disabled>
          {t.options.fullSun}
        </SegmentedControlItem>
      </SegmentedControl>
      <SegmentedControl
        defaultValue="partShade"
        disabled
        aria-label={t.disabledLabel}
      >
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
