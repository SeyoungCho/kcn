"use client";

import * as React from "react";
import {
  SegmentedControl,
  SegmentedControlItem,
} from "@repo/seed/ui/segmented-control";
import { usePreviewDictionary } from "@/components/preview/preview-dictionary-provider";

const options = ["day", "week", "month"] as const;

type Option = (typeof options)[number];

export default function SegmentedControlControlledDemo() {
  const t = usePreviewDictionary().demos.segmentedControl;
  const [value, setValue] = React.useState<Option>("day");

  return (
    <div
      className="flex min-h-screen flex-col items-center justify-center gap-4
        p-8"
    >
      <SegmentedControl
        value={value}
        onValueChange={(next) => setValue(next as Option)}
        aria-label={t.label}
      >
        {options.map((option) => (
          <SegmentedControlItem key={option} value={option}>
            {t.options[option]}
          </SegmentedControlItem>
        ))}
      </SegmentedControl>
      <p className="text-t3 text-fg-neutral-subtle">
        {t.selected} {t.options[value]}
      </p>
    </div>
  );
}
