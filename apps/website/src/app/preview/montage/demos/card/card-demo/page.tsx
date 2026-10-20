"use client";

import {
  Card,
  CardDescription,
  CardHeader,
  CardMedia,
  CardTitle,
} from "@repo/montage/ui/card";
import { usePreviewDictionary } from "@/components/preview/preview-dictionary-provider";

export default function CardDemo() {
  const t = usePreviewDictionary().demos.montage.card;

  return (
    <div className="flex min-h-screen items-center justify-center p-8">
      <Card className="w-60" render={<a href="#" />}>
        <CardMedia>
          <img src="https://picsum.photos/seed/kcn-card/480/320" alt={t.alt} />
        </CardMedia>
        <CardHeader>
          <CardTitle>{t.title}</CardTitle>
          <CardDescription>{t.price}</CardDescription>
          <CardDescription>{t.rating}</CardDescription>
        </CardHeader>
      </Card>
    </div>
  );
}
