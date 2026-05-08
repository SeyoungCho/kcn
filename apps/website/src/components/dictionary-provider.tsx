"use client";

import { createContext, useContext, type ReactNode } from "react";
import type { Dictionary } from "@/dictionaries";

/**
 * Client-side bridge for the server-loaded i18n dictionary.
 *
 * `getDictionary()` is `"server-only"`, so client components can't import it
 * directly. Instead, the [lang]/layout.tsx server component awaits the
 * dictionary and passes the (JSON-serializable) value into this provider,
 * making it available to any descendant client component via
 * {@link useDictionary}.
 *
 * Add new strings by editing `src/dictionaries/{en,ko}.json`; the shape is
 * derived from `en.json` via the `Dictionary` type, so TypeScript will catch
 * any keys that drift between locales.
 */
const DictionaryContext = createContext<Dictionary | null>(null);

export function DictionaryProvider({
  value,
  children,
}: {
  value: Dictionary;
  children: ReactNode;
}) {
  return (
    <DictionaryContext.Provider value={value}>
      {children}
    </DictionaryContext.Provider>
  );
}

/**
 * Read the active dictionary inside any client component rendered under the
 * [lang]/ tree. Returns `null` if the provider is not in scope (e.g. inside
 * an isolated `/preview/...` iframe), so callers should fall back to a
 * hardcoded English string.
 */
export function useDictionary(): Dictionary | null {
  return useContext(DictionaryContext);
}
