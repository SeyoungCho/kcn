"use client";

import { Button } from "@repo/t-flavored/ui/button";
import { usePreviewDictionary } from "@/components/preview/preview-dictionary-provider";

export default function ButtonStatesDemo() {
  const t = usePreviewDictionary().demos.tFlavored.button;

  return (
    <div
      className="flex min-h-screen flex-wrap items-center justify-center gap-3
        p-8"
    >
      <Button loading>{t.states.loading}</Button>
      <Button variant="weak" loading>
        {t.states.loading}
      </Button>
      <Button disabled>{t.states.disabled}</Button>
      <Button variant="dark" disabled>
        {t.states.disabled}
      </Button>
    </div>
  );
}
