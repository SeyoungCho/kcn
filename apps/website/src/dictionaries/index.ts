import "server-only";
import { i18n, type Lang } from "@/lib/i18n";

import type enDictionary from "./en.json";

export type Dictionary = typeof enDictionary;

const dictionaries = {
  en: () => import("./en.json").then((m) => m.default),
  ko: () => import("./ko.json").then((m) => m.default satisfies Dictionary),
} satisfies Record<Lang, () => Promise<Dictionary>>;

export async function getDictionary(lang: string): Promise<Dictionary> {
  const load = dictionaries[lang as Lang] ?? dictionaries[i18n.defaultLanguage];
  return load();
}
