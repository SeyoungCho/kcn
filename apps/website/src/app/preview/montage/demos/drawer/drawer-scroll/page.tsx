"use client";

import { Button } from "@repo/montage/ui/button";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@repo/montage/ui/drawer";
import { usePreviewDictionary } from "@/components/preview/preview-dictionary-provider";

export default function DrawerScrollDemo() {
  const t = usePreviewDictionary().demos.montage.drawer;
  const steps = [
    t.scroll.steps.light,
    t.scroll.steps.rotate,
    t.scroll.steps.water,
    t.scroll.steps.saucer,
    t.scroll.steps.leaves,
    t.scroll.steps.food,
    t.scroll.steps.winter,
    t.scroll.steps.pets,
  ];

  return (
    <div className="flex min-h-screen items-center justify-center p-8">
      <Drawer>
        <DrawerTrigger render={<Button variant="outline" />}>
          {t.scroll.trigger}
        </DrawerTrigger>
        <DrawerContent>
          <DrawerHeader>
            <DrawerTitle>{t.scroll.title}</DrawerTitle>
            <DrawerDescription>{t.scroll.description}</DrawerDescription>
          </DrawerHeader>
          <ol
            className="flex flex-col gap-4 text-body1-reading break-keep
              text-foreground"
          >
            {steps.map((step, index) => (
              <li key={step}>
                {index + 1}. {step}
              </li>
            ))}
          </ol>
          <DrawerFooter>
            <DrawerClose render={<Button size="lg" />}>
              {t.scroll.done}
            </DrawerClose>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    </div>
  );
}
