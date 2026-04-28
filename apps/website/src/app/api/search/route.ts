import { source } from "@/lib/source";
import { createFromSource } from "fumadocs-core/search/server";

export const { GET } = createFromSource(source, {
  localeMap: {
    en: { language: "english" },
    ko: { language: "korean" },
  },
  // Orama language names: https://docs.orama.com/docs/orama-js/supported-languages
  language: "english",
});
