"use client";

import { Switch } from "@repo/montage/ui/switch";
import { usePreviewDictionary } from "@/components/preview/preview-dictionary-provider";

export default function SwitchDemo() {
  const t = usePreviewDictionary().demos.montage.switch;

  return (
    <div className="flex min-h-screen items-center justify-center p-8">
      <div className="flex w-full max-w-[280px] flex-col gap-4">
        <label
          className="flex items-center justify-between gap-4 text-body1
            text-fg-neutral-primary"
        >
          {t.demo.watering}
          <Switch defaultChecked />
        </label>
        <label
          className="flex items-center justify-between gap-4 text-body1
            text-fg-neutral-primary"
        >
          {t.demo.tips}
          <Switch />
        </label>
      </div>
    </div>
  );
}
