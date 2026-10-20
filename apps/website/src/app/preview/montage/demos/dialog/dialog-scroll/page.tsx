"use client";

import { Button } from "@repo/montage/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@repo/montage/ui/dialog";
import { usePreviewDictionary } from "@/components/preview/preview-dictionary-provider";

export default function DialogScrollDemo() {
  const t = usePreviewDictionary().demos.montage.dialog;
  const terms = [
    t.scroll.terms.booking,
    t.scroll.terms.notes,
    t.scroll.terms.visits,
    t.scroll.terms.supplies,
    t.scroll.terms.changes,
    t.scroll.terms.cancellation,
    t.scroll.terms.health,
    t.scroll.terms.rating,
  ];

  return (
    <div className="flex min-h-screen items-center justify-center p-8">
      <Dialog>
        <DialogTrigger render={<Button variant="outline" />}>
          {t.scroll.trigger}
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{t.scroll.title}</DialogTitle>
            <DialogDescription>{t.scroll.description}</DialogDescription>
          </DialogHeader>
          <ol
            className="flex flex-col gap-4 text-body1-reading break-keep
              text-foreground"
          >
            {terms.map((term, index) => (
              <li key={term}>
                {index + 1}. {term}
              </li>
            ))}
          </ol>
          <DialogFooter>
            <DialogClose render={<Button size="lg" />}>
              {t.scroll.agree}
            </DialogClose>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
