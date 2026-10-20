"use client";

import { ChevronRight } from "lucide-react";
import { Badge } from "@repo/t-flavored/ui/badge";
import { usePreviewDictionary } from "@/components/preview/preview-dictionary-provider";

export default function BadgeLinkDemo() {
  const t = usePreviewDictionary().demos.tFlavored.badge;

  return (
    <div className="flex min-h-screen items-center justify-center p-8">
      <Badge variant="weak" size="lg" render={<a href="#" />}>
        {t.link}
        <ChevronRight />
      </Badge>
    </div>
  );
}
