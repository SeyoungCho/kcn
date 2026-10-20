"use client";

import { Badge } from "@repo/montage/ui/badge";
import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardMedia,
  CardTitle,
} from "@repo/montage/ui/card";
import { usePreviewDictionary } from "@/components/preview/preview-dictionary-provider";

export default function CardFooterDemo() {
  const t = usePreviewDictionary().demos.montage.card;

  return (
    <div className="flex min-h-screen items-center justify-center p-8">
      <Card className="w-60">
        <CardMedia>
          <img src="https://picsum.photos/seed/kcn-card/480/320" alt={t.alt} />
        </CardMedia>
        <CardHeader>
          <CardTitle>{t.title}</CardTitle>
          <CardDescription>{t.price}</CardDescription>
        </CardHeader>
        <CardFooter>
          <Badge size="xs">{t.badges.easyCare}</Badge>
          <Badge size="xs" color="brand">
            {t.badges.new}
          </Badge>
        </CardFooter>
      </Card>
    </div>
  );
}
