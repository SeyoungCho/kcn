"use client";

import { ThemeProvider } from "next-themes";
import type { ReactNode } from "react";
import { PREVIEW_THEME_STORAGE_KEY } from "@/hooks/preview/preview-bridge";

export function PreviewThemeProvider({ children }: { children: ReactNode }) {
  return (
    <ThemeProvider
      attribute="class"
      defaultTheme="light"
      enableSystem={false}
      storageKey={PREVIEW_THEME_STORAGE_KEY}
    >
      {children}
    </ThemeProvider>
  );
}
