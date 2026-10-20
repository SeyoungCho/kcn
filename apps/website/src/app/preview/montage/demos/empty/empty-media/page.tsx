"use client";

import { SearchX } from "lucide-react";
import {
  Empty,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from "@repo/montage/ui/empty";
import { usePreviewDictionary } from "@/components/preview/preview-dictionary-provider";

export default function EmptyMediaDemo() {
  const t = usePreviewDictionary().demos.montage.empty;

  return (
    <div className="flex min-h-screen items-center justify-center p-8">
      <Empty padding="compact">
        <EmptyHeader>
          <EmptyMedia variant="icon">
            <SearchX />
          </EmptyMedia>
          <EmptyTitle>{t.search.title}</EmptyTitle>
          <EmptyDescription>{t.search.description}</EmptyDescription>
        </EmptyHeader>
      </Empty>
    </div>
  );
}
