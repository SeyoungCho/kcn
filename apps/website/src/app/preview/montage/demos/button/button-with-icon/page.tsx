"use client";

import { Bell, Heart, Plus, Search, Settings } from "lucide-react";
import { Button } from "@repo/montage/ui/button";
import { usePreviewDictionary } from "@/components/preview/preview-dictionary-provider";

export default function ButtonWithIconDemo() {
  const t = usePreviewDictionary().demos.montage.button;

  return (
    <div
      className="flex min-h-screen flex-col items-center justify-center gap-4
        p-8"
    >
      <div className="flex flex-wrap items-center justify-center gap-3">
        <Button>
          <Plus />
          {t.withIcon.addToCart}
        </Button>
        <Button variant="outline">
          <Heart />
          {t.withIcon.wishlist}
        </Button>
      </div>
      <div className="flex items-center gap-2">
        <Button variant="ghost" size="icon" aria-label={t.withIcon.search}>
          <Search />
        </Button>
        <Button
          variant="secondary"
          size="icon"
          aria-label={t.withIcon.notifications}
        >
          <Bell />
        </Button>
        <Button variant="outline" size="icon" aria-label={t.withIcon.settings}>
          <Settings />
        </Button>
      </div>
    </div>
  );
}
