import "./preview.css";

import { PreviewThemeProvider } from "@/components/preview/preview-theme-provider";
import { PreviewThemeToggle } from "@/components/preview/preview-theme-toggle";

/**
 * Root layout for the seed registry preview iframe.
 *
 * This layout is intentionally MINIMAL: no Fumadocs provider, no docs theme,
 * no shared layout from /[lang]/. Each iframe must be a fresh document so
 * seed's @theme tokens cannot collide with the docs site's theme or with the
 * other registries' themes.
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
          {children}
        </PreviewThemeProvider>
      </body>
    </html>
  );
}
