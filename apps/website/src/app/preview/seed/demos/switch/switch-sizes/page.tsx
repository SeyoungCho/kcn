"use client";

import { Switch } from "@repo/seed/ui/switch";
import { usePreviewDictionary } from "@/components/preview/preview-dictionary-provider";

const sizes = [16, 24, 32] as const;

export default function SwitchSizesDemo() {
  const t = usePreviewDictionary().demos.switch;

  return (
    <div className="flex min-h-screen items-center justify-center p-8">
      <div className="flex flex-col gap-4">
        {sizes.map((size) => (
          <Switch
            key={size}
            size={size}
            label={`${t.label} (${size})`}
            defaultChecked
          />
        ))}
      </div>
    </div>
  );
}
