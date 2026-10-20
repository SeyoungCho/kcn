"use client";

import { Button } from "@repo/t-flavored/ui/button";
import { Toaster, toast } from "@repo/t-flavored/ui/toast";
import { usePreviewDictionary } from "@/components/preview/preview-dictionary-provider";

const types = ["success", "error", "info"] as const;

export default function ToastTypesDemo() {
  const t = usePreviewDictionary().demos.tFlavored.toast;

  return (
    <div className="flex min-h-screen items-center justify-center gap-3 p-8">
      {types.map((type) => (
        <Button
          key={type}
          variant="secondary"
          onClick={() => toast.add({ title: t.types[type].message, type })}
        >
          {t.types[type].trigger}
        </Button>
      ))}
      <Toaster position="top" />
    </div>
  );
}
