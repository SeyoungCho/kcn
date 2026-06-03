import "./preview.css";

import { Suspense } from "react";

import { PreviewThemeProvider } from "@/components/preview/preview-theme-provider";
import { PreviewThemeToggle } from "@/components/preview/preview-theme-toggle";
import { PreviewDictionaryProvider } from "@/components/preview/preview-dictionary-provider";

/**
 * Root layout for the seed registry preview iframe.
 *
 * This layout is intentionally MINIMAL: no Fumadocs provider, no docs theme,
 * no shared layout from /[lang]/. Each iframe must be a fresh document so
 * seed's @theme tokens cannot collide with the docs site's theme or with the
 * other registries' themes.
 *
 * `PreviewDictionaryProvider` reads the forwarded `?lang=` param so demos can
 * localize their labels; it needs a Suspense boundary for `useSearchParams`.
 *
 * Sibling segments under /app/preview/{registry}/ each have their own layout
 * + CSS bundle, giving every registry a fully isolated rendering environment.
 */
export default function SeedPreviewLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="bg-background text-foreground">
        <PreviewThemeProvider>
          <PreviewThemeToggle />
          <Suspense>
            <PreviewDictionaryProvider>{children}</PreviewDictionaryProvider>
          </Suspense>
        </PreviewThemeProvider>
      </body>
    </html>
  );
}
