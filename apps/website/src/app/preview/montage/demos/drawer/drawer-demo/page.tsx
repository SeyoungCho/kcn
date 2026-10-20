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

export default function DrawerDemo() {
  const t = usePreviewDictionary().demos.montage.drawer;

  return (
    <div className="flex min-h-screen items-center justify-center p-8">
      <Drawer>
        <DrawerTrigger render={<Button />}>{t.demo.trigger}</DrawerTrigger>
        <DrawerContent>
          <DrawerHeader>
            <DrawerTitle>{t.demo.title}</DrawerTitle>
            <DrawerDescription>{t.demo.description}</DrawerDescription>
          </DrawerHeader>
          <DrawerFooter>
            <DrawerClose render={<Button size="lg" />}>
              {t.demo.confirm}
            </DrawerClose>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    </div>
  );
}
