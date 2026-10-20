"use client";

import { GlobeIcon } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@repo/montage/ui/select";
import { usePreviewDictionary } from "@/components/preview/preview-dictionary-provider";

export default function SelectWithIconDemo() {
  const t = usePreviewDictionary().demos.montage.select;
  const languages = {
    ko: t.language.korean,
    en: t.language.english,
    ja: t.language.japanese,
    zh: t.language.chinese,
  };

  return (
    <div className="flex min-h-screen items-center justify-center p-8">
      <Select items={languages} defaultValue="ko">
        <SelectTrigger aria-label={t.language.label} className="w-80">
          <GlobeIcon />
          <SelectValue placeholder={t.language.placeholder} />
        </SelectTrigger>
        <SelectContent>
          {Object.entries(languages).map(([value, label]) => (
            <SelectItem key={value} value={value}>
              {label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
}
