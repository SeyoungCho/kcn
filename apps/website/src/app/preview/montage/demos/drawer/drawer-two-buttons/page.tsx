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

export default function DrawerTwoButtonsDemo() {
  const t = usePreviewDictionary().demos.montage.drawer;

  return (
    <div className="flex min-h-screen items-center justify-center p-8">
      <Drawer>
        <DrawerTrigger render={<Button variant="outline" />}>
          {t.twoButtons.trigger}
        </DrawerTrigger>
        <DrawerContent>
          <DrawerHeader>
            <DrawerTitle>{t.twoButtons.title}</DrawerTitle>
            <DrawerDescription>{t.twoButtons.description}</DrawerDescription>
          </DrawerHeader>
          <DrawerFooter>
            <DrawerClose render={<Button variant="outline" size="lg" />}>
              {t.twoButtons.cancel}
            </DrawerClose>
            <DrawerClose render={<Button size="lg" />}>
              {t.twoButtons.confirm}
            </DrawerClose>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    </div>
  );
}
