"use client";

import { useEffect } from "react";
import {
  PREVIEW_DIALOG_CLOSE_MESSAGE_TYPE,
  PREVIEW_THEME_MESSAGE_TYPE,
  type PreviewTheme,
} from "@/hooks/preview/preview-bridge";

interface UsePreviewIframeMessengerOptions {
  enabled: boolean;
  theme: PreviewTheme;
}

export function usePreviewIframeMessenger({
  enabled,
  theme,
}: UsePreviewIframeMessengerOptions) {
  useEffect(() => {
    if (!enabled) return;

    window.parent.postMessage(
      {
        type: PREVIEW_THEME_MESSAGE_TYPE,
        theme,
      },
      window.location.origin,
    );
  }, [enabled, theme]);

  useEffect(() => {
    function handleKeyDown(event: KeyboardEvent) {
      if (event.key !== "Escape") return;

      window.parent.postMessage(
        {
          type: PREVIEW_DIALOG_CLOSE_MESSAGE_TYPE,
        },
        window.location.origin,
      );
    }

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, []);
}
