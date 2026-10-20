"use client";

import { Info } from "lucide-react";
import { Button } from "@repo/t-flavored/ui/button";
import {
  Empty,
  EmptyContent,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from "@repo/t-flavored/ui/empty";
import { usePreviewDictionary } from "@/components/preview/preview-dictionary-provider";

export default function EmptyDemo() {
  const t = usePreviewDictionary().demos.tFlavored.empty;

  return (
    <div className="flex min-h-screen items-center justify-center p-8">
      <Empty className="max-w-[420px]">
        <EmptyHeader>
          <EmptyMedia variant="icon">
            <Info />
          </EmptyMedia>
          <EmptyTitle>{t.retry.title}</EmptyTitle>
          <EmptyDescription>{t.retry.description}</EmptyDescription>
        </EmptyHeader>
        <EmptyContent>
          <Button>{t.retry.action}</Button>
        </EmptyContent>
      </Empty>
    </div>
  );
}
