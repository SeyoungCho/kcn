"use client";

import * as React from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@repo/t-flavored/ui/accordion";
import { Button } from "@repo/t-flavored/ui/button";
import { usePreviewDictionary } from "@/components/preview/preview-dictionary-provider";

const questions = ["watering", "damaged", "petSafe"] as const;

export default function AccordionControlledDemo() {
  const t = usePreviewDictionary().demos.tFlavored.accordion;
  const [value, setValue] = React.useState<string[]>([]);
  const allOpen = value.length === questions.length;

  return (
    <div className="flex min-h-screen items-center justify-center p-8">
      <div className="flex w-full max-w-[400px] flex-col items-end gap-3">
        <Button
          variant="weak"
          size="sm"
          className="me-4"
          onClick={() => setValue(allOpen ? [] : [...questions])}
        >
          {allOpen ? t.closeAll : t.openAll}
        </Button>
        <Accordion
          multiple
          value={value}
          onValueChange={(next) => setValue(next as string[])}
        >
          {questions.map((question) => (
            <AccordionItem key={question} value={question}>
              <AccordionTrigger>
                <span className="text-primary">{t.prefix}</span>
                {t.faq[question].question}
              </AccordionTrigger>
              <AccordionContent>{t.faq[question].answer}</AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </div>
  );
}
