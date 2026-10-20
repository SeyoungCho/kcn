"use client";

import { useState } from "react";
import { Bookmark } from "lucide-react";
import { Button } from "@repo/montage/ui/button";
import {
  Card,
  CardAction,
  CardDescription,
  CardHeader,
  CardMedia,
  CardTitle,
} from "@repo/montage/ui/card";
import { usePreviewDictionary } from "@/components/preview/preview-dictionary-provider";

export default function CardMediaActionDemo() {
  const t = usePreviewDictionary().demos.montage.card;
  const [saved, setSaved] = useState(false);

  return (
    <div className="flex min-h-screen items-center justify-center p-8">
      <Card className="w-60">
        <CardMedia>
          <img src="https://picsum.photos/seed/kcn-card/480/320" alt={t.alt} />
          <CardAction>
            <span>{t.overlay}</span>
            <Button
              variant="ghost"
              size="icon-xs"
              className="size-6"
              aria-label={t.wishlist}
              aria-pressed={saved}
              onClick={() => setSaved((value) => !value)}
            >
              <Bookmark
                className={
                  saved ? "size-6 fill-current text-fg-brand-primary" : "size-6"
                }
              />
            </Button>
          </CardAction>
        </CardMedia>
        <CardHeader>
          <CardTitle>{t.title}</CardTitle>
          <CardDescription>{t.price}</CardDescription>
        </CardHeader>
      </Card>
    </div>
  );
}
