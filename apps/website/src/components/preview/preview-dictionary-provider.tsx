"use client";

import { createContext, useContext, type ReactNode } from "react";
import { useSearchParams } from "next/navigation";

import { getClientDictionary } from "@/dictionaries/client";
import type { Dictionary } from "@/dictionaries";

/**
 * Supplies the active dictionary to preview demo pages.
 *
 * Preview iframes live outside the `[lang]` route tree, so the docs site
 * forwards the active language as a `?lang=` search param (see
 * `use-preview-src.ts`). This provider reads it and resolves the matching
 * dictionary so demos can localize their static labels via
 * {@link usePreviewDictionary}.
 *
 * Wrap it in `<Suspense>` (done in each registry preview `layout.tsx`) because
 * `useSearchParams` requires a Suspense boundary.
 */
const PreviewDictionaryContext = createContext<Dictionary | null>(null);

export function PreviewDictionaryProvider({
  children,
}: {
  children: ReactNode;
}) {
  const lang = useSearchParams().get("lang");
  const dictionary = getClientDictionary(lang);

  return (
    <PreviewDictionaryContext.Provider value={dictionary}>
      {children}
    </PreviewDictionaryContext.Provider>
  );
}

/**
 * Reads the active dictionary inside a preview demo. Throws if used outside
 * {@link PreviewDictionaryProvider} so misuse fails loudly during development.
 */
export function usePreviewDictionary(): Dictionary {
  const dictionary = useContext(PreviewDictionaryContext);

  if (!dictionary) {
    throw new Error(
      "usePreviewDictionary must be used within a PreviewDictionaryProvider",
    );
  }

  return dictionary;
}
