"use client";

import { Spinner } from "@repo/t-flavored/ui/spinner";
import { usePreviewDictionary } from "@/components/preview/preview-dictionary-provider";

export default function SpinnerDemo() {
  const t = usePreviewDictionary().demos.tFlavored.spinner;

  return (
    <div className="flex min-h-screen items-center justify-center p-8">
      <Spinner aria-label={t.loading} />
    </div>
  );
}
