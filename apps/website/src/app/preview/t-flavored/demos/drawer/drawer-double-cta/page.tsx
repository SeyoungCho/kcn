"use client";

import { Button } from "@repo/t-flavored/ui/button";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@repo/t-flavored/ui/drawer";
import { usePreviewDictionary } from "@/components/preview/preview-dictionary-provider";

export default function DrawerDoubleCtaDemo() {
  const t = usePreviewDictionary().demos.tFlavored.drawer;

  return (
    <div className="flex min-h-screen items-center justify-center p-8">
      <Drawer>
        <DrawerTrigger render={<Button size="xl" />}>{t.trigger}</DrawerTrigger>
        <DrawerContent>
          <DrawerHeader>
            <DrawerTitle>{t.title}</DrawerTitle>
          </DrawerHeader>
          <p className="px-6 text-t5 break-keep text-grey-700">{t.body}</p>
          <DrawerFooter>
            <DrawerClose render={<Button variant="secondary" size="xl" />}>
              {t.close}
            </DrawerClose>
            <DrawerClose render={<Button size="xl" />}>{t.confirm}</DrawerClose>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    </div>
  );
}
