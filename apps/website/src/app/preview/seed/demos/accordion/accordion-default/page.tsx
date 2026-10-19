"use client";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@repo/seed/ui/accordion";
import { usePreviewDictionary } from "@/components/preview/preview-dictionary-provider";

const keys = ["shipping", "returns", "payment"] as const;

export default function AccordionDefaultDemo() {
  const t = usePreviewDictionary().demos.accordion;

  return (
    <div className="flex min-h-screen items-center justify-center p-8">
      <div className="w-full max-w-[480px]">
        <Accordion defaultValues={["shipping"]}>
          {keys.map((key) => (
            <AccordionItem key={key} value={key}>
              <AccordionTrigger title={t.items[key].title} />
              <AccordionContent>
                <p
                  className="m-0 px-x-global-gutter pb-x4 text-t4
                    text-fg-neutral-muted"
                >
                  {t.items[key].content}
                </p>
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </div>
  );
}
