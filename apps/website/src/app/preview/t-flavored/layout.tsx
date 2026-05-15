import "./preview.css";

import { PreviewThemeProvider } from "@/components/preview/preview-theme-provider";
import { PreviewThemeToggle } from "@/components/preview/preview-theme-toggle";

/**
 * Root layout for the t-flavored registry preview iframe.
 *
 * This layout is intentionally MINIMAL: no Fumadocs provider, no docs theme,
 * no shared layout from /[lang]/. Each iframe must be a fresh document so
 * t-flavored's @theme tokens cannot collide with the docs site's theme or
 * with the other registries' themes.
 */
export default function TFlavoredPreviewLayout({
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
