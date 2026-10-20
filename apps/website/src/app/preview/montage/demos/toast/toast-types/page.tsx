"use client";

import { Button } from "@repo/montage/ui/button";
import { Toaster, toast } from "@repo/montage/ui/toast";
import { usePreviewDictionary } from "@/components/preview/preview-dictionary-provider";

export default function ToastTypesDemo() {
  const t = usePreviewDictionary().demos.montage.toast;
  const types = [
    {
      type: "success",
      trigger: t.types.success.trigger,
      message: t.types.success.message,
    },
    {
      type: "warning",
      trigger: t.types.warning.trigger,
      message: t.types.warning.message,
    },
    {
      type: "error",
      trigger: t.types.error.trigger,
      message: t.types.error.message,
    },
  ] as const;

  return (
    <div className="flex min-h-screen items-center justify-center gap-3 p-8">
      {types.map(({ type, trigger, message }) => (
        <Button
          key={type}
          variant="outline"
          onClick={() =>
            toast.add({
              title: message,
              type,
              priority: type === "error" ? "high" : "low",
            })
          }
        >
          {trigger}
        </Button>
      ))}
      <Toaster />
    </div>
  );
}
