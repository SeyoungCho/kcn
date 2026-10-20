"use client";

import { Switch } from "@repo/t-flavored/ui/switch";
import { usePreviewDictionary } from "@/components/preview/preview-dictionary-provider";

export default function SwitchDemo() {
  const t = usePreviewDictionary().demos.tFlavored.switch;

  return (
    <div className="flex min-h-screen items-center justify-center p-8">
      <div className="flex w-full max-w-[360px] flex-col gap-5">
        <label
          className="flex items-center justify-between gap-3 text-t5
            text-grey-800"
        >
          {t.demo.watering}
          <Switch defaultChecked />
        </label>
        <label
          className="flex items-center justify-between gap-3 text-t5
            text-grey-800"
        >
          {t.demo.newArrivals}
          <Switch />
        </label>
      </div>
    </div>
  );
}
