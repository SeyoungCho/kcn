"use client";

import { Tv } from "lucide-react";
import {
  Empty,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from "@repo/t-flavored/ui/empty";
import { usePreviewDictionary } from "@/components/preview/preview-dictionary-provider";

export default function EmptyFigureDemo() {
  const t = usePreviewDictionary().demos.tFlavored.empty;

  return (
    <div className="flex min-h-screen items-center justify-center p-8">
      <Empty className="max-w-[420px]">
        <EmptyHeader>
          <EmptyMedia>
            <Tv className="size-15 text-grey-400" strokeWidth={1.5} />
          </EmptyMedia>
          <EmptyTitle>{t.preparing.title}</EmptyTitle>
          <EmptyDescription>{t.preparing.description}</EmptyDescription>
        </EmptyHeader>
      </Empty>
    </div>
  );
}
