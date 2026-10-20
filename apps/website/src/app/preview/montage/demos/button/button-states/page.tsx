"use client";

import { Button } from "@repo/montage/ui/button";
import { usePreviewDictionary } from "@/components/preview/preview-dictionary-provider";

export default function ButtonStatesDemo() {
  const t = usePreviewDictionary().demos.montage.button;

  return (
    <div
      className="flex min-h-screen flex-wrap items-center justify-center gap-3
        p-8"
    >
      <Button loading>{t.states.loading}</Button>
      <Button variant="outline" loading>
        {t.states.loading}
      </Button>
      <Button disabled>{t.states.disabled}</Button>
      <Button variant="outline" disabled>
        {t.states.disabled}
      </Button>
    </div>
  );
}
