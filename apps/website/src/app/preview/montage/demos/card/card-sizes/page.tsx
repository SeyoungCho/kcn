"use client";

import {
  Card,
  CardDescription,
  CardHeader,
  CardMedia,
  CardTitle,
} from "@repo/montage/ui/card";
import { usePreviewDictionary } from "@/components/preview/preview-dictionary-provider";

export default function CardSizesDemo() {
  const t = usePreviewDictionary().demos.montage.card;

  return (
    <div className="flex min-h-screen items-center justify-center p-8">
      <div className="flex flex-wrap items-start justify-center gap-6">
        <Card className="w-60">
          <CardMedia>
            <img
              src="https://picsum.photos/seed/kcn-card/480/320"
              alt={t.alt}
            />
          </CardMedia>
          <CardHeader>
            <CardTitle>{t.title}</CardTitle>
            <CardDescription>{t.sizes.default}</CardDescription>
          </CardHeader>
        </Card>
        <Card size="sm" className="w-48">
          <CardMedia>
            <img
              src="https://picsum.photos/seed/kcn-card/480/320"
              alt={t.alt}
            />
          </CardMedia>
          <CardHeader>
            <CardTitle>{t.title}</CardTitle>
            <CardDescription>{t.sizes.sm}</CardDescription>
          </CardHeader>
        </Card>
      </div>
    </div>
  );
}
