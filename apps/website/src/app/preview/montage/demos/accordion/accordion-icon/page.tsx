"use client";

import { BellIcon, ShieldIcon, UserIcon } from "lucide-react";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@repo/montage/ui/accordion";
import { usePreviewDictionary } from "@/components/preview/preview-dictionary-provider";

export default function AccordionIconDemo() {
  const t = usePreviewDictionary().demos.montage.accordion;
  const items = [
    {
      value: "account",
      icon: UserIcon,
      title: t.topics.account.title,
      content: t.topics.account.content,
    },
    {
      value: "notifications",
      icon: BellIcon,
      title: t.topics.notifications.title,
      content: t.topics.notifications.content,
    },
    {
      value: "privacy",
      icon: ShieldIcon,
      title: t.topics.privacy.title,
      content: t.topics.privacy.content,
    },
  ];

  return (
    <div className="flex min-h-screen items-center justify-center p-8">
      <Accordion className="max-w-[400px]">
        {items.map((item) => (
          <AccordionItem key={item.value} value={item.value}>
            <AccordionTrigger>
              <item.icon />
              {item.title}
            </AccordionTrigger>
            <AccordionContent className="ps-8">{item.content}</AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </div>
  );
}
