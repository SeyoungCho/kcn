"use client";

import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { ThemeSwitch } from "@/components/preview/theme-switch";
import { usePreviewIframeMessenger } from "@/hooks/preview/use-preview-iframe-messenger";
import type { PreviewTheme } from "@/hooks/preview/preview-bridge";

export function PreviewThemeToggle() {
  const [mounted, setMounted] = useState(false);
  const { resolvedTheme, setTheme } = useTheme();

  useEffect(() => {
    setMounted(true);
  }, []);

  const darkMode = mounted && resolvedTheme === "dark";
  const previewTheme: PreviewTheme = darkMode ? "dark" : "light";

  usePreviewIframeMessenger({ enabled: mounted, theme: previewTheme });

  function handleToggle() {
    setTheme(darkMode ? "light" : "dark");
  }

  return (
    <ThemeSwitch
      value={darkMode}
      onToggle={handleToggle}
      iconOn={<Moon className="size-4" />}
      iconOff={<Sun className="size-4" />}
      className="fixed top-3 left-3 z-10"
    />
  );
}
