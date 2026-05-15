"use client";

import { useEffect, useState } from "react";
import {
  isPreviewTheme,
  PREVIEW_DIALOG_CLOSE_MESSAGE_TYPE,
  PREVIEW_THEME_MESSAGE_TYPE,
  PREVIEW_THEME_STORAGE_KEY,
  type PreviewTheme,
} from "@/hooks/preview/preview-bridge";

export function usePreviewIframeBridge() {
  const [previewTheme, setPreviewTheme] = useState<PreviewTheme>("light");
  const [isFullscreenOpen, setIsFullscreenOpen] = useState(false);

  useEffect(() => {
    const storedTheme = window.localStorage.getItem(PREVIEW_THEME_STORAGE_KEY);
    if (isPreviewTheme(storedTheme)) {
      setPreviewTheme(storedTheme);
    }

    function handleMessage(event: MessageEvent) {
      if (event.origin !== window.location.origin) return;
      if (typeof event.data !== "object" || event.data === null) {
        return;
      }

      if (event.data.type === PREVIEW_DIALOG_CLOSE_MESSAGE_TYPE) {
        setIsFullscreenOpen(false);
        return;
      }

      if (event.data.type !== PREVIEW_THEME_MESSAGE_TYPE) {
        return;
      }

      if (isPreviewTheme(event.data.theme)) {
        setPreviewTheme(event.data.theme);
      }
    }

    window.addEventListener("message", handleMessage);

    return () => {
      window.removeEventListener("message", handleMessage);
    };
  }, []);

  return {
    isFullscreenOpen,
    previewTheme,
    setIsFullscreenOpen,
  };
}
