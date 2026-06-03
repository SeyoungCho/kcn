import { i18n, type Lang } from "@/lib/i18n";

import en from "./en.json";
import ko from "./ko.json";
import type { Dictionary } from ".";

/**
 * Client-safe dictionary accessor for the preview iframe.
 *
 * The server-only `getDictionary()` cannot be imported into client components,
 * so the preview dictionary provider resolves the active language (from the
 * `?lang=` search param the docs site forwards) synchronously here. Falls back
 * to the default language for missing/unknown values.
 */
const dictionaries: Record<Lang, Dictionary> = { en, ko };

export function getClientDictionary(lang?: string | null): Dictionary {
  return dictionaries[lang as Lang] ?? dictionaries[i18n.defaultLanguage];
}
