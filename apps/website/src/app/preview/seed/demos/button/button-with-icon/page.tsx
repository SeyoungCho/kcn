"use client";

import { Button } from "@repo/seed/ui/button";
import { Heart, PlusCircle, Trash } from "lucide-react";
import { usePreviewDictionary } from "@/components/preview/preview-dictionary-provider";

export default function ButtonWithIconDemo() {
  const t = usePreviewDictionary().demos.button;

  return (
    <div className="flex min-h-screen items-center justify-center gap-3 p-8">
      <Button>
        <Heart />
        {t.withIcon.like}
      </Button>

      <Button variant="neutralOutline">
        <PlusCircle />
        {t.withIcon.add}
      </Button>

      <Button variant="criticalSolid">
        <Trash />
        {t.withIcon.delete}
      </Button>
    </div>
  );
}
